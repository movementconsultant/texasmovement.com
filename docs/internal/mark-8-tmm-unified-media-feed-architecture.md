# Mark 8 TMM Unified Media Feed Architecture

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT. NOT AN ACTIVE FEED.**

Planning/data-architecture document only. No feed, embed, API, RSS connection, external link, or
account verification exists anywhere in this repository as a result of this file. Every schema
field below is unpopulated; every enum is a controlled vocabulary, not a real value.

Companion machine-readable file: `docs/internal/mark-8-tmm-unified-media-feed-architecture.json`
(same content, structured — the full 63-field schema, the 9-row attribution matrix, all 4 feed
modes, and all 8 editorial gates). Companion documents:
`docs/internal/mark-8-tmm-media-item-intake-template.md` (Part E),
`docs/internal/mark-8-tmm-media-governance-and-approval-queue.md` (Part F),
`docs/internal/mark-8-tmm-source-verification-checklist.md` (Part G).

---

## "AVM" — no source-backed definition exists

`grep -rn "AVM"` across this entire repository returned **zero matches** this pass. No expansion,
ownership statement, or definition of "AVM" exists in any file. Per the Mark 8 brief's explicit
instruction, this document and every companion use only the neutral label
**"AVM / founder media — owner definition required"** wherever the concept appears. This is an
open ambiguity requiring owner definition — see the final report.

## Known media outlets — internal planning inventory, unverified

Exactly as supplied in the task brief, and not treated as verified, active, owned, or approved for
public display:

- **YouTube:** tmm, tmp, hero, tmipresident
- **Substack:** texasmovement
- **LinkedIn:** all (founder and company profiles)
- **Instagram:** alexanderofnazareth, herofootwearusa, tmmediausa
- **TikTok:** alexandervmathai, herofootwear, texasmovementmedia

`packages/constants/src/social.ts` (read this pass, not edited) already lists several overlapping
handles as unverified constants — none renders publicly today because `src/lib/site.ts`'s existing
`isHeldPendingConfirmation()`/`liveSocialAccounts()` filters hold every one back pending explicit
owner confirmation. That overlap is corroborating context, not verification. The intake template
(Part E) explicitly asks the owner to name any account not on this list.

---

## Part A — Unified feed model (schema only, nothing instantiated)

A future media-item schema across five field groups, 63 fields total. Full type/enum detail is in
the JSON companion → `partA_unifiedFeedModel.fieldGroups`. ID convention: `TMM-MEDIA-#####`,
assigned only when a real intake begins — none has been assigned.

| Group | Fields | Key controlled vocabularies |
|---|---|---|
| **Identity** | 12 | `sourceOrganization`: TMI / TMM / AVM-founder-media-owner-definition-required / approved-vertical / third-party-with-permission · `mediaType`: video / short-video / article / image-set / audio / podcast / livestream / newsletter / interview / event-record / announcement / other |
| **Source verification** | 14 | `sourceAccountOwnershipStatus` defaults to *not independently verified* · `sourceUrlVerificationStatus` defaults to *absent* |
| **Editorial governance** | 11 | `editorialStatus`: draft → owner-submitted → source-verified → rights-cleared → editorial-review → approved-for-TMM-index (or rejected/deferred/archived) |
| **Public-display controls** | 12 | `publicUseStatus` defaults to *internal-only* · fixed cross-attribution prohibition (see below) |
| **Operational/technical controls** | 11 | `plannedIngestionMethod` defaults to *manual internal registry* |

**Fixed cross-attribution rule (not a default, a standing prohibition):** *"No item may be
displayed, labeled, or implied as TMI, TMM, and/or AVM/founder media simultaneously without a
separate, explicit, per-item cross-attribution approval recorded here. Default assumption for
every new item: single-source attribution only."*

---

## Part B — Source separation and attribution policy

Five mandatory distinctions, none collapsible into another:

1. **TMI media** — owned or explicitly authorized by Texas Movement International itself.
2. **TMM media** — a *governance state* (approved for the TMM feed), not an automatic consequence
   of who produced something.
3. **AVM / founder media — owner definition required** — NOT automatically TMI or TMM content.
4. **External/guest/partner media** — must have a source URL, rights basis, attribution, and
   explicit editorial approval, no exceptions.
5. **Vertical media** — may not appear in TMM merely because a vertical is named in TMI strategy.

### Attribution decision matrix (9 classifications)

Full field-by-field detail in the JSON companion →
`partB_sourceSeparationAndAttributionPolicy.attributionDecisionMatrix`. Summary:

