# Mark 2 session handoff — texasmovement.com

Snapshot of this repo's state at the end of the Mark 2 ecosystem-wide release sprint. Read
alongside `docs/mark-2-production-release-report.md` (this repo), `docs/LAUNCH_BLOCKERS.md`,
`docs/SITE_ARCHITECTURE.md`, `docs/ecosystem-release-matrix.md`, and
`docs/mark-2-ecosystem-handoff.md` — this file is the short pointer, those are the detail.

## Where this repo stands

- **Branch**: `claude/texas-movement-rebuild-pq14fo`, PR #1 (open, draft, `mergeable_state: clean`)
- **Latest commit at handoff**: `328515ad6aa3c72f078e5ad30cfa2dcabf59dc31` — this repo's release
  candidate has not changed since the production-readiness pass; only documentation was added
  this session.
- **Classification**: Live candidate. Passes its full `npm run ci` gate (build,
  `check-public-output.mjs`, `check:constants --strict`, unit tests, axe-core a11y scan) in both
  preview and production (`PUBLIC_PREVIEW=false`) modes, re-verified fresh this session.
- **Not yet done**: merge to `main`, Cloudflare Pages project connection, DNS/domain binding,
  production deploy. All require explicit owner approval and Cloudflare dashboard access this
  environment does not have.

## What changed this session

Nothing changed in this repo's own release-candidate code this pass beyond the ecosystem-wide
audit's own contribution. This repo is also the umbrella site whose `ECOSYSTEM_MAP`
(`src/lib/site.ts`) is the ecosystem's presentation-layer source of truth — its 11 entries were
NOT changed this session (every `ECOSYSTEM_MAP` badge stays `"building"` or `"private"`, none
flipped to `"live"`), per the repo's own `CLAUDE.md` requiring explicit owner approval for any
such change. See "Ecosystem map accuracy" below for what this means practically.

## This session's ecosystem-wide vertical audits

Every other TMI repository this session has access to was independently audited in parallel this
pass: Consulting, Media, Performance, Distribution, Social, FounderLink, Health, Reparations.
HERO was confirmed to have **no accessible GitHub repository** (the org
`movementconsultant` contains exactly 10 repositories total — confirmed via a live repository
listing at the start of this session — so HERO stays classified Reserve by definition, not by
omission). Full results: `docs/ecosystem-release-matrix.md` and `docs/mark-2-ecosystem-handoff.md`
in this repo.

## Ecosystem map accuracy

`ECOSYSTEM_MAP` in `src/lib/site.ts` currently badges every one of its 11 entries (TMI core,
founder/Alexander Mathai, and 9 verticals) as `"building"` or `"private"` — meaning the footer and
`/lanes` page correctly show nothing as a live, clickable ecosystem link right now. This is
accurate as of this handoff: even though alexandermathai.com and texasmovement.com are both
release-candidates, **neither has actually been deployed to production yet** — until one is,
badging either as `"live"` in `ECOSYSTEM_MAP` would be premature. Once the owner approves and
completes the production deploy of either site, revisit the corresponding `ECOSYSTEM_MAP` entry
(`"tmi"` for this site once texasmovement.com itself is live — though a site linking to itself in
its own footer/nav is unusual and likely not needed; `"founder"` for alexandermathai.com once
it's confirmed live) as a small, explicit, one-entry follow-up change — not done in this session.

## Outstanding owner decisions (unchanged from the production release report)

1. Cloudflare Pages project/domain binding.
2. Three-part operational verification for `hello@texasmovement.com` before adding to
   `VERIFIED_INBOXES`.
3. Canonical LinkedIn Company Page URL confirmation.
4. Legal/org `TBD` values (formation year, state, mailing address).
5. `founder` `ECOSYSTEM_MAP` badge, once alexandermathai.com's production status is confirmed.

## Next agent/session: start here

- If resuming release work: read `docs/mark-2-production-release-report.md` first — it has the
  exact SHA, checklist, and rollback plan.
- If doing ongoing vertical work: read `docs/ecosystem-release-matrix.md` for the current honest
  status of every other property before representing it as anything more than its recorded
  classification.
- Do not re-audit a vertical repo from scratch if `docs/ecosystem-release-matrix.md` already has a
  current entry for it — only re-verify what a specific new change could have invalidated.
