# Mark 9 Media Placeholder Owner Update Guide

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

How to replace one of the three seeded placeholder records in `src/content/media/` with real,
reviewed material — and exactly what must exist before that's safe to do. This guide does not
itself change any record; it explains the process for a human to follow.

> ## Do not add platform credentials, passwords, tokens, API keys, OAuth secrets, private
> ## communications, or sensitive personal data to the repository.
>
> Nothing in this process ever requires committing a credential. Evidence artifacts (screenshots,
> exports, permission letters) belong in an approved secure storage location referenced by path —
> never pasted into a JSON record, a commit message, or any file in this repository.

---

## Exact fields the owner must replace

For the record you're advancing (e.g. `src/content/media/tmm-youtube-placeholder.json`), the
following fields move from their placeholder default to a real value, **only after** the
corresponding evidence exists (see the table below):

| Field | Placeholder default | Replace with |
|---|---|---|
| `title` | `"... — Owner Review Required"` | The real, accurate title |
| `summary` | Structural-placeholder disclosure text | A restrained, factual summary — no metric, no superlative |
| `publicationDate` | `null` | The real date, in ISO format |
| `publicationDateStatus` | `"placeholder"` | `"evidenced"` — only once `publicationDateEvidence` exists |
| `canonicalUrl` | `null` | The real, verified URL |
| `canonicalUrlStatus` | `"placeholder"` | `"owner-supplied"` — only once ownership is confirmed |
| `transcriptStatus` | `"absent"` | `"supplied"` — only once a transcript/caption file exists |
| `accessibilityStatus` | `"pending"` | `"reviewed"` — only once an accessibility review is complete |
| `rightsStatus` | `"absent"` | `"approved-for-static-index"` — only once rights are confirmed |
| `imageStatus` | `"no-image"` | `"local-approved-image"` — only once a rights-cleared local image exists |
| `imageAlt` | Generic no-thumbnail text | Real, descriptive alt text for the new image |
| `editorialStatus` | `"placeholder"` | Progress through `"internal-review-required"` to `"approved-for-static-index"` |
| `ownerApprovalStatus` | `"pending"` | `"approved-static-index"` — **owner only** |
| `publicDisplayStatus` | `"placeholder-public-index"` | `"approved-static-index"` |
| `linkMode` | `"no-link"` | `"owner-supplied-external-link"` — only once every gate above closes |
| `status` | `"placeholder"` | `"approved-static-index"` — the terminal state |

**A record only renders an outbound link once all six conditions in
`docs/mark-9-controlled-tmm-feed-implementation.md` Part C are simultaneously true.** Changing one
field alone (e.g. just adding a `canonicalUrl`) does not enable a link — this is by design.

## Evidence needed before a placeholder can become an approved static-index entry

| Artifact category | What it proves | Where it's tracked |
|---|---|---|
| Source URL | The real, canonical location of the content | `canonicalUrl` / `canonicalUrlStatus` |
| Ownership/control | The account or content is actually owned/controlled as claimed | `docs/internal/mark-8-tmm-source-verification-checklist.md` §1–3 |
| Rights | Legal basis to reference/display this content | `rightsStatus` |
| Title/date evidence | The title and date are accurate, not guessed | `publicationDateStatus`, `title` |
| Captions/transcript | Accessibility artifact exists | `transcriptStatus` |
| Thumbnail rights | Any image used has confirmed rights | `imageStatus`, `imageAlt` |
| Claims review | No unverified metric or claim in the summary | `claimsStatus` (stays `"no-claims-rendered"` unless a specific claim is independently evidenced and reviewed) |
| Editorial review | An editorial reviewer has checked the record | `editorialStatus` |
| Cross-attribution decision | Whether this item may ever be shown as more than one of TMI/TMM/AVM | `crossAttributionStatus` — stays `"prohibited-pending-per-item-approval"` by default |
| Owner final authorization | The owner, personally, signs off | `ownerApprovalStatus` — **may not be delegated**, per gate G-M8 |

This mirrors gates G-M1 through G-M8 in
`docs/internal/mark-8-tmm-unified-media-feed-architecture.md` Part D exactly — nothing new was
invented for this pass.

## Process

1. Open `docs/internal/mark-8-tmm-media-item-intake-template.md`, duplicate it, and fill it in
   completely for the real item.
2. Gather every artifact in the table above, storing each at an approved secure location (not in
   this repository) and noting its reference path in the intake template.
3. Update `docs/internal/mark-8-tmm-media-governance-and-approval-queue.md` with the item's
   progress through G-M1–G-M8.
4. Only once G-M8 (owner final authorization) is `approved`, edit the corresponding
   `src/content/media/*.json` record's fields per the table above.
5. Run `npm run typecheck`, `npm run test:unit`, and `npm run build` to confirm the record still
   validates against `src/lib/media-schema.ts` and the site still builds cleanly.
6. This step alone still does not deploy or publish anything — it only changes the source-
   controlled record on this draft branch, same as any other code change in this repository.

## Reminders

- A record's `internalOnlyNotes` field is never rendered on the public page — it exists for this
  exact governance trail, not for public display.
- `attributionNote` similarly is not rendered directly; the public disclosure comes from `summary`
  and the fixed status vocabulary in `MediaStatus.astro`.
- Every placeholder currently seeded is deliberately identical in structure so that replacing one
  is a matter of editing data, never editing a component or adding a new capability.
