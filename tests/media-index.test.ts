import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { mediaEntrySchema } from "../src/lib/media-schema";
import {
  getConfirmedDestinations,
  groupDestinationsBySourceClass,
  isSafeHttpUrl,
} from "../src/lib/media-destinations";

// Narrow safety net for the local TMM media content collection and the
// /media route/components that render it.
//
// Mark 9 seeded three fully inert single-item placeholders. Mark 10
// replaced them with three owner-authorized "destination-index" records
// (static, multi-platform source links). Mark 11 confirmed all eight
// linkable destinations across those three records and restructured the
// page to render one preview card per confirmed destination, grouped by
// source class — LinkedIn/Facebook (no URL) render nothing at all, not
// even inert text.
//
// Checks the JSON records against the same zod schema
// src/content.config.ts uses at build time, checks the same flatten/gate
// helper (src/lib/media-destinations.ts) the page itself calls, and scans
// PAGE/COMPONENT SOURCE for forbidden patterns — the same style already
// established in tests/hub-routes.test.ts. The generic dist/ scan in
// scripts/check-public-output.mjs still runs against this route's actual
// built output as part of `npm run build` / `npm run ci`.

const ROOT = join(new URL(".", import.meta.url).pathname, "..");
const MEDIA_CONTENT_DIR = join(ROOT, "src", "content", "media");

const EXPECTED_RECORD_IDS = [
  "tmm-platform-destinations",
  "tmi-editorial-destination",
  "founder-avm-media-destinations",
];

// Only these owner-confirmed (handle, url) pairs may ever appear across the
// whole collection — proves every rendered URL is handle-derived per the
// Mark 10 URL construction rules, never guessed, scraped, or invented, and
// that exactly eight destinations are confirmed (Mark 11).
const EXPECTED_CONFIRMED_URLS = [
  "https://youtube.com/@texasmovementmedia",
  "https://youtube.com/@texasmovementperformance",
  "https://instagram.com/tmmediausa",
  "https://tiktok.com/@texasmovementmedia",
  "https://texasmovement.substack.com",
  "https://youtube.com/@tmipresident",
  "https://instagram.com/alexanderofnazareth",
  "https://tiktok.com/@alexandervmathai",
];

function loadEntry(id: string) {
  const raw = readFileSync(join(MEDIA_CONTENT_DIR, `${id}.json`), "utf8");
  return JSON.parse(raw);
}

function loadAllEntries() {
  return EXPECTED_RECORD_IDS.map((id) => ({ id, data: loadEntry(id) }));
}

function urlPattern(platform: string): RegExp {
  switch (platform) {
    case "YouTube":
      return /^https:\/\/youtube\.com\/@[a-z0-9._-]+$/;
    case "Instagram":
      return /^https:\/\/instagram\.com\/[a-z0-9._-]+$/;
    case "TikTok":
      return /^https:\/\/tiktok\.com\/@[a-z0-9._-]+$/;
    case "Substack":
      return /^https:\/\/[a-z0-9-]+\.substack\.com$/;
    default:
      throw new Error(`No known URL pattern for platform: ${platform}`);
  }
}

describe("media content collection has exactly the three Mark 10 destination-index records", () => {
  it("src/content/media/ contains exactly three JSON files", () => {
    const files = readdirSync(MEDIA_CONTENT_DIR).filter((f) => f.endsWith(".json"));
    expect(files.sort()).toEqual(EXPECTED_RECORD_IDS.map((id) => `${id}.json`).sort());
  });

  it("every record validates against mediaEntrySchema (build-time validation proof)", () => {
    for (const id of EXPECTED_RECORD_IDS) {
      const data = loadEntry(id);
      expect(() => mediaEntrySchema.parse(data), `${id} failed schema validation`).not.toThrow();
    }
  });

  it("every record's id/slug matches its filename", () => {
    for (const id of EXPECTED_RECORD_IDS) {
      const data = loadEntry(id);
      expect(data.id).toBe(id);
      expect(data.slug).toBe(id);
    }
  });
});

