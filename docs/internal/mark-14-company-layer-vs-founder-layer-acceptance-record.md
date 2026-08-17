# Mark 14 — Decision Record: Company Layer vs. Founder Layer Acceptance

Internal record accompanying the Mark 14 owner-acceptance audit. Companion
to:

- `docs/mark-14-tmi-owner-acceptance-and-commercial-readiness.md` (this repo)
- `alexandermathai.com/docs/mark-14-avm-owner-acceptance-and-founder-layer-review.md`
- `docs/internal/mark-13-operating-console-vs-founder-archive-decision-record.md` (this repo, prior mark)

## The separation, in practical visitor terms

A first-time visitor landing on **texasmovement.com** sees a company: a
controlled index of business verticals, an editorial media directory, and
explicit "Building"/"Private" labels wherever something isn't live yet.
Nothing on it reads as one person's personal writing or opinion.

A first-time visitor landing on **alexandermathai.com** sees a founder: a
named individual's authored notes, work history, and operating thesis,
presented as a personal archive rather than a company brochure. The TMI
ecosystem is named as context (Alexander is its founder), never absorbed
into it — the footer lists TMI's verticals as informational text, not as
AVM's own product lineup.

Both audits (Mark 14, this pass) confirmed this distinction holds visually
and does not require any correction.

## Shared design principles (confirmed intact this mark)

- Dark-first foundation, hairline structural borders, no glassmorphism or
  fake dashboards.
- Exactly one restrained accent color per property, reserved for
  focus/status/CTA use — never a background fill, glow, or animated cue.
- The same `--ff-*` semantic token *names* on both properties, so a future
  contributor working across both repos has one shared vocabulary to
  reason in, without either property's literal values being forced to
  match.
- No fabricated telemetry, uptime, counters, or activity feeds on either
  property — both `/media`'s Latest Signal rail (TMI) and `/ledger`'s
  Substack index (AVM) carry an explicit "not individually reviewed" /
  "not individually reviewed before it appears" disclosure and a working
  static fallback when the automated pull is unavailable, which it is in
  this build environment (confirmed both.)

## Deliberately different (confirmed intact this mark)

- **Type identity:** TMI uses a proportional sans + mono system (IBM Plex
  family); AVM uses a serif display face for headings (Iowan Old
  Style/Sitka Text/Georgia) — the single strongest visual signal that these
  are different kinds of properties at a glance.
- **Accent hue:** TMI's signal accent is green (`#00ff94`, new to Mark 13);
  AVM's is its own pre-existing orange (`--color-accent`). Deliberately not
  unified — see the Mark 13 decision record for the full reasoning (a
  shared literal hue would read as shared branding, working against the
  "never collapsed into a TMI corporate route" rule).
- **Density:** TMI's `/ecosystem` and `/media` are card-grid, operating-lane
  layouts; AVM's `/notes` and `/ledger` are single/triple-column reading
  layouts with a serif lede and generous whitespace.
- **Theme posture:** TMI is single-theme dark (no light variant exists);
  AVM is dark-first with a full, independently-audited light theme and an
  explicit toggle. This asymmetry is intentional, not a gap — TMI never had
  a light-mode requirement in either Mark 13 or Mark 14's brief, and adding
  one now would be founder-layer-appropriate polish work, not a company-
  layer need.

## Smallest future commercial-readiness package — TMI

Per `docs/mark-14-tmi-owner-acceptance-and-commercial-readiness.md` §9:
(1) a verified general-contact inbox, (2) flipping exactly one vertical to
`status: "live"` once genuinely ready, (3) an owner-approved
`PUBLIC_PREVIEW=false` production build. All three are explicitly
owner-gated in `CLAUDE.md`, not engineering tasks.

## Smallest future founder-authority package — AVM

Per `docs/mark-14-avm-owner-acceptance-and-founder-layer-review.md` §9:
(1) a verified `PUBLIC_CONTACT_ENDPOINT` pointing at the already-written,
undeployed Worker, (2) a second real (non-placeholder) artifact entry,
(3) KV-backed rate limiting on the contact Worker. All three require an
owner action (Cloudflare account access, content authorship, or KV
provisioning) this environment does not have.

## Why neither package is implemented in this mark

Mark 14's own scope is an acceptance and precision pass — not a feature
expansion, and explicitly not authorized to add conversion paths, forms,
API connections, or content claims. Every item in both "not yet
implemented" lists requires either an owner-only credential/decision
(`CLAUDE.md` rules on TMI; Cloudflare/KV access on AVM) or new authored
content — none of which this pass has standing to originate. Recording
them here keeps the next work package legible without starting it.
