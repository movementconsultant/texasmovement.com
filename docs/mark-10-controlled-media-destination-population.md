# Mark 10 Controlled TMM and Founder Media Feed Population (Handle-Locked Edition)

`/media` now renders three **owner-authorized, static source-destination records** in place of
the three Mark 9 single-item placeholders. Each record lists platform destinations — plain text
links to Texas Movement Media, Texas Movement editorial, or founder-associated accounts — built
from owner-supplied handles at build time. **No individual media item (video, post, episode) is
indexed. No API, RSS, embed, or scraping is used.** Two destinations (LinkedIn, Facebook) remain
inert pending a confirmed URL slug. HERO destinations are excluded entirely, per explicit
out-of-scope instruction.

Companion machine-readable file: `docs/mark-10-controlled-media-destination-population.json`
(same content, structured). Companion internal document:
`docs/internal/mark-10-media-destination-owner-review.md` (owner review checklist for the exact
URLs rendered — not published on this site).

> **Dated clarification (Mark 11, 2026-08-17):** the page architecture and rendering behavior
> described below were superseded by Mark 11 — see `docs/mark-11-tmm-preview-card-ux-optimization.md`.
> Two factual changes worth noting here rather than silently editing the history above: (1) the
> eight linkable destinations described in this document are now rendered as individual preview
> cards (one destination per card, grouped by source class), not as multiple links inside three
> record-level cards; (2) a destination that fails its link gate (LinkedIn, Facebook) now renders
> **nothing at all** — no card, no link, no inert "Owner URL required" text — where this document's
> Part C/E previously described that text rendering. The underlying data and gate logic this
> document describes are otherwise still accurate.

---

## Part A — Phase-shift record

This pass narrowly supersedes prior restrictions from Marks 7–9 — **and only these, and only for
the scope below**:

