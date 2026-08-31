import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { GENERAL_CONTACT } from "../src/lib/site";

// Mark 34 ("Open the Doors") — owner-authorized "bare minimum regulation,
// frictionless intake" pass. Narrow tests for the specific, explicit
// changes this Mark made — not a re-test of everything /consulting or
// the footer already covered elsewhere.

const ROOT = join(new URL(".", import.meta.url).pathname, "..");
const consultingPageSource = readFileSync(join(ROOT, "src/pages/consulting.astro"), "utf8");
const footerSource = readFileSync(join(ROOT, "src/components/Footer.astro"), "utf8");
const contactPageSource = readFileSync(join(ROOT, "src/pages/contact.astro"), "utf8");

describe("Mark 34 — contact CTAs render unconditionally, no verification gate", () => {
  it("GENERAL_CONTACT is a real, unconditional mailto CTA", () => {
    expect(GENERAL_CONTACT).toEqual({
      href: "mailto:hello@texasmovement.com",
      label: "Contact Texas Movement",
    });
  });

  it("docs/LAUNCH_BLOCKERS.md no longer exists", () => {
    expect(existsSync(join(ROOT, "docs/LAUNCH_BLOCKERS.md"))).toBe(false);
  });
});

describe("Mark 34 — /consulting's per-tier CTAs are plain mailto, not Stripe Purchase buttons", () => {
  it("no longer imports or renders PurchaseButton", () => {
    expect(consultingPageSource).not.toContain("PurchaseButton");
  });

  it("renders three ConsultingEmailCta instances with real tier context in the subject", () => {
    const matches = [...consultingPageSource.matchAll(/<ConsultingEmailCta/g)];
    expect(matches.length).toBe(3);
    expect(consultingPageSource).toContain('label="Email Us"');
    expect(consultingPageSource).toContain('label="Get in Touch"');
  });

  it("still sources each tier's price range from CONSULTING_TIERS, not a hand-duplicated string", () => {
    expect(consultingPageSource).toContain("CONSULTING_TIERS[0].priceRange");
    expect(consultingPageSource).toContain("CONSULTING_TIERS[1].priceRange");
    expect(consultingPageSource).toContain("CONSULTING_TIERS[2].priceRange");
  });

  it("has a real Connected Lanes section with internal links, no fabricated content", () => {
    expect(consultingPageSource).toContain("CONNECTED LANES");
    for (const href of ['href: "/about"', 'href: "/ecosystem"', 'href: "/media"', 'href: "/performance"']) {
      expect(consultingPageSource).toContain(href);
    }
  });

});

describe("Mark 34 — bare-minimum compliance line lives in the footer, not page-level banners", () => {
  it("Footer.astro renders the exact given disclaimer line", () => {
    const normalized = footerSource.replace(/\s+/g, " ");
    expect(normalized).toContain(
      "Texas Movement International provides systems and operational consulting.",
    );
    expect(normalized).toContain(
      "We do not provide legal, tax, or medical advice. Please consult licensed professionals for those services.",
    );
  });

  it("/contact no longer has a Secondary Protocol confidential-info warning", () => {
    expect(contactPageSource).not.toContain("Secondary Protocol");
    expect(contactPageSource).not.toMatch(/treat any message claiming to be one as/i);
  });
});
