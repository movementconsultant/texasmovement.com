# Mark 18 (internal) — Future-State Architecture and Roadmap

Internal-only. Not rendered, not imported, not linked from any public route.
Derived directly from the findings in
`docs/internal/mark-18-audit-findings-and-risk-register.md`. Describes the
**smallest coherent next-state architecture** — no vertical expansion is
recommended beyond what's needed to resolve a documented contradiction, and
Digital Ecosystem Audit and Architecture remains the single commercial
center throughout.

## P0 — Safety, truthfulness, accidental exposure, ownership contradictions

| ID | Priority | Category | Problem | Action | Evidence basis | Owner | Dependency | Execution type | Public-impact posture | Validation criteria | Explicit approval requirement |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R-001 | P0 | release | GitHub Pages/CNAME deployment-target ambiguity, unresolved since Mark 2.1 | Confirm GitHub Pages state; decide CNAME preserve/remove/replace | F-001 | Repository owner | GitHub Settings access | owner decision | No public-impact until resolved (currently no confirmed live deployment) | Owner confirms Pages state and CNAME decision is documented | Requires owner's own GitHub account access — not delegable to this session |
| R-002 | P0 | governance | `legacy/index.html` unverified contact/social claims sit outside the dist-scoped guard's direct coverage | Owner decides on additional safeguard (explicit deploy-exclusion check, relocation, or accepted-risk documentation) | F-002 | Repository owner | Depends on R-001's outcome | owner decision, possibly code (if a guard is added) | No public-impact until/unless the deployment-target ambiguity in R-001 is realized | A documented decision exists and (if a guard is added) it passes `npm run ci` | Any code change implementing a guard requires a separate authorized task |

## P1 — Flagship commercial delivery preparation, media stress test, UX/performance remediation, owner decisions, proof gates

| ID | Priority | Category | Problem | Action | Evidence basis | Owner | Dependency | Execution type | Public-impact posture | Validation criteria | Explicit approval requirement |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R-003 | P1 | governance | No engagement-scope agreement template exists | Draft a template (documentation only, no real client data) | F-003 | Owner or a future authorized task | None | documentation | None — internal only | Template exists and is reviewed | Requires explicit authorization to begin drafting, per this repository's "do not create a contract" restriction unless separately scoped |
| R-004 | P1 | security-placeholder | Contact-intake Worker rate limiting fails open without KV | Provision `RATE_LIMIT_KV` before/with any real `PUBLIC_CONTACT_ENDPOINT` activation | F-004 | Repository owner | Cloudflare account access | infrastructure | None currently — endpoint is inert | KV bound before endpoint goes live | Requires Cloudflare account access this session does not have |
| R-005 | P1 | governance | 8 org/social facts remain `TBD` | Owner supplies real values or explicitly defers | F-008 | Repository owner | Owner-supplied facts | owner decision | None currently — values never leak into `dist/` | Values are supplied or formally deferred with a documented reason | Per `CLAUDE.md`, filling any `TBD` requires explicit owner approval |
| R-006 | P1 | performance | Large, possibly-unreferenced brand-asset PNGs inflate build weight | Cross-reference every `public/*.png` against actual usage; compress or remove | F-005 | A future authorized task | None | code | Could improve real-world LCP once deployed | Asset-to-usage map complete; unreferenced files removed or referenced files compressed | Requires a separate authorized code-change task (out of scope for this documentation-only pass) |
| R-007 | P1 | technical quality | `docs/pr-screenshots/` is a self-documented orphaned artifact whose deletion condition (PR merged) has already been met | Delete the directory | F-006 | Owner or a future authorized task | None | code (deletion) | None — never part of any build output | Directory removed, `git status` clean | Requires a separate authorized task since this pass is documentation-only and adds no deletions |
| R-008 | P1 | governance | One-item editorial stress test (planned in Mark 12) has not been executed | Owner reviews `docs/internal/mark-12-one-item-editorial-stress-test-plan.md` and decides whether/when to run it | Referenced in `docs/internal/mark-17-weekly-operating-scorecard.md` §2 | Repository owner | None | owner decision | None currently | Plan reviewed and a decision recorded | None beyond owner review |

