# Mark 4 TMI Hub Route Architecture and Safe Scaffold Specification

Local code-and-content-structure pass on the existing draft PR branch. Not a launch, deployment,
domain, DNS, claims-expansion, conversion, or external-platform task. Every new route below is
safely inert by construction: no form, booking flow, checkout, mailto/tel link, external link,
embedded video/social content, analytics, or tracking pixel was added anywhere in this pass.

Companion machine-readable file: `docs/mark-4-tmi-hub-route-specification.json` (same content,
structured, including the full per-route field set requested).

**Infrastructure context** (owner-confirmed): the ecosystem now runs on exactly two canonical
Cloudflare Pages projects/repositories — `texasmovement` (this repo, `texasmovement.pages.dev`) and
`alexandermathai` (`movementconsultant/alexandermathai.com`, not touched by this task). Former
`tmi-*` Cloudflare Pages projects are not present in the dashboard and are not treated as retained,
available, or recoverable anywhere in this document. Every route below is a local **path** under
`texasmovement.com` itself (e.g. `/consulting`), never a link to a `*.texasmovement.com` subdomain —
see "Architecture note" below for why that matters against the vendored `@tmi/constants` package.

## Route decision matrix

| Route | Status | Nav | Indexability | Conversion | Claims risk | Data risk | Evidence needed for active state |
|---|---|---|---|---|---|---|---|
| `/` | Existing, unmodified | Brand/home link | Indexable in production, noindex in preview | One conditional CTA, currently absent (no verified inbox) | Low | None | N/A — already the real homepage |
| `/about` | New this pass | Primary nav | Indexable in production, noindex in preview | None | Low | None | N/A — descriptive page, not an offer |
| `/ecosystem` | New this pass | Primary nav | Indexable in production, noindex in preview | None (internal links only) | Low–medium | None | N/A — map page; see each vertical's own row |
| `/consulting` | New this pass | Primary nav | Indexable in production, noindex in preview | None | Low | None | Service packages, proof, intake ops, commercial terms |
| `/media` | New this pass | Primary nav | Indexable in production, noindex in preview | None | Low | None | Verified metrics, channel assets, media kit |
| `/performance` | New this pass | Primary nav | Indexable in production, noindex in preview | None | Low | None | Methodology, liability posture, intake ops, legal review |
| `/distribution` | New this pass | Not in primary nav (owner instruction) | Indexable in production, noindex in preview | None | Low | None | Distribution playbook, packaging checklist |
| `/hero` | New this pass | Not in primary nav (owner instruction) | Indexable in production, noindex in preview | None — zero `<a>` elements | Low | None | The 5 HERO audit-evidence items from Mark 2 (storefront location, platform, claims audit, a11y/tech pass, owner sign-off) |
| `/partners` | New this pass | Not in primary nav (owner instruction) | Indexable in production, noindex in preview | None | Low | None | Inbox ownership, response ops, privacy terms, routing logic |
| `/contact` | **Does not exist in this repository** | N/A | N/A | N/A — closest analog is the homepage's conditional CTA, currently absent | N/A | N/A | Out of scope; see `docs/LAUNCH_BLOCKERS.md` |
| Fallback / 404 | **Does not exist as a custom page** | N/A | N/A — Cloudflare Pages serves its own default | N/A | N/A | N/A | Out of scope; not requested, not added |

**No independent claim, offer, or contact path was added on any row.** Every "None" in the
Conversion column was independently verified this pass by `tests/hub-routes.test.ts` (source-level
regex checks for mailto/tel/form/fetch/XHR/outbound-href/iframe/booking-CTA patterns) and by
`scripts/check-public-output.mjs` (dist-level scan, run automatically as `postbuild` on every
build).

---

## Architecture note: this repo's routes vs. the vendored `@tmi/constants` model

