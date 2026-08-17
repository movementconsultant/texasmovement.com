# Mark 11 Media Source Confirmation and Review

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

Records the owner's Mark 11 confirmation of the eight destinations rendered since Mark 10, and
gives the owner a checklist to periodically re-review them. Reply with simple directives — e.g.
"Confirm 1–8" — no paragraphs required.

---

## Section 1 — Owner confirmation on record (Mark 11)

The owner's Mark 11 instruction confirmed, verbatim: "every currently rendered Mark 10 destination
is an authorized source destination and may remain in the TMM media index," and authorized
reclassifying each from `owner-authorized-handle-derived` to `owner-confirmed-source-destination`
— explicitly clarified to mean only that "the owner confirms the destination belongs in the static
source index," not platform verification, individual-item approval, or cross-attribution.

All eight destinations below now carry `confirmationStatus: "owner-confirmed-source-destination"`
in `src/content/media/*.json`:

- [x] 1. Texas Movement Media — YouTube — `https://youtube.com/@texasmovementmedia`
- [x] 2. Texas Movement Performance — YouTube — `https://youtube.com/@texasmovementperformance`
- [x] 3. Texas Movement Media — Instagram — `https://instagram.com/tmmediausa`
- [x] 4. Texas Movement Media — TikTok — `https://tiktok.com/@texasmovementmedia`
- [x] 5. Texas Movement Editorial — Substack — `https://texasmovement.substack.com`
- [x] 6. Alexander Mathai — YouTube — `https://youtube.com/@tmipresident`
- [x] 7. Alexander Mathai — Instagram — `https://instagram.com/alexanderofnazareth`
- [x] 8. Alexander Mathai — TikTok — `https://tiktok.com/@alexandervmathai`

---

## Section 2 — Periodic re-review checklist (for the owner, going forward)

Confirmation is a point-in-time statement, not a standing guarantee. Before any future
individual-media-item phase begins, re-check each of the 8 above:

- [ ] 9. Is each handle above still the correct, currently-used handle for that account?
- [ ] 10. Has any account above changed ownership, been renamed, or been deactivated since
      2026-08-17?
- [ ] 11. Does each `sourceClass` (TMM / TMI / founder-AVM) still correctly describe who controls
      that account?
- [ ] 12. Should any destination be removed from the index (reply with the number and "remove")?

If nothing has changed, reply "confirm 9–12" and no action is needed.

---

## Section 3 — Still inert, unchanged since Mark 10 (not part of this confirmation)

- [ ] 13. LinkedIn — Alexander Mathai — still no confirmed URL slug; still additionally blocked by
      this repository's `scripts/check-public-output.mjs` hard guard on `linkedin.com`. Reply with
      the exact slug if you have one, or "defer 13."
- [ ] 14. Facebook — Alexander Mathai — still no confirmed URL slug anywhere in local evidence.
      Reply with the exact slug/URL if you have one, or "defer 14."
- [ ] 15. HERO (all platforms) — confirm this should remain fully excluded, per the Mark 10/11
      "strictly out of scope" instruction. Reply "confirm 15" or "reject 15" (a rejection requires
      a new, separate authorization).

See `docs/internal/mark-10-media-destination-owner-review.md` Sections 2, 4, and 5 for the fuller
background on items 13–15 (the LinkedIn guard decision and the alexandermathai.com blocker remain
unchanged by this pass).

---

## Section 4 — What changed technically this pass (for the record)

- `src/lib/media-schema.ts`: added optional `confirmationStatus` field to `mediaDestinationSchema`
  (4 controlled values — see `docs/mark-11-tmm-preview-card-ux-optimization.md` Part B).
- `src/content/media/*.json`: set `confirmationStatus: "owner-confirmed-source-destination"` on
  the 8 destinations above; added a dated Mark 11 note to each record's `internalOnlyNotes`; left
  LinkedIn/Facebook entries as-is (no `confirmationStatus`, still `urlStatus: inert-missing-evidence`).
- `src/lib/media-destinations.ts` (new): centralizes the record-level + per-destination link gate
  and flattens approved records into one confirmed destination per card.
- `src/components/media/MediaCard.astro`: rewritten to render one preview card per confirmed
  destination (previously one card per record, with several links inside).
- `src/components/media/MediaPreviewArt.astro`, `MediaPlatformMark.astro` (new): local, abstract
  visual preview and text-only platform mark — no remote assets.
- `src/components/media/MediaStatus.astro`: rewritten to a compact 3-line per-destination boundary
  note.
- `src/components/media/MediaGrid.astro`: now renders `ConfirmedDestination[]` instead of whole
  collection records.
- `src/pages/media.astro`: restructured into three grouped sections (Texas Movement Media / Texas
  Movement Editorial / Founder Media), each with its own heading and grid.
- `tests/media-index.test.ts`: rewritten for the new architecture (84 tests total).

No individual-media-item field (`editorialStatus`, `rightsStatus`, `transcriptStatus`,
`publicationDateStatus`, `ownerApprovalStatus`, `publicDisplayStatus`, `status`) changed on any
record this pass.

## Reminders

- Confirming a destination is an **owner assertion that it belongs in the index**, not an
  independent verification of account ownership, content, or platform activity.
- Nothing in this document, once acted on, authorizes API/RSS integration, embeds, individual-item
  population, account modification, or any change outside the exact fields listed above.
- See `docs/mark-11-tmm-preview-card-ux-optimization.md` for the full technical record of what was
  built and why.