## P2 — Controlled specialist vertical readiness

| ID | Priority | Category | Problem | Action | Evidence basis | Owner | Dependency | Execution type | Public-impact posture | Validation criteria | Explicit approval requirement |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R-009 | P2 | technical quality | `src/lib/site.ts:273` hardcodes an email string instead of sourcing from `@tmi/constants` | Move the literal into a constants file | F-007 | A future authorized task | None | code | None — value is gated inert regardless | `check:constants` drift-warning count drops by one | Requires a separate authorized code-change task |
| R-010 | P2 | accessibility | No WCAG 2.2-specific conformance evaluation has been run (only axe-core's WCAG 2.1 rule subset) | Run a manual WCAG-EM-methodology evaluation, only if/when a conformance claim is ever considered | F-009 | Owner, if pursued | MK16-SRC-01/02 sources | professional review | None — no current claim exists | Evaluation completed and documented, if pursued | Requires an accessibility specialist per `docs/internal/mark-16-restricted-domain-boundary-addendum.md`'s general specialist-review discipline |
| R-011 | P2 | performance | No Lighthouse/Core Web Vitals field-data tooling exists | Use the manual DevTools method already documented in Mark 17 when next needed | F-010 | Owner or a future authorized task | None | operations | None — no score is currently claimed | A dated snapshot document exists when first run | None to observe; adding actual `lighthouse` tooling would require separate dependency-addition authorization |
| R-012 | P2 | strategy | Performance vertical's scope-of-practice boundary (education vs. coaching) is documented in Mark 16/17 but not yet reflected in any route-level copy | Owner reviews whether `/performance`'s current stub copy needs alignment with the documented boundary | `docs/internal/mark-16-restricted-domain-boundary-addendum.md`; `/performance` route content (not separately audited for wording in this pass) | Repository owner | None | owner decision, possibly content | Could affect public copy on `/performance` | Owner reviews and confirms alignment or requests a content-update task | Any content change requires a separate authorized task |

## P3 — Governed incubation, infrastructure-as-code, broader automation, post-proof expansion

| ID | Priority | Category | Problem | Action | Evidence basis | Owner | Dependency | Execution type | Public-impact posture | Validation criteria | Explicit approval requirement |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R-013 | P3 | technical quality | Dev-dependency majors available (`@types/node`, `typescript`), zero production vulnerabilities | Schedule a periodic dependency-review task | F-011 | A future authorized task | None | code | None | Dependencies reviewed and updated if appropriate | Requires a separate authorized code-change task |
| R-014 | P3 | strategy | Health, FounderLink, Social/Gather, Reparations remain governed/incubation with no defined activation path | No action recommended — correctly held per existing documentation | `docs/internal/mark-16-restricted-domain-boundary-addendum.md`; `docs/ecosystem-release-matrix.md` | N/A — status quo is correct | N/A | owner decision (deferred indefinitely by design) | None | N/A — this is a "do not act" item, recorded for completeness | Opening any of these domains requires the owner decisions documented in Mark 15/16, not this roadmap |
| R-015 | P3 | strategy | Founder/Operator Advisory capability hypothesis remains deferred/hold | No action recommended — status quo is correct per `docs/mark-17-flagship-commercial-operating-system.md` Part A | Mark 17 default recommendation | N/A | Flagship proof from Engagement 1–3 | owner decision (deferred) | None | N/A | Revisit only after the flagship itself has repeatable proof |

## Explicit statement on vertical expansion

**No new vertical, route, or capability is recommended by this roadmap.**
R-012 is the only item touching a vertical beyond Consulting/the flagship
itself, and it recommends a *content-alignment review*, not an expansion —
consistent with this pass's instruction to keep Digital Ecosystem Audit and
Architecture as the single commercial center and only touch other
verticals to resolve a documented contradiction (in this case, between the
Mark 16 restricted-domain boundary and `/performance`'s existing copy,
which was flagged but not itself re-audited for wording in this pass).
