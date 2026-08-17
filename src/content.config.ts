// src/content.config.ts
//
// Mark 9 — the "media" collection is a strictly local, source-controlled,
// build-time-only data layer for the /media route's TMM editorial index. It
// is loaded from static JSON files in src/content/media/ via Astro's glob
// loader (no remote fetch, no API, no RSS, no database). Every field is a
// controlled-vocabulary status describing how far a record has moved
// through owner review — never a claim that content is live, verified, or
// active. The schema itself lives in src/lib/media-schema.ts so it can be
// imported both here and by tests/media-index.test.ts (plain vitest cannot
// resolve the "astro:content" virtual module used below). See
// docs/mark-9-controlled-tmm-feed-implementation.md for the schema
// rationale and docs/internal/mark-9-media-placeholder-owner-update-guide.md
// for how an owner replaces a placeholder with real reviewed material.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { mediaEntrySchema } from "@/lib/media-schema";

export { mediaEntrySchema };

const media = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/media" }),
  schema: mediaEntrySchema,
});

export const collections = { media };