| Classification | In future feed? | External link? | Embed? | Boundary note? |
|---|---|---|---|---|
| Source-owned and TMM-approved | Yes | If verified | Only after Mode 3 prerequisites | No |
| Founder-owned and TMM-approved | Yes | If verified | Only after Mode 3 prerequisites | **Yes** |
| Founder-owned but not TMM-approved | **No** | No | No | Yes |
| Third-party owned with permission | Yes | If verified + permission documented | Within permitted scope only | Yes |
| Third-party referenced only | Citation only | If verified | **No** | Yes |
| Unverified source | **No** | No | No | Yes |
| Rights unclear | **No** | No | No | Yes |
| Sensitive/regulated subject matter | Only after heavier legal review | Same gate | Same gate | Yes |
| Archived/takedown-required | **No** | No | No | Yes |

Every "Yes" above still requires the item to independently clear gates G-M1–G-M8 (Part D) — the
matrix states *eligibility*, not automatic clearance.

---

## Part C — Future feed modes (none implemented)

| Mode | Recommended first? | Authorized in this task? |
|---|---|---|
| 1. Manual editorial index | **Yes** | No — planning only |
| 2. Approved platform-link index | No | No |
| 3. Approved embed mode | No | No |
| 4. API/RSS ingestion mode | No — last-stage only | No |

**Why manual editorial index is recommended first:** no external dependency, no credential/API
risk, full editorial control, and it keeps the existing evidence-gated, reversible posture this
entire ecosystem is built on. Modes 2–4 each add a category of risk (link rot and per-account
ownership verification; third-party tracking and platform-terms exposure; credential/secret
exposure and unbounded cost) that this repository has no current evidence, review, or
authorization to accept.

Full prerequisites/benefits/risks/evidence/technical-change/authorization detail for all four
modes is in the JSON companion → `partC_futureFeedModes`. **Mode 4 must never be assumed merely
because a platform offers an API or RSS feed** — this is stated verbatim in the JSON as a standing
rule, not a recommendation.

---

## Part D — Editorial and risk gates (G-M1–G-M8)

| Gate | Name | Reviewer |
|---|---|---|
| G-M1 | Source and ownership verification | Owner (or documented delegate) |
| G-M2 | Rights, permission, attribution, usage verification | Rights owner + editorial owner |
| G-M3 | Claims/facts/metrics review | Editorial owner + claims reviewer |
| G-M4 | Sensitive-subject and reputational review | Owner + heavier reviewer if flagged |
| G-M5 | Accessibility review (captions/transcript/alt text/reading) | Editorial owner |
| G-M6 | Public-display decision (internal-only/link/index/embed) | Owner |
| G-M7 | Technical integration/privacy/tracking review | Owner + technical reviewer |
| G-M8 | Owner final authorization | **Owner only — may not be delegated** |

Full status vocabulary, evidence requirements, common blockers, and revalidation conditions per
gate are in the JSON companion → `partD_editorialAndRiskGates`. No item may reach any
`publicUseStatus` beyond `internal-only` before G-M8 is `approved`, and G-M8 cannot be reached
before every applicable prior gate has passed.

---

## Part H — TMM future information architecture

| Path | Status | Authorized now? |
|---|---|---|
| `/media` | Building (unchanged) | Yes — already exists |
| `/media/index` (future) | Curated editorial index | **No** — only after approved items exist |
| `/media/[slug]` (future) | Internal first-party media pages | **No** — only after G-M1–G-M8 all clear for that item |
| Future outbound links | Mode 2 only | **No** — only for source-verified accounts |
| Future embeds | Mode 3 only | **No** — only after full privacy/accessibility approval |

**No current live or automatic feed exists or is implied.** No separate TMM Cloudflare project,
domain, subdomain, social account, channel, API, or newsletter is created or implied — the
two-project ecosystem established in Mark 4 (`texasmovement`, `alexandermathai`) is unchanged.
`/media` remains in its existing Building state until an owner-approved, source-verified,
rights-cleared, editorially approved media item exists **and** a separate implementation task is
explicitly authorized — this document does not authorize that task.

---

## Validation performed this pass

- `docs/internal/mark-8-tmm-unified-media-feed-architecture.json` parsed successfully with
  `node -e "JSON.parse(...)"` — confirmed 63 schema fields across 5 groups, 9 attribution-matrix
  rows, 4 feed modes, 8 editorial gates.
- Every schema field is `populated: false` except the one fixed cross-attribution prohibition
  string — no title, date, URL, account name, or metric was invented anywhere.
- `grep -rn "AVM"` across the repository confirmed zero prior definitions — the neutral label is
  used consistently.
- This document was searched for: `live`, `current`, `latest`, `published`, `watch`, `listen`,
  `subscribe`, `follow`, `channel`, `episode`, `newsletter`, `feed`, `verified`, `approved`,
  `active`, `operational`, `public`, `embed`, `API`, `RSS`, `external`. Every occurrence is a
  field/enum name, a future-conditional state, an explicit prohibition, or a status-vocabulary
  label — none asserts a current active claim.
