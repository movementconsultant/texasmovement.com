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

- [ ] **`hello@texasmovement.com` (`INBOXES.general`) — this is now the site's ONLY primary CTA,
      and it is currently blocked.** As of the homepage placeholder/hub rewrite (see
      `docs/MIGRATION_INVENTORY.md` "Pass 2"), the homepage's single primary-CTA slot is reserved
      for **"Contact Texas Movement"**, wired exclusively to `hello@texasmovement.com` via
      `verifiedGeneralContact()` in `src/lib/site.ts`. That function returns `null` while the
      address is absent from `VERIFIED_INBOXES` (currently empty — confirmed by reading
      `src/lib/site.ts` directly), so **the homepage currently ships with no primary CTA element
      at all** — not a placeholder, not a disabled-looking button, nothing in that slot. This is
      deliberate and matches Alexander's explicit instruction: *"Wire the primary CTA exclusively
      to hello@texasmovement.com only if the existing verification state can be explicitly set to
      verified by the approved configuration. Otherwise, do not expose the CTA and report the
      exact verification change required."*

      **Exact one-line change required, once ready:** in `src/lib/site.ts`, add
      `"hello@texasmovement.com"` to the `VERIFIED_INBOXES` array (the commented-out line is
      already there — just uncomment it). No other code change is needed; `verifiedGeneralContact()`
      and the homepage template both pick it up automatically.

      **Operational precondition for making that change** (all three, confirmed, not just decided):
      1. The `hello@texasmovement.com` mailbox is actually provisioned (exists and can receive mail).
      2. A test email sent to that address has been confirmed received.
      3. Someone is confirmed to be monitoring that inbox on a stated cadence.

      A brand/naming decision that `hello@texasmovement.com` is the *approved* address is **not**
      sufficient on its own — `VERIFIED_INBOXES` exists specifically to hold only
      operationally-confirmed addresses, and no such confirmation has been given as of this build.
      Do not add the address to `VERIFIED_INBOXES` until all three items above are true; at that
      point this is a single, explicit, one-line instruction from Alexander to close out.

      Note: this supersedes the previous version of this document's note that "TMI's actual
      `primaryCta` ('Find your lane' → `/lanes`) is NOT inbox-dependent, so the site's main call to
      action is unaffected." That was true when the homepage's primary CTA was "Find your lane" —
      the homepage rewrite in Pass 2 deliberately replaced that CTA slot with "Contact Texas
      Movement," so the site's main call to action IS now inbox-dependent, and is currently absent.
      `/lanes` and the live ecosystem properties remain reachable via plain content links and the
      header nav regardless — only the styled `.btn` primary-CTA slot is affected.
