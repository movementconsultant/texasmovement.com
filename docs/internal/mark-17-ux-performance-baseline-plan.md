# Mark 17 (internal) — UX and Performance Baseline Plan

Internal-only. Not rendered, not imported, not linked from any public route.
A **measurement plan**, not an implementation — no code, style, or route
changed as a result of this document. Covers both texasmovement.com (TMI)
and alexandermathai.com (AVM).

**Boundary rule** (applies throughout):

> Current industry guidance can inform TMI's private operating baseline. It
> does not establish that TMI is certified, compliant, secure, safe,
> effective, qualified, operational, ready for public use, or authorized to
> make public claims.

---

## 1. Visual/manual review plan

Conditions to review each route under, once a review is actually
scheduled (none is scheduled by this document):

- Desktop viewport
- Mobile viewport
- Keyboard-only navigation (no mouse)
- Reduced-motion preference enabled
- High-contrast and low-contrast display settings, where available
- Reader flow (does the page read in a sensible top-to-bottom order)
- Route purpose clarity (does the visitor understand what this page is
  for, within a few seconds)
- Media directory clarity (does `/media` read as a source index, not a
  feed)
- Founder/company differentiation (does the visitor understand TMI and AVM
  are related-but-distinct, per the Mark 13/14 decision records)
- Non-conversion posture clarity (does the visitor correctly understand
  there is no active offer, checkout, or booking path)

This list mirrors and does not replace the manual screenshot review
already performed for Mark 13 and Mark 14 — it formalizes the same
practice as a repeatable checklist for future use.

## 2. Usability tasks (not run in this pass)

**TMI:**

1. Explain what TMI is in one sentence.
2. Identify whether Consulting is currently active.
3. Locate the ecosystem map.
4. Distinguish TMM from Founder Media.
5. Find a source destination without assuming it is a current media item.
6. Explain whether Health or Reparations is a public service.

**AVM:**

1. Explain the founder-site purpose.
2. Locate Notes or Ledger.
3. Explain whether the founder site is a corporate TMI site.
4. Identify whether contact or social services are currently active.

## 3. Participant guidance (for a future test, not run in this pass)

- Start with up to five people in one reasonably similar target-user
  group (per the ideal-buyer hypothesis in
  `docs/mark-17-flagship-commercial-operating-system.md` Part C, once
  that's refined enough to define a group).
- Use task-based observation ("try to find X," "explain what you think
  this page is for") rather than satisfaction questions ("do you like
  it?").
- **Do not collect sensitive personal data in repository documents** —
  no participant name, contact information, or identifying detail belongs
  in this repository, ever.
- Record only anonymized issue summaries, task completion (yes/no/
  partial), confusion points, severity (low/medium/high), and recommended
  response.
- **No user test is scheduled, recruited, or run in this task.** This is
  a plan for a future test, not a report of one.

## 4. Technical performance baseline

### 4a. Existing build size/output inspection (performed this pass — real, measured data)

Both repos were built locally (`npm run build`, the existing, already-wired
command in each repo's own `package.json` — no new tool, no new
dependency) and the resulting `dist/` output was inspected with standard
filesystem tools (`du`, `find`). This is a **measurement of already-built
output**, not a new capability, not a score, and not a claim about
real-world performance.

**TMI (`texasmovement.com`), preview-mode build:**

| Metric | Value |
|---|---|
| Total `dist/` size | 2.8M |
| Largest HTML page | `/media` at 24K |
| Smallest HTML pages | ~8K (most static routes) |
| CSS bundles | 1 file, 16K |
| Client-side JS bundles | 0 files — the site is fully static; the one
  inline `<script>` on `/contact` is not emitted as a separate file |
| Largest individual assets | several unoptimized brand-asset PNGs in the
  100–330K range (e.g. `07_tmi_monogram_badge_transparent.png` at 332K,
  `07_tmi_monogram_badge.png` at 256K, `logo.png` at 220K) — **flagged as
  a review item below, not fixed in this pass** |

**AVM (`alexandermathai.com`), preview-mode build:**

| Metric | Value |
|---|---|
| Total `dist/` size | 596K |
| Largest HTML page | `/` (home) at 36K |
| CSS bundles | 2 files, 12K + 8K |
| Client-side JS bundles | 0 files — also fully static |

**Observation, not a fix:** TMI's total build weight (2.8M) is roughly 4.7×
AVM's (596K), driven almost entirely by the unoptimized brand-asset PNGs
in TMI's `public/` (or equivalent) directory — several exceed 200K each,
and multiple near-duplicate variants (transparent/opaque pairs) exist side
by side. Whether every one of these assets is actually referenced from a
built page, versus sitting unused in the output, was not determined in
this pass. **This is a flagged future review item for
`docs/internal/mark-17-weekly-operating-scorecard.md`'s "Product/technical
health" section, not a change made here** — no image was compressed,
removed, or modified.

### 4b. Lighthouse / equivalent automated measurement

**Not run in this pass.** Confirmed via `npx --no-install lighthouse
--version` that Lighthouse is not installed in either repository, and per
this pass's explicit restriction against adding dependencies, it was not
installed. **Future manual measurement method**, without adding any
tooling:

1. Build the site (`npm run build` in either repo) and serve `dist/`
   locally (both repos already have this pattern — TMI's
   `tests/a11y.mjs` and AVM's `scripts/static-server.mjs` both already
   stand up a local static server for exactly this kind of testing).
2. Open the served pages in a real Chromium browser's built-in DevTools →
   Lighthouse panel (already present in any Chromium install, including
   the one pre-installed in this sandbox at
   `/opt/pw-browsers/chromium` — no separate `lighthouse` npm package
   required to use the panel manually) and run an audit interactively.
3. Record the actual reported LCP/INP/CLS/accessibility/best-practices
   figures manually into a future dated snapshot document — not this one,
   since none was run.
4. Repeat periodically (see the weekly scorecard's "Product/technical
   health" section) rather than as a one-time exercise.

### 4c. Planned measurements (future, not performed)

- **LCP** (Largest Contentful Paint)
- **INP** (Interaction to Next Paint)
- **CLS** (Cumulative Layout Shift)
- Image/font/network request behavior (count, size, blocking vs.
  non-blocking)
- JavaScript payload (currently 0 client-side JS on either site's built
  routes, per 4a — worth re-confirming as the sites grow)
- Route-specific load behavior (does `/media`, the heaviest TMI page,
  behave differently from a lighter route)
- Layout stability (does anything shift after initial paint, particularly
  around the media preview-art SVGs and card grids)

### 4d. Explicit non-claims

**No score, pass/fail result, or field-data result is claimed in this
pass.** The only claims made anywhere in this document are the raw,
directly-measured `du`/`find` figures in section 4a, which are facts about
already-built output, not performance scores.

**Future target guidance only**, subject to real-device/field measurement
and future review — not a claim that either site currently meets these:

- LCP around or under 2.5 seconds
- INP around or under 200 milliseconds
- CLS around or under 0.1

**No analytics or real-user monitoring is added by this document or this
pass**, and none is proposed to be added without a separate, explicit
future owner decision (consistent with `docs/internal/mark-16-tmi-internal-baseline-roadmap.md`'s
P0 privacy-first posture).
