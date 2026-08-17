# Mark 7.1 TMI and Consulting Owner-Input Review

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT. NOT VERIFIED EVIDENCE.**

## Finding: no owner-entered values exist

`docs/internal/mark-7-founder-evidence-intake.json` was inspected this pass. Every field in
Sections A, B, and G remains `ownerDecision: "pending"`, `verificationStatus: "absent"`, with a
blank `evidenceSourceLocation`. **No owner input has been entered anywhere.** Per the Mark 7.1
brief, this document therefore contains **only best-guess draft hypotheses** — never fabricated as
completed answers. Every suggested option below is explicitly labeled
**owner-confirmation-required · not verified · not approved for public use**, and every one is
presented as a numbered, pick-one-or-more option — not an open-ended question — so it can be
answered with a short directive like "Select 2, reject 1 and 3, defer 4."

Companion machine-readable file: `docs/internal/mark-7-1-tmi-consulting-owner-review.json` (same
candidates, structured, with the full 12-property schema per item: id, category, text, sourceType,
ownerDecision, verificationStatus, publicUseStatus, evidenceReference, requiredApproval,
prohibitedUses, routeAssociation, notes — plus `bestGuess` and `ownerConfirmationRequired` flags,
both `true` on every item). Companion document: `docs/internal/mark-7-1-proposed-about-consulting-content-delta.md`
(Section C — the `/about` and `/consulting` content-delta plan).

---

## A. TMI identity review

### A1. One-sentence TMI positioning statement — pick one

- [ ] **Option 1** — *(current text, already live on /about)* "Texas Movement International is a
      systems company building infrastructure for founders, athletes, and cities."
- [ ] **Option 2** — "Texas Movement International is the umbrella connecting a small set of
      disciplined divisions — consulting, media, performance, and select structural partnerships —
      each built one at a time and named honestly before it is ready to sell."
- [ ] **Option 3** — "Texas Movement International is a founder-led systems company built in
      public, division by division, with public claims held to the same evidence standard as the
      systems it builds."
- [ ] **None of these — I will supply my own wording**

*Category: neutral positioning hypothesis · owner-confirmation-required · not verified · not
approved for public use.*

### A2. Category-level focus statement — pick one

- [ ] **Option 1** — *(current text)* "Performance and movement, media and documentation, applied
      systems and consulting work, and a small set of longer-horizon research/community efforts
      held private until governed."
- [ ] **Option 2** — "Consulting-led systems work first, with Media as the documentation layer and
      the remaining divisions built out in sequence behind those two."
- [ ] **Option 3** — "A multi-division portfolio spanning consulting, media, performance, and
      future ventures, unified by one operating standard rather than one product."
- [ ] **None of these — I will supply my own wording**

*Category: neutral positioning hypothesis · owner-confirmation-required · not verified · not
approved for public use.*

### A3. Operating principles (three) — pick one set

- [ ] **Set 1** — *(closely matches current /about text)*
      1. Build inside-out: internal standards and safeguards come before any public claim.
      2. Category-level focus, not one product: each division does one job, governed independently.
      3. Evidence before promotion: no public claim ships before proof exists.
- [ ] **Set 2** —
      1. Slow is a feature: nothing launches on a promotional timeline.
      2. Named honestly: a division named on this site is not a division open for business.
      3. Proof before scale: case studies and metrics ship only once independently verifiable.
- [ ] **None of these — I will supply my own three principles**

*Category: operating-model hypothesis · owner-confirmation-required · not verified · not approved
for public use.*

### A4. "TMI is / TMI is not" boundary — approve or revise

- [ ] **Approve as drafted:**
      **IS:** a systems company; a founder-led, multi-division portfolio; a build governed by
      evidence gates before any public claim.
      **IS NOT:** a general marketing/advertising agency; a medical, therapeutic, or legal service
      provider; a currently operating consultancy, media company, or performance brand accepting
      clients, publishing on a schedule, or enrolling participants today.
