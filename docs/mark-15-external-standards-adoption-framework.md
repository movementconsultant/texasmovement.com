# Mark 15 — External Standards Adoption Framework and Evidence-Governance Architecture

**Documentation-only pass.** No route, component, content collection, schema,
navigation, metadata, structured data, test, dependency, lockfile, build
config, or infrastructure file changed. Nothing here is imported by source
code, rendered as a route, or reachable from the public site — see
"Non-rendered confirmation" at the end of this document.

Companion machine-readable file: `docs/mark-15-external-standards-adoption-framework.json`
(same structure, same content, for programmatic reference). Internal-only
companions: `docs/internal/mark-15-vertical-standards-evidence-matrix.md`,
`docs/internal/mark-15-standards-source-review-template.md`,
`docs/internal/mark-15-public-claims-boundary-guide.md`,
`docs/internal/mark-15-original-framework-graphic-brief.md`.

## Why this exists

TMI's ecosystem verticals span domains — consulting, athletic performance,
health, media, historical research, commerce, live events — where the
honest current state is: **no proprietary TMI research, no independently
verified outcome, and no owner-approved public proof exists yet for most of
them.** Where that's true, this framework says the internal *operating*
standard should default to a reviewed, dated, jurisdiction-checked industry
best-practice baseline — used to run things responsibly *internally* — while
the *public-facing* claim stays exactly where it already is: silent, or
explicitly conditional, until real evidence and an owner decision exist.

This is a governance scaffold, not a claims-approval action. It approves
nothing. It creates zero public claims, standards, or certifications. It
activates no vertical, form, checkout, or service.

## Part A — Standards-adoption policy hierarchy

Four tiers, in strict precedence order. A lower tier may inform internal
operating decisions; it may never substitute for a higher tier in anything
presented to the public.

### Tier 1 — Proprietary TMI evidence

Established **only** when the owner provides an actual artifact (a
completed engagement record, a measured result, a licensed methodology
document, a signed release) **and** that artifact passes governance review
(the existing proof-registry pattern from
`docs/mark-5-tmi-content-model-and-proof-registry.md`). Must never be
assumed, inferred, or backfilled from a general industry standard. If it
doesn't exist yet for a given claim, Tier 1 doesn't exist for that claim —
full stop.

### Tier 2 — Independently substantiated evidence

Third-party research, published standards, regulatory guidance, technical
documentation, or professional guidance, reviewed for **relevance, date,
authority, jurisdiction, limitations, and applicability** (see the
source-review template, Part C). May inform internal design/safety/quality
decisions. **Must never be presented as proprietary TMI evidence, TMI
research, or a TMI methodology** — if the site ever describes something
grounded in Tier 2 evidence, the wording must attribute the standard to its
actual source, not imply TMI originated it.

### Tier 3 — Industry best-practice baseline

Used internally as a starting point — a design, safety, operating,
accessibility, quality, or governance default — specifically *because*
Tier 1 and Tier 2 evidence are absent for a given domain. This is the
tier this framework exists to formalize. **Must never imply certification,
regulatory compliance, outcome assurance, or professional qualification.**
A best-practice baseline is an internal discipline, not a badge.

### Tier 4 — Owner decision and operational reality gate

No internal standard from any tier above becomes a public promise until
the actual team, process, systems, policies, staffing, insurance, legal
review, support capacity, privacy posture, and evidence are genuinely in
place — and the owner has explicitly decided to make the claim. This tier
is the hard stop between "we operate this way internally" and "we tell the
public we operate this way." It is never skipped.

### Required fields for every standard/adoption candidate

Every row entered into the vertical standards matrix (Part B / the internal
companion doc) must carry all of the following — no row may be added with
any field silently omitted:

1. Vertical
2. Operating domain
3. Internal decision purpose
4. Candidate source class
5. Source authority/jurisdiction
6. Publication/update date
7. Scope and applicability
8. Evidence quality
9. Known limitations
10. Required subject-matter review
11. Required legal/privacy/safety review
12. TMI implementation status — one of: `not reviewed` / `considering` /
    `internal reference` / `adopted internally` / `implementation evidenced`
    / `candidate for public-review` / `rejected` / `retired`
13. Public wording status — one of: `prohibited` / `internal-only` /
    `owner-review-required` / `not applicable`
