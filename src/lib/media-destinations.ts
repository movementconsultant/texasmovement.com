// src/lib/media-destinations.ts
//
// Mark 11 — flattens the "media" collection's destination-index records into
// individual, already-gated confirmed destinations, one per rendered
// preview card. Kept as a plain module (no "astro:content" import) so it is
// directly testable against raw JSON under vitest, same as
// src/lib/media-schema.ts. This is the single place the record-level +
// per-destination link gate is evaluated; src/components/media/MediaCard.astro
// re-checks isSafeHttpUrl defensively before rendering an anchor, but does
// not re-derive the gate from scratch.
import type { z } from "astro/zod";
import type { mediaEntrySchema } from "./media-schema";

type MediaEntryData = z.infer<typeof mediaEntrySchema>;

export interface ConfirmedDestination {
  recordId: string;
  sourceClass: MediaEntryData["sourceClass"];
  sourceLabel: string;
  recordTitle: string;
  recordSummary: string;
  platform: string;
  handle: string;
  url: string;
  linkText: string;
  confirmationStatus?:
    | "owner-authorized-handle-derived"
    | "owner-confirmed-source-destination"
    | "owner-supplied-canonical-url"
    | "owner-confirmed-canonical-url";
}

// Defensive URL check — only ever used to gate rendering, never trusted blindly.
export function isSafeHttpUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

// Record-level gate: all four conditions simultaneously, same as Mark 10.
export function isRecordApprovedForDestinationIndex(d: MediaEntryData): boolean {
  return (
    d.linkMode === "destination-index" &&
    d.status !== "placeholder" &&
    d.publicDisplayStatus === "approved-static-index" &&
    d.ownerApprovalStatus === "approved-static-index" &&
    Array.isArray(d.destinations)
  );
}

// Flattens every approved record's destinations[] into individual confirmed
// destinations. A destination that fails its own per-destination gate
// (urlStatus !== "owner-supplied" or an unsafe/missing URL — e.g. the
// inert LinkedIn/Facebook entries) is silently omitted: no card, no link,
// no inert placeholder text renders for it anywhere on the page.
export function getConfirmedDestinations(
  entries: Array<{ id: string; data: MediaEntryData }>,
): ConfirmedDestination[] {
  const result: ConfirmedDestination[] = [];
  for (const entry of entries) {
    const d = entry.data;
    if (!isRecordApprovedForDestinationIndex(d)) continue;
    for (const dest of d.destinations ?? []) {
      if (dest.urlStatus === "owner-supplied" && isSafeHttpUrl(dest.url)) {
        result.push({
          recordId: entry.id,
          sourceClass: d.sourceClass,
          sourceLabel: d.sourceLabel,
          recordTitle: d.title,
          recordSummary: d.summary,
          platform: dest.platform,
          handle: dest.handle,
          url: dest.url,
          linkText: dest.linkText,
          confirmationStatus: dest.confirmationStatus,
        });
      }
    }
  }
  return result;
}

// Human-facing group labels for the three source classes this page ever
// groups by. Anything else (e.g. a future "approved-vertical" record) has
// no defined group here and is intentionally excluded from
// groupDestinationsBySourceClass — this page only ever shows TMM/TMI/founder.
export const SOURCE_GROUP_ORDER: ReadonlyArray<{
  sourceClass: "TMM" | "TMI" | "founder-AVM";
  label: string;
}> = [
  { sourceClass: "TMM", label: "Texas Movement Media" },
  { sourceClass: "TMI", label: "Texas Movement Editorial" },
  { sourceClass: "founder-AVM", label: "Founder Media" },
];

export interface DestinationGroup {
  sourceClass: "TMM" | "TMI" | "founder-AVM";
  label: string;
  destinations: ConfirmedDestination[];
}

export function groupDestinationsBySourceClass(
  destinations: ConfirmedDestination[],
): DestinationGroup[] {
  return SOURCE_GROUP_ORDER.map(({ sourceClass, label }) => ({
    sourceClass,
    label,
    destinations: destinations.filter((dest) => dest.sourceClass === sourceClass),
  }));
}
