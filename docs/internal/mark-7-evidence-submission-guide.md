# Mark 7 Evidence Submission Guide

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

How to use `docs/internal/mark-7-founder-evidence-intake.md` / `.json`, and what happens (and does
**not** happen) after a field is filled in. This guide does not itself submit, approve, or publish
anything — it explains the process for a human to follow.

---

## 1. What this workspace is for

The eight TMI hub routes (`/about`, `/ecosystem`, `/consulting`, `/media`, `/performance`,
`/distribution`, `/hero`, `/partners`) are all in the **Building** state: honest, restrained,
zero-conversion scaffolds with no claim requiring evidence (see
`docs/mark-6-safe-hub-route-implementation.md`). Moving any route toward **Evidence-ready** —
the next state defined in `docs/mark-5-route-completion-specification.json` — requires real,
owner-supplied evidence: positioning language, service definitions, verified metrics, credentials,
permissions, and decisions. This workspace is where that evidence gets collected, in one place,
in a structure that maps directly onto the existing governance schema.

## 2. What filling in a field does — and does not — do

**Filling in a field in `mark-7-founder-evidence-intake.md`/`.json` does not, by itself:**
- change any public route's content;
- change any `verificationStatus` in `docs/mark-5-tmi-content-model-and-proof-registry.json`;
- activate any conversion mechanism, form, or contact path;
- constitute legal, editorial, or claims approval.

**Filling in a field does:**
- create a durable, dated, attributable record of what the owner has supplied and decided;
- give a future, separately-scoped implementation pass everything it needs to propose a specific,
  narrow content or route change;
- start the clock on the review steps below, if the owner also updates the field's `ownerDecision`.

## 3. The submission-to-publication path

1. **Owner fills a field.** Replace the blank/template value in
   `mark-7-founder-evidence-intake.md` (and, ideally, the matching row in the `.json` companion so
   the record stays machine-readable) with real content or a real evidence location. Set
   `verificationStatus` to `owner-submitted`.
2. **Reviewer checks it.** Whoever the owner designates as reviewer (the `reviewer` field) confirms
   the evidence is real, sourced, and matches what it claims. Set `verificationStatus` to
   `needs-review` while this is in progress, then `verified` once confirmed — or `rejected` /
   `deferred` if it doesn't hold up or isn't ready.
3. **Cross-reference the proof registry.** If the field has an `evidenceIdReference` (e.g.
   `PR-CONSULT-001`), the verified evidence is what would let that specific
   `docs/mark-5-tmi-content-model-and-proof-registry.json` entry move its own `verificationStatus`
   past `absent` — **in a separate, future pass**, not automatically and not by this guide. That
   file is not edited by this Mark 7 pass.
4. **Owner makes the publication decision.** Independent of technical verification, the owner sets
   the field's `ownerDecision` (`approve` / `revise` / `defer` / `do not publish`, or the
   section-specific equivalent for Sections E and F). Only `approve` opens the door to a future
   content change.
5. **A separate, explicitly-scoped implementation pass proposes the actual route/content change.**
   That pass reads the approved, verified field, drafts the specific copy or module, runs it
   through the same claims-restraint review every other pass in this project has used, and only
   then updates the live route. This guide and the intake workspace do not perform that pass.
6. **Track progress in the approval queue.** `docs/internal/mark-7-content-approval-queue.md` is
   the compact, cross-route view of every field's current status and what blocks it — check it
   after each round of owner input to see what's ready for the next step.

## 4. Rules that never change, no matter what gets submitted

- **HERO (`/hero`):** no route advancement without all five Mark 2 audit-evidence items **and**
  explicit owner approval — this workspace collects inputs for that audit, it does not perform it.
- **Performance (`/performance`):** the prohibited-claims list (D-03) is a standing rule sourced
  from `DISCLAIMERS.performance`, not something an owner decision can override through this intake.
  Coaching/event content additionally requires the full legal/insurance/waiver/safety checklist
  (D-06) to close first.
- **Health, FounderLink, Social/Gather, Reparations:** out of scope for this workspace entirely,
  beyond the existing confirmation in Section A-07 that they remain private/incubating.
- **No invented evidence, ever.** A blank field stays blank until the owner supplies something real
  — nobody filling this workspace out, including a future implementation pass, may invent a name,
  number, date, client, outcome, credential, product fact, health assertion, legal assertion,
  performance result, or media statistic to close a field.
- **No infrastructure change from this workspace.** Section G is a pointer checklist to
  `docs/mark-5-owner-evidence-request-packet.md` section 8 — filling it in does not connect
  Cloudflare, bind a domain, change DNS, or create any account.

## 5. Where to look next

- `docs/internal/mark-7-founder-evidence-intake.md` / `.json` — the blank fields themselves.
- `docs/internal/mark-7-content-approval-queue.md` — the compact cross-route status tracker.
- `docs/mark-5-tmi-content-model-and-proof-registry.md` / `.json` — the governance schema this
  intake feeds (content-model object types, proof-registry sections and IDs).
- `docs/mark-5-route-completion-specification.md` / `.json` — the four-state definition of done
  (Building / Evidence-ready / Conversion-ready / Release-candidate) each route is measured against.
- `docs/mark-5-owner-evidence-request-packet.md` — the original, less structured evidence request
  this workspace supersedes for content purposes (infrastructure section 8 remains the canonical
  source, referenced rather than duplicated here).
