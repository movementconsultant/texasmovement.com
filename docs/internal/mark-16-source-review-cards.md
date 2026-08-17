# Mark 16 (internal) — Source Review Cards

Internal-only. Not rendered, not imported, not linked from any public route.
One full review card per source, using the field set from
`docs/internal/mark-15-standards-source-review-template.md`, plus the Part B
crosswalk-mapping fields required by this pass's brief. 14 sources total —
see `docs/mark-16-current-best-practice-source-register.md` for the summary
table and research-method note.

**Guardrail statement** (applies to every card below):

> An external source may inform an internal TMI operating baseline. It does
> not establish that TMI is certified, compliant, evidence-based, safe,
> effective, qualified, operational, or authorized, and it does not
> authorize public claims, service activation, health guidance, legal
> guidance, commerce, checkout, community operations, or product launch.

---

## MK16-SRC-01 — WCAG 2.2

- **Publisher/authority:** W3C, Web Accessibility Initiative
- **URL:** https://www.w3.org/WAI/standards-guidelines/wcag/
- **Publication/revision date:** W3C Recommendation 2023-10-05, updated 2024-12-12
- **Jurisdiction:** International, web-content-neutral
- **Intended vertical/domain:** Cross-ecosystem accessibility
- **Type:** standards body
- **Why relevant:** Direct, current, primary accessibility standard for web
  content — every TMI hub route is web content.
- **What it does not establish:** Conformance of any current TMI route; no
  evaluation against WCAG 2.2 has occurred in this pass.
- **Limitations/conflicts:** None known; the current, actively maintained
  version at time of research.
- **Authoritative / informative / contextual:** Authoritative.
- **Required expert review:** Accessibility specialist, before any
  conformance-level statement.
- **Internal adoption recommendation:** Hold for review — candidate for
  internal reference once reviewed.
- **Proposed implementation controls:** Use as a checklist basis for a
  future internal route-accessibility review process (not yet built).
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual, or upon next WCAG revision.
- **Crosswalk — applicable internal control:** accessible-by-default review
  checklist for routes/forms/checkout.
- **Crosswalk — evidence needed before adoption:** an internal accessibility
  self-check performed against named success criteria.
- **Crosswalk — implementation prerequisites:** a named internal reviewer
  or process; none exists today beyond the existing axe-core automated
  a11y test suites already in both repos.
- **Crosswalk — public-claim boundary:** no "WCAG conformant" or
  "accessible" claim without an actual evaluation artifact.
- **Crosswalk — release blocker:** no formal WCAG 2.2 evaluation exists for
  either repo today (existing axe-core coverage checks a subset, not full
  WCAG 2.2 conformance).
- **Crosswalk — risk level:** Medium (reputational/legal if claimed
  without evidence; not physical-safety).
- **Crosswalk — owner approval requirement:** required before any public
  accessibility-conformance statement.

---

## MK16-SRC-02 — WCAG-EM 1.0

- **Publisher/authority:** W3C
- **URL:** https://www.w3.org/TR/WCAG-EM/
- **Publication/revision date:** W3C Group Note, 2014
- **Jurisdiction:** International, web-content-neutral
- **Intended vertical/domain:** Cross-ecosystem accessibility evaluation
  process
- **Type:** standards body (informative note)
- **Why relevant:** Provides a structured five-step evaluation procedure to
  pair with WCAG 2.2's criteria.
- **What it does not establish:** Conformance itself — it is a "how to
  evaluate," not a result.
- **Limitations/conflicts:** Dated 2014, predates WCAG 2.2 (2023); still
  procedurally applicable but should be read alongside newer WCAG-specific
  guidance.
- **Authoritative / informative / contextual:** Informative.
- **Required expert review:** Accessibility specialist.
- **Internal adoption recommendation:** Hold for review.
- **Proposed implementation controls:** Candidate procedure for a future
  internal accessibility audit cadence.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual.
- **Crosswalk — applicable internal control:** structured internal audit
  procedure.
- **Crosswalk — evidence needed before adoption:** a completed internal
  pilot audit using the methodology.
- **Crosswalk — implementation prerequisites:** a named reviewer and audit
  cadence, neither of which exists today.
