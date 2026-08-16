# Mark 2 production release report — texasmovement.com

Companion report lives at `docs/mark-2-production-release-report.md` in the
`alexandermathai.com` repo. Read both before approving release — they describe one coordinated
two-site launch.

## Release candidate

- **Repository**: `movementconsultant/texasmovement.com`
- **Branch**: `claude/texas-movement-rebuild-pq14fo`
- **PR**: [#1](https://github.com/movementconsultant/texasmovement.com/pull/1) — open, draft,
  base `main`
- **Commit SHA**: `bf88255f2cc5d5580365f83584736c92adc35e4b`
- **`main` branch status**: unchanged at `359f69d9b667215a7edab704254b12ac1ae99443` ("Revise
  index.html for improved content and structure") — confirmed via `git fetch origin main`
  immediately before this report. This is the **old, pre-Astro legacy site** (a single static
  `index.html`), preserved as-is at `legacy/index.html` in the release candidate. No drift since
  PR #1 was opened.
- **Stack**: Astro 7 (`output: "static"`, `build.format: "directory"`), TypeScript strict,
  vendored `@tmi/constants` package (`packages/constants/`) as the ecosystem-wide source of
  truth for domains/brand facts/lifecycle status, with a repo-local safety wrapper
  (`src/lib/site.ts`) enforcing verified-inbox, live-only-property, and held-pending-confirmation
  rules on top of it.
- **Deploy target**: Cloudflare Pages, static `dist/` output. `wrangler.toml` is present
  (`pages_build_output_dir = "dist"`) but no Cloudflare account/project is connected in this
  environment.

## Final test results and commands run

All commands below were executed in this pass, against this exact commit's working tree (after
`npm install`, since this was a fresh clone), with real output captured.

| Command | Result |
|---|---|
| `npm run ci` (= `build && check:constants && test:unit && test:a11y`), `PUBLIC_PREVIEW` unset | **Pass** — build: 5 pages; `check-public-output.mjs`: 0 errors, `PUBLIC_PREVIEW resolved to: true`; `check:constants --strict`: 0 errors (8 informational `TBD` values, 42 informational drift warnings, all pre-existing and documented in `docs/LAUNCH_BLOCKERS.md`); `vitest`: 31/31 passed; `test:a11y` (axe-core, 5 routes): 0 violations |
| `PUBLIC_PREVIEW=false npm run build` (production mode) | **Pass** — 5 pages; postbuild `check-public-output.mjs`: 0 errors, `PUBLIC_PREVIEW resolved to: false` |
| Manual: production `robots.txt` | **Pass** — `Allow: /` + `Sitemap: https://texasmovement.com/sitemap.xml` |
| Manual: production `<meta name="robots">` | **Pass** — absent (indexable by default; no noindex tag) |
| Manual: production canonical tag | **Pass** — `<link rel="canonical" href="https://texasmovement.com">` |
| Manual: production `sitemap.xml` | **Pass** — 5 URLs, all `https://texasmovement.com/...` |
| Manual: `linkedin.com` leak check on prod `dist/` | **Pass** — 0 hits (actively filtered by `isHeldPendingConfirmation()`, pending owner confirmation of the real Company Page URL) |
| Manual: `pages.dev` / `localhost` / `127.0.0.1` leak check on prod `dist/` | **Pass** — 0 hits |
| Manual: `TBD` leak check on prod `dist/` | **Pass** — 0 hits (enforced by `check-public-output.mjs` postbuild guard) |
| Preview-mode rebuild after this pass's `_redirects` change: `npm run ci` | **Pass** — re-ran full gate after adding the `www` → apex rule; all four stages still pass (build/check-public-output/check:constants/unit/a11y) |
| Manual: `www.texasmovement.com` leak check on prod `dist/` | **Pass** — 0 hits |
| Manual: H1-per-page count across all 5 routes | **Pass** — one H1 each |
| Manual: skip-link + `prefers-reduced-motion` presence | **Pass** — both present (`Layout.astro`, `global.css`) |

No check in this table was skipped or assumed — `npm run ci` is this repo's own defined full
gate and was run verbatim, twice (once before and once after the `_redirects` change).

## Production domains

- `https://texasmovement.com`
- Canonical policy: apex is canonical. `www.texasmovement.com` redirects permanently (301) to the
  apex — the rule already existed in principle as an owner requirement; this pass added the
  actual `_redirects` entry (`public/_redirects`, appended below the existing documented
  fragment-link notes). Inert until `www.texasmovement.com` is added as a custom domain on the
  same Cloudflare Pages project.

## Cloudflare Pages project

**Not determinable from repository configuration.** `wrangler.toml` exists
(`name = "texasmovement-com"`, `pages_build_output_dir = "dist"`) but this is scaffolding, not
evidence of a connected project — its own comment states "no Cloudflare account/project has been
connected by this build." This environment has no Cloudflare credentials or CLI session, so no
existing project name, custom-domain binding, or preview URL could be confirmed.

## Branch to deploy

`main`, per the release defaults — **but `main` does not currently contain this release
candidate.** `main` is still the pre-rebuild legacy static site. The release candidate lives on
`claude/texas-movement-rebuild-pq14fo` / PR #1. Merging PR #1 into `main` is a required
post-approval action — not performed in this pass.

## Preview configuration

- `PUBLIC_PREVIEW=true` or unset (default, per `.env.example`) → `noindex, nofollow` meta tag,
  `robots.txt` disallow-all, zero indexable sitemap URLs, no canonical tag emitted at all
  (stricter than alexandermathai.com's approach — texasmovement.com omits the canonical tag
  entirely in preview rather than pointing it at production; both satisfy the "no preview-host
  leak" requirement). Verified against a real preview-mode build this pass.
- No secret is stored in any `PUBLIC_`-prefixed variable — confirmed by reading `.env.example` and
  every `import.meta.env.PUBLIC_*` reference: only `PUBLIC_PREVIEW` exists.

## Production configuration

- `PUBLIC_PREVIEW=false` — flips indexing on. Verified against a real production-mode build this
  pass (table above).
- Canonical/site URL is a source-controlled constant (`site: "https://texasmovement.com"` in
  `astro.config.mjs`), not an environment variable — no env var is needed to set it.

## Verified/active external URLs

**None.** `VERIFIED_INBOXES` in `src/lib/site.ts` is empty (confirmed by
`check-public-output.mjs` output: `verified inboxes: (none)`). Every property in
`ECOSYSTEM_MAP` (`src/lib/site.ts`) carries `badge: "building"` or `"private"` — none `"live"` —
so `isFooterEligible()` returns false for all of them and the global footer's ecosystem/property
list is correctly empty on every page. The LinkedIn Company Page URL is actively held pending
confirmation and excluded from all public output, including `organizationJsonLd().sameAs`.

## Intentionally disabled/unverified destinations

- `hello@texasmovement.com` (general inbox) — not in `VERIFIED_INBOXES`; the homepage's primary
  CTA slot renders nothing rather than a non-functional or placeholder button. Exact one-line
  unblock documented in `docs/LAUNCH_BLOCKERS.md`.
- `alexander@texasmovement.com`, `founderlink@texasmovement.com` — not verified, not rendered.
- LinkedIn Company Page URL — held pending Alexander's confirmation of the correct canonical URL
  (two candidate URLs exist; neither confirmed).
- Media TikTok handle, Performance Instagram handle — `TBD` in `@tmi/constants`, not rendered
  anywhere in current output (the section that would have shown them was removed).
- All 11 `ECOSYSTEM_MAP` entries (TMI core, founder/Alexander Mathai, and 9 verticals) — shown
  only as informational, non-clickable cards on `/lanes` and the homepage teaser, with an honest
  "building" or "private" badge.

## Contact-path status

No `/contact` page exists on this site by design — texasmovement.com's only contact surface is
the homepage's primary CTA slot, gated on `verifiedGeneralContact()`, which returns `null` (and
therefore renders nothing) because `hello@texasmovement.com` is not yet operationally confirmed.
No fabricated address or endpoint exists anywhere in the codebase. This does not block production
release per the release defaults; it's the repo's own documented, correct behavior.

## Owner verification items still required

1. **Cloudflare Pages project/domain binding** — same gap as alexandermathai.com; not
   determinable from this environment.
2. **`hello@texasmovement.com` verification** — the three operational preconditions in
   `docs/LAUNCH_BLOCKERS.md` (mailbox provisioned, test email received, monitoring confirmed) must
   all be true before adding it to `VERIFIED_INBOXES`.
3. **LinkedIn Company Page URL** — confirm the real canonical URL before either candidate is
   un-held.
4. **Legal/org data** (`stateOfFormation`, `formationYear`, `mailingAddress`) — currently `TBD`;
   blocks nothing in the current build (not rendered anywhere) but blocks any future
   "formed in ___" statement or a real registered mailing address on `/privacy`/`/terms`.
5. **`founder` property's `ECOSYSTEM_MAP` badge** — currently `"building"`, even though
   alexandermathai.com is itself part of this coordinated release. Recommend the owner explicitly
   decide, once alexandermathai.com is confirmed live in production, whether to update this one
   entry (`src/lib/site.ts`, `ECOSYSTEM_MAP`, `key: "founder"`) from `"building"` to `"live"` so
   texasmovement.com's own footer/nav can honestly link to it. **Not changed in this pass** — the
   repo's own `CLAUDE.md` requires explicit approval for any `ECOSYSTEM_MAP`/status change, and
   alexandermathai.com's production status isn't confirmed live yet at the time of this audit.

## Exact production checklist

1. Confirm/create the Cloudflare Pages project for this repo; build command `npm run build`,
   output directory `dist`.
2. Merge `claude/texas-movement-rebuild-pq14fo` (commit `bf88255`) into `main` — only after the
   owner's explicit release approval.
3. Set `PUBLIC_PREVIEW=false` on the Cloudflare Pages **production** environment only.
4. Add the custom domain `texasmovement.com`; add `www.texasmovement.com` as a second custom
   domain on the same project so the `_redirects` rule takes effect.
5. Confirm HTTPS is enforced on both hostnames once DNS validates.
6. Re-run `npm run ci` against the deployed production URL's actual output (or re-run the
   individual manual checks above against the live site).
