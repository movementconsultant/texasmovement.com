# Mark 13 — TMI Future-Firm Operating Console (Visual System)

A coordinated, dark-first visual-system pass across texasmovement.com (TMI)
and alexandermathai.com (AVM). This document covers TMI's side. See the
sibling doc in the AVM repo (`docs/mark-13-avm-founder-systems-archive.md`)
for AVM's side, and `docs/internal/mark-13-operating-console-vs-founder-archive-decision-record.md`
(this repo) for the cross-property decision record.

**This is a visual-system pass only.** No routes, content, claims, source
destinations, external links, APIs, feeds, embeds, analytics, forms, or
conversion paths were added. No data changed — the same 8 confirmed media
destinations render with the same text, links, and gates as before this
pass; only their presentation changed.

## Visual intent

TMI reads as the institutional operating platform: precise, structural,
system-indexed. The existing content and information architecture (hub
routes, ecosystem map, media destination directory) were restyled onto a
near-black "Future-Firm Operating Console" foundation instead of the
original light "paper" palette — modern-fintech-dashboard clarity without
becoming a trading/crypto product, and without fabricating any telemetry,
metric, or live-status claim that wasn't already there.

## Shared visual principles (applied)

1. **Dark-first foundation** — near-black base field, slightly raised dark
   panels, comfortable text contrast, structural dividers.
2. **Typography** — unchanged font stacks (IBM Plex Sans for body/headings
   via Space Grotesk, IBM Plex Mono for metadata/labels); no new or remote
   fonts added. Long headings and body copy stayed proportional sans/serif,
   never forced into mono or uppercase.
3. **Signal accent** — one accent color (`--ff-accent-signal`, `#00ff94`)
   used only for: the global `:focus-visible` outline, the skip-link
   (visible only on keyboard focus — an "active internal state" by
   definition), and a dormant `[aria-current="page"]` footer-nav marker.
   Never used as a large fill, glow, animation, dominant text color, or
   status/liveness cue.
4. **Structure** — crisp, modest corner radii on structural panels/cards
   (reduced from 12–16px to 10px on `.division`, `.media-card`, `.about-side`,
   `.network-block`, `.teaser-item`, `.hero-node`, `.hero-figure`); pill
   badges/buttons (999px) were left alone as an existing, intentional idiom,
   not part of the "panel" language this pass targeted. No universal
   zero-radius reset.
5. **Accessibility** — preserved in full; see Validation below.

## Property-specific interpretation

TMI is the more structured, technical, system-indexed of the two
properties: card grids, an operating-lane ecosystem index, a signal/source
media directory. This pass leaned into that with darker structural panels
and a disciplined mono-label vocabulary that was already present in the
existing design — it did not invent a new layout language.

## Tokens added/mapped and actual values used

`src/styles/global.css` — the existing token **names** were kept (no
component file had to be touched for the base palette flip); their
**values** were remapped from the original light palette to a dark-first
one, and a new `--ff-*` semantic alias layer was added on top, per this
pass's Part D instruction to "map current variables carefully" rather than
introduce a parallel, drifting token system.

| Token | Before (light) | After (dark) |
|---|---|---|
| `--paper` (base field) | `#e7e8e2` | `#070707` |
| `--panel` (raised surface) | `#ddded7` | `#111111` |
| `--hero` / `--hero-soft` (home hero panel) | `#e9e0d5` / `#f3ebe2` | `#0d0d0d` / `#131313` |
| `--hero-ink` | `#3c2a1d` | `#f4f4f2` |
| `--hero-border` | `#b88d68` | `#333333` |
| `--ink` (primary text) | `#15181e` | `#f4f4f2` |
| `--ink-soft` (secondary text) | `#454a54` | `#c7c7c2` |
| `--line` / `--line-strong` | `#c4c6bd` / `#a6a99f` | `#1f1f1f` / `#333333` |
| `--graphite` (deepest surface / solid-fill buttons) | `#111217` | `#0a0a0a` |
| `--white` | `#f4f5f0` | unchanged |
| `--compression` (blue accent — icons/borders only) | `#274a78` | `#5b8fd9` (brightened for ~3:1+ non-text contrast on near-black) |
| `--tension` (rust accent — eyebrow marks) | `#bd3b22` | `#e2673f` (brightened, same reason) |