- **Crosswalk — public-claim boundary:** no "audited for accessibility"
  claim without a completed audit.
- **Crosswalk — release blocker:** no internal audit has been performed
  using this or any structured methodology.
- **Crosswalk — risk level:** Low-medium (process gap, not a direct-harm
  risk).
- **Crosswalk — owner approval requirement:** required before adopting as
  the standing internal audit procedure.

---

## MK16-SRC-03 — NIST Cybersecurity Framework 2.0

- **Publisher/authority:** NIST / U.S. Department of Commerce
- **URL:** https://www.nist.gov/cyberframework
- **Publication/revision date:** 2024-02-26
- **Jurisdiction:** United States, voluntary, size-neutral
- **Intended vertical/domain:** Cross-ecosystem security governance
- **Type:** law/regulation-adjacent official guidance
- **Why relevant:** Current, primary, widely referenced security-governance
  taxonomy explicitly designed to scale down to small organizations.
- **What it does not establish:** That TMI implements any CSF function
  today; the framework is voluntary and non-certifying by design.
- **Limitations/conflicts:** A taxonomy, not a specific technical-control
  checklist — requires translation into concrete controls.
- **Authoritative / informative / contextual:** Authoritative.
- **Required expert review:** Security specialist.
- **Internal adoption recommendation:** Hold for review.
- **Proposed implementation controls:** Candidate organizing taxonomy for a
  future internal security-governance document.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual.
- **Crosswalk — applicable internal control:** Govern/Identify/Protect/
  Detect/Respond/Recover taxonomy for the contact-intake Worker and any
  future app.
- **Crosswalk — evidence needed before adoption:** a documented internal
  risk assessment mapped to the taxonomy.
- **Crosswalk — implementation prerequisites:** none of the six functions
  currently have a documented internal owner or process.
- **Crosswalk — public-claim boundary:** no "NIST CSF aligned" or
  "cybersecurity compliant" claim without a documented internal assessment.
- **Crosswalk — release blocker:** no internal risk assessment exists.
- **Crosswalk — risk level:** High (data/security exposure once any real
  product handles data).
- **Crosswalk — owner approval requirement:** required before any control
  from this framework is actually implemented.

---

## MK16-SRC-04 — OWASP ASVS 5.0

- **Publisher/authority:** OWASP Foundation
- **URL:** https://asvs.dev/
- **Publication/revision date:** 2025-05
- **Jurisdiction:** International, web-application-neutral
- **Intended vertical/domain:** Apps/services, cross-ecosystem application
  security
- **Type:** standards body
- **Why relevant:** Current (most recent major revision), primary,
  widely-adopted application-security verification standard; directly
  relevant to the existing (undeployed) `workers/contact-intake/` Worker
  described in `docs/mark-18-contact-intake-implementation.md`.
- **What it does not establish:** That the contact-intake Worker or any
  other TMI code meets any ASVS level; no verification has occurred.
- **Limitations/conflicts:** Designed for full applications; a single
  Worker is a small surface relative to the standard's full scope.
- **Authoritative / informative / contextual:** Authoritative.
- **Required expert review:** Security specialist.
- **Internal adoption recommendation:** Hold for review.
- **Proposed implementation controls:** Candidate checklist basis for a
  future security review of the contact-intake Worker before deployment.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual, or upon next ASVS major revision.
- **Crosswalk — applicable internal control:** input validation, rate
  limiting, and secrets-handling review for the contact-intake Worker.
- **Crosswalk — evidence needed before adoption:** a completed internal
  security review of the Worker's source against relevant ASVS items.
- **Crosswalk — implementation prerequisites:** the Worker is currently
  undeployed with rate-limiting fail-open by design (documented limitation
  per `docs/mark-18-contact-intake-implementation.md`) — this must close
  before any ASVS-informed claim is considered.
- **Crosswalk — public-claim boundary:** no "security-verified" or
  "ASVS-compliant" claim without a completed review.
- **Crosswalk — release blocker:** no formal security review of the Worker
  has occurred; KV-backed rate limiting is not yet provisioned.
