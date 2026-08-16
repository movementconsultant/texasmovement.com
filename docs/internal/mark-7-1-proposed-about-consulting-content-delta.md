# Mark 7.1 Proposed /about and /consulting Content-Delta Plan

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

> ## This is not implementation authorization.
>
> Nothing in this document changes `/about`, `/consulting`, or any other route, proof status,
> claim, or public copy. It is a plan for what a future, separately-scoped implementation pass
> *could* do once the owner review in `docs/internal/mark-7-1-tmi-consulting-owner-review.md` is
> answered and the relevant evidence exists. No source file was touched to produce this document.

---

## /about

### Current route posture

**Building** (descriptive page, no posture badge needed — see
`docs/mark-6-safe-hub-route-implementation.json` → routes `/about`). Renders: mission statement
(reusing `ORG.boilerplate`), operating-principles module, one internal link to `/ecosystem`. Zero
conversion surface. Zero founder biography.

### What can remain unchanged

The existing mission sentence, operating-principles module, and `/ecosystem` link are all
already-approved, restrained content with no known factual problem. If the owner selects **Option
1** for A1/A2/A3 in the Mark 7.1 review, `/about` requires **no change at all** — this is a
legitimate, safe outcome, not a fallback.

### Potential future content modules

| Module | Owner approvals required | Proof/evidence dependency |
|---|---|---|
| Revised one-sentence positioning (if Option 2/3 or custom is chosen) | A1 = a specific option, A7 = approve | None — positioning language, not a factual claim |
| Revised category-focus statement | A2 = a specific option, A7 = approve | None |
| Revised operating principles | A3 = a specific set, A7 = approve | None |
| Explicit "TMI is / is not" module | A4 = approve or revised text, A7 = approve | None |
| Ecosystem-emphasis ordering reflected in copy or link order | A5 = approve or reordered, A7 = approve | None — sequencing choice, not a claim |
| Founder-context cross-reference (e.g. a line linking to alexandermathai.com's positioning) | A7 = approve, **plus** a separate, independent clearance from alexandermathai.com's own claims review | `PR-FOUNDER-001` (`docs/mark-5-tmi-content-model-and-proof-registry.json`) — 40 of 41 entries pending as of the last check in that repository |

### Modules that must remain absent

Founder biography text, any historical or numerical claim, any active-service/product-availability
statement, any contact or conversion path. None of these is proposed by any module above.

### Claims and wording that remain prohibited

Any statement that a division is "open," "live," "available," "operating," or "accepting" anything;
any metric, date, or client reference; any founder credential not independently cleared through
alexandermathai.com's own registry.

### Future test/validation requirements

If `/about`'s copy changes: re-run `tests/hub-routes.test.ts` (forbidden-conversion-pattern scan
still must pass unchanged), `tests/a11y.mjs` (0 violations must hold), and
`scripts/check-public-output.mjs` (no new `TBD`, no new unverified mailto, preview noindex intact).
A new narrow test may be needed only if a new content object type (e.g. the "is/is not" module) is
added structurally, not just as prose inside the existing sections.

---

## /consulting

### Current route posture

**Building — not yet live** (`docs/mark-6-safe-hub-route-implementation.json` → routes
`/consulting`). Renders: posture badge, category-level focus-area description, neutral
diagnose-design-document-measure method framing, one unpopulated future proof/case-study module,
inert-pathways statement, one internal link to `/ecosystem`. Zero conversion surface.

### What can remain unchanged

The posture badge, the diagnose-design-document-measure method framing, and the inert-pathways
statement are all already-restrained and do not depend on any pending owner review — they can stay
exactly as they are regardless of how Section B of the Mark 7.1 review is answered.

### Potential future content modules

| Module | Owner approvals required | Proof/evidence dependency |
|---|---|---|
| Named service-lane summaries (up to 3, per B1 selection) | B1 = up to 3 lanes selected, B4 = confirmed no commercial activation | Varies per lane — see `docs/internal/mark-7-1-tmi-consulting-owner-review.json` → `sectionB_consultingLaneHypotheses`; Lane 1 needs `PR-ARCH-001`, Lane 2 needs `PR-CONSULT-001`, Lanes 3–6 currently have no evidence at all |
| Exclusions text per selected lane | B2 answered | None beyond the lane's own owner-authored exclusions |
| A populated case-study module (replacing "not yet populated") | Explicit written client permission, B3 confirms evidence exists | `PR-CONSULT-001` — signed permission + engagement record, currently `absent` |
| An engagement-volume/count statement | Separate owner-supplied auditable count | `PR-CONSULT-002` — currently `absent` |
| A real Service module (scope, deliverables, pricing) with a live intake path | Full route-level Conversion-ready state per `docs/mark-5-route-completion-specification.json` — legal-reviewed Service module, `consulting@` in `VERIFIED_INBOXES`, explicit owner authorization | Every Section B evidence field for the selected lane(s), plus `MARK7-G-07` (Workspace routing) and `MARK7-G-08` (release authorization) from Section D of this review |

### Modules that must remain absent

Pricing, packages, client claims, testimonials, outcomes, contact paths, discovery-call booking,
availability statements, proposals, forms, email addresses — for **every** lane, regardless of
which lanes the owner selects in B1, until each lane's own evidence and review requirements close.

### Claims and wording that remain prohibited

Any guaranteed outcome or timeline; any client name/logo/result without confirmed written
permission; any statement that an engagement is "available now" or "accepting clients"; any pricing
figure, range, or model presented as decided.

### Future test/validation requirements

If `/consulting`'s copy changes to add lane summaries: extend
`tests/hub-routes.test.ts`'s forbidden-conversion-pattern scan to cover the new content (it already
runs against the whole page source, so no new test file is strictly required unless a new content
object — e.g. a `Service module` component — is introduced). If a case study or metric is ever
added, add a narrow test asserting it only renders when its proof-registry ID
(`PR-CONSULT-001`/`002`) is `approved-for-public-use`, mirroring the existing pattern of gating
render on registry state rather than on the presence of text alone. `tests/a11y.mjs` and
`scripts/check-public-output.mjs` must continue to pass unchanged.

---

## Cross-cutting notes

- Neither route's Building-state DoD (`docs/mark-5-route-completion-specification.json`) changes
  as a result of this plan — both remain at **Building**, not **Evidence-ready**, until the owner
  actually answers the Mark 7.1 checklist and supplies real evidence into the Mark 7 intake fields
  this plan references.
- No module listed above may be implemented by simply copying this document's draft language into
  a route file. Every "potential future content module" still requires its named owner approval(s)
  and evidence to close, evaluated by whoever performs that future, separately-scoped pass.
- This plan does not itself select a Consulting lane, approve a positioning statement, or authorize
  any infrastructure step — see `docs/internal/mark-7-1-tmi-consulting-owner-review.md` for the
  actual decision checklist.
