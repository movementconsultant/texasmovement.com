# Mark 16 — Current Best-Practice Source Register

**Documentation-only pass. Tier 2 and Tier 3 research only** (per the
four-tier hierarchy in `docs/mark-15-external-standards-adoption-framework.md`).
No route, component, content collection, schema, navigation, metadata,
structured data, test, dependency, lockfile, build config, or infrastructure
file changed. Nothing here is imported by source code, rendered as a route,
or reachable from the public site.

**Standard guardrail statement** (repeated per the Mark 16 brief, Part E —
applies to every source and every finding in this document and its
companions):

> An external source may inform an internal TMI operating baseline. It does
> not establish that TMI is certified, compliant, evidence-based, safe,
> effective, qualified, operational, or authorized, and it does not
> authorize public claims, service activation, health guidance, legal
> guidance, commerce, checkout, community operations, or product launch.

Companion machine-readable file:
`docs/mark-16-current-best-practice-source-register.json`. Internal-only
companions: `docs/internal/mark-16-source-review-cards.md` (full per-source
review, one card per source, using the Mark 15 template structure),
`docs/internal/mark-16-tmi-internal-baseline-roadmap.md` (phased P0–P3
internal roadmap), `docs/internal/mark-16-restricted-domain-boundary-addendum.md`
(Health/therapy/tensegrity/reparations boundary detail).

## Research method note

All 14 sources below were located and characterized via web search against
official/primary domains (`.gov`, the issuing standards body's own site, or
the official standards-body mirror). Direct page-content verification via
automated fetch was attempted for two sources (NIST SP 800-63, W3C WCAG) and
blocked by this sandbox's network egress policy — dates and status below
rely on search-result excerpts from the issuing body's own pages, cross-
checked across multiple independent results where possible, and are flagged
individually where a single-source date could not be cross-checked. **Any
future internal adoption decision should re-verify the exact current
revision directly against the issuing body's site before relying on it** —
this register is a starting index, not a final citation.

No source below concerns a political candidate, election, litigation,
financial-recovery narrative, protected group, or public controversy. No
source describes a therapy, treatment, diagnosis, rehabilitation protocol,
tensegrity-based intervention, or athlete-health claim — the two sources
touching health and historical-research domains (rows 11 and 12 below) are
governance/claims-substantiation and archival-ethics sources only, used to
strengthen the *restricted-domain boundary*, never to inform any actual
health or historical content.

## Part A — Source register (summary)

| # | Source | Issuing body | Authority level | Date | TMI area |
|---|---|---|---|---|---|
| 1 | WCAG 2.2 | W3C (Web Accessibility Initiative) | Primary/standards body | Rec. 2023-10-05, updated 2024-12-12 | Accessibility (cross-ecosystem) |
| 2 | WCAG-EM 1.0 (evaluation methodology) | W3C | Primary/standards body | Group Note, 2014 | Accessibility (cross-ecosystem) |
| 3 | NIST Cybersecurity Framework 2.0 | NIST / U.S. Dept. of Commerce | Primary/official guidance | 2024-02-26 | Security (cross-ecosystem) |
| 4 | OWASP ASVS 5.0 | OWASP Foundation | Primary/standards body | 2025-05 | Security — apps/services |
| 5 | "Protecting Personal Information: A Guide for Business" | FTC | Primary/official guidance | current, undated point-in-time guidance page | Privacy — cross-ecosystem, Apps/services |
| 6 | NIST SP 800-63 Digital Identity Guidelines (Rev. 4) | NIST | Primary/official guidance | Rev. 4 in progress/published per NIST project page (see note above) | Apps/services — authentication |
| 7 | U.S. Copyright Office fair-use resources (Circular 1, Fair Use FAQ, Fair Use Index) | U.S. Copyright Office | Primary/official (law-adjacent) | ongoing, official government resource | Media — copyright/attribution |
| 8 | PCI DSS v4.0.1 | PCI Security Standards Council | Primary/standards body | 2024-06 | Checkout/conversion — payment security boundary |
| 9 | FTC Negative Option ("Click-to-Cancel") Rule and guidance | FTC | Primary/official (regulatory, contested status — see card) | Final rule 2024-10; vacated by appellate court 2025; new rulemaking opened 2026 | Checkout/conversion — subscription/cancellation transparency |
| 10 | NSCA Codes, Policies, and Procedures (Code of Ethics / scope-of-practice framework) | National Strength and Conditioning Association | Professional body | adopted 2017-10-27 | Performance — coaching scope boundary only |
| 11 | FTC Health Products Compliance Guidance | FTC | Primary/official guidance | 2022-12 | Health — claims-substantiation boundary only, governance-only use |
| 12 | SAA Core Values Statement and Code of Ethics for Archivists | Society of American Archivists | Professional body | revised 2020-08 | Reparations — citation/archival ethics boundary only |
| 13 | ADA.gov accessibility guidance + U.S. Access Board ADA standards | U.S. DOJ / U.S. Access Board | Primary/official (regulatory) | ongoing, official government resource | Social/Gather — event accessibility boundary |
| 14 | ISO 20700:2017 Guidelines for management consultancy services | ISO / ICMCI | Standards body | published 2017-06-01 | Consulting — delivery governance |

