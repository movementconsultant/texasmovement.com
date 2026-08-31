# texasmovement.com

Astro source for the Texas Movement International (TMI) hub site. Static output, no server
adapter, deploys as-is to Cloudflare Pages. See `CLAUDE.md` for repo scope, safety rules, and
approval boundaries before making changes here.

## Local setup

Requires Node 20+ (tested on Node 22) and npm.

```bash
npm install
npm run dev        # http://localhost:4321
```

Copy `.env.example` to `.env` if you need to override `PUBLIC_PREVIEW` locally (see "Preview vs.
production" below). No other environment variables are required for local dev.

## Project structure

```
src/
  pages/            index.astro, lanes.astro, privacy.astro, terms.astro,
                     accessibility.astro, robots.txt.ts, sitemap.xml.ts
  layouts/           Layout.astro — <head>, JSON-LD, header/footer wrapper
  components/        Header.astro, Footer.astro, Eyebrow.astro,
                     DivisionCard.astro, NetworkBlock.astro
  lib/site.ts        Repo-local safety wrapper around @tmi/constants — read this
                     before touching any nav/footer/CTA/JSON-LD code
  styles/global.css  Design tokens + shared component classes
packages/constants/  Vendored @tmi/constants — the ecosystem-wide source of
                     truth for domains, brand facts, and lifecycle status
                     (see "Vendoring" below)
scripts/
  check-public-output.mjs   Postbuild guard — fails the build on any TBD,
                             unverified mailto, non-live nav link, or held-
                             pending brand URL leaking into dist/
tests/
  site.test.ts       Unit tests for src/lib/site.ts (vitest)
  a11y.mjs           axe-core scan against every built route
docs/                Project docs — see docs/SITE_ARCHITECTURE.md for the
                     full map
legacy/index.html    The pre-Astro live site, kept as a historical snapshot.
                     Not served or referenced by the current build.
```

## Build & test commands

```bash
npm run build            # astro build; postbuild runs scripts/check-public-output.mjs automatically
npm run typecheck        # astro check
npm run check:constants  # node packages/constants/scripts/check.mjs --strict
npm run check:output     # node scripts/check-public-output.mjs (also runs as postbuild)
npm run test:unit        # vitest run
npm run test:a11y        # axe-core against dist/ — run `npm run build` first
npm run ci                # build + check:constants + test:unit + test:a11y — the full gate
```

## Preview vs. production

Controlled by `PUBLIC_PREVIEW` (`src/layouts/Layout.astro`, defaults to `true` unless explicitly
set to `"false"`). While `true`: every page is `noindex, nofollow`, no `<link rel="canonical">` is
emitted, and `sitemap.xml` ships with zero URLs. Flip to `false` only for a real production
deploy, and only with Alexander's explicit sign-off (see `CLAUDE.md`).

## Deployment assumptions

Static output (`output: "static"` in `astro.config.mjs`), no adapter required. `wrangler.toml` has
`pages_build_output_dir = "dist"` pre-configured for Cloudflare Pages — connecting this repo to a
real Cloudflare Pages project (or any other host) requires a human with dashboard access and is
out of scope for an agent working in this repo. See `astro.config.mjs`'s own comment for why the
`@astrojs/cloudflare` SSR adapter was dropped in favor of a plain static build.

## Branches & rollback

- `main` — the previously-live, pre-Astro single-page site (`index.html`, now also preserved at
  `legacy/index.html` on the rebuild branch). `main` has not been touched by the Astro rebuild
  work and is not repointed at any hosting deploy by this repo.
- `claude/texas-movement-rebuild-pq14fo` — the Astro rebuild, open as a **draft** PR against
  `main`. All rebuild + placeholder-launch work happens on this branch.

To roll back: `git checkout main`. `main` is untouched by any of this work, so rollback is a no-op
unless and until the branch's PR is actually merged. If you want the branch gone entirely, delete
`claude/texas-movement-rebuild-pq14fo` — nothing on `main` depends on it. No production deploy is
currently pointed at either branch, so there is no live rollback to perform beyond source control
itself.

## Vendoring note

`@tmi/constants` is vendored at `packages/constants/` via a local `file:` dependency (see
`docs/SITE_ARCHITECTURE.md` and `docs/MIGRATION_INVENTORY.md` for why: `create_repository` for a
dedicated constants repo failed with a permissions error during the original build). Import from
it exactly as documented (`import { PROPERTIES } from "@tmi/constants"`) so that swapping the
`package.json` dependency line to a real published package later requires no import rewrites.
