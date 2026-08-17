# Mark 18 (internal) — Current-State System Map

Internal-only. Not rendered, not imported, not linked from any public route.
Text tables and ASCII topology only, per this pass's explicit restriction.
No image generated. No fake metrics, active-state indicators, or live-data
language used — every status below is drawn from local, verifiable source
or test output as of HEAD `8683d7d`.

## 1. TMI route hierarchy and classifications

```
texasmovement.com (this repo, PUBLIC_PREVIEW-gated)
│
├─ / ................................. home (Live candidate*, not deployed)
├─ /about ............................ static, no posture label
├─ /ecosystem ......................... static, no posture label
├─ /contact ........................... NEW (Mark 18), gated-inert by design
├─ /lanes ............................. ecosystem-wide vertical index
├─ /consulting ........................ posture: "Building — not yet live"
├─ /media ............................. posture: "Building — not yet live"
├─ /performance ....................... posture: "Building — not yet live"
├─ /distribution ...................... posture: "Building — not yet live" (no nav)
├─ /hero .............................. posture: "External storefront / internally unaudited" (no nav)
├─ /partners .......................... posture: "Building — not yet live" (no nav)
├─ /verticals/texas-movement-media .... Manifesto template, 1 seeded entry
├─ /privacy, /terms, /accessibility ... static legal/policy stubs
└─ /404 ............................... error page

* "Live candidate" per docs/ecosystem-release-matrix.md means "release-
  ready pending owner authorization," never "currently deployed."
```

Source of truth for the 9 hub routes: `src/lib/hub-routes.ts`
(`HUB_ROUTES` array). Source of truth for the ecosystem-wide vertical
index: `packages/constants/src/ecosystem.ts` (`status` field per
property — `live` / `building` / `planned` / `retired`).

## 2. TMI / TMM / AVM / HERO relationship map (as locally documented)

```
                         ┌─────────────────────────┐
                         │   TMI Operating Core     │
                         │ (texasmovement.com hub)  │
                         └────────────┬────────────┘
                                      │
        ┌─────────────┬──────────────┼──────────────┬─────────────┐
        │              │              │              │             │
   Consulting        Media       Performance   Distribution    Partners
  (Building)      (Building)     (Building)     (Building)    (Building)
        │              │
        │        ┌─────┴─────┐
        │        │           │
        │   TMM (owned    Founder Media
        │   editorial,   (AVM-associated,
        │   4 dests)      3 dests)
        │        │           │
        │   TME (1 dest,     │
        │   Substack)        │
        │
   ┌────┴─────────────────────────────────────────┐
   │  Governed/incubation ring (no public route     │
   │  content beyond generic stub or one blurb):     │
   │  Health · FounderLink · Social/Gather ·         │
   │  Reparations                                    │
   └─────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────┐
   │  External commerce boundary (not built/hosted    │
   │  here, internally unaudited):  HERO               │
   └─────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────┐
   │  Separate connected founder layer (own repo,      │
   │  own PR, not accessed by this audit):              │
   │  alexandermathai.com (AVM)                          │
   └─────────────────────────────────────────────────┘
```

