# Mark 18 (internal) — Sanitized Evidence Register

Internal-only. Not rendered, not imported, not linked from any public route.
Records every evidence artifact reviewed during Engagement 1 (the internal
Digital Ecosystem Audit dry run) and its sensitivity classification, per
this pass's explicit requirement to register excluded-evidence categories
before analysis and confirm nothing sensitive was touched.

## Inclusion criteria

An artifact was eligible for review if it is: repository-local, already
committed to `movementconsultant/texasmovement.com` on the working branch,
and does not fall into any exclusion category below. No external network
request, external dashboard, or external account was accessed.

## Exclusion criteria (categories, not instances — none of these were found or accessed)

| Category | Found in this repository? | Action taken |
|---|---|---|
| Legal/litigation material | No | N/A — none exists in this repository |
| Financial records, invoices, banking, tax, payment, damages, restitution | No | N/A |
| Credentials, secrets, tokens, keys, passwords, OAuth material | No — `RESEND_API_KEY` is referenced by name only (`env.RESEND_API_KEY`), never a value, per `docs/mark-18-contact-intake-implementation.md` | N/A — confirmed no literal secret value exists anywhere in source |
| Private account/dashboard data, analytics exports, messages, DMs | No | N/A |
| Client/prospect/contact/user/staff/partner personal information | No | N/A — this repository has never had a real client engagement |
| Medical, health, therapy, athlete injury/recovery, or clinical data | No | N/A |
| Political/candidate/campaign/voter data | No | N/A |
| Private external platform evidence | No | N/A |
| Any data outside repository-local, non-sensitive evidence | No | N/A |

**No excluded-category material was encountered, opened, copied, or
included anywhere in this audit's evidence base.** This register would
have been updated with a specific excluded-path entry had anything been
found; none was.

## Evidence artifacts reviewed

| Artifact/path | Sensitivity classification | Reason for inclusion | Commit/path reference | Owner/reviewer | Public-use status | Retention/review decision |
|---|---|---|---|---|---|---|
| `src/pages/**/*.astro` (all 15 routes) | public-source | Defines the actual public output | HEAD `8683d7d` at audit start | This session | internal-only | Retain — primary evidence for route findings |
| `src/lib/hub-routes.ts`, `src/lib/site.ts`, `src/lib/media-schema.ts`, `src/lib/media-destinations.ts` | public-source (governs public output) | Governance logic for routes/media/contact | HEAD `8683d7d` | This session | internal-only | Retain |
| `src/content/media/*.json` (3 files, 8 destinations) | public-source | Media governance data | HEAD `8683d7d` | This session | internal-only | Retain |
| `src/content/verticals/texas-movement-media.mdx` | public-source | Vertical manifesto content | HEAD `8683d7d` | This session | internal-only | Retain |
| `src/styles/global.css`, `src/layouts/Layout.astro` | public-source | Visual system / metadata emission | HEAD `8683d7d` | This session | internal-only | Retain |
| `scripts/check-public-output.mjs` | internal-non-sensitive | Public-output guard logic | HEAD `8683d7d` | This session | internal-only | Retain |
| `packages/constants/scripts/check.mjs` and its output | internal-non-sensitive | Drift/TBD scan logic and results | HEAD `8683d7d` | This session | internal-only | Retain |
| `packages/constants/src/org.ts`, `social.ts`, `ecosystem.ts` | internal-non-sensitive (contains `TBD` placeholders, not real sensitive data) | Source of truth for org facts and lifecycle status | HEAD `8683d7d` | This session | internal-only | Retain |
| `legacy/index.html` | internal-non-sensitive | Frozen historical snapshot, git-preserved per `docs/MIGRATION_INVENTORY.md` line 58 | HEAD `8683d7d` | This session | internal-only | Retain — flagged in findings, not excluded (contains only already-public-facing historical marketing copy, no real personal/financial/legal data) |
| `public/CNAME`, `public/_redirects`, `wrangler.toml` | internal-non-sensitive | Deployment-configuration-adjacent, non-secret | HEAD `8683d7d` | This session | internal-only | Retain |
| `dist/` (built output, both `PUBLIC_PREVIEW` modes) | public-source | Actual shippable output, generated locally this session | Build run this session, not committed (`dist/` is gitignored) | This session | internal-only | Not retained beyond this session — regenerable via `npm run build` |
| `tests/*.ts`, `tests/a11y.mjs` and their run output | internal-non-sensitive | Test coverage and pass/fail evidence | HEAD `8683d7d`; run output this session | This session | internal-only | Retain |
| `docs/**/*.md`, `docs/**/*.json` (all prior Marks' documentation) | internal-non-sensitive | Governance/decision history, source-of-truth cross-checking | HEAD `8683d7d` | This session | internal-only | Retain |
| `workers/contact-intake/src/worker.ts`, `wrangler.toml`, `README.md` | internal-non-sensitive | Undeployed Worker source, no secret values present | HEAD `8683d7d` | This session | internal-only | Retain |
| `package.json`, `package-lock.json` (both repos, dependency state only) | internal-non-sensitive | Dependency/vulnerability baseline | HEAD `8683d7d`; `npm audit`/`npm outdated` run this session | This session | internal-only | Retain |
| `git log` (commit history, messages, authorship metadata visible locally) | internal-non-sensitive | Provenance for the CNAME/legacy-file findings | Local git history at HEAD `8683d7d` | This session | internal-only | Retain |
| `alexandermathai.com` repository | **not-accessed** | Explicitly out of scope per this pass's restrictions; only this repository's own local documentation *about* AVM (Mark 13/14 decision records) was consulted | N/A | N/A | N/A | AVM repository itself was never opened, read, or modified in this pass |

## Explicit confirmation

No excluded-category material was accessed or copied. Every artifact
listed above is either public-facing source code/content already destined
for `dist/`, or internal governance documentation already committed to
this repository by prior Marks. `alexandermathai.com` was not accessed —
only this repository's own prior cross-references to it (which do not
contain AVM source code or content) were reviewed.