- **Crosswalk — risk level:** High.
- **Crosswalk — owner approval requirement:** required before Worker
  deployment and before any related public statement.

---

## MK16-SRC-05 — FTC "Protecting Personal Information: A Guide for Business"

- **Publisher/authority:** Federal Trade Commission
- **URL:** https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business
- **Publication/revision date:** Current, periodically-revised FTC guidance
  page (exact last-revision date not independently confirmed this pass)
- **Jurisdiction:** United States, federal, non-binding business guidance
- **Intended vertical/domain:** Cross-ecosystem privacy, Apps/services
- **Type:** official guidance
- **Why relevant:** Primary US regulator's own small-business-oriented
  privacy/data-minimization guidance — directly matches this framework's
  "small organization" posture.
- **What it does not establish:** Legal compliance with any specific
  privacy statute; general guidance, not a certification.
- **Limitations/conflicts:** US-federal-only; does not cover state privacy
  statutes (CCPA and similar), which would need separate legal review.
- **Authoritative / informative / contextual:** Authoritative for its
  stated scope; contextual for state-law questions.
- **Required expert review:** Privacy/legal.
- **Internal adoption recommendation:** Hold for review.
- **Proposed implementation controls:** Candidate baseline for data
  minimization and retention limits, should any form/account ever collect
  personal data.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual.
- **Crosswalk — applicable internal control:** data-minimization default
  for the contact-intake Worker's stored/logged fields.
- **Crosswalk — evidence needed before adoption:** a documented internal
  data-flow map for the Worker (what's collected, where it goes, how long
  retained).
- **Crosswalk — implementation prerequisites:** no data-flow map exists
  today.
- **Crosswalk — public-claim boundary:** no "privacy-compliant" or
  "data-protected" claim without a documented assessment.
- **Crosswalk — release blocker:** no data-flow map or retention policy
  exists for the contact-intake Worker.
- **Crosswalk — risk level:** High once any real data collection begins;
  currently Low (no live endpoint, per existing gating).
- **Crosswalk — owner approval requirement:** required before
  `PUBLIC_CONTACT_ENDPOINT` is ever set to a real value.

---

## MK16-SRC-06 — NIST SP 800-63, Digital Identity Guidelines (Rev. 4)

- **Publisher/authority:** NIST
- **URL:** https://www.nist.gov/identity-access-management/projects/nist-special-publication-800-63-digital-identity-guidelines
- **Publication/revision date:** Revision 4 in progress/publication per the
  NIST project page as of research date; exact final date not
  independently confirmed (fetch blocked by sandbox egress policy)
- **Jurisdiction:** United States, federal guidance, broadly referenced
  industry-wide
- **Intended vertical/domain:** Apps/services — authentication
- **Type:** official guidance
- **Why relevant:** The primary US reference for identity-proofing and
  authentication design.
- **What it does not establish:** That TMI has any account or
  authentication system — none exists.
- **Limitations/conflicts:** Written primarily for government information
  systems; private-sector use requires interpretation. Revision status
  should be re-confirmed directly before use (see research-method note in
  the parent register).
- **Authoritative / informative / contextual:** Authoritative, with a
  revision-currency caveat.
- **Required expert review:** Security/identity specialist.
- **Internal adoption recommendation:** Insufficient information (revision
  status needs direct confirmation before a firmer recommendation).
- **Proposed implementation controls:** None yet — no product exists.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual, or upon Revision 4 finalization confirmation.
- **Crosswalk — applicable internal control:** future account/
  authentication design baseline.
- **Crosswalk — evidence needed before adoption:** direct confirmation of
  current revision status from NIST's own site.
- **Crosswalk — implementation prerequisites:** no app or account system
  exists.
- **Crosswalk — public-claim boundary:** no "NIST-aligned identity" claim
  without a real product and assessment.
- **Crosswalk — release blocker:** no product exists; not applicable today.
- **Crosswalk — risk level:** High (future), Not applicable (today).
- **Crosswalk — owner approval requirement:** required before any account
  system is built.

---

## MK16-SRC-07 — U.S. Copyright Office fair-use resources

