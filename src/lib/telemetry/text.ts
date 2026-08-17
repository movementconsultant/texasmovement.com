// src/lib/telemetry/text.ts
//
// Text sanitization for the "Latest Signal" YouTube rail — the "Ticker
// Tape Guardrails" from the Mark 13/14 governance decision. Every raw
// string pulled from YouTube's Atom feed at build time passes through
// here before it ever reaches a component. See
// docs/mark-13-latest-signal-implementation.md.

export function decodeEntities(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .trim();
}

/** Title guardrail — plain text only, no HTML, reasonable length cap. */
export function sanitizeTitle(raw: string, maxLen = 140): string {
  const plain = decodeEntities(raw).replace(/<[^>]+>/g, "");
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen - 1).trimEnd()}…`;
}

/** Best-effort ISO date string from whatever the source supplied; null if unparsable. */
export function safeIsoDate(raw: string | undefined): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.valueOf())) return null;
  return d.toISOString();
}
