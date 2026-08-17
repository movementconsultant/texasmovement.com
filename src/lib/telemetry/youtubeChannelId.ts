// src/lib/telemetry/youtubeChannelId.ts
//
// Resolves a YouTube @handle to its channel ID (the "UC..." identifier
// YouTube's Atom feed endpoint requires — a different value from the
// @handle used in the profile URL). Authorized explicitly by the owner in
// Mark 13 ("write a build script to resolve the @handle to the channel
// ID, or use the handle-based feed") — this narrowly supersedes the
// Mark 12 audit's blanket "do not resolve channel IDs by scraping" finding
// for this task only.
//
// This is unofficial and inherently fragile: it fetches the public
// channel page HTML and looks for the channel ID YouTube embeds in the
// page (no official, unauthenticated API exists for this lookup — the
// official method requires a YouTube Data API key, a credential this task
// does not introduce). Never throws; returns null on any failure, and the
// caller must fall back to a static destination rather than guess an ID.
import { safeFetch } from "./fetchWithTimeout";

const CHANNEL_ID_PATTERN = /"channelId":"(UC[0-9A-Za-z_-]{22})"/;
const CANONICAL_LINK_PATTERN =
  /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[0-9A-Za-z_-]{22})"/;

export async function resolveChannelId(handle: string): Promise<string | null> {
  const normalizedHandle = handle.replace(/^@/, "");
  const result = await safeFetch(`https://www.youtube.com/@${normalizedHandle}`, {
    headers: { Accept: "text/html" },
  });

  if (!result) return null;

  const match = result.text.match(CHANNEL_ID_PATTERN) ?? result.text.match(CANONICAL_LINK_PATTERN);
  if (!match) {
    console.warn(`[telemetry] could not find a channel ID on the @${normalizedHandle} page — falling back.`);
    return null;
  }

  return match[1];
}
