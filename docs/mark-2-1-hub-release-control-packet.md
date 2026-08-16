# Mark 2.1 Hub Release-Control Packet

Documentation only. This packet does not authorize a merge, deploy, DNS change, Cloudflare
setting, domain binding, form/analytics/CRM integration, or any external-service action. It adds
a precise, evidence-cited gate model on top of the existing `docs/ecosystem-release-matrix.md` and
`docs/mark-2-ecosystem-handoff.md` — it does not replace them, and nothing here was inferred
without a cited local source.

Companion machine-readable file: `docs/mark-2-1-hub-release-control-packet.json` (same content,
structured for future tooling).

## Gate model

| Gate | Meaning |
|---|---|
| **G0** | Ownership and repository control |
| **G1** | Branch/PR/review control |
| **G2** | Deployment-provider and preview verification |
| **G3** | Domain, DNS, custom-domain, and legacy-host conflict verification |
| **G4** | Public-output controls: robots, sitemap, canonical, metadata, redirects |
| **G5** | Claims, identity, and editorial approval |
| **G6** | Conversion, contact, tracking, privacy, and operational-readiness review |
| **G7** | Build, test, accessibility, link, and output-scan evidence |
| **G8** | Owner release authorization |

Status values used below: **Completed**, **Partially evidenced**, **Not evidenced**, **Not
applicable**, **Blocked by unavailable access**. No gate is marked Completed without a cited local
source; where evidence only covers code behavior and not an actual deployed URL, that distinction
is stated explicitly rather than implied.

## Terminology reconciliation

These definitions govern how the terms below should be read everywhere in this ecosystem's
documentation, including in `docs/ecosystem-release-matrix.md` and `docs/mark-2-ecosystem-handoff.md`
(both already used these terms in a manner consistent with the definitions here — see the dated
clarification notes added to each, below — this is a reconciliation of meaning, not a rewrite of
their content).

- **"Live candidate"** — eligible to pursue release only after every gate below reaches Completed
  and G8 (owner release authorization) is explicitly granted. **Does not mean currently live.**
  As of this packet, neither hub is live.
- **"Building" / "Private/Building"** — a real repository and/or active work exists; nothing is
  deployed to a public hostname the property claims as its own. Does not imply active services,
  responsiveness, enrollment, fulfillment, clinical support, legal advice, membership access, or
  transaction capability, regardless of code-level readiness.
- **"External storefront / internally unaudited"** (HERO) — the owner has indicated a real
  external property exists. Does not imply this project has verified its ownership, technical
  state, security, or operational status.
- **"Route under TMI"** — describes an intended navigational/informational relationship in the
  ecosystem map's presentation layer. Does not imply a currently deployed route or reachable
  destination unless that destination independently reaches G4 Completed.

---

## Hub gate matrix — texasmovement.com

**Intended classification**: Live (TMI umbrella / hub) · **Current recommended classification**:
Live candidate — release-ready pending open gates below, **not currently live**

