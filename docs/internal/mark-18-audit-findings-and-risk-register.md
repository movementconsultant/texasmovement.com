# Mark 18 (internal) — Audit Findings and Risk Register

Internal-only. Not rendered, not imported, not linked from any public route.
Full prioritized P0–P3 register from Engagement 1 (the internal Digital
Ecosystem Audit dry run). Every finding cites exact repository paths,
commands, or documentation IDs. **A missing test is classified as a
validation gap, not proof of a defect**, per this pass's explicit
instruction.

---

## F-001 — CNAME / GitHub Pages deployment-target conflict remains unresolved

- **Category:** release
- **Evidence reference:** `public/CNAME` (content: `texasmovement.com`), confirmed copied verbatim into `dist/CNAME` on every build this session; `docs/mark-2-1-hub-release-control-packet.md` lines 65 and 76 ("P0: CNAME/GitHub-Pages conflict risk unresolved"); `wrangler.toml` root comment ("no Cloudflare account/project has been connected")
- **Severity:** P0
- **Confidence:** high
- **Risk statement:** A `CNAME` file in built output is meaningful only to GitHub Pages. If GitHub Pages is ever enabled for this repository (state unknown from this session), it could serve this repository's build in parallel with or instead of the intended Cloudflare Pages deployment, creating an unpredictable or conflicting live surface.
- **Why it matters:** This is not a new discovery — it was already flagged as a P0 blocker in an earlier session (Mark 2.1) and remains open, unresolved, and unverified through Marks 3–18. A risk that stays open across many audit passes without resolution or an explicit owner acceptance is itself a process finding, independent of the underlying technical risk.
- **Affected routes/files/docs:** `public/CNAME`, every built page (the file ships with every `dist/` build), `docs/mark-2-1-hub-release-control-packet.md`
- **Recommended next action:** Owner confirms GitHub Pages Settings → Pages source for this repository directly (not accessible from this session); then either (a) remove `public/CNAME` if GitHub Pages is not the intended path, or (b) document the deliberate dual-target design if it is.
- **Dependency:** Requires GitHub repository-settings access this session does not have.
- **Required owner decision:** GitHub Pages state confirmation; CNAME preserve/remove/replace decision (mirrors the exact open item already listed in `docs/mark-2-1-hub-release-control-packet.md` line 74).
- **Public-use implications:** Could affect which content is actually served at `texasmovement.com`, independent of anything this repository's own guards control.
- **Explicit non-action:** This audit did not check, change, or query GitHub Pages settings, DNS records, or Cloudflare configuration — all explicitly out of scope and outside this session's access.
- **Validation condition:** Resolved when the owner confirms GitHub Pages state and either removes `public/CNAME` or documents why it's intentionally retained.
- **Status vocabulary:** `owner-decision-required`

## F-002 — `legacy/index.html` carries unverified contact/social claims outside the build-output guard's direct scan scope

