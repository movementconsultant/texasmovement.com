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
// a link ever render — no thumbnail, no description, no metric. This is
// deliberately narrower than the Mark 13 brief's original "thumbnail"
// mention: Mark 14's guardrail table lists "ONLY: Title, Date, and a
// link" for Substack/YouTube, and fetching/hotlinking a remote thumbnail
// image would also reopen the "no remote thumbnail" restriction every
// prior Mark (9-12) held on this route. See the implementation doc for the
// full reasoning.
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

export async function getLatestSignalItems(): Promise<LatestSignalResult> {
  const allItems: LatestSignalItem[] = [];

  for (const channel of CHANNELS) {
    const channelId = await resolveChannelId(channel.handle);
    if (!channelId) continue;

    const feedResult = await safeFetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { headers: { Accept: "application/atom+xml, application/xml, text/xml" } },
    );
    if (!feedResult) continue;

    try {
      allItems.push(...extractEntries(feedResult.text, channel.label));
    } catch (err) {
      console.warn(`[latest-signal] failed to parse feed for ${channel.handle} — skipping. (${err})`);
    }
  }

  if (allItems.length === 0) {
    return { status: "fallback", items: [] };
  }

  const blockedVideoIds = new Set<string>(blocklist.youtube?.blockedVideoIds ?? []);
  const filtered = allItems.filter((item) => {
    const videoId = videoIdFromLink(item.link);
    return !videoId || !blockedVideoIds.has(videoId);
  });

  if (filtered.length === 0) {
    return { status: "fallback", items: [] };
  }

  filtered.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  return { status: "ok", items: filtered.slice(0, MAX_ITEMS) };
}
