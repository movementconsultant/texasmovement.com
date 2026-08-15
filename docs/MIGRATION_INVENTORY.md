# Migration inventory — texasmovement.com (TMI hub)

Snapshot taken before any scaffolding was touched, on the `claude/texas-movement-rebuild-pq14fo`
branch (created fresh from `main`).

## Branches at time of survey

```
$ git branch -a -v
* main   359f69d Revise index.html for improved content and structure
  remotes/origin/HEAD -> origin/main
  remotes/origin/main  359f69d Revise index.html for improved content and structure
```

Only `main` exists in this repository — there is no `tmm-hub-redesign`-style parallel branch here
(that situation is specific to `media.texasmovement.com`, a different repo, and is out of scope for
this build). `main` HEAD SHA at survey time: `359f69d9b667215a7edab704254b12ac1ae99443`.

Recent history on `main` (for context on what "current live" means):

```
359f69d Revise index.html for improved content and structure
5ded1a7 Update contact email addresses in index.html
aee9cd8 Texas Movement Main Blueprint Update July 1 2026
f4bc0d7 Update index.html
d4be086 Update descriptions to include IP defense
```

## Every file in the repo at start of work

| Path | Purpose | Referenced by index.html? |
|---|---|---|
| `index.html` | The entire live site (single page, ~30KB, 988 lines) | — (is the page) |
| `CNAME` | GitHub Pages custom domain config | not an HTML reference, but required for `texasmovement.com` to resolve on Pages |
| `README.md` | One line: `# texasmovement.com` | no |
| `01_primary_stacked.png` | Brand mark, primary/stacked lockup, opaque | not referenced by index.html directly (only the transparent variant is) |
| `01_primary_stacked_transparent.png` | Brand mark, primary/stacked lockup, transparent bg | yes — header brand mark (`<img>` in `.brand-mark`) |
| `02_globe_avatar.png` | Globe/avatar mark, opaque | no (orphaned — no `<img>`/CSS reference in index.html) |
| `02_globe_avatar_transparent.png` | Globe/avatar mark, transparent | no (orphaned) |
| `03_horizontal_lockup.png` | Horizontal wordmark lockup, opaque | no (orphaned) |
| `03_horizontal_lockup_transparent.png` | Horizontal wordmark lockup, transparent | no (orphaned) |
| `04_watermark.png` | Watermark asset | no (orphaned) |
| `05_banner_header.png` | Ecosystem diagram banner | yes — hero figure image (`.hero-banner`) |
| `06_post_footer_template.png` | Social post footer template | no (orphaned — social-media production asset, not a web asset) |
| `07_tmi_monogram_badge.png` | Monogram badge, opaque | no (orphaned) |
| `07_tmi_monogram_badge_transparent.png` | Monogram badge, transparent | no (orphaned) |
| `linkedin_footer_banner.png` | LinkedIn banner asset | no (orphaned — social-media production asset) |
| `og-image.png` | Open Graph share image | referenced only via absolute URL in `<meta property="og:image">`... actually the live HTML points OG image at `05_banner_header.png`, not this file. `og-image.png` itself is unreferenced by the live HTML (orphaned but clearly intended as an OG asset). |
| `og-square.png` | Square OG/social image | no (orphaned) |

None of the "orphaned" files are deleted in this migration — per instructions, nothing is removed
from history or from the working tree's asset set. All 13 PNGs move into `public/` verbatim (byte
for byte, same filenames) so every existing external hotlink/bookmark to
`https://texasmovement.com/<file>.png` keeps resolving. The previously-orphaned assets are also
wired into real usage in the rebuild where it made sense (see "Asset usage in rebuild" below)
instead of staying dead weight.

`index.html` itself is preserved at `legacy/index.html` (moved with `git mv`, full history intact)
rather than deleted — its content doesn't move 1:1 to a single new file (it's decomposed across
several `.astro` pages/components instead), so there's no single "new" file to `git mv` it to. It
is not referenced or served by the Astro build; it's kept purely as an exact historical snapshot of
the page this rebuild is based on, for anyone diffing old vs. new by hand. `CNAME` moves to
`public/CNAME` so `astro build` copies it straight into `dist/CNAME`, matching where GitHub
Pages / Cloudflare Pages expect it. `README.md` stays at the repo root unchanged (standard
top-level convention for a project README).

