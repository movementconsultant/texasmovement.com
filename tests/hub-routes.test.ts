import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { HUB_ROUTES, navRoutes } from "../src/lib/hub-routes";

// Narrow Mark 4 safety net for the new local TMI hub routes. This checks
// PAGE SOURCE (not built dist/) so it runs without a build step — the
// generic dist/ scan in scripts/check-public-output.mjs (TBD sentinel,
// unverified mailto, non-live property hrefs, noindex-on-preview, LinkedIn)
// still runs against these same pages' built output as part of `npm run
// build` / `npm run ci`. This file checks what that generic, ecosystem-wide
// scan does NOT: restrained status vocabulary, and a zero-conversion-surface
// guarantee specific to these eight pages.

const ROOT = join(new URL(".", import.meta.url).pathname, "..");

const FILE_FOR_PATH: Record<string, string> = {
  "/about": "about.astro",
  "/ecosystem": "ecosystem.astro",
  "/contact": "contact.astro",
  "/consulting": "consulting.astro",
  "/media": "media.astro",
  "/performance": "performance.astro",
  "/distribution": "distribution.astro",
  "/hero": "hero.astro",
  "/partners": "partners.astro",
  "/vault": "vault.astro",
};

function sourceFor(path: string): string {
  const file = FILE_FOR_PATH[path];
  if (!file) throw new Error(`No source file mapped for hub route "${path}"`);
  return readFileSync(join(ROOT, "src", "pages", file), "utf8");
}

describe("HUB_ROUTES registry matches the routes this task was scoped to implement", () => {
  it("has exactly the eight Mark 4 paths plus Mark 18's /contact and Mark 21's /vault, each mapped to a real source file", () => {
    const paths = HUB_ROUTES.map((r) => r.path).sort();
    expect(paths).toEqual(Object.keys(FILE_FOR_PATH).sort());
    for (const path of paths) {
      expect(() => sourceFor(path)).not.toThrow();
    }
  });
});

