# Mark 3 Ecosystem Build Blueprint

Documentation only. Every URL, email address, social account, YouTube plan, and Udemy plan below
is **planned only** — nothing here has been created, activated, connected, or deployed. This
blueprint does not authorize any public-launch, infrastructure-change, account-creation, or
claim-activation action.

Companion machine-readable file: `docs/mark-3-ecosystem-build-blueprint.json` (same content,
structured). Companion service/content document: `docs/mark-3-content-fuel-inventory.md` / `.json`
(Parts B and D). Feeds into and does not replace `docs/mark-2-1-hub-release-control-packet.md`
(the gate model this blueprint's P0/P1 tasks close).

## Part G — Decision matrix (all 12 targets)

| Vertical | Primary function | Offer status | Recommended surface | Planned URL | Subdomain? | TMI nav location | Workspace placeholder | Social strategy | YouTube strategy | Udemy relevance | Priority | Primary blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **texasmovement.com** | Umbrella hub/authority | Stage 0 (routing) | Root domain (existing) | `/` (existing) | No | Is the navigation | `operations@`, `hello@` | Shared TMI account | Ecosystem lane on Media channel | Indirect | Now | G3 CNAME conflict; G5 claims |
| **alexandermathai.com** | Founder identity/editorial | Stage 0 | Root domain (existing), kept separate | `/` (existing) | No | Founder site only | `founder@` | Founder amplification only | Commentary lane on Media channel | Indirect | Now (claims) / Hold (new content) | 40/41 claims pending |
| **Texas Movement Consulting** | AI/workflow/advisory | Stage 0→1 target | TMI top-level route | `/consulting` (planned) | No — see justification | Ecosystem page now; primary nav once route exists | `consulting@` | Shared TMI account, LinkedIn pillar | Consulting/AI lane on Media channel | Direct (highest) | Now | No service packages/proof/intake defined |
| **Texas Movement Media** | Editorial/media hub | Stage 0 (unproductized) | TMI top-level route | `/media` (planned) | No — see justification | Ecosystem page now; primary nav once route exists | `media@` | Independent (real handles exist) | The one primary channel | Indirect | Now | No dedicated route yet; no media kit |
| **HERO** | Commerce (footwear/apparel) | Stage 1 external, Stage 0 TMI-side | External storefront + TMI bridge route | `/hero` (planned, bridge only) | External | Ecosystem page only | None (storefront owns its own) | External storefront account only | Playlist within Media, conditional | None | Next | No repo exists; storefront unaudited |
| **Texas Movement Performance** | Movement/training research | Stage 0 | TMI top-level route | `/performance` (planned) | No — see justification | Ecosystem page only | `performance@` | Shared TMI account pillar | Performance lane on Media channel | Direct but Later | Later | No methodology/liability/intake documented |
| **Texas Movement Health** | Research/editorial | Stage 0 | Private workspace now; gated TMI route later | None assigned | No | No public nav yet | `research@` (internal only) | Reserve | None | None | Hold | No editorial/clinical/legal/privacy standards approved |
| **FounderLink** | Founder-network concept | Stage 0 | Access-controlled platform later; no public surface now | None assigned | No | No public nav yet | Internal only | Reserve | None | None | Hold | No membership/eligibility/privacy/moderation model |
| **Distribution** | Content/syndication capability | Stage 0 | TMI nested route | `/media/distribution` or `/distribution` (planned) | No | Ecosystem page only | Routes through `media@` | No independent account | Referenced within Media | Direct but Later | Later | Minimal private shell only |
| **Social / Gather** | Ceremony/social infrastructure | Stage 0, purpose undefined | TMI nested route, purpose-gated | `/gather` or `/social` (planned) | No | No public nav yet | `community@` (internal only) | Reserve | None | None | Hold | Purpose undefined; operations immature |
| **Reparations** | Private research initiative | Stage 0 | Private now; editorial section under TMI/founder site later, never standalone | None assigned | No | No public nav yet | `research@` (shared, internal only) | Reserve | None | None | Hold | No editorial standards/sourcing/legal review |
| **Partners / intake** | Controlled collaboration route | Stage 0 | TMI top-level route | `/partners` or `/work-with-us` (planned) | No | Ecosystem page once route exists | `partnerships@` | Routed through TMI account | None | None | Next/Later | No intake ownership/routing logic decided |

**No independent subdomain is recommended anywhere in this matrix.** Every "No" above is backed
by a written operating/commercial/governance/content/technical justification in Part A below, per
the validation requirement that no subdomain recommendation ship without one.

---

## Part A — Ecosystem architecture decisions

Full per-vertical detail (audience, offer category, proof requirements, navigation placement,
visual-identity timing, dependencies) is in `docs/mark-3-ecosystem-build-blueprint.json` →
`verticals`. Summarized here; read the JSON for the complete field set requested (16 fields per
vertical).

### texasmovement.com
Umbrella hub. Owns ecosystem explanation, proof, media discovery, and controlled pathways into
verticals — exactly as it does today, expanded with the planned routes above. Already has its own
visual identity (`docs/BRAND_SYSTEM.md`). Release gates: G3 (CNAME/DNS), G5 (claims/inbox/
LinkedIn), G8 (owner authorization) — see the Mark 2.1 packet.

### alexandermathai.com
Founder identity and editorial authority, deliberately kept separate from TMI. Not a general TMI
service portal. May link selectively into approved TMI properties later. Dominant gate: the
41-item claims review in that repo's `docs/CLAIMS_REVIEW.md` (read-only referenced, not modified).

### Texas Movement Consulting
Recommended surface: `/consulting`. **Subdomain justification (why not now):** no documented
service packages, proof assets, intake operations, operating capacity, or commercial terms exist
yet — a subdomain would imply independent operational maturity this vertical does not have. A
route under the umbrella keeps it correctly subordinate and borrows the hub's trust/traffic.
Future service lanes: AI/workflow strategy, web ecosystem architecture, digital brand systems,
automation, advisory engagements (full offer ladder in the content-fuel inventory).

### Texas Movement Media
Recommended surface: `/media`. **Subdomain justification:** its publishing operation is not yet
independently managed at a scale that outgrows a route under the umbrella — revisit only if
Media's cadence and team size become genuinely independent. Already the one vertical with real,
distinct external channel handles (per existing repo content, not independently re-verified this
session).

### HERO
Commerce stays on the external storefront (unaudited — no repo exists in this org, per the Mark 2
audit). TMI-side surface is a controlled explanatory bridge route (`/hero`) only.
**Subdomain justification:** no HERO subdomain under `texasmovement.com` unless a future
operational need arises for a separate owned marketing/editorial surface distinct from both the
storefront and the bridge route.

### Texas Movement Performance
Recommended surface: `/performance`. **Subdomain justification:** dedicated subdomain only after
documented program methodology, coach/operator availability, liability posture, intake
operations, measurable offers, and recurring content cadence exist — none currently do. No
clinical/therapeutic/injury-prevention/guaranteed-outcome positioning, ever, without separate
substantiation and approval.

### Texas Movement Health
**No independent public site or subdomain now.** Future surface: private/internal research
workspace, or a narrowly scoped TMI route only after editorial, clinical/legal, privacy, and
operational standards are approved. Never defined as a medical, therapeutic, diagnostic,
treatment, or supplement service. This is the most heavily gated vertical in the ecosystem by
design.

### FounderLink
**No public standalone surface now.** Future surface: access-controlled product/platform or an
internal venture-validation page — not a broadly promoted public network. No subdomain until
membership model, eligibility, privacy, consent, moderation, data handling, user support, and
safety operations are documented.

### Distribution
Recommended surface: `/distribution` or `/media/distribution` (owner decides nesting).
**Subdomain justification:** treat strictly as a capability/service lane supporting content
syndication, release strategy, platform packaging, and audience growth — not an independent
brand, at any point in this roadmap.

### Social / Gather
Recommended surface: `/gather` or `/social`, only after its purpose is defined — currently it
isn't. **Subdomain justification:** no independent site or subdomain until event operations,
participant safety, moderation, ticketing, insurance/liability, privacy, and support workflows
are mature. If primarily a community function, treat as a program within Media or the umbrella
unless it develops a true separate operating model.

### Reparations
**Private research/editorial initiative now.** No subdomain, no public navigation, no public
service representation. Future public surface (if approved) begins as a carefully sourced
editorial/research section under TMI or the founder site — never a standalone public brand.
Prerequisite work: editorial standards, sources, correction policy, explicit non-legal-advice
boundaries. Already flagged in the Mark 2 vertical audit for a legal/reputational review heavier
than the generic stub-page pass.

### Partners / structural collaboration / intake
Recommended surface: `/partners` or `/work-with-us`. **Subdomain justification:** must remain a
controlled umbrella route, not an independent brand, so partnership/sponsorship/advisory pathways
stay clearly subordinate to and differentiated within TMI's own trust structure. No public intake
mechanism activates until inbox ownership, response operations, privacy terms, and routing logic
are decided.

---

## Part C — Google Workspace placeholder map (planned only)

**Approach**: single accountable owner plus aliases/groups, not one inbox per vertical. No
Workspace account, alias, group, or mailbox was created, activated, or modified — this is
planning language only. No domain is independently confirmed as the Workspace-connected domain in
local repository evidence, so every address uses `[approved-domain-to-be-confirmed]` unless an
existing repo reference already names a specific domain.

**Primary mailboxes** (real, single accountable owner):

| Address | Purpose | Public display status | Required owner decision |
|---|---|---|---|
| `founder@[…]` | Primary founder/operator mailbox | Never display until owner decides otherwise | Confirm domain + provisioning |
| `admin@[…]` | Administration/legal/finance | Internal-only | Confirm accountable administrator |
| `operations@[…]` | TMI umbrella operations | Internal-only → future footer/contact display once monitored | Confirm staffing/monitoring cadence |

**Planned aliases/groups by vertical** — full table (17 addresses, one per the owner's supplied
naming list) is in the JSON companion → `googleWorkspacePlaceholderMap.plannedAliasesOrGroupsByVertical`.
Highlights:

- `hello@` — alias routed to `operations@`; future footer display **only** after the same 3-part
  operational verification already defined in `docs/LAUNCH_BLOCKERS.md` (mailbox provisioned,
  test email received, monitoring confirmed).
- `consulting@`, `media@`, `partnerships@`, `press@` — future form-recipient/partner-facing
  aliases, each gated on the relevant route/operations existing first.
- `performance@`, `research@` (Health + Reparations, shared), `community@` (Social/Gather),
  `safety@` (Social/Gather + Performance, shared) — **internal-only**, must not become public
  action channels before each vertical's governance requirements are met, per explicit
  instruction.
- `support@` and `orders@` — **not recommended as TMI Workspace addresses for HERO at all.**
  HERO's external storefront platform (unaudited from this session) owns its own support channel;
  do not create a parallel TMI-side alias for a commerce property this session hasn't verified.
- `courses@` — alias, never display until an actual Udemy course exists.
- `legal@`, `finance@`, `privacy@` — internal-only / gated on real policy content existing.

**Naming convention**: lowercase, single-word-or-hyphenated local part, matching the owner's
supplied standard list exactly — no per-vertical creative naming at the mailbox layer.

**Mailbox vs. alias vs. group**: real mailbox only for the few genuinely accountable owners
(`founder@`, `admin@`, `operations@`); alias where one person/small stable team monitors a
purpose-specific address; Google Group where multiple people need visibility or accountability
shouldn't rest on one individual.

**Hard constraints** (apply to every address above, no exceptions):
1. An alias does not itself establish staffing, responsiveness, privacy handling, or operational
   readiness.
2. A public address cannot be displayed until ownership, monitoring, response expectation, and
   privacy/security handling are approved.
3. Health, FounderLink, Reparations, and Gather/Social addresses must not be used as public
   action channels before their governance requirements are met.

---

## Part E — Social, YouTube, and Udemy plan (planned only)

**Principle**: default toward fewer, stronger accounts. No separate social account is recommended
merely because a vertical exists — full per-vertical table in the JSON companion →
`socialYoutubeUdemyPlan.socialPlatformArchitecture.byVertical`.

- **Independent account now**: Texas Movement Media only — it already has real, distinct handles
  per existing repo content (not independently re-verified this session).
- **Shared TMI account with a dedicated content pillar**: TMI umbrella, Consulting, Performance.
- **Founder account amplification only**: alexandermathai.com.
- **External storefront account only**: HERO.
- **Reserve / no account yet**: Health, FounderLink, Social/Gather, Reparations.
- **No independent account, routed through the umbrella**: Distribution, Partners.

### YouTube architecture

**One primary Texas Movement Media channel** unless a compelling, operations-backed reason
supports more. Planning uses YouTube's own trailer/featured-video/featured-section Home-tab model
as a reference structure only — nothing on any channel was altered.

Programming lanes (all as **playlists/series within the one channel**, not separate channels):
TMI ecosystem · Consulting/AI systems · Performance (no offer content, no medical claims) ·
Founder commentary · Build-in-public documentation · Media/interviews (the existing core format) ·
HERO (product/operational-fact content only where approved).

**No YouTube presence yet**: Health, FounderLink, Social/Gather, Reparations, Distribution —
consistent with their governance-gated status above.

### Udemy architecture

Udemy is an education **distribution channel** — not the operating center for Consulting, Health,
FounderLink, or any other vertical. Course titles below are working titles only; no course or
landing page was created. Full per-course detail (learning objectives, module outline, proof
requirements, compliance boundaries) is in the JSON companion →
`socialYoutubeUdemyPlan.udemyArchitecture.coursePortfolioRoadmap`.

**Priority order**:
1. *AI-Assisted Workflow Systems for Operators* (Consulting) — gated on Consulting's own offer
   ladder finalizing.
2. *Digital Ecosystem Architecture* (TMI/Consulting) — gated on both hubs actually reaching Live
   status, since the course would reference this build as its case example.
3. *Content Systems and Distribution* (Distribution/Media) — must not cite the unverified 2.1M+
   views figure as confirmed authority evidence.
4. *Founder/Operator Systems Thinking* (alexandermathai.com) — fully gated on the 41-item claims
   review closing.
5. *Safe Performance Programming Fundamentals* (Performance, strictly non-clinical) — fully gated
   on Performance's own governance list; the hardest compliance boundary of any course.

**Explicitly excluded from the roadmap**: Health, FounderLink, Reparations — no course concept
exists until their governance requirements are met.

---

## Part F — Prioritized build roadmap

Full 18-task table (priority, vertical, deliverable, why-it-matters, dependency, owner role,
evidence required, work type, local-Claude-pass safety, owner-approval requirement) is in the
JSON companion → `prioritizedBuildRoadmap.tasks`. Phase summary:

**P0 — Foundation and control**: resolve the CNAME/GitHub-Pages conflict risk (owner/dashboard,
not safe for a local pass); close both hubs' claims/LAUNCH_BLOCKERS reviews (owner, not safe for
a local pass); confirm the visual-system covers planned new routes (documentation, safe); finalize
the Workspace domain/routing decision (owner).

