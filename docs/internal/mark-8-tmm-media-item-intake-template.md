# Mark 8 TMM Media Item Intake Template

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

> ## Completing this intake does not authorize public display, external linking, embedding, or
> ## attribution.
>
> This is a blank template for one future media item. Every field below is empty or an explicit
> controlled option — no sample title, date, URL, or account name has been entered anywhere in
> this document. Duplicate this entire template once per real item when intake actually begins.
> An item only advances by clearing the gates in
> `docs/internal/mark-8-tmm-media-governance-and-approval-queue.md` — filling in this form is the
> first step of that process, not the end of it.

Schema reference: `docs/internal/mark-8-tmm-unified-media-feed-architecture.json` →
`partA_unifiedFeedModel`. Every field name below matches that schema exactly.

---

## Prompt: any account not already known?

**Before filling in a specific item, first answer this:**

Is the source account/platform/handle for this item already listed in the known-outlets inventory
(`docs/internal/mark-8-tmm-unified-media-feed-architecture.md` → "Known media outlets")?

- [ ] **Yes** — it is one of: YouTube (tmm / tmp / hero / tmipresident), Substack (texasmovement),
      LinkedIn (any founder or company profile), Instagram (alexanderofnazareth /
      herofootwearusa / tmmediausa), TikTok (alexandervmathai / herofootwear /
      texasmovementmedia)
- [ ] **No — this is a new account/handle/platform not previously listed:**
      Platform: _____ Handle/account name: _____ Owner of this account, to the best of your
      knowledge: _____

---

## Identity

| Field | Value |
|---|---|
| `internalMediaId` | *(assigned by editorial owner — format `TMM-MEDIA-#####`)* _____ |
| `workingTitle` | _____ |
| `sourceOrganization` | ☐ TMI ☐ TMM ☐ AVM / founder media — owner definition required ☐ approved-vertical ☐ third-party-with-permission |
| `sourceOwner` | _____ |
| `rightsOwner` | _____ |
| `editorialOwner` | _____ |
| `verticalAssociation` (if any) | _____ |
| `routeAssociation` | *(today, only `/media` may be named — no other route exists for this)* _____ |
| `mediaType` | ☐ video ☐ short-video ☐ article ☐ image-set ☐ audio ☐ podcast ☐ livestream ☐ newsletter ☐ interview ☐ event-record ☐ announcement ☐ other: _____ |
| `formatSubtype` | _____ |
| `language` | _____ |
| `audienceCategory` | _____ |

## Source verification

| Field | Value |
|---|---|
| `sourcePlatform` | _____ |
| `sourceAccountName` | _____ *(not pre-filled with any known-inventory handle — enter the real one)* |
| `sourceAccountOwnershipStatus` | ☐ owner-provided ☐ not independently verified *(default)* ☐ verified-by-platform-confirmation ☐ disputed |
| `sourceUrl` | _____ *(not linked or rendered anywhere by entering it here)* |
| `sourceUrlVerificationStatus` | ☐ absent *(default)* ☐ owner-submitted ☐ needs-review ☐ verified ☐ rejected |
| `sourceArtifactLocation` | _____ |
| `publicationDate` | _____ |
| `publicationDateEvidence` | _____ |
| Rights/usage permission | _____ |
| Creator/guest permissions | _____ |
| Thumbnail/image rights | _____ |
| `transcriptCaptionStatus` | ☐ not present *(default)* ☐ owner-provided ☐ needs-review ☐ verified-accessible |
| Accessibility artifact status | _____ |
| Content archival location | _____ |

## Editorial governance

| Field | Value |
|---|---|
| `editorialStatus` | ☐ draft *(default)* ☐ owner-submitted ☐ source-verified ☐ rights-cleared ☐ editorial-review ☐ approved-for-TMM-index ☐ rejected ☐ deferred ☐ archived |
| `ownerApprovalStatus` | ☐ pending *(default)* ☐ approved ☐ rejected ☐ deferred |
| `claimsReviewStatus` | ☐ absent *(default)* ☐ pending ☐ reviewed-clean ☐ reviewed-flagged |
| `factCheckStatus` | ☐ absent *(default)* ☐ pending ☐ verified ☐ disputed |
| `brandFitStatus` | ☐ pending *(default)* ☐ fits ☐ does-not-fit |
| Reputational/safety risk | ☐ none identified *(default)* ☐ low ☐ medium ☐ high |
| Sensitive-topic flag | ☐ no *(default)* ☐ yes — describe: _____ |
| Health/legal/political/Reparations flag | ☐ no *(default)* ☐ yes — describe: _____ |
| Corrections requirement | _____ |
| Takedown/contact protocol | _____ |
| Expiry/revalidation date | _____ |