**Media destination count, confirmed:** 8 total across 3 records —
`tmm-platform-destinations.json` (4: YouTube×2, Instagram, TikTok),
`tmi-editorial-destination.json` (1: Substack), and
`founder-avm-media-destinations.json` (3 linkable: YouTube, Instagram,
TikTok — LinkedIn and Facebook remain in the record with no renderable
URL, per the file's own documented "Owner URL required" status).

## 3. Source-data and media controls

```
src/content/media/*.json  ──▶  src/lib/media-destinations.ts (gate logic)
                                       │
                                       ▼
                          src/components/media/MediaGrid.astro
                          src/components/media/MediaCard.astro
                          src/components/media/MediaStatus.astro
                                       │
                                       ▼
                                 src/pages/media.astro  ──▶  /media (public)

src/lib/telemetry/*.ts (build-time fetch, YouTube-only) ──▶
   src/components/media/LatestSignalRail.astro ──▶ /media "Latest Signal"
   Guardrails: title/date/link only; blocklist kill-switch at
   src/data/telemetry-blocklist.json (currently empty)
```

## 4. Governance / control layers

| Layer | Mechanism | Enforcement point |
|---|---|---|
| Contact-CTA safety | `VERIFIED_INBOXES` (empty) gates `verifiedGeneralContact()` | `src/lib/site.ts`, called from `src/pages/index.astro` |
| Contact-form inertness | `PUBLIC_CONTACT_ENDPOINT` unset → `""` at build time | `src/pages/contact.astro` script |
| Lifecycle gating (nav/footer/lane links) | `status` field in `ecosystem.ts`, `isLiveProperty()`/`liveFooterFor()` | `src/lib/site.ts`, consumed by `Header.astro`/`Footer.astro`/`DivisionCard.astro` |
| LinkedIn hold | `HELD_PENDING_CONFIRMATION` / `isHeldPendingConfirmation()` | `src/lib/site.ts`; enforced at build via `check-public-output.mjs` check 6 |
| External-fetch guard | `EXTERNAL_FETCH_PATTERN` regex | `scripts/check-public-output.mjs` check 7 |
| TBD sentinel guard | literal string scan | `scripts/check-public-output.mjs` check 1 |
| Preview/noindex gating | `PUBLIC_PREVIEW` env var | `Layout.astro`, `robots.txt.ts`, `sitemap.xml.ts`; verified by `check-public-output.mjs` check 5 |
| Domain-drift/TBD scan (non-blocking) | source-wide regex scan | `packages/constants/scripts/check.mjs` |
| Media source-destination gate | `isSafeHttpUrl()` + `confirmationStatus` vocabulary | `src/lib/media-destinations.ts` |

## 5. Build / test / output layers

```
npm run build
   │
   ├─▶ astro build           (15 pages, both PUBLIC_PREVIEW modes tested)
   │
   └─▶ postbuild: check-public-output.mjs   (7 checks, dist/-scoped, PASS both modes)

npm run test:unit  ─▶ vitest, 104/104 passed (4 files: hub-routes, latest-signal, media-index, site)
npm run test:a11y  ─▶ axe-core via Playwright, 0 violations / 15 routes
npm run check:constants  ─▶ non-blocking drift/TBD scan (8 TBD, 50 drift warnings — see findings register)
```

## 6. Documentation / source-of-truth layers

| Fact domain | Source of truth | Notes |
|---|---|---|
| Org/legal facts | `packages/constants/src/org.ts` | 4 fields still `TBD` |
| Social handles | `packages/constants/src/social.ts` | 2 entries still `TBD` |
| Property status/domains | `packages/constants/src/ecosystem.ts` | Consumed everywhere via `@tmi/constants` |
| Route posture (this repo only) | `src/lib/hub-routes.ts` | Local to this repo, deliberately separate from `ecosystem.ts` |
| Media destinations | `src/content/media/*.json` | 3 files, schema in `src/lib/media-schema.ts` |
| Vertical manifestos | `src/content/verticals/*.mdx` | 1 seeded entry, explicitly decoupled from `ecosystem.ts`/`hub-routes.ts` status |
| Cross-repo ecosystem history | `docs/mark-2-1-hub-release-control-packet.md` | Most detailed cross-hub evidence record; **still cites the CNAME/GitHub-Pages P0 as unresolved** |
| Commercial/flagship framework | `docs/mark-17-flagship-commercial-operating-system.md` and companions | No engagement has occurred prior to this dry run |

## 7. Owner approval gates (as currently coded/documented)

- Adding any address to `VERIFIED_INBOXES` — `CLAUDE.md` rule.
- Filling any `TBD` in `org.ts`/`social.ts` — `CLAUDE.md` rule.
- Providing a real LinkedIn URL — `CLAUDE.md` rule + `HELD_PENDING_CONFIRMATION`.
- Flipping any `ecosystem.ts` `status` to `live` — `CLAUDE.md` rule.
- Flipping `PUBLIC_PREVIEW` to `false` for a real production build — `CLAUDE.md` rule.
- Connecting Cloudflare Pages, DNS, merging, or marking a PR ready — `CLAUDE.md` rule.
- Every Mark 15–17 owner-decision item (flagship designation, scope approval, engagement-agreement template, first-engagement authorization) — this pass (Engagement 1) is the first exercise of that last gate.

## 8. External boundary placeholders

- HERO — no repository exists in this org for it (confirmed in
  `docs/ecosystem-release-matrix.md`); referenced only as an external,
  internally-unaudited boundary.
- Cloudflare Pages / DNS — referenced in `wrangler.toml` comments and
  `docs/mark-2-1-hub-release-control-packet.md` as **partially evidenced**
  (a Cloudflare Pages project was confirmed connected in an earlier
  session via GitHub Checks API, but this session has no such credentials
  and did not re-verify).
- GitHub Pages — state **unknown**, and this is the subject of the
  standing P0 finding (see the findings register).

## 9. Data/contact/conversion boundaries

- Zero `mailto:` strings in built `dist/` output (confirmed by direct
  grep this session).
- Zero `tel:` strings in built `dist/` output.
- Zero `<iframe>` in built `dist/` output.
- Exactly one `<form>` in built `dist/` output (`/contact`), gated inert.
- Zero checkout/payment strings in built `dist/` output except within the
  HERO route's own negation disclosure ("checkout... not audited or
  verified from this hub").

## 10. Unknown / blocked areas

- GitHub Pages enabled/disabled state for this repository — unknown from
  this session, unresolved since Mark 2.1.
- DNS records for `texasmovement.com` — unknown from this session.
- Cloudflare Pages production-branch setting — unknown from this session.
- Whether every brand-asset PNG in `public/` is actually referenced from a
  built page, versus dead weight — not determined this session (flagged in
  Mark 17's UX/performance baseline plan, re-flagged here).
- Whether `RESEND_API_KEY` has ever been provisioned in any real
  Cloudflare account — unknown and unknowable from this session (no
  Cloudflare access exists here).