**P1 — Revenue-capable hub build**: build `/consulting`, `/media`, `/performance`, `/partners`
routes (code — safe for a local pass; content requires owner-supplied real proof, not invented);
build the proof/case-study system (template safe, population requires owner input); Media's
social/YouTube asset plan (safe, claims require owner review); `/partners` route content with no
live intake (safe).

**P2 — Specialist vertical enablement**: publish Performance training-philosophy content only, no
offer (safe, requires owner review for medical-claim compliance); locate/audit the actual HERO
storefront (not safe for a local pass — requires owner-supplied access); write the Distribution
playbook (safe, documentation); expand alexandermathai.com editorial content once claims close
(safe once gated); first Udemy course production (planning safe, actual submission out of scope
for any local pass).

**P3 — Incubation and governed future initiatives**: draft internal-only Health and FounderLink
governance documents (safe to draft, never safe to publish without legal/clinical review); define
Social/Gather's actual purpose (owner decision, not safe for a local pass); commission the
Reparations legal/reputational review (owner + legal reviewer, not safe for a local pass);
re-apply this blueprint's subdomain-justification test to any vertical seeking independent status
in the future.

---

## Validation performed this pass

- `docs/mark-3-ecosystem-build-blueprint.json` and `docs/mark-3-content-fuel-inventory.json`
  parsed successfully with `node -e "JSON.parse(...)"`.
- All 12 requested ecosystem targets are represented in both the decision matrix table above and
  the JSON's `decisionMatrix` array and `verticals` object — cross-checked entry by entry.
- Every "No" subdomain recommendation in the matrix is backed by a written justification in
  Part A (operating/commercial/governance/content/technical) — none is a bare recommendation.
- Health, FounderLink, Social/Gather, and Reparations remain constrained by their applicable
  safety/privacy/moderation/editorial/legal governance requirements throughout — none is given a
  public surface, social account, YouTube presence, or Udemy course in this plan.
- This document was searched for: `live`, `verified`, `operational`, `active`, `safe`, `ready`,
  `launch`, `production`, `approved`. Every occurrence either names a future/planned/conditional
  gate, is explicitly negated ("not currently live," "no repo exists," "unaudited"), or cites a
  specific evidenced fact from an existing document rather than asserting a vertical itself is
  live/ready/approved.
- `git diff` for this change contains documentation files only: this file, its JSON companion,
  and the two Mark 3 content-fuel-inventory files. No application, configuration, infrastructure,
  domain, form, analytics, or external-service file was modified.