- [ ] `alexander@texasmovement.com` (`FOUNDER.publicEmail`) — not in `VERIFIED_INBOXES`. The old
      live site exposed this as a raw `mailto:Alexander@TexasMovement.com` link at the bottom of
      the "Follow the Network" section ("To introduce yourself, send a short note... to
      Alexander@TexasMovement.com"). **This was removed** in the original rebuild and the
      "Follow the Network" section itself was removed again (in full) in Pass 2 — see
      `docs/MIGRATION_INVENTORY.md` for both removals and their rationale.
- [ ] `founderlink@texasmovement.com` — also not in `VERIFIED_INBOXES`, treated with no special
      case per the site-lib-spec's explicit instruction not to special-case it. This does not block
      anything on THIS repo, since every FounderLink link here points at the FounderLink property's
      own root/pages (`https://founderlink.texasmovement.com`), not at a mailto or a form action on
      this domain. Whatever intake form lives on the FounderLink site itself is out of scope for
      this repo and would be tracked in that repo's own launch blockers.

## LinkedIn Company Page URL (blocks: `organizationJsonLd().sameAs` entry, any future social-icon rendering)

- [ ] **Canonical LinkedIn Company Page URL — not yet provided.** Alexander's decision: "Texas
      Movement International is the official LinkedIn Company Page identity. Do not link to either
      conflicting legacy LinkedIn URL until I provide the exact canonical Company Page URL." Two
      candidate URLs exist and **neither is confirmed correct**:
      - `https://www.linkedin.com/company/texas-movement-consulting` (used in the old live
        `legacy/index.html`; never in `@tmi/constants`).
      - `https://www.linkedin.com/company/texasmovement` (currently sitting in
        `packages/constants/src/social.ts` `ACCOUNTS`, lane `"tmi"`, as a non-`TBD` value — a
        brand-approval decision that "TMI is the identity," not operational confirmation that this
        specific URL is the real Company Page link).

      As of this build, `src/lib/site.ts` explicitly excludes **every** `linkedin.com` URL from all
      public output (`liveSocialAccounts()`, `liveSocialAccountsForLane()`,
      `safeOrganizationJsonLd().sameAs`) via `isHeldPendingConfirmation()`, and
      `scripts/check-public-output.mjs` fails the build if any `linkedin.com` URL leaks into
      `dist/` in any form. Confirmed clean on this build (`grep -ri linkedin.com dist/` → 0 hits on
      both `PUBLIC_PREVIEW=true` and `=false` builds).

      **End-of-day closeout note (this pass):** the filter originally only matched the exact
      `tmi`-lane company-page URL by string equality, which missed a second, different LinkedIn URL
      also present in `ACCOUNTS` — the founder's personal profile
      (`https://www.linkedin.com/in/alexandermathai`, lane `"founder"`), which was leaking into
      every page's `organizationJsonLd().sameAs`. Per `CLAUDE.md` rule 5 ("no unconfirmed brand
      assets... any other brand identifier"), that also needed holding: `isHeldPendingConfirmation()`
      now matches on the `linkedin.com` domain rather than one exact URL, so no LinkedIn URL of any
      kind renders until Alexander confirms one. This does not change what's blocked — it was
      already supposed to be zero LinkedIn URLs in public output — it fixes a gap in how that was
      enforced.

      **Exact change required, once ready:** update the `linkedin` / lane `"tmi"` entry's `url`
      (and `handle`) in `packages/constants/src/social.ts` with the real, confirmed canonical
      Company Page URL, THEN narrow or remove the `linkedin.com` match in
      `isHeldPendingConfirmation()` (`src/lib/site.ts`) accordingly. Do not do these in the reverse
      order — removing the filter before a URL is confirmed would let an unconfirmed URL back into
      public output. (The founder's personal LinkedIn profile is a separate, independent
      confirmation — un-hold it explicitly if/when Alexander confirms that one too; don't assume
      confirming the company page also confirms the personal profile.)

## Social handles (informational — the section that displayed these was removed in Pass 2)

- [ ] Media TikTok handle — `TBD` in `packages/constants/src/social.ts` (line ~80).
- [ ] Performance Instagram handle — `TBD` in `social.ts` (line ~124).

      Neither currently blocks anything: the homepage's "Follow the Network" section (which used
      to render per-lane social links, including these two) was removed in full as part of the
      Pass 2 homepage rewrite — see `docs/MIGRATION_INVENTORY.md`. Both `TBD` values still block a
      *future* social-links section from showing a complete Media/Performance block, and both are
      still correctly excluded from `organizationJsonLd().sameAs` (via `publishableAccounts()`'s
      TBD filter) regardless of whether any page renders them directly.

## Ecosystem-map presentation (blocks: every card on `/lanes` and the homepage's ecosystem
section being clickable)

