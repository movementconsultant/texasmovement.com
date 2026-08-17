# Mark 9 Controlled TMM Feed Implementation and Content Seeding

`/media` now renders a controlled, static, build-time TMM editorial index: exactly three
structural placeholder records, loaded from a local content collection at build time. **No real
media has been verified, linked, embedded, published, or ingested.** Every rendered record is
visibly a placeholder pending owner review, not a claim of real editorial content.

Companion machine-readable file: `docs/mark-9-controlled-tmm-feed-implementation.json` (same
content, structured). Companion internal document:
`docs/internal/mark-9-media-placeholder-owner-update-guide.md` (exact fields/evidence an owner
needs to advance a placeholder — not published on this site).

---

## Part A — Phase-shift record

This pass intentionally supersedes six prior restrictions from Marks 7, 8, and 8.1 — **and only
these, and only for this narrow scope**:

- "Do not render media data."
- "Keep `/media` only as a Building placeholder."
- "Do not add external links."
- "Do not create a media collection or public media index."
- "Do not create public media-card UI."
- "Do not create approved static link-out structures."

**Scope of the supersession:** the `/media` route's rendering, the local `media` data collection
(`src/content/media/`, `src/content.config.ts`), static owner-review placeholder records, and the
controlled, multi-condition-gated future static link-rendering capability built into
`MediaCard.astro` — which **no seeded record in this pass activates**.

**Everything else from Marks 7 and 8 remains in force**, unchanged: no API integration, no RSS/
feed automation, no account verification, no embeds, no iframes, no media publication, no claims
approval, no infrastructure/deployment/domain change.

---

## Part B — Collection schema

27 fields, defined once in `src/lib/media-schema.ts` (a plain module, importable by both
`src/content.config.ts` at build time and `tests/media-index.test.ts` under vitest) and reused by
`src/content.config.ts`'s `defineCollection`. Full field-by-field detail is in the JSON companion
→ `partB_collectionSchema.fields`.

**Explicit difference between states**, using `canonicalUrlStatus` as the example: `placeholder`
(default — no evidence exists) → `owner-confirmation-required` (owner intends to supply one) →
`owner-supplied` (a real URL is on file — this alone still does **not** make it linkable; see
Part C). The same placeholder → confirmation-required → terminal-value progression applies to
every other status field. **No record's status may be changed by inference, familiarity, or
assumption** — only by supplying the specific evidence artifact that value represents.

---

## Part C — Public rendering rules

| Rule | Behavior |
|---|---|
| **No link (default)** | Any record with `linkMode: "no-link"` — all three seeded records — renders no anchor, no button, no clickable destination. |
| **Future static external link** | Requires **all six**, simultaneously: `linkMode === "owner-supplied-external-link"`, a syntactically valid http(s) `canonicalUrl`, `canonicalUrlStatus === "owner-supplied"`, `publicDisplayStatus === "approved-static-index"`, `ownerApprovalStatus === "approved-static-index"`, `status !== "placeholder"`. |
| **Future internal detail page** | Not built or authorized — no `/media/[slug]`-equivalent route exists. |
| **Future embed** | Not built or authorized — none of Mode 3's prerequisites in `docs/internal/mark-8-tmm-unified-media-feed-architecture.json` have been met. |
| **API/RSS automation** | Explicitly prohibited. The `astro/loaders` `glob` loader reads only local files already committed to this repository, at build time only — no network request of any kind exists in this implementation. |

---

## Part D — Placeholder inventory (3 records)

| ID | Source class | Source label | Platform | Format |
|---|---|---|---|---|
| `tmm-youtube-placeholder` | TMM | Texasmovementmedia | YouTube | long-form video |
| `tmi-substack-placeholder` | TMI | texasmovement | Substack | written editorial |
| `founder-short-form-placeholder` | founder-AVM | alexandervmathai | Instagram/TikTok | short-form video |

Every field on every record starts at its most cautious value: `status: "placeholder"`,
`linkMode: "no-link"`, `canonicalUrl: null`, `publicationDate: null`, `imageStatus: "no-image"`,
`claimsStatus: "no-claims-rendered"`. **No external URL, date, image, metric, embed, or CTA
appears anywhere for any of the three** — none has owner-supplied evidence yet, and rendering any
of those fields without evidence would misrepresent an unverified assertion as fact. The
founder-AVM record additionally carries an explicit note that founder-associated media is never
automatically TMI/TMM content.

---

## Part F — Test and release posture

```
npm run typecheck        → 0 errors, 0 warnings, 0 hints (33 files)
npm run test              → all green
npm run test:unit         → 68 passed, 0 failed (50 pre-existing + 18 new)
npm run check:constants   → 0 errors, 46 pre-existing unrelated drift warnings (unchanged)
npm run build (preview)   → 13 pages, postbuild guard: 0 errors
PUBLIC_PREVIEW=false build → 13 pages, postbuild guard: 0 errors; manually confirmed zero
                             unexpected <a> tags, correct canonical, correct robots meta on /media
npm run ci                 → all green
npm run test:a11y          → 0 axe-core violations across all 13 routes including /media
```

**Existing release blockers, unaffected by this pass:** `hello@texasmovement.com` still
operationally unverified; the `public/CNAME` legacy conflict still unresolved; every Mark 5/7/8
proof-registry and source-identity entry remains `absent`/`owner-asserted`, not independently
verified.

**This implementation does not authorize** merge, domain binding, production deployment, API
integration, account verification, media publication, external linking for any placeholder
record, or conversion. All three seeded records remain fully inert placeholders.

---

## Validation performed this pass

- Both JSON files (`docs/mark-9-controlled-tmm-feed-implementation.json` and the 3 content
  records) parsed successfully with `node -e "JSON.parse(...)"`.
- Built in both `PUBLIC_PREVIEW` modes and manually inspected `dist/media/index.html`: zero
  unexpected `<a>`/`<img>`/`<iframe>` tags, zero dates, zero metrics rendered in either mode.
- `git status` confirmed the diff is limited to `src/pages/media.astro`, `src/styles/global.css`
  (new CSS classes only), `src/components/media/` (new), `src/content.config.ts` (new),
  `src/content/media/*.json` (new), `src/lib/media-schema.ts` (new),
  `tests/media-index.test.ts` (new), and the three Mark 9 documentation files — no other route,
  package/lockfile, or infrastructure file changed.
