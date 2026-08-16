# Mark 2 ecosystem handoff

Companion to `docs/ecosystem-release-matrix.md` (this repo). That file is the row-by-row data;
this file is the narrative handoff — read both before making a launch decision for any TMI
property.

## Two-hub launch readiness

Both `texasmovement.com` and `alexandermathai.com` are **release-candidates, re-verified this
sprint, not yet deployed**:

- **texasmovement.com** — branch `claude/texas-movement-rebuild-pq14fo`, PR #1, commit
  `328515ad6aa3c72f078e5ad30cfa2dcabf59dc31`. Full `npm run ci` gate passes in both preview and
  production (`PUBLIC_PREVIEW=false`) modes. No code changed this sprint — only documentation
  added.
- **alexandermathai.com** — branch `claude/founder-control-tower-rebuild`, PR #2, commit
  `f5d6bcd1fb1b1ada12a026dd507a651b36770c5e`. Full validation gate passes in both modes. No code
  changed this sprint — only documentation added.
- Both `main` branches remain unchanged (bootstrap-only / pre-rebuild legacy site, respectively).
  Both PRs remain open, draft, `mergeable_state: clean`.
- Full deploy detail, checklist, and rollback plan for each: that repo's own
  `docs/mark-2-production-release-report.md`.

## All vertical classifications

See `docs/ecosystem-release-matrix.md` for the full table. Summary:

- **Live candidate** (2): texasmovement.com, alexandermathai.com — release-ready, not deployed.
- **Building** (5): Consulting, Media, Performance, Distribution, Social — real, clean, passing
  rebuilds with zero live deployment.
- **Building/Private** (3): FounderLink, Health, Reparations — minimal intentional shells, no CTA,
  no contact route, correctly non-public.
- **External storefront / internally unaudited** (1): HERO — no repository exists in this
  `movementconsultant` GitHub organization (confirmed via a live listing of all 10 org
  repositories at the start of this sprint). This label reflects the owner's indication that a
  real HERO product/commerce presence exists outside this org's repos — it has not been
  independently located, reached, or audited from this session, so it is not treated as Reserve
  (bare name, nothing real yet) nor as any launch-ready status.

No vertical is classified Live, Route, Building-as-launch-ready, or Archive without independent
verification behind it. No ambiguous statuses.

## Changes made during this session

- **texasmovement.com**: added `docs/ecosystem-release-matrix.md`, `docs/mark-2-ecosystem-handoff.md`,
  `docs/mark-2-session-handoff.md` (this pass). No release-candidate code changed.
- **alexandermathai.com**: added `docs/mark-2-session-handoff.md`. No release-candidate code
  changed.
- **consulting.texasmovement.com**: fixed a stale `/accessibility` claim describing a testimonials
  iframe that had already been disabled in an earlier pass; added `docs/mark-2-vertical-audit.md`.
  Commit `e3b8653`.
- **media.texasmovement.com**: no code changes; added `docs/mark-2-vertical-audit.md`. Commit
  `0dff85d`.
- **performance.texasmovement.com**: no code changes; added `docs/mark-2-vertical-audit.md`.
  Commit `90cced4`.
- **distribution**: no code changes; added `docs/mark-2-vertical-audit.md`. Commit `945d016`.
- **social.texasmovement.com**: no code changes; added `docs/mark-2-vertical-audit.md`. Commit
  `df6302d`.
- **founderlink.texasmovement.com**: no code changes; added `docs/mark-2-vertical-audit.md`.
  Commit `66a4f10`.
- **health**: no code changes; added `docs/mark-2-vertical-audit.md`. Commit `7207f38`.
- **reparations.texasmovement.com**: no code changes; added `docs/mark-2-vertical-audit.md`.
  Commit `ee896c0`.

