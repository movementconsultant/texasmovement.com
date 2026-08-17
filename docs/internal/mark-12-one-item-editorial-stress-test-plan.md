# Mark 12 One-Item Editorial Stress-Test Plan

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

**The stress test validates governance workflow only. It does not authorize public display,
source linking, embedding, feed automation, platform integration, or publication.**

This is a narrow internal plan for carrying exactly one, low-risk, TMM-controlled candidate media
item through the existing G-M1–G-M8 gates end-to-end, for the sole purpose of proving the
governance workflow itself works before any real feed, individual-item index, or founder-site
media surface is ever built. Running this stress test is not, by itself, part of this Mark 12
task — this document only defines how a future stress test would be conducted, should the owner
choose to run one.

---

## Selection criteria

A candidate item is eligible for the stress test only if **all** of the following hold:

- [ ] Wholly TMM-produced and TMM-owned — no guest appearance, interview subject, co-host, or any
      third party whose likeness, voice, or words appear in the item.
- [ ] No client, engagement, or consulting-relationship content of any kind.
- [ ] No health, medical, fitness-instruction, or performance-coaching claim of any kind (even
      Performance-adjacent framing is excluded for this first test item).
- [ ] No legal, tax, financial, or investment content or claim of any kind.
- [ ] No political, electoral, or policy-advocacy content of any kind.
- [ ] No product placement, sponsorship, or commerce reference (explicitly excludes anything
      HERO-adjacent).
- [ ] No licensed or third-party music, footage, image, or audio of any kind — only originally
      produced material.
- [ ] No metric, count, or activity claim of any kind (views, followers, "our Nth video," etc.).
- [ ] Short-form or simple enough that a full evidence bundle (below) can realistically be
      assembled without new tooling.

If any box above cannot be checked, the candidate is disqualified — select a different candidate
or defer the stress test entirely.

---

## Required evidence bundle

Before the item may proceed past G-M1, the following must exist, each referenced by path in the
internal intake template (`docs/internal/mark-8-tmm-media-item-intake-template.md`), never pasted
directly into a JSON record:

- [ ] Source-and-ownership evidence: proof TMM produced and owns the item (e.g. original project
      file location, production date, producer identity).
- [ ] Rights confirmation: written confirmation no third-party rights (music, footage, likeness)
      are implicated, consistent with the "no licensed material" selection criterion above.
- [ ] A plain-language summary of the item's content, for claims screening (below).
- [ ] An accessibility artifact: a transcript or caption file, even for an internal-only item —
      the point of the stress test is to prove the full workflow, not to skip the accessibility
      step because the item never gets shown.
- [ ] A proposed title and, if applicable, a proposed date — both subject to the same
      no-metric/no-superlative discipline already enforced on every existing card (Mark 9–11).

---

## G-M1–G-M8 checklist (run in order, per `docs/internal/mark-8-tmm-unified-media-feed-architecture.md` Part D)

- [ ] **G-M1 — Source and ownership verification.** Owner (or documented delegate) confirms TMM
      produced and owns the item, using the evidence bundle above.
- [ ] **G-M2 — Rights, permission, attribution, usage verification.** Rights owner and editorial
      owner both confirm no third-party rights issue exists.
- [ ] **G-M3 — Claims/facts/metrics review.** See "Claim screening" below.
- [ ] **G-M4 — Sensitive-subject and reputational review.** Confirm the item, though selected to be
      low-risk, still receives this review rather than being waved through because it "seems safe."
- [ ] **G-M5 — Accessibility review.** Confirm the transcript/caption artifact from the evidence
      bundle is complete and accurate.
- [ ] **G-M6 — Public-display decision.** For this stress test specifically, this decision is fixed
      in advance: **internal-only.** Do not use this test to decide a real public-display outcome.
- [ ] **G-M7 — Technical integration/privacy/tracking review.** Confirm no technical integration is
      proposed or needed for an internal-only item (this review exists mainly to prove the
      checklist step itself is exercised, not because this item needs one).
