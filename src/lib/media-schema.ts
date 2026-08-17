// src/lib/media-schema.ts
//
// The zod schema for the "media" content collection, kept in its own
// plain module (importing only "astro/zod", a real resolvable file — not
// the "astro:content" virtual module) so it can be imported both by
// src/content.config.ts (at Astro build time) and by tests/media-index.test.ts
// (under plain vitest, which has no Astro Vite plugin configured and
// cannot resolve "astro:content" on its own). See
// docs/mark-9-controlled-tmm-feed-implementation.md for the original
// single-item schema rationale and docs/mark-10-controlled-media-destination-population.md
// for the Mark 10 `destinations[]` extension (multi-platform static source
// indexes) and docs/internal/mark-9-media-placeholder-owner-update-guide.md /
// docs/internal/mark-10-media-destination-owner-review.md for how an owner
// reviews or corrects a record.
import { z } from "astro/zod";

// One platform destination inside a "destination-index" record's
// destinations[] array. `url` is null and `urlStatus` is
// "inert-missing-evidence" whenever the owner has not supplied a confirmed
// URL slug (e.g. LinkedIn/Facebook profile slugs never guessed from a
// display name) — MediaCard.astro renders no link at all for such an entry,
// only a plain-text "Owner URL required" status.
export const mediaDestinationSchema = z.object({
  platform: z.string(),
  handle: z.string(),
  url: z.url().nullable(),
  urlStatus: z.enum(["owner-supplied", "inert-missing-evidence"]),
  linkText: z.string(),
});

export const mediaEntrySchema = z.object({
  id: z.string(),
  slug: z.string(),
  status: z.enum(["placeholder", "owner-review-required", "approved-static-index"]),
  sourceClass: z.enum([
    "TMI",
    "TMM",
    "founder-AVM",
    "HERO",
    "approved-vertical",
    "third-party-with-permission",
  ]),
  sourceLabel: z.string(),
  platform: z.string(),
  format: z.string(),
  title: z.string(),
  summary: z.string(),
  publicationDate: z.string().nullable(),
  publicationDateStatus: z.enum(["placeholder", "owner-confirmation-required", "evidenced"]),
  canonicalUrl: z.url().nullable(),
  canonicalUrlStatus: z.enum(["placeholder", "owner-confirmation-required", "owner-supplied"]),
  transcriptStatus: z.enum(["absent", "owner-review-required", "supplied"]),
  accessibilityStatus: z.enum(["pending", "owner-review-required", "reviewed"]),
  rightsStatus: z.enum([
    "absent",
    "owner-asserted",
    "owner-review-required",
    "approved-for-static-index",
  ]),
  claimsStatus: z.enum(["no-claims-rendered", "owner-review-required"]),
  editorialStatus: z.enum(["placeholder", "internal-review-required", "approved-for-static-index"]),
  ownerApprovalStatus: z.enum(["pending", "owner-confirmation-required", "approved-static-index"]),
  publicDisplayStatus: z.enum([
    "placeholder-public-index",
    "internal-only",
    "approved-static-index",
  ]),
  linkMode: z.enum(["no-link", "owner-supplied-external-link", "destination-index"]),
  destinations: z.array(mediaDestinationSchema).optional(),
  imageStatus: z.enum(["no-image", "local-approved-image"]),
  imageAlt: z.string(),
  crossAttributionStatus: z.enum([
    "prohibited-pending-per-item-approval",
    "owner-approved-static-index",
  ]),
  attributionNote: z.string(),
  internalOnlyNotes: z.string(),
  updatedAt: z.string(),
});