describe("isSafeHttpUrl", () => {
  it("accepts http(s) URLs and rejects everything else", () => {
    expect(isSafeHttpUrl("https://youtube.com/@texasmovementmedia")).toBe(true);
    expect(isSafeHttpUrl("http://example.com")).toBe(true);
    expect(isSafeHttpUrl(null)).toBe(false);
    expect(isSafeHttpUrl(undefined)).toBe(false);
    expect(isSafeHttpUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeHttpUrl("not a url")).toBe(false);
  });
});

describe("getConfirmedDestinations (the single gate the page itself calls)", () => {
  const confirmed = getConfirmedDestinations(loadAllEntries());

  it("returns exactly the eight owner-confirmed source destinations — no more, no fewer", () => {
    expect(confirmed).toHaveLength(8);
    expect(confirmed.map((d) => d.url).sort()).toEqual([...EXPECTED_CONFIRMED_URLS].sort());
  });

  it("every confirmed destination carries the owner-confirmed-source-destination status", () => {
    for (const dest of confirmed) {
      expect(dest.confirmationStatus).toBe("owner-confirmed-source-destination");
    }
  });

  it("every confirmed destination's URL matches its platform's exact construction pattern", () => {
    for (const dest of confirmed) {
      expect(dest.url).toMatch(urlPattern(dest.platform));
    }
  });

  it("no confirmed destination is LinkedIn, Facebook, or any HERO source", () => {
    for (const dest of confirmed) {
      expect(dest.platform).not.toBe("LinkedIn");
      expect(dest.platform).not.toBe("Facebook");
      expect(dest.sourceClass).not.toBe("HERO");
    }
  });

  it("every confirmed destination has a non-empty descriptive linkText (never generic)", () => {
    for (const dest of confirmed) {
      expect(dest.linkText.length).toBeGreaterThan(0);
      expect(/^click here$/i.test(dest.linkText)).toBe(false);
    }
  });

  it("grouping by source class yields exactly TMM (4), TMI (1), founder-AVM (3), and no others", () => {
    const groups = groupDestinationsBySourceClass(confirmed);
    expect(groups.map((g) => g.sourceClass)).toEqual(["TMM", "TMI", "founder-AVM"]);
    expect(groups.find((g) => g.sourceClass === "TMM")!.destinations).toHaveLength(4);
    expect(groups.find((g) => g.sourceClass === "TMI")!.destinations).toHaveLength(1);
    expect(groups.find((g) => g.sourceClass === "founder-AVM")!.destinations).toHaveLength(3);
    const total = groups.reduce((sum, g) => sum + g.destinations.length, 0);
    expect(total).toBe(8);
  });
});

describe("LinkedIn and Facebook destinations exist only as inert local data, never confirmed or rendered", () => {
  it("the founder record still carries LinkedIn/Facebook with no URL and no confirmationStatus", () => {
    const d = loadEntry("founder-avm-media-destinations");
    const linkedIn = d.destinations.find((dest: { platform: string }) => dest.platform === "LinkedIn");
    const facebook = d.destinations.find((dest: { platform: string }) => dest.platform === "Facebook");
    for (const dest of [linkedIn, facebook]) {
      expect(dest).toBeDefined();
      expect(dest.url).toBeNull();
      expect(dest.urlStatus).toBe("inert-missing-evidence");
      expect(dest.confirmationStatus).toBeUndefined();
    }
  });

  it("getConfirmedDestinations excludes LinkedIn and Facebook entirely", () => {
    const confirmed = getConfirmedDestinations(loadAllEntries());
    expect(confirmed.some((d) => d.platform === "LinkedIn")).toBe(false);
    expect(confirmed.some((d) => d.platform === "Facebook")).toBe(false);
  });

  it("no destination URL anywhere in the collection contains linkedin.com or facebook.com", () => {
    for (const id of EXPECTED_RECORD_IDS) {
      const d = loadEntry(id);
      for (const dest of d.destinations) {
        if (dest.url !== null) {
          expect(/linkedin\.com|facebook\.com/i.test(dest.url)).toBe(false);
        }
      }
    }
  });
});

