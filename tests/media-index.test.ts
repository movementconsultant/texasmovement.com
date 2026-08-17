import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { mediaEntrySchema } from "../src/lib/media-schema";

// Narrow Mark 9 safety net for the local TMM media content collection and
// the /media route/components that render it. Checks the JSON records
// against the same zod schema src/content.config.ts uses at build time
// (proving "the collection validates and can be loaded"), plus PAGE/
// COMPONENT SOURCE for forbidden patterns — the same style already
// established in tests/hub-routes.test.ts. The generic dist/ scan in
// scripts/check-public-output.mjs still runs against this route's actual
// built output as part of `npm run build` / `npm run ci`.

const ROOT = join(new URL(".", import.meta.url).pathname, "..");
const MEDIA_CONTENT_DIR = join(ROOT, "src", "content", "media");

const EXPECTED_IDS = [
  "tmm-youtube-placeholder",
  "tmi-substack-placeholder",
  "founder-short-form-placeholder",
];

function loadEntry(id: string) {
  const raw = readFileSync(join(MEDIA_CONTENT_DIR, `${id}.json`), "utf8");
  return JSON.parse(raw);
}

describe("media content collection has exactly the three Mark 9 seeded placeholders", () => {
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

describe("every seeded record is a fully inert, unmistakable placeholder", () => {
  for (const id of EXPECTED_IDS) {
    it(`${id} carries every required placeholder-safety status`, () => {
      const d = loadEntry(id);
      expect(d.status).toBe("placeholder");
      expect(d.linkMode).toBe("no-link");
      expect(d.canonicalUrl).toBeNull();
      expect(d.canonicalUrlStatus).toBe("placeholder");
      expect(d.publicationDate).toBeNull();
      expect(d.publicationDateStatus).toBe("placeholder");
      expect(d.imageStatus).toBe("no-image");
      expect(d.claimsStatus).toBe("no-claims-rendered");
      expect(d.editorialStatus).toBe("placeholder");
      expect(d.ownerApprovalStatus).toBe("pending");
      expect(d.publicDisplayStatus).toBe("placeholder-public-index");
      expect(d.crossAttributionStatus).toBe("prohibited-pending-per-item-approval");
      expect(d.rightsStatus).toBe("absent");
      expect(d.transcriptStatus).toBe("absent");
      expect(d.accessibilityStatus).toBe("pending");
    });

    it(`${id} title contains the required "Owner Review Required" disclosure, and summary discloses review/approval is still required`, () => {
      const d = loadEntry(id);
      expect(d.title).toContain("Owner Review Required");
      expect(/review|approval/i.test(d.summary)).toBe(true);
      expect(/require/i.test(d.summary)).toBe(true);
    });
  }

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
  ];

  for (const file of FILES_TO_SCAN) {
    it(`${file} contains none of the forbidden patterns`, () => {
      const source = readFileSync(join(ROOT, file), "utf8");
      for (const [label, pattern] of FORBIDDEN_PATTERNS) {
        expect(pattern.test(source), `${file} unexpectedly contains ${label}`).toBe(false);
      }
    });
  }

  it("MediaCard.astro gates its external link on every required field, not a single flag", () => {
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
});
