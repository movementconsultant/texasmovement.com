import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { extractEntries, videoIdFromLink } from "../src/lib/telemetry/youtubeSignal";
import { sanitizeTitle, safeIsoDate, decodeEntities } from "../src/lib/telemetry/text";

// Mark 13/14 "Latest Signal" telemetry rail — narrow safety net proving the
// Ticker Tape Guardrails (title/date/link, never a metric or description)
// are enforced in code, independent of whether this test run can actually
// reach YouTube's servers. See docs/mark-13-latest-signal-implementation.md.
//
// Mark 26 amends the thumbnail guardrail specifically (thumbnails are now
// authorized — self-hosted, source-derived from the confirmed feed, never
// hotlinked or fabricated); see the "self-hosted thumbnails" describe
// block below for the tests proving that amendment's own conditions.

const ROOT = join(new URL(".", import.meta.url).pathname, "..");

const FIXTURE_ATOM_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>yt:video:abc123DEF45</id>
    <yt:videoId>abc123DEF45</yt:videoId>
    <yt:channelId>UCxxxxxxxxxxxxxxxxxxxxxx</yt:channelId>
    <title>A Real Video Title With &amp; An Entity</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=abc123DEF45"/>
    <published>2026-08-01T12:00:00+00:00</published>
    <media:group xmlns:media="http://search.yahoo.com/mrss/">
      <media:description>An excerpt that must never be extracted.</media:description>
    </media:group>
  </entry>
  <entry>
    <id>yt:video:xyz987GHI65</id>
    <yt:videoId>xyz987GHI65</yt:videoId>
    <yt:channelId>UCxxxxxxxxxxxxxxxxxxxxxx</yt:channelId>
    <title><![CDATA[A CDATA-wrapped title]]></title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=xyz987GHI65"/>
    <published>2026-07-15T09:30:00+00:00</published>
  </entry>
  <entry>
    <id>yt:video:missingLink1</id>
    <yt:videoId>missingLink1</yt:videoId>
    <title>Entry with no alternate link must be skipped</title>
    <published>2026-07-01T00:00:00+00:00</published>
  </entry>
  <entry>
    <id>yt:video:offDomain001</id>
    <yt:videoId>offDomain001</yt:videoId>
    <title>Entry with an off-domain link must be skipped</title>
    <link rel="alternate" href="https://evil.example.com/watch?v=offDomain001"/>
    <published>2026-06-01T00:00:00+00:00</published>
  </entry>
