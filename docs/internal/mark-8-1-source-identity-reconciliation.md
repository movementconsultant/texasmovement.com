# Mark 8.1 TMM Source Identity, Account Ownership, and First-Media-Item Intake Reconciliation

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

Reconciles the owner decisions supplied for this pass (AVM definition, TMM role, owner-asserted
source categories, first-item rule) into the Mark 8 TMM source-identity framework. Every source
record below is an **owner assertion only** — not independently verified platform ownership,
canonical URL, account access, rights clearance, or feed eligibility.

Companion machine-readable file: `docs/internal/mark-8-1-source-identity-reconciliation.json`
(same content, structured — 12 source records with the full 16-property schema each). Companion
document: `docs/internal/mark-8-1-first-media-item-readiness.md` (blank first-item readiness
record + missing-evidence checklist).

---

## Deliverable A — Source identity decision records

### AVM

| Field | Value |
|---|---|
| Internal label | AVM / Alexander Mathai founder media identity |
| Owner decision source | Owner assertion supplied for Mark 8.1 |
| Relationship to TMI | Distinct founder-associated media identity; **no automatic TMI ownership or attribution** |
| Relationship to TMM | May be reviewed for future editorial indexing **only** with explicit per-item authorization |
| Public-use status | internal-only |
| Cross-attribution status | Prohibited pending explicit per-item approval |
| Required evidence before any future advancement | Canonical source URL, account ownership/control evidence, item-specific rights, claims review, accessibility evidence, editorial decision, owner final authorization (G-M8) |
| Prohibited present actions | No AVM route, branding, social account, metadata, external link, feed item, or public statement of any kind was created or implied by this pass |

### TMM

| Field | Value |
|---|---|
| Internal role | Future TMI editorial and media-distribution function |
| Not automatically equivalent to | A standalone platform, channel, publisher, domain, subdomain, Cloudflare Pages project, social account, newsletter, or public media site |
| Public-use status | internal planning only |
| Future editorial index requires | Approved items (cleared through G-M1–G-M8) **and** a separate implementation authorization |
| Current `/media` route status | Building (unchanged, last touched in commit `9186ca5`) — may not be represented as a live feed |
| Ownership/endorsement default | TMM does not automatically own, publish, endorse, embed, cross-post, or attribute media merely because a source is owner-associated |

---

## Deliverable B — Account/source identity matrix (12 records)

No URL, link, metric, description, or account detail beyond the owner-provided platform and
label/handle was added anywhere. Full 16-property schema per record is in the JSON companion →
`deliverableB_accountSourceIdentityMatrix.sources`.

| Source ID | Class | Platform | Owner-provided label/handle |
|---|---|---|---|
| `TMM-SRC-001` | TMM | YouTube | Texasmovementmedia |
| `TMM-SRC-002` | TMM | Instagram | tmmediausa |
| `TMM-SRC-003` | TMM | TikTok | texasmovementmedia |
| `AVM-SRC-001` | founder-AVM | LinkedIn | Alexander Mathai |
| `AVM-SRC-002` | founder-AVM | Facebook | Alexander Mathai |
| `AVM-SRC-003` | founder-AVM | Instagram | alexanderofnazareth |
| `AVM-SRC-004` | founder-AVM | TikTok | alexandervmathai |
| `HERO-SRC-001` | HERO | Instagram | herofootwearusa |
| `HERO-SRC-002` | HERO | TikTok | herofootwear |
| `HERO-SRC-003` | HERO | YouTube | herofootwear |
| `OTHER-SRC-BLANK-001` | third-party/unknown | *(blank)* | *(blank)* |
| `RETIRED-SRC-BLANK-001` | retired/not-approved | *(blank)* | *(blank)* |

**Every one of the 10 populated records carries the identical status set:**
`ownerAssertionStatus: owner-asserted` · `canonicalUrlStatus: absent` ·
`platformAccessControlStatus: absent` · `sourceOwnershipVerificationStatus: needs-review` ·
`rightsAndUsageStatus: absent` · `claimsAndMetricsStatus: absent` ·
`accessibilityArtifactStatus: absent` · `publicUseStatus: internal-only` ·
`crossAttributionStatus: prohibited pending explicit per-item approval` ·
`sourceDisplayEligibility: not eligible for public display`.

**No record anywhere in this matrix uses** verified, approved, active, operational, live, public,
connected, authenticated, available, approved-for-index, approved-for-external-link, or
approved-for-embed as a present-state value.

**Default preserved, per the owner's explicit instruction:** all other sources remain
third-party/unknown unless separately owner-confirmed; account ownership is never inferred from
platform display name, handle similarity, historical reference, login access, search results, a
social profile, or repository constants alone — including the overlapping handles already present
as unverified constants in `packages/constants/src/social.ts` (read, not edited, this pass).

---

## Deliverable D — Missing-evidence checklist

1. Confirm whether AVM is a permanent internal founder-media label or should later be retired in
   favor of a different founder identity label.
2. For each owner-asserted source, supply a canonical URL only when ready for internal review.
3. Supply owner/account-control evidence.
4. Supply rights and usage basis for each proposed media item.
5. Supply title/date/source evidence.
6. Supply caption/transcript/alt-text or equivalent accessibility artifact.
7. Supply any metrics only with source evidence and permitted wording.
8. Submit one complete candidate item only after all required materials exist.
9. Approve internal intake only; no public-display authorization is implied.
10. Review all owner assertions after phase completion and correct any best-guess or outdated
    account classification.

---

## Validation performed this pass

- `docs/internal/mark-8-1-source-identity-reconciliation.json` parsed successfully with
  `node -e "JSON.parse(...)"` — confirmed 12 source records (3 TMM + 4 founder-AVM + 3 HERO + 2
  blank controlled rows).
- `git diff` confirms every existing Mark 7 and Mark 8 file is unchanged — referenced, not edited.
- No `sourceUrl`, canonical URL, or external link value was populated anywhere — every
  `canonicalUrlStatus` is `absent`.
- This document was searched for: `verified`, `approved`, `live`, `current`, `published`, `watch`,
  `listen`, `subscribe`, `follow`, `channel`, `feed`, `external`, `embed`, `API`, `RSS`, `active`,
  `operational`, `public`, `link`, `attribution`, `YouTube`, `Instagram`, `TikTok`, `LinkedIn`,
  `Facebook`, `HERO`, `TMM`, `AVM`. Every occurrence is a controlled status-vocabulary value, a
  platform-name label paired with an owner-asserted (not verified) status, a prohibition, or an
  internal-only qualifier — none asserts a current active, verified, or public state.
