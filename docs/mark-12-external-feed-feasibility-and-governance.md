# Mark 12 External Feed Feasibility, Governance, and Build-Reliability Audit

**DOCUMENTATION-ONLY AUDIT. No feed, fetch, API call, RSS parse, cache, fallback link, component,
route, schema, content record, secret, token, Worker, or proxy was added, modified, or evaluated
against a live endpoint in this pass.** Every finding below is either drawn from this repository's
existing, already-committed source, or is explicitly labeled an owner-provided hypothesis pending
evidence. Nothing here authorizes building any of the four proposed sources.

Companion machine-readable file: `docs/mark-12-external-feed-feasibility-and-governance.json`
(same content, structured). Companion internal documents:
`docs/internal/mark-12-owner-feed-evidence-request.md` (Part D checklists),
`docs/internal/mark-12-one-item-editorial-stress-test-plan.md` (Part E),
`docs/internal/mark-12-json-ld-audit-plan.md` (Part F) — none published on this site.

---

## Inspection findings (before any analysis)

- **Zero network calls exist anywhere in `src/`.** A repository-wide search for `fetch(`,
  `XMLHttpRequest`, and `process.env` found no matches; the only runtime-environment read anywhere
  is `import.meta.env.PUBLIC_PREVIEW`, a build-time static string flag, not a network call.
- **`astro.config.mjs` configures `output: "static"` with no server adapter.** Its own comment
  records that `@astrojs/cloudflare` (the adapter that would be needed for any Worker/edge-function
  behavior) was tried and deliberately dropped because nothing in this site needs SSR. No Worker,
  Pages Function, or proxy is configured anywhere in this repository today.
- **`scripts/check-public-output.mjs`** (the postbuild guard) checks six specific things — a `TBD`
  sentinel, unverified `mailto:` addresses, non-live-property sitemap/canonical/href references, a
  missing preview-mode noindex tag, and any `linkedin.com` string. **It does not currently scan for
  external fetch calls, API references, RSS references, embed scripts, or iframes** — those
  categories are simply absent from the codebase it scans, not actively detected by a dedicated
  check. This is noted as a gap for any future source-specific implementation task to close, not
  something this audit modifies.
- **The existing individual-media-item gate model (G-M1–G-M8,
  `docs/internal/mark-8-tmm-unified-media-feed-architecture.md` Part D) remains fully unmet for
  every item** — no record's `editorialStatus`, `rightsStatus`, `transcriptStatus`, or
  `ownerApprovalStatus` has ever left its cautious default. This audit adds no new individual item
  and does not alter that model.
- **`/media`'s eight confirmed source destinations (Mark 10/11) are unchanged.** They remain
  static, build-time, local-JSON-only records with no automated retrieval behavior of any kind.

---

## Part A — Feed feasibility matrix

Every field below describes an owner-provided hypothesis or a locally-evidenced fact about this
repository's own code — never an external fact about a platform's behavior, availability, or
policy, since no external call was made this pass.

### A1. Substack RSS → future founder-site "The Ledger"