New `--ff-*` aliases (all mapped onto the table above, not a second
palette): `--ff-bg-base`, `--ff-bg-panel`, `--ff-bg-panel-subtle` →
`--paper`/`--panel`/`--panel`; `--ff-text-primary`, `--ff-text-secondary`,
`--ff-text-muted` → `--ink`/`--ink-soft`/`--ink-soft` (TMI has a two-tier
text system, so `--ff-text-muted` intentionally aliases the same value as
secondary rather than inventing an unused third tier); `--ff-border-structural`,
`--ff-border-emphasis` → `--line`/`--line-strong`; `--ff-accent-signal` /
`--ff-accent-signal-muted` / `--ff-focus-ring` → `#00ff94` /
`rgba(0,255,148,0.16)` / `#00ff94` (new, not aliased — TMI had no existing
accent reserved for this exact role); `--ff-font-ui` → `"IBM Plex Sans",
system-ui, sans-serif`; `--ff-font-mono` → `"IBM Plex Mono", monospace`.

## HERO (product storefront) — deliberately kept warm and distinct

`.division--hero` and `.hero-link` (the HERO footwear storefront's card and
CTA styling) kept their own warm brown/tan hue family rather than being
absorbed into TMI's neutral institutional palette — that visual
distinction from the rest of the ecosystem already existed and communicates
"external, internally unaudited" at a glance; Mark 13 darkened the same
hue family (`#ecddca`/`#dcb792` → `#241a10`/`#1a1109`, etc.) to fit the
dark field instead of removing the distinction.

## Typography strategy

No font files, `@font-face` rules, or `<link>` tags were added, removed, or
changed. The pre-existing Google Fonts `<link>` in `Layout.astro` (IBM Plex
Sans/Mono + Space Grotesk) is unchanged infrastructure from before this
pass — out of scope to touch here. Headings remain proportional
(Space Grotesk); mono is used only for eyebrows, badges, nav, and metadata,
exactly as before.

## Routes/components styled

Global: `src/styles/global.css` (token layer + ~15 targeted rule fixes made
necessary by the palette flip — see below), `src/layouts/Layout.astro`
(`theme-color` meta updated to `#070707` to match the new base field).

No page or component file's markup, props, or logic changed — every route
(`/`, `/about`, `/ecosystem`, `/media`, `/consulting`, `/performance`,
`/distribution`, `/hero`, `/partners`, `/contact`, `/verticals/*`, `/lanes`,
`/privacy`, `/terms`, `/accessibility`) inherits the new palette purely
through the shared token layer and `global.css` component classes it
already used.

Component-level fixes required by the flip (documented so a future reader
understands why, not just what):

- `:focus-visible` outline moved from `--compression` to `--ff-focus-ring`
  (signal green) — the one explicitly-endorsed "visible keyboard focus" use.
