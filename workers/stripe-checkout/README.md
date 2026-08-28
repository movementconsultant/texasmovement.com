# Stripe Checkout Worker — Texas Movement Consulting

Standalone Cloudflare Worker for the three Consulting pricing tiers' "Purchase" buttons on
**both** `texasmovement.com/consulting` and `alexandermathai.com/consulting`. **Not deployed by
any automated session** — no Cloudflare account, and no real Stripe account or keys, exist in the
environment this was written in. This is source code only, for you to review and deploy yourself.

## One Worker, two sites

Per the owner's explicit Mark 29 decision, Texas Movement Consulting is one practice with one set
of pricing tiers — not two separate commercial offerings under separate Stripe accounts. Deploy
this Worker once, then point **both** sites' `PUBLIC_STRIPE_CHECKOUT_ENDPOINT` build-time
environment variable at the same deployed URL. `ALLOWED_ORIGINS` in `wrangler.toml` is a
comma-separated list for exactly this reason.

## Disclosed gap: no real Stripe Products exist yet

The task that produced this Worker specified three pricing tiers by name and a **range** (e.g.
"$1,500–$3,000" for Diagnostic) — never actual Stripe Product/Price IDs or a single fixed dollar
figure per tier. A price range isn't a valid fixed Stripe Checkout price, and no SKU list was
actually provided (it arrived as raw digits, not real data), so **this Worker hardcodes no dollar
amount or Price ID anywhere.** Instead:

1. **You create the three real Products in your own Stripe Dashboard first** — Diagnostic and
   Systems Build as one-time prices, Operator Retainer as a recurring (monthly) price. Choose the
   exact amount within each published range yourself.
2. Take the resulting `price_...` IDs and set them as `STRIPE_PRICE_DIAGNOSTIC`,
   `STRIPE_PRICE_SYSTEMS_BUILD`, and `STRIPE_PRICE_RETAINER` in `wrangler.toml`'s `[vars]` block.
3. Until all three are set, a purchase attempt for that tier returns a clean "temporarily
   unavailable" JSON error — the frontend (`PurchaseButton.astro`) already shows that as an inline
   message pointing at the "Questions? Email first" fallback link, never a broken button.

## What it does

- `POST /` with JSON `{ tier: "diagnostic" | "systems-build" | "retainer" }` — looks up that
  tier's configured Stripe Price ID, creates a Stripe Checkout Session via Stripe's REST API
  (plain `fetch`, no Stripe SDK dependency — matches the sibling `contact-intake` Worker's
  zero-dependency convention), and returns `{ url: <hosted Checkout URL> }` for the frontend to
  redirect to. `success_url`/`cancel_url` are built from the calling site's own Origin header, so
  a customer checking out from `alexandermathai.com` lands back on `alexandermathai.com` (and the
  same for `texasmovement.com`) after paying.
- `POST /webhook` — Stripe webhook receiver. Verifies the `Stripe-Signature` header using Web
  Crypto (HMAC-SHA256 per Stripe's documented scheme, with a 5-minute timestamp tolerance against
  replay) — no Stripe SDK needed for this either. On a verified `checkout.session.completed`
  event, sends a notification email to `NOTIFY_EMAIL` via Resend (the exact same email pattern as
  `workers/contact-intake`). This is the minimum viable "someone paid, tell a human" action — no
  fulfillment automation (scheduling, account provisioning, etc.) was invented, since none of that
  was specified and it's a real business decision, not an engineering default.

## Deployment steps

1. `cd workers/stripe-checkout && npm install` — installs `wrangler` and TypeScript types for
   this Worker only; does not touch either site's `node_modules` or lockfile.
2. `npx wrangler login` — authenticates with your own Cloudflare account.
3. **Create a Stripe account** (if you don't have one) and, in Test mode first, create the three
   Products/Prices described above under "Disclosed gap." Note their `price_...` IDs.
4. `npx wrangler secret put STRIPE_SECRET_KEY` — paste your Stripe **secret** key (starts `sk_test_`
   for test mode, `sk_live_` for production). **Never** put this in `wrangler.toml` or any
   committed file.
5. Review and edit `wrangler.toml`'s `[vars]` block: `ALLOWED_ORIGINS`, `NOTIFY_EMAIL`,
   `FROM_EMAIL`, and the three `STRIPE_PRICE_*` values once you have them.
6. **Verify a sending domain in Resend** (same requirement as `contact-intake` — see that
   Worker's README for the detail) before the webhook's confirmation email will actually deliver.
7. `npx wrangler secret put RESEND_API_KEY` — paste your Resend API key.
8. `npm run deploy` (or `npx wrangler deploy`) — publishes the Worker and prints its URL.
9. In the **Stripe Dashboard → Developers → Webhooks**, add an endpoint pointing at
   `<your-worker-url>/webhook`, subscribed to at least `checkout.session.completed`. Stripe shows
   you a signing secret at that point —
   `npx wrangler secret put STRIPE_WEBHOOK_SECRET` with that value.
10. Take the Worker's root URL (step 8) and set it as `PUBLIC_STRIPE_CHECKOUT_ENDPOINT` in
    **both** sites' Cloudflare Pages production environment variables (separate projects from
    this Worker).
11. **Required follow-up in both site repos, not this Worker**: `scripts/check-public-output.mjs`
    (mirrored on both repos) will need the same kind of narrow, explicit exception the sibling
    `contact-intake` Worker's README already documents needing, once `PUBLIC_STRIPE_CHECKOUT_ENDPOINT`
    is set to a real URL — deliberately not done in this pass, same rationale as Mark 18's contact
    form.
12. **Test in Stripe Test mode end-to-end before ever using live keys**: use a `sk_test_...`
    secret key and Test-mode Price IDs, then use Stripe's documented test card numbers
    (`4242 4242 4242 4242`, any future expiry/CVC) to confirm a full purchase → redirect →
    webhook → confirmation email cycle before switching to live keys.

## What was and wasn't verified this pass

- `npm run typecheck` (via this directory's own `tsconfig.json`, isolated from either site's) —
  confirm this passes before deploying.
- **Not verified, and could not be, in this environment**: an actual Stripe Checkout Session
  creation or redirect, real webhook signature verification against a real Stripe-sent event, an
  actual Resend delivery, or this Worker running on real Cloudflare infrastructure. No Stripe
  account, Cloudflare account, or general network egress exists in this sandbox. Test everything
  in Stripe Test mode (step 12 above) before going live.