14. Revalidation date
15. Owner decision
16. Explicit non-claim statement

As of this pass, **every candidate row in the internal matrix is `not
reviewed` with public wording status `prohibited`** — this framework
creates the structure; it does not populate it with adopted standards.

## Part B — Vertical standards matrix (summary)

Full 12-area detail — including risk level, required professional review,
release blockers, revalidation cadence, and public-surface classification
for each — lives in `docs/internal/mark-15-vertical-standards-evidence-matrix.md`.
Summary:

| # | Area | Risk level | Public-claim prohibition |
|---|---|---|---|
| 1 | Consulting | Medium | Prohibited by default |
| 2 | Performance (general education boundary) | High | Prohibited by default |
| 3 | Tensegrity / sprint technique / athlete therapy | **Highest — restricted domain** | Absolute prohibition pending specialist/legal review |
| 4 | Health | **Highest — restricted domain** | Absolute prohibition pending specialist/legal review |
| 5 | Media | Medium | Prohibited by default |
| 6 | Distribution | Medium | Prohibited by default |
| 7 | Social / Gather | High (event/safety) | Prohibited by default |
| 8 | Reparations | High (legal/political/research risk) | Prohibited by default |
| 9 | HERO / commerce | High (external, unaudited) | Prohibited by default |
| 10 | Speaking engagements | Medium | Prohibited by default |
| 11 | Apps and online services | High (privacy/security) | Prohibited by default |
| 12 | Checkout and conversion experience | High (payment/consent) | Not applicable — no activation in this or any pass to date |

## Part C — Source-review template (summary)

A reusable intake form for any future external standard, law, guideline, or
policy someone proposes referencing internally — full field list in
`docs/internal/mark-15-standards-source-review-template.md`. Every
completed template defaults its "proposed public wording" field to
**prohibited by default** and requires an explicit owner decision to move
off that default.

## Part D — Public claims boundary guide (summary)

Separates five categories of language — safe internal planning language,
potential future public language requiring approval, prohibited public
language without direct evidence, high-risk language requiring
specialist/legal/clinical review, and statements that must never be
inferred from "industry best practices" alone — with abstract boundary
examples (never promotional copy) across all 11 operating areas. Full
guide: `docs/internal/mark-15-public-claims-boundary-guide.md`.

## Part E — Original framework graphic brief (summary)

A text-only creative brief for one future, owner-approved original diagram
depicting the TMI ecosystem as an operating system (core, controlled lanes,
governed/incubation ring, founder layer, external commerce boundary,
evidence→governance→operations→public-surface underlay). **No image is
generated by this task; no image asset is added to this repository.** Full
brief: `docs/internal/mark-15-original-framework-graphic-brief.md`.

## Non-rendered confirmation

- `docs/` (including `docs/internal/`) is not imported by any file under
  `src/`, is not a content-collection `base` path in `src/content.config.ts`
  (which points only at `./src/content/media` and `./src/content/verticals`),
  is not referenced by `astro.config.mjs`, and is not part of the sitemap,
  robots, or structured-data generation. Confirmed by grep across `src/` and
  `astro.config.mjs` before writing this pass's files — every existing
  `docs/...` reference in source code is a plain-text code comment or a
  literal `<code>docs/FILENAME.md</code>` string already present in public
  copy from earlier marks (e.g. `docs/LAUNCH_BLOCKERS.md` referenced in
  `accessibility.astro`/`terms.astro`/`privacy.astro`), never an import,
  fetch, or route.
- These six Mark 15 files follow that exact same pre-existing, safe pattern.

## Validation performed this pass

- `npm run typecheck` — see final report for exact result.
- `npm run test:unit` — see final report for exact result.
- All six new files searched for: `compliant`, `certified`, `evidence-based`,
  `proven`, `safe`, `effective`, `therapeutic`, `treatment`, `medical`,
  `clinical`, `legal`, `guaranteed`, `best practice`, `live`, `operational`,
  `available`, `checkout`, `payment`, `speaking`, `app`, `service`, `public`
  — every occurrence is internal, conditional, prohibited, evidence-gated,
  or owner-review language (see the final report for the annotated sweep).
- `git diff --stat` for this pass is limited to the six documentation files
  listed at the top of this document — no other file changed.