- [ ] **G-M8 — Owner final authorization.** Owner, personally, confirms the item cleared G-M1–G-M7.
      **Non-delegable**, same as every other use of G-M8 in this repository's model. For this
      stress test, "final authorization" means authorizing the internal record to exist — never
      authorizing public display (see G-M6 above and the outcomes list below).

---

## Owner decision points

- [ ] Which candidate item to select (per the selection criteria above).
- [ ] Whether to run the stress test at all, and when.
- [ ] The G-M6 public-display decision — fixed at "internal-only" for this test, but the owner must
      still explicitly confirm that fixed value rather than have it assumed.
- [ ] Whether the completed stress test's findings (about the workflow itself, not the item) should
      inform any change to the G-M1–G-M8 process before it is used on a real candidate.

---

## Claim screening (G-M3 detail)

- [ ] Confirm the plain-language summary contains no unverified factual claim.
- [ ] Confirm no metric (view count, follower count, engagement figure) appears anywhere in the
      title, summary, or any proposed field.
- [ ] Confirm no superlative ("best," "first," "only") appears without independent evidence.
- [ ] Confirm no claim about TMI, TMM, HERO, Performance, or any other vertical's operational
      status, revenue, client outcomes, or scale appears anywhere in the item.

---

## Accessibility artifacts required

- [ ] A complete transcript or caption file, stored at an approved location and referenced by path.
- [ ] Alt text drafted for any thumbnail or still image, even though the item stays internal-only.
- [ ] A plain-language readability check on the proposed title/summary, consistent with the
      restrained, jargon-free tone already used on every existing card (Mark 9–11).

---

## Source/rightsholder confirmation

- [ ] Written confirmation (referenced by path, not pasted into any JSON record) that TMM is the
      sole rightsholder of the item, with no co-owner, licensor, or third-party claim.
- [ ] Confirmation the item's production predates or is independent of any pending or disputed
      rights question elsewhere in the ecosystem.

---

## Internal artifact location requirements

- [ ] The completed intake template lives at a path under `docs/internal/`, referenced from this
      plan and from `docs/internal/mark-8-tmm-media-governance-and-approval-queue.md` — never in
      `src/content/media/` unless and until G-M8 clears **and** a separate, later task authorizes
      adding an individual-item record to the rendered collection.
- [ ] No credential, password, token, or sensitive personal data is ever stored in any artifact —
      same rule as every prior Mark 8/9 governance document.
- [ ] The stress-test record itself (once run) is logged in
      `docs/internal/mark-8-tmm-media-governance-and-approval-queue.md`, tagged as a stress test,
      not a real candidate for public display.

---

## Rejection/defer criteria

- [ ] **Reject** if any selection criterion fails and no substitute candidate exists.
- [ ] **Reject** if any G-M1–G-M5 gate cannot be evidenced, not merely asserted.
- [ ] **Defer** if the owner is unavailable to complete G-M8 within a reasonable window — do not
      substitute a delegate for G-M8 under any circumstance.
- [ ] **Defer** if the accessibility artifact (transcript/captions) cannot be completed with
      existing tooling — do not lower the accessibility bar to finish the test faster.

---

## Future possible outcomes

Exactly one of the following, recorded in the governance queue once the test concludes:

- [ ] **Remain internal** — the item stays as an internal governance record only; this is the
      expected and default outcome of a stress test, since G-M6 is fixed at internal-only above.
- [ ] **Candidate for static individual index** — only if the owner, in a fully separate, later,
      explicitly scoped task, decides to authorize a real individual-media-item index and this item
      is chosen as the first real entry. This document does not make that decision or authorize
      that task.
- [ ] **Rejected** — per the rejection criteria above.
- [ ] **Deferred** — per the defer criteria above, with a note on what evidence or availability is
      still needed.

---

## Reminder

This plan proves the *workflow* — that G-M1 through G-M8 can be executed end-to-end on a real,
low-complexity item without a gate being skipped or a piece of evidence being assumed rather than
documented. It is not, and must never be read as, a shortcut toward public display, source
linking, embedding, feed automation, platform integration, or publication of that item or any
other.
