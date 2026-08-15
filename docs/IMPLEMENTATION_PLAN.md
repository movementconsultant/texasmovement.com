# Implementation plan — texasmovement.com

What's done, and what's next, in the order it's likely to matter. See `docs/LAUNCH_BLOCKERS.md`
for the exhaustive per-item detail behind each line here.

## Done

- [x] Astro rebuild of the pre-existing single-page `index.html` into a real static site (`/`,
      `/lanes`, `/privacy`, `/terms`, `/accessibility`), with `@tmi/constants` vendored as the
      single source of truth for every domain/brand fact/status flag.
- [x] `src/lib/site.ts` safety-wrapper layer: live-only nav/footer, verified-inbox gating for
      contact CTAs, and (new) held-pending-confirmation gating for brand URLs not yet confirmed by
      Alexander.
- [x] `scripts/check-public-output.mjs` postbuild guard: no `TBD`, no unverified mailto, no
      non-live nav destination, no missing noindex on preview builds, and (new) no held-pending
      LinkedIn URL, anywhere in `dist/`.
- [x] Accessibility: real mobile-nav disclosure, skip link, fixed a dark-section contrast
      regression, 0 axe-core violations across all 5 routes (automated scan only — see
      `/accessibility` for what hasn't been manually audited).
- [x] Homepage rewritten as a plain-language ecosystem placeholder/hub: honest framing language,
      a "what we are building" section grounded in the real lane structure, an "explore the
      ecosystem" section that only links live properties, and exactly one primary-CTA slot
      ("Contact Texas Movement") that's conditionally wired and currently absent (unverified
      inbox). See `docs/MIGRATION_INVENTORY.md` "Pass 2" for the full diff and rationale.
- [x] LinkedIn Company Page URL held out of all public output (JSON-LD `sameAs`, any future
      footer/social rendering) pending Alexander providing the real canonical URL — neither of the
      two conflicting legacy URLs renders anywhere, verified against `dist/` after every build.

## Next (in rough priority order)

1. **Inbox verification** — the single biggest unlock. Once `hello@texasmovement.com` is
   confirmed provisioned, receiving mail, and monitored, add it to `VERIFIED_INBOXES`
   (`src/lib/site.ts`, one line) and the homepage's primary CTA goes live automatically. No other
   code change needed. See `docs/LAUNCH_BLOCKERS.md` "Inbox verification" for the exact
   precondition.
2. **Canonical LinkedIn Company Page URL** — once Alexander provides it, update the `tmi`-lane
   `linkedin` entry in `packages/constants/src/social.ts`, then delete the one
   `HELD_PENDING_CONFIRMATION` line in `src/lib/site.ts`. See `docs/LAUNCH_BLOCKERS.md` "LinkedIn
   Company Page URL" for the exact order of operations (URL first, filter removal second).
3. **Legal / organization data** — `ORG.stateOfFormation`, `ORG.formationYear`,
   `ORG.mailingAddress.street`/`.postalCode` are `TBD` in `packages/constants/src/org.ts`. Needs
   the filed Certificate of Formation and a registered-agent or mailbox address (never a home
   address) before `/privacy`, `/terms`, and the Organization JSON-LD can carry real legal text
   instead of an honest stub.
4. **Remaining social handles** — Media's TikTok and Performance's Instagram are still `TBD` in
   `social.ts`. Low priority: nothing currently renders a "follow us" surface on this site (see
   `docs/MIGRATION_INVENTORY.md` "Pass 2" — that section was removed from the homepage), so these
   only block a future social-links section, not anything live today.
5. **`@tmi/constants` formalization** — currently vendored via a local `file:` dependency because
   `create_repository` for a dedicated constants repo failed with a permissions error. Once that's
   resolved (either a repo-creation permission fix, or Alexander creating the repo directly),
   publish the real package and swap the one `package.json` dependency line — no import rewrites
   needed anywhere in `src/`. See `docs/SITE_ARCHITECTURE.md` "constants-vendoring situation."
6. **Hosting connection** — `wrangler.toml` is configured for Cloudflare Pages
   (`pages_build_output_dir = "dist"`), and the site builds as pure static output needing no
   adapter. Connecting the repo to a real Cloudflare Pages project, any DNS change, and actually
   deploying all require a human with dashboard access and Alexander's explicit approval — none of
   this is in scope for an agent working in this repo unless a task explicitly asks for it. See
   `docs/LAUNCH_BLOCKERS.md` "Hosting / preview."
7. **Property status flips** — Distribution, Reparations, and Social are `status: "building"` in
   `ecosystem.ts`. Flip each to `"live"` only once that property's own site is actually live;
   every nav/footer/lane-grid/homepage-ecosystem rendering path picks this up automatically with
   no template change (`isLiveProperty()`).
8. **Full manual accessibility audit** — the automated axe-core pass (0 violations across all 5
   routes) is not a substitute for manual/assistive-technology testing. Not currently scheduled;
   flag if/when it should be.

## Explicitly not planned as part of this repo's work

Merging this branch's PR, deploying, DNS changes, package publishing, creating a GitHub repo,
creating/modifying any LinkedIn page, creating secrets. All of these require a human decision and
action outside an agent session — see `CLAUDE.md`.