- **Category:** governance
- **Evidence reference:** `legacy/index.html` lines 848–982 region (Organization/ContactPoint JSON-LD): `"email": "Alexander@TexasMovement.com"` (unverified — not in `VERIFIED_INBOXES`), `"url": "https://founderlink.texasmovement.com"` labeled "Founder Intake" (FounderLink is currently Private/not-live), `"sameAs": ["https://www.linkedin.com/company/texas-movement-consulting", ...]` (an unconfirmed LinkedIn URL — the exact one `HELD_PENDING_CONFIRMATION` exists to block); `docs/MIGRATION_INVENTORY.md` line 58 confirms this file was deliberately preserved via `git mv` for history, not for serving.
- **Severity:** P0
- **Confidence:** high
- **Risk statement:** `scripts/check-public-output.mjs` scans only `dist/`, and this file is not part of the Astro build (`src/pages/` only) — so it is not scanned by 6 of the guard's 7 checks. The one exception: the guard's LinkedIn check (check 6) does scan whole-`dist/` text, but `legacy/index.html` is never copied into `dist/` by the build, so even that check does not cover this file directly. If this file were ever served as-is (e.g., a misconfigured static host serving the repository root instead of `dist/` — directly relevant to F-001's GitHub Pages ambiguity), its unverified email, LinkedIn URL, and "Founder Intake" framing would ship without passing through any of this repository's safety guards.
- **Why it matters:** The file's *purpose* (git-history preservation) is well-documented and legitimate. The *residual exposure risk* if it were ever accidentally served is not separately documented or mitigated by anything other than "don't point a host at the repo root" — a single point of failure that depends entirely on correct external deployment configuration this session cannot verify.
- **Affected routes/files/docs:** `legacy/index.html`, `docs/MIGRATION_INVENTORY.md`
- **Recommended next action:** Owner decides whether to (a) accept the current risk as adequately mitigated by deployment-target discipline alone, (b) add an explicit repository-level safeguard (e.g., a `.gitattributes`/CI check that fails if `legacy/` is ever included in a deploy target), or (c) relocate the historical snapshot outside the deployable tree entirely (e.g., a git tag/branch reference instead of a working-tree file).
- **Dependency:** Related to and partially resolved by F-001's GitHub Pages determination.
- **Required owner decision:** Whether the current mitigation (deployment-target discipline only) is sufficient, or whether an explicit guard is warranted.
- **Public-use implications:** Would present an unverified email as a working contact point and an unconfirmed LinkedIn URL as confirmed, if ever exposed — contradicts `CLAUDE.md` rules 2 and 5 exactly.
- **Explicit non-action:** This audit did not modify, remove, or relocate `legacy/index.html`, and did not extract or use its email/LinkedIn/URL content for any purpose beyond citing it as evidence here.
- **Validation condition:** Resolved when the owner's decision from "recommended next action" is implemented and verified.
- **Status vocabulary:** `observed`, `owner-decision-required`

## F-003 — Flagship commercial framework has zero populated evidence; Engagement 1 is its first real exercise

- **Category:** governance
- **Evidence reference:** `docs/internal/mark-17-proof-readiness-and-case-study-gates.md` (proof-candidate template, delivered blank); `docs/mark-17-flagship-commercial-operating-system.md` Part A (no owner decision recorded yet on flagship designation)
- **Severity:** P1
- **Confidence:** high
- **Risk statement:** No engagement-scope agreement template exists (`docs/internal/mark-17-digital-ecosystem-audit-delivery-blueprint.md` Phase 1 lists this as a dependency that "does not exist yet"). Engagement 2 cannot begin under the same documented conditions until this gap closes.
- **Why it matters:** This is the expected state at this stage, not a defect — but it is the single largest blocker to a real (non-dry-run) Engagement 1 or 2.
- **Affected routes/files/docs:** `docs/internal/mark-17-digital-ecosystem-audit-delivery-blueprint.md`, `docs/internal/mark-17-proof-readiness-and-case-study-gates.md`
- **Recommended next action:** Owner (or a future task, if separately authorized) drafts an actual engagement-scope agreement template.
- **Dependency:** None — purely a documentation-authoring task once authorized.
- **Required owner decision:** Whether to author this template now or defer until closer to a real Engagement 1.
- **Public-use implications:** None directly — purely internal process readiness.
- **Explicit non-action:** This audit did not draft a contract or agreement template — that is explicitly out of this pass's scope.
- **Validation condition:** Resolved when a reviewed template exists.
- **Status vocabulary:** `blocked`, `owner-decision-required`

## F-004 — Rate limiting on the contact-intake Worker fails open by design, undeployed

- **Category:** security-placeholder
- **Evidence reference:** `workers/contact-intake/src/worker.ts` `checkRateLimit()` — "if (!env.RATE_LIMIT_KV) { ... return true; }"; `docs/mark-18-contact-intake-implementation.md` "Rate limiting" section; confirmed via `npx tsc --noEmit` in `workers/contact-intake/` — 0 errors, this session
- **Severity:** P1
- **Confidence:** high
- **Risk statement:** If `PUBLIC_CONTACT_ENDPOINT` is ever set without first provisioning the KV namespace, the deployed Worker will accept unlimited requests per IP.
- **Why it matters:** This is a known, disclosed limitation (not a hidden defect), but it is a real P0-adjacent risk in isolation from the current inert-by-default gating — it only reaches P1 because `PUBLIC_CONTACT_ENDPOINT` is currently unset everywhere, keeping the whole path inert.
- **Affected routes/files/docs:** `workers/contact-intake/src/worker.ts`, `src/pages/contact.astro`
- **Recommended next action:** Provision `RATE_LIMIT_KV` in the same deployment step that ever sets `PUBLIC_CONTACT_ENDPOINT` to a real value — already documented as a required step in `docs/mark-18-contact-intake-implementation.md`'s deployment checklist, re-confirmed current here.
- **Dependency:** Cloudflare account access this session does not have.
- **Required owner decision:** None beyond following the already-documented deployment checklist when the time comes.
- **Public-use implications:** None currently — the endpoint is inert.
- **Explicit non-action:** This audit did not deploy the Worker, provision KV, or set any environment variable.
- **Validation condition:** Resolved when `RATE_LIMIT_KV` is bound before or at the same time as `PUBLIC_CONTACT_ENDPOINT` activation.
- **Status vocabulary:** `documentation-only`, `restricted`

## F-005 — Unoptimized/potentially-unreferenced large image assets inflate build weight

- **Category:** performance
- **Evidence reference:** `docs/internal/mark-17-ux-performance-baseline-plan.md` §4a (TMI dist 2.8M vs. AVM 596K); this session's `find dist -type f \( -name "*.png" ... \) -exec du -h` re-confirms `07_tmi_monogram_badge_transparent.png` (332K), `07_tmi_monogram_badge.png` (256K), `logo.png` (220K), `01_primary_stacked_transparent.png` (220K), and 4 more in the 160–220K range, all in `public/`
- **Severity:** P1
- **Confidence:** medium (whether every listed asset is actually referenced from a built page was not determined this session — flagged as a validation gap, not confirmed dead weight)
- **Risk statement:** If any of these are unreferenced, they inflate deploy size for no benefit; if referenced but unoptimized, they inflate page weight and could affect LCP on pages that use them (e.g. the homepage's `hero-figure` banner).
- **Why it matters:** Directly relevant to the future-target LCP guidance in `docs/internal/mark-17-ux-performance-baseline-plan.md` (≲2.5s) — large unoptimized images are a common cause of LCP regressions.
- **Affected routes/files/docs:** `public/*.png` (8+ files >150K), `src/pages/index.astro` (hero banner), `src/layouts/Layout.astro` (OG image references)
- **Recommended next action:** A future task cross-references every `public/*.png` filename against actual `<img>`/OG-image usages in `src/` to determine which are live vs. orphaned, then compresses or removes accordingly.
- **Dependency:** None technical; needs to be scheduled.
- **Required owner decision:** None — a routine technical-quality task once prioritized.
- **Public-use implications:** Could affect real-world page-load performance once deployed.
- **Explicit non-action:** No image was compressed, removed, or modified in this audit.
- **Validation condition:** Resolved when a follow-up task confirms asset-to-usage mapping and optimizes or removes unreferenced files.
- **Status vocabulary:** `not-verified`

## F-006 — `docs/pr-screenshots/` is a self-documented, orphaned review artifact

- **Category:** documentation
- **Evidence reference:** `docs/pr-screenshots/README.md` ("Safe to delete after the PR is reviewed/merged — these aren't part of the site, just review artifacts."); confirmed via grep this session that no `src/` or `docs/*.md` file references this directory; PR #1 (the original rebuild PR this was captured for) merged into `main` per this session's own earlier Mark 18 branch-restart work
- **Severity:** P3
- **Confidence:** high
- **Risk statement:** None — purely repository hygiene. The directory contains 6 PNG screenshots and its own README explicitly marking itself as disposable.
- **Why it matters:** Low-risk, but the PR it was captured for has already merged (confirmed this session's own git history), so its stated deletion condition has already been met.
- **Affected routes/files/docs:** `docs/pr-screenshots/*`
- **Recommended next action:** Owner or a future cleanup task deletes the directory.
- **Dependency:** None.
- **Required owner decision:** Confirm deletion is acceptable (low-stakes, self-documented as safe).
- **Public-use implications:** None — never part of any build output.
- **Explicit non-action:** This audit did not delete this directory.
- **Validation condition:** Resolved when removed or explicitly retained by owner choice.
- **Status vocabulary:** `observed`

## F-007 — `src/lib/site.ts:273` hardcodes an email string inline rather than sourcing from `@tmi/constants`

- **Category:** technical quality
- **Evidence reference:** `packages/constants/scripts/check.mjs` drift-warning output, this session: `! src/lib/site.ts:273 hard-codes a domain — import it from @tmi/constants instead`; source line: `const general = "hello@texasmovement.com"; // INBOXES.general`
- **Severity:** P2
- **Confidence:** high
- **Risk statement:** Functionally inert today — `isVerifiedInbox()` gates this value against the empty `VERIFIED_INBOXES` set, so it never renders. The risk is purely architectural-consistency drift, not an active exposure.
- **Why it matters:** This repository otherwise enforces "every fact flows through `@tmi/constants`" as a hard rule (`CLAUDE.md` rule 6); this is the one live-code exception, flagged by the repo's own drift scanner and never resolved.
- **Affected routes/files/docs:** `src/lib/site.ts`
- **Recommended next action:** Move the literal string into `packages/constants/src/social.ts` or a dedicated inbox-constants file, imported by `site.ts`.
- **Dependency:** None.
- **Required owner decision:** None — a routine internal-consistency fix once prioritized.
- **Public-use implications:** None currently.
- **Explicit non-action:** This audit did not modify `site.ts`.
- **Validation condition:** Resolved when `check:constants`'s drift-warning count no longer includes this line.
- **Status vocabulary:** `observed`

## F-008 — 8 unconfirmed (`TBD`) org/social facts remain, tracked but still open

- **Category:** governance
- **Evidence reference:** `packages/constants/scripts/check.mjs` output, this session: `org.ts:18/19/22/25` (`stateOfFormation`, `formationYear`, `street`, `postalCode`), `social.ts:80/81/124/125` (2 handle/url pairs); cross-referenced against `docs/LAUNCH_BLOCKERS.md`, which already tracks these
- **Severity:** P1
- **Confidence:** high
- **Risk statement:** None new — these are correctly held as `TBD` (never guessed), and `check-public-output.mjs` fails the build if `TBD` ever leaks into `dist/` (confirmed: it does not, in either build mode this session).
- **Why it matters:** These are the same items previously tracked; re-confirming they remain accurately un-filled (not silently resolved with a guess, not silently forgotten) is itself a useful audit outcome.
- **Affected routes/files/docs:** `packages/constants/src/org.ts`, `packages/constants/src/social.ts`, `docs/LAUNCH_BLOCKERS.md`
- **Recommended next action:** No code action — awaiting owner-supplied facts per `docs/LAUNCH_BLOCKERS.md` and `docs/mark-5-owner-evidence-request-packet.md`.
- **Dependency:** Owner-supplied real facts.
- **Required owner decision:** Supply the actual values, or explicitly accept they remain open indefinitely.
- **Public-use implications:** None currently — none of these values have leaked into public output.
- **Explicit non-action:** No `TBD` was filled in by this audit.
- **Validation condition:** Resolved when the owner supplies real values or the fields are formally deferred.
- **Status vocabulary:** `blocked`, `owner-decision-required`

## F-009 — No automated WCAG 2.2 conformance evaluation exists; only axe-core's rule subset

- **Category:** accessibility
- **Evidence reference:** `tests/a11y.mjs` uses `@axe-core/playwright` with `wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa` tags only (not WCAG 2.2-specific rules); `docs/internal/mark-16-source-review-cards.md` MK16-SRC-01/02 note no internal WCAG 2.2 evaluation has occurred
- **Severity:** P2
- **Confidence:** high
- **Risk statement:** None currently known — 0 violations were found across all 15 routes this session under the existing rule set — but "0 violations under axe-core's WCAG 2.1 rule subset" is not the same claim as "WCAG 2.2 conformant."
- **Why it matters:** This is exactly the distinction `docs/internal/mark-15-public-claims-boundary-guide.md` warns against collapsing — a real, useful automated test result should never be silently upgraded into a broader conformance claim.
- **Affected routes/files/docs:** `tests/a11y.mjs`
- **Recommended next action:** If a WCAG 2.2-specific conformance claim is ever desired, run a manual evaluation using the WCAG-EM methodology (`docs/internal/mark-16-source-review-cards.md` MK16-SRC-02) rather than assuming axe-core's current rule set covers it.
- **Dependency:** None technical.
- **Required owner decision:** None currently — only relevant if/when a conformance claim is considered.
- **Public-use implications:** No current public claim exists to correct; this is a preventive finding.
- **Explicit non-action:** No new accessibility rule set or tool was added.
- **Validation condition:** N/A unless a conformance claim is proposed.
- **Status vocabulary:** `not-verified`

## F-010 — No Lighthouse or Core Web Vitals field-data measurement tooling exists

- **Category:** performance
- **Evidence reference:** `npx --no-install lighthouse --version` failed this session (package not installed); `docs/internal/mark-17-ux-performance-baseline-plan.md` §4b already documents this and a manual DevTools alternative
- **Severity:** P2
- **Confidence:** high
- **Risk statement:** None currently claimed — no score has ever been asserted for either site.
- **Why it matters:** A pure validation gap (no tool = no measurement), not a defect. Restated here because the audit brief explicitly names this as a review area.
- **Affected routes/files/docs:** N/A — no file
- **Recommended next action:** Use the manual DevTools method already documented in Mark 17 when a real measurement is next needed; do not add a `lighthouse` dependency without a separate authorization (this repository's non-negotiable restrictions prohibit adding dependencies in a documentation-only pass).
- **Dependency:** None.
- **Required owner decision:** None currently.
- **Public-use implications:** None.
- **Explicit non-action:** No tool was installed this session.
- **Validation condition:** N/A.
- **Status vocabulary:** `not-verified`

## F-011 — Dev-dependency majors available (`@types/node`, `typescript`), non-urgent

- **Category:** technical quality
- **Evidence reference:** `npm outdated` this session: `@types/node` 22.20.1 → 26.2.0 latest; `typescript` 5.9.3 → 7.0.2 latest; `npm audit --omit=dev` this session: **0 vulnerabilities**
- **Severity:** P3
- **Confidence:** high
- **Risk statement:** None — dev-only, zero production vulnerabilities.
- **Why it matters:** Routine maintenance hygiene, not a release blocker.
- **Affected routes/files/docs:** `package.json`, `package-lock.json`
- **Recommended next action:** Schedule a periodic dependency-review task (already a line item in `docs/internal/mark-17-weekly-operating-scorecard.md` §3).
- **Dependency:** None.
- **Required owner decision:** None.
- **Public-use implications:** None.
- **Explicit non-action:** No dependency was upgraded this audit.
- **Validation condition:** N/A — informational.
- **Status vocabulary:** `observed`

## F-012 — Public-output controls verified effective against every tested pattern

- **Category:** technical quality
- **Evidence reference:** This session's direct `dist/` searches, both `PUBLIC_PREVIEW` modes: zero `mailto:`, zero `tel:`, zero `<iframe>`, exactly one gated `<form>` (`/contact`), zero unqualified checkout/payment strings (both hits inside HERO's own negation disclosure), exactly 2 JSON-LD `<script>` blocks per page (14 routes checked, consistent Organization+WebSite pattern from `Layout.astro`), zero `github.io` references
- **Severity:** P3 (this is a positive finding, recorded for completeness, not a risk)
- **Confidence:** high
- **Risk statement:** None — this is confirmation the existing guard system works as designed against every pattern this audit's required search list specified.
- **Why it matters:** A systematic audit should record what's *working*, not only what's broken — this directly answers the audit question "Are public-output controls enough to prevent accidental contact, conversion, source, claims, or infrastructure exposure?" with a qualified yes, for every pattern actually tested.
- **Affected routes/files/docs:** All 15 built routes
- **Recommended next action:** None required; maintain existing test/guard coverage as new routes are added.
- **Dependency:** None.
- **Required owner decision:** None.
- **Public-use implications:** Positive — confirms current safety posture for tested patterns.
- **Explicit non-action:** N/A.
- **Validation condition:** Already satisfied; re-verify on every future build via existing `npm run ci`.
- **Status vocabulary:** `observed`

---

## Summary by severity

| Severity | Count | Finding IDs |
|---|---|---|
| P0 | 2 | F-001, F-002 |
| P1 | 4 | F-003, F-004, F-005 (medium confidence), F-008 |
| P2 | 3 | F-007, F-009, F-010 |
| P3 | 3 | F-006, F-011, F-012 |

## Explicit non-actions across this entire register

No finding above resulted in a code change, a documentation edit outside
this Mark 18 deliverable set, a deletion, a dependency change, or any
infrastructure/deployment action. Every recommended next action is
deferred to a future, separately authorized task.
