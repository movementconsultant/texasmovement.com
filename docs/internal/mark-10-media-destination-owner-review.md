# Mark 10 Media Destination Owner Review

**PRIVATE. INTERNAL ONLY. NOT RENDERED. NOT PUBLIC CONTENT.**

`/media` now renders 8 static outbound links, built from owner-supplied handles under the Mark 10
phase-shift authorization, plus 2 inert entries (LinkedIn, Facebook) with no link. This document
is the owner's checklist to confirm, correct, or reject each one. Reply with simple directives —
e.g. "Confirm 1–8, reject 9, defer 10" — no paragraphs required.

> Do not add platform credentials, passwords, tokens, or OAuth secrets to this repository or this
> document. Confirming a URL below only means "this is the correct canonical link" — it is not a
> claim of independent verification, ownership audit, or content review.

---

## Section 1 — Confirm each rendered URL is correct

Each row is currently **live on `/media`** as static text with an outbound link. Check the box
only if the URL is exactly correct.

- [ ] 1. Texas Movement Media — YouTube — `https://youtube.com/@texasmovementmedia`
- [ ] 2. Texas Movement Performance — YouTube — `https://youtube.com/@texasmovementperformance`
- [ ] 3. Texas Movement Media — Instagram — `https://instagram.com/tmmediausa`
- [ ] 4. Texas Movement Media — TikTok — `https://tiktok.com/@texasmovementmedia`
- [ ] 5. Texas Movement Editorial — Substack — `https://texasmovement.substack.com`
- [ ] 6. Alexander Mathai — YouTube — `https://youtube.com/@tmipresident`
- [ ] 7. Alexander Mathai — Instagram — `https://instagram.com/alexanderofnazareth`
- [ ] 8. Alexander Mathai — TikTok — `https://tiktok.com/@alexandervmathai`

If any of 1–8 is wrong, reply with the number and the correct handle (e.g. "8 wrong, correct
handle is X") — do not send the corrected URL itself; the site derives it from the handle using
the fixed construction rule in `docs/mark-10-controlled-media-destination-population.md` Part B.

---

## Section 2 — Supply the two missing URL slugs (currently inert)

Both render today as plain text — "Owner URL required" — with no link, because no confirmed URL
slug exists in this repository.

- [ ] 9. LinkedIn — Alexander Mathai — reply with the exact profile URL or slug (e.g.
      `linkedin.com/in/[exact-slug]`). **Note:** even once supplied, this repository's
      `scripts/check-public-output.mjs` will still hard-block any `linkedin.com` string from
      appearing in the built site. Rendering this link requires a separate, explicit decision to
      lift or narrow that guard — supplying the slug here does not by itself make the link go
      live. See Section 4.
- [ ] 10. Facebook — Alexander Mathai — reply with the exact profile URL or page slug.

If you do not have an exact slug on hand, reply "defer 9" / "defer 10" and both stay inert with no
further action needed.

---

## Section 3 — Confirm exclusions were correct

- [ ] 11. Confirm HERO (YouTube/Instagram/TikTok — herofootwear / herofootwearusa / herofootwear)
      was correctly excluded entirely, per the Mark 10 brief's "strictly out of scope" instruction.
      Reply "confirm 11" or "reject 11, HERO should be included" (a rejection would require a new,
      separate authorization — HERO stays untouched by default).

---

## Section 4 — LinkedIn guard decision (only relevant if you completed item 9)

Rendering a LinkedIn link on texasmovement.com requires one of the following. Pick one:

- [ ] 12a. Leave LinkedIn inert on texasmovement.com indefinitely (no guard change, no link, ever).
- [ ] 12b. Authorize a narrow, explicit exception in `scripts/check-public-output.mjs` scoped only
      to this one confirmed founder LinkedIn URL (a follow-up task, not done in this pass).
- [ ] 12c. Defer this decision — LinkedIn stays inert until you choose 12a or 12b.

---

## Section 5 — alexandermathai.com founder destinations (blocked this pass)

No change was made on alexandermathai.com. Its `scripts/postbuild-guard.mjs` unconditionally fails
the build if any social-platform domain string (YouTube, Instagram, TikTok, LinkedIn, Facebook,
and others) appears anywhere in the built output, regardless of a `verified` flag's value. That
repository's `src/data/social.ts` already has entries for LinkedIn, YouTube (`tmipresident`),
Instagram (`alexanderofnazareth`), and TikTok (`alexandervmathai`) — all `verified: false` — with
no Facebook entry at all.

- [ ] 13. Authorize a follow-up pass to add a narrow, explicit exception to
      `postbuild-guard.mjs` for these specific, owner-confirmed founder URLs (a new task, not
      started).
- [ ] 14. Leave alexandermathai.com as-is — no founder social links render there for now.
- [ ] 15. Defer this decision.

---

## Reminders

- Confirming a URL here is an **owner assertion that the link is correct**, not an independent
  verification of account ownership, content, or activity on that platform. No claim beyond "this
  is the correct link" is made or implied anywhere on `/media`.
- Nothing in this document, once acted on, authorizes API/RSS integration, embeds, individual-item
  population, account modification, or any change outside the exact fields listed above.
- See `docs/mark-10-controlled-media-destination-population.md` for the full technical record of
  what was built and why each excluded item was excluded.