## Static asset dimensions

| File | Dimensions | Size |
|---|---|---|
| `01_primary_stacked.png` | 2048×2048 | 194 KB |
| `01_primary_stacked_transparent.png` | 2048×2048 | 217 KB |
| `02_globe_avatar.png` | 2048×2048 | 172 KB |
| `02_globe_avatar_transparent.png` | 2048×2048 | 188 KB |
| `03_horizontal_lockup.png` | 2560×1024 | 167 KB |
| `03_horizontal_lockup_transparent.png` | 2560×1024 | 190 KB |
| `04_watermark.png` | 2400×640 | 112 KB |
| `05_banner_header.png` | 2560×1440 | 164 KB |
| `06_post_footer_template.png` | 2048×2048 | 63 KB |
| `07_tmi_monogram_badge.png` | 2048×2048 | 255 KB |
| `07_tmi_monogram_badge_transparent.png` | 2048×2048 | 329 KB |
| `linkedin_footer_banner.png` | 1584×230 | 90 KB |
| `og-image.png` | 1200×630 | 63 KB |
| `og-square.png` | 1200×1200 | 87 KB |

## Asset usage in rebuild

- `01_primary_stacked_transparent.png` — header brand mark (unchanged usage), and copied to
  `public/logo.png` so the vendored `organizationJsonLd()` helper's hardcoded
  `${PROPERTIES.tmi.url}/logo.png` reference resolves to a real file. (`organizationJsonLd()` is
  used unmodified from `@tmi/constants`; its `logo` field is not a parameter, so the fix has to be
  "make `/logo.png` exist," not "change the function.")
- `05_banner_header.png` — hero figure image (unchanged usage).
- `og-image.png` — copied to `public/og-tmi.png` so `seo.ts`'s `ogImage("tmi")` helper
  (`${url}/og-${property}.png`) resolves; used as the OG/Twitter image on every page of this site.
- `og-square.png` — left in place at `public/og-square.png`; not currently wired to a meta tag
  (no square-image use case identified on this single-property site) but preserved for future use.
- The other seven previously-orphaned files (`02_*`, `03_*`, `04_watermark`, `06_*`,
  `07_*` ×2, `linkedin_footer_banner.png`) remain unreferenced by any page — they are brand-kit /
  social-production assets, not web assets, and stay in `public/` at their original paths purely so
  nothing already linking to them 404s.

## CNAME

Exact content: `texasmovement.com` (single line, no trailing content). Copied verbatim into
`public/CNAME` so the Astro build output still serves the custom domain once someone points hosting
at `dist/`.

## Rollback plan

