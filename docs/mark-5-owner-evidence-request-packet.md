# Mark 5 Owner Evidence Request Packet

A concise packet for **manual owner collection only**. Nothing in this document sends a message,
creates a task, contacts anyone, or takes any action — it is a checklist the owner works through on
their own schedule. Every item traces to a specific gap already identified in the Mark 2 through
Mark 5 documentation set; nothing here is a new, invented requirement.

Companion documents: `docs/mark-5-tmi-content-model-and-proof-registry.md` / `.json` (the proof
registry these items feed) and `docs/mark-5-route-completion-specification.md` / `.json` (the
routes each item unblocks).

---

## 1. TMI identity and governance

- [ ] Approved legal/entity naming (confirm or correct `ORG.legalName`, `ORG.shortName`,
      `ORG.initials` in `packages/constants/src/org.ts`)
- [ ] Brand naming confirmation (any name/label change from what's currently shipped)
- [ ] Approved mission and operating-principle language (confirm or edit the current `/about` text
      and `ORG.boilerplate`/`ORG.tagline`)
- [ ] Approved public spokesperson and editorial owner (who signs off on public copy going forward)

## 2. Consulting

- [ ] Verified scope of services actually offered today, if any
- [ ] Service packages (names, deliverables, boundaries) — feeds `PR-CONSULT-001`/`002`
- [ ] Deliverables per package
- [ ] Pricing/engagement boundaries (even a range, or "not yet decided")
- [ ] Client permission and case-study evidence, per client, in writing — feeds
      `PR-CONSULT-001`
- [ ] Portfolio assets (screenshots, work samples) with confirmed usage rights
- [ ] Contact/intake decision: real inbox, form, or "not yet" — feeds `VERIFIED_INBOXES` and
      `/consulting`'s Conversion-ready state

## 3. Media

- [ ] Official account URLs (every platform) — feeds `PR-MEDIA-002`
- [ ] Account ownership evidence (confirmation TMI/the founder controls each account)
- [ ] Verified channel metrics, with export method and date — feeds `PR-MEDIA-001`; this is the
      only path to using the previously-flagged 2.1M+ views figure as anything other than
      unverified
- [ ] Rights-cleared media assets (footage, music, thumbnails) for any future episode reference
- [ ] Approved series/programming plan (which lanes are real vs. aspirational)
- [ ] Media/press positioning (how Media wants to be described to a journalist or partner)

## 4. Performance

- [ ] Scope of education/coaching actually intended (education-only vs. a future coaching product)
- [ ] Credentials held by any coach/operator, and the review process for verifying them — feeds
      `PR-PERF-002`
- [ ] Liability and safety boundaries (waiver language, scope-of-practice disclaimer source)
- [ ] Approved methods and educational content (what can be said publicly, non-clinically) — feeds
      `PR-PERF-001`
- [ ] Proof/experience evidence for any methodology claim
- [ ] Operational availability decision: is coaching ever intended to be sold, or education-only
      permanently?

## 5. HERO

- [ ] Storefront URL and ownership confirmation
- [ ] Product catalog ownership (who maintains it, where)
- [ ] Fulfillment and support owner (who actually ships/answers support today)
- [ ] Product claims, policies, legal text, and media rights currently in force on the storefront
- [ ] **External-storefront audit authorization** — explicit permission for a future session to
      access and audit the actual HERO property; without this, `/hero` remains permanently at
      "External storefront / internally unaudited" with zero links, per `PR-HERO-001`

## 6. Distribution and Partners

- [ ] Service/capability definition for Distribution (is it real internal infrastructure today, or
      purely aspirational?)
- [ ] Process proof (an actual example of content being packaged/distributed, if one exists)
- [ ] Partner categories: confirm or edit the four named on `/partners` (advisory, editorial/media,
      sponsorship, structural)
- [ ] Past/current relationship permissions — any partner willing to be named publicly, in writing
      — feeds `PR-PARTNER-001`
- [ ] Future intake routing decision for both verticals (real inbox, form, or "not yet")

## 7. Founder relationships

- [ ] Approved founder-site cross-reference language (exactly what `/about` may say about the
      founder's relationship to alexandermathai.com, if anything beyond the current plain mention)
- [ ] Any claim that requires alexandermathai.com owner approval — cross-reference against that
      repository's own `docs/CLAIMS_REVIEW.md` (40 of 41 entries pending as of this pass) and
      confirm which, if any, are ready to be referenced (not restated) from this hub — feeds
      `PR-FOUNDER-001`

## 8. Infrastructure and release

- [ ] Cloudflare custom-domain mapping for the `texasmovement` Pages project (confirm the "+1 other
      domain" shown in the dashboard is `texasmovement.com` itself)
- [ ] DNS/registrar confirmation for `texasmovement.com`
- [ ] GitHub Pages overlap resolution — `public/CNAME` still exists in this repository and has been
      a flagged, unresolved risk since Mark 2 (`docs/infrastructure-owner-checklist.md`, that
      analysis lives in the alexandermathai.com repo but the underlying `CNAME` file is here); needs
      a decision on whether GitHub Pages is still active for this repo and should be disabled
- [ ] Preview and production rendered-output review (a human opening the actual deployed preview
      URL and confirming it matches what this repo's local builds show)
- [ ] Canonical host choice confirmation (`texasmovement.com` vs. `www.texasmovement.com` — the
      existing `public/_redirects` already assumes apex-canonical; confirm that's correct)
- [ ] Email/contact decision — the three `hello@texasmovement.com` operational preconditions in
      `docs/LAUNCH_BLOCKERS.md` (mailbox provisioned, test email received, monitoring confirmed)
- [ ] Analytics/privacy decision — whether any analytics tool is ever intended, and under what
      privacy posture (none is currently implemented or requested)
- [ ] **Explicit release authorization** — a clear "yes" or "not yet" on moving any route beyond
      Building, separate from and in addition to every item above

---

## How to use this packet

Work through each checkbox at your own pace. Nothing here is time-boxed, and nothing auto-activates
when a box is checked — nothing on this list can execute an implementation change automatically.
Provided evidence should populate the corresponding proof-registry entry (see
`docs/mark-5-tmi-content-model-and-proof-registry.json` → `partB_proofRegistry`) in a future,
separately-scoped pass. This packet does not itself change `verificationStatus` on any entry.