| Field | Status / evidence |
|---|---|
| **Repository and branch evidence** | Completed. `movementconsultant/texasmovement.com`, branch `claude/texas-movement-rebuild-pq14fo`, HEAD `a53ec59bd8fbcb758ed6fe413c3778292c674b21` (verified via `git log` this session). |
| **PR state evidence** | Completed. PR #1 — open, draft, `mergeable_state: clean`, base `main@359f69d9…` unchanged, 12 commits (verified via GitHub API this session). |
| **Deployment-provider evidence** | Partially evidenced. Cloudflare Pages project **`texasmovement`** (account `c98bb3dd9f79a1a49ad9af7c44cd1259`) confirmed connected and auto-building; latest GitHub Check for the current commit: `completed`/`success` (GitHub Checks API, not Cloudflare credentials — this session has none). Preview URL content **not inspected** — `curl`/`WebFetch` both return `EGRESS_BLOCKED` for `*.pages.dev`. Production-branch setting not visible from here. |
| **Domain/DNS/custom-domain evidence** | Blocked by unavailable access. `public/CNAME` (content: `texasmovement.com`) confirmed present in this repo, copied into every `dist/` build — a legacy GitHub-Pages-era artifact and a real potential conflict with a Cloudflare custom-domain binding if GitHub Pages is ever enabled. GitHub Pages enabled/disabled state is unknown; DNS records are unknown. |
| **Current public-surface evidence** | Not applicable — no production deployment is confirmed reachable at `texasmovement.com` from this session. |
| **Indexing and crawl-control evidence** | Completed (code-level only). Re-verified this session via `npm run ci` in both `PUBLIC_PREVIEW` modes: preview → `noindex,nofollow` + `Disallow: /` + empty sitemap; production → no noindex tag, `Allow: /` + `Sitemap:` reference, 5-URL sitemap. |
| **Canonical/metadata evidence** | Completed (code-level only). Canonical tag omitted entirely in preview mode; real `https://texasmovement.com` canonical/OG/JSON-LD in production mode — confirmed by direct build inspection this session. |
| **Redirect and legacy-hosting conflict evidence** | Partially evidenced. `public/_redirects` contains a `www.texasmovement.com` → apex 301 rule, inert until the `www` custom domain is bound. Blocked on the same G3 CNAME/GitHub-Pages resolution above. |
| **Claims/editorial approval status** | Not evidenced. `docs/LAUNCH_BLOCKERS.md`: `hello@texasmovement.com` not operationally verified; LinkedIn Company Page URL unconfirmed (two candidates, neither approved); legal/org data (`stateOfFormation`/`formationYear`/`mailingAddress`) is `TBD`. |
| **Conversion/data-flow status** | Partially evidenced. `VERIFIED_INBOXES` empty (confirmed via `check-public-output.mjs`'s own printed state this session). No `/contact` page exists by design; the homepage's primary CTA slot correctly renders nothing. No fabricated address/endpoint anywhere (confirmed by source grep). |
| **Analytics/tracking status** | Completed. No analytics/tracking code exists anywhere in source (confirmed by inspection this session). |
| **Accessibility/technical-validation status** | Completed. Full `npm run ci` re-run this session: build (both modes), `check-public-output.mjs` (0 errors both modes), `check:constants --strict` (0 errors), 31/31 unit tests, axe-core (0 violations, 5 routes). |
| **Required owner decisions** | GitHub Pages state; DNS state; CNAME preserve/remove/replace decision; complete the 3-part `hello@texasmovement.com` verification (or accept the CTA stays absent); supply the LinkedIn URL; supply or defer legal/org data; explicitly grant G8. |
| **Required technical prerequisites** | Cloudflare custom-domain binding for apex + `www`; `PUBLIC_PREVIEW=false` as a production-only env var; confirm the project's production-branch setting. |
| **Explicit release blockers** | P0: CNAME/GitHub-Pages conflict risk unresolved. P0: no owner release authorization recorded. P1: inbox unverified. P1: LinkedIn URL unconfirmed. P2: legal/org data incomplete (blocks nothing currently rendered). |
| **Allowed public posture before release** | None currently authorized — no confirmed live deployment exists. A confirmed-noindex preview may be used for internal owner review only. |
| **Prohibited public posture before release** | Must not be represented as live, indexed, or reachable at `texasmovement.com`. No inbox/form/CTA presented as functional. No social/LinkedIn URL presented as confirmed. |
| **Exact evidence to close each gate** | See `docs/mark-2-1-hub-release-control-packet.json` → `hubs["texasmovement.com"].evidenceRequiredToCompleteEachGate` for the per-gate (G0–G8) breakdown. |

## Hub gate matrix — alexandermathai.com

**Intended classification**: Live (founder control tower) · **Current recommended
classification**: Live candidate — release-ready pending open gates below, **not currently live**

This repository was **not modified** to produce this packet. Every item below is read-only,
drawn from files already present in `/workspace/alexandermathai.com` and GitHub API calls made
this session.

| Field | Status / evidence |
|---|---|
| **Repository and branch evidence** | Completed. `movementconsultant/alexandermathai.com`, branch `claude/founder-control-tower-rebuild`, HEAD `1f753ed65371e61a5f9b22fc59e1f01b4a145923`. Frozen fallback (`claude/alexander-mathai-placeholder` / PR #1) confirmed untouched at `f0fc58a537bf350cda28434e4e54c3a097bfb6ce`. |
| **PR state evidence** | Completed. PR #2 — open, draft, `mergeable_state: clean`, base `main@3ad687933e…` unchanged, 8 commits. PR #1 independently confirmed open/draft/unmerged, unchanged. |
| **Deployment-provider evidence** | Partially evidenced. Cloudflare Pages project **`alexandermathai`** (same account `c98bb3dd9f79a1a49ad9af7c44cd1259`) confirmed connected, latest Check `completed`/`success`. Same preview-inspection and production-branch-visibility gaps as texasmovement.com. |
| **Domain/DNS/custom-domain evidence** | Not evidenced. No `CNAME` file exists anywhere in this repo (explicitly checked) — no GitHub-Pages-conflict risk specific to this repo. `www.alexandermathai.com` → apex redirect rule committed, inert until bound. Custom-domain binding state and DNS records unknown. |
| **Current public-surface evidence** | Not applicable — no confirmed reachable production deployment. |
| **Indexing and crawl-control evidence** | Completed (code-level only). A 60-test Playwright E2E suite (added and run this session) confirms: preview mode `noindex,nofollow` on every route (38/38 passed); production mode no noindex tag except the intentionally-noindexed `/404` (22/22 passed) — both against real built output. |
| **Canonical/metadata evidence** | Completed (code-level only). Every route's canonical confirmed via the same E2E suite to point at `https://alexandermathai.com`, never localhost/pages.dev. The sitemap was made lifecycle-aware this session (a real gap — it previously emitted the full production URL list even in preview mode — found and fixed); now confirmed absent in preview, present in production. |
| **Redirect and legacy-hosting conflict evidence** | Not evidenced (no known conflict, but unverified). `www` redirect rule committed; no other legacy hosting configuration identified for this repo, but this session cannot check DNS or any other platform. |
| **Claims/editorial approval status** | Not evidenced. `docs/CLAIMS_REVIEW.md` + `claims.registry.json`: 41 unique claims extracted from every rendered source. **40 pending**, 1 `documented` (the site's own self-referential architecture claim — directly verifiable from the repo alone, asserts nothing about the founder or TMI's business). |
| **Conversion/data-flow status** | Completed (inert by design). `/contact` has no submission endpoint of any kind (the `PUBLIC_CONTACT_ENDPOINT`/`fetch()` code path was removed this project) and `onsubmit="return false;"` blocks even a no-JS native submission. A dedicated E2E test submits valid fields and confirms no navigation/network request/implied-success message. The separate decision to connect a real backend remains open, by design. |
| **Analytics/tracking status** | Completed. No analytics/tracking code present (confirmed by inspection). |
| **Accessibility/technical-validation status** | Completed. `astro check` 0 errors; `prettier --check` clean; build both modes success; `postbuild-guard.mjs` 0 hard violations both modes + its claims audit shows all 41 claims found, only 2 benign unmapped candidates; axe-core 0 violations/9 routes; E2E 60/60. No unit-test suite exists in this repo (a gap relative to sibling repos, not addressed this pass). |
| **Required owner decisions** | Work through all 40 pending `docs/CLAIMS_REVIEW.md` items; decide the contact-form backend path; manually verify all 11 social URLs; confirm the `www` redirect/domain-binding plan; explicitly grant G8. |
| **Required technical prerequisites** | Cloudflare custom-domain binding for apex + `www`; `PUBLIC_PREVIEW=false` as a production-only env var; confirm production-branch setting. |
| **Explicit release blockers** | P0: 40/41 claims pending. P0: no owner release authorization recorded. P1: contact-backend decision undecided. P1: all 11 social URLs unverified. P2: no unit-test suite. |
| **Allowed public posture before release** | None currently authorized. Confirmed-noindex preview for internal owner review only. |
| **Prohibited public posture before release** | Must not be represented as live or indexed. No founder claim presented as owner-approved. Contact form not presented as functional. No social link presented as verified. |
| **Exact evidence to close each gate** | See the JSON companion → `hubs["alexandermathai.com"].evidenceRequiredToCompleteEachGate`. |

---

## Owner evidence request checklist

Grouped exactly as requested — copy/paste-ready, no message or external task created.

**GitHub/repository ownership**
- Confirm `movementconsultant` org ownership/admin access is retained by the intended owner.
- Confirm who has merge rights on texasmovement.com PR #1 and alexandermathai.com PR #2.

**Cloudflare Pages and custom-domain ownership**
- Confirm access to Cloudflare account `c98bb3dd9f79a1a49ad9af7c44cd1259` (both hub projects were
  found under this account this session).
- For each of the `texasmovement` and `alexandermathai` projects: production branch setting,
  existing custom-domain bindings, environment variables currently set.

**DNS and registrar ownership**
- Confirm who controls DNS for `texasmovement.com` and `alexandermathai.com`.
- Export current `A`/`ALIAS`/`CNAME` records for both apex domains and their `www` subdomains.

**Current live/legacy hosting surfaces**
- Confirm GitHub Pages → Settings → Pages source for `movementconsultant/texasmovement.com` (the
  `public/CNAME` conflict risk).
- Confirm whether any other legacy hosting currently serves either domain.

**Search/indexing visibility**
- If either domain was ever previously indexed, confirm what's currently indexed so a launch plan
  can account for stale results.

**Analytics and data collection**
- Confirm whether any analytics/tracking is desired post-launch, and which privacy-respecting
  service — none is wired into either repo today.

**Forms, inbox, booking, checkout, CRM, and webhooks**
- Confirm `hello@texasmovement.com` is provisioned, receives mail, and is monitored on a stated
  cadence (the 3-part test already defined in `docs/LAUNCH_BLOCKERS.md`).
- Confirm the alexandermathai.com contact-form backend decision (connect a real service, or
  supply a verified alternate address).
- Confirm no booking/checkout/CRM/webhook integration is expected at launch for either hub — none
  exists in either repo currently.

**Founder-claim approval for alexandermathai.com**
- Work through all 40 pending items in `docs/CLAIMS_REVIEW.md` (that repo) and return an
  Approve/Qualify/Remove decision for each.

**Legal/privacy/editorial owner review**
- Supply or explicitly defer texasmovement.com's legal/organization data.
- Confirm the canonical LinkedIn Company Page URL.
- Review the honest "policy content pending" stub language on both hubs' `/privacy` (and
  texasmovement.com's `/terms`, `/accessibility`) pages before those pages go live indexable.

---

## Safe interim posture

**texasmovement.com** — nothing may currently be represented as publicly visible; no production
deployment is confirmed to exist. The homepage's primary CTA slot must stay absent (already the
case) until the inbox is verified. Every ecosystem division link must stay non-clickable (already
enforced by `ECOSYSTEM_MAP`). TMI must not be represented as an organization with a live public
hub; no division as active/available/publishing beyond its current Building/Private badge; the
LinkedIn presence stays excluded from all output until confirmed.

**alexandermathai.com** — the frozen fallback (`claude/alexander-mathai-placeholder` / PR #1)
remains untouched, unmerged, and is not to be modified, closed, or deleted by any future pass
without explicit owner instruction. Every founder biography, metric, timeline, and credential
claim (41 total) remains pending owner decision — none may be treated as approved, confirmed, or
launch-safe until the owner explicitly marks it so in `docs/CLAIMS_REVIEW.md`. No production
deployment is confirmed to exist; same preview-only caveat as texasmovement.com applies.

**All non-hub verticals** — preserve every classification already recorded in
`docs/ecosystem-release-matrix.md` exactly as-is: Building (Consulting, Media, Performance,
Distribution, Social), Building/Private (FounderLink, Health, Reparations), External storefront /
internally unaudited (HERO). Neither hub may link to any of these as an active product, service,
or destination — both hubs' own code already enforces this (`ECOSYSTEM_MAP` badges,
`verified: false` gating). This posture requires no new action, only continued non-action.

---

## Terminology corrections made this pass

Reviewed `docs/ecosystem-release-matrix.md` and `docs/mark-2-ecosystem-handoff.md` for misleading
implications in "Live candidate," "Building/Private," "External storefront / internally
unaudited," and "Route under TMI." Both documents already qualified "Live candidate" as
"release-ready, not deployed" everywhere it appears — substantively aligned with the precise
definition above, not misleading on its own. Rather than rewrite that existing, accurate language,
a short **dated clarification note** was added to the top of each document pointing to this
packet's "Terminology reconciliation" section as the canonical definition going forward. No
historical statement, classification, or finding in either document was altered or removed.

## Validation performed this pass

- Both files (`docs/mark-2-1-hub-release-control-packet.json` and, where a JSON snippet appears,
  this file's prose) parsed/reviewed for consistency; the JSON file validated with
  `node -e "JSON.parse(...)"`.
- Every gate status in the matrices above was cross-checked against its cited evidence — no status
  is asserted without a specific local source (a file path, a command actually run this session,
  or a GitHub API response).
- This document was searched for: `live`, `verified`, `production`, `operational`, `safe`,
  `ready`, `launch`, `deploy`, `approved`. Every occurrence either names a future gate/state,
  is explicitly negated ("not live," "not currently live," "no confirmed live deployment"), or
  refers to a specific cited fact (e.g., a GitHub Check run's own `success` conclusion, which
  describes the Cloudflare build step succeeding — not the site being live).
- `git diff` for this change contains only documentation files (this file, its JSON companion, and
  the two dated clarification notes described above). No application, configuration,
  infrastructure, domain, form, analytics, or external-service file was modified.
