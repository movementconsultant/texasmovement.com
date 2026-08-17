# Mark 7 Founder Evidence Intake Workspace

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

This is a blank workspace for the owner to fill in — not a claims-approval record, not a public
page, not imported into the site build in any way (see "Non-rendered confirmation" below). Every
field below is currently empty. **Filling a field in this document does not by itself make
anything verified, approved for public use, or active.** See
`docs/internal/mark-7-evidence-submission-guide.md` for how a filled field moves toward
`docs/mark-5-tmi-content-model-and-proof-registry.json` (the governance schema) and
`docs/mark-5-route-completion-specification.json` (the route gates this evidence unblocks).

Companion machine-readable file: `docs/internal/mark-7-founder-evidence-intake.json` (same 54
fields, structured, with the full 19-property schema per field: vertical/route association,
evidence ID reference, field label, field purpose, evidence type expected, required/optional,
owner decision, verification status, evidence source location, allowed/prohibited wording,
reviewer, review date, expiration date, notes).

**No name, number, date, client, outcome, credential, product fact, health assertion, legal
assertion, performance result, or media statistic has been invented anywhere in this document.**

---

## Non-rendered confirmation

- `docs/internal/` is outside `src/` entirely.
- This repository has **no content-collection directory** (`src/content/` does not exist).
- Astro's build only ever scans `src/pages/**` for routes — `docs/` is never read by `astro build`.
- `src/pages/sitemap.xml.ts` and `src/pages/robots.txt.ts` both use hard-coded route arrays, not a
  directory scan — nothing under `docs/` can leak into either file.
- `grep -r "docs/internal"` across `src/` returns zero matches — nothing imports this directory.

---

## Section A — TMI umbrella identity

*Feeds: `/about`, `/ecosystem`*

| # | Field | Owner input |
|---|---|---|
| A-01 | Approved working one-sentence description of TMI | _____ |
| A-02 | Approved category-level areas of focus | _____ |
| A-03 | What TMI is not | _____ |
| A-04 | Three operating principles | 1) _____ 2) _____ 3) _____ |
| A-05 | Ecosystem hierarchy and vertical names | _____ |
| A-06 | Which verticals may be emphasized publicly at the Building stage | _____ |
| A-07 | Which verticals must remain private/incubating | Default: Health, FounderLink, Social/Gather, Reparations (unchanged unless revised here) |
| A-08 | Required legal/entity/name review, if any | _____ |
| A-09 | **Section A overall owner decision** | ☐ approve ☐ revise ☐ defer ☐ do not publish |

---

## Section B — Consulting evidence and service definition

*Feeds: `/consulting`* · **No service becomes active from this intake alone.**

| # | Field | Owner input |
|---|---|---|
| B-01 | Intended buyer categories | _____ |
| B-02 | Problems the owner is prepared to solve | _____ |

**Future service concepts** — for each, capture: scope, deliverables, exclusions, delivery format,
evidence available, claims allowed, claims prohibited, pricing decision status, intake status,
legal/contract needs, owner approval state (full template in the JSON companion):

| # | Concept | Status |
|---|---|---|
| B-03 | Ecosystem audit | Not started |
| B-04 | Digital architecture | Not started |
| B-05 | AI/workflow strategy | Not started |
| B-06 | Automation | Not started |
| B-07 | Content systems | Not started |
| B-08 | Advisory | Not started |
| B-09 | Implementation guidance | Not started |

| # | Field | Owner input |
|---|---|---|
| B-10 | **Case-study candidate template** (client anonymity level, permission status, factual source, problem, delivered work, evidence artifact, permitted wording, prohibited wording, metric evidence, public-use approval — duplicate per candidate) | _____ |

---

## Section C — Media authority and programming evidence

*Feeds: `/media`*

> **Prohibition:** self-reported view counts, subscriber counts, reach, press mentions, or audience
> data of any kind must not be used anywhere until independently evidenced and owner-approved —
> including the previously-flagged 2.1M+ views figure, which remains founder-reported and
> unverified.

| # | Field | Owner input |
|---|---|---|
| C-01 | Official account/channel URL placeholders (one row per platform) | _____ |
| C-02 | Account ownership confirmation | _____ |
| C-03 | **Metric candidate template** (platform, metric, timeframe, source location, verification date, permitted wording, owner approval) | _____ |
| C-04 | **Planned programming series template** (working title, purpose, audience, format, source material, production requirements, current state, public wording permission) | _____ |
| C-05 | **Existing content asset inventory template** (title, platform, date, rights/ownership, performance evidence, reusable clip rights, public-link approval) | _____ |
| C-06 | **Press/media claim candidate template** | _____ |

---

## Section D — Performance scope and boundary evidence

*Feeds: `/performance`*

