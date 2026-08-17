# Project brief — texasmovement.com

## What Texas Movement International is

Texas Movement International (TMI) operates at the intersection of performance, culture, media,
technology, and disciplined execution. It is a systems company building infrastructure for
founders, athletes, and cities (`ORG.boilerplate`, `packages/constants/src/org.ts`) — not a single
product, but a set of connected operating lanes that share one standard for how work gets done:

- **Consulting** — systems diagnostics and AI/operations builds for founders and operators.
- **FounderLink** — the intake layer; routes new work to whichever lane fits.
- **Performance** — movement education, evaluation, training, biomechanics.
- **Health** — recovery-adjacent education, herbs-only scope, explicitly non-clinical.
- **HERO** — the retail/product lane (footwear, apparel, visual culture).
- **Media** — documentation and signal: series, long-form, live programming.
- **Distribution** — rights, takedowns, platform operations.
- **Reparations** (TM Reparations Partners) — reparative-capital research and systems design.
- **Social** — the public layer and structured live events.

Every fact above is sourced from `PROPERTIES` in `packages/constants/src/ecosystem.ts` — that file
is the single source of truth for what each lane does, its status, and its canonical URL. Do not
add specifics about any lane anywhere in this repo that aren't already true there.

The tagline is **"Systems for people who move"** (`ORG.tagline`). The founder is Alexander Mathai
(`FOUNDER`, `org.ts`); his own site, `alexandermathai.com`, is a separate property and a separate
repo, out of scope here.

## What this repo's job is

This repo (`movementconsultant/texasmovement.com`) builds and (eventually) deploys exactly one
property in that ecosystem: **`texasmovement.com` itself** — the parent/hub site. Its job:

1. State plainly what TMI is, in language that doesn't outrun what's actually confirmed true.
2. Point visitors at whichever lanes are actually live today, and be honest about which ones
   aren't yet, rather than linking to something that doesn't resolve.
3. Carry the one piece of structured data every property in the ecosystem depends on the hub for:
   the `Organization` JSON-LD block (emitted once, here, not duplicated on any sub-property).
4. Do all of the above without publishing anything unverified — no fabricated legal facts, no
   contact route nobody is actually monitoring, no brand URL nobody has confirmed.

It does **not** build, own, or make decisions for any `*.texasmovement.com` sub-property
(Consulting, Performance, Media, HERO, etc.) — those live in their own repos (per
`PROPERTIES[key].app` in `ecosystem.ts`) and have their own launch-blocker tracking.

## Current phase

**Placeholder / hub launch**, not the finished business site — see
`docs/IMPLEMENTATION_STATUS.md` for the current snapshot and `docs/LAUNCH_BLOCKERS.md` for exactly
what's blocking each remaining piece of the real site (verified contact inbox, legal/org data, the
canonical LinkedIn URL, and hosting connection).

See `docs/SITE_ARCHITECTURE.md` for how the site is put together, and `CLAUDE.md` for the
non-negotiable safety rules and what requires Alexander's explicit approval.