7. Confirm `www.texasmovement.com` redirects (301) to `https://texasmovement.com/`.
8. Tag the corresponding Mark 2 release tag once production validation passes (per Section 8,
   step 8 of the release authority brief — coordinate the exact tag name with the founder-site
   tag, `v1.0.0-mark-2`).

## Rollback procedure

1. Cloudflare Pages retains prior deployments — use the dashboard's rollback action first for
   immediate recovery.
2. Fix forward with a new commit and `git revert` rather than force-pushing over `main` or the
   release branch.
3. If a specific `ECOSYSTEM_MAP` badge, `VERIFIED_INBOXES` entry, or held-pending flag is found
   wrong post-launch, revert that one entry and redeploy — not a full site rollback.
4. Document every rollback in a follow-up commit message so the audit trail (and
   `docs/LAUNCH_BLOCKERS.md`) stays accurate.

## Post-launch priorities

1. Complete the three-part operational verification for `hello@texasmovement.com` and add it to
   `VERIFIED_INBOXES` once genuinely confirmed — this restores the homepage's primary CTA.
2. Obtain and confirm the canonical LinkedIn Company Page URL.
3. Resolve legal/org `TBD` values (formation year, state, mailing address) with a registered
   agent/mailbox address — never a home address.
4. Revisit the `founder` `ECOSYSTEM_MAP` badge once alexandermathai.com's own production status
   is confirmed live.
5. Continue adding real division content only through the same lifecycle-gating rules already
   enforced by `src/lib/site.ts` and documented in `docs/SITE_ARCHITECTURE.md` — never bypass
   `isLiveProperty()`/`isFooterEligible()`.

## Blockers

**Hard:**
- No Cloudflare account/project access in this environment.
- `tmi-constants` package repo still cannot be created (persistent `403`) — this repo currently
  vendors a local copy of `@tmi/constants` at `packages/constants/` as a workaround; publishing
  it as a real shared package remains blocked.

**Recommended, not launch-blocking:**
- `hello@texasmovement.com` unverified (homepage primary CTA slot renders nothing).
- LinkedIn Company Page URL unconfirmed.
- Legal/org data incomplete (doesn't block current build; blocks future legal-page content).

## Cloudflare Pages preview check

**Not performed — no preview deployment exists to inspect.** Same situation as
alexandermathai.com: no Cloudflare credentials in this environment, `wrangler.toml` is scaffolding
only, and no evidence of an existing connected project was found. The exact action needed: the
owner (or someone with Cloudflare dashboard access) connects this repo to a Cloudflare Pages
project, producing a real, inspectable preview URL for `claude/texas-movement-rebuild-pq14fo`
before any production DNS work proceeds.