| # | Field | Owner input |
|---|---|---|
| D-01 | Approved non-clinical mission | _____ |
| D-02 | Permitted educational topics | _____ |
| D-03 | Prohibited medical/therapeutic/rehabilitation/diagnosis/prevention/supplement claims | **Standing rule, not an owner field** — see `DISCLAIMERS.performance` in `packages/constants/src/org.ts` |
| D-04 | Intended future formats (education / training philosophy / programming framework / coaching / events / other) | _____ |
| D-05 | **Credential/experience claim template** (exact wording, source, date, verification evidence, permitted route, owner decision) | _____ |
| D-06 | Required legal, insurance, waiver, safety, and operational review — **must close before any coaching/event pathway is discussed publicly** | ☐ waiver drafted ☐ insurance confirmed ☐ scope-of-practice disclaimer applied ☐ intake-screening defined ☐ safety-incident protocol defined |

---

## Section E — HERO boundary and storefront audit authorization

*Feeds: `/hero`*

> **Standing rule, unchanged since Mark 2:** no HERO route advancement of any kind without the
> documented full storefront audit (all five Mark 2 audit-evidence items) **and** explicit owner
> approval. This section only collects the inputs that audit would need — it does not perform the
> audit and does not change `/hero`.

| # | Field | Owner input |
|---|---|---|
| E-01 | Authoritative storefront URL placeholder | _____ |
| E-02 | Storefront owner/control confirmation | _____ |
| E-03 | Product category inventory | _____ |
| E-04 | Catalog/checkout/fulfillment/support/policy audit authorization | ☐ authorized ☐ not authorized |
| E-05 | Product claim source and evidence location | _____ |
| E-06 | Allowed future TMI bridge wording (unusable until audit + approval both complete) | _____ |
| E-07 | Prohibited TMI bridge wording | **Standing list:** product listing, photography implying availability, pricing, inventory, shopping/cart CTA, checkout, support promises, product health/performance claims, external storefront link |
| E-08 | **Section E overall owner decision** | ☐ retain inert context (default) ☐ audit for limited bridge ☐ remove TMI reference |

---

## Section F — Distribution and Partners

*Feeds: `/distribution`, `/partners`*

> **Prohibition:** no public solicitation or responsiveness claim (e.g. "we respond within X") may
> be added anywhere absent explicit operational approval.

| # | Field | Owner input |
|---|---|---|
| F-01 | Distribution capability concepts and scope | _____ |
| F-02 | Distribution evidence and prohibited claims | _____ |
| F-03 | Partnership categories and definitions (confirm/edit: advisory, editorial/media, sponsorship, structural) | _____ |
| F-04 | Partner-fit criteria | _____ |
| F-05 | Future response-owner and routing decision | _____ |
| F-06 | Intake posture | ☐ inactive (default) ☐ future email ☐ future form ☐ future referral only ☐ do not offer |
| F-07 | **Partner name/logo/reference candidate template** (written permission, evidence, allowed wording, route, owner decision — duplicate per candidate) | _____ |

---

## Section G — Infrastructure and release evidence

*Pointer checklist only — see `docs/mark-5-owner-evidence-request-packet.md` section 8 for full
detail. This section does not authorize any infrastructure change.*

| # | Item |
|---|---|
| G-01 | ☐ Cloudflare Pages project verification |
| G-02 | ☐ Custom-domain identity/binding |
| G-03 | ☐ DNS and registrar control |
| G-04 | ☐ GitHub Pages/CNAME conflict resolution (`public/CNAME` remains unmodified) |
| G-05 | ☐ Preview and rendered-output review |
| G-06 | ☐ Analytics/tracking confirmation (none currently implemented or requested) |
| G-07 | ☐ Planned Google Workspace ownership/routing |
| G-08 | ☐ Release authorization — a clear "yes" or "not yet," separate from every item above |

---

## Validation performed this pass

- `docs/internal/mark-7-founder-evidence-intake.json` parsed successfully with
  `node -e "JSON.parse(...)"` — confirmed 54 fields across 7 sections (A:9, B:10, C:6, D:6, E:8,
  F:7, G:8).
- No name, number, date, client, outcome, credential, product fact, health assertion, legal
  assertion, performance result, or media statistic was invented anywhere in either file.
- This document was searched for: `live`, `verified`, `approved`, `ready`, `operational`, `active`,
  `service`, `client`, `medical`, `legal`, `results`, `guarantee`, `available`. Every occurrence is
  template language, a conditional/future state, a standing prohibition, or an explicitly gated
  field name — none asserts a current active claim.
- `git diff` for this change is limited to the four new `docs/internal/` files — no source, route,
  component, metadata, navigation, sitemap, robots, test, package, or infrastructure file changed.
