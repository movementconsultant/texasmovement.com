# Mark 17 (internal) — Digital Ecosystem Audit Delivery Blueprint

Internal-only. Not rendered, not imported, not linked from any public route.
A private delivery blueprint for a **future** bounded engagement under the
working label "Digital Ecosystem Audit," structured as
**Audit → Architect → Build → Compound**. Nothing in this document is an
active offer, a scheduled engagement, or a commitment of any kind.

**Boundary rule** (applies throughout):

> Current industry guidance can inform TMI's private operating baseline. It
> does not establish that TMI is certified, compliant, secure, safe,
> effective, qualified, operational, ready for public use, or authorized to
> make public claims.

---

## Phase 1 — Audit

- **Purpose:** establish an honest, evidence-based current-state
  understanding of a prospective client's digital footprint.
- **Buyer-facing outcome category (internal only, never public copy):** "a
  clear map of what exists today and where the risk/opportunity is."
- **Discovery inputs:** a list of the client's known digital properties
  (sites, social accounts, tools, vendors); access credentials granted
  narrowly and only for the audit's duration; any existing brand/style
  documentation the client already has.
- **Owner/client prerequisites:** a signed engagement-scope agreement
  (template does not yet exist); a named decision-maker; explicit written
  authorization for TMI to inspect the specific listed properties.
