// src/lib/telemetry/youtubeSignal.ts
//
// "Latest Signal" — build-time YouTube RSS (Atom) retrieval for the two
// owner-confirmed TMM channels (texasmovementmedia, texasmovementperformance),
// per the owner's Mark 13 evidence/authorization and the Mark 14 "Raw
// Telemetry" governance classification (see
// docs/mark-13-latest-signal-implementation.md). Never throws;
// `getLatestSignalItems()` always resolves to a LatestSignalResult — a
// resolution/fetch/parse failure resolves `status: "fallback"` with an
// empty items array, and the calling component must degrade to a static
// note rather than a broken list.
//
// Ticker Tape Guardrails (Mark 14, applied here the same as
// alexandermathai.com's Ledger/Live Systems rails): only title, date, and
// a link ever render — no description, no metric. Mark 14's guardrail
// table listed "ONLY: Title, Date, and a link" for Substack/YouTube,
// deliberately narrower than the Mark 13 brief's original "thumbnail"
// mention, specifically to keep every prior Mark's (9-12) "no remote
// thumbnail" restriction intact.
//
// Mark 26 explicitly amends that one restriction, for this rail only: a
// thumbnail is now authorized because it is factual, source-derived
// imagery (the video ID this module already extracts from the confirmed
// Atom feed, used to build-time-fetch and self-host a real frame from that
// specific video — see scripts/fetch-media-thumbnails.mjs) rather than an
// invented or fabricated visual, which is what the original restriction
// existed to prevent. This module's own return shape (LatestSignalItem)
// is unchanged by that amendment — the thumbnail lookup is entirely local
// to LatestSignalRail.astro (existsSync against the pre-fetched file), not
// a new field returned from here.
//
// Mark 27 extends the same amendment to the TMM row of SubsidiaryDossier.astro
// on /lanes: `getTmmDossierEpisodes()` below reuses this module's existing
// per-channel fetch/parse/blocklist pipeline (factored out into
// `fetchChannelEntries()` and `filterAndSort()` so both entry points share
// one implementation) to return the TMM channel's latest episodes only —
// never TMP's — for that panel's thumbnail cards. See
// scripts/fetch-media-thumbnails.mjs, which now prefetches thumbnails for
// the union of both entry points' video IDs.
import { safeFetch } from "./fetchWithTimeout";
import { resolveChannelId } from "./youtubeChannelId";
import { sanitizeTitle, safeIsoDate } from "./text";
import blocklist from "../../data/telemetry-blocklist.json";

const CHANNELS: ReadonlyArray<{ handle: string; label: string }> = [
  { handle: "texasmovementmedia", label: "Texas Movement Media" },
  { handle: "texasmovementperformance", label: "Texas Movement Performance" },
];

const MAX_ITEMS = 4;

export interface LatestSignalItem {
  title: string;
  link: string;
  publishedAt: string | null;
  channelLabel: string;
}

export interface LatestSignalResult {
  status: "ok" | "fallback";
  items: LatestSignalItem[];
}

export function extractEntries(atomXml: string, channelLabel: string): LatestSignalItem[] {
  const items: LatestSignalItem[] = [];
  const entryBlocks = atomXml.match(/<entry\b[^>]*>[\s\S]*?<\/entry>/g) ?? [];

  for (const block of entryBlocks) {
    const titleMatch = block.match(/<title\b[^>]*>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link\s+rel="alternate"\s+href="([^"]+)"/);
    const videoIdMatch = block.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/);
    const publishedMatch = block.match(/<published>([\s\S]*?)<\/published>/);

    if (!titleMatch || !linkMatch || !videoIdMatch) continue;

    const link = linkMatch[1].trim();
    if (!/^https:\/\/www\.youtube\.com\/watch\?v=/.test(link)) continue; // never trust an off-domain link from the feed body

    items.push({
      title: sanitizeTitle(titleMatch[1]),
      link,
      publishedAt: safeIsoDate(publishedMatch?.[1]),
      channelLabel,
    });
  }

  return items;
}

export function videoIdFromLink(link: string): string | null {
  const match = link.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

async function fetchChannelEntries(channel: { handle: string; label: string }): Promise<LatestSignalItem[]> {
  const channelId = await resolveChannelId(channel.handle);
  if (!channelId) return [];

  const feedResult = await safeFetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    { headers: { Accept: "application/atom+xml, application/xml, text/xml" } },
  );
  if (!feedResult) return [];

  try {
    return extractEntries(feedResult.text, channel.label);
  } catch (err) {
    console.warn(`[latest-signal] failed to parse feed for ${channel.handle} — skipping. (${err})`);
    return [];
  }
}

function filterAndSort(items: LatestSignalItem[], limit: number): LatestSignalResult {
  if (items.length === 0) {
    return { status: "fallback", items: [] };
  }

  const blockedVideoIds = new Set<string>(blocklist.youtube?.blockedVideoIds ?? []);
  const filtered = items.filter((item) => {
    const videoId = videoIdFromLink(item.link);
    return !videoId || !blockedVideoIds.has(videoId);
  });

  if (filtered.length === 0) {
    return { status: "fallback", items: [] };
  }

  filtered.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  return { status: "ok", items: filtered.slice(0, limit) };
}

export async function getLatestSignalItems(): Promise<LatestSignalResult> {
  const allItems: LatestSignalItem[] = [];
  for (const channel of CHANNELS) {
    allItems.push(...(await fetchChannelEntries(channel)));
  }
  return filterAndSort(allItems, MAX_ITEMS);
}

// Mark 27 — TMM-only episodes for the SubsidiaryDossier.astro expansion
// panel on /lanes. Deliberately a separate entry point rather than filtering
// getLatestSignalItems()'s output: that function's MAX_ITEMS=4 cap applies
// across both channels combined, so TMP's videos could crowd out TMM's
// before a post-hoc filter ever saw them. This fetches the TMM
// ("texasmovementmedia") channel only, so a "latest 3" request is always the
// TMM channel's actual latest 3, never a subset of some other channel's cap.
export async function getTmmDossierEpisodes(limit = 3): Promise<LatestSignalResult> {
  const tmmChannel = CHANNELS.find((channel) => channel.handle === "texasmovementmedia");
  if (!tmmChannel) return { status: "fallback", items: [] };
  const items = await fetchChannelEntries(tmmChannel);
  return filterAndSort(items, limit);
}
