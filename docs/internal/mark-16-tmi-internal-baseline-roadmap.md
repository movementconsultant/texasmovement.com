# Mark 16 (internal) — TMI Internal Baseline Roadmap

Internal-only. Not rendered, not imported, not linked from any public route.
A phased, private roadmap of the internal *controls* (not public claims)
that should exist before each category of future activation is even
considered. **Nothing in this roadmap is authorized to be implemented by
this pass** — it is a planning document, sequencing future work against the
sources in `docs/mark-16-current-best-practice-source-register.md`.

**Guardrail statement** (applies throughout):

> An external source may inform an internal TMI operating baseline. It does
> not establish that TMI is certified, compliant, evidence-based, safe,
> effective, qualified, operational, or authorized, and it does not
> authorize public claims, service activation, health guidance, legal
> guidance, commerce, checkout, community operations, or product launch.

---

## P0 — Before collecting personal data, enabling contact, or activating any checkout/account/service

The most foundational tier — nothing in P1–P3 should proceed before P0's
items exist, because every later tier involves some form of data handling.

- **Privacy/data mapping.** A documented data-flow map (what's collected,
  where it goes, how long it's retained) for the existing, undeployed
  contact-intake Worker (`workers/contact-intake/`) before
  `PUBLIC_CONTACT_ENDPOINT` is ever set to a real value. Informed by
  MK16-SRC-05 (FTC business privacy guidance).
- **Security/least privilege.** An internal risk assessment for the Worker,
  organized against MK16-SRC-03's (NIST CSF 2.0) six functions, plus a
  targeted review against MK16-SRC-04 (OWASP ASVS 5.0) for the specific
  code that exists today.
- **Accessibility baseline.** A completed internal accessibility evaluation
  (informed by MK16-SRC-01/WCAG 2.2 and MK16-SRC-02/WCAG-EM) covering the
  `/contact` form specifically, beyond the existing automated axe-core
  coverage.
- **Data retention.** An explicit retention policy for any data the
  contact-intake Worker would handle once live (currently undefined,
  because the Worker is undeployed).
- **Incident/response ownership.** A named person or process responsible
  for security-incident response, once any real data collection begins —
  none is named today.
- **Owner approvals required:** deploying the Worker; setting
  `PUBLIC_CONTACT_ENDPOINT`; provisioning the `RATE_LIMIT_KV` namespace
  (currently unbound, fails open by documented design) — see
  `docs/mark-18-contact-intake-implementation.md`.

## P1 — Before a Consulting spearhead or media item can become publicly actionable

- **Scope/exclusion documentation.** An engagement-scope and responsibility-
  boundary document for Consulting, informed by MK16-SRC-14 (ISO 20700).
- **Rights/attribution process.** An editorial rights-review checklist for
  TMM content, informed by MK16-SRC-07 (US Copyright Office fair-use
  resources) — builds on the existing source-verification checklist
  (`docs/mark-8-tmm-source-verification-checklist.md`).
- **Evidence review.** Any case-study or capability-statement candidate
  must clear the existing proof registry
  (`docs/mark-5-tmi-content-model-and-proof-registry.md`) before it can be
  considered for public release — unchanged by this pass, reaffirmed here.
- **Accessibility artifact review.** A completed internal accessibility
  check specific to whatever route or content is being made actionable.
- **Client/owner operational readiness.** Confirmation that an actual
  engagement-intake process (not just a document) is being followed before
  any Consulting capability claim goes public.

## P2 — Before community/events, speaking, performance education, or commerce expansion

- **Insurance/legal review.** Mandatory before any real in-person event
  (Social/Gather), speaking engagement, or supervised Performance activity
  — informed by MK16-SRC-13 (ADA.gov/Access Board) for accessibility and by
  general legal review for liability/insurance, neither of which this
  framework can substitute for.
- **Operations/staffing.** A named event organizer, moderation-policy
  owner, or coaching-credential holder, none of which currently exist for
  Social/Gather or Performance.
- **Accessibility.** Event-specific accessibility planning (distinct from
  web accessibility) per MK16-SRC-13.
- **Policies.** A moderation policy (Social/Gather), a scope-of-practice
  statement (Performance, informed by MK16-SRC-10/NSCA boundary-only),
  and a rights-management checklist (Distribution/commerce expansion,
  informed by MK16-SRC-07/08).
- **Safety/escalation.** An emergency-escalation procedure for any
  supervised Performance activity or in-person event.
- **Contract/rights process.** A booking-agreement template (Speaking) and
  a recording/release-rights policy, neither of which currently exists.

## P3 — Restricted domains

Health, therapy, tensegrity, reparations, athlete recovery/injury, and
financial/legal evidence systems. **This tier has no implementation
sequence** — that would imply a path to public release, which this
document does not authorize. Instead:

- **Health and therapy:** requires licensed clinical professional review
  **and** legal review before any single public sentence, per
  `docs/internal/mark-15-vertical-standards-evidence-matrix.md` item 4 and
  the dedicated addendum in
  `docs/internal/mark-16-restricted-domain-boundary-addendum.md`.
- **Tensegrity and sprint/performance claims beyond general education:**
  requires credential, licensure, insurance, scope-of-practice, referral,
  emergency, consent, and jurisdiction review, per matrix item 3 and the
  addendum.
- **Reparations/legal-political research:** requires legal review and a
  named archival/subject-matter reviewer for any claim beyond the one
  existing approved blurb, per matrix item 8 and the addendum.
- **Athlete injury/recovery and therapeutic language:** falls under the
  same restriction as Health and therapy above — no separate, lighter path
  exists.
- **Financial/legal evidence systems:** not currently a defined TMI
  vertical; if it ever becomes one, it would require the same legal-review
  gate as Reparations, at minimum.

**No public release path is authorized by this document for any P3 item.**
Opening any P3 domain at all is a foundational owner decision this roadmap
does not make — see the dedicated addendum for full detail.

---

## Sequencing note

P0 is a prerequisite for everything else because it's the only tier that
applies regardless of which vertical activates first — data handling is
common to Consulting intake, Social/Gather registration, Speaking booking,
and any future commerce checkout alike. P1–P3 are not strictly sequential
after that; they represent independent domains that can be worked in
parallel once P0 closes, except that P3 items never proceed past the
governance-boundary stage without their own specialist/legal gates,
regardless of P0/P1/P2 status elsewhere.