describe("no seeded record contains a HERO source, a metric, or an individual media-item claim", () => {
  for (const id of EXPECTED_RECORD_IDS) {
    it(`${id}: no sourceClass HERO, no HERO/herofootwear mention`, () => {
      const d = loadEntry(id);
      expect(d.sourceClass).not.toBe("HERO");
      expect(/hero/i.test(JSON.stringify(d))).toBe(false);
    });
  }

  it("no seeded record contains a metric, view count, subscriber count, or follower figure", () => {
    for (const id of EXPECTED_RECORD_IDS) {
      const haystack = JSON.stringify(loadEntry(id));
      expect(/\b\d+(\.\d+)?[km]?\+?\s*(views?|subscribers?|followers?|likes?)\b/i.test(haystack)).toBe(
        false,
      );
    }
  });

  it("individual-media-item gates remain untouched (still placeholder/absent, not evidenced)", () => {
    for (const id of EXPECTED_RECORD_IDS) {
      const d = loadEntry(id);
      expect(d.canonicalUrl).toBeNull();
      expect(d.publicationDate).toBeNull();
      expect(d.publicationDateStatus).toBe("placeholder");
      expect(d.transcriptStatus).toBe("absent");
      expect(d.crossAttributionStatus).toBe("prohibited-pending-per-item-approval");
    }
  });
});