To roll back, `git checkout main` — `main` is untouched by this work. Delete the feature branch
(`claude/texas-movement-rebuild-pq14fo`) if you want it gone entirely. The live GitHub Pages deploy
(driven by whatever branch/action currently publishes `main`'s `index.html`) was never repointed at
this branch, so rollback is a no-op unless and until someone merges the PR from this branch into
`main`. Nothing in this migration touches `main` or the Pages deploy source.

## `tmm-hub-redesign` branch diff

Not applicable to this repo. That branch (per the brief) belongs to `media.texasmovement.com`, a
separate repository not in scope for this build. No such branch exists here — see the branch list
above.

## Known follow-up (vendoring)

`@tmi/constants` is vendored at `packages/constants/` via a local `file:` dependency in
`package.json` (`"@tmi/constants": "file:./packages/constants"`) because `create_repository` for
`movementconsultant/tmi-constants` failed with `403 Resource not accessible by integration` (GitHub
App installation lacks repo-creation permission — this was hit during the constants-package prep
step, before this repo's work began, per the common brief). Once
`@movementconsultant/constants` exists as a real published package, swap the dependency line to the
npm alias form (`"@tmi/constants": "npm:@movementconsultant/constants@^0.1.0"`) — no import rewrites
are needed anywhere in `src/`, since every import already reads `from "@tmi/constants"`.

## Content/data reconciliation notes (old HTML vs. `@tmi/constants` as source of truth)

The current live `index.html` predates the constants package and contains a few facts that don't
match the manifest. Per the common brief, `@tmi/constants` is authoritative; these are the specific
places the rebuild diverges from the old page's literal content, and why:

1. **Consulting's LinkedIn link removed.** Old page linked the Consulting division card to
   `linkedin.com/company/texas-movement-consulting`. `@tmi/constants`' `social.ts` `ACCOUNTS` has no
   `consulting`-lane LinkedIn entry — the only LinkedIn entry is lane `tmi`,
   `linkedin.com/company/texasmovement` (a different handle). Rather than publish an unverified
   handle, the mismatched link was dropped from the Consulting card in the rebuild. The `tmi`-lane
   LinkedIn account is still published (in `organizationJsonLd()`'s `sameAs` via
   `publishableAccounts()`). Flagged for owner reconciliation — see `docs/LAUNCH_BLOCKERS.md`.
2. **"Follow the network" section re-sourced from `ACCOUNTS`.** The old page hand-wrote four social
   blocks (Founder, HERO & Fashion, Media, Performance). The rebuild keeps the same four blocks but
   populates their links from `accountsForLane()` / `publishableAccounts()` instead of the old
   hard-coded hrefs, which surfaces a few differences:
   - Founder block gains TikTok (`@AlexanderVMathai`) and Substack (`texasmovement.substack.com`),
     which the old page didn't list but the manifest has as confirmed founder-lane accounts.
   - HERO block gains TikTok (`@herofootwear`); the old page's YouTube handle capitalization
     (`@HEROFootwear`) is normalized to the manifest's `@herofootwear` (same account, manifest is
     authoritative on casing).
   - Media block gains a second Instagram (`@tmmusa` alongside `@tmmediausa`); Media's TikTok stays
     omitted because it's `TBD` in `social.ts` (not a confirmed handle — per the no-TBD-in-public-
     output rule, it is silently absent rather than rendered as a broken/placeholder link).
   - Performance's Instagram stays omitted for the same reason (`TBD` in `social.ts`).
3. **Raw `mailto:Alexander@TexasMovement.com` CTA removed**, replaced with a link routing through
   FounderLink (`https://founderlink.texasmovement.com`). Full rationale in
   `docs/LAUNCH_BLOCKERS.md` and the PR description — short version: that address
   (`FOUNDER.publicEmail` / `alexander@texasmovement.com` in `org.ts`) is not in
   `VERIFIED_INBOXES`, and the common brief prohibits exposing an unverified inbox as a live CTA
   destination.
4. **Organization JSON-LD rebuilt from `organizationJsonLd()`** (vendored, unmodified) instead of
   the old hand-written schema block. Notable differences: the old block's `sameAs` had 2 entries
   (a mismatched LinkedIn handle + `alexandermathai.com`); the new one has every
   `publishableAccounts()` URL ecosystem-wide (11 accounts as of this build, all lanes), and omits
   the old `contactPoint` array entirely (both of its entries — general-inquiry email and
   FounderLink URL — are not part of the vendored `organizationJsonLd()` shape; adding a
   hand-rolled `contactPoint` back in would mean maintaining a second, un-vendored schema shape, so
   it was left out. FounderLink is still linked prominently in on-page CTAs; the general-inquiry
   email is not published anywhere, per the inbox-verification rule). The old page's separate
   `WebSite` and `BreadcrumbList` JSON-LD blocks are not part of `@tmi/constants`; a minimal
   hand-written `WebSite` block (referencing the vendored Organization by `@id`) is kept for parity,
   `BreadcrumbList` was dropped as low-value (it only ever listed "Home").
5. **Distribution, Reparations, and Social lane cards keep their full label/title/description copy**
   on the new `/lanes` page, but their outbound "Website →" links are disabled (rendered as plain
   text with a "Building — not yet live" note) because `PROPERTIES[key].status === "building"` for
   all three in `ecosystem.ts`. The common brief states only `status: "live"` properties may appear
   as nav/link destinations; the old page linked all three live already (they resolve today on
   GitHub Pages), so this is a deliberate tightening, not a content loss — the copy is 100%
   preserved, only the clickability changed. Flagged in `docs/LAUNCH_BLOCKERS.md`.

