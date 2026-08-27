import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

// Mark 28 — explicit owner policy amendments: (1) a homepage Consulting CTA
// elevating existing, owner-approved /consulting content; (2) a HERO
// product carousel build-time-fetching HERO's public Shopify product feed,
// self-hosting images at build time (reusing the exact Mark 26 recipe).
// See src/components/ConsultingCTA.astro and
// src/components/HeroProductCarousel.astro for the full governance record.

const ROOT = join(new URL(".", import.meta.url).pathname, "..");

const consultingCtaSource = readFileSync(
  join(ROOT, "src/components/ConsultingCTA.astro"),
  "utf8",
);
const heroCarouselSource = readFileSync(
  join(ROOT, "src/components/HeroProductCarousel.astro"),
  "utf8",
);
const heroProductsLibSource = readFileSync(
  join(ROOT, "src/lib/commerce/heroProducts.ts"),
  "utf8",
);
const scriptSource = readFileSync(join(ROOT, "scripts/fetch-media-thumbnails.mjs"), "utf8");
const indexSource = readFileSync(join(ROOT, "src/pages/index.astro"), "utf8");
const heroPageSource = readFileSync(join(ROOT, "src/pages/hero.astro"), "utf8");
const consultingPageSource = readFileSync(join(ROOT, "src/pages/consulting.astro"), "utf8");

describe("Mark 28 — Consulting CTA (homepage)", () => {
  it("renders the owner's exact headline, subhead, and CTA copy", () => {
    expect(consultingCtaSource).toContain("Systems for people who move.");
    expect(consultingCtaSource).toContain(
      "Texas Movement Consulting builds AI-powered operating systems for founders and institutions.",
    );
    expect(consultingCtaSource).toContain("Request Diagnostic Brief");
    expect(consultingCtaSource).toContain("View Consulting Architecture");
  });

  it("wires the primary CTA to /contact and the secondary link to /consulting", () => {
    expect(consultingCtaSource).toMatch(/href="\/contact"/);
    expect(consultingCtaSource).toMatch(/href="\/consulting"/);
  });

  it("uses the Signal Green accent fill only on the primary CTA button, not the secondary link", () => {
    expect(consultingCtaSource).toMatch(/class="btn btn--accent"/);
    const secondaryLinkBlock = consultingCtaSource.match(
      /<a class="consulting-cta-secondary"[\s\S]*?<\/a>/,
    );
    expect(secondaryLinkBlock).not.toBeNull();
    expect(secondaryLinkBlock![0]).not.toMatch(/btn--accent|ff-accent-signal/);
  });

  it("is placed on the homepage immediately after the hero section, before 'What we are building'", () => {
    const heroEnd = indexSource.indexOf("<!-- What we are building -->");
    const consultingImportIdx = indexSource.indexOf("<ConsultingCTA />");
    const heroSectionIdx = indexSource.indexOf('<section class="section hero">');
    expect(heroSectionIdx).toBeGreaterThan(-1);
    expect(consultingImportIdx).toBeGreaterThan(heroSectionIdx);
    expect(consultingImportIdx).toBeLessThan(heroEnd);
  });
});

