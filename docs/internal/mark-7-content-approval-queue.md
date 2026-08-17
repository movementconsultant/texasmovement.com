# Mark 7 Content Approval Queue

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

A compact, cross-route tracker connecting each future content module to its evidence/proof
dependency, review state, and next action. **Every row below is seeded with existing registry IDs
and blank owner-input references only — no real claim or evidence has been entered anywhere in
this table.** Update this queue as fields in `docs/internal/mark-7-founder-evidence-intake.md`
move through the process described in `docs/internal/mark-7-evidence-submission-guide.md`.

Columns: **Route** · **Content module** · **Evidence/proof ID** · **Owner decision** · **Claims/
editorial reviewer** · **Required proof** · **Current status** · **Public-use permission** ·
**Release dependency** · **Next action**

---

## /about

| Content module | Evidence/proof ID | Owner decision | Reviewer | Required proof | Current status | Public-use permission | Release dependency | Next action |
|---|---|---|---|---|---|---|---|---|
| TMI umbrella identity (mission/principles) | — (no proof-registry ID; positioning only) | pending | — | Owner-authored, no external evidence | not started | not approved | Section A `ownerDecision` = approve | Owner fills MARK7-A-01 through A-09 |
| Founder-context cross-reference (if ever added) | `PR-FOUNDER-001` | pending | — | alexandermathai.com `claims.registry.json` entry, `ownerDecision` != pending | not started | not approved | alexandermathai.com's own claims review clears first | Owner fills MARK7-A-08; independently, alexandermathai.com's registry must clear |

## /consulting

| Content module | Evidence/proof ID | Owner decision | Reviewer | Required proof | Current status | Public-use permission | Release dependency | Next action |
|---|---|---|---|---|---|---|---|---|
| Service module: Ecosystem audit | `PR-ARCH-001` | pending | — | Both hubs at release-candidate state (self-referential example) | not started | not approved | /consulting Evidence-ready state | Owner fills MARK7-B-03 |
| Service module: Digital architecture | `PR-ARCH-001` | pending | — | Same as above | not started | not approved | Same as above | Owner fills MARK7-B-04 |
| Service module: AI/workflow strategy | `PR-CONSULT-001` | pending | — | Case-study permission + engagement record | not started | not approved | /consulting Evidence-ready state | Owner fills MARK7-B-05, B-10 |
| Service module: Automation / Content systems / Advisory / Implementation guidance | — (none defined yet) | pending | — | Service scope + evidence, per concept | not started | not approved | /consulting Evidence-ready state | Owner fills MARK7-B-06 through B-09 |
| Case-study candidate | `PR-CONSULT-001` | pending | — | Signed client permission | not started | not approved | /consulting Evidence-ready state | Owner fills MARK7-B-10 |
| Engagement-volume claim | `PR-CONSULT-002` | pending | — | Auditable internal engagement log | not started | not approved | /consulting Evidence-ready state | Owner supplies count evidence (no intake field yet — add if needed) |

## /media

| Content module | Evidence/proof ID | Owner decision | Reviewer | Required proof | Current status | Public-use permission | Release dependency | Next action |
|---|---|---|---|---|---|---|---|---|
| Platform account links | `PR-MEDIA-002` | pending | — | Manual human confirmation of ownership | not started | not approved | /media Evidence-ready state | Owner fills MARK7-C-01, C-02 |
| Verified metric display (incl. the 2.1M+ views figure) | `PR-MEDIA-001` | pending | — | Platform-native analytics export | not started | not approved | /media Evidence-ready state | Owner fills MARK7-C-03 |
| Planned programming series detail | — (no proof-registry ID; concept-stage) | pending | — | Owner-authored concept | not started | not approved | None — may draft as "planned" once approved | Owner fills MARK7-C-04 |
| Content asset reuse (clips) | `PR-ASSET-001` | pending | — | Rights/release documentation | not started | not approved | /media Evidence-ready state | Owner fills MARK7-C-05 |
| Press/media claim | — (none defined yet) | pending | — | Published source | not started | not approved | /media Evidence-ready state | Owner fills MARK7-C-06 |

## /performance

| Content module | Evidence/proof ID | Owner decision | Reviewer | Required proof | Current status | Public-use permission | Release dependency | Next action |
|---|---|---|---|---|---|---|---|---|
| Educational-topic content | `PR-PERF-001` | pending | — | Documented non-clinical methodology + legal review | not started | not approved | Non-clinical scope/safety legal review closes | Owner fills MARK7-D-01, D-02, D-05 |
| Coach/operator credential display | `PR-PERF-002` | pending | — | Verifiable certification/license record | not started | not approved | Same as above | Owner fills MARK7-D-05 |
| Coaching/event pathway (Conversion-ready only) | `PR-PERF-001` | pending | — | Full legal/insurance/waiver/safety/operational checklist | not started | not approved | MARK7-D-06 checklist fully closed | Owner completes MARK7-D-04, D-06 |

## /distribution

| Content module | Evidence/proof ID | Owner decision | Reviewer | Required proof | Current status | Public-use permission | Release dependency | Next action |
|---|---|---|---|---|---|---|---|---|
| Distribution playbook / capability detail | — (internal capability, no public claim requiring proof) | pending | — | None required (internal-only) | not started | not approved | Media's own maturity supports a public route | Owner fills MARK7-F-01, F-02 |

## /hero

| Content module | Evidence/proof ID | Owner decision | Reviewer | Required proof | Current status | Public-use permission | Release dependency | Next action |
|---|---|---|---|---|---|---|---|---|
| Any bridge-page expansion beyond current inert copy | `PR-HERO-001` | pending | — | Full 5-item Mark 2 storefront audit + owner approval | not started | not approved | All 5 Mark 2 audit-evidence items + owner approval | Owner fills MARK7-E-01 through E-08; audit itself is a separate, future, explicitly-scoped pass |

## /partners

| Content module | Evidence/proof ID | Owner decision | Reviewer | Required proof | Current status | Public-use permission | Release dependency | Next action |
|---|---|---|---|---|---|---|---|---|
| Collaboration-category framework detail | — (no proof-registry ID; criteria only) | pending | — | Owner-authored fit/criteria framework | not started | not approved | /partners Evidence-ready state | Owner fills MARK7-F-03, F-04 |
| Named partner reference | `PR-PARTNER-001` | pending | — | Named partner's written permission | not started | not approved | /partners Evidence-ready state | Owner fills MARK7-F-07 |
| Intake mechanism activation | — (no proof-registry ID; operational decision) | pending | — | Inbox ownership, response ops, privacy terms, routing logic all decided + legal-reviewed | not started | not approved | /partners Conversion-ready state | Owner fills MARK7-F-05, F-06 |

---

## Reading this queue

- **Current status** starts at `not started` for every row and should track the intake field's own
  `verificationStatus` (`absent` / `owner-submitted` / `needs-review` / `verified` /
  `approved-for-public-use` / `rejected` / `deferred`) once the owner begins filling fields in.
- **Public-use permission** stays `not approved` until both the evidence is `verified` **and** the
  owner's `ownerDecision` is `approve` — technical verification and publication approval are
  separate gates, per `docs/internal/mark-7-evidence-submission-guide.md` section 3.
- **Release dependency** names the specific route-completion-spec gate
  (`docs/mark-5-route-completion-specification.json`) this row must clear before any content
  change is even eligible to be proposed.
- **Next action** is always phrased as an owner action or a pointer to a future, separately-scoped
  pass — never as something this document or session performs on its own.

No row in this table has moved past `not started` / `pending` / `not approved` as of this pass.
