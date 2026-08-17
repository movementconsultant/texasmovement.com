# Mark 12 JSON-LD Audit Plan

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

**This is a plan and a factual inventory of existing structured data only. No deletion, schema
change, route change, metadata change, or structured-data implementation occurs in this document
or this task.** Any correction implied by the findings below is a future owner decision, to be
carried out — if ever — in its own separate, explicitly scoped task.

---

## Search performed this pass (local source only, no external request)

```
grep -rn "application/ld+json" src
grep -rn "JsonLd|jsonLd|structured.data|schema\.org" src packages/constants/src --include="*.ts" --include="*.astro"
```

Both searches were run against this repository's own committed source only — no build output was
regenerated as part of this search (the existing `dist/` from the prior Mark 11 validation pass was
used only to confirm rendered output, not to introduce new build behavior).

---

## Inventory — every JSON-LD block currently emitted

**Exactly two `<script type="application/ld+json">` blocks exist, both in
`src/layouts/Layout.astro`, both emitted on every page that uses this layout (i.e. every page in
this repository).**

### Block 1 — schema.org `Organization`

- **Source function:** `safeOrganizationJsonLd()` in `src/lib/site.ts`, which wraps
  `organizationJsonLd()` from the vendored `packages/constants/src/seo.ts`.
- **Route(s) where emitted:** Every page (global `Layout.astro`).
- **Properties present:**