Every commit SHA above was independently verified against the live GitHub PR head for its repo
(not just taken on the auditing agent's word) before being recorded here.

## Repositories inaccessible or blocked

- **HERO Footwear & Performance**: no repository exists in the `movementconsultant` organization.
  Owner has clarified a real external storefront/commerce presence exists elsewhere — this session
  has not located, reached, or audited it. This remains a hard blocker to any code-level work on
  this vertical; the owner needs to point this session (or a future one) at wherever that
  storefront actually lives before any audit is possible.
- **`tmi-constants` (shared package repo)**: still cannot be created — persistent GitHub App `403
  Resource not accessible by integration`. Every repo that needs the shared constants pattern
  currently vendors its own local copy of `@tmi/constants` instead. Unrelated to any single
  vertical's launch readiness, but blocks the ecosystem's long-term goal of one canonical shared
  package.

No other repository was found inaccessible — all 10 repos in the org were reached and audited or
re-verified this sprint.

## What must not be launched

- **HERO** — external storefront, internally unaudited from this ecosystem's engineering side;
  nothing here to launch, and it must not be linked from or represented on either hub site until
  the audit evidence described below exists.
- **Consulting, Media, Performance, Distribution, Social** — all Building. Real, clean rebuilds,
  but none has a Cloudflare Pages project connected or any evidence of a live deployment. None
  should be represented as live, operating, or available anywhere (including in either hub site's
  own ecosystem map/routing — already confirmed both hubs correctly show these as Building, not
  live, with no premature links).
- **FounderLink, Health, Reparations** — all Building/Private, intentionally minimal (no CTA, no
  contact route at all). Health and Reparations specifically carry documented flags requiring a
  real legal/medical or legal/reputational review — heavier than a generic policy-stub pass —
  before any future public copy expansion, given their subject matter.
- Any unverified social/external link across every property in this ecosystem — none should be
  enabled without a human manually opening the URL and confirming it.

## Ecosystem-map integrity finding — clarified by owner

Cross-checking `ECOSYSTEM_MAP` in `src/lib/site.ts` (this repo) against the actual repository
inventory had originally found HERO's `badge: "building"` inconsistent with "no repo exists
anywhere for it." The owner has since clarified the correct framing: HERO is a real, existing
**external storefront** (product/commerce presence) that this ecosystem's engineering side has
not audited — not a bare name reservation, and not a digital build-in-progress in the sense the
"building" badge's `/lanes` copy ("This is being built. It is not yet open.") implies for every
other vertical. Neither label was a perfect fit, which is why this was raised rather than guessed.

**`ECOSYSTEM_MAP`'s `badge: "building"` value itself was NOT changed this pass** — that still
requires Alexander's explicit approval per this repo's own `CLAUDE.md`, and the internal
Live/Route/Building/Reserve/Archive vocabulary in `docs/ecosystem-governance.md` doesn't yet have
a clean slot for "real business, unaudited external property, no repo here." Only this session's
own audit documentation (`docs/ecosystem-release-matrix.md`, this file) now labels HERO "External
storefront / internally unaudited" instead of "Reserve," per the owner's explicit instruction.

**Audit evidence required before HERO can be linked from, or repositioned on, either hub site:**

1. The actual storefront/property URL or repository location, supplied by the owner — this
   session could not discover it and did not attempt to reach any unconfirmed commerce platform.
2. Confirmation of what platform it runs on (e.g. Shopify, a separate hosted site) and whether
   this GitHub organization has — or should have — any source-of-truth repo for it at all, or
   whether it is intentionally managed entirely outside this ecosystem's Astro/Cloudflare Pages
   pattern.
3. A content/claims audit of that storefront against this ecosystem's governance rules
   (`docs/ecosystem-governance.md`): no unverified claims, no fabricated metrics, working
   commerce/checkout function actually confirmed rather than assumed.
4. An accessibility and basic technical-health pass equivalent to what every other vertical in
   this ecosystem received this sprint (or a documented reason that standard doesn't apply to an
   externally-hosted property).
5. Explicit owner sign-off that the storefront is ready to be referenced as more than a plain-text
   mention — the same bar every other vertical's link/CTA is held to elsewhere in this ecosystem.

Until all five exist, HERO should continue to render as non-clickable/plain-text wherever it
currently appears (already the case on both hub sites and in `ECOSYSTEM_MAP`) — this finding does
not change that current safe behavior, only the internal documentation's classification label.

## Exact Cloudflare preview steps

No Cloudflare credentials or CLI access exist in this environment for any of the 10 repos audited
this sprint. For each repo intended for eventual launch:

1. A person with Cloudflare dashboard access connects the repository to a new (or existing, if one
   already exists and just isn't visible to this environment) Cloudflare Pages project.
2. Set build command `npm run build`, output directory `dist` (all repos in this ecosystem use
   this exact convention).
3. This produces a real, inspectable preview URL for the repo's current release branch —
   something this session could not produce or verify for any of the 10 repos.
4. Only after that preview URL is inspected and confirmed clean should production DNS/domain work
   proceed for that property.

## Exact production launch actions for the two hubs

Full detail lives in each hub's own `docs/mark-2-production-release-report.md`. Condensed:

1. Confirm/create the Cloudflare Pages project for each repo.
2. Merge the release-candidate branch into `main` — only after explicit owner approval.
3. Set `PUBLIC_PREVIEW=false` on the **production** environment only for each project.
4. Bind the apex custom domain (`texasmovement.com`, `alexandermathai.com`) and the corresponding
   `www` hostname to each project so the already-committed `www` → apex redirect in each repo's
   `public/_redirects` takes effect.
5. Confirm HTTPS is enforced on both hostnames once DNS validates.
6. Re-run each repo's full validation gate against the actual deployed production URL.
7. Tag each repo's release once production validation passes.

## Rollback posture

- Cloudflare Pages retains prior deployments — use the dashboard's rollback action for immediate
  recovery on either hub, without touching git history.
- Fix forward with a new commit and `git revert` rather than force-pushing over any `main` branch
  or release branch, in any of the 10 repos.
- Rollback SHAs for the two hubs: `alexandermathai.com` main at
  `3ad687933e639ee1e624f5a42b96d694d925ebb8`; `texasmovement.com` main at
  `359f69d9b667215a7edab704254b12ac1ae99443`.
- If a specific claim, status badge, or verified-link flag is found wrong post-launch in any
  property, the narrowest fix is reverting that one value and redeploying — not a full site
  rollback.

## 7-day post-launch priority order

1. Cloudflare Pages project/domain binding and production DNS for both hubs (the actual deploy
   itself, pending owner approval of the release packet).
2. Manual verification of every unverified social/contact URL across both hubs (11 on
   alexandermathai.com, LinkedIn + `hello@texasmovement.com` on texasmovement.com) — the single
   largest remaining honesty gap ecosystem-wide.
3. Owner sign-off on the 7 flagged public claims on alexandermathai.com.
4. Contact-form backend decisions for both hubs (connect a real backend, or supply a verified
   alternate contact address).
5. Owner supplies the real HERO storefront location so the five audit-evidence items in
   "Ecosystem-map integrity finding — clarified by owner" can be worked through and that vertical
   classified beyond "External storefront / internally unaudited."
6. Begin the legal/medical-compliance review flagged for Health, and the legal/reputational review
   flagged for Reparations — both explicitly called out as heavier than the generic stub-page
   review, before either vertical's copy expands beyond its current one-sentence blurb.
7. Once any additional vertical (Consulting, Media, etc.) gets its own Cloudflare Pages connection
   and passes its own independent launch gate, revisit that property's `ECOSYSTEM_MAP` badge in
   `src/lib/site.ts` as a small, explicit, one-entry change — never inferred automatically from a
   build passing.