</feed>`;

describe("extractEntries (Atom feed parsing)", () => {
  it("extracts only title/link/date for well-formed entries", () => {
    const items = extractEntries(FIXTURE_ATOM_FEED, "Texas Movement Media");
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      title: "A Real Video Title With & An Entity",
      link: "https://www.youtube.com/watch?v=abc123DEF45",
      publishedAt: "2026-08-01T12:00:00.000Z",
      channelLabel: "Texas Movement Media",
    });
    expect(items[1]).toMatchObject({
      title: "A CDATA-wrapped title",
      link: "https://www.youtube.com/watch?v=xyz987GHI65",
    });
  });

  it("never extracts a description, excerpt, or any field beyond title/link/date/channelLabel", () => {
    const items = extractEntries(FIXTURE_ATOM_FEED, "Texas Movement Media");
    for (const item of items) {
      expect(Object.keys(item).sort()).toEqual(
        ["channelLabel", "link", "publishedAt", "title"].sort(),
      );
      expect(JSON.stringify(item)).not.toContain("excerpt");
      expect(JSON.stringify(item)).not.toContain("must never be extracted");
    }
  });

  it("skips an entry missing a link and an entry whose link is off-domain", () => {
    const items = extractEntries(FIXTURE_ATOM_FEED, "Texas Movement Media");
    expect(items.some((i) => i.title.includes("must be skipped"))).toBe(false);
  });

  it("returns an empty array for empty or malformed input, never throws", () => {
    expect(extractEntries("", "x")).toEqual([]);
    expect(extractEntries("<not-a-feed>", "x")).toEqual([]);
    expect(() => extractEntries("<entry><title>unterminated", "x")).not.toThrow();
  });
});

describe("videoIdFromLink", () => {
  it("extracts the v= query parameter", () => {
    expect(videoIdFromLink("https://www.youtube.com/watch?v=abc123")).toBe("abc123");
    expect(videoIdFromLink("https://www.youtube.com/watch?other=1&v=xyz789&more=2")).toBe(
      "xyz789",
    );
  });

  it("returns null when no v= parameter exists", () => {
    expect(videoIdFromLink("https://www.youtube.com/watch")).toBeNull();
  });
});

describe("text sanitization (Ticker Tape Guardrails)", () => {
  it("sanitizeTitle strips HTML tags and decodes entities", () => {
    expect(sanitizeTitle("<b>Bold</b> &amp; plain")).toBe("Bold & plain");
  });

  it("sanitizeTitle truncates long titles with an ellipsis", () => {
    const long = "x".repeat(200);
    const result = sanitizeTitle(long, 140);
    expect(result.length).toBeLessThanOrEqual(140);
    expect(result.endsWith("…")).toBe(true);
  });

  it("decodeEntities strips CDATA wrappers", () => {
    expect(decodeEntities("<![CDATA[hello & world]]>")).toBe("hello & world");
  });

  it("safeIsoDate returns null for unparsable input, never throws", () => {
    expect(safeIsoDate(undefined)).toBeNull();
    expect(safeIsoDate("not a date")).toBeNull();
    expect(safeIsoDate("2026-01-01T00:00:00Z")).toBe("2026-01-01T00:00:00.000Z");
  });
});

describe("no telemetry file contains a forbidden pattern or leaks a guardrail-excluded field", () => {
  const FILES_TO_SCAN = [
    "src/lib/telemetry/fetchWithTimeout.ts",
    "src/lib/telemetry/youtubeChannelId.ts",
    "src/lib/telemetry/youtubeSignal.ts",
    "src/lib/telemetry/text.ts",
    "src/components/media/LatestSignalRail.astro",
  ];

  const FORBIDDEN_PATTERNS: Array<[string, RegExp]> = [
    ["mailto: link", /mailto:/i],
    ["tel: link", /tel:/i],
    ["an <iframe>", /<iframe[\s>]/i],
    ["a <form> element", /<form[\s>]/i],
    ["XMLHttpRequest usage", /XMLHttpRequest/],
    ["analytics/tracking snippet", /\b(gtag|ga\(|dataLayer|fbq\()\b/],
    ["a platform SDK/OAuth reference", /\b(oauth|clientId|client_secret|apiKey)\b/i],
    [
      "a subscribe/follow/watch CTA phrase",
      /\b(subscribe now|follow us|watch now|listen now)\b/i,
    ],
    ["a view/subscriber/like count field", /\b(viewCount|subscriberCount|likeCount)\b/],
  ];

  for (const file of FILES_TO_SCAN) {
    it(`${file} contains none of the forbidden patterns`, () => {
      const source = readFileSync(join(ROOT, file), "utf8");
      for (const [label, pattern] of FORBIDDEN_PATTERNS) {
        expect(pattern.test(source), `${file} unexpectedly contains ${label}`).toBe(false);
      }
    });
  }

  it("LatestSignalRail.astro renders the disclosure text whenever it renders a list", () => {
    const source = readFileSync(
      join(ROOT, "src/components/media/LatestSignalRail.astro"),
      "utf8",
    );
    expect(source).toContain("not individually reviewed");
  });

  it("youtubeSignal.ts filters against the blocklist before returning items", () => {
    const source = readFileSync(join(ROOT, "src/lib/telemetry/youtubeSignal.ts"), "utf8");
    expect(source).toContain("blockedVideoIds");
    expect(source).toContain("telemetry-blocklist.json");
  });

  it("youtubeSignal.ts caps output at 4 items", () => {
    const source = readFileSync(join(ROOT, "src/lib/telemetry/youtubeSignal.ts"), "utf8");
    expect(source).toContain("MAX_ITEMS = 4");
  });

  it("fetchWithTimeout.ts never throws on failure — every branch returns null", () => {
    const source = readFileSync(join(ROOT, "src/lib/telemetry/fetchWithTimeout.ts"), "utf8");
    expect(source).toContain("catch (err)");
    expect(source).toContain("return null");
  });
});

describe("Mark 26 — self-hosted thumbnails on the Latest Signal rail only", () => {
  const railSource = readFileSync(
    join(ROOT, "src/components/media/LatestSignalRail.astro"),
    "utf8",
  );

  it("renders an <img> with alt text, explicit width/height, and loading=lazy", () => {
    expect(railSource).toMatch(/<img[\s\S]*?alt={item\.title}/);
    expect(railSource).toContain('width="168"');
    expect(railSource).toContain('height="94"');
    expect(railSource).toContain('loading="lazy"');
  });

  it("is grayscale by default with a hover-to-color transition, never a drop shadow", () => {
    expect(railSource).toMatch(/filter:\s*grayscale\(1\)/);
    expect(railSource).toMatch(/filter:\s*grayscale\(0\)/);
    expect(railSource).not.toMatch(/box-shadow\s*:\s*(?!none)/);
  });

  it("never hotlinks youtube.com or ytimg.com — the <img> src is always the self-hosted local path", () => {
    expect(railSource).not.toMatch(/src=.*ytimg\.com/);
    expect(railSource).not.toMatch(/src=.*youtube\.com/);
    expect(railSource).toContain("/media-thumbnails/");
  });

  it("still forbids an <iframe> or any other platform embed", () => {
    expect(railSource).not.toMatch(/<iframe[\s>]/i);
  });

  it("renders a placeholder block (never a broken image) when a thumbnail file is missing", () => {
    expect(railSource).toContain("latest-signal-thumb--placeholder");
    expect(railSource).toMatch(/latest-signal-thumb-placeholder-text[\s\S]*?\{item\.title\}/);
  });

  it("fetch-media-thumbnails.mjs never fails the build — the top-level run is caught", () => {
    const scriptSource = readFileSync(join(ROOT, "scripts/fetch-media-thumbnails.mjs"), "utf8");
    expect(scriptSource).toMatch(/main\(\)\.catch/);
  });

  it("fetch-media-thumbnails.mjs writes into the gitignored public/media-thumbnails/ directory", () => {
    const gitignore = readFileSync(join(ROOT, ".gitignore"), "utf8");
    expect(gitignore).toContain("public/media-thumbnails/");
  });

  it("runs as a prebuild step, before astro build, so files exist before Astro copies public/", () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
    expect(pkg.scripts.prebuild).toContain("fetch-media-thumbnails.mjs");
  });
});

describe("telemetry-blocklist.json is valid and starts empty", () => {
  it("parses and has the expected shape", () => {
    const data = JSON.parse(
      readFileSync(join(ROOT, "src/data/telemetry-blocklist.json"), "utf8"),
    );
    expect(Array.isArray(data.youtube.blockedVideoIds)).toBe(true);
    expect(data.youtube.blockedVideoIds).toEqual([]);
  });
});