No other content was cut. Every heading, paragraph, list item, and lane description from the old
`index.html` is present somewhere in the new Astro pages (see PR description for a per-route
before/after structural comparison).

---

## Pass 2 — homepage placeholder/hub rewrite + LinkedIn hold (this commit)

Scoped placeholder-launch pass. Touched only the homepage (`src/pages/index.astro`), the shared
lib/layout/header it depends on, and the public-output guard. `/lanes`, `/privacy`, `/terms`, and
`/accessibility` were NOT touched by this pass.

### Homepage content removed (with rationale — nothing silently dropped)

1. **The "About TMI" essay section** (`#about`, ~3 paragraphs on "why Texas Movement exists" plus
   a "Mark & Monogram" aside). Removed because this pass reframes the homepage as an honest,
   general placeholder/hub rather than a full pitch page. The load-bearing facts in that essay
   (systems company, founders/athletes/cities, disciplined execution) are preserved — they're
   folded into the new hero copy and the "What we are building" section, both sourced from
   `ORG.boilerplate` / `ORG.tagline` in `@tmi/constants`. The more editorial/brand-voice language
   ("structure creates leverage," the monogram-motif aside) is NOT reproduced anywhere and has no
   other home on this site. This is a deliberate, logged removal, not an oversight.
2. **The full "Follow the Network" section** (`#network`) — four `NetworkBlock`s (Founder, HERO &
   Fashion, Media, Performance) listing every confirmed social handle per lane, plus a "Step into
   the network" recruiting call for future hosts/collaborators. Removed in full. None of this
   content has another home on this site (`/lanes` does not list social handles except HERO's
   Instagram). This is a deliberate, logged removal — social presence still exists in
   `packages/constants/src/social.ts` and continues to back `safeOrganizationJsonLd()`'s `sameAs`
   list; it's simply no longer rendered as a dedicated homepage section. If Alexander wants a
   "follow us" surface back, `liveSocialAccountsForLane()` in `src/lib/site.ts` still supports
   rebuilding it.
3. **Two hero CTA buttons** ("Find your lane" → `/lanes`, "Start intake via FounderLink" →
   FounderLink). Per this pass's explicit instruction ("exactly one primary CTA... there is no
   second CTA"), both `.btn`-styled buttons were removed from the hero. The underlying
   destinations are NOT lost — `/lanes` is linked as plain inline text in the hero copy and again
   in the new "Explore the ecosystem" section, and FounderLink remains a live item in that same
   ecosystem grid and in the header nav. Only the button-level CTA styling was removed, to keep
   the page to exactly one primary CTA slot (see `docs/LAUNCH_BLOCKERS.md` for that CTA's current
   state).
4. **Lane teaser section duplicating `/lanes`'s card labels** (`#core-lanes` / `#product-lanes` on
   the homepage — a bare list of division-label chips with no links or descriptions). Replaced by
   the new "Explore the ecosystem" section, which does the same job with real content: live
   properties as real links, building properties named as plain "in development" items. The full
   lane detail (descriptions, per-lane links) continues to live exclusively on `/lanes`, as
   before.

### Homepage content added / changed

- New hero copy grounded in `ORG.tagline` ("Systems for people who move") and `ORG.boilerplate`,
  plus Alexander's supplied framing language ("operates at the intersection of performance,
  culture, media, technology, and disciplined execution") — no new specifics invented beyond what
  `@tmi/constants` already states.
- New "What we are building" section (`#building`) — a few sentences summarizing the real lane
  structure, built by paraphrasing each `PROPERTIES[key].role` string already in `ecosystem.ts`.
  No product claims invented beyond the existing `role` text.