- "Placeholder only" (Mark 9's `linkMode: "no-link"` default).
- "Do not add external links" (Marks 7/8/8.1).
- "Non-rendered media record" (Mark 8's intake-registry framing).

**Scope of the supersession:** the existing local `media` content collection
(`src/content/media/`, `src/content.config.ts`, `src/lib/media-schema.ts`), the existing `/media`
route (`src/pages/media.astro`), and the existing TMM media-card/link-gate implementation
(`src/components/media/MediaCard.astro`, `MediaStatus.astro`, `MediaGrid.astro`) — specifically to
allow **static, owner-supplied canonical outbound links** to owner-identified sources.

**Everything else remains in force, unchanged:** no API/RSS/webhook/scraping/OAuth/embed/
analytics/automated-feed of any kind; no account modification, login, or verification; no new
platform, subdomain, newsletter, form, booking, checkout, sponsorship, or conversion funnel; no
merge, deploy, domain-binding, Cloudflare, DNS, or Pages change; no individual-media-item
population (dates, titles beyond the record's own owner-authorized title, metrics, images,
embeds).

---

## Part B — Owner-authorized source inventory (Canonical Handles)

| Source class | Platform | Handle (owner-supplied, display casing preserved) | Rendered URL |
|---|---|---|---|
| TMM | YouTube | texasmovementmedia | `https://youtube.com/@texasmovementmedia` |
| TMM | YouTube | texasmovementperformance | `https://youtube.com/@texasmovementperformance` |
| TMM | Instagram | tmmediausa | `https://instagram.com/tmmediausa` |
| TMM | TikTok | texasmovementmedia | `https://tiktok.com/@texasmovementmedia` |
| TMI | Substack | TexasMovement | `https://texasmovement.substack.com` |
| founder-AVM | YouTube | tmipresident | `https://youtube.com/@tmipresident` |
| founder-AVM | Instagram | alexanderofnazareth | `https://instagram.com/alexanderofnazareth` |
| founder-AVM | TikTok | AlexandervMathai | `https://tiktok.com/@alexandervmathai` |
| founder-AVM | LinkedIn | Alexander Mathai | **inert — no confirmed URL slug** |
| founder-AVM | Facebook | Alexander Mathai | **inert — no confirmed URL slug** |
| HERO | YouTube/Instagram/TikTok | herofootwear / herofootwearusa / herofootwear | **not processed — strictly out of scope** |

**URL construction method** (mechanical only, never guessed or scraped): YouTube
`youtube.com/@[handle]`, Instagram `instagram.com/[handle]`, TikTok `tiktok.com/@[handle]`,
Substack `[handle].substack.com` — path segments case-normalized to lowercase; the owner-supplied
display casing (e.g. "AlexandervMathai", "TexasMovement") is preserved only in the UI label text
(`linkText`) and the record's `handle` field, never in the URL itself.

---

## Part C — Why LinkedIn, Facebook, and HERO did not render

| Platform/source | Status | Reason |
|---|---|---|
| LinkedIn (founder-AVM) | Inert — `url: null`, `urlStatus: "inert-missing-evidence"` | This repository's own `scripts/check-public-output.mjs` unconditionally hard-fails the build if the string `linkedin.com` appears anywhere in `dist/` output (see its check for `isHeldPendingConfirmation()`-gated LinkedIn evidence in `src/lib/site.ts`). Weakening that guard was explicitly out of scope for this pass ("do not weaken existing safety guards"). |
| Facebook (founder-AVM) | Inert — `url: null`, `urlStatus: "inert-missing-evidence"` | No Facebook URL slug exists anywhere in this repository's local evidence. The Mark 10 brief explicitly prohibits guessing a slug from a display name. |
| HERO (all platforms) | Not created | Explicitly declared "STRICTLY OUT OF SCOPE — Do not render, do not link, do not process" in the Mark 10 brief. No HERO record, destination, or handle exists anywhere in `src/content/media/`. |

---

## Part D — Collection schema extension

`src/lib/media-schema.ts` gained a new `mediaDestinationSchema` (platform, handle, url-or-null,
`urlStatus` enum, `linkText`) and a `destinations` array field, plus a new `linkMode` value,
`"destination-index"`, alongside the existing Mark 9 `"no-link"` / `"owner-supplied-external-link"`
values. A destination-index record is a multi-platform static source list; the original single-
`canonicalUrl` gate from Mark 9 is untouched and still governs any future single-item record.

---

## Part E — Public rendering rules

| Rule | Behavior |
|---|---|
| **Record-level gate** | A `destinations[]` array only renders at all when `linkMode === "destination-index"`, `status !== "placeholder"`, `publicDisplayStatus === "approved-static-index"`, and `ownerApprovalStatus === "approved-static-index"` — all four simultaneously. |
| **Per-destination gate** | Within an approved record, each individual destination renders as a link only when its own `urlStatus === "owner-supplied"` **and** its `url` passes a syntactic http(s) check. A destination that fails renders as plain inert text ("Platform: Owner URL required") — never a link, never a button. |
| **Link text** | Descriptive, e.g. "Texas Movement Media on YouTube" — no bare "Watch"/"Follow"/"Subscribe" CTA text anywhere. |
| **No remote assets** | No logos, avatars, thumbnails, or OG-preview images are fetched or rendered for any destination. |
| **No individual-item indexing** | No date, title (beyond the record's own owner-authorized title), view/follower/subscriber count, or embed exists for any destination. |
| **Static only** | The `astro/loaders` `glob` loader reads only local JSON files committed to this repository, at build time only — no network request of any kind exists in this implementation. |

---

## Part F — alexandermathai.com (Part C of the brief) — blocked, not attempted

alexandermathai.com's `scripts/postbuild-guard.mjs` unconditionally fails the build if any string
from a fixed `SOCIAL_DOMAINS` list (`linkedin.com`, `youtube.com`, `instagram.com`, `tiktok.com`,
`facebook.com`, and others) appears anywhere in `dist/` output — regardless of any `verified`
flag's value. That repository's `src/data/social.ts` already defines the exact Mark 10 founder
handle set (LinkedIn, YouTube `tmipresident`, Instagram `alexanderofnazareth`, TikTok
`alexandervmathai`; no Facebook entry exists), every entry `verified: false`, with an explicit
code comment: "every social/ecosystem URL in this build is currently `verified: false`... and
should never render as a live href." Rendering any founder social URL on that site would trip this
guard. Weakening it was explicitly out of scope ("do not weaken any check here to make a build
pass; fix the underlying content instead" — the guard's own header comment; "Do not weaken
existing safety guards" — the Mark 10 brief). Per the brief's own designed escape valve, this is
reported as a blocker; **no file in alexandermathai.com was read, created, or modified for this
pass.**

---

## Part G — Test and release posture

```
npm run typecheck             → 0 errors, 0 warnings, 0 hints (33 files)
npm run test:unit              → 77 passed, 0 failed (77 total: prior suites + rewritten media-index suite)
npm run check:constants        → 0 errors, pre-existing unrelated drift warnings only (unchanged)
npm run build (PUBLIC_PREVIEW default) → 13 pages, postbuild guard: 0 errors
PUBLIC_PREVIEW=false npm run build     → 13 pages, postbuild guard: 0 errors
npm run ci                     → all green
npm run test:a11y              → 0 axe-core violations across all 13 routes including /media
```

Manual `dist/media/index.html` inspection confirmed exactly 8 rendered external `<a>` links — the
8 owner-authorized, `urlStatus: "owner-supplied"` destinations listed in Part B — and zero others:
no `linkedin.com`, no `facebook.com`, no HERO handle, no `<img>`, no `<iframe>`, no `<form>`, no
`mailto:`/`tel:`. (A pre-existing, sitewide `Organization` JSON-LD schema block — untouched by
this diff — separately lists HERO social URLs in its `sameAs` array on every page; this predates
Mark 10 and is unrelated to the media collection.)

**Existing release blockers, unaffected by this pass:** `hello@texasmovement.com` still
operationally unverified; the `public/CNAME` legacy conflict still unresolved; alexandermathai.com
founder social links remain `verified: false`; every non-media Mark 5/7/8 proof-registry and
source-identity entry remains `absent`/`owner-asserted`, not independently verified.

**This implementation does not authorize** API/RSS integration, media embeds, individual-media-
item population, account modification, claims expansion, conversion activation, merge, deployment,
domain binding, or publishing.
