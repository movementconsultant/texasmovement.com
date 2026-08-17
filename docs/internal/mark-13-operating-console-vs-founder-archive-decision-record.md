# Mark 13 — Decision Record: TMI Operating Console vs. AVM Founder Systems Archive

Internal record of the shared-system relationship enforced by Mark 13's
dual-property visual pass, and why the two properties look the way they do
relative to each other. Companion to:

- `docs/mark-13-tmi-future-firm-operating-console.md` / `.json` (this repo)
- `alexandermathai.com/docs/mark-13-avm-founder-systems-archive.md` / `.json`

## The relationship, in one paragraph

Both properties now share the same **structural grammar** — a near-black
dark-first field, slightly raised panels, hairline structural borders, and
exactly one restrained accent color reserved for keyboard focus and sparse
status/marker use. They deliberately do **not** share the same literal
palette, type identity, or layout density. TMI reads as an institutional
operating console (mono metadata, card-grid ecosystem index, technical
signal directory); AVM reads as a founder's editorial archive (serif
headings, wide prose measure, reading-first hierarchy). The grammar is
shared; the dialect is not.

## Why the accent colors differ (TMI green, AVM orange)

This is the single most consequential decision in this pass, so it's
recorded here in addition to each repo's own doc. The brief's suggested
shared token block gives `--ff-accent-signal` one literal value
(`#00ff94`, a signal green) for both properties. TMI adopted it as-is (it
had no pre-existing accent reserved for this exact role). AVM already had
its own established, tested, documented accent (`--color-accent`, orange,
contrast-audited in `docs/mark-2-release-audit.md` on the AVM side) used
consistently across buttons, focus rings, and eyebrows since its original
build. Forcing AVM onto TMI's literal green would have:

1. Required touching a well-tested, mature system for a change with no
   functional benefit — pure risk for the sake of matching a suggested hex.
2. Directly worked against this pass's own non-negotiable rule: *"AVM must
   never be visually or semantically collapsed into a TMI corporate
   route."* Two properties sharing one exact bright accent hue is a strong
   visual signal of common ownership/identity — closer to a shared brand
   system than to "related but distinct."

So `--ff-accent-signal` (and `--ff-focus-ring`, which follows the same
logic) is defined identically **by name and role** in both repos, and
differently **by value** — each aliases its own site's own accent. This is
explicitly permitted by the brief's Part D instruction to "add semantic
aliases or map current variables carefully" and to adjust a suggested
token "if it... harms an existing component" — read here as: harms the
brief's own distinctness requirement.

## Why TMI changed more than AVM

TMI's pre-Mark-13 site was a fully light-themed "paper" design with zero
existing dark-mode infrastructure. Achieving "dark-first" for TMI required
remapping its base palette (`--paper`, `--panel`, `--ink`, etc.) from light
to dark values, plus a handful of component-level fixes where a token had
been double-duty'd as both a text color and a fill color (`--ink` used as
both body-text color and solid-button background — flipping its value
broke the button until fixed; see the TMI doc's "Component-level fixes"
section).

AVM's pre-Mark-13 site was **already** dark-first, already token-driven
with zero hardcoded colors anywhere outside `tokens.css`, and already
implementing nearly every specific requirement Part C of the brief listed
for a "Founder Systems Archive" (serif editorial type, wide reading
measure, restrained single accent, text-never-color-alone status pattern,
modest radii). There was nothing broken to fix and no gap between the
brief's ask and AVM's existing state — so AVM's change is a single
additive token file, not a redesign.

This asymmetry is intentional and is not a sign the AVM pass is
"incomplete" — see the acceptance criteria in AVM's own Mark 13 doc, all of
which were already true before this pass and remain true after it.

## Governance basis

This decision record, and both properties' Mark 13 docs, sit under the same
disclosure discipline established across this project's prior Marks: state
plainly what changed, why, what was deliberately left alone, and what a
future reader needs to know to avoid re-breaking something that was fixed
on purpose (e.g., don't reuse `--ink` as a fill color on TMI; don't force
AVM's accent to match TMI's literal hex).