- **Publisher/authority:** U.S. Copyright Office
- **URL:** https://www.copyright.gov/fair-use/
- **Publication/revision date:** Ongoing official government resource
- **Jurisdiction:** United States, federal copyright law
- **Intended vertical/domain:** Media — copyright/attribution;
  Distribution — rights management
- **Type:** law/regulation-adjacent official resource
- **Why relevant:** Primary US government source on fair use, directly
  relevant to any future TMM editorial or distribution rights process.
- **What it does not establish:** That any specific TMI use of third-party
  material is fair use — fair use is a case-by-case legal determination.
- **Limitations/conflicts:** US law only; no coverage of international
  copyright regimes.
- **Authoritative / informative / contextual:** Authoritative.
- **Required expert review:** IP/legal review for any specific use.
- **Internal adoption recommendation:** Hold for review.
- **Proposed implementation controls:** Candidate basis for an internal
  rights-review checklist for future TMM content.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual.
- **Crosswalk — applicable internal control:** editorial rights-review
  step before publishing any third-party-derived media content.
- **Crosswalk — evidence needed before adoption:** none required to
  reference the four-factor test internally; specific-use evidence needed
  per instance.
- **Crosswalk — implementation prerequisites:** no editorial rights-review
  process exists today.
- **Crosswalk — public-claim boundary:** no "fair use confirmed" claim
  without case-specific legal review.
- **Crosswalk — release blocker:** no rights-review process exists.
- **Crosswalk — risk level:** Medium.
- **Crosswalk — owner approval requirement:** required before adopting a
  formal rights-review process.

---

## MK16-SRC-08 — PCI DSS v4.0.1

- **Publisher/authority:** PCI Security Standards Council
- **URL:** https://www.pcisecuritystandards.org/
- **Publication/revision date:** 2024-06
- **Jurisdiction:** International, applies to any payment-card-data handler
- **Intended vertical/domain:** Checkout/conversion, HERO/commerce
- **Type:** product/payment policy, standards body
- **Why relevant:** The primary payment-card security standard, directly
  relevant to any future TMI or HERO checkout.
- **What it does not establish:** That TMI or HERO currently processes
  payment data through this hub — no checkout exists anywhere in this
  ecosystem.
- **Limitations/conflicts:** Full standard text is a controlled/member
  resource; only the public overview was consulted, no substantial
  copyrighted text reproduced here.
- **Authoritative / informative / contextual:** Authoritative.
- **Required expert review:** PCI-qualified security assessor.
- **Internal adoption recommendation:** Insufficient information to adopt
  (not applicable until a checkout is considered).
- **Proposed implementation controls:** None — not applicable today.
- **Proposed public wording:** Not applicable.
- **Owner decision:** Pending — not applicable until checkout activation
  is considered.
- **Revalidation:** Not applicable until then.
- **Crosswalk — applicable internal control:** none today.
- **Crosswalk — evidence needed before adoption:** a real payment-processing
  design and PCI-qualified assessment.
- **Crosswalk — implementation prerequisites:** no checkout exists.
- **Crosswalk — public-claim boundary:** no "PCI compliant" claim ever,
  without a real assessed payment system.
- **Crosswalk — release blocker:** no checkout exists anywhere in this
  ecosystem; this pass does not create one.
- **Crosswalk — risk level:** High (future only).
- **Crosswalk — owner approval requirement:** required before any checkout
  is even scoped.

---

## MK16-SRC-09 — FTC Negative Option ("Click-to-Cancel") Rule and guidance

- **Publisher/authority:** Federal Trade Commission
- **URL:** https://www.ftc.gov/news-events/news/press-releases/2024/10/federal-trade-commission-announces-final-click-cancel-rule-making-it-easier-consumers-end-recurring
- **Publication/revision date:** Final rule 2024-10; vacated by a federal
  appellate court in 2025 for Administrative Procedure Act violations; new
  FTC rulemaking opened in early 2026 (status unresolved as of this pass)
- **Jurisdiction:** United States, federal, subscription/recurring-charge
  commerce
- **Intended vertical/domain:** Checkout/conversion, HERO/commerce
- **Type:** regulation (contested/unsettled status)
- **Why relevant:** Directly on-point for any future subscription/
  recurring-charge product, but its regulatory status is actively
  unresolved — an important limitation to record, not a reason to exclude
  it.