- [ ] **Revise** — I will mark up specific lines
- [ ] **Defer** — not ready to decide this round

*Category: neutral positioning hypothesis (IS) / prohibited public claim (IS NOT) ·
owner-confirmation-required · not verified · not approved for public use.*

### A5. Recommended public-emphasis order — approve or reorder

- [ ] **Approve as drafted:** 1) Consulting, 2) Media, 3) Performance, 4) Partners,
      5) Distribution, 6) HERO (context only, unaudited), 7) incubation/research initiatives
      (Health, FounderLink, Social/Gather, Reparations — remain private, never emphasized)
- [ ] **Reorder** — I will supply a different sequence
- [ ] **Defer** — not ready to decide this round

*Category: operating-model hypothesis · sourced from the existing Mark 5 backlog priorities, not a
new judgment · owner-confirmation-required · not approved for public use.*

### A6. Which verticals stay private/incubating — confirm or change

- [ ] **Confirm default:** Health, FounderLink, Social/Gather, Reparations remain private/
      incubating, unchanged from Mark 4–6
- [ ] **Change** — I want to discuss moving one of these toward a governed public track (name
      which one; this alone does not authorize any change)

*Category: prohibited public claim (for the four, until changed) · owner-confirmation-required.*

### A7. Section A overall decision

- [ ] **Approve** the selections above for future `/about` drafting
- [ ] **Revise** — see my markup
- [ ] **Defer** — not ready this round
- [ ] **Do not publish** any TMI-identity content change at this time

---

## B. Consulting offer-definition review

Six lane hypotheses, each currently `conversionStatus: inactive`. **No service becomes active from
this review.** Full field-by-field detail (scope, deliverables, exclusions, delivery model,
evidence needed, prohibited claims, contract requirements) is in the JSON companion →
`sectionB_consultingLaneHypotheses`.

| # | Working lane name | Intended buyer | Evidence needed before any public claim |
|---|---|---|---|
| 1 | Digital ecosystem audit and architecture | Founders/operators with fragmented digital properties | `PR-ARCH-001` — this project's own build, not usable until both hubs reach release-candidate |
| 2 | AI/workflow strategy | Founders/operators needing AI applied to real constraints | `PR-CONSULT-001` — at least one real, permission-confirmed case study |
| 3 | Modern web/brand systems | Founders/brands needing a coherent visual/content system | None published yet |
| 4 | Documentation and operating-system design | Operators with undocumented, tribal-knowledge processes | None — newly proposed, not in prior Mark 3 catalog |
| 5 | Automation opportunity mapping | Operators with manual, repeatable processes | None — flagged "entirely undocumented" as of Mark 5 |
| 6 | Founder/operator advisory | Operators wanting ongoing (not project) advisory | None — depends on a project track record existing first |

### B1. Select up to three lanes to pursue in the next 90 days

- [ ] Lane 1 — Digital ecosystem audit and architecture
- [ ] Lane 2 — AI/workflow strategy
- [ ] Lane 3 — Modern web/brand systems
- [ ] Lane 4 — Documentation and operating-system design
- [ ] Lane 5 — Automation opportunity mapping
- [ ] Lane 6 — Founder/operator advisory
- [ ] **None right now — defer all six**

*Selecting a lane here does not activate it. It only tells a future, separately-scoped pass which
lane(s) to draft real scope/deliverable content for, still gated on the evidence each lane's row
already names.*

### B2. For each lane you selected in B1, define exclusions

- [ ] I will supply exclusions per selected lane (free text, separate from this checklist)
- [ ] Use the draft exclusions already listed in the JSON companion as a starting point, subject to
      my edits
- [ ] Defer exclusions to a later round

### B3. Evidence that may legally and accurately be used right now

- [ ] **None** — no case study, metric, or credential currently exists that I'm ready to submit
- [ ] I have at least one real, permission-confirmed engagement I can submit as a case-study
      candidate (use the template in `docs/internal/mark-7-founder-evidence-intake.md` Section
      B-10)
