# Mark 5 TMI Content Model and Proof Registry

Documentation, content-model, and test-planning work only. No CMS, form, contact workflow, or
third-party integration was created. No customer name, testimonial, result, metric, credential,
pricing, or health claim was invented anywhere in this pass — every proof-registry row is a blank
or explicitly template-marked scaffold for the owner to populate.

Companion machine-readable file: `docs/mark-5-tmi-content-model-and-proof-registry.json` (same
content, structured, including the full field set for all 22 content-model object types, all 12
proof-registry template entries, and all 20 backlog items). Companion documents:
`docs/mark-5-route-completion-specification.md` / `.json` (Part C) and
`docs/mark-5-owner-evidence-request-packet.md` (Part D).

---

## Part A — Content model (22 object types)

A reusable, **local, typed data shape only** — no content-collection directory or CMS exists in
the repository yet. None of these 22 types has been instantiated with real content beyond what
already exists (e.g. `/about`'s reuse of the already-approved `ORG.boilerplate` constant). Full
13-field detail for every type is in the JSON companion → `partA_contentModel.objectTypes`.

| Object type | Owner | Eligibility today | Claims risk | Conversion relationship |
|---|---|---|---|---|
| Brand narrative | TMI umbrella (+ per-vertical) | Owner-approved (TMI-level) / planned placeholder (vertical) | Low | None |
| Operating principle | TMI umbrella | Owner-approved for release | Low | None |
| Capability statement | Consulting/Media/Performance/Distribution/Partners | Planned placeholder | Medium | None |
| Service module | Consulting (primary) | Internal only | High | Future inert prototype only |
| Process/method module | Consulting | Owner-approved for release | Low | None |
| Case-study candidate | Any, esp. Consulting | Internal only | High | None |
| Approved case study | Same as candidate | Owner-approved for release | Medium | Future owner-approved activation |
| Proof artifact | Whichever vertical | Internal only, always | None (it is evidence) | None |
| Testimonial candidate | Any | Internal only | High | None |
| Testimonial approval record | Founder | Owner-approved for release | Low | None (gates future display only) |
| Founder claim dependency | Founder + alexandermathai.com review | Internal only | High | None |
| Media episode/project record | Media | Internal only | Medium | None |
| Performance educational topic | Performance | Planned placeholder | Health-or-legal-gated | None |
| HERO external-storefront boundary note | TMI umbrella / HERO (external) | Owner-approved for release | Low, escalates if weakened | Absent |
| Partner/collaboration category | Partners | Planned placeholder | Low | Future inert prototype only |
| FAQ entry | Whichever route | Planned placeholder | Low–medium | None |
| Editorial/research source | Health/Reparations/Media | Internal only | Health-or-legal-gated | None |
| Asset/visual record | Whichever vertical | Internal only | Low (rights risk) | None |
| Social-post source fragment | Distribution (future) | Internal only | Medium | None |
| YouTube video brief | Media | Planned placeholder | Medium | None |
| Udemy course concept | Varies (5-course roadmap) | Planned placeholder | Medium–high | None |
| Route metadata record | Whichever route | Owner-approved for release (already implemented) | Low | N/A |

---

## Part B — Proof registry (9 sections, 12 template rows)

Designed to prevent unverified marketing claims from entering the hub — mirrors the pattern already
proven in alexandermathai.com's `claims.registry.json`. **Every row's `exactProposedWording` is
blank or an explicit template placeholder, and every `verificationStatus` is `absent`.** No
customer name, result, metric, social statistic, product fact, health claim, or founder credential
was invented to populate it. Full field-by-field detail (evidence source/location/owner, allowed
routes/formats, required qualifiers, expiration, reviewer, prohibited-use clause) is in the JSON
companion → `partB_proofRegistry.sections`.

| Section | Template rows | Status |
|---|---|---|
| Consulting engagement proof | 2 (case-study reference, engagement volume) | absent |
| Web/AI/automation architecture proof | 1 (this build as a self-referential case example) | absent |
| Media reach and channel-performance metrics | 2 (view-count figure, account ownership) | absent |
| Performance methodology and educational boundaries | 2 (methodology, coach credential) | absent |
| HERO product/storefront statements | 1 (blanket — no allowed use exists yet) | absent |
| Partner/collaboration history | 1 (named partner) | absent |
| Founder-related context requiring cross-site approval | 1 (any founder biography/credential claim) | absent |
| Legal/editorial standards and research assertions | 1 (any research assertion presented as fact) | absent |
| Visual/photo/video asset rights and release status | 1 (any asset showing a real person/product/result) | absent |

**HERO's entry (`PR-HERO-001`) is deliberately the strictest row in the registry**: `allowedRoutes`
and `allowedFormats` are both empty arrays, and its prohibited-use clause states no storefront link,
catalog, price, inventory, shipping, return-policy, support, or product-performance statement may
appear anywhere on this hub, under any circumstance, until a full authenticated external audit and
owner approval both complete.

---

## Part E — Content-production backlog (20 items, P0–P3)

Translates `docs/mark-3-content-fuel-inventory.md` into a prioritized, **non-promotional** work-item
list — no promotional public copy was drafted to produce it. Full 13-field detail (source material,
proof dependency, owner/reviewer, intended channels, definition of done) is in the JSON companion →
`partE_contentProductionBacklog.items`.

**P0 — Foundation (6 items):** TMI foundational narrative/terminology approval · proof registry
collection · canonical visual-system inventory · Consulting service-definition packet ·
Cloudflare/DNS/custom-domain verification evidence · founder-site claim decisions.

**P1 — Revenue-adjacent capability (6 items):** Consulting capability/process assets · Media
programming + verified channel assets · TMI ecosystem visuals · partner category/collaboration
framework · Performance scope/safety framework · contact and intake operating decision.

**P2 — Specialist enablement (4 items):** Distribution materials · HERO bridge content (blocked
until the storefront audit clears `PR-HERO-001`) · YouTube series production briefs · Udemy
course-concept briefs.

**P3 — Incubation and governed future work (4 items):** Health research governance · FounderLink
product-discovery materials · Social/Gather safety and operations framework · Reparations editorial
standards and source collection.

Every P2/P3 item stays internal-only or explicitly blocked pending its named evidence dependency —
none produces a public route, CTA, or claim in this pass.

---

## Validation performed this pass

- `docs/mark-5-tmi-content-model-and-proof-registry.json` parsed successfully with
  `node -e "JSON.parse(...)"` — confirmed 22 content-model object types, 9 proof-registry sections
  (12 total template entries), and 20 backlog items split exactly 6/6/4/4 across P0–P3.
- No customer/client name, testimonial, result, metric, audience statistic, credential,
  certification, pricing, product fact, or health claim was invented anywhere in either file.
- Every route named in Parts A, B, and E cross-checks against
  `docs/mark-5-route-completion-specification.json`'s route list and
  `docs/mark-4-tmi-hub-route-specification.json`'s implemented-route list.
- This document was searched for: `live`, `verified`, `active`, `operational`, `available`,
  `ready`, `launch`, `production`, `approved`, `service`, `results`, `clients`, `members`,
  `health`, `medical`, `legal`, `guarantee`, `contact`. Every occurrence is qualified by an
  evidence-status field, a future-conditional state, or an explicit negation/prohibition.
- `git diff` for this change is limited to documentation files (this file, its JSON companion, and
  the other Mark 5 deliverables) — no dependency, application, or configuration file was changed.
