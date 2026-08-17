# Mark 18 (internal) — Methodology Validation Retrospective

Internal-only. Not rendered, not imported, not linked from any public route.
Evaluates whether the Audit → Architect → Build → Compound methodology
(`docs/internal/mark-17-digital-ecosystem-audit-delivery-blueprint.md`)
actually functioned as a usable operating sequence during Engagement 1
(this internal dry run). Effort is recorded qualitatively only — no hours,
pricing, client-value, or productivity figures appear anywhere below.

## Did Audit → Architect → Build → Compound produce usable artifacts?

**Audit and Architect: yes, directly.** This dry run only exercised the
Audit phase in full (property inventory, current-state map, risk/
opportunity register, evidence map) and produced a partial Architect
artifact (the future-state roadmap). Build and Compound were not exercised
— per this pass's own authorization, no implementation work was in scope,
and the blueprint's own Build-phase gate ("scope only after separate
written approval") correctly prevented any drift into implementation.

## Which phase was strongest?

**Audit.** The blueprint's Audit-phase activity list (property inventory,
current-state map, content/claim/surface review, operational/conversion-
path inventory, risk/opportunity register, evidence map) mapped cleanly
onto this pass's actual deliverables — `mark-18-current-state-system-map.md`
is the current-state map, `mark-18-audit-findings-and-risk-register.md` is
the risk/opportunity register, and `mark-18-sanitized-evidence-register.md`
is the evidence map. The blueprint predicted the shape of the work
accurately.

## Which phase had ambiguous handoffs?

**Audit → Architect.** The blueprint says Architect requires "client
review and discussion of the Audit findings" before proceeding — there is
no client here, so this dry run substituted "owner review of this
document set" without that substitution being explicitly anticipated in
the blueprint's own text. A future revision should note that an internal
dry run's "client" role is filled by the owner reviewing the audit output
directly, distinct from a real future engagement's actual client
review step.

## Which template was missing or weak?

The **proof-candidate template**
(`docs/internal/mark-17-proof-readiness-and-case-study-gates.md`) was not
exercised at all in this dry run, correctly — Engagement 1 is explicitly
not a case-study candidate per its own plan. No weakness was found in the
templates that *were* exercised (the finding-record fields in the Mark 17
delivery blueprint mapped directly onto this register's per-finding
fields without needing improvisation).

## Which owner decisions blocked progress?

None blocked *this* dry run's completion — every required owner decision
(F-001, F-002, F-003, F-005, F-008 in the findings register) is correctly
deferred to the owner rather than assumed, and the dry run was explicitly
authorized to proceed to completion regardless of those open decisions.
They will, however, block **Engagement 2** if it involves a real client,
per the roadmap in `docs/internal/mark-18-future-state-architecture-and-roadmap.md`.

## Which exclusions were clear?

All of them. The excluded-evidence categories (legal, financial, medical,
credentials, private account data, political data) were unambiguous to
apply — this repository simply does not contain any such material, so the
exclusion register in `docs/internal/mark-18-sanitized-evidence-register.md`
could state "not found" with high confidence rather than needing to make
close judgment calls.

## Which evidence controls worked?

The requirement to cite an exact repository path, command, or documentation
ID for every finding worked well — it surfaced two real, well-evidenced P0
findings (F-001, F-002) that would have been easy to state vaguely
("deployment configuration is unclear") but instead have precise, checkable
evidence trails (`docs/mark-2-1-hub-release-control-packet.md` lines 65/76;
`legacy/index.html` lines 848–982; direct `dist/CNAME` inspection this
session).

## Where did scope creep attempt to occur?

Twice, both resisted:

1. When F-002 (`legacy/index.html`) was found, the natural next step would
   have been to *fix* it (relocate or guard it) — resisted per this pass's
   explicit "do not fix findings in this task" instruction; documented as
   a finding with a recommended future action instead.
2. When F-005 (image assets) was found, the natural next step would have
   been to *compress* the largest PNGs — resisted for the same reason;
   flagged as a validation gap (asset-to-usage mapping not yet done)
   rather than acted on.

## Was the scope too narrow, appropriate, or too broad?

**Appropriate.** The sanitized-evidence boundary (repository-local,
non-sensitive) was wide enough to produce two genuine P0 findings and a
comprehensive P1–P3 register, while the "do not fix, only document"
constraint kept the dry run from drifting into an unauthorized remediation
pass.

## What must change before Engagement 2?

Per the roadmap: R-003 (an engagement-scope agreement template) is the
single largest structural gap — Engagement 2, if it ever involves a real
client, cannot proceed under the blueprint's own stated prerequisites
without it. If Engagement 2 remains another internal dry run, no
structural change is required, though the Audit→Architect handoff
ambiguity noted above should be addressed in the blueprint's own text
first.

## Is the candidate flagship repeatable?

**Provisionally yes**, based on this one dry run. The Audit phase's
activity list, artifact list, and evidence-register discipline all
transferred cleanly from a hypothetical client engagement to this
self-directed audit without requiring invention mid-process. This is
evidence *for* repeatability, not proof of it — one dry run against one's
own repository is a much narrower test than a real engagement against an
unfamiliar client's digital footprint, and that gap should not be
understated.

## Dry-run effort log (qualitative only)

| Phase | Effort |
|---|---|
| Inspection (repo structure, governance surface, prior documentation) | moderate |
| Evidence gathering (commands, greps, cross-referencing prior Marks) | high |
| Finding synthesis and risk register | high |
| Roadmap and retrospective authoring | moderate |

No hours, cost, pricing, or productivity figure is recorded anywhere in
this document or any other Mark 18 deliverable.

## Recommended outcome

**Revise, then repeat.** The methodology itself validated well enough not
to warrant deferral or stopping — Audit produced exactly the artifacts the
blueprint predicted, and the "do not fix, only document" discipline held
throughout. But the one concrete gap found (the Audit→Architect handoff
text not accounting for an internal-dry-run "client" substitute) should be
addressed in
`docs/internal/mark-17-digital-ecosystem-audit-delivery-blueprint.md`
before a second dry run or a first real engagement, so the next run
doesn't have to improvise the same substitution again.