describe("Mark 28 — HERO product carousel (self-hosted, reuses the Mark 26 recipe)", () => {
  it("renders a product <img> with alt text, explicit width/height, and loading=lazy", () => {
    expect(heroCarouselSource).toMatch(/<img[\s\S]*?alt={product\.title}/);
    expect(heroCarouselSource).toContain('width="220"');
    expect(heroCarouselSource).toContain('height="220"');
    expect(heroCarouselSource).toContain('loading="lazy"');
  });

  it("is grayscale by default with a hover-to-color transition, respecting prefers-reduced-motion", () => {
    expect(heroCarouselSource).toMatch(/\.hero-product-thumb\s*{[^}]*filter:\s*grayscale\(1\)/);
    expect(heroCarouselSource).toMatch(/filter:\s*grayscale\(0\)/);
    expect(heroCarouselSource).toMatch(/prefers-reduced-motion:\s*reduce/);
  });

  it("never hotlinks Shopify's CDN — the <img> src is always the self-hosted local path", () => {
    expect(heroCarouselSource).not.toMatch(/src=.*myshopify\.com/);
    expect(heroCarouselSource).not.toMatch(/src=.*cdn\.shopify/);
    expect(heroCarouselSource).toContain("/hero-products/");
  });

  it("links 'Shop Now' to the real hero.texasmovement.com product URL (a legitimate destination link, not an image hotlink)", () => {
    expect(heroCarouselSource).toContain("Shop Now");
    expect(heroCarouselSource).toContain("heroProductUrl(product.handle)");
    expect(heroProductsLibSource).toContain(
      'return `https://hero.texasmovement.com/products/${handle}`;',
    );
  });

  it("uses CSS scroll-snap for the horizontal carousel, no JS carousel library", () => {
    expect(heroCarouselSource).toMatch(/scroll-snap-type:\s*x mandatory/);
    expect(heroCarouselSource).toMatch(/scroll-snap-align:\s*start/);
  });

  it("forbids an <iframe> or any other platform embed", () => {
    expect(heroCarouselSource).not.toMatch(/<iframe[\s>]/i);
  });

  it("renders a monospace per-item placeholder (never a broken image) when a product image file is missing", () => {
    expect(heroCarouselSource).toContain("hero-product-thumb--placeholder");
    expect(heroCarouselSource).toMatch(/hero-product-thumb-placeholder-text[\s\S]*?\{product\.title\}/);
  });

  it("falls back to a single 'Visit HERO Store' card in the Signal Lost aesthetic when the whole feed is unavailable", () => {
    expect(heroCarouselSource).toContain("Visit HERO Store");
    expect(heroCarouselSource).toContain("hero-carousel-fallback");
    expect(heroCarouselSource).toContain("SIGNAL LOST");
  });

  it("getHeroProducts never throws — every failure path resolves to status: 'fallback'", () => {
    expect(heroProductsLibSource).toMatch(/return \{ status: "fallback", products: \[\] \};/);
    expect(heroProductsLibSource).toContain("catch (err)");
  });

  it("fetch-media-thumbnails.mjs was extended to prefetch HERO product images too, isolated from the YouTube job", () => {
    expect(scriptSource).toContain("getHeroProducts");
    expect(scriptSource).toContain("prefetchHeroProductImages");
    expect(scriptSource).toContain("prefetchYoutubeThumbnails");
    expect(scriptSource).toMatch(/main\(\)\.catch/);
  });

  it("is rendered on both the homepage and /hero", () => {
    expect(indexSource).toContain("<HeroProductCarousel />");
    expect(heroPageSource).toContain("<HeroProductCarousel />");
  });

  it("is placed on the homepage below the Consulting CTA", () => {
    const ctaIdx = indexSource.indexOf("<ConsultingCTA />");
    const carouselIdx = indexSource.indexOf("<HeroProductCarousel />");
    expect(ctaIdx).toBeGreaterThan(-1);
    expect(carouselIdx).toBeGreaterThan(ctaIdx);
  });
});

describe("Mark 28 — /hero and /consulting posture reconciliation", () => {
  it("/hero no longer claims its catalog/pricing are unaudited or unconfirmed", () => {
    expect(heroPageSource).not.toMatch(/not.{0,20}audited or verified/i);
    expect(heroPageSource).not.toMatch(/nothing on this page should be read as confirming/i);
  });

  it("/hero still never makes a bare 'is verified' claim", () => {
    expect(/\bis verified\b/i.test(heroPageSource)).toBe(false);
  });

  it("/consulting no longer claims no engagement pathway or contact route exists", () => {
    expect(consultingPageSource).not.toMatch(/no engagement pathway is active/i);
    expect(consultingPageSource).not.toMatch(/no inquiry form, booking link, calendar/i);
  });

  it("/consulting still discloses the real limits: no booking link, calendar, or published pricing", () => {
    expect(consultingPageSource).toMatch(/no\s+booking link, calendar/i);
  });
});