- **What it does not establish:** A currently binding, stable rule (the
  2024 version was vacated); does not establish any current TMI/HERO
  subscription mechanism — none exists.
- **Limitations/conflicts:** Regulatory status is in flux; underlying
  ROSCA statute and the original 16 CFR Part 425 rule reportedly remain in
  force per the same search results — this distinction needs direct legal
  confirmation before any reliance.
- **Authoritative / informative / contextual:** Authoritative for the
  underlying policy direction; contextual for the specific currently-
  enforceable rule text given the unresolved status.
- **Required expert review:** Consumer-protection legal review, mandatory,
  with explicit re-verification of current rule status.
- **Internal adoption recommendation:** Insufficient information (status
  actively changing) — reject for now as a citable "current rule," retain
  as a watch item.
- **Proposed implementation controls:** None — not applicable today.
- **Proposed public wording:** Not applicable.
- **Owner decision:** Pending.
- **Revalidation:** Re-check at time of any future subscription-product
  consideration, given unresolved regulatory status.
- **Crosswalk — applicable internal control:** disclosure/cancellation
  design principles, if any future subscription product is built.
- **Crosswalk — evidence needed before adoption:** current, confirmed legal
  status of the rule at time of use.
- **Crosswalk — implementation prerequisites:** no subscription product
  exists.
- **Crosswalk — public-claim boundary:** no cancellation-ease or
  compliance claim ever, without a real product and current legal
  confirmation.
- **Crosswalk — release blocker:** no subscription product exists; this
  pass does not create one.
- **Crosswalk — risk level:** High (future only).
- **Crosswalk — owner approval requirement:** required before any
  subscription product is even scoped.

---

## MK16-SRC-10 — NSCA Codes, Policies, and Procedures

- **Publisher/authority:** National Strength and Conditioning Association
- **URL:** https://www.nsca.com/about-us/about-us/governance/nsca-codes-policies-and-procedures/
- **Publication/revision date:** Adopted by NSCA Board resolution
  2017-10-27
- **Jurisdiction:** US-based professional association, internationally
  referenced
- **Intended vertical/domain:** Performance — scope-of-practice boundary
  ONLY
- **Type:** professional guideline
- **Why relevant:** Establishes what distinguishes general strength/
  conditioning education from supervised coaching — directly useful for
  drawing the Performance-domain boundary this framework requires, without
  touching any actual training content.
- **What it does not establish:** Any TMI credential, coaching
  relationship, or program; consulted for boundary purposes only, per this
  pass's explicit restriction against developing training protocols.
- **Limitations/conflicts:** None known for its stated governance purpose.
- **Authoritative / informative / contextual:** Authoritative for scope-
  of-practice/ethics purposes.
- **Required expert review:** Credentialed strength/conditioning
  professional, mandatory for any public Performance content regardless of
  this source.
- **Internal adoption recommendation:** Hold for review (boundary-drawing
  purpose only).
- **Proposed implementation controls:** Candidate basis for an internal
  "education vs. coaching" scope statement.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual.
- **Crosswalk — applicable internal control:** scope-of-practice boundary
  statement distinguishing TMI Performance's educational content from
  supervised coaching or clinical care.
- **Crosswalk — evidence needed before adoption:** none required to state
  the boundary internally; a verified credential would be required before
  any coaching claim.
- **Crosswalk — implementation prerequisites:** no scope-of-practice
  document exists today.
- **Crosswalk — public-claim boundary:** no coaching-availability,
  credential, or outcome claim without verified evidence.
- **Crosswalk — release blocker:** no scope-of-practice document, no
  verified coach credential.
- **Crosswalk — risk level:** High.
- **Crosswalk — owner approval requirement:** required before Performance
  publishes anything beyond the current generic stub.

---

## MK16-SRC-11 — FTC Health Products Compliance Guidance

