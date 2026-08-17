# Mark 13/14 Latest Signal Implementation

Build-time-fetched "Latest Signal" rail on `/media` — up to 4 recent YouTube videos across the two
owner-confirmed TMM channels — implemented per the owner's explicit Mark 13 architectural
authorization and evidence, and the Mark 14 "Raw Telemetry" governance classification that resolved
the G-M8 tension this introduced. This is an implementation record, not an audit — see
`docs/mark-12-external-feed-feasibility-and-governance.md` for the prior feasibility analysis this
build now acts on, and `alexandermathai.com`'s `docs/mark-13-telemetry-rails-implementation.md` for
the sibling Substack/GitHub rails built the same pass under the same governance decision.

## Governance basis

- **Mark 13** (owner directive): authorized build-time `fetch()` in Astro frontmatter only — no
  Workers, no proxies, no client-side fetching. For YouTube specifically: "authorized to fetch
  thumbnail, title, link, date," and explicitly authorized writing a build script to resolve a
  channel's `@handle` to its channel ID (or use a handle-based feed), narrowly superseding the
  Mark 12 audit's "do not resolve channel IDs by any means" finding for this task only.
- **Mark 14** (owner directive, in response to a raised G-M8 conflict): the **Container vs.
  Stream** distinction — the rail component/schema/inclusion decision is an Artifact subject to
  G-M1–G-M8 (satisfied by this implementation itself being explicitly requested); individual items
  inside the rail are **Raw Telemetry**, exempt from per-item G-M8, conditional on the guardrails,
  visible disclosure, and kill switch below being enforced in code. Mark 14's own guardrail table
  lists, for YouTube specifically, "**ONLY**: Title, Date, and a link" — see "On thumbnails" below
  for why this implementation follows that narrower list rather than Mark 13's original mention of
  a thumbnail field.

## Ticker Tape Guardrails — what's enforced and where

| Field shown | Fields never shown | Enforced in |
|---|---|---|
| Title, date, link (per video) | Thumbnail, description, view/subscriber/like count | `src/lib/telemetry/youtubeSignal.ts` `extractEntries()` — only `<title>`/`<link rel="alternate">`/`<published>` are ever read from the Atom feed; the `LatestSignalItem` interface has no field for anything else |

## On thumbnails

The owner's original Mark 13 evidence said "authorized to fetch thumbnail, title, link, date" for
YouTube. This implementation deliberately does **not** fetch or render a thumbnail, for two
reasons recorded here rather than silently deviating:

1. Mark 14's own "Ticker Tape Guardrails" table, written specifically to resolve the G-M8 tension
   this feature raised, lists the narrower "ONLY: Title, Date, and a link" for Substack/YouTube —
   read as the more recent and more specific instruction on exactly this point.
2. Every prior Mark on this route (9 through 12) held a consistent, repeated "no remote thumbnail
   or OG image fetching" line — fetching and hotlinking a remote YouTube thumbnail would reopen
   that restriction for this route specifically. Text-only stays consistent with the rest of
   `/media`'s existing design (Mark 11's local, abstract `MediaPreviewArt` — never a fetched image).

## Channel ID resolution — unofficial, fragile, disclosed

No official, unauthenticated API exists to resolve a YouTube `@handle` to its channel ID (the
`UC...` identifier the Atom feed endpoint actually requires). The owner explicitly authorized
writing a build script for this; `src/lib/telemetry/youtubeChannelId.ts` fetches the public channel
page HTML and regex-searches for the channel ID YouTube embeds in the page. This is inherently
fragile — an unofficial mechanism, liable to break silently if YouTube changes its page structure —
and could not be tested against the real page from this session (see "Network-verification
limitation" below). It never throws; a failed resolution returns `null`, and the calling code skips
that channel entirely rather than guessing an ID.

## Kill switch

`src/data/telemetry-blocklist.json` holds `youtube.blockedVideoIds` — an array the owner can edit
directly to hide a specific video by its ID, mirroring the mechanism built for
`alexandermathai.com`'s Ledger/Live Systems rails the same pass. `getLatestSignalItems()` filters
against it before returning.

## Build-time-only, never client-side

`fetch()` is called only from `src/lib/telemetry/*.ts`, imported only by
`LatestSignalRail.astro`'s frontmatter, which executes exclusively during `astro build`/`astro dev`.
`scripts/check-public-output.mjs` (this repo's postbuild guard) still passes with 0 violations in
both `PUBLIC_PREVIEW` modes — no fetch call, channel ID, or raw feed content reaches built output
as anything other than the sanitized title/date/link fields.

## Network-verification limitation (disclosed, not hidden)

**This sandboxed build/verification environment cannot reach YouTube.** Confirmed empirically this
pass: both `https://www.youtube.com/@texasmovementmedia` and
`https://www.youtube.com/@texasmovementperformance` returned `fetch failed` (a proxy-level
connection failure), consistent with `youtube.com` being one of the domains this environment's own
prior documented findings (in the sibling `alexandermathai.com` repository's `docs/rebuild-plan.md`)
list as unreachable: "General web fetches — including to LinkedIn, YouTube, Instagram, TikTok, and
even `example.com` — return `EGRESS_BLOCKED`/403 at the proxy."

**Consequence:** every build run in this environment exercises the *fallback* path (the `.stub-note`
pointing back to the confirmed destination cards above), never the *live-data* path. That fallback
path is now proven — real fetch failures, not simulated ones, degraded cleanly with zero build
errors, in both `PUBLIC_PREVIEW` modes. What is **not** verified from this environment: that channel
ID resolution succeeds against the real page, that the resulting Atom feed parses correctly, and
that the expected title/date/link fields render for real videos. Cloudflare Pages' actual build
environment has ordinary internet access and is a materially different network context than this
sandbox — recommended: a human with real network access should open a preview deploy of this branch
and visually confirm the Latest Signal section renders live items (or investigate why it doesn't)
before treating this as production-ready.

## Validation performed this pass

```
npm run typecheck        → 0 errors, 0 warnings, 0 hints (41 files)
npm run test:unit         → 104 passed, 0 failed (84 pre-existing + 20 new)
npm run check:constants   → 0 errors (pre-existing unrelated drift warnings only, unchanged)
npm run build (default)   → 13 pages, postbuild guard 0 errors
PUBLIC_PREVIEW=false build → 13 pages, postbuild guard 0 errors
npm run ci                 → all green
npm run test:a11y          → 0 axe-core violations across all 13 routes including /media
```

Manual `dist/media/index.html` inspection: the Latest Signal section renders its fallback
`.stub-note` cleanly (no partial/broken list, no thumbnail, no forbidden domain string); the
existing 8 confirmed-destination cards and their link gates are unchanged.

## Not done this pass

No caching infrastructure, no scheduled rebuild trigger, no API key/secret, no Worker/proxy, no
Cloudflare/DNS/deployment change, no merge, no production release. The existing 8 confirmed source
destinations, their `confirmationStatus` values, and their link gates (Mark 10/11) were not
modified — Latest Signal is an additive section, not a replacement.
