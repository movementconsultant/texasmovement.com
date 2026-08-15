# Site architecture — texasmovement.com

## Route map

| Route | File | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage — plain-language ecosystem placeholder/hub (see "Homepage" below). |
| `/lanes` | `src/pages/lanes.astro` | Full lane directory: every property, description, status, live link or "building" note. |
| `/privacy` | `src/pages/privacy.astro` | Honest stub — states plainly that policy content is pending. |
| `/terms` | `src/pages/terms.astro` | Honest stub — same as `/privacy`. |
| `/accessibility` | `src/pages/accessibility.astro` | Accessibility statement, including what has and hasn't been audited. |
| `/robots.txt` | `src/pages/robots.txt.ts` | Generated; behavior gated by `PUBLIC_PREVIEW` (see below). |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | Generated; ships 0 URLs while `PUBLIC_PREVIEW` is true. |

All five HTML routes share `src/layouts/Layout.astro` (head/meta/JSON-LD, `Header.astro`,
`Footer.astro`).

## Homepage (`/`)

As of the Pass 2 placeholder/hub rewrite (see `docs/MIGRATION_INVENTORY.md`), the homepage has
four sections:

1. **Hero** — plain-language framing ("operates at the intersection of performance, culture,
   media, technology, and disciplined execution"), grounded in `ORG.tagline` / `ORG.boilerplate`.
2. **`#building` — "What we are building"** — a few sentences on the real lane structure, sourced
   from each `PROPERTIES[key].role` string.
3. **`#ecosystem` — "Explore the ecosystem"** — lists the 9 non-`tmi`, non-`founder` properties in
   `PROPERTY_ORDER`. Live ones (`isLiveProperty(key) === true`) render as real links; building
   ones render as plain text + an "In development" badge. This reuses the exact live/building gate
   `DivisionCard.astro` already applies on `/lanes` — see `docs/BRAND_SYSTEM.md`.
4. **`#contact` — the one primary-CTA slot** — renders `<a class="btn">{cta.label}</a>` ONLY when
   `verifiedGeneralContact()` (`src/lib/site.ts`) returns non-null. Currently `null`
   (`VERIFIED_INBOXES` is empty), so this section does not render at all. See "Primary CTA gating"
   below and `docs/LAUNCH_BLOCKERS.md`.

## The lifecycle-gating mechanism

Every property in `packages/constants/src/ecosystem.ts` (`PROPERTIES`) carries a `status`:
`"live" | "building" | "planned" | "retired"`. This repo's rule, enforced in multiple independent
places so it can't silently regress:

1. **`src/lib/site.ts`** — `isLiveProperty(key)` is the single predicate. `liveFooterFor(current)`
   filters the global footer to live properties only. Every page-level "which properties can I
   link to" decision calls one of these, never `PROPERTIES` directly for this purpose.
2. **Component-level rendering** — `DivisionCard.astro`'s `links[].building` prop and the
   homepage's `isLiveProperty()` check both render a non-live property as plain text +
   `.division-status` badge instead of an `<a>`.
3. **Build-time guard** — `scripts/check-public-output.mjs`, wired as `postbuild`, fails the build
   if any href to a `*.texasmovement.com` (or apex) property whose `status !== "live"` appears
   anywhere in `dist/`, or if any sitemap `<loc>`/canonical link references a non-live property.
   This is the backstop: even if a template mistake slipped a non-live link through, the build
   fails before it can ship.

To move a property from `building` to `live`: flip its `status` in `ecosystem.ts`. No template
change is needed anywhere in this repo — every rendering path re-derives from `isLiveProperty()`.

## The `VERIFIED_INBOXES` / primary-CTA gating mechanism

Same shape as lifecycle gating, applied to contact routes instead of nav links:

1. `VERIFIED_INBOXES` (`src/lib/site.ts`) starts empty and may only ever contain addresses that
   are *operationally* confirmed (mailbox provisioned + test email received + someone confirmed
   monitoring it) — never addresses that are merely brand-approved.
2. `isVerifiedInbox(address)` / `verifiedGeneralContact()` are the only functions any template may
   call to decide whether to render a mailto CTA. `verifiedGeneralContact()` returns `null` until
   `hello@texasmovement.com` is added to the list; the homepage's CTA section is conditionally
   rendered on that return value, so "unverified" means the CTA slot is entirely absent, not a
   disabled-looking placeholder.
3. `scripts/check-public-output.mjs` fails the build if any `mailto:` href in `dist/` targets an
   address not in `VERIFIED_INBOXES` — same backstop pattern as lifecycle gating.

## The `HELD_PENDING_CONFIRMATION` mechanism (brand-URL gating)

Newest instance of the same pattern, added for the LinkedIn Company Page URL (see
`docs/LAUNCH_BLOCKERS.md`): a value can be technically present and non-`TBD` in
`@tmi/constants` while still not being confirmed correct by Alexander. `HELD_PENDING_CONFIRMATION`
in `src/lib/site.ts` is a small set of such URLs, checked by `liveSocialAccounts()`,
`liveSocialAccountsForLane()`, and `safeOrganizationJsonLd()` (the latter wraps the vendored
`organizationJsonLd()` and must be imported instead of it everywhere in this repo).
`scripts/check-public-output.mjs` also greps `dist/` directly for the two known-conflicting
LinkedIn URLs as a build-time backstop.

## The `PUBLIC_PREVIEW` mechanism

`src/layouts/Layout.astro` reads `import.meta.env.PUBLIC_PREVIEW` (default: unset, treated as
`true`/preview). While preview: every page emits `noindex, nofollow` and no canonical tag;
`robots.txt` disallows everything; `sitemap.xml` ships zero URLs. `scripts/check-public-output.mjs`
independently re-derives the same preview flag (parsing `.env` the same way Astro would) and fails
the build if any HTML page is missing the noindex meta tag while preview is on — so a preview
build can never accidentally ship as indexable. Flipping `PUBLIC_PREVIEW=false` for a real
production build requires Alexander's explicit approval (see `CLAUDE.md`).

## The constants-vendoring situation

`@tmi/constants` (`packages/constants/`) is the ecosystem-wide source of truth: every domain,
brand fact, lane role, status flag, and inbox address across every `*.texasmovement.com` property
lives there, not hand-typed in any individual repo. It's currently vendored via a local `file:`
dependency (`"@tmi/constants": "file:./packages/constants"` in `package.json`) because
`create_repository` for a dedicated `movementconsultant/tmi-constants` repo failed with a
permissions error (`403 Resource not accessible by integration`) during the original build — see
`docs/MIGRATION_INVENTORY.md`. Import statements are written exactly as they would be against a
real published package (`import { PROPERTIES } from "@tmi/constants"`), so once
`@movementconsultant/constants` exists as a real package, the only change needed is the
`package.json` dependency line (path → `"npm:@movementconsultant/constants@^0.1.0"`) — no import
rewrites anywhere in `src/`.

`packages/constants/scripts/check.mjs --strict` is the constants package's own guard rail: it
fails on duplicate property keys, more/fewer than one `primaryCta` per property, insecure/
trailing-slash URLs, and reports every remaining `TBD` (informational, not a failure by itself).
Run it alongside `scripts/check-public-output.mjs` — they check different things (the registry's
internal consistency vs. what actually shipped to `dist/`).

## `src/lib/site.ts` — why it exists

Every page, layout, nav, footer, and JSON-LD block in this repo imports from `src/lib/site.ts`,
never `@tmi/constants` primitives directly. This is the one place all of the gating mechanisms
above are implemented and tested (`tests/site.test.ts`) — see the file's own header comment for
the full rule statement.