- **Publisher/authority:** Federal Trade Commission
- **URL:** https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance
- **Publication/revision date:** 2022-12 (first revision to this guidance
  in nearly 25 years, per FTC's own announcement)
- **Jurisdiction:** United States, federal, advertising-substantiation law
- **Intended vertical/domain:** Health — restricted domain, BOUNDARY ONLY
- **Type:** official guidance
- **Why relevant:** Documents exactly how rigorous the legal substantiation
  standard is for any health-adjacent claim — used exclusively to
  strengthen this framework's prohibition, never to inform any actual
  health content.
- **What it does not establish:** Any TMI health claim, product, or
  service; none exists and this source does not authorize one.
- **Limitations/conflicts:** None for its stated boundary-reinforcement
  purpose; **explicitly not consulted for any substantive health-claim
  content**, per this pass's restriction.
- **Authoritative / informative / contextual:** Authoritative.
- **Required expert review:** Licensed clinical professional AND legal
  review, mandatory for any public Health content, regardless of this
  source.
- **Internal adoption recommendation:** Hold for review — boundary-
  reinforcement purpose only.
- **Proposed implementation controls:** Candidate basis for an internal
  "no health claim without X" checklist.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending — not applicable until the domain is
  formally opened by the owner.
- **Revalidation:** Annual, or immediately upon any FTC guidance update.
- **Crosswalk — applicable internal control:** claims-substantiation gate
  for any future Health-adjacent content.
- **Crosswalk — evidence needed before adoption:** not applicable — no
  health content is being adopted; this strengthens a prohibition, not a
  capability.
- **Crosswalk — implementation prerequisites:** an editorial-review process
  and named credentialed reviewer, neither of which exists.
- **Crosswalk — public-claim boundary:** absolute — no diagnosis,
  treatment, clinical-service, supplement, recovery, or therapeutic
  representation, ever, without specialist and legal review.
- **Crosswalk — release blocker:** no editorial-review process, no named
  reviewer, no legal review has occurred.
- **Crosswalk — risk level:** Highest — restricted domain.
- **Crosswalk — owner approval requirement:** foundational — whether to
  open this domain at all is an owner decision this document does not
  make.

---

## MK16-SRC-12 — SAA Core Values Statement and Code of Ethics for Archivists

- **Publisher/authority:** Society of American Archivists
- **URL:** https://www2.archivists.org/statements/saa-core-values-statement-and-code-of-ethics
- **Publication/revision date:** Revised 2020-08
- **Jurisdiction:** US-based professional association, archival-profession-
  wide
- **Intended vertical/domain:** Reparations — citation/archival-ethics
  BOUNDARY ONLY
- **Type:** professional guideline / editorial code
- **Why relevant:** Establishes the citation, custody, and accountability
  standard a rigorous historical-research process should follow — used to
  strengthen the restricted-domain requirement that any future claim be
  sourced and correctable, never to inform any actual historical or
  political content.
- **What it does not establish:** Any TMI historical claim, archival
  holding, or research finding; no research into any specific historical
  or political subject occurred in this pass.
- **Limitations/conflicts:** None for its stated boundary-reinforcement
  purpose; **explicitly not consulted for any substantive historical or
  political content**, per this pass's restriction.
- **Authoritative / informative / contextual:** Authoritative for
  professional-ethics purposes.
- **Required expert review:** Legal review AND a named archival/subject-
  matter reviewer, mandatory for any public Reparations content, regardless
  of this source.
- **Internal adoption recommendation:** Hold for review — boundary-
  reinforcement purpose only.
- **Proposed implementation controls:** Candidate basis for an internal
  citation/corrections-process document.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual, or immediately upon any new claim under
  consideration.
- **Crosswalk — applicable internal control:** citation and corrections-
  process standard for any future Reparations editorial content.
- **Crosswalk — evidence needed before adoption:** not applicable — this
  strengthens a governance boundary, not a content capability.
- **Crosswalk — implementation prerequisites:** no citation standard or
  named reviewer exists today, beyond the one existing approved blurb.
- **Crosswalk — public-claim boundary:** no historical or political claim
  without a cited source and legal review; no claim presented as settled
  fact.
- **Crosswalk — release blocker:** no citation standard exists; no legal
  review beyond what already gated the one existing blurb.
- **Crosswalk — risk level:** High — restricted-adjacent domain (legal/
  political/research risk).
- **Crosswalk — owner approval requirement:** required before any new
  Reparations content beyond the existing approved blurb.

---

## MK16-SRC-13 — ADA.gov accessibility guidance / U.S. Access Board standards

- **Publisher/authority:** U.S. Department of Justice (ADA.gov) / U.S.
  Access Board
- **URL:** https://www.ada.gov/resources/
- **Publication/revision date:** Ongoing official government resource
- **Jurisdiction:** United States, federal, applies to places of public
  accommodation and covered facilities
- **Intended vertical/domain:** Social/Gather — event accessibility;
  Speaking — venue/accommodation boundary
- **Type:** law/regulation, official guidance
- **Why relevant:** Primary US source for physical/event accessibility,
  distinct from and complementary to the web-accessibility sources above.
- **What it does not establish:** That any TMI event or venue currently
  exists or has been assessed; Social/Gather has no defined operations
  today.
- **Limitations/conflicts:** Does not cover event-specific safety/
  insurance/moderation topics, which require separate review.
- **Authoritative / informative / contextual:** Authoritative.
- **Required expert review:** Legal/ADA-compliance review before any real
  event is planned.
- **Internal adoption recommendation:** Hold for review.
- **Proposed implementation controls:** Candidate basis for a future
  event-accessibility checklist.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual.
- **Crosswalk — applicable internal control:** venue/accommodation
  accessibility checklist for any future Social/Gather event or Speaking
  engagement.
- **Crosswalk — evidence needed before adoption:** none required
  internally; a real venue assessment needed before any real event.
- **Crosswalk — implementation prerequisites:** Social/Gather's own
  "prerequisite purpose" is still undefined per existing documentation — no
  event-accessibility process can be meaningfully built before that closes.
- **Crosswalk — public-claim boundary:** no event, accommodation, or
  accessibility promise until real operations exist.
- **Crosswalk — release blocker:** no event or venue exists to assess.
- **Crosswalk — risk level:** High (event/safety once real operations
  exist).
- **Crosswalk — owner approval requirement:** required before any real
  event is planned.

---

## MK16-SRC-14 — ISO 20700:2017 Guidelines for management consultancy services

- **Publisher/authority:** ISO / ICMCI
- **URL:** https://www.iso.org/standard/63501.html
- **Publication/revision date:** 2017-06-01
- **Jurisdiction:** International, consultancy-services-neutral
- **Intended vertical/domain:** Consulting — delivery governance
- **Type:** standards body
- **Why relevant:** The primary international standard specifically for
  management-consultancy service delivery — directly on-point for TMI
  Consulting's future engagement-governance design.
- **What it does not establish:** Any TMI Consulting certification or
  ISO-conformant process; TMI has not been assessed against this standard.
- **Limitations/conflicts:** Full standard text is a paid ISO purchase;
  only the publicly available scope/summary was consulted here — no
  substantial copyrighted text reproduced.
- **Authoritative / informative / contextual:** Authoritative for its
  publicly described scope.
- **Required expert review:** None mandatory at the internal best-practice
  tier; legal review recommended before any client-facing process language
  is finalized publicly.
- **Internal adoption recommendation:** Hold for review.
- **Proposed implementation controls:** Candidate basis for a future
  engagement-scope/responsibility-boundary document.
- **Proposed public wording:** Prohibited by default.
- **Owner decision:** Pending.
- **Revalidation:** Annual.
- **Crosswalk — applicable internal control:** engagement-scope and
  responsibility-division documentation for future Consulting work.
- **Crosswalk — evidence needed before adoption:** a completed engagement-
  intake process design, informed by (not copied from) the standard's
  publicly described scope.
- **Crosswalk — implementation prerequisites:** no engagement-intake
  process exists today.
- **Crosswalk — public-claim boundary:** no "ISO 20700" or certification
  claim ever, without an actual formal assessment (which this framework
  does not pursue).
- **Crosswalk — release blocker:** no engagement-intake process, no
  case-study candidate has cleared the proof registry.
- **Crosswalk — risk level:** Medium.
- **Crosswalk — owner approval requirement:** required before any
  Consulting capability statement referencing process rigor becomes
  public.
