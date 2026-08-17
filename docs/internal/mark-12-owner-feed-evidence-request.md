# Mark 12 Owner Feed Evidence Request

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

Concise evidence checklists for the four external-feed hypotheses audited in
`docs/mark-12-external-feed-feasibility-and-governance.md`. Answering these does not authorize any
implementation — it only supplies the evidence gates F0–F8 (Part C of that document) require before
a future, separate, source-specific implementation task could even be considered. Reply with simple
directives where a checkbox is offered; free text only where a checkbox cannot capture the answer.

---

## Section A — Substack

- [ ] A1. Confirm the owner-confirmed canonical publication URL is exactly
      `https://texasmovement.substack.com` (already the address of the Mark 10/11 confirmed source
      destination) — or supply the correct one.
- [ ] A2. Explicit permission: may this publication's feed ever be used as a future *technical*
      source (not just a static outbound link) if every gate F0–F8 later clears? Yes / No / Not yet.
- [ ] A3. Desired founder-site attribution label for any future article pulled from this source
      (e.g. "From The Ledger" / "Texas Movement Editorial" / other — specify).
- [ ] A4. Allowed article fields (check all that may ever be reproduced): [ ] title [ ] date
      [ ] excerpt [ ] image [ ] link.
- [ ] A5. Prohibited fields — list any field from A4 that must never be shown even if technically
      available (e.g. full article text, author bio).
- [ ] A6. Are external links to the source article permitted? Yes / No.
- [ ] A7. Privacy/editorial disclaimer decision — should any future rendered entry carry a
      "static reference, not a live feed" disclaimer, similar wording, or none? Specify.

---

## Section B — GitHub

- [ ] B1. Confirm the public account/organization identity: is `movementconsultant` the correct,
      intended identity for this proposal? Yes / No — supply the correct one.
- [ ] B2. List exactly which repositories (if any) are eligible for any future public display.
      None are currently approved; leaving this blank means none are eligible.
- [ ] B3. May commit messages be displayed publicly at all? Yes / No / Only after individual review
      of each message.
- [ ] B4. Confirm any private/internal projects must be excluded entirely, even from an "activity
      occurred" style entry that doesn't name the repository. Yes / No.
- [ ] B5. Preferred fallback behavior if retrieval ever fails or returns nothing: a static link to
      the GitHub profile, silence (render nothing), or other — specify.
- [ ] B6. Future token policy, if this source is ever pursued: should a Personal Access Token be
      requested and configured in a future, separate task, or should this source remain
      unauthenticated-only indefinitely? Specify.
- [ ] B7. **Explicit instruction, not a question: no token is requested or configured in this task.**
      This item exists only to record that the instruction was received and followed.

---

## Section C — YouTube

- [ ] C1. Supply the stable **channel ID** (not the `@handle`) for every proposed future RSS
      source. A channel ID is a distinct technical identifier YouTube's feed mechanism requires;
      the public `@handle` used in the existing Mark 10/11 destination link is not sufficient.
      - Texas Movement Media channel ID: ______
      - Texas Movement Performance channel ID: ______
      - Any additional channel: ______
- [ ] C2. Confirm which channels above are TMM, TMI, Performance, founder, or explicitly excluded
      (e.g. HERO) — one label per channel ID supplied in C1.
- [ ] C3. Allowed fields (check all that may ever be reproduced): [ ] title [ ] date
      [ ] thumbnail [ ] link [ ] description.
- [ ] C4. Prohibited fields, explicitly confirmed as never permitted regardless of technical
      availability: view/subscriber/like counts, comments, any channel not listed in C1/C2, and any
      embedded player.
- [ ] C5. Caption/transcript policy — should a future individual video item ever require a
      caption/transcript before display (consistent with the existing G-M5 accessibility gate)?
      Yes / No / Case-by-case.
- [ ] C6. Image/thumbnail/privacy policy — may a channel-supplied thumbnail image ever be displayed,
      and if so, does it need its own rights/accessibility review before use? Specify.

---

## Section D — Curated Instagram/TikTok

- [ ] D1. Owner-selected source destinations eligible for future curated highlights (list specific
      accounts/handles; must be drawn from already owner-asserted or owner-confirmed source records
      only — see `docs/internal/mark-8-1-source-identity-reconciliation.md`).
- [ ] D2. Future manual-entry schema decisions — at minimum, confirm whether a curated highlight
      record should ever include: [ ] a locally-authored caption [ ] a static outbound link to the
      original post [ ] a locally-produced (not platform-fetched) image [ ] a date.
- [ ] D3. Rights/attribution policy — what attribution label should accompany a curated highlight
      (e.g. "Curated from Instagram — [handle]"), and is that label mandatory on every highlight?
- [ ] D4. Link/no-link policy — should a curated highlight ever link out to the original post, or
      should the highlight remain a locally-described reference only, with no outbound link? Specify.
- [ ] D5. Required evidence for a curated highlight to ever be considered — at minimum, confirm the
      same evidence bundle as any other individual media item (see
      `docs/internal/mark-12-one-item-editorial-stress-test-plan.md`) applies, with no shortcut.
- [ ] D6. **Explicit confirmation, not a question:** no API, scraping, or embedding is authorized
      for Instagram or TikTok content under any version of this proposal. This item exists only to
      record that the instruction was received and will be followed in any future task.

---

## Reminders

- None of the above, once answered, authorizes any fetch, component, route, schema, content record,
  or credential. Each answer only supplies evidence toward gates F0–F3 (Part C of
  `docs/mark-12-external-feed-feasibility-and-governance.md`); gates F4–F8 still require a separate,
  later, explicitly scoped technical task.
- Every answer is an owner assertion, not an independent verification of platform policy,
  availability, or behavior.
