# Mark 11 Confirmed Media Destinations, Privacy-Safe Preview Cards, and TMM Media UX Optimization

`/media` now renders **eight owner-confirmed source destinations** as individual, privacy-safe
static preview cards, grouped into three source sections — Texas Movement Media, Texas Movement
Editorial, Founder Media. Each card carries a local abstract visual, a restrained source-type
badge, a compact confirmation note, and a single descriptive outbound link. **No platform embed,
API call, RSS fetch, remote image, or individual media item exists anywhere on this page.**

Companion machine-readable file: `docs/mark-11-tmm-preview-card-ux-optimization.json` (same
content, structured). Companion internal document:
`docs/internal/mark-11-media-source-confirmation-and-review.md` (owner confirmation record and
review checklist — not published on this site).

---

## Part A — Phase-shift record

The owner confirmed all eight destinations rendered since Mark 10 belong in the static source
index. This pass:

- Adds a new, narrower status axis — `confirmationStatus` — to each destination, distinct from
  the existing `urlStatus` link gate (unchanged).
- Upgrades the visual/UX presentation of the existing destination index into grouped preview
  cards.
- **Does not** claim platform verification, current activity, content-rights clearance, or
  automatic TMI/TMM/AVM cross-attribution for any destination — see Part C.

Scope stayed narrow to `movementconsultant/texasmovement.com`, branch
`claude/texas-movement-rebuild-pq14fo`, PR #1 (kept draft). alexandermathai.com was not touched.

---

## Part B — Confirmation-status semantics

Four controlled values, added to `mediaDestinationSchema` in `src/lib/media-schema.ts`, optional
per destination:

| Value | Meaning |
|---|---|
| `owner-authorized-handle-derived` | The owner authorized a source label/handle and the URL was mechanically derived from it under a documented platform URL rule (the Mark 10 starting state). |
| `owner-confirmed-source-destination` | The owner has reviewed this specific destination and confirms it belongs in the static index — **not** a claim the URL string itself was independently re-verified. |
| `owner-supplied-canonical-url` | The owner directly supplied the canonical URL (not derived from a handle). Not used by any current record. |
| `owner-confirmed-canonical-url` | The owner has reviewed and confirmed the exact canonical URL string. Not used by any current record. |

**Explicitly excluded from this vocabulary, everywhere in this pass:** `verified`, `official`,
`active`, `live`, `current`, `operational`, `platform-approved`, `independently-audited`. None of
these can be truthfully claimed about a third-party platform account from local, static data.

All eight rendered destinations now carry `confirmationStatus: "owner-confirmed-source-destination"`.
This is distinct from, and does not change, individual-media-item approval (`crossAttributionStatus`
stays `"prohibited-pending-per-item-approval"` on every record) or the underlying `urlStatus` link
gate.

---

## Part C — What owner confirmation does and does not mean

| Statement | True? |
|---|---|
| The destination belongs in the TMM static source index. | Yes — this is the entirety of what `owner-confirmed-source-destination` means. |
| The platform has verified this account. | **No.** No platform verification occurred or is claimed. |
| The account is currently active, live, or publishing. | **No.** No activity claim is made anywhere. |
| Content rights for any specific item are cleared. | **No.** No individual item exists yet; rights review is a separate, unstarted gate. |
| This destination is automatically Texas Movement International or Texas Movement Media editorial content. | **No.** Founder-associated destinations stay separately attributed; `crossAttributionStatus` remains `prohibited-pending-per-item-approval` on every record. |
| Individual media items (videos, posts, episodes) from this source are approved for display. | **No.** Gates G-M1–G-M8 in `docs/internal/mark-8-tmm-unified-media-feed-architecture.md` remain fully in force and unmet. |

---

## Part D — Preview-card design and privacy choices

Each confirmed destination renders as one `MediaCard.astro` instance containing:

1. **Source identity** — a restrained source-type badge (`.media-card-source-badge`: "Texas
   Movement Media" / "Texas Movement editorial" / "Founder media"), a text-only platform mark
   (`MediaPlatformMark.astro`: e.g. "YT", "IG", "TT", "SUB" — decorative, `aria-hidden`, always
   paired with the visible platform name), and the source label as the card's heading.
2. **Static visual preview** (`MediaPreviewArt.astro`) — purely local: inline SVG geometry (a
   frame + two rule lines) plus a typographic monogram derived from the source label, tinted per
   source class using this site's own two existing accent tokens (`--compression` for TMM,
   `--tension` for founder media, neutral ink/paper tones for TMI). **No platform logo, remote
   thumbnail, fake video frame, fake post grid, or fake metric is rendered anywhere.**
3. **Contextual description** — one line: "{Source type} source destination." No language implying
   current publication, latest content, episode availability, or platform verification.
4. **Controlled external destination link** — the confirmed static URL only, rendered with a
   descriptive label (e.g. "Texas Movement Media on YouTube"), `target="_blank"`, and
   `rel="noopener noreferrer"`, plus a visually-hidden "(opens in a new tab)" cue for accessible
   context beyond the icon-free label. Never a generic "Click here," never a "Watch"/"Follow"/
   "Subscribe" CTA.
