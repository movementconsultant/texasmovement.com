import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { mediaEntrySchema } from "../src/lib/media-schema";

// Narrow safety net for the local TMM media content collection and the
// /media route/components that render it. Mark 9 seeded three fully inert
// single-item placeholders; Mark 10 replaced them with three owner-authorized
// "destination-index" records (static, multi-platform source links, no
// individual media items). Checks the JSON records against the same zod
// schema src/content.config.ts uses at build time (proving "the collection
// validates and can be loaded"), plus PAGE/COMPONENT SOURCE for forbidden
// patterns — the same style already established in tests/hub-routes.test.ts.
// The generic dist/ scan in scripts/check-public-output.mjs still runs
// against this route's actual built output as part of `npm run build` /
// `npm run ci`.

const ROOT = join(new URL(".", import.meta.url).pathname, "..");
const MEDIA_CONTENT_DIR = join(ROOT, "src", "content", "media");

const EXPECTED_IDS = [
  "tmm-platform-destinations",
  "tmi-editorial-destination",
  "founder-avm-media-destinations",
];

// Only these owner-authorized (handle, url) pairs may ever appear across the
// whole collection — proves every rendered URL is handle-derived per the
// Mark 10 URL construction rules, never guessed, scraped, or invented.
const ALLOWED_LIVE_URLS = new Set([
  "https://youtube.com/@texasmovementmedia",
  "https://youtube.com/@texasmovementperformance",
  "https://instagram.com/tmmediausa",
  "https://tiktok.com/@texasmovementmedia",
  "https://texasmovement.substack.com",
  "https://youtube.com/@tmipresident",
  "https://instagram.com/alexanderofnazareth",
  "https://tiktok.com/@alexandervmathai",
]);

function loadEntry(id: string) {
  const raw = readFileSync(join(MEDIA_CONTENT_DIR, `${id}.json`), "utf8");
  return JSON.parse(raw);
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
    expect(files.sort()).toEqual(EXPECTED_IDS.map((id) => `${id}.json`).sort());
  });

  it("every record validates against mediaEntrySchema (build-time validation proof)", () => {
    for (const id of EXPECTED_IDS) {
      const data = loadEntry(id);
      expect(() => mediaEntrySchema.parse(data), `${id} failed schema validation`).not.toThrow();
    }
  });

  it("every record's id/slug matches its filename", () => {
    for (const id of EXPECTED_IDS) {
      const data = loadEntry(id);
      expect(data.id).toBe(id);
      expect(data.slug).toBe(id);
    }
  });
});

describe("every seeded record is a static, owner-approved destination-index record", () => {
  for (const id of EXPECTED_IDS) {
    it(`${id} carries every required destination-index status`, () => {
      const d = loadEntry(id);
      expect(d.status).toBe("approved-static-index");
      expect(d.linkMode).toBe("destination-index");
      // canonicalUrl/publicationDate are single-item fields — not applicable
      // to a multi-platform destination-index record.
      expect(d.canonicalUrl).toBeNull();
      expect(d.canonicalUrlStatus).toBe("placeholder");
      expect(d.publicationDate).toBeNull();
      expect(d.publicationDateStatus).toBe("placeholder");
      expect(d.imageStatus).toBe("no-image");
      expect(d.claimsStatus).toBe("no-claims-rendered");
      expect(d.editorialStatus).toBe("approved-for-static-index");
      expect(d.ownerApprovalStatus).toBe("approved-static-index");
      expect(d.publicDisplayStatus).toBe("approved-static-index");
      expect(d.crossAttributionStatus).toBe("prohibited-pending-per-item-approval");
      expect(Array.isArray(d.destinations)).toBe(true);
      expect(d.destinations.length).toBeGreaterThan(0);
    });
  }

  it("no seeded record has sourceClass HERO — HERO is strictly out of scope for Mark 10", () => {
    for (const id of EXPECTED_IDS) {
      const d = loadEntry(id);
      expect(d.sourceClass).not.toBe("HERO");
    }
  });

  it("no seeded record or its destinations mention HERO/herofootwear anywhere", () => {
    for (const id of EXPECTED_IDS) {
      const haystack = JSON.stringify(loadEntry(id));
      expect(/hero/i.test(haystack)).toBe(false);
    }
  });

  it("no seeded record contains a metric, view count, subscriber count, or follower figure", () => {
    for (const id of EXPECTED_IDS) {
      const d = loadEntry(id);
      const haystack = JSON.stringify(d);
      expect(/\b\d+(\.\d+)?[km]?\+?\s*(views?|subscribers?|followers?|likes?)\b/i.test(haystack)).toBe(
        false,
      );
    }
  });
});