- New "Explore the ecosystem" section (`#ecosystem`) — lists the 9 non-`tmi`, non-`founder`
  properties in `PROPERTY_ORDER`. Live properties (`consulting`, `founderlink`, `performance`,
  `health`, `hero`, `media`) render as real `<a>` links to their live URL. Building properties
  (`distribution`, `reparations`, `social`) render as plain text with an "In development" badge —
  this reuses the exact `isLiveProperty()` gate and the `.division-status` badge class DivisionCard
  already uses on `/lanes` for the identical purpose, per this pass's explicit instruction not to
  reinvent that pattern.
- Header nav: the `/#about` link (pointed at the now-removed About section) was changed to
  `/#ecosystem` (label "Ecosystem"), pointing at the new section instead. No other nav items
  changed.

### Contact CTA (this pass)

The homepage now has exactly one primary-CTA slot, reserved for "Contact Texas Movement" —
conditionally wired per `verifiedGeneralContact()` in `src/lib/site.ts`. `VERIFIED_INBOXES` is
still empty on this branch (unchanged by this pass — see `docs/LAUNCH_BLOCKERS.md` for why it was
NOT added even though Alexander approved the address name/brand), so `verifiedGeneralContact()`
returns `null` and the CTA section is not rendered at all — confirmed by inspecting
`dist/index.html` after a build: no `mailto:`, no `.btn`, no `#contact` section present.

### LinkedIn URL — held pending confirmation (new in this pass)

Alexander's decision: "Texas Movement International is the official LinkedIn Company Page
identity. Do not link to either conflicting legacy LinkedIn URL until I provide the exact
canonical Company Page URL." Two URLs are in play, neither confirmed:

- `https://www.linkedin.com/company/texas-movement-consulting` — used in the old live
  `legacy/index.html`, never present in `@tmi/constants`.
- `https://www.linkedin.com/company/texasmovement` — currently sitting in
  `packages/constants/src/social.ts` `ACCOUNTS`, lane `"tmi"`, as a non-`TBD` value. Before this
  pass, this URL WAS flowing into `organizationJsonLd().sameAs` via `publishableAccounts()` (which
  only excludes literal-`TBD` entries, not business-unconfirmed-but-technically-present ones).

This pass adds a `HELD_PENDING_CONFIRMATION` filter in `src/lib/site.ts` that excludes this exact
URL from `liveSocialAccounts()`, `liveSocialAccountsForLane()`, and a new `safeOrganizationJsonLd()`
wrapper (which `src/layouts/Layout.astro` now imports instead of the raw
`organizationJsonLd()` from `@tmi/constants`). Verified after build: the string
`linkedin.com/company/texasmovement` does not appear anywhere in `dist/`, and
`scripts/check-public-output.mjs` now fails the build if either legacy URL ever leaks back in. A
placeholder `LINKEDIN_URL_PENDING = true` flag was added to `src/lib/site.ts`, unread by any
rendering path, purely so wiring in the real URL later is a small, obvious change (see the code
comment on `HELD_PENDING_CONFIRMATION` for the exact un-hold steps).

The vendored `social.ts` `ACCOUNTS` entry itself was NOT edited — its URL is left as-is (still
unconfirmed) since editing it would require guessing the real canonical URL, which this pass does
not have. See `docs/LAUNCH_BLOCKERS.md`.

### Files touched in this pass

`src/pages/index.astro` (full rewrite), `src/components/Header.astro` (nav link),
`src/layouts/Layout.astro` (JSON-LD source), `src/lib/site.ts` (LinkedIn hold, safe JSON-LD
wrapper, CTA label constant), `src/styles/global.css` (small additive CSS for the new ecosystem
grid — no existing rules changed), `scripts/check-public-output.mjs` (new check #6),
`tests/site.test.ts` (new coverage for the above), plus the doc updates listed in this file's diff
and in `docs/LAUNCH_BLOCKERS.md`. New root/`docs/` scaffolding files (`CLAUDE.md`,
`docs/PROJECT_BRIEF.md`, `docs/BRAND_SYSTEM.md`, `docs/SITE_ARCHITECTURE.md`,
`docs/IMPLEMENTATION_PLAN.md`, `docs/IMPLEMENTATION_STATUS.md`) were added; `README.md` was
expanded from a single line.
