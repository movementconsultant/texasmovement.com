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

**Correction (later pass, same day):** a connected project DOES exist, contrary to the
`wrangler.toml` comment (which was accurate when written, before a project was connected) —
discovered via the GitHub Checks API and the Cloudflare Pages bot's PR comment, not via any
Cloudflare credentials (this environment still has none). Project name **`texasmovement`**,
Cloudflare account `c98bb3dd9f79a1a49ad9af7c44cd1259`. Every push to this PR's branch triggers a
real preview build automatically; the latest (commit `5f56304`) completed successfully:

- Preview URL: `https://5b4879bf.texasmovement.pages.dev`
- Cloudflare dashboard log: `https://dash.cloudflare.com/?to=/c98bb3dd9f79a1a49ad9af7c44cd1259/pages/view/texasmovement/5b4879bf-3641-426b-b692-71b505c9d2b4`

**This environment could not fetch or inspect the content of the preview URL** — both `curl` and
the `WebFetch` tool return an egress-proxy block (`EGRESS_BLOCKED`) for `*.pages.dev` domains,
consistent with this environment's general no-web-access posture throughout this whole project.
So: the project's existence, name, and build-success status are confirmed (via authenticated
GitHub data); the actual rendered output of the preview (robots meta, canonical, link behavior)
is **not** independently verified from this session.

No custom-domain binding for `texasmovement.com` itself could be confirmed or denied — the
Cloudflare dashboard link above is the way to check that, not available from this environment.

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

1. **Cloudflare Pages custom-domain binding** — the project itself is confirmed to exist
   (`texasmovement`, see "Cloudflare Pages project" above) and is auto-deploying previews
   successfully. What's still unconfirmed from this environment: whether `texasmovement.com` and
   `www.texasmovement.com` are already bound as custom domains on that project, and its
   production-branch setting. Check the Cloudflare dashboard link above.
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

1. Project already exists (`texasmovement`, confirmed this session) and is auto-deploying preview
   builds successfully. Confirm its build command is `npm run build` and output directory `dist`
   in the Cloudflare dashboard (not verified from this environment — the automatic preview builds
   succeeding is strong evidence this is already correct).
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

**Corrected (later pass, same day): a preview deployment does exist, and its existence/build
success was confirmed — its content could not be inspected.** A Cloudflare Pages project
(`texasmovement`) is already connected and auto-deploys this branch on every push; the GitHub
Checks API and the Cloudflare Pages bot's PR comment confirm the latest push (commit `5f56304`)
built and deployed successfully to `https://5b4879bf.texasmovement.pages.dev`. Both `curl` and the
`WebFetch` tool were tried against this URL from this session and both returned an egress-proxy
block (`EGRESS_BLOCKED`) — this sandbox cannot reach `*.pages.dev` domains, so the required
content checks (indexable robots/meta in production mode, no preview-host leaks, only-verified-
links-active, honest contact-path behavior) could **not** be performed against the live preview
from this environment. **The exact action needed: someone with unrestricted network access (or
the Cloudflare dashboard itself) opens the preview URL above and confirms those same checks that
were already verified against the local build output** (see "Final test results and commands
run") — the local-build results should match, but that's an assumption pending real confirmation,
not a substitute for it.