describe("every destination URL is derived only from an owner-authorized handle, never guessed", () => {
  for (const id of EXPECTED_IDS) {
    it(`${id}: each destination with a URL matches its platform's exact construction pattern`, () => {
      const d = loadEntry(id);
      for (const dest of d.destinations) {
        if (dest.url === null) {
          expect(dest.urlStatus).toBe("inert-missing-evidence");
          continue;
        }
        expect(dest.urlStatus).toBe("owner-supplied");
        expect(dest.url).toMatch(urlPattern(dest.platform));
        expect(ALLOWED_LIVE_URLS.has(dest.url)).toBe(true);
      }
    });
  }

  it("every live URL across the whole collection is in the owner-authorized allow-list (no invented URLs)", () => {
    const seen = new Set<string>();
    for (const id of EXPECTED_IDS) {
      const d = loadEntry(id);
      for (const dest of d.destinations) {
        if (dest.url !== null) seen.add(dest.url);
      }
    }
    expect(seen).toEqual(ALLOWED_LIVE_URLS);
  });

  it("LinkedIn and Facebook destinations always render inert (no URL) anywhere in the collection", () => {
    for (const id of EXPECTED_IDS) {
      const d = loadEntry(id);
      for (const dest of d.destinations) {
        if (dest.platform === "LinkedIn" || dest.platform === "Facebook") {
          expect(dest.url).toBeNull();
          expect(dest.urlStatus).toBe("inert-missing-evidence");
        }
      }
    }
  });

  it("no destination URL anywhere contains linkedin.com or facebook.com as a live link", () => {
    for (const id of EXPECTED_IDS) {
      const d = loadEntry(id);
      for (const dest of d.destinations) {
        if (dest.url !== null) {
          expect(/linkedin\.com|facebook\.com/i.test(dest.url)).toBe(false);
        }
      }
    }
  });

  it("founder-avm-media-destinations keeps founder sourceClass distinct from TMI/TMM", () => {
    const d = loadEntry("founder-avm-media-destinations");
    expect(d.sourceClass).toBe("founder-AVM");
  });
});

describe("no media component or the /media route contains a forbidden conversion/embed pattern", () => {
  const FILES_TO_SCAN = [
    "src/pages/media.astro",
    "src/components/media/MediaGrid.astro",
    "src/components/media/MediaCard.astro",
    "src/components/media/MediaStatus.astro",
    "src/content.config.ts",
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
    ["a platform SDK/OAuth reference", /\b(oauth|clientId|client_secret|apiKey)\b/i],
    ["a subscribe/follow CTA phrase", /\b(subscribe now|follow us|watch now|listen now)\b/i],
    ["a raw <img> tag pulling a remote image", /<img[\s>]/i],
    ["a <button> used for an external destination", /<button[\s>]/i],
  ];

  for (const file of FILES_TO_SCAN) {
    it(`${file} contains none of the forbidden patterns`, () => {
      const source = readFileSync(join(ROOT, file), "utf8");
      for (const [label, pattern] of FORBIDDEN_PATTERNS) {
        expect(pattern.test(source), `${file} unexpectedly contains ${label}`).toBe(false);
      }
    });
  }

  it("MediaCard.astro gates its single-item external link on every required field, not a single flag", () => {
    const source = readFileSync(join(ROOT, "src/components/media/MediaCard.astro"), "utf8");
    for (const requiredCondition of [
      'd.linkMode === "owner-supplied-external-link"',
      "isSafeHttpUrl(d.canonicalUrl)",
      'd.canonicalUrlStatus === "owner-supplied"',
      'd.publicDisplayStatus === "approved-static-index"',
      'd.ownerApprovalStatus === "approved-static-index"',
      'd.status !== "placeholder"',
    ]) {
      expect(source, `MediaCard.astro missing link-gate condition: ${requiredCondition}`).toContain(
        requiredCondition,
      );
    }
  });

  it("MediaCard.astro gates its destination-index links on record status plus a per-destination check", () => {
    const source = readFileSync(join(ROOT, "src/components/media/MediaCard.astro"), "utf8");
    for (const requiredCondition of [
      'd.linkMode === "destination-index"',
      'd.status !== "placeholder"',
      'd.publicDisplayStatus === "approved-static-index"',
      'd.ownerApprovalStatus === "approved-static-index"',
      'dest.urlStatus === "owner-supplied"',
    ]) {
      expect(
        source,
        `MediaCard.astro missing destination-index gate condition: ${requiredCondition}`,
      ).toContain(requiredCondition);
    }
  });

  it("MediaCard.astro never renders a destination link without also checking isSafeHttpUrl", () => {
    const source = readFileSync(join(ROOT, "src/components/media/MediaCard.astro"), "utf8");
    expect(source).toContain("isSafeHttpUrl(dest.url)");
  });

  it("MediaCard.astro only renders publicationDate when publicationDateStatus is evidenced", () => {
    const source = readFileSync(join(ROOT, "src/components/media/MediaCard.astro"), "utf8");
    expect(source).toContain('d.publicationDateStatus === "evidenced"');
  });

  it("MediaStatus.astro never uses a forbidden live/CTA word in its actual status text (comments excluded)", () => {
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
    ]) {
      expect(
        codeOnly.includes(`"${forbidden}`),
        `MediaStatus.astro contains forbidden word in executable code: ${forbidden}`,
      ).toBe(false);
    }
  });

  it("src/pages/media.astro references the new Mark 10 destination-index record ids in display order", () => {
    const source = readFileSync(join(ROOT, "src/pages/media.astro"), "utf8");
    for (const id of EXPECTED_IDS) {
      expect(source).toContain(id);
    }
  });
});