describe("no new hub route contains a live conversion or submission surface", () => {
  const FORBIDDEN_PATTERNS: Array<[string, RegExp]> = [
    ["mailto: link", /mailto:/i],
    ["tel: link", /tel:/i],
    ["a <form> element", /<form[\s>]/i],
    ["fetch() call", /\bfetch\s*\(/],
    ["XMLHttpRequest usage", /XMLHttpRequest/],
    ["an outbound http(s) href", /href\s*=\s*\{?["']?https?:\/\//i],
    ["an <iframe>", /<iframe[\s>]/i],
    // Deliberately actionable phrasing only — bare nouns like "checkout" or
    // "pricing" are expected to appear in these pages' own restrained
    // disclaimers ("no checkout exists here") and must not trip this check.
    ["an actionable booking/checkout CTA phrase", /\b(book now|add to cart|buy now|enroll now|sign up now|shop now)\b/i],
  ];

  // /contact is the one deliberate exception (see hub-routes.ts header comment):
  // a real, gated contact form. It has its own dedicated inert-by-default
  // coverage (Mark 18 checks in scripts/check-public-output.mjs check 7 and
  // the guard's dist/ scan), so it's excluded from this zero-conversion-
  // surface sweep rather than weakening the sweep itself.
  for (const path of HUB_ROUTES.map((r) => r.path).filter((p) => p !== "/contact")) {
    it(`${path} contains none of the forbidden conversion/submission patterns`, () => {
      const source = sourceFor(path);
      for (const [label, pattern] of FORBIDDEN_PATTERNS) {
        expect(pattern.test(source), `${path} unexpectedly contains ${label}`).toBe(false);
      }
    });
  }

  it("/hero contains zero <a> elements of any kind — no outbound link, no internal link", () => {
    const source = sourceFor("/hero");
    expect(/<a[\s>]/i.test(source)).toBe(false);
  });
});

describe("restrained status language is present where required", () => {
  // Pages render their posture via `{posture}` (sourced from hub-routes.ts's
  // single-source-of-truth postureLabel), not a hand-typed literal string —
  // so these checks are structural (does the page pull from and render the
  // registry value?) plus a data-level check that the registry itself holds
  // the exact required wording, rather than grepping page source for a
  // string that's intentionally not duplicated there.
  it("Consulting, Media, Performance, Distribution, and Partners each source and render their posture from the hub-routes registry", () => {
    for (const path of ["/consulting", "/media", "/performance", "/distribution", "/partners"]) {
      const source = sourceFor(path);
      expect(source).toMatch(/import \{ hubRoute \} from "@\/lib\/hub-routes";/);
      expect(source).toContain(`hubRoute("${path}")!.postureLabel!`);
      expect(source).toMatch(/<span class="division-status">\{posture\}<\/span>/);
    }
  });

  it("registry holds the exact required 'Deployment Pending — not yet live' wording for Performance, Distribution, and Partners", () => {
    for (const path of ["/performance", "/distribution", "/partners"]) {
      expect(HUB_ROUTES.find((r) => r.path === path)?.postureLabel).toBe(
        "Deployment Pending — not yet live",
      );
    }
  });

  // Mark 28 — owner-authorized policy amendment: Consulting's diagnostic
  // intake is now open (a real CTA routes to /contact, on both the
  // homepage and /consulting itself), so it's no longer "Deployment
  // Pending — not yet live" like its Mark 4 siblings above.
  it("registry holds Consulting's distinct Mark 28 posture, not the shared 'Deployment Pending — not yet live' wording", () => {
    const consultingPosture = HUB_ROUTES.find((r) => r.path === "/consulting")?.postureLabel;
    expect(consultingPosture).toBe("Diagnostic Intake Open — qualified operators");
    expect(consultingPosture).not.toBe("Deployment Pending — not yet live");
  });

  it("registry holds Media's distinct Mark 23 posture — still 'Deployment Pending' (the global status is NOT flipped), with the live-telemetry clause appended rather than a bare 'not yet live'", () => {
    const mediaPosture = HUB_ROUTES.find((r) => r.path === "/media")?.postureLabel;
    expect(mediaPosture).toBe(
      "Deployment Pending — Active Signal Telemetry Live via media.texasmovement.com",
    );
    expect(mediaPosture).toMatch(/^Deployment Pending/);
  });

  it("/hero sources and renders its posture from the registry, and never claims verification in its own copy", () => {
    const source = sourceFor("/hero");
    expect(source).toContain('hubRoute("/hero")!.postureLabel!');
    expect(source).toMatch(/<span class="division-status">\{posture\}<\/span>/);
    // "audited" / "unaudited" is expected and required; a bare claim of
    // verification (e.g. "is verified") is what must never appear.
    expect(/\bis verified\b/i.test(source)).toBe(false);
  });

  // Mark 28 — owner-authorized policy amendment: HERO's public product
  // feed is now build-time-fetched and self-hosted (see
  // src/lib/commerce/heroProducts.ts and HeroProductCarousel.astro), so
  // /hero no longer holds the original "internally unaudited" wording.
  it("registry holds HERO's distinct Mark 28 posture, not the original 'External storefront / internally unaudited' wording", () => {
    const heroPosture = HUB_ROUTES.find((r) => r.path === "/hero")?.postureLabel;
    expect(heroPosture).toBe("Confirmed Storefront — Public Catalog Live");
    expect(heroPosture).not.toBe("External storefront / internally unaudited");
  });
});

describe("no page presents Health, FounderLink, Social/Gather, or Reparations as active", () => {
  it("/ecosystem never links these four verticals and marks each restrained", () => {
    const source = sourceFor("/ecosystem");
    for (const label of ["Health", "FounderLink", "Social / Gather", "Reparations"]) {
      expect(source).toContain(label);
    }
    // These four must never appear inside a division-links block (the only
    // markup pattern in this file that renders a clickable <a>).
    const linksBlocks = [...source.matchAll(/<div class="division-links">[\s\S]*?<\/div>/g)].map(
      (m) => m[0],
    );
    for (const block of linksBlocks) {
      for (const label of ["Health", "FounderLink", "Social", "Reparations"]) {
        expect(block).not.toContain(label);
      }
    }
  });

  it("/ecosystem mentions alexandermathai.com as context only, with no href to it", () => {
    const source = sourceFor("/ecosystem");
    expect(source).toContain("alexandermathai.com");
    expect(source).not.toMatch(/href\s*=\s*["']https?:\/\/alexandermathai\.com/i);
  });
});

describe("primary navigation matches Mark 32's 'Quiet Authority' de-clutter: exactly three items", () => {
  it("navRoutes() returns exactly Engagements, Systems, Contact, in that order", () => {
    expect(navRoutes().map((r) => r.navLabel)).toEqual(["Engagements", "Systems", "Contact"]);
  });

  it("Engagements points at /consulting and Systems points at /about", () => {
    const byLabel = new Map(navRoutes().map((r) => [r.navLabel, r.path]));
    expect(byLabel.get("Engagements")).toBe("/consulting");
    expect(byLabel.get("Systems")).toBe("/about");
  });

  it("Ecosystem, Media, and Performance are real routes but no longer nav-eligible", () => {
    const navPaths = new Set(navRoutes().map((r) => r.path));
    expect(navPaths.has("/ecosystem")).toBe(false);
    expect(navPaths.has("/media")).toBe(false);
    expect(navPaths.has("/performance")).toBe(false);
    expect(() => sourceFor("/ecosystem")).not.toThrow();
    expect(() => sourceFor("/media")).not.toThrow();
    expect(() => sourceFor("/performance")).not.toThrow();
  });

  it("HERO, Distribution, and Partners are real routes but excluded from primary nav", () => {
    const navPaths = new Set(navRoutes().map((r) => r.path));
    expect(navPaths.has("/hero")).toBe(false);
    expect(navPaths.has("/distribution")).toBe(false);
    expect(navPaths.has("/partners")).toBe(false);
  });

  it("Header.astro renders navRoutes() and does not hand-write a separate nav link list", () => {
    const header = readFileSync(join(ROOT, "src", "components", "Header.astro"), "utf8");
    expect(header).toContain("navRoutes()");
    for (const label of ["HERO", "Distribution", "Partners", "FounderLink", "Health", "Social"]) {
      // None of the excluded verticals' labels should appear as a hand-written nav <a> —
      // the only nav markup is the navItems.map() loop, so a literal label here would mean
      // someone hard-coded a link outside the registry.
      expect(header).not.toMatch(new RegExp(`<a href="[^"]*">${label}</a>`));
    }
  });
});
