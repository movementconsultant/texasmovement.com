# Implementation status — snapshot

Snapshot taken at the end of the Pass 2 homepage placeholder/hub rewrite, on branch
`claude/texas-movement-rebuild-pq14fo` (PR #1, draft). See `docs/IMPLEMENTATION_PLAN.md` for
what's next and `docs/LAUNCH_BLOCKERS.md` for exact per-item blockers.

**Updated by a Pass 3 end-of-day closeout/validation pass** (no new features; see
`docs/LAUNCH_BLOCKERS.md` "LinkedIn Company Page URL" for the one behavioral fix made): the check
counts and the LinkedIn-hold description below reflect the current `HEAD`, not the Pass 2 snapshot
verbatim.

## Routes live (in the build; not yet deployed anywhere — see "Hosting" below)

| Route | Status |
|---|---|
| `/` | Rewritten this pass — plain-language placeholder/hub, one conditional primary CTA (currently absent). |
| `/lanes` | Unchanged this pass — full lane directory. |
| `/privacy` | Unchanged this pass — honest stub. |
| `/terms` | Unchanged this pass — honest stub. |
| `/accessibility` | Unchanged this pass — accessibility statement. |
| `/robots.txt`, `/sitemap.xml` | Unchanged this pass — gated by `PUBLIC_PREVIEW`. |

## Checks passing

All of the following pass clean as of this commit — see the PR description for the exact commands
and full output:

- `npx astro check` — 0 errors, 0 warnings, 0 hints (17 files).
- `npm run build` (includes the `postbuild` public-output guard) — 0 errors, in both
  `PUBLIC_PREVIEW=true` (default) and `PUBLIC_PREVIEW=false` modes.
- `node packages/constants/scripts/check.mjs --strict` — 0 errors (8 pre-existing informational
  `TBD` entries reported, unchanged by this pass; drift warnings are all in `legacy/index.html`,
  which is historical/unreferenced, and one expected warning on the literal
  `hello@texasmovement.com` string in `src/lib/site.ts`).
- `npx vitest run` — 22/22 tests passing (19 as of Pass 2 + 3 new in the Pass 3 closeout, covering
  the broadened LinkedIn hold below).
- `node tests/a11y.mjs` (axe-core, `wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa`) — 0 violations across
  all 5 routes, including the rewritten homepage.

## Current blockers (see `docs/LAUNCH_BLOCKERS.md` for full detail on each)

1. **Contact CTA absent.** `hello@texasmovement.com` is not in `VERIFIED_INBOXES` — not yet
   operationally confirmed (mailbox provisioned + test email received + monitored). The
   homepage's one primary-CTA slot renders nothing until that's true. One-line change once ready.
2. **Canonical LinkedIn URL not provided.** No `linkedin.com` URL is confirmed, so none renders
   anywhere in public output — this now covers both company-page candidates and the founder's
   personal profile (a Pass 3 closeout fix; see `docs/LAUNCH_BLOCKERS.md`) — pending Alexander
   supplying the real, confirmed canonical Company Page URL.
3. **Legal/organization data incomplete.** `stateOfFormation`, `formationYear`, mailing address —
   all `TBD`, not rendered anywhere, blocking only a future "formed in ___" statement and a real
   mailing address on legal pages.
4. **3 of 9 ecosystem properties still `building`** (Distribution, Reparations, Social) — named,
   not linked, on both `/lanes` and the homepage's "Explore the ecosystem" section.
5. **No hosting connection** — `wrangler.toml` is ready for Cloudflare Pages; nothing is actually
   deployed. Requires a human with dashboard access.
6. **`@tmi/constants` still vendored locally**, not published as a real package (blocked on a
   repo-creation permission issue from the original build).

## What changed in this pass, in one paragraph

The homepage was rewritten from a full pitch page (About essay, four-block social-network section,
two hero CTA buttons) into an honest placeholder/hub: plain-language framing grounded in existing
constants, a short "what we are building" section, an "explore the ecosystem" section that only
links properties actually marked `live`, and exactly one primary-CTA slot reserved for "Contact
Texas Movement" that only renders once the contact inbox is operationally verified (currently:
never rendered). Separately, the TMI-lane LinkedIn URL — present but unconfirmed in the vendored
constants — is now actively excluded from JSON-LD and any future social rendering, with a
build-time guard that fails if either of the two conflicting LinkedIn URLs ever leaks into output.
Full detail: `docs/MIGRATION_INVENTORY.md` "Pass 2."