5. **Status/boundary note** (`MediaStatus.astro`) — three short pills: the plain-English
   confirmation line ("Source destination confirmed by owner."), "Individual media entries are
   reviewed separately.", "No platform embed is used." Replaces the denser Mark 9/10 record-level
   status list, which no longer maps cleanly onto a per-destination card.

---

## Part E — External-link gate behavior (retained, relocated)

The record-level and per-destination gates from Mark 10 are unchanged in substance, now
centralized in `src/lib/media-destinations.ts`'s `getConfirmedDestinations()` — the single place
the page evaluates them — with `MediaCard.astro` re-checking `isSafeHttpUrl(url)` a second time
before rendering an anchor (defense in depth, never trusting a single upstream flag):

- **Record-level gate:** `linkMode === "destination-index"`, `status !== "placeholder"`,
  `publicDisplayStatus === "approved-static-index"`, `ownerApprovalStatus === "approved-static-index"`,
  simultaneously.
- **Per-destination gate:** `urlStatus === "owner-supplied"` and the URL passes a syntactic
  http(s) check.
- **A destination that fails either gate renders nothing at all** — no card, no link, no inert
  placeholder text. (This is a behavior change from Mark 10, where a failing destination rendered
  visible "Owner URL required" text inside its parent record's card. Under the new per-destination
  card architecture, only confirmed, linkable destinations get a card.)

---

## Part F — Source groups and rendered destination count

| Group | Section heading | Destinations rendered |
|---|---|---|
| TMM | Texas Movement Media | 4 (YouTube ×2, Instagram, TikTok) |
| TMI | Texas Movement Editorial | 1 (Substack) |
| founder-AVM | Founder Media | 3 (YouTube, Instagram, TikTok) |
| **Total** | | **8** |

---

## Part G — LinkedIn, Facebook, HERO exclusion status

| Source | Status | Reason |
|---|---|---|
| LinkedIn (founder-AVM) | Not rendered — no card, no link, no inert text | No confirmed URL slug exists in local evidence; this repository's `scripts/check-public-output.mjs` additionally hard-fails the build on any `linkedin.com` string. The record still carries the entry with `url: null`, `urlStatus: "inert-missing-evidence"`, no `confirmationStatus`, for the owner's own audit trail. |
| Facebook (founder-AVM) | Not rendered — no card, no link, no inert text | No Facebook URL slug exists anywhere in local evidence; guessing one from a display name is prohibited. Same audit-trail retention as LinkedIn. |
| HERO (all platforms) | Not created | Strictly out of scope per this task's explicit instruction. No HERO record, destination, preview, product, or storefront link exists anywhere in this repository's media collection. |

---

## Part H — Individual media-item requirements that remain unresolved

Nothing in this pass advances any individual media item toward publication. Still required before
any individual video/post/episode can appear: gates G-M1 through G-M8
(`docs/internal/mark-8-tmm-unified-media-feed-architecture.md` Part D), a completed intake
template (`docs/internal/mark-8-tmm-media-item-intake-template.md`), and owner final authorization
(`ownerApprovalStatus`, which — per gate G-M8 — may not be delegated). No record's
`editorialStatus`/`rightsStatus`/`transcriptStatus`/`publicationDateStatus` changed in this pass.

---

## Part I — Validation performed this pass

```
npm run typecheck              → 0 errors, 0 warnings, 0 hints (36 files)
npm run test:unit               → 84 passed, 0 failed
npm run check:constants         → 0 errors (pre-existing unrelated drift warnings only, unchanged)
npm run build (default)         → 13 pages, postbuild guard: 0 errors
PUBLIC_PREVIEW=false npm run build → 13 pages, postbuild guard: 0 errors
npm run ci                      → all green
npm run test:a11y               → 0 axe-core violations across all 13 routes including /media
```

Manual `dist/media/index.html` inspection confirmed: exactly 8 `.media-card` elements; exactly 8
outbound `<a>` links, matching the 8 confirmed destinations, each with `target="_blank"` and
`rel="noopener noreferrer"`; zero `linkedin.com`/`facebook.com`/HERO strings; zero `<iframe>`,
`<form>`, remote `<img>`, or new `<button>` introduced by this pass (the one pre-existing `<img>`
is the sitewide local logo asset; the one pre-existing `<button>` is the sitewide nav toggle —
both unrelated to media, untouched by this diff); one `<h1>`; correct nested heading hierarchy
(`h2` group wrapper → `h3` per source group → `h4` per card). `dist/sitemap.xml` and
`dist/robots.txt` are unchanged from pre-existing sitewide Building-phase behavior (empty sitemap,
full disallow) — not affected by this pass.

---

## Part J — Explicit non-actions

This pass did **not**: add an embed, API call, RSS fetch, scraper, or OAuth flow; modify any
platform account; change Cloudflare, DNS, domains, or deployment settings; merge, deploy, or
publish; touch alexandermathai.com in any way; populate any individual media item; or change any
non-media route's content or posture.

---

## Owner reminder

After this phase completes, review every owner-confirmed source destination (see
`docs/internal/mark-11-media-source-confirmation-and-review.md`) and correct any outdated URL,
handle, classification, or relationship **before** any future individual-media-item phase begins.
Confirmation of a source destination is not a substitute for reviewing an individual item before it
is ever published.