- **Proposed source category:** Owner-hypothesized RSS feed at `https://texasmovement.substack.com/feed`.
- **Proposed destination site/route:** alexandermathai.com (founder repository — out of this
  repository's implementation scope), proposed section "The Ledger."
- **Proposed display mode:** Build-time fetch, three recent entries, title/date/static link,
  60-minute cache, static fallback link on retrieval failure — all owner-hypothesized, none built.
- **Source identity status:** Owner-confirmed at the source-destination level already (Mark 10/11:
  `texasmovement.substack.com` renders as the TMI-editorial destination on `/media`). The specific
  `/feed` endpoint's existence or shape has not been retrieved or inspected this pass.
- **Canonical source identifier status:** Publication URL known; RSS endpoint unconfirmed by any
  local evidence.
- **Owner authorization status:** Hypothesis proposed this task; no build authorization given.
- **Rights/attribution implications:** Requires an explicit decision on which article fields
  (title/date/excerpt/image/link) may be reproduced on a different site than the source, and under
  what attribution label.
- **Claims/metric implications:** None proposed (title/date/link only) — lowest claims exposure of
  the three automated proposals, provided scope holds to exactly those fields.
- **Accessibility implications:** Any excerpt/image field would need an alt-text and reading-level
  policy not yet defined.
- **Privacy/tracking implications:** Introduces a new build-time third-party network dependency;
  no tracking pixel proposed.
- **Network/build/runtime implications:** Would be the first network call this repository's build
  process has ever made.
- **Static-build compatibility:** Output would remain static HTML, but the build step itself would
  no longer be network-independent, unlike today.
- **Preview-build compatibility:** Open question — whether `PUBLIC_PREVIEW=true` builds should also
  fetch has not been decided or proven.
- **Production-build compatibility:** Same open question, unproven.
- **Caching requirement:** Owner-hypothesized 60 minutes; no caching mechanism exists anywhere in
  this repository today.
- **Failure behavior requirement:** Owner-hypothesized static fallback link; not yet proven to
  degrade a build gracefully.
- **Rate/cost/rate-limit concern:** Unevaluated — no request was made this pass.
- **Secret/credential requirement:** None anticipated for a public feed URL, unconfirmed.
- **Content freshness expectation:** 60 minutes hypothesized, against a site that currently has no
  freshness concept at all (content changes only at commit time).
- **Editorial review requirement:** Yes, in full — any auto-pulled title/excerpt is an individual
  content item requiring its own review, not covered by source-level confirmation.
- **Individual-item approval requirement:** Yes — full G-M1–G-M8 per item, unchanged by this audit.
- **Required owner evidence:** See `docs/internal/mark-12-owner-feed-evidence-request.md` Section A.
- **Required technical proof-of-concept:** An isolated, out-of-band test (not part of this task)
  proving reliable retrieval, graceful degradation to the fallback on failure, and reproducible
  output across repeated builds.
- **Required security/privacy approval:** Review of the new third-party build-time dependency
  against this repository's current zero-dependency posture (gate F6).
- **Required release-gate approval:** F0–F8 (Part C) plus this repository's existing release-
  authorization process; a separate, source-specific implementation task.
- **Recommended classification: Feasible after owner evidence.** The source identity is already
  owner-confirmed at the destination level; what remains is field scoping, a technical retrieval
  proof, and a build-reliability proof — not an identity question.
- **Explicit reason no implementation occurs in this pass:** This is a feasibility/governance audit
  only; the task brief explicitly prohibits any fetch, RSS parsing, component, route, cache, or
  fallback link in this pass.

### A2. GitHub REST/public-events → future founder-site "Live Systems / Proof of Work"

- **Proposed source category:** Owner-hypothesized public GitHub Events API endpoint,
  `https://api.github.com/users/movementconsultant/events/public`.
- **Proposed destination site/route:** alexandermathai.com (out of this repository's implementation
  scope), proposed section "Live Systems / Proof of Work."
- **Proposed display mode:** Build-time retrieval of PushEvent activity, repository name,
  abbreviated commit message, and a date/time representation, with a static fallback link — all
  owner-hypothesized.
- **Source identity status:** Owner-named account (`movementconsultant`); not independently
  confirmed this pass — no GitHub call was made.
- **Canonical source identifier status: Absent for this pass's purposes.** Which repositories are
  eligible for display and whether commit messages may be shown publicly are both unconfirmed.
- **Owner authorization status:** Hypothesis only.
- **Rights/attribution implications:** Commit messages and repository names can reveal
  internal/private work; requires explicit owner scoping of which repositories are eligible before
  any technical work begins.
- **Claims/metric implications:** "Proof of Work" framing risks implying an activity/productivity
  claim; must not present event frequency as a claim of current operational status.
- **Accessibility implications:** Timestamps and commit text need a plain-language rendering
  decision not yet defined.
- **Privacy/tracking implications:** Reveals account activity patterns; needs a policy on
  describing recency without implying continuous live activity.
- **Network/build/runtime implications:** New build-time dependency on a rate-limited third-party
  API.
- **Static-build / preview-build / production-build compatibility:** Same open questions as A1,
  unproven.
- **Caching requirement:** Not defined by the owner for this source.
- **Failure behavior requirement:** Owner-hypothesized static fallback link; unproven.
- **Rate/cost/rate-limit concern:** Explicitly flagged as a structural constraint. **No GitHub
  Personal Access Token is authorized for this task** — per the task brief, none was inspected,
  created, requested, or configured. An unauthenticated implementation would need to operate within
  whatever constraints an unauthenticated public-events request carries; this audit does not test,
  measure, or assert what those constraints are, since doing so would require making a request.
- **Secret/credential requirement:** Unresolved and explicitly out of scope for this task. Any real
  implementation may or may not require a token; that decision — and any credential handling —
  would require its own fully separate, explicitly owner-authorized task.
- **Content freshness expectation:** Owner-hypothesized "recent" window; no interval defined.
- **Editorial review requirement:** Yes — commit messages are free text and could contain internal
  notes or unintended disclosures; would need a filtering/review step before any message is shown.
- **Individual-item approval requirement:** Open architecture question — the existing G-M1–G-M8
  model was built for editorial media, not developer activity; whether individual commits/events
  fit that model as-is, or need their own gate definition, has not been decided.
- **Required owner evidence:** See `docs/internal/mark-12-owner-feed-evidence-request.md` Section B.
- **Required technical proof-of-concept:** Proof that retrieval works without a token within
  whatever limits apply, proof of graceful fallback, and proof that commit-message
  filtering/redaction is possible before any message is ever displayed.
- **Required security/privacy approval:** An explicit decision that no credential is required, or a
  fully separate task to authorize and safely store one — not performed here.
- **Required release-gate approval:** F0–F8, plus a decision on whether a new gate is needed for
  developer-activity items distinct from G-M1–G-M8.
- **Recommended classification: Not authorized.** No canonical-identifier confirmation, no field
  scoping, an unresolved credential question, and no proof this content type fits the existing
  item-approval model at all.
- **Explicit reason no implementation occurs in this pass:** The task brief separately and
  explicitly states no token is authorized; this pass is feasibility/governance only.

### A3. YouTube RSS → future TMI `/media` "Latest Signal"

- **Proposed source category:** Owner-hypothesized YouTube channel RSS feeds for the "Texas
  Movement Media" and "Texas Movement Performance" channels.
- **Proposed destination site/route:** texasmovement.com `/media`, proposed section "Latest
  Signal" — architecturally within this repository, though not authorized for implementation this
  pass.
- **Proposed display mode:** Build-time YouTube RSS parsing, up to four items, title/date/static
  link, locally controlled fallback destination cards — owner-hypothesized only.
- **Source identity status:** Owner-confirmed at the destination level already (Mark 10/11:
  `texasmovementmedia` and `texasmovementperformance` YouTube handles are owner-confirmed source
  destinations). **A channel ID — the identifier YouTube's RSS mechanism actually requires,
  distinct from the `@handle` used in profile URLs — has not been supplied.**
- **Canonical source identifier status: Absent.** Per this task's explicit instruction, no channel
  ID was or may be resolved by any means this pass (no search, browse, scrape, curl, or channel-
  page parse occurred); treated as absent pending owner-supplied evidence.
- **Owner authorization status:** Hypothesis only.
- **Rights/attribution implications:** Lower risk than third-party content (same organization
  already confirmed at the destination level), but still requires confirming allowed fields
  (title/date/thumbnail/link/description) versus prohibited fields (metrics, comments).
- **Claims/metric implications:** Must not display view/subscriber/like counts; the "Latest Signal"
  framing must avoid implying continuous activity.
- **Accessibility implications:** Thumbnails would need alt text; auto-pulled titles would need a
  readability check before display.
- **Privacy/tracking implications:** Same category concern as A1/A2 — a new build-time third-party
  network dependency, regardless of whether the specific feed format requires authentication.
- **Network/build/runtime implications:** Same structural concern as A1 — a new build-time fetch
  not currently present anywhere in this site.
- **Static-build / preview-build / production-build compatibility:** Same open questions as A1/A2.
- **Caching requirement:** Not defined by the owner for this source.
- **Failure behavior requirement:** Owner-hypothesized "locally controlled fallback destination
  cards" — notably, this description is closest of the three automated proposals to reusing the
  existing Mark 10/11 destination-card pattern as its own degradation path, which is a meaningful
  signal worth preserving in any future design, though still unproven and unbuilt.
- **Rate/cost/rate-limit concern:** Unevaluated — no request was made this pass.
- **Secret/credential requirement:** None anticipated for a public feed; unconfirmed. No token is
  authorized for this source either.
- **Content freshness expectation:** "Up to four items" was hypothesized; no explicit refresh
  interval was given (unlike Substack's 60 minutes) — flagged as an open question for owner input.
- **Editorial review requirement:** Yes — the same individual-item review applies to every
  auto-pulled video title/description.
- **Individual-item approval requirement:** Yes — full G-M1–G-M8 for any individual video surfaced.
- **Required owner evidence:** See `docs/internal/mark-12-owner-feed-evidence-request.md` Section C.
- **Required technical proof-of-concept:** Proof a channel ID's feed is retrievable, proof of
  graceful fallback, and proof the "up to four" truncation/ordering is deterministic across builds.
- **Required security/privacy approval:** Review of whether channel RSS could unintentionally
  surface unlisted or scheduled-content edge cases.
- **Required release-gate approval:** F0–F8 plus per-item G-M1–G-M8.
- **Recommended classification: Feasible after owner evidence.** Architecturally the most natural
  fit of the three automated proposals — `/media` and the destination-card pattern already exist in
  this repository — but still blocked on the missing channel ID and undefined field/caching/
  fallback scope.
- **Explicit reason no implementation occurs in this pass:** The task brief explicitly prohibits
  resolving a channel ID by any means and prohibits any fetch/parse/component/route/schema change
  in this pass.

### A4. Curated Instagram/TikTok → future founder/TMI "signal rails"

- **Proposed source category:** A manually maintained local JSON "signal rail" — explicitly **not**
  an automated feed; closest in kind to the static content-collection pattern already proven in
  Marks 9–11.
- **Proposed destination site/route:** Founder-curated signals on alexandermathai.com (out of this
  repository's implementation scope); TMI/vertical-curated signals on texasmovement.com
  (architecturally in scope, not authorized this pass).
- **Proposed display mode:** Not technically defined this pass — the owner proposed the general
  shape only; no schema, fields, or UI have been designed.
- **Source identity status:** The underlying accounts (Instagram/TikTok handles for TMM, founder,
  HERO) already exist as owner-asserted or owner-confirmed source-level records (Marks 8.1/10/11).
  A "curated highlight," however, is a distinct, item-level concept requiring its own evidence.
- **Canonical source identifier status:** Would be per-highlight (a specific post/video URL), not a
  channel/account identifier — no such per-item identifier exists anywhere in this repository yet.
- **Owner authorization status:** Proposed approach only; no schema or implementation authorized.
- **Rights/attribution implications:** Each curated highlight is effectively an individual media
  item requiring full rights/attribution review — arguably higher scrutiny than a source-level link,
  since any image/caption representation of platform content raises its own rights questions.
- **Claims/metric implications:** Must avoid displaying platform metrics (likes/views) as current.
- **Accessibility implications:** Any curated image/caption would need alt text and a readability
  pass.
- **Privacy/tracking implications:** Lowest of the four proposals — no runtime fetch, no third-party
  network dependency of any kind, since it is explicitly manual and local.
- **Network/build/runtime implications: None.** The only one of the four proposals introducing zero
  new network behavior, matching the architecture already proven in Marks 9–11 exactly.
- **Static-build / preview-build / production-build compatibility:** Fully compatible with the
  current architecture with no open questions — reuses the same content-collection pattern already
  proven for the 8 existing destination records.
- **Caching requirement:** None — no fetch exists to cache.
- **Failure behavior requirement:** None — nothing to fail, since there is no network call.
- **Rate/cost/rate-limit concern:** None.
- **Secret/credential requirement:** None.
- **Content freshness expectation:** Whatever cadence the owner manually updates the JSON at — no
  automated freshness expectation.
- **Editorial review requirement:** Yes, in full — every curated highlight is an individual item.
- **Individual-item approval requirement:** Yes, full G-M1–G-M8 per highlight.
- **Required owner evidence:** See `docs/internal/mark-12-owner-feed-evidence-request.md` Section D.
- **Required technical proof-of-concept:** Lowest bar of the four — reuses the exact pattern already
  proven in Marks 9–11 (a new content-collection schema and component, no fetch), so the remaining
  work is schema design and one cleared individual item, not a network-reliability proof.
- **Required security/privacy approval:** Minimal — no new third-party dependency; still needs the
  standard individual-item privacy/claims review.
- **Required release-gate approval:** F0–F3 and F6–F8 apply; F4/F5 (technical retrieval proof /
  build reliability) are not applicable since there is no fetch. Full G-M1–G-M8 per highlight.
- **Recommended classification: Feasible after owner evidence.** The lowest-friction of the four
  proposals — architecturally it is "more of what this repository already does," gated on
  per-highlight owner evidence, not a structural change.
- **Explicit reason no implementation occurs in this pass:** The task brief explicitly prohibits any
  JSON rail, schema, or component in this pass; governance/feasibility only.

---

## Part B — Architecture alternatives

Five alternatives, evaluated once (their properties are largely source-independent), followed by a
per-source applicability summary.

### B1. Static manual curation (the existing Mark 9–11 model)

- **Requires:** an owner-supplied evidence bundle per item/destination; a local content-collection
  record; a component update only if a new record shape is needed.
- **Trust-boundary crossing:** None — data originates locally, authored by a human, never fetched.
- **Secrets needed:** No.
- **Deployment fragility:** None added — identical to today's fully offline-capable build.
- **Can fail a build:** Only via a normal schema-validation failure, never a network condition.
- **Preview reproducibility:** Full — output is deterministic from committed source.
- **Stale content risk:** Present but transparent — content is stale exactly as long as the owner
  leaves it stale, with no illusion of freshness.
- **Source-metadata exposure risk:** Minimal — only what a human deliberately transcribes.
- **Retention/deletion policy:** Same as any committed file; no new policy needed.
- **Privacy posture change:** None.
- **Appropriate for TMI now:** Yes — this is the model already proven across Marks 9–11.
- **Appropriate for founder site later:** Yes, pending that repository's own review (not performed
  here).

### B2. Build-time network fetch (the model implicit in all three RSS/API hypotheses)

- **Requires:** a build-time HTTP client, a documented source URL, a fallback/cache/timeout policy,
  and a decision on whether preview and production builds both fetch.
- **Trust-boundary crossing:** Yes — the build environment reaches out to a third-party host and
  trusts whatever it returns, subject to parsing/sanitization.
- **Secrets needed:** Not necessarily for a public feed; GitHub's proposal specifically raises this
  question and remains unresolved.
- **Deployment fragility:** Yes — a build now depends on a third party's uptime, response shape,
  and reachability from the build environment.
- **Can fail a build:** Yes, unless a fallback is proven to degrade gracefully — exactly the proof
  gate F5 requires before any implementation.
- **Preview reproducibility:** At risk — two builds minutes apart could fetch different content,
  breaking the "identical output from identical source" property this build has always had.
- **Stale content risk:** Inverted from manual curation — content can go stale silently if a fetch
  is itself stale, cached, or failing without anyone noticing, unless failure is surfaced.
- **Source-metadata exposure risk:** Higher — raw third-party response fields (a full RSS item, a
  commit message) could carry more than intended for public display unless explicitly filtered.
- **Retention/deletion policy:** New — if fetched content is cached anywhere, a persistence/purge
  policy is needed.
- **Privacy posture change:** Yes — introduces a category of third-party network dependency this
  repository has never had (confirmed: zero `fetch()`/`XMLHttpRequest` calls anywhere in `src/`).
- **Appropriate for TMI now:** No — no gate F0–F8 has cleared for any source.
- **Appropriate for founder site later:** Only after a source-specific, owner-approved
  implementation request and full F0–F8 clearance in that repository — which this task cannot
  authorize or perform.

### B3. Server-side/Worker proxy

- **Requires:** standing up a Cloudflare Worker or Pages Function, a deployment/runtime change, and
  likely secret storage for any credential.
- **Trust-boundary crossing:** Yes, at runtime — a live request path would exist between a
  visitor's browser (or the edge) and a third party.
- **Secrets needed:** Likely, especially for GitHub if a token is ever used to raise rate limits.
- **Deployment fragility:** Highest of the five alternatives — a new deployable unit, new failure
  modes, new monitoring surface.
- **Can fail a build:** Less likely to fail the build; shifts risk to runtime failures instead.
- **Preview reproducibility:** Compromised differently — preview/production could hit the same live
  proxy or diverge if proxies are environment-specific.
- **Stale content risk:** Depends entirely on the proxy's own caching design — a new subsystem.
- **Source-metadata exposure risk:** Highest — a runtime proxy is a new attack surface and a new
  place secrets could leak if misconfigured.
- **Retention/deletion policy:** New and non-trivial — proxy-side caching/logging needs its own
  policy.
- **Privacy posture change:** Significant — genuinely new infrastructure, not a content change.
- **Appropriate for TMI now:** No.
- **Appropriate for founder site later:** Only as a last-resort option if build-time fetch proves
  technically infeasible, and only with its own dedicated infrastructure-change task — explicitly
  out of this task's and this repository's scope regardless (no Worker, adapter, or Cloudflare
  Pages Function is configured anywhere in this repository today).

### B4. Scheduled ingestion with stored local content

- **Requires:** a scheduled job, write access to the repository, a review/approval step before
  content merges, and the same field-scoping/rights work as any individual item.
- **Trust-boundary crossing:** Yes, but only at the scheduled-job boundary — once content is
  committed, the build itself stays fully local/offline again.
- **Secrets needed:** Possibly, depending on the source (same open GitHub-token question as B2).
- **Deployment fragility:** Moderate — the job can fail without affecting the live site (a failed
  run simply produces no new commit), but introduces new CI/automation surface.
- **Can fail a build:** No, if designed correctly — a failed ingestion run produces no commit, and
  the build proceeds from the last-known-good committed content.
- **Preview reproducibility:** Preserved — once content is committed, every build from that commit
  is identical, same as today.
- **Stale content risk:** Present but bounded and visible — the last commit date is the freshness
  signal, same as manual curation.
- **Source-metadata exposure risk:** Same as B2 — the ingestion step still needs field filtering
  before anything is committed.
- **Retention/deletion policy:** Needed — committed content persists in git history; a correction/
  removal policy is needed.
- **Privacy posture change:** Moderate — the job is a new automation surface, but the live site's
  runtime/build behavior stays as simple as today's.
- **Appropriate for TMI now:** No — still requires new automation infrastructure this task cannot
  authorize.
- **Appropriate for founder site later:** Possibly the strongest of the automated options if a real
  feed is ever pursued, since it preserves build reliability and reproducibility better than B2 or
  B3 — but still requires its own dedicated task; no such job is configured anywhere today.

### B5. No feed / source-destination-only index (the current Mark 10/11 model)

- **Requires:** nothing further — this is what exists today.
- **Trust-boundary crossing:** None.
- **Secrets needed:** No.
- **Deployment fragility:** None.
- **Can fail a build:** No, for feed-related reasons — schema validation only, as always.
- **Preview reproducibility:** Full.
- **Stale content risk:** None in the "silently wrong" sense — there is no individual content to go
  stale, only a static outbound link.
- **Source-metadata exposure risk:** Minimal — matches the already-audited Mark 10/11 model.
- **Retention/deletion policy:** Already governed by existing content-collection conventions.
- **Privacy posture change:** None.
- **Appropriate for TMI now: Yes — this is the current and recommended posture for every one of the
  four proposed sources until their respective evidence and gates clear.**
- **Appropriate for founder site later:** Same, pending that repository's own review.

### Per-source applicability summary

| Source | Current model (B5) | Recommended next step if pursued |
|---|---|---|
| Substack | In effect today | B1 stays viable indefinitely; B2 only after F0–F8 clear |
| GitHub | In effect today | Not authorized; B4 would preserve build reliability better than B2/B3 if ever pursued |
| YouTube | In effect today | B1 stays viable indefinitely; B2 only after F0–F8 clear (including the missing channel ID) |
| Curated Instagram/TikTok | In effect today | B1 is the natural, lowest-friction next step per cleared item |

### Default recommendation

**Manual curation (B1), or its zero-item variant (B5), remains the recommended current model for
all four proposed sources.** A build-time feed proof of concept (B2) may be considered later only
after one real item has cleared G-M1 through G-M8 and only with a source-specific, owner-approved
implementation request. **No automatic model (B2, B3, or B4) is recommended for immediate
implementation.**

---

## Part C — Feed-specific gates F0–F8

See `docs/mark-12-external-feed-feasibility-and-governance.json` for the full structured
definition of all nine gates (purpose, evidence required, controlled status vocabulary, common
blockers, required owner/technical roles, allowed disposition, expiration/revalidation rule, and
source-level-vs-item-level classification for each). Summary:

| Gate | Purpose | Level |
|---|---|---|
| F0 | Owner source authorization | Source |
| F1 | Canonical source identifier supplied | Source |
| F2 | Source/account access and ownership evidence | Source |
| F3 | Rights, attribution, and content-scope review | Source |
| F4 | Technical source retrieval proof | Source |
| F5 | Build reliability, cache, timeout, and fallback proof | Source |
| F6 | Privacy, tracking, and third-party-risk review | Source |
| F7 | Accessibility and editorial review | Source (re-checked per item) |
| F8 | Owner final release authorization | Source |

**Every gate explicitly notes that passing it does not, by itself, authorize a new route, API,
Worker, secret, deployment, or production release — each still requires its own separate,
explicitly scoped task, exactly as this task's own brief states.** F0–F8 govern whether a *source*
may ever be technically integrated; individual items pulled from a cleared source still separately
require the full, unchanged G-M1–G-M8 model.

---

## Part D, E, F — see companion internal documents

- Part D (owner evidence request checklists): `docs/internal/mark-12-owner-feed-evidence-request.md`
- Part E (one-item editorial stress-test plan): `docs/internal/mark-12-one-item-editorial-stress-test-plan.md`
- Part F (JSON-LD audit plan): `docs/internal/mark-12-json-ld-audit-plan.md`

---

## Explicit non-actions this pass

No fetch, curl, browse, scrape, parse, or call was made to any external URL, RSS feed, API, social
profile, Substack publication, YouTube channel, GitHub account, or GitHub repository. No channel
ID, token, secret, or Cloudflare environment variable was inspected, created, requested, saved, or
configured. No source code, component, route, content collection, local content entry, JSON rail,
package dependency, lockfile, configuration, script, GitHub Action, cron job, Worker, proxy,
adapter, or build step was added or changed. No existing source-destination confirmation status,
`/media` card, link gate, or visual UX was modified. No founder-site file was read or modified.
