# Mark 18 — Contact Intake Worker & Content Architecture

Companion record for the Mark 18 brief ("Furnishing the House"). Covers the
`/contact` intake path on this repository (texasmovement.com / TMI). The
sibling record for alexandermathai.com lives at
`../../alexandermathai.com/docs/mark-18-contact-intake-implementation.md`
(same governance basis, same Worker shape, AVM-specific values).

## What shipped

1. **`workers/contact-intake/`** — a standalone Cloudflare Worker (source
   code only, not deployed — see "What did not happen," below).
2. **`src/pages/contact.astro`** — a new route (this site had no contact
   form before Mark 18), gated behind `PUBLIC_CONTACT_ENDPOINT`.
3. **`src/content/verticals/`** — a new MDX content collection with a
   "Manifesto" rendering template, seeded with one placeholder entry.
4. Two build-time guards updated so a real endpoint can never leak into
   public output silently (see "Guard rails," below).

## API contract — `workers/contact-intake/src/worker.ts`

**Endpoint:** `POST /` (path is whatever the Worker is routed to — see
`wrangler.toml`'s commented-out `[[routes]]` block).

**Request** — `Content-Type: application/json`:

```json
{
  "name": "string, required",
  "email": "string, required, must match a basic email pattern",
  "organization": "string, optional",
  "message": "string, required",
  "hp_confirm": "string, optional — honeypot; if non-empty, request is silently discarded and a fake 200 OK is returned"
}
```

Field length caps (excess is truncated, not rejected): `name` 200,
`email` 320, `organization` 200, `message` 5000. Control characters are
stripped from every field before use.

**Responses:**

| Status | Body | Meaning |
|---|---|---|
| 200 | `{"ok": true}` | Delivered (or honeypot silently absorbed) |
| 400 | `{"ok": false, "error": "..."}` | Invalid JSON or failed validation |
| 403 | `{"ok": false, "error": "Origin not allowed."}` | `Origin` header didn't match `ALLOWED_ORIGIN` |
| 405 | `{"ok": false, "error": "Method not allowed."}` | Non-POST, non-OPTIONS request |
| 429 | `{"ok": false, "error": "Too many requests. Try again later."}` | Rate limit exceeded (only enforced if `RATE_LIMIT_KV` is bound) |
| 502 | `{"ok": false, "error": "Delivery failed. Try again shortly."}` | Resend API call failed or errored |

**CORS:** only `Origin: https://texasmovement.com` (exact match against
`ALLOWED_ORIGIN` in `wrangler.toml`) receives an
`Access-Control-Allow-Origin` header; every other origin's request is still
processed but the browser will block reading the response client-side.

**Delivery:** on success, sends one HTML email via the Resend API
(`https://api.resend.com/emails`) from `FROM_EMAIL` to `NOTIFY_EMAIL`
(`movementconsultant@gmail.com`), with `reply_to` set to the submitter's
email. The email body is HTML-escaped field-by-field before interpolation.

**Rate limiting:** fixed-window, 5 requests / 10 minutes / IP, backed by an
optional `RATE_LIMIT_KV` binding. **If that binding is absent (the default —
no KV namespace has been created), the Worker logs a warning and allows
every request through.** This is a real, disclosed limitation, not a bug —
provisioning the KV namespace is a manual owner step (see the Worker's own
`README.md`, "Rate limiting").

## Frontend wiring — `src/pages/contact.astro`

```astro
const contactEndpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT ?? "";
```

- **Unset (every build this repository runs today):** `contactEndpoint`
  inlines to `""` at build time. The submit handler's `if (!contactEndpoint)`
  branch always fires, showing "This form isn't connected to a delivery
  service yet…" — no `fetch()` call is ever made, and no literal external
  URL string reaches `dist/`.
- **Set to a real deployed Worker URL:** the form POSTs the four fields as
  JSON, shows "Sending…", then a success or error status based on the
  response — see the script in `contact.astro` for the exact branch.

This mirrors alexandermathai.com's existing `PUBLIC_CONTACT_ENDPOINT`
pattern, pre-specified in that repo's `docs/site-operations.md` before Mark
18. TMI's script uses `<script define:vars={{ contactEndpoint }}>` (which
downgrades the script to `is:inline`, producing two non-blocking typecheck
hints: `ts(7027)` "unreachable code" and an `astro(4000)` `is:inline` note —
confirmed cosmetic by inspecting the actual built `dist/contact/index.html`,
where `contactEndpoint` correctly inlines to `""`).

## Content schemas

### `verticals` (this repo, TMI)

```ts
defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/verticals" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["live", "in-dev", "private"]),
    thesis: z.string(),     // core philosophy, one to a few sentences
    blueprint: z.string(),  // operational model, one to a few sentences
  }),
});
```

**How to add a vertical manifesto:**

1. Add an `.mdx` file under `src/content/verticals/`, e.g.
   `src/content/verticals/texas-movement-consulting.mdx`. The filename
   (minus `.mdx`) becomes the URL slug at `/verticals/<slug>`.