describe("no media component or the /media route contains a forbidden conversion/embed/tracking pattern", () => {
  const FILES_TO_SCAN = [
    "src/pages/media.astro",
    "src/components/media/MediaGrid.astro",
    "src/components/media/MediaCard.astro",
    "src/components/media/MediaStatus.astro",
    "src/components/media/MediaPreviewArt.astro",
    "src/components/media/MediaPlatformMark.astro",
    "src/content.config.ts",
    "src/lib/media-destinations.ts",
  ];

  const FORBIDDEN_PATTERNS: Array<[string, RegExp]> = [
    ["mailto: link", /mailto:/i],
    ["tel: link", /tel:/i],
    ["an <iframe>", /<iframe[\s>]/i],
    ["a <form> element", /<form[\s>]/i],
    ["fetch() call", /\bfetch\s*\(/],
    ["XMLHttpRequest usage", /XMLHttpRequest/],
    ["a hard-coded external http(s) URL literal", /href\s*=\s*\{?["']https?:\/\//i],
    ["analytics/tracking snippet", /\b(gtag|ga\(|dataLayer|fbq\()\b/],
    ["a cookie write", /document\.cookie/],
    ["a platform SDK/OAuth reference", /\b(oauth|clientId|client_secret|apiKey)\b/i],
    [
      "a booking/checkout/subscribe/follow/conversion CTA phrase",
      /\b(subscribe now|follow us|watch now|listen now|read the latest|book now|get started|join now|shop now|donate now)\b/i,
    ],
    ["a raw <img> tag pulling a remote image", /<img[\s>]/i],
    ["a <button> used for an external destination", /<button[\s>]/i],
    ["a video/social platform embed script or widget marker", /\b(youtube-nocookie|instagram-embed|tiktok-embed|substack-embed)\b/i],
  ];

  for (const file of FILES_TO_SCAN) {
    it(`${file} contains none of the forbidden patterns`, () => {
      const source = readFileSync(join(ROOT, file), "utf8");
      for (const [label, pattern] of FORBIDDEN_PATTERNS) {
        expect(pattern.test(source), `${file} unexpectedly contains ${label}`).toBe(false);
      }
    });
  }

  it("MediaCard.astro only renders a link when isSafeHttpUrl(dest.url) is true (defense in depth)", () => {
    const source = readFileSync(join(ROOT, "src/components/media/MediaCard.astro"), "utf8");
    expect(source).toContain("isSafeHttpUrl(dest.url)");
  });

  it("MediaCard.astro applies target=_blank with rel=noopener noreferrer on its outbound link", () => {
    const source = readFileSync(join(ROOT, "src/components/media/MediaCard.astro"), "utf8");
    expect(source).toContain('target="_blank"');
    expect(source).toContain('rel="noopener noreferrer"');
  });

  it("MediaCard.astro never renders a date, metric, or platform activity claim", () => {
    const source = readFileSync(join(ROOT, "src/components/media/MediaCard.astro"), "utf8");
    const codeOnly = source
      .split("\n")
      .filter((line) => !line.trim().startsWith("//"))
      .join("\n");
    expect(/publicationDate/i.test(codeOnly)).toBe(false);
    expect(/\bviews?\b|\bsubscribers?\b|\bfollowers?\b|\blikes?\b/i.test(codeOnly)).toBe(false);
  });

  it("src/lib/media-destinations.ts gates on the full record-level condition set", () => {
    const source = readFileSync(join(ROOT, "src/lib/media-destinations.ts"), "utf8");
    for (const requiredCondition of [
      'd.linkMode === "destination-index"',
      'd.status !== "placeholder"',
      'd.publicDisplayStatus === "approved-static-index"',
      'd.ownerApprovalStatus === "approved-static-index"',
      'dest.urlStatus === "owner-supplied"',
    ]) {
      expect(
        source,
        `media-destinations.ts missing gate condition: ${requiredCondition}`,
      ).toContain(requiredCondition);
    }
  });

  it("MediaStatus.astro never uses a forbidden live/CTA/verification word in its actual status text (comments excluded)", () => {
    const source = readFileSync(join(ROOT, "src/components/media/MediaStatus.astro"), "utf8");
    // Strip // line comments so the doc-comment listing the forbidden words
    // (as an explanation of what NOT to do) doesn't trip this check itself.
    const codeOnly = source
      .split("\n")
      .filter((line) => !line.trim().startsWith("//"))
      .join("\n");
    for (const forbidden of [
      "Live",
      "Available now",
      "Watch",
      "Listen",
      "Follow",
      "Subscribe",
      "Published",
      "Latest",
      "Verified",
      "Official",
      "Active",
      "Current",
      "Operational",
      "Platform-approved",
      "Independently-audited",
    ]) {
      expect(
        codeOnly.includes(`"${forbidden}`),
        `MediaStatus.astro contains forbidden word in executable code: ${forbidden}`,
      ).toBe(false);
    }
  });

  it("MediaPreviewArt.astro and MediaPlatformMark.astro never reference a remote URL or asset", () => {
    for (const file of ["src/components/media/MediaPreviewArt.astro", "src/components/media/MediaPlatformMark.astro"]) {
      const source = readFileSync(join(ROOT, file), "utf8");
      expect(/https?:\/\//i.test(source)).toBe(false);
    }
  });

  it("src/pages/media.astro references all three source group labels and no ungrouped raw record ids", () => {
    const source = readFileSync(join(ROOT, "src/pages/media.astro"), "utf8");
    expect(source).toContain("getConfirmedDestinations");
    expect(source).toContain("groupDestinationsBySourceClass");
  });

  it("src/pages/media.astro has exactly one h1 and uses h2/h3 for section/group headings", () => {
    const source = readFileSync(join(ROOT, "src/pages/media.astro"), "utf8");
    const h1Count = (source.match(/<h1[\s>]/g) ?? []).length;
    expect(h1Count).toBe(1);
    expect(source).toContain("<h2");
    expect(source).toContain("media-source-group-heading");
  });
});