## Public-display controls

| Field | Value |
|---|---|
| `publicUseStatus` | ☐ internal-only *(default)* ☐ eligible-for-future-review ☐ approved-for-index ☐ approved-for-external-link ☐ approved-for-embed ☐ rejected |
| Display location | ☐ no public surface *(default)* ☐ future /media index ☐ future vertical page ☐ future founder site reference ☐ future ecosystem page |
| Attribution requirements | _____ |
| Required disclaimer/boundary language | _____ |
| Title/description approval | ☐ pending *(default)* ☐ approved |
| Thumbnail approval | ☐ pending *(default)* ☐ approved ☐ not applicable |
| Canonical source requirement | _____ |
| Nofollow/noindex requirement | _____ |
| Chronological feed eligible | ☐ no *(default)* ☐ yes |
| Featured collection eligible | ☐ no *(default)* ☐ yes |
| Cross-post eligible (TMI ↔ AVM) | ☐ no *(default)* ☐ yes — requires separate explicit approval, see Part B attribution policy |

## Operational and technical controls

| Field | Value |
|---|---|
| Planned ingestion method | ☐ manual internal registry *(default and only currently authorized option)* ☐ approved platform API ☐ approved RSS ☐ approved CMS ☐ static content repository ☐ no ingestion |
| Credentials required | _____ |
| API/OAuth owner | _____ |
| Rate-limit/cost implications | _____ |
| Data/privacy implications | _____ |
| Analytics/tracking implications | _____ |
| Embed risk | _____ |
| External-link risk | _____ |
| Accessibility review requirement | _____ |
| Fallback behavior if source becomes unavailable | _____ |
| Deprecation/archival policy | _____ |

---

## Required supporting artifacts

List every artifact backing this intake, with its local file path or approved secure-storage
reference. Do not paste credentials, tokens, or account passwords into this document.

| Artifact | Local path / approved secure storage reference |
|---|---|
| Ownership confirmation | _____ |
| Rights/permission documentation | _____ |
| Guest/creator releases | _____ |
| Transcript/caption file | _____ |
| Thumbnail/image with confirmed rights | _____ |
| Publication-date evidence | _____ |
| *(add rows as needed)* | _____ |

---

## Owner affirmation

- [ ] I confirm I am the owner or an owner-designated authority for this decision.
- [ ] I confirm the information above is accurate to the best of my knowledge.
- [ ] I understand this affirmation alone does not clear any gate below.

Signed (name): _____ Date: _____

## Source / rightsholder affirmation

- [ ] I confirm I hold, or have documented permission for, the rights described above.
- [ ] I confirm any guest/creator appearing in this item has given permission.

Signed (name): _____ Date: _____ *(leave blank if the rightsholder is the owner and already
covered by the Owner affirmation above)*

## Editor review

- [ ] Reviewed for source/ownership (G-M1)
- [ ] Reviewed for rights/permission/attribution (G-M2)
- [ ] Reviewed for brand fit
- [ ] Editorial notes: _____

Reviewer: _____ Date: _____

## Claims review

- [ ] No unverified claim or metric present, OR every claim/metric below is independently sourced
- [ ] Claim/metric: _____ | Source: _____
- [ ] Claim/metric: _____ | Source: _____

Reviewer: _____ Date: _____

## Accessibility review

- [ ] Captions/transcript present and accurate (video/audio/podcast items)
- [ ] Alt text present and descriptive (image items)
- [ ] Reading accessibility checked (article items)
- [ ] Not applicable to this media type — explain: _____

Reviewer: _____ Date: _____

## Final authorization

- [ ] **Approved** — proceed to the queue in `docs/internal/mark-8-tmm-media-governance-and-approval-queue.md`
- [ ] **Rejected**
- [ ] **Deferred**
- [ ] **Archived**

Owner signature: _____ Date: _____

---

## Rejection / defer / archive reason

Complete only if the Final authorization above is not "Approved."

| Disposition | Reason | Revisit date (if deferred) |
|---|---|---|
| _____ | _____ | _____ |