Full per-source detail (publisher, URL, jurisdiction, authority level,
internal purpose, control themes, what it does *not* establish, applicability
limits, required specialist review, adoption status, public-use status,
revalidation cadence, owner-decision status) is in
`docs/internal/mark-16-source-review-cards.md` — one full card per source,
using the exact field set specified in this pass's brief.

## Part B — Standards crosswalk (summary)

| TMI operating area | Mapped source(s) | Risk level | Public-claim boundary |
|---|---|---|---|
| Consulting | ISO 20700:2017 | Medium | Prohibited by default |
| Performance | NSCA Codes/Policies (scope boundary only) | High | Prohibited by default |
| Media | US Copyright Office fair-use resources | Medium | Prohibited by default |
| Distribution | US Copyright Office fair-use resources; PCI DSS (if any future paid distribution) | Medium | Prohibited by default |
| Health | FTC Health Products Compliance Guidance (boundary only) | Highest — restricted | Absolute prohibition pending specialist/legal review |
| Social/Gather | ADA.gov / U.S. Access Board | High (event/accessibility) | Prohibited by default |
| Reparations | SAA Core Values / Code of Ethics (boundary only) | High (legal/political/research) | Prohibited by default |
| HERO/commerce | PCI DSS v4.0.1; FTC Negative Option Rule/guidance | High (external, unaudited) | Prohibited by default, stricter — no assertion without authenticated audit |
| Speaking | ADA.gov accessibility guidance (venue/accommodation only) | Medium | Prohibited by default |
| Apps/services | NIST SP 800-63; OWASP ASVS 5.0; FTC privacy guidance | High | Prohibited by default |
| Checkout/conversion | PCI DSS v4.0.1; FTC Negative Option Rule/guidance | High | Not applicable — no activation |
| Cross-ecosystem technical governance | WCAG 2.2; WCAG-EM 1.0; NIST CSF 2.0; FTC privacy guidance | Varies by application | Prohibited by default |

Full per-mapping detail (applicable internal control, evidence needed before
adoption, implementation prerequisites, public-claim boundary, release
blocker, risk level, owner-approval requirement) is in
`docs/internal/mark-16-source-review-cards.md`, integrated into each
source's card under "Crosswalk mappings."

## Validation performed this pass

- `npm run typecheck` and `npm run test:unit` — see final report for exact
  results.
- All five Mark 16 files searched for: `compliant`, `certified`,
  `evidence-based`, `proven`, `safe`, `effective`, `therapy`, `treatment`,
  `medical`, `clinical`, `legal`, `political`, `guarantee`, `live`, `active`,
  `available`, `service`, `app`, `checkout`, `payment`, `public`,
  `authorized` — every occurrence is internal, conditional, prohibited,
  source-scoped, owner-review-gated, or explicitly non-assertive (see the
  final report for the annotated sweep).
- `git diff --stat` for this pass is limited to the five documentation files
  listed above — no other file changed.
- Non-rendered confirmation: same method as Mark 15 (grep across `src/` and
  `astro.config.mjs`; `docs/` is not a content-collection base path, not
  imported, not linked from any route, sitemap, or robots file).