2. Frontmatter needs `title`, `status` (`live` | `in-dev` | `private`),
   `thesis`, and `blueprint`.
3. **`status` here is independent of `ECOSYSTEM_MAP`/`HUB_ROUTES`** (the
   site-wide status registries in `@tmi/constants` and `src/lib/site.ts`).
   Setting a vertical's manifesto `status` to `live` does **not** flip its
   nav posture, footer link, or lane card elsewhere — those are separate,
   deliberately un-linked systems so a manifesto can be drafted freely
   without accidentally promoting a division site-wide. The rendered page
   says this explicitly in its closing note.
4. Write the body in MDX below the frontmatter — this is the manifesto's
   long-form content, rendered via `<Content />` in
   `src/pages/verticals/[slug].astro`.
5. Run `npm run build` — every vertical appears at its slug automatically;
   there's no separate index page to update (Mark 18 didn't add a
   `/verticals` index — only the seeded example plus the per-item template;
   add one if/when there are enough entries to warrant it).

**Seed:** `src/content/verticals/texas-movement-media.mdx` — explicitly
labeled placeholder content ("Template placeholder — owner review
required" appears in both the frontmatter-adjacent copy and the MDX body),
`status: "in-dev"`.

## Guard rails (unchanged in spirit, extended in code)

- `scripts/check-public-output.mjs` gained check #7: fails the build if any
  file in `dist/` contains a `fetch("https://...")`-shaped literal (a real,
  unconfigured endpoint would trip this). Mirrors the pre-existing
  equivalent check in alexandermathai.com's `scripts/postbuild-guard.mjs`.
  `.js` was added to the set of scanned extensions so client bundles are
  covered, not just HTML/XML/JSON/TXT.
- This guard currently passes with 0 violations because
  `PUBLIC_CONTACT_ENDPOINT` is unset in every build run in this
  environment — the moment the owner sets it to a real Worker URL in
  production, this guard **will fail** until a narrow, explicit exception
  is added for that confirmed URL. That's by design: never weaken a check
  silently, extend it deliberately, in the same commit that makes the
  change it needs to allow.

## What did not happen, and why

- **No Cloudflare Worker was deployed.** This session has no Cloudflare
  account, dashboard, or API access. `workers/contact-intake/` is complete,
  typechecked source code (`npx tsc --noEmit` passes clean), ready to
  deploy via `wrangler deploy` once the owner runs it from their own
  machine/account.
- **No secret was created, stored, or requested.** `RESEND_API_KEY` is read
  only via `env.RESEND_API_KEY` in `src/worker.ts`; `wrangler.toml`
  documents `wrangler secret put RESEND_API_KEY` as the way to set it and
  contains no key material.
- **No KV namespace was created.** Real per-IP rate limiting requires the
  owner to run `wrangler kv namespace create RATE_LIMIT_KV` and uncomment
  the binding in `wrangler.toml`. Until then the Worker runs with rate
  limiting disabled (fails open), which is disclosed above and in the
  Worker's own `README.md`.
- **`PUBLIC_CONTACT_ENDPOINT` was not set anywhere in this repository.**
  It stays unset in every build this repository runs, keeping `/contact`
  fully inert by construction — exactly the same "gated by default" pattern
  alexandermathai.com's `docs/site-operations.md` had already specified
  before Mark 18 existed.
- **The public-output guard's `EXTERNAL_FETCH_PATTERN` exception was not
  added.** Adding it now, before a real endpoint exists, would just be an
  unused carve-out sitting in a safety check — better to add it in the same
  commit that actually sets `PUBLIC_CONTACT_ENDPOINT` to a real value.

## Deployment steps (owner-run, outside this session)

See `workers/contact-intake/README.md` for the full walkthrough. Summary:

1. `cd workers/contact-intake && npm install`
2. Sign up / log in to Resend (or your chosen provider), verify a sending
   domain, get an API key.
3. `npx wrangler login` (your own Cloudflare account)
4. `npx wrangler secret put RESEND_API_KEY` and paste the key when prompted
5. (Optional but recommended) `npx wrangler kv namespace create RATE_LIMIT_KV`,
   then uncomment and fill in the `[[kv_namespaces]]` block in `wrangler.toml`
6. `npx wrangler deploy`
7. Copy the deployed Worker's URL, set `PUBLIC_CONTACT_ENDPOINT` to it in
   Cloudflare Pages' production environment variables for this repo's site
8. Add the confirmed URL as an explicit exception to
   `EXTERNAL_FETCH_PATTERN`'s check in `scripts/check-public-output.mjs`,
   in the same commit/deploy that sets step 7's env var
9. Rebuild — `/contact` becomes live; the guard should still pass because
   of step 8's exception

## Governance basis

This work sits under the same "Raw Telemetry" / build-discipline standard
established across Marks 13–14 (never fabricate a live capability; disclose
every gap plainly; never weaken a safety guard to make a build pass) and
the absolute constraints reaffirmed throughout this project: no secrets
ever created or requested, no deployment access assumed, no guard weakened.