| Property | Value source | Classification |
|---|---|---|
| `@type` | Literal `"Organization"` | Not applicable (schema mechanics) |
| `name` | `ORG.legalName` = `"Texas Movement International LLC"` (`packages/constants/src/org.ts`) | **Owner-asserted.** `org.ts`'s own `stateOfFormation` and `formationYear` fields are both the `TBD` placeholder — the exact legal-entity claim implied by an "LLC" suffix is not locally evidenced by a formation record. |
| `alternateName` | `ORG.shortName` = `"Texas Movement"` | Owner-asserted |
| `url` | `PROPERTIES.tmi.url` = `https://texasmovement.com` | Source-backed (this repository's own canonical URL) |
| `logo` | `${PROPERTIES.tmi.url}/logo.png` | Source-backed — confirmed present at `public/logo.png` this pass (a local-file existence check only, not a rendering/format audit) |
| `description` | `ORG.boilerplate` | Owner-asserted (one-sentence company description) |
| `founder` (nested `Person`) | `FOUNDER.legalName`, `FOUNDER.publicName`, `FOUNDER.title`, `FOUNDER.site` (`org.ts`) | **Founder claim, owner-asserted.** Name, job title ("Founder & President"), and URL all come from locally authored constants, not an independently verified public record. |
| `sameAs` | `publishableAccounts()` filtered by `isHeldPendingConfirmation()` (see below) | **Mixed — see the sameAs breakdown below.** |
| `@id` | `${PROPERTIES.tmi.url}#org`, added at the call site in `Layout.astro` | Not applicable (schema mechanics) |

### Block 2 — schema.org `WebSite`

- **Source:** Constructed inline in `Layout.astro` (not from the vendored package).
- **Route(s) where emitted:** Every page.
- **Properties present:** `@type: "WebSite"`, `@id`, `name` (`PROPERTIES.tmi.name`), `url`
  (`PROPERTIES.tmi.url`), `description` (the page's own meta description — varies per page),
  `publisher` (a reference back to Block 1's `@id`). All source-backed to this repository's own
  routing/constants; no external claim.

### Function defined but not used in this repository

- **`personJsonLd()`**, also in `packages/constants/src/seo.ts`, carries the comment "Emit ONCE, on
  alexandermathai.com." **A repository-wide search confirms no import or call site for
  `personJsonLd` exists anywhere in `src/` of this repository.** It is shared code intended for the
  separate founder repository, which this task does not read or modify. Not applicable to this
  repository's own output; flagged here only because it lives in code this repository vendors and
  could be mistaken for something this repository emits.

---

## The `sameAs` array — full breakdown

`sameAs` is built from `publishableAccounts()` (all `ACCOUNTS` entries in
`packages/constants/src/social.ts` whose `url` is not the `TBD` sentinel), then
`safeOrganizationJsonLd()` additionally removes any URL matching `isHeldPendingConfirmation()`
(an exact-URL match on the named, disputed TMI-lane LinkedIn Company Page URL, **or** any URL
containing the substring `linkedin.com` at all).

| URL | Lane (per `social.ts`) | Removed by the "safe" filter? | Classification |
|---|---|---|---|
| `https://www.tiktok.com/@alexandervmathai` | founder | No — renders | Owner-asserted |
| `https://instagram.com/alexanderofnazareth` | founder | No — renders | Owner-asserted |
| `https://www.linkedin.com/in/alexandermathai` | founder | **Yes** (linkedin.com substring) | Held pending confirmation — correctly excluded from output |
| `https://texasmovement.substack.com` | founder (role: owned-editorial) | No — renders | Source-backed (same URL as the Mark 10/11 owner-confirmed TMI-editorial destination) |
| `https://youtube.com/@texasmovementmedia` | media | No — renders | Owner-asserted (same handle as the Mark 10/11 owner-confirmed TMM destination) |
| `https://instagram.com/tmmediausa` | media | No — renders | Owner-asserted (same handle as the Mark 10/11 owner-confirmed TMM destination) |
| `https://instagram.com/tmmusa` | media | No — renders | **Unaudited / possible duplicate.** A second, different Instagram handle in the same "media" lane, one character removed from `tmmediausa` above. No Mark 8.1/10/11 source-identity record addresses this second handle at all — it was never included in the owner-confirmed destination set. Flagged as high-risk pending owner clarification: duplicate, typo, or a genuinely distinct second account. |
| `https://www.linkedin.com/company/texasmovement` | tmi | **Yes** (named entry + linkedin.com substring) | Held pending confirmation — correctly excluded from output |
| `(tiktok, TBD)` | media | N/A — excluded upstream by `publishableAccounts()` | Not applicable (never reaches `sameAs`) |
| `https://www.tiktok.com/@herofootwear` | **hero** | No — renders | **High-risk / legacy.** HERO is explicitly out of scope for every media/destination task since Mark 10 ("STRICTLY OUT OF SCOPE — do not render, do not link, do not process"), yet this URL renders in the sitewide Organization schema on every page, including `/media`, because `social.ts`/`isHeldPendingConfirmation()` has no HERO-specific filter — only a LinkedIn-domain filter exists. |
| `https://instagram.com/herofootwearusa` | **hero** | No — renders | Same high-risk/legacy flag as above |
| `https://youtube.com/@herofootwear` | **hero** | No — renders | Same high-risk/legacy flag as above |
| `https://youtube.com/@texasmovementperformance` | performance | No — renders | Owner-asserted (same handle as the Mark 10/11 owner-confirmed founder-AVM YouTube destination — note the lane label here is "performance," not "founder-AVM"; the two classification systems, `social.ts` lanes and the Mark 8.1 source-identity `sourceClass` values, do not fully align, itself worth a future reconciliation note) |
| `(instagram, TBD)` | performance | N/A — excluded upstream | Not applicable |

**Confirmed via a manual `dist/` inspection during this pass** (reading already-built output from
the prior Mark 11 validation, not a new build triggered for this task): the ten non-TBD,
non-LinkedIn URLs above do appear verbatim in the `sameAs` array on every page, including `/media`.

---

## Classification summary

| Classification | Entries |
|---|---|
| Source-backed | `url`, `logo`, `WebSite` block properties, the Substack/TMM/Performance handles that match Mark 10/11 confirmed destinations |
| Owner-asserted | `name`, `alternateName`, `description`, `founder` sub-object, founder/TMM social handles generally |
| Unverified | The organization's implied legal-entity status (formation year/state are locally `TBD`) |
| Legacy | The two `linkedin.com` URLs (already correctly held out of output by an existing filter) |
| High-risk | The three HERO `sameAs` entries; the `instagram.com/tmmusa` entry |
| Not applicable | `personJsonLd()` (unused in this repository), all schema-mechanics fields (`@context`, `@type`, `@id`) |

---

## Required future correction decision tree (not performed this pass)

For each high-risk or unverified entry above, a future, separate, owner-approved task should choose
exactly one of:

- **Retain** — the owner reviews the entry and explicitly confirms it should keep rendering as-is.
- **Qualify** — keep the entry but add a clarifying property or narrower scope (e.g., if HERO were
  ever intentionally included, label it distinctly rather than folding it into the same
  undifferentiated `sameAs` array as TMI/TMM/founder accounts).
- **Remove** — filter the entry out, following the exact precedent already set by
  `isHeldPendingConfirmation()` for LinkedIn (a small, well-documented, testable filter function —
  not a schema redesign).
- **Replace with minimal schema** — if the Organization block's scope is judged too broad, consider
  a narrower schema emitting only source-backed properties, deferring `founder`/`sameAs` to a
  separate, more conservative decision.
- **Require owner evidence** — for the organization's implied legal-entity claim specifically,
  require the actual formation record (state, year) before treating the LLC designation as
  anything more than owner-asserted.

**"Better no schema than unsupported schema" is recorded here as a future owner decision
principle, not as authorization to edit any output during this task.** Applying it — to HERO
entries, to the `tmmusa` entry, to the legal-entity claim, or to any other flagged item — requires
its own explicit, separate, owner-approved task.

---

## What this plan explicitly does not do

- Does not delete, filter, or modify `sameAs`, `organizationJsonLd()`, `safeOrganizationJsonLd()`,
  `isHeldPendingConfirmation()`, or any other function.
- Does not add a HERO-specific filter, even though one is arguably indicated by the finding above.
- Does not change any route, page, metadata field, or test.
- Does not constitute owner authorization for any of the five decision-tree outcomes above — it
  only names them as options for whichever outcome the owner eventually chooses.
