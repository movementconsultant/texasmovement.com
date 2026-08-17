# Mark 17 (internal) — Weekly Operating Scorecard

Internal-only. Not rendered, not imported, not linked from any public route.
A private, reusable weekly scorecard template that prioritizes operating
substance over vanity metrics. **Delivered blank in this pass** — no field
below reflects a real, populated status; this is the template itself.

**Boundary rule** (applies throughout):

> Current industry guidance can inform TMI's private operating baseline. It
> does not establish that TMI is certified, compliant, secure, safe,
> effective, qualified, operational, ready for public use, or authorized to
> make public claims.

## Field vocabulary (used for every item below)

Every scorecard field carries: **status** (one of `not started` / `in
progress` / `blocked` / `deferred` / `complete with evidence`),
**evidence reference**, **owner**, **next review date**, **next action**,
**risk flag**.

---

## 1. Commercial foundation

| Item | Status | Evidence reference | Owner | Next review date | Next action | Risk flag |
|---|---|---|---|---|---|---|
| Flagship offer decision status | not started | — | — | — | Owner reviews `docs/mark-17-flagship-commercial-operating-system.md` Part A | — |
| Delivery blueprint completeness | in progress | `docs/internal/mark-17-digital-ecosystem-audit-delivery-blueprint.md` | — | — | Owner review of the four-phase blueprint | — |
| Scope/exclusion approval | not started | `docs/mark-17-flagship-commercial-operating-system.md` Part D | — | — | Owner reviews and approves/amends the scope matrix | — |
| Contract/policy readiness | not started | — (no template exists yet) | — | — | Draft an engagement-scope agreement template | Flag: no legal review has occurred |
| Evidence/case-study status | not started | `docs/internal/mark-17-proof-readiness-and-case-study-gates.md` | — | — | Await Engagement 1 | — |
| Intake/contact activation status | not started (inactive by design) | `docs/mark-18-contact-intake-implementation.md` | — | — | No action — intentionally inactive | — |

## 2. Proof and media

| Item | Status | Evidence reference | Owner | Next review date | Next action | Risk flag |
|---|---|---|---|---|---|---|
| One-item editorial stress-test status | not started | `docs/internal/mark-12-one-item-editorial-stress-test-plan.md` | — | — | Owner reviews existing plan | — |
| Rights/accessibility completion | not started | `docs/internal/mark-16-source-review-cards.md` (MK16-SRC-07) | — | — | Draft an internal rights-review checklist | — |
| Source review | not started | `docs/mark-8-tmm-source-verification-checklist.md` | — | — | Re-confirm checklist currency | — |
| Case-study evidence progress | not started | `docs/internal/mark-17-proof-readiness-and-case-study-gates.md` | — | — | Await Engagement 1 | — |

*No audience/likes/follower count appears anywhere in this section, by
design — this scorecard deliberately excludes vanity metrics as a success
measure.*

## 3. Product/technical health

| Item | Status | Evidence reference | Owner | Next review date | Next action | Risk flag |
|---|---|---|---|---|---|---|
| PR/build/check status | complete with evidence | PR #2, `npm run ci` green as of this pass's validation | — | — | Keep re-running `npm run ci` on every change | — |
| Accessibility checks | complete with evidence | `npm run test:a11y` — 0 violations/15 routes as of Mark 13/14 | — | — | Re-run after any visual change | — |
| Structured-data audit status | not started | `docs/mark-12-json-ld-audit-plan.md` | — | — | Owner reviews existing plan | — |
| Domain/release blockers | in progress | `docs/ecosystem-release-matrix.md` | — | — | No action — tracked separately | — |
| Security/privacy control status | not started | `docs/internal/mark-16-tmi-internal-baseline-roadmap.md` P0 | — | — | Draft data-flow map for contact-intake Worker | Flag: P0 controls not yet in place |
| Dependency/update review state | not started | `package.json` (both repos) | — | — | Schedule a periodic dependency review | — |
| **Flagged this pass:** TMI build-output weight (2.8M) vs. AVM (596K), driven by unoptimized brand-asset PNGs | not started | `docs/internal/mark-17-ux-performance-baseline-plan.md` §4a | — | — | Owner reviews whether all flagged assets are actually referenced from built pages | — |

## 4. Operating discipline

| Item | Status | Evidence reference | Owner | Next review date | Next action | Risk flag |
|---|---|---|---|---|---|---|
| Owner decisions completed | not started | this document's own §1 items | — | — | Owner works through the pending-decision list across Marks 15–17 | — |
| Documentation freshness | complete with evidence | this repository's `docs/` tree, actively maintained through Mark 17 | — | — | Continue the existing practice | — |
| Approval-gate compliance | not started | `docs/internal/mark-17-digital-ecosystem-audit-delivery-blueprint.md` approval gates | — | — | No engagement has occurred to test this yet | — |
| Unresolved risks | in progress | this scorecard's own risk-flag column | — | — | Review flagged items above | — |
| Next single priority | not started | — | — | — | Owner selects one item from §1 to act on first | — |

## 5. Personal founder operating layer

| Item | Status | Evidence reference | Owner | Next review date | Next action | Risk flag |
|---|---|---|---|---|---|---|
| Focus block completion | not started | — | — | — | Owner's own personal tracking, outside this repository | — |
| Review cadence | not started | — | — | — | Owner establishes a personal weekly-review habit around this scorecard | — |
| Content/creative work performed | not started | — | — | — | Owner's own personal tracking | — |
| Training/recovery | not started | — | — | — | **Personal/private self-management only — no athlete-performance claim of any kind belongs in this repository, and none is made here.** | — |

*No financial, legal, damages, litigation, political, or social vanity
metric appears anywhere in this scorecard, by design.*

---

## Usage note

This scorecard is intended to be copied and dated weekly once actually
adopted (e.g. `mark-17-scorecard-2026-W35.md`, outside the scope of this
pass to create). No such dated copy exists yet — only this reusable
template.