`packages/constants/src/ecosystem.ts` (vendored, **not edited** by this task — CLAUDE.md rule 7)
models an aspirational multi-repo ecosystem: one separate subdomain/repo per vertical (e.g.
`consulting.texasmovement.com` as its own `apps/consulting` deployment). The owner's Mark 4
infrastructure direction supersedes that model operationally — exactly two canonical Cloudflare
Pages projects exist today. Every new route in this task is a local path under `texasmovement.com`
itself; none of the eight new pages renders `PROPERTIES[key].url` for any vertical anywhere. A
dated clarification note was added to `CLAUDE.md` (see "Documentation corrections" below)
flagging this tension for a future reader — the vendored package itself was left untouched.

---

## Implemented routes

Full per-route field set (intended audience, current posture, permitted/prohibited content,
source files, metadata/crawl posture, internal-link policy, required future owner evidence,
required future implementation, claims/proof requirements, accessibility criteria, test coverage,
release blockers, explicit non-actions) is in the JSON companion → `routes`. Summarized here.

### /about
Restrained mission/operating-principles page, reusing only already-approved `ORG.boilerplate`/
`tagline` constants — no new claim. No founder biography (that belongs to alexandermathai.com's own
claims review), no historical/numerical claim, no contact path. One internal link, to `/ecosystem`.

### /ecosystem
Authoritative route-maturity map. Shows Consulting, Media, Performance, Distribution, and Partners
as a linked group of planned/building TMI routes; shows HERO as **External storefront / internally
unaudited** with a link only to the `/hero` bridge page (never to the external storefront itself);
shows Health, FounderLink, Social/Gather, and Reparations as restrained, **non-clickable** rows;
mentions alexandermathai.com as separate founder/editorial context with no URL and no link. Uses a
page-local data structure rather than `ECOSYSTEM_MAP`/`PROPERTIES`, because those have no badge
value for HERO's actual classification — flagged as a future reconciliation decision, not resolved
in this pass.

### /consulting, /media, /performance, /distribution, /partners
Five structurally identical "Building" pages: an unmissable posture badge ("Building — not yet
live", reused from `src/lib/hub-routes.ts`, the single source of truth for that string), a
restrained category-level description of the future focus (sourced from the already-vetted pillars
in `docs/mark-3-content-fuel-inventory.md`), an explicitly labeled and unpopulated future
proof/placeholder module, and a closing statement that engagement pathways are not active. None
contains a client claim, outcome, testimonial, pricing, form, booking link, calendar, CRM, email, or
mailto — verified by both the narrow source-level test suite and the dist-level postbuild guard.
Performance additionally carries an explicit non-medical/non-clinical scope boundary; Distribution
is framed as an internal capability, not a client-facing service.

### /hero
The most restrictive page in this pass: a two-paragraph contextual bridge stating that HERO is a
separate, externally operated storefront, and that its catalog, checkout, fulfillment, policies,
support, availability, and product claims are **not audited or verified within this hub**. Contains
**zero `<a>` elements of any kind** — no external storefront link, no internal link, nothing —
verified explicitly by `tests/hub-routes.test.ts`. The five owner-evidence items already identified
in the Mark 2 ecosystem-map integrity finding (storefront location, platform, claims audit,
accessibility/technical pass, owner sign-off) remain unchanged and unmet.

---

## Navigation changes

**Before:** `Header.astro` hand-wrote two links — "Ecosystem Map" → `/lanes` and "Verticals" →
`/#ecosystem` (a homepage anchor).

**After:** `Header.astro` now renders `navRoutes()` from the new `src/lib/hub-routes.ts` registry:
**About → /about, Ecosystem → /ecosystem, Consulting → /consulting, Media → /media, Performance →
/performance**, in that order — exactly the five labels the owner specified. HERO, Distribution,
and Partners are real routes but are deliberately excluded from primary nav per the owner's exact
instruction; each is reachable only via an internal link from `/ecosystem`.

`/lanes` was left completely unmodified and remains reachable (from `/ecosystem`'s own link and
its existing entry points) even though it no longer has a top-level nav slot — no visual or content
regression was made to it. `Footer.astro` was not modified: it still renders only
`liveFooterFor('tmi')` (currently always empty) plus the existing legal links; none of the eight new
routes was judged to belong in the footer, per the instruction that the footer may include only
safe internal informational routes.

**Design decision on the "Building" nav indicator:** the owner's instruction to "use a clearly
restrained 'Building' indicator where it helps prevent an operational implication" is satisfied by
each page's own prominent on-page posture badge (reusing the existing `.division-status` pill
styling) rather than an inline nav-label decoration — consistent with this codebase's existing
pattern, where `DivisionCard` already keeps a plain link label separate from its status treatment.
No new nav-badge CSS was added.