- [ ] **Superseded as of the ecosystem-verticals pass.** Previously only Distribution, Reparations,
      and Social (the `status: "building"` properties) were non-clickable, everything else linked
      out normally. The owner has since supplied an explicit "approved ecosystem presentation"
      marking ALL 11 entries (TMI itself, Alexander Mathai, and all 9 verticals) as `Building` or
      `Private` — none as live/available — so every card on both `/lanes` and the homepage's
      "Explore the ecosystem" section is now non-interactive, regardless of the individual
      property's own `status` field in `ecosystem.ts` (that field is unchanged and remains the real
      deployment-lifecycle source of truth for other purposes — see `ECOSYSTEM_MAP` in
      `docs/SITE_ARCHITECTURE.md`). To make a specific vertical clickable again: update its badge
      to reflect a real "verified, public, lifecycle-approved" state in `ECOSYSTEM_MAP`
      (`src/lib/site.ts`) — an explicit, reviewable, one-entry change.
- [x] **Resolved.** The open question above was decided: the global footer now includes only
      properties with an explicit `"live"` badge in `ECOSYSTEM_MAP` (`isFooterEligible()` in
      `src/lib/site.ts`) — not `status === "live"` in the vendored registry, and not "Building
      minus Private" as it briefly was. Since every current `ECOSYSTEM_MAP` entry is `"building"`
      or `"private"`, the footer's ecosystem/property list is currently empty on every page
      (verified in `dist/`) — no dead links, no `#` links, no disabled-looking elements, the `<nav
      aria-label="Ecosystem">` element itself is omitted entirely when there's nothing to show.
      Only the copyright/domain line and the Privacy/Terms/Accessibility legal links remain, both
      independent of property lifecycle. A property becomes footer-eligible again the moment its
      `ECOSYSTEM_MAP` entry is explicitly updated to `badge: "live"` — a one-entry, reviewable
      change; no template changes needed anywhere.

## Content/data reconciliation (informational — owner decision needed, doesn't block the build)

- [ ] Old `legacy/index.html` linked the Consulting division card to
      `linkedin.com/company/texas-movement-consulting`. `@tmi/constants` `ACCOUNTS` has no
      `consulting`-lane LinkedIn entry (only a `tmi`-lane entry for `linkedin.com/company/
      texasmovement` — a different handle). The mismatched link was dropped from the rebuild rather
      than publish an unverified handle. **Superseded by the dedicated "LinkedIn Company Page URL"
      section above** as of Pass 2: neither URL is confirmed correct, and both are actively
      excluded from public output pending Alexander providing the real canonical URL. Owner should
      resolve this by providing that URL, not by picking between the two existing candidates.

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
      `check-public-output.mjs`, `astro check`, `vitest`, `axe-core`) passes clean on both the
      original rebuild and the Pass 2 homepage rewrite — see the PR description for exact commands
      and output from this pass.

## Mark 33 — launch gate override (owner-authorized, explicit)

As of Mark 33, the owner explicitly overrode the launch gate this document exists to enforce,
accepting the following gaps as known and shipping anyway:

- The homepage still has **no primary CTA element at all** — `hello@texasmovement.com` remains
  absent from `VERIFIED_INBOXES` (`src/lib/site.ts`), so `verifiedGeneralContact()` still returns
  `null`. See the "Inbox verification" section above for the exact one-line unblock once the
  mailbox is actually provisioned and monitored.
- The canonical LinkedIn Company Page URL is still unconfirmed; both candidate URLs remain held
  out of all public output (see "LinkedIn Company Page URL" above).
- `/privacy`, `/terms`, and `/accessibility` remain honest stub pages, not real legal text.

Mechanically, this override is implemented as a fallback-direction reversal on `PUBLIC_PREVIEW` —
see `src/layouts/Layout.astro`'s Mark 33 comment. It previously failed SAFE (anything but the
literal string `"false"`, including unset, meant preview/noindex); it now fails OPEN (only the
literal string `"true"` means preview; unset means production/indexable). This means the site is
now indexable and rendering production URLs/canonicals by default, with the gaps above still
open. This document is intentionally left in place, unmodified above this section, as the record
of what was known and explicitly accepted at the time of that decision — not deleted or archived,
even though the launch it was gating has now happened.
