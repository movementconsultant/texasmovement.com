# Mark 5 Route Completion Specification

Documentation and test-planning work only. No route was modified in this pass beyond what this
document describes as already true — every route below is already in its "Building" definition-of-
done state, and nothing here activates a conversion mechanism, adds a claim, or changes navigation.

Companion machine-readable file: `docs/mark-5-route-completion-specification.json` (same content,
structured, with the full 17-field detail per route). Companion documents:
`docs/mark-5-tmi-content-model-and-proof-registry.md` / `.json` (Parts A, B, E — the content
objects and proof IDs referenced below) and `docs/mark-5-owner-evidence-request-packet.md`
(Part D).

## Definition-of-done states (used for every route below)

| State | Meaning |
|---|---|
| **Building** | Current, already-shipped state: restrained description, honest posture badge, zero conversion surface. Every route below is already here. |
| **Evidence-ready** | Required content objects/proof-registry entries reach "evidence supplied" or better; still no conversion mechanism, still no route-level review sign-off. |
| **Conversion-ready** | Evidence-ready, plus all required reviews are signed off, plus a conversion mechanism is *designed but not activated* — the "future inert prototype" state. |
| **Release-candidate** | Conversion-ready, plus explicit owner authorization to activate. **No route in this document is at this state.** |

---

## Route-by-route summary

Full 17-field detail (current/absent/future modules, exact content objects, proof-registry IDs,
visual assets, metadata, SEO/canonical, indexability, internal-link/nav/conversion eligibility,
required review, test cases, all four DoD states, blockers, non-actions) is in the JSON companion
→ `routes`.

### /
**Building** (met). One conditional CTA slot, currently absent (empty `VERIFIED_INBOXES`). No
service, pricing, or testimonial content. **Blocker:** `hello@texasmovement.com` not yet
operationally verified (`docs/LAUNCH_BLOCKERS.md`).

### /about
**Building** (met). Reuses only already-approved `ORG.boilerplate`. No founder biography — a
future founder-context module would require the corresponding `Founder claim dependency` object to
resolve against alexandermathai.com's own claims review (`PR-FOUNDER-001`) first.

### /ecosystem
**Building** (met; this is a map page, not an offer — the other three DoD states don't apply).
Every classification traces to an already-published audit document, not a new claim. Health,
FounderLink, Social/Gather, and Reparations remain **non-operational, non-actionable, and
non-clickable** — no link of any kind to any of the four, verified by the existing
`tests/hub-routes.test.ts` assertions, which any future edit to this page must keep passing.

### /consulting
**Building** (met). **Blocker:** no documented service packages, proof assets, intake operations,
or commercial terms exist yet. Evidence-ready requires `PR-CONSULT-001`/`002`; Conversion-ready
additionally requires a fully specified, legal-reviewed Service module and an unactivated intake
design; Release-candidate additionally requires explicit owner authorization and a
`VERIFIED_INBOXES` entry.

### /media
**Building** (met; no conversion mechanism is planned for this route in this document — Conversion-
ready/Release-candidate are not applicable). **Blocker:** the previously-flagged 2.1M+ views figure
remains founder-reported and unverified (`PR-MEDIA-001`); no platform URL has been manually
confirmed (`PR-MEDIA-002`).

### /performance
**Building** (met), preserving an explicitly **non-clinical, non-diagnostic, non-therapeutic**
scope throughout. **Blocker:** no documented methodology, coach/operator availability, liability
posture, or intake operations exist — the hardest-gated commercial offer in the ecosystem.
Conversion-ready is reachable *only* for a strictly educational, non-enrollment module; coaching/
enrollment activation is explicitly out of scope for this document and would require its own,
separate governance process this document does not authorize.

### /distribution
**Building** (met; no public claim is planned, so Evidence-ready/Conversion-ready/Release-candidate
are not applicable). Intentionally the most static of the five "Building" route pages — internal
capability only.

### /hero
**Building** (met), preserving the exact language: **"External storefront / internally
unaudited."** No storefront link, catalog, product claim, checkout, support claim, price,
inventory, shipping, return-policy, or product-performance statement is allowed until a separate
authenticated storefront audit and owner approval are both complete — this document does **not**
authorize even a "future inert prototype" state until that full audit clears; skipping straight to
"future owner-approved activation" is likewise not authorized. `PR-HERO-001` is the single gating
entry for this entire route's future expansion, and its `allowedRoutes`/`allowedFormats` are both
empty arrays today. Zero `<a>` elements on the current page, unchanged.

### /partners
**Building** (met). **Blocker:** inbox ownership, response operations, privacy terms, and routing
logic are all undecided. Evidence-ready requires a written fit/criteria framework per named
category; Conversion-ready additionally requires all four undecided items above resolved and
legal-reviewed, plus an unactivated intake design; Release-candidate additionally requires explicit
owner authorization and a `VERIFIED_INBOXES` entry for `partnerships@`.

---

## Validation performed this pass

- `docs/mark-5-route-completion-specification.json` parsed successfully with
  `node -e "JSON.parse(...)"` — confirmed exactly 9 routes, matching the list given in the Mark 5
  brief.
- Every `exactContentObjectsRequired` entry names an object type defined in
  `docs/mark-5-tmi-content-model-and-proof-registry.json`'s Part A; every
  `requiredProofRegistryIdsOrTypes` entry names an ID defined in that same file's Part B.
- `/hero` preserves the exact required "External storefront / internally unaudited" language and
  the full prohibited-module list verbatim from the Mark 5 brief.
- `/performance` preserves a non-clinical, non-diagnostic, non-therapeutic scope and does not
  define medical/injury-prevention/treatment/recovery/guaranteed-performance content as eligible
  without a separate governance process.
- `/ecosystem` keeps Health, FounderLink, Social/Gather, and Reparations explicitly
  non-operational, non-actionable, and excluded from any link.
- No route in this document reaches "Release-candidate," and no route's conversion mechanism was
  built, designed in code, or activated in this pass.
