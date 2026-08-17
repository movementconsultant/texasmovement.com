# Mark 17: "Intentional vs. Orphan" Completeness Audit

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

**Pure diagnostic report. No source code was changed, no fixes were applied, nothing was
committed to either repository's application code.** Covers both `texasmovement.com` (this
repository) and `alexandermathai.com` (a separate repository, audited read-only this pass — see
"Method" below). Findings only; every recommendation is deferred to a future, separate task.

---

## Method

- **Semantic sweep**: `grep -i` for `TODO|FIXME|TBD|placeholder|coming soon` across each repo's
  full tree, then manually excluded every match under `docs/` and `node_modules/` (ripgrep already
  excludes `node_modules/` by default via `.gitignore`).
- **Data layer sweep**: direct inspection of the source files that actually govern rendered
  content — `packages/constants/src/{social,org}.ts` and `src/lib/site.ts` (TMI); `src/data/social.ts`
  and `src/content/ecosystem/*.md` (AVM); the `media` content collection (TMI); `src/data/blocklist.json`
  / `src/data/telemetry-blocklist.json` (both).
- **DOM/visual sweep**: fresh `npm run build` (default `PUBLIC_PREVIEW=true`, i.e. current actual
  state) on both repos, then a temporary, uncommitted Playwright script (same static-server pattern
  as each repo's own `tests/a11y.mjs` / `test:e2e:preview`) navigated every route and queried the
  requested selectors plus a literal-phrase check for "preview build" / "site in development" /
  "coming soon" anywhere in visible body text. The script was deleted after use; `git status` was
  clean in both repos before this report was written.
- **Kill switch audit**: direct read of both blocklist JSON files plus a repeat of the mock/bypass
  grep already run in the Mark 15 launch-readiness pass.

---

## Part 1 — Semantic Sweep

**Headline finding: zero literal `TODO` or `FIXME` comments exist in either repository, and zero
matches in either repo qualify as a genuinely forgotten/orphaned note.** Every non-docs match is
either (a) intentional, user-facing copy that deliberately discloses incompleteness, or (b) active,
tested code infrastructure (a controlled-vocabulary enum value, a sentinel constant, a test
assertion) — never a stray comment left behind by accident. A third "false positive" case is called
out separately below.

### texasmovement.com

**Intentional UI Copy** (rendered, user-facing text):

| File | Line | Text |
|---|---|---|
| `src/pages/terms.astro` | 20 | "This page is a placeholder. {ORG.legalName} has not yet published full terms of use…" |
| `src/pages/privacy.astro` | 20 | "This page is a placeholder. {ORG.legalName} has not yet published a full privacy policy…" |
| `src/pages/accessibility.astro` | 20 | "This page is a placeholder. {ORG.legalName} has not yet published a formal accessibility…" |
| `src/pages/performance.astro` | 36 | "…Any future program referenced from this site is a placeholder until it is…" |
| `src/pages/media.astro` | 49 | `<div class="division-label">PLACEHOLDER MODULE</div>` |

**Orphaned Developer Notes:** none found.

**Intentional Code Infrastructure** (not user-facing copy, not orphaned — active, tested,
deliberately-designed systems; listed separately so they aren't mistaken for either category):

- The **`TBD` sentinel system** (`packages/constants/src/types.ts`'s `TBD`/`Tbd`/`Maybe<T>`,
  consumed by `org.ts` and `social.ts`) — an explicit, enforced "unknown ≠ blank" convention.
  `scripts/check-public-output.mjs` and `packages/constants/scripts/check.mjs` both actively fail a
  build if `TBD`/`__TBD__` ever leaks into public output. This is safety infrastructure, not debt.
- The **media schema's `"placeholder"` enum values** (`src/lib/media-schema.ts`, 6 occurrences) and
  the matching `!== "placeholder"` gate checks (`src/lib/media-destinations.ts`) — the controlled
  status vocabulary the Mark 9–11 content model is built on, actively validated by
  `tests/media-index.test.ts`.
- Test-file references to `"placeholder"`/`TBD` in `tests/media-index.test.ts`, `tests/site.test.ts`,
  `tests/hub-routes.test.ts` — these are test assertions verifying the above systems work, not
  leftover notes.
- `README.md`/`CLAUDE.md` mentions of the `TBD` convention — project documentation describing the
  above system, not incompleteness markers themselves.

### alexandermathai.com

**Intentional UI Copy:**

| File | Line | Text |
|---|---|---|
| `src/content/work/tmi-digital-ecosystem.md` | 16 | "…replaces a set of disconnected placeholders." (published work-entry prose) |
| `src/content/notes/building-this-site-in-the-open.md` | 12, 17 | Published note discussing the site's own no-fabricated-placeholder content policy |

**Orphaned Developer Notes:** none found.

**False positive (flagged, not a content gap):** `src/pages/contact.astro:106` —
`placeholder="https://"` is an HTML `<input>` **attribute** (form-field hint text), unrelated to
"incomplete content." The sweep's literal string match caught the attribute name, not a content
placeholder.

**Intentional — draft content, excluded from production build (not orphaned, not live UI copy):**

| File | `draft:` | Note |
|---|---|---|
| `src/content/work/consulting-case-study-deep-dive.md` | `true` | Title: "[Draft] Individual Consulting Case Study" — `summary` field literally contains the word "Placeholder," describing itself accurately |
| `src/content/notes/media-note-draft-placeholder.md` | `true` | Title: "[Draft] Media Note Placeholder" |

Both are excluded from `getCollection()` output at build time (confirmed: neither appears in the
DOM sweep's route list in Part 3, and neither has a corresponding `dist/` page). Logged previously
in PR #2's own description as "1 draft work entry + 1 draft note excluded from production."

**Intentional Code Infrastructure:** `scripts/postbuild-guard.mjs`'s `TBD` check (line 87–88) —
same enforced-sentinel pattern as TMI's guard, actively fails a build on any literal `TBD`.

---

## Part 2 — Data Layer Sweep

### texasmovement.com

| Category | Count | Source |
|---|---|---|
| `ECOSYSTEM_MAP` badge `"building"` | 8 of 11 | `src/lib/site.ts` |
| `ECOSYSTEM_MAP` badge `"private"` | 3 of 11 | `src/lib/site.ts` |
| `ECOSYSTEM_MAP` badge `"live"` | 0 of 11 | `src/lib/site.ts` |
| `HUB_ROUTES` `postureLabel: "Building — not yet live"` | 5 of 8 | `src/lib/hub-routes.ts` (consulting, media, performance, distribution, partners) |
| `HUB_ROUTES` `postureLabel:` other non-null | 1 of 8 | `/hero`: "External storefront / internally unaudited" |
| `HUB_ROUTES` `postureLabel: null` (no badge) | 2 of 8 | `/about`, `/ecosystem` |
| `ACCOUNTS` entries with `url: TBD` | 2 of 14 | `packages/constants/src/social.ts` (a media-lane TikTok, a performance-lane Instagram) |
| `VERIFIED_INBOXES` entries | **0** | `src/lib/site.ts` — every one of the 13 lane inboxes defined in `org.ts`'s `INBOXES` is unverified |
| `ORG` fields still `TBD` | 4 | `stateOfFormation`, `formationYear`, `mailingAddress.street`, `mailingAddress.postalCode` |
| Media collection: `canonicalUrl: null` | 3 of 3 records | Structural — not applicable to a `destination-index` record, not a gap (see Mark 10) |
| Media collection: individual `destinations[].url: null` | 2 (LinkedIn, Facebook on the founder record) | Both `urlStatus: "inert-missing-evidence"` — intentionally inert per Mark 10/11, not an oversight |

### alexandermathai.com

| Category | Count | Source |
|---|---|---|
| `ACCOUNTS` entries with `verified: false` | **11 of 11 (100%)** | `src/data/social.ts` |
| Ecosystem entries `status: "in-development"` | 3 of 6 | `founderlink`, `texas-movement-performance`, `texas-movement-social` |
| Ecosystem entries `status: "building"` | 1 of 6 | `hero-footwear` |
| Ecosystem entries other status | 2 of 6 | `texas-movement-consulting` (`select-engagements`), `texas-movement-media` (`publishing`) |
| Verified/confirmed contact endpoint | **0** | No `PUBLIC_CONTACT_ENDPOINT` (or equivalent) reference exists anywhere in `src/` — the contact form has no backend configured at all, not even a placeholder value |
| `plausibleDomain` (analytics) | empty string | `src/data/site.ts` — intentionally disabled, not a gap |

**Note on exact category wording:** the task asked for `status: "in development"` (with a space);
AVM's actual frontmatter value is `"in-development"` (hyphenated). Counted as a match on substance;
flagged here so the exact string isn't searched for and missed later.

---

## Part 3 — DOM/Visual Sweep

Selectors requested: `.stub-note`, `.division-status`, `.cta-badge`, and a "Preview build" banner.
**`.cta-badge` and a literal "Preview build" banner do not exist as rendered elements in either
repository's current working branch** — searched both compiled output and source; zero matches.
(A `.cta-badge`/"coming-soon" pattern is referenced in AVM's PR #1 description, but PR #1 is the
frozen placeholder branch, not the one either repo is currently built from.)

### texasmovement.com — 13 routes

| Route | `.stub-note` | `.division-status` | `.cta-badge` | "Preview build" phrase |
|---|---|---|---|---|
| `/` | — | 9 badges (mixed: In development ×6, Private ×3) | — | No |
| `/lanes` | — | 11 badges (Building ×8, Private ×3) | — | No |
| `/about` | 1 | — | — | No |
| `/ecosystem` | — | 10 badges (Building ×7, Private ×3) | — | No |
| `/consulting` | 1 | 1 ("Building — not yet live") | — | No |
| `/media` | 3 | 1 ("Building — not yet live") | — | No |
| `/performance` | 1 | 1 ("Building — not yet live") | — | No |
| `/distribution` | 1 | 1 ("Building — not yet live") | — | No |
| `/hero` | 1 | 1 ("External storefront / internally unaudited") | — | No |
| `/partners` | 1 | 1 ("Building — not yet live") | — | No |
| `/privacy` | 1 ("Policy content pending…") | — | — | No |
| `/terms` | 1 ("Policy content pending…") | — | — | No |
| `/accessibility` | 1 ("Formal accessibility statement pending…") | — | — | No |

**13 of 13 routes** carry at least one incompleteness marker (`.stub-note` and/or
`.division-status`). None carry a `.cta-badge` or a "Preview build" banner phrase.

### alexandermathai.com — 18 routes

| Route | `.stub-note` | `.division-status` | `.cta-badge` | `.status` (this repo's equivalent badge) | Phrase match |
|---|---|---|---|---|---|
| `/`, `/work`, `/work/*` (5), `/thesis`, `/notes`, `/notes/*` (3), `/ledger`, `/systems`, `/about`, `/contact`, `/privacy`, `/404` | — | — | — | — | No |
| `/ecosystem` | — | — | — | 6 badges: "Select engagements," "Publishing on social channels · site in development," "Building," "In development" ×2, "In development — exploration stage" | **Yes** |

Only `/ecosystem` carries any visual incompleteness marker on this repo — and it's a false-positive
trigger on the phrase check, not a separate banner: the phrase match is the literal substring "site
in development" inside one status badge's own label text ("Publishing on social channels · site in
development"), not a distinct "Preview build" component. **No `.stub-note`, `.division-status`, or
`.cta-badge` class exists anywhere in this repository's markup** — its equivalent pattern is
`StatusBadge.astro`'s `.status`/`.status--progress`/`.status--active` classes, used only on
`/ecosystem`'s division cards.

**`/ledger` and `/systems` carry neither the requested selectors nor any `.status` badge** — in
their current fallback state (see Part 4 / Mark 13), they render their own distinct
`.ledger-fallback` / `.live-systems-fallback` container classes instead, confirmed present in
`dist/ledger/index.html` and `dist/systems/index.html`. Flagged here since it's a real
incompleteness-adjacent signal the requested selector list didn't anticipate.

---

## Part 4 — Kill Switch Audit

| File | State | Entries |
|---|---|---|
| `texasmovement.com/src/data/telemetry-blocklist.json` | Clean | `youtube.blockedVideoIds: []` |
| `alexandermathai.com/src/data/blocklist.json` | Clean | `github.blockedShas: []`, `substack.blockedUrls: []`, `youtube.blockedVideoIds: []` |

Both files are committed in exactly the empty state described in their own Mark 13 documentation —
no lingering test SHA, URL, or video ID in either. Repeated the Mark 15 mock/bypass grep
(`mock|fake|stub|sandbox|EGRESS_BLOCKED|bypass|simulate`, case-insensitive) against both repos'
`src/lib/telemetry` (TMI) and `src/lib` (AVM) telemetry code this pass: **zero matches, confirmed
again.** The fallback rendering (`.ledger-fallback`, `.live-systems-fallback`, `/media`'s
"Latest Signal" `.stub-note` fallback) is real error-handling output, not test scaffolding.

---

## Summary

- **No true orphaned developer notes exist in either repository.** Every TODO/FIXME/TBD/placeholder
  match is either deliberate user-facing disclosure or active, tested infrastructure.
- **texasmovement.com's incompleteness is comprehensive and consistent**: 13/13 routes carry at
  least one honest incompleteness marker; 0 `ECOSYSTEM_MAP` entries are `"live"`; 0 verified
  inboxes.
- **alexandermathai.com's incompleteness is concentrated differently**: only `/ecosystem` carries a
  visible status marker, but 11/11 social links are `verified: false` and there is no configured
  contact-form endpoint at all — the gap is in data verification and backend wiring, not visible
  page copy.
- **The two newest routes (`/ledger`, `/systems` on AVM; the "Latest Signal" section on TMI's
  `/media`) all render in their fallback state**, consistent with the unresolved
  network-verification gap already disclosed in the Mark 13 implementation docs — not a new finding,
  but confirmed still open as of this pass.
- **This report makes no recommendation and applies no fix.** Every item above is a factual
  inventory only, for a future, separate, explicitly-scoped task to act on.
