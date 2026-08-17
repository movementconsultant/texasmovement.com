# Brand system — texasmovement.com

Formalizes the design system this repo implements. The original source-of-truth extraction lives
at `scratchpad/foundation/DESIGN_SYSTEM.md` (transcribed from the live production `index.html`
before the Astro rebuild); this document is the repo-local, kept-current version — when the two
disagree, `src/styles/global.css` (the actual shipped CSS) is authoritative.

## Color tokens

Defined once, on `:root`, in `src/styles/global.css`:

```css
--paper: #e7e8e2;        /* default page background */
--panel: #ddded7;        /* alternating section background */
--hero: #e9e0d5;         /* hero gradient start */
--hero-soft: #f3ebe2;    /* hero gradient end */
--hero-ink: #3c2a1d;
--hero-border: #b88d68;
--ink: #15181e;          /* primary text / button fill */
--ink-soft: #454a54;     /* body copy on light backgrounds */
--line: #c4c6bd;         /* hairline borders */
--line-strong: #a6a99f;  /* card/component borders */
--graphite: #111217;     /* dark section background, footer */
--white: #f4f5f0;        /* text on dark backgrounds */
--compression: #274a78;  /* blue accent — links/focus ring */
--tension: #bd3b22;      /* rust accent — eyebrow tick marks */
--wrap: 1180px;          /* max content width */
```

`theme-color` meta tag = `#15181E` (== `--ink`).

Contrast is checked, not assumed (see `src/styles/global.css` header comment):

| Pair | Ratio |
|---|---|
| `--ink-soft` on `--paper` | 7.22:1 |
| `--ink-soft` on `--panel` | 6.57:1 |
| `--ink` on `--paper` | 14.42:1 |
| `--white` on `--graphite` | 17.07:1 |

All pass WCAG 2.1 AA (4.5:1 minimum for body text) with margin.

## Typography

- Body: `"IBM Plex Sans", system-ui, sans-serif`, 16.5px base, line-height 1.7.
- Headings (`h1`–`h3`), brand wordmark, division/ecosystem titles: `"Space Grotesk", sans-serif`,
  weight 600, letter-spacing `-0.02em`, line-height 1.06.
- Labels, nav, eyebrows, buttons, captions: `"IBM Plex Mono", monospace`, uppercase,
  letter-spacing 0.08–0.2em depending on size.
- `h1`: `clamp(2.4rem, 5vw, 3.8rem)`. `h2`: `clamp(1.7rem, 3.1vw, 2.4rem)`. `h3`: `1.1rem`.
- Google Fonts: `IBM+Plex+Sans:wght@400;500;600`, `IBM+Plex+Mono:wght@400;500`,
  `Space+Grotesk:wght@500;600` (loaded in `src/layouts/Layout.astro`).

## Layout

- Content wrapper: `.wrap` — `max-width: var(--wrap)` (1180px), `padding: 0 28px` (`0 20px` under
  900px).
- Section padding: 88px vertical (`.section`), 72px (`.section--tight`).
- Section variants: default (`--paper`), `.section--panel` (bordered top/bottom, `--panel` bg),
  `.section--graphite` (dark, `--white` text, `#2c313b` border — note the `.section--graphite p`
  override below).
- Sticky header, 64px tall, blurred translucent paper background, bottom border `--line`.

## Components

- **`.eyebrow`** (`Eyebrow.astro`) — uppercase mono label with a 32px rust-colored tick before it.
  `.eyebrow--light` variant for dark sections (`#9aa0ab` text, tick stays `--tension`).
- **`.btn`** — pill button, mono uppercase, filled ink-on-white by default, inverts on hover;
  `.btn--ghost` starts transparent/outlined. Arrow glyph (`→`) translates 3px right on hover. This
  is reserved for the site's one primary-CTA slot (see `docs/SITE_ARCHITECTURE.md` "primary CTA
  gating") — do not add a second `.btn` for a competing call to action.
- **`.division`** (`DivisionCard.astro`) — card: 14px radius, 1px `--line-strong` border, `--paper`
  bg, label/title/body/links stack. Renders a `building`-flagged link as plain text +
  `.division-status` badge instead of an `<a>` — this is the canonical "not live yet" treatment,
  reused (not reinvented) anywhere else a live/building distinction needs to render (e.g. the
  homepage's "Explore the ecosystem" grid).
  - `.division--hero` variant: warm gradient + brown border, scoped to HERO mentions only — not an
    ecosystem-wide accent.
- **`.network-block`** (`NetworkBlock.astro`, dark sections only) — 14px radius, `#2c313b` border,
  no fill. Currently unused on the homepage (the "Follow the Network" section was removed in the
  Pass 2 placeholder rewrite — see `docs/MIGRATION_INVENTORY.md`) but the component and its CSS
  remain available if a social-links surface is rebuilt later.
- **`.teaser-item` / `.ecosystem-name`** — the homepage's "Explore the ecosystem" grid item. Live
  properties render as `a.teaser-item.teaser-item--link`; building properties render as a plain
  `.teaser-item` div with a `.division-status` badge — same live/building split as `.division`
  above, lighter-weight markup for a more compact grid.
- **`.hero-figure`** — bordered/rounded image frame with a 3-cell mono-labelled grid caption
  underneath, used for the ecosystem diagram on the homepage hero.
- Focus state: `a:focus-visible, button:focus-visible { outline: 2px solid var(--compression);
  outline-offset: 3px; }` — the only visible focus treatment in the brand. Never remove it or
  replace it with `outline: none`.

## Accessibility fixes made during the rebuild (do not regress these)

1. **Mobile nav.** The pre-Astro live site had `nav { display: none }` under 900px with no
   alternative — the entire primary nav vanished on mobile. `Header.astro` replaces this with a
   real `<button aria-expanded>` + keyboard/AT-reachable disclosure panel.
2. **Skip link.** `<a class="skip-link" href="#main">Skip to content</a>`, visually hidden until
   focused (`src/layouts/Layout.astro` body, styled in `global.css`).
3. **Dark-section body-text contrast.** The shared `p` rule's default color (`--ink-soft`,
   #454a54) is ~7:1 on the light `--paper`/`--panel` backgrounds it was designed for, but only
   ~2.1:1 (a real WCAG AA failure) on `.section--graphite`. Fixed with a `.section--graphite p`
   override (`color: #cdd2da`, 12.3:1) — this existed in the live production HTML too and was
   caught and fixed here, not carried forward.
4. **Alt text.** Every image needs real descriptive alt text; decorative images get `alt=""`. Keep
   this bar on any new image.
5. **Heading order.** Exactly one `<h1>` per page, no skipped levels.
6. **Automated verification.** `tests/a11y.mjs` runs an axe-core scan (`wcag2a`/`wcag2aa`/
   `wcag21a`/`wcag21aa` rule sets) against every built route on every `npm run ci`. As of this
   commit: 0 violations across `/`, `/lanes`, `/privacy`, `/terms`, `/accessibility`. This is
   automated coverage only — no full manual/assistive-technology audit has been performed (see
   `/accessibility` itself and `docs/LAUNCH_BLOCKERS.md`).

## Per-lane accent

`--tension` (rust) is the universal eyebrow-tick color and `--compression` (blue) is the universal
link/focus color, ecosystem-wide — not lane-specific. Do not invent new per-lane accent colors
unless a specific lane's own live site already uses one (HERO's warm brown/gradient treatment in
`.division--hero` is the one existing exception, scoped to HERO only).