- [ ] I have credential/certification evidence to submit (not applicable to Consulting — see
      Performance Section D in the Mark 7 intake if relevant there instead)

### B4. Confirm no commercial activation is being authorized this round

- [ ] **Confirmed** — I understand no pricing, intake mechanism, availability statement, or
      customer promise is authorized by anything in this document

### B5. Wording that must never be used publicly for Consulting

- [ ] Confirm the standing prohibitions as drafted: no client name/result/metric without written
      permission, no pricing, no guaranteed outcome, no availability/response-time claim
- [ ] Add additional prohibited wording (specify)

---

## D. Release/infrastructure pointer review (TMI/Consulting-relevant only)

Pointers only — full detail lives in `docs/mark-5-owner-evidence-request-packet.md` section 8,
not duplicated here. Full table in the JSON companion → `sectionD_infrastructurePointerReview`.

| Item | Blocks |
|---|---|
| Cloudflare Pages project verification | Release candidate status |
| Custom-domain identity/binding | Release candidate status |
| DNS and registrar control | Release candidate status |
| GitHub Pages/CNAME conflict resolution | Release candidate status |
| Preview and rendered-output review | Preview review, conversion readiness |
| Analytics/tracking confirmation | Conversion readiness (low relevance to content-only work) |
| Planned Google Workspace ownership/routing (`consulting@`) | Conversion readiness |
| Release authorization | Release candidate status (final gate) |

**None of these items is proposed or performed here.** Source-only route refinement (drafting
future `/about`/`/consulting` copy once evidence exists) does not require any of the above to
close first — only reaching Conversion-ready or Release-candidate does.

---

## E. Owner review checklist (complete summary)

Answer with a short directive — e.g. "A1: 1, A2: 3, A3: Set 1, A4: approve, A5: approve,
A6: confirm, A7: approve, B1: Lanes 1+2, B3: none, B4: confirmed, B5: confirm."

1. **[ ] A1** — TMI positioning statement: Option 1 / Option 2 / Option 3 / own wording
2. **[ ] A2** — Category-focus statement: Option 1 / Option 2 / Option 3 / own wording
3. **[ ] A3** — Operating principles: Set 1 / Set 2 / own three
4. **[ ] A4** — "Is / is not" boundary: approve / revise / defer
5. **[ ] A5** — Emphasis order: approve / reorder / defer
6. **[ ] A6** — Private verticals: confirm default / change (name which)
7. **[ ] A7** — Section A overall: approve / revise / defer / do not publish
8. **[ ] B1** — Up to three Consulting lanes to pursue next 90 days (list numbers, or "none")
9. **[ ] B2** — Exclusions per selected lane: I'll supply / use draft as starting point / defer
10. **[ ] B3** — Evidence available now: none / case-study candidate exists / other
11. **[ ] B4** — Confirm no commercial activation authorized this round: confirmed
12. **[ ] B5** — Prohibited wording: confirm standing list / add more (specify)

---

## Validation performed this pass

- `docs/internal/mark-7-1-tmi-consulting-owner-review.json` parsed successfully with
  `node -e "JSON.parse(...)"` — confirmed 11 Section A candidates, 6 Section B lane hypotheses
  (matching the six named lanes exactly), 8 Section D pointer rows.
- `docs/internal/mark-7-founder-evidence-intake.json` was read but not modified — confirmed via
  `git diff` showing no change to that file.
- Every candidate/hypothesis in both files carries `bestGuess: true` and
  `ownerConfirmationRequired: true` — none is presented as owner-confirmed or verified.
- This document was searched for: `live`, `verified`, `approved`, `ready`, `operational`, `active`,
  `client`, `results`, `guarantee`, `available`, `service`, `medical`, `legal`. Every occurrence is
  template language, a conditional/future state, a standing prohibition, or an explicitly gated
  checklist label — none asserts a current active claim.
