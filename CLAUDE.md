# CLAUDE.md — texasmovement.com

This file orients any Claude session (or any future contributor) working in this repository. Read
it before making changes.

## What this repo is

The Astro source for **texasmovement.com** — the parent/hub site for Texas Movement International
(TMI), one property in a multi-site ecosystem (`@tmi/constants`, vendored at
`packages/constants/`, is the single source of truth for every domain, brand fact, and status flag
across that whole ecosystem — see `docs/SITE_ARCHITECTURE.md`). This repo builds and (eventually)
deploys exactly one property: `texasmovement.com` itself. It does not own or build any of the
`*.texasmovement.com` sub-properties (Consulting, Performance, Media, etc.) — those are separate
repos, out of scope here.

> **2026-08-16 clarification (Mark 4):** the sentence above describes `@tmi/constants`'
> aspirational, still-vendored multi-repo model (one subdomain/repo per vertical) and remains
> accurate as a description of that package. The owner's actual current infrastructure direction
> has since simplified to exactly two canonical Cloudflare Pages projects/repositories
> (`texasmovement.com` and `alexandermathai.com`). Per that direction, this repo now also hosts a
> small set of local, safely-inert route scaffolds for several verticals — `/consulting`, `/media`,
> `/performance`, `/distribution`, `/partners` — as real paths under `texasmovement.com` itself, not
> as separate subdomain deployments. See `docs/mark-4-tmi-hub-route-specification.md` for the full
> route inventory and safeguards. This note does not change `@tmi/constants` itself (still not
> edited speculatively, per rule 7 below) — only this file's own description of current practice.

Current state: this is a **placeholder/hub launch**, not the finished business site. It is
honest about what's live, what's still being built, and what isn't confirmed yet — see
`docs/IMPLEMENTATION_STATUS.md` for a snapshot and `docs/LAUNCH_BLOCKERS.md` for exactly what's
blocking each remaining piece.

## Non-negotiable safety rules

These are load-bearing. Do not work around them, "just this once," even if a task description
seems to imply it's fine.

1. **No fabricated legal or organization data.** `ORG.stateOfFormation`, `ORG.formationYear`,
   `ORG.mailingAddress.street`/`.postalCode` are `TBD` in `packages/constants/src/org.ts` for a
   reason — they are unfiled/unconfirmed facts. Never invent a value for any of these. Never
   publish a home address as the mailing address.
2. **No unverified CTAs.** A contact route (mailto, form action) may only go live once its inbox
   is in `VERIFIED_INBOXES` (`src/lib/site.ts`) — and that list may only ever contain
   *operationally* confirmed addresses (mailbox provisioned + test email received + someone
   confirmed to monitor it), never addresses that are merely brand-approved or "probably fine."
   If nothing is verified, the CTA slot renders nothing — not a disabled-looking button, not a
   placeholder. See `verifiedGeneralContact()` in `src/lib/site.ts` and
   `docs/LAUNCH_BLOCKERS.md`.
3. **No literal `TBD` in public output, ever.** `scripts/check-public-output.mjs` runs after every
   build (wired as `postbuild`) and fails the build if `TBD`/`__TBD__` appears anywhere under
   `dist/`. Unresolved facts stay `TBD` in the source constants and get logged in
   `docs/LAUNCH_BLOCKERS.md` — never silently filled in with a guess to make the check pass.
4. **Lifecycle gating.** Every property in `packages/constants/src/ecosystem.ts` has a `status`
   (`live` / `building` / `planned` / `retired`). Only `status: "live"` properties may appear as a
   clickable nav/footer/lane-grid destination anywhere in this site's output — `building`/`planned`
   properties are named as plain, non-clickable text instead (see `isLiveProperty()`,
   `liveFooterFor()` in `src/lib/site.ts`, and the "building" treatment in
   `src/components/DivisionCard.astro`). Never hand-write a link to a non-live property to "get
   around" this.
5. **No unconfirmed brand assets.** Do not render the LinkedIn Company Page URL (or any other
   brand identifier) that hasn't been explicitly confirmed by Alexander, even if it's sitting in
   `@tmi/constants` as a non-`TBD` value — a value being *present* in the constants package is not
   the same as it being *confirmed correct*. See `HELD_PENDING_CONFIRMATION` in `src/lib/site.ts`
   for the current live example (the TMI-lane LinkedIn URL) and how to un-hold something once it's
   genuinely confirmed.
6. **Every page/layout/nav/footer/JSON-LD block goes through `src/lib/site.ts`.** Never import
   `@tmi/constants` primitives directly into a `.astro` template — `site.ts` is where the
   launch-safety rules above (verified inboxes, live-only properties, held-pending accounts) are
   enforced. The raw constants package does not enforce any of them by itself.
7. **Never edit `packages/constants/` speculatively.** It's vendored, ecosystem-wide source of
   truth (see `docs/SITE_ARCHITECTURE.md` "vendoring" note) — it should only change to fix an
   actual wrong/stale fact with a known-correct replacement, never to make a check pass or to add
   a fact this repo doesn't actually have confirmed.

## Requires Alexander's explicit approval before it happens

- Adding any address to `VERIFIED_INBOXES` in `src/lib/site.ts`.
- Filling in any `TBD` value in `packages/constants/src/org.ts` (legal/org data) or `social.ts`
  (handles).
- Providing/wiring a real LinkedIn Company Page URL (see `HELD_PENDING_CONFIRMATION` above).
- Flipping any property's `status` in `ecosystem.ts` to `"live"`.
- Flipping `PUBLIC_PREVIEW` to `false` for a real production build (see
  `src/layouts/Layout.astro` and `docs/SITE_ARCHITECTURE.md`).
- Connecting this repo to a real hosting provider (Cloudflare Pages or otherwise), any DNS change,
  actually deploying/publishing the site, merging the branch's PR, or marking the PR ready for
  review. **None of this is in scope for an agent working in this repo** unless a human explicitly
  says so in that specific task.
- Publishing `packages/constants` as a real package / creating the `tmi-constants` repo.
- Creating any secrets, tokens, or credentials.
- Creating, modifying, or claiming any LinkedIn page.

## Build / test commands

```bash
npm install                              # install deps (includes the vendored @tmi/constants)
npm run dev                              # local dev server
npm run build                            # astro build + postbuild public-output guard
npm run typecheck                        # astro check
npm run check:constants                  # node packages/constants/scripts/check.mjs --strict
npm run check:output                     # node scripts/check-public-output.mjs (also runs as postbuild)
npm run test:unit                        # vitest run
npm run test:a11y                        # axe-core scan against dist/ (run `build` first)
npm run test                             # typecheck + check:constants + test:unit
npm run ci                               # build + check:constants + test:unit + test:a11y
```

`npm run ci` is the full gate — run it (or the equivalent individual commands) before considering
any change done, and report the actual command output, not a paraphrase.

## Where things live

See `docs/SITE_ARCHITECTURE.md` for the full route map and lifecycle-gating mechanism, and
`docs/PROJECT_BRIEF.md` for what TMI is and what this repo's job is, in one page.