---

## Sitemap and accessibility route-list updates

`src/pages/sitemap.xml.ts`'s `ROUTES` array grew from 5 to 13 entries (added all eight new routes),
reusing the exact same `PUBLIC_PREVIEW` gating already in place — zero URLs in preview mode, all 13
in production mode. This mirrors the pre-existing treatment of `/privacy`, `/terms`, and
`/accessibility` and makes no new claim of public-release status. `tests/a11y.mjs`'s `ROUTES` array
was extended the same way so the axe-core scan covers every new route.

---

## Validation commands and results

```
npm run typecheck                        # astro check — 0 errors, 0 warnings, 0 hints (26 files)
npm run build                             # preview mode — 13 pages built, postbuild guard: 0 errors
PUBLIC_PREVIEW=false npm run build         # production mode — 13 pages built, postbuild guard: 0 errors
npm run check:constants                   # 0 errors (46 pre-existing, unrelated drift warnings)
npm run test:unit                         # 50 passed (31 pre-existing + 19 new), 0 failed
npm run test:a11y                         # axe-core, 0 violations across all 13 routes
npm run ci                                # full gate — all green
```

Production-mode `sitemap.xml` correctly emits all 13 canonical URLs; `robots.txt` correctly allows
and references it. The repository was rebuilt in default preview mode after the production-mode
validation run, matching its normal at-rest state; `dist/` is gitignored either way.

## Test gaps and safety blockers

- `tests/hub-routes.test.ts` checks page **source**, not built `dist/` output, for its
  forbidden-conversion-pattern and posture-language assertions — intentional (fast, no build
  dependency), but the dist-level `scripts/check-public-output.mjs` (run automatically as
  `postbuild` on every build) is the actual safety net for rendered output, and it also passed with
  0 errors on both new-route builds this pass.
- No manual/assistive-technology audit beyond the automated axe-core pass was performed, consistent
  with every other page in this repository (see `src/pages/accessibility.astro`'s own stated
  limitation).
- **No blockers.** No existing test, postbuild guard, claims check, or safety check was weakened,
  disabled, or worked around to make this implementation pass.

## Documentation corrections

`CLAUDE.md`'s "What this repo is" section stated this repo "does not own or build any of the
`*.texasmovement.com` sub-properties... those are separate repos, out of scope here" — accurate
under the pre-Mark-4 multi-repo-per-vertical architecture, but now in tension with the owner's
explicit Mark 4 instruction to build several of those verticals as local routes inside this same
repo. A **dated, additive clarification note** was added directly under that sentence (not a
rewrite — the original sentence remains true of the vendored `@tmi/constants` package's own
aspirational model) explaining the owner's current two-project infrastructure direction and
pointing to this document.

## Explicit non-actions

No Cloudflare Pages project, DNS record, domain binding, GitHub Pages setting, or third-party
platform setting was created, connected, or changed. No Google Workspace mailbox, form backend,
analytics/tracking pixel, social account, YouTube channel, Udemy course, or payment system was
created or activated. No PR was merged, no draft status changed, no branch pushed to `main`. No
existing safeguard (postbuild guard, claims check, verified-inbox gate, noindex/canonical logic)
was weakened. `alexandermathai.com` and its two PRs were not touched by this task.