- `.skip-link` given its own signal-green treatment instead of relying on
  `--ink` (which is now a light text token, not a dark fill — reusing it
  as the skip-link's background would have produced light-on-light text).
- `header`'s translucent backdrop literal (`rgba(231,232,226,0.92)`) → dark
  equivalent (`rgba(5,5,5,0.88)`).
- `.btn` / `.btn--ghost:hover` solid-fill states switched from `var(--ink)`
  to `var(--graphite)` / `var(--line-strong)` — same reason as the skip-link
  fix: `--ink` is now a text color, not a dark-fill color.
- `.hero-figure` background literal (warm near-white rgba) → dark warm rgba.
- `.division`, `.media-card`, `.teaser-item`, `.hero-node` moved from
  `background: var(--paper)` (same tone as the page) to `background:
  var(--panel)` (a distinct, slightly raised tone) — satisfies "slightly
  raised dark panels," not just a color-inverted flat page.

## Accessibility / contrast / focus / reduced-motion decisions

- Every text-color pair was hand contrast-checked (see the table's header
  comment in `global.css`) and then independently re-verified by running
  the existing axe-core a11y scan (`npm run test:a11y`) against all 15
  built routes — **0 violations**, which includes axe's own automated
  color-contrast checks across every rendered page, not just the pairs I
  reasoned about by hand.
- Keyboard focus is more visible than before (signal-green 2px outline,
  3px offset, on every focusable element site-wide), not less.
- Reduced-motion support (`@media (prefers-reduced-motion: reduce)` on
  `html { scroll-behavior }`) is untouched.
- Semantic landmarks, heading hierarchy, and the existing mobile-nav
  disclosure pattern (`aria-expanded`, `Escape` handling) are untouched —
  no markup changed, only CSS values.

## Existing content, links, claims, classifications, source gates, and release controls preserved

- The 8 confirmed TMM/TMI/founder-media destination cards on `/media`: same
  count, same text, same `sourceClass`/`confirmationStatus` vocabulary, same
  `isSafeHttpUrl()` link gate, same "no platform embed" disclosure — verified
  unchanged by the passing `tests/media-index.test.ts` suite (part of the
  104/104 unit-test run below) and by direct visual inspection.
- `HUB_ROUTES` postures (Building/Private/External storefront) — unchanged
  strings, unchanged source of truth (`src/lib/hub-routes.ts` was not
  edited).
- `scripts/check-public-output.mjs`'s guards (TBD sentinel, unverified
  mailto, non-live property hrefs, noindex-on-preview, LinkedIn hold,
  external-fetch pattern) — untouched, still ran and passed (0 violations)
  against the built output of this pass.
- `PUBLIC_PREVIEW` noindex/canonical/sitemap gating — untouched, verified
  with both a preview-mode build and a `PUBLIC_PREVIEW=false` build.

## Visual elements deliberately excluded

No crypto/trading/wallet/market language or visuals; no fake status dots,
uptime, counters, progress bars, dates, countdowns, or logs; no
cyberpunk/hacking/military/glitch/scanline motifs; no political or
LA28/Olympic content or implication; no new social/media links or feeds; no
remote fonts, assets, or third-party network requests. The Latest Signal
rail's existing "not individually reviewed" disclosure and its
already-established fallback stub-note were left exactly as they were — no
telemetry, chart, or activity-feed visual was added to it.

## Manual owner acceptance criteria

- [ ] Feels like a future-firm operating platform, not a generic SaaS page.
- [ ] `/media` reads as an editorial signal directory, not link-in-bio.
- [ ] `/ecosystem` reads as a controlled operating-lane index.
- [ ] Signal green is scarce (focus ring, skip link, dormant nav marker only)
      and never reads as a "live"/"online" claim.
- [ ] No fake telemetry or crypto-product implication anywhere.
- [ ] HERO's storefront card still reads as visually/contextually distinct
      from the rest of the ecosystem (external, unaudited).

## Validation results

- `npm run typecheck` (`astro check`) — 0 errors, 0 warnings (2 pre-existing
  cosmetic hints on `contact.astro`'s `define:vars` script, unrelated to
  this pass and present before it).
- `npm run build` (preview mode) — 15 pages, guard 0 violations.
- `PUBLIC_PREVIEW=false npm run build` — 15 pages, guard 0 violations.
- `npm run check:constants` — passes (part of `npm run ci`, below).
- `npm run test:unit` (vitest) — **104/104 passed**, including
  `tests/media-index.test.ts` and `tests/hub-routes.test.ts`.
- `npm run test:a11y` (axe-core) — **0 violations across all 15 routes**.
- `npm run ci` (build + guard + constants check + unit tests + a11y) — all
  green, run twice (before and after the final token/comment cleanup pass).
- Manual visual QA: full-page screenshots of `/`, `/media`, `/ecosystem`,
  `/hero` taken against the built `dist/` output via a local Chromium
  instance, reviewed for the acceptance criteria above.

## Explicit non-actions

- No merge, deploy, push to `main`, or PR draft-status change.
- No route, content, claim, source destination, external link, API, RSS,
  embed, analytics, tracking, form, or conversion path added.
- No dependency, package.json, or lockfile change.
- No font file added, downloaded, or loaded from a new remote origin.
- No accessibility behavior, focus style, reduced-motion support, semantic
  landmark, existing test, or output guard removed or weakened.
- No political, campaign, election, or LA28/Olympic content, language, or
  visual reference of any kind.
