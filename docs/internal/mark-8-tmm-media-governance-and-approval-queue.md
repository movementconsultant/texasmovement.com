# Mark 8 TMM Media Governance and Approval Queue

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

Tracks future media entries from intake through approval. **Seeded with headers and blank example
rows only — no real media item is recorded anywhere in this document.** An item is added to this
queue only after `docs/internal/mark-8-tmm-media-item-intake-template.md` has been completed for
it. Moving a row's `Public-display status` past `internal-only` requires that item's `Final
authorization` column to read `approved` — nothing else authorizes display.

---

## Gate legend (full detail: `docs/internal/mark-8-tmm-unified-media-feed-architecture.md` Part D)

| Gate | Name |
|---|---|
| G-M1 | Source and ownership verification |
| G-M2 | Rights, permission, attribution, usage verification |
| G-M3 | Claims/facts/metrics review |
| G-M4 | Sensitive-subject and reputational review |
| G-M5 | Accessibility review |
| G-M6 | Public-display decision |
| G-M7 | Technical integration/privacy/tracking review |
| G-M8 | Owner final authorization |

---

## Queue

| Media item ID | Source class | Ownership status | Rights status | Source verification | Claim risk | Accessibility status | Public-display status | Permitted display mode | Route/vertical association | Next owner action | Blockers | Final authorization | Revalidation date |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| *(example row — blank)* | | | | | | | | | | | | | |
| _____ | ☐ TMI ☐ TMM ☐ AVM/founder-owner-def-required ☐ approved-vertical ☐ third-party-with-permission | ☐ owner-provided ☐ not independently verified ☐ verified-by-platform-confirmation ☐ disputed | ☐ absent ☐ owner-submitted ☐ needs-review ☐ verified ☐ rejected | ☐ absent ☐ owner-submitted ☐ needs-review ☐ verified ☐ rejected | ☐ none identified ☐ low ☐ medium ☐ high | ☐ not present ☐ owner-provided ☐ needs-review ☐ verified-accessible | ☐ internal-only ☐ eligible-for-future-review ☐ approved-for-index ☐ approved-for-external-link ☐ approved-for-embed ☐ rejected | ☐ none (Mode 1 not yet reached) ☐ Mode 1 manual index ☐ Mode 2 platform-link ☐ Mode 3 embed ☐ Mode 4 API/RSS (not authorized in this repository) | _____ | _____ | _____ | ☐ pending ☐ approved ☐ rejected ☐ deferred | _____ |
| _____ | ☐ TMI ☐ TMM ☐ AVM/founder-owner-def-required ☐ approved-vertical ☐ third-party-with-permission | ☐ owner-provided ☐ not independently verified ☐ verified-by-platform-confirmation ☐ disputed | ☐ absent ☐ owner-submitted ☐ needs-review ☐ verified ☐ rejected | ☐ absent ☐ owner-submitted ☐ needs-review ☐ verified ☐ rejected | ☐ none identified ☐ low ☐ medium ☐ high | ☐ not present ☐ owner-provided ☐ needs-review ☐ verified-accessible | ☐ internal-only ☐ eligible-for-future-review ☐ approved-for-index ☐ approved-for-external-link ☐ approved-for-embed ☐ rejected | ☐ none (Mode 1 not yet reached) ☐ Mode 1 manual index ☐ Mode 2 platform-link ☐ Mode 3 embed ☐ Mode 4 API/RSS (not authorized in this repository) | _____ | _____ | _____ | ☐ pending ☐ approved ☐ rejected ☐ deferred | _____ |
| _____ | ☐ TMI ☐ TMM ☐ AVM/founder-owner-def-required ☐ approved-vertical ☐ third-party-with-permission | ☐ owner-provided ☐ not independently verified ☐ verified-by-platform-confirmation ☐ disputed | ☐ absent ☐ owner-submitted ☐ needs-review ☐ verified ☐ rejected | ☐ absent ☐ owner-submitted ☐ needs-review ☐ verified ☐ rejected | ☐ none identified ☐ low ☐ medium ☐ high | ☐ not present ☐ owner-provided ☐ needs-review ☐ verified-accessible | ☐ internal-only ☐ eligible-for-future-review ☐ approved-for-index ☐ approved-for-external-link ☐ approved-for-embed ☐ rejected | ☐ none (Mode 1 not yet reached) ☐ Mode 1 manual index ☐ Mode 2 platform-link ☐ Mode 3 embed ☐ Mode 4 API/RSS (not authorized in this repository) | _____ | _____ | _____ | ☐ pending ☐ approved ☐ rejected ☐ deferred | _____ |

*(Duplicate the row pattern above for each new item. Delete the "example row — blank" marker row
once real rows exist.)*

---

## Reading this queue

- **Ownership status**, **Rights status**, and **Source verification** default to their most
  cautious value (`not independently verified` / `absent`) until real evidence changes them — see
  `docs/internal/mark-8-tmm-source-verification-checklist.md`.
- **Permitted display mode** can never exceed what
  `docs/internal/mark-8-tmm-unified-media-feed-architecture.md` Part C currently authorizes.
  As of this pass, **no mode is operating** — every row's realistic value today is "none (Mode 1
  not yet reached)."
- **Final authorization** is the single field that gates any move past `internal-only` — and per
  gate G-M8, only the owner may set it to `approved`.
- No row in this queue represents a real, submitted media item as of this pass.
