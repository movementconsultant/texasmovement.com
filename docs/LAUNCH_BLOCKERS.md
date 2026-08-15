# Launch blockers — Texas Movement International (TMI HQ / texasmovement.com)

Every unresolved item below also exists as a literal `TBD` (or a deliberate omission) inside
`@tmi/constants` (`packages/constants/src/`) or this document — never as literal `TBD` text
anywhere under `src/pages`, `public/`, generated `dist/`, sitemap, robots, or JSON-LD. Verified by
`scripts/check-public-output.mjs` on every build (see PR description for the run output).

## Legal / organization data (blocks: Organization JSON-LD completeness, footer legal text, policy pages)

- [ ] `ORG.stateOfFormation` — `TBD` in `packages/constants/src/org.ts`. Not rendered anywhere;
      `organizationJsonLd()` doesn't reference it, so nothing on the site is blocked by its
      absence — only a hypothetical future "formed in ___" statement is blocked.
- [ ] `ORG.formationYear` — `TBD`, same as above.
- [ ] `ORG.mailingAddress.street` — `TBD`. **Do not fill with a home address.** Needs a registered
      agent or mailbox address before it can be published anywhere (footer, contact page, legal
      pages, Organization schema's `address` field).
- [ ] `ORG.mailingAddress.postalCode` — `TBD`, same constraint.
- [ ] **`/privacy`, `/terms`, `/accessibility` are honest stub pages**, not real policy text. Each
      page says plainly that policy content is pending and does not fabricate legal language. This
      blocks nothing about the *build* (the routes exist, are reachable from the footer, and are
      in the sitemap once production), but real legal review/copy is required before this is a
      launch-ready legal surface.

## Inbox verification (blocks: primary CTA, contact routes)

- [ ] `hello@texasmovement.com` (`INBOXES.general`, TMI's own lane inbox) — not in
      `VERIFIED_INBOXES` (`src/lib/site.ts`, currently empty). `verifiedGeneralContact()` therefore
      returns `null` and **no "Email us" CTA is rendered anywhere on this site** — this is
      deliberate, not an oversight. TMI's actual `primaryCta` ("Find your lane" → `/lanes`) is NOT
      inbox-dependent, so the site's main call to action is unaffected and is fully live.
- [ ] `alexander@texasmovement.com` (`FOUNDER.publicEmail`) — not in `VERIFIED_INBOXES`. The old
      live site exposed this as a raw `mailto:Alexander@TexasMovement.com` link at the bottom of
      the "Follow the Network" section ("To introduce yourself, send a short note... to
      Alexander@TexasMovement.com"). **This was removed** — see the PR description's "Removed
      mailto CTA" section for the full rationale and the chosen replacement (a link routed through
      FounderLink instead, since `https://founderlink.texasmovement.com` is a live external
      property, not an unverified inbox).
- [ ] `founderlink@texasmovement.com` — also not in `VERIFIED_INBOXES`, treated with no special
      case per the site-lib-spec's explicit instruction not to special-case it. This does not block
      anything on THIS repo, since every FounderLink link here points at the FounderLink property's
      own root/pages (`https://founderlink.texasmovement.com`), not at a mailto or a form action on
      this domain. Whatever intake form lives on the FounderLink site itself is out of scope for
      this repo and would be tracked in that repo's own launch blockers.

## Social handles (blocks: two icons in the "Follow the network" section)

- [ ] Media TikTok handle — `TBD` in `packages/constants/src/social.ts` (line ~80). The Media
      network block on `/` renders YouTube + 2 Instagram accounts; TikTok is silently omitted
      rather than shown as a placeholder/broken link.
- [ ] Performance Instagram handle — `TBD` in `social.ts` (line ~124). The Performance network
      block renders Website + YouTube only; Instagram is silently omitted.

## Property-status gating (blocks: 3 lane cards being clickable on `/lanes`)

- [ ] Distribution, Reparations, and Social are `status: "building"` in
      `packages/constants/src/ecosystem.ts`. Per the common brief, only `status: "live"` properties
      may appear as nav/link destinations. Their full label/title/description copy IS shown on
      `/lanes` (nothing was cut), but their "Website →" links are rendered as plain text with a
      "Building — not yet live" note instead of a clickable `<a>`. **Note:** the old live site
      linked all three of these as normal clickable links (and they may in fact already resolve on
      GitHub Pages today) — this is a deliberate tightening to match the manifest's status field,
      not a sign those domains are broken. Flip this the moment the owner updates their `status` to
      `"live"` in `ecosystem.ts` — no template change needed, `isLiveProperty()` picks it up
      automatically.

## Content/data reconciliation (informational — owner decision needed, doesn't block the build)

- [ ] Old `index.html` linked the Consulting division card to
      `linkedin.com/company/texas-movement-consulting`. `@tmi/constants` `ACCOUNTS` has no
      `consulting`-lane LinkedIn entry (only a `tmi`-lane entry for `linkedin.com/company/
      texasmovement` — a different handle). The mismatched link was dropped from the rebuild rather
      than publish an unverified handle. Owner should confirm which handle is correct and, if the
      consulting-specific one should exist, add it to `ACCOUNTS` in `social.ts`.

## Hosting / preview (blocks: live PR preview URL)

- [ ] No Cloudflare Pages / Netlify credentials available to this build. `wrangler.toml` is
      configured (`pages_build_output_dir = "dist"`) so a Cloudflare Pages project can be pointed at
      this repo with zero further config — connecting the repo to a hosting provider and producing
      a real preview URL requires a human with dashboard access.
- [ ] The `@astrojs/cloudflare` SSR/edge-functions adapter was evaluated (per the manifest's
      `platform: "astro-cloudflare"` note) and dropped: it failed in this sandbox with a
      reserved-binding-name build error (`"ASSETS"` binding name conflict) coming from wrangler's
      own config validation, unrelated to this site's code, and this site needs zero server
      functions to begin with. A fully static `output: "static"` Astro build needs no adapter to
      deploy on Cloudflare Pages. If SSR/edge functions are ever needed, re-add the adapter and
      revisit — see `astro.config.mjs` for the full note.
- [ ] Locally verified instead: `astro build` succeeds with zero errors, `astro preview` serves
      every route with `200` (`/`, `/lanes`, `/privacy`, `/terms`, `/accessibility`, `/robots.txt`,
      `/sitemap.xml`, every static asset). See the PR description for exact commands and output.

## Accessibility gaps fixed in this rebuild (informational — not launch blockers, listed for the record)

- [x] Mobile nav: old site had `nav { display: none }` under 900px with **no alternative** — the
      entire primary nav vanished on mobile. Replaced with a real `<button aria-expanded>` +
      keyboard/AT-reachable disclosure panel (`src/components/Header.astro`).
- [x] Added a skip-to-content link (`.skip-link`, visually hidden until focused).
- [x] Found and fixed a color-contrast regression risk during this rebuild: the shared `p` rule's
      default text color (`--ink-soft`, #454a54) is ~7:1 on the light `--paper`/`--panel`
      backgrounds it was designed for, but only ~2.1:1 — a real WCAG AA failure — on the dark
      `.section--graphite` background used by the "Follow the Network" section. This exists in the
      CURRENT live production site too (transcribed CSS, same underlying rule); it's flagged and
      fixed here per `DESIGN_SYSTEM.md`'s explicit instruction not to carry known contrast gaps
      forward. Fixed with a `.section--graphite p` override (see `src/styles/global.css`). Caught
      by an automated `axe-core` pass (`tests/a11y.mjs`) before being caught by eye — the before/
      after screenshots in the PR description show it clearly on the old page.
- [ ] No full manual/assistive-technology audit has been performed — only the automated axe-core
      pass (`wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa` rule sets) against all 5 routes, which currently
      reports 0 violations. Noted plainly on `/accessibility` itself.

## Anything else discovered during this build

- [ ] None beyond what's listed above. Every other check (`check.mjs --strict`,
      `check-public-output.mjs`, `astro check`, `vitest`, `axe-core`) passes clean — see the PR
      description for exact commands and output.