- **Intended internal activities:** digital-property inventory; current-
  state architecture map; content/claim/surface review (what's published,
  what's claimed, where it could mislead); operational and conversion-path
  inventory (forms, checkouts, contact mechanisms); risk/opportunity
  register; evidence map (what documentation/proof already exists on the
  client's side).
- **Potential artifacts:** a property inventory document; a current-state
  map (diagram or structured list); a risk/opportunity register; an
  evidence map.
- **Dependencies:** client-granted access; a completed engagement-scope
  agreement; a data-handling policy for anything accessed (does not exist
  yet — see `docs/internal/mark-16-tmi-internal-baseline-roadmap.md` P0).
- **Exclusions:** no security certification; no legal review of client
  materials; no medical advice; no guaranteed finding — the audit reports
  what it finds, not a promised result.
- **Quality checks:** internal review of the audit artifact against the
  actual granted access scope (no over-reach); a second-reviewer pass
  before delivery, once this practice is formalized.
- **Evidence/artifact preservation:** audit artifacts are retained per a
  data-retention policy that does not yet exist — one is required before
  any real audit occurs, per `docs/internal/mark-16-tmi-internal-baseline-roadmap.md`.
- **Client-data sensitivity:** potentially high, depending on what's
  accessed — no sensitive personal data, credentials, or financial/legal
  material may ever be stored in this repository, regardless of what a
  real future audit accesses.
- **Confidentiality/privacy constraints:** a confidentiality clause in the
  engagement agreement (template does not yet exist) is a prerequisite,
  not an assumption.
- **Approval gates:** owner sign-off on the audit's scope before it begins;
  owner sign-off on the audit artifact before it's delivered to the client.
- **Stop/escalation criteria:** discovery of anything touching Health,
  therapy, legal, financial, or political material outside the agreed
  scope escalates immediately per
  `docs/internal/mark-16-restricted-domain-boundary-addendum.md`, and the
  audit does not proceed into that material.
- **Handoff requirements:** the audit artifact and evidence map hand off to
  the Architect phase; nothing hands off externally without separate
  client agreement.
- **What this phase does not promise:** no security certification, no
  legal review, no medical advice, and no guaranteed finding of any kind.

## Phase 2 — Architect

- **Purpose:** translate the Audit's findings into a proposed future-state
  structure.
- **Buyer-facing outcome category (internal only):** "a clear plan for how
  the pieces could fit together."
- **Discovery inputs:** the completed Audit artifacts.
- **Owner/client prerequisites:** client review and discussion of the Audit
  findings; a decision from the client on which findings to act on.
- **Intended internal activities:** future-state information architecture;
  route/surface hierarchy design; a governance/control map (who owns what,
  going forward); systems and workflow recommendations; a phased roadmap.
- **Potential artifacts:** an information-architecture document; a
  governance/control map; a phased roadmap document.
- **Dependencies:** a completed, client-reviewed Audit.
- **Exclusions:** no build commitment; no ROI claim; no implementation
  guarantee — Architect is a plan, not a promise.
- **Quality checks:** internal review for internal consistency (does the
  proposed architecture actually follow from the Audit's findings); owner
  review before delivery.
- **Evidence/artifact preservation:** same retention-policy dependency as
  Phase 1.
- **Client-data sensitivity:** lower than Audit (working from already-
  gathered findings, not new access), but the same no-sensitive-data-
  stored-in-repository rule applies without exception.
- **Confidentiality/privacy constraints:** same as Phase 1.
- **Approval gates:** owner sign-off on the proposed architecture before
  delivery to the client.
- **Stop/escalation criteria:** same restricted-domain escalation as
  Phase 1, if the architecture would require crossing into a restricted
  domain.
- **Handoff requirements:** hands off to Build only after a **separate**
  written approval — Architect does not automatically authorize Build.
- **What this phase does not promise:** no build commitment, no ROI claim,
  no implementation guarantee.

## Phase 3 — Build

- **Purpose:** implement an approved, bounded piece of the Architect-phase
  plan.
- **Buyer-facing outcome category (internal only):** "the specific,
  approved piece gets built."
- **Discovery inputs:** the Architect artifact plus the specific,
  separately-approved scope.
- **Owner/client prerequisites:** **separate written approval of a specific,
  bounded scope** — Build never proceeds automatically from Architect.
- **Intended internal activities:** controlled design/content/system
  implementation, limited strictly to the approved scope.
- **Potential artifacts:** whatever the approved scope defines (e.g. a
  redesigned page, a documented workflow, a governance document) —
  intentionally undefined here, since scope is case-by-case.
- **Dependencies:** the separate written Build approval; test/review/
  release controls appropriate to whatever is being built.
- **Exclusions:** no automatic development, integration, deployment, or
  third-party setup beyond the approved scope; no scope creep.
- **Quality checks:** whatever test/review process is appropriate to the
  specific deliverable (e.g. this repository's own `npm run ci` pattern,
  if the deliverable is a website), applied consistently.
- **Evidence/artifact preservation:** same retention-policy dependency as
  Phase 1.
- **Client-data sensitivity:** potentially highest of all four phases,
  depending on what's being built — same absolute rule against storing
  sensitive data in this repository applies.
- **Confidentiality/privacy constraints:** same as Phase 1, plus any
  additional constraints specific to the built deliverable (e.g. a
  security review if the deliverable handles user data).
- **Approval gates:** the separate written scope approval itself is the
  primary gate; a release/quality gate before any deliverable is
  considered complete.
- **Stop/escalation criteria:** same restricted-domain escalation as
  Phase 1; additionally, any scope-creep request from the client requires
  a new, separate approval rather than silent expansion.
- **Handoff requirements:** hands off to Compound once the approved scope
  is delivered and accepted.
- **What this phase does not promise:** no automatic development,
  integration, deployment, or third-party setup — every Build action
  requires its own prior written approval.

## Phase 4 — Compound

- **Purpose:** sustain and govern what was built, over time.
- **Buyer-facing outcome category (internal only):** "the system stays
  documented, governed, and current."
- **Discovery inputs:** the completed Build deliverable and its
  documentation.
- **Owner/client prerequisites:** an explicit, separately defined
  agreement if any ongoing relationship is intended — Compound does not
  imply automatic continuation.
- **Intended internal activities:** documentation maintenance; content/
  evidence updates; governance review; a measurement plan (see
  `docs/internal/mark-17-ux-performance-baseline-plan.md` for the kind of
  measurement this could eventually involve); change control.
- **Potential artifacts:** an updated documentation set; a governance
  review log; a measurement plan document.
- **Dependencies:** a completed Build deliverable; a separately defined
  ongoing-relationship agreement, if any.
- **Exclusions:** no recurring support, SLA, monitoring, or optimization
  commitment unless separately defined and operationally supported — this
  is the phase most likely to be silently over-promised, so the exclusion
  is stated twice, deliberately.
- **Quality checks:** periodic governance review against whatever cadence
  is separately agreed.
- **Evidence/artifact preservation:** same retention-policy dependency as
  Phase 1, extended for as long as any ongoing relationship continues.
- **Client-data sensitivity:** ongoing, same absolute rule applies for the
  life of any relationship.
- **Confidentiality/privacy constraints:** same as Phase 1, for the life of
  any relationship.
- **Approval gates:** any change in scope or cadence requires the same
  separate-written-approval discipline as Build.
- **Stop/escalation criteria:** same restricted-domain escalation; also,
  any request to expand into unbounded/ongoing support without a defined
  agreement is declined, not silently absorbed.
- **Handoff requirements:** none beyond this phase — Compound is the
  terminal phase of one engagement cycle; a new cycle would restart at
  Audit.
- **What this phase does not promise:** no recurring support, SLA,
  monitoring, or optimization commitment unless separately defined and
  operationally supported.

---

## Cross-phase notes

- Every phase's "what it does not promise" section exists specifically to
  prevent the single most common failure mode in consulting engagements:
  scope and outcome creep from an initial diagnostic into an implied
  ongoing commitment. Each phase is bounded and requires its own
  authorization to proceed to the next.
- No phase of this blueprint has ever been run against a real client. It
  is a design document for a future capability, not a record of past
  delivery.
