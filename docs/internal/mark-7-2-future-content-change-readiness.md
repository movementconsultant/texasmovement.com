# Mark 7.2 Future Content-Change Readiness — /about and /consulting

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

Classifies every candidate content module named in
`docs/internal/mark-7-1-proposed-about-consulting-content-delta.md` against five readiness states:
**Not ready** · **Internal planning only** · **Candidate for owner-approved public-copy review** ·
**Blocked pending evidence** · **Blocked pending legal/operational decision**. This classification
does not depend on any owner decision existing — it is determinable from current state alone, and
`docs/internal/mark-7-2-owner-decision-reconciliation.md` confirmed this pass that no owner
decision has in fact been entered. **No module below is authorized for implementation by this
document.**

---

## /about

| Module | Readiness | Required owner approval | Required independent evidence | Required wording review | Required technical/test work | What must remain absent |
|---|---|---|---|---|---|---|
| Revised one-sentence positioning | **Not ready** | A1 selection + A7 = approve | None | Standard restraint review (no metric/date/client claim) | None beyond re-running `tests/hub-routes.test.ts` and `tests/a11y.mjs` unchanged | Historical/numerical claims, founder biography |
| Revised category-focus statement | **Not ready** | A2 selection + A7 = approve | None | Same | Same | Same |
| Revised operating principles | **Not ready** | A3 selection + A7 = approve | None | Same | Same | Same |
| Explicit "TMI is / is not" module | **Not ready** | A4 = approve + A7 = approve | None | Confirm the "is not" list isn't softened | May need a narrow structural test if implemented as a new content object rather than prose | Any statement implying a listed "is not" boundary is close to changing |
| Ecosystem-emphasis ordering reflected in copy/link order | **Not ready** | A5 = approve/reordered + A7 = approve | None (sourced from existing Mark 5 backlog priorities) | Confirm order doesn't imply relative maturity beyond "Building" | None | Any ranking implying a division is closer to launch than it is |
| Founder-context cross-reference | **Blocked pending evidence** *and* **Blocked pending legal/operational decision** | A7 = approve, **plus** a decision this repository does not control | `PR-FOUNDER-001` — currently `absent`; alexandermathai.com's own claims registry (40/41 pending) must clear first | Full claims-restraint review once evidence exists | New test asserting the cross-reference only renders when the source registry entry clears | Any founder biography, credential, or history claim not independently cleared |

## /consulting

| Module | Readiness | Required owner approval | Required independent evidence | Required wording review | Required technical/test work | What must remain absent |
|---|---|---|---|---|---|---|
| Named service-lane summaries (up to 3) | **Not ready** | B1 selection + B4 confirmed | Varies per lane — see table below | Restraint review per lane (no pricing/outcome claim) | Extend `tests/hub-routes.test.ts` forbidden-pattern scan to cover new lane text (page-wide scan already covers this without a new file) | Pricing, guarantees, client claims for unselected/unevidenced lanes |
| Exclusions text per selected lane | **Not ready** | B2 answered (depends on B1) | None beyond the lane's own owner-authored exclusions | Confirm exclusions don't accidentally imply the included scope is active | None | Scope creep beyond what B2 defines |
| Populated case-study module | **Blocked pending evidence** | Explicit written client permission; B3 confirms evidence exists | `PR-CONSULT-001` — currently `absent` | Full claims-restraint + confidentiality review | New test asserting the module only renders when `PR-CONSULT-001` reaches `approved-for-public-use` | Client name/logo/result without confirmed written permission |
| Engagement-volume/count statement | **Blocked pending evidence** | Owner supplies auditable count | `PR-CONSULT-002` — currently `absent` | Confirm the count is independently auditable, not estimated | Same pattern as above, gated on `PR-CONSULT-002` | Any rounded or estimated figure |
| Real Service module (scope, deliverables, pricing) with a live intake path | **Blocked pending evidence** *and* **Blocked pending legal/operational decision** | Full `/consulting` Conversion-ready state per `docs/mark-5-route-completion-specification.json`: legal-reviewed Service module, `consulting@` in `VERIFIED_INBOXES`, explicit owner release authorization | Every Section B evidence field for the selected lane(s), plus `MARK7-G-07` (Workspace routing) and `MARK7-G-08` (release authorization) | Full legal/contract review (engagement terms, confidentiality) | New route-level tests for the intake mechanism itself, mirroring the existing mailto/form/fetch forbidden-pattern checks in reverse (asserting the *approved* mechanism is the only one present) | Pricing, packages, testimonials, outcomes, contact paths — for every lane, until each lane's own gates close |

### Per-lane evidence dependency (Consulting service-lane summaries)

| Lane | Evidence needed |
|---|---|
| 1. Digital ecosystem audit and architecture | `PR-ARCH-001` (blocked until both hubs reach release-candidate) |
| 2. AI/workflow strategy | `PR-CONSULT-001` |
| 3. Modern web/brand systems | None published; no proof-registry ID exists yet |
| 4. Documentation and operating-system design | None; not in prior Mark 3 catalog |
| 5. Automation opportunity mapping | None; flagged "entirely undocumented" as of Mark 5 |
| 6. Founder/operator advisory | None; depends on a track record existing first |

---

## Summary

**Every module classified this pass is Not ready or Blocked** — none reaches "Candidate for
owner-approved public-copy review," because that state requires both an owner decision and, where
applicable, independent evidence, and neither exists yet for any module. This is the expected,
honest result given the input-state finding in
`docs/internal/mark-7-2-owner-decision-reconciliation.md` — not a gap in this classification pass.

## Explicit statement

**This is not implementation authorization.** No module above may be built by copying this table's
descriptions into a route file. Every module still requires its named owner approval(s), evidence,
and review to close, evaluated by whoever performs that future, separately-scoped pass.
