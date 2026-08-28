import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { CONSULTING_TIERS, consultingTier } from "../src/lib/commerce/consultingTiers";

// Mark 29 — enhanced Consulting copy + real Stripe Checkout purchase
// functionality on the three pricing tiers. See
// src/components/PurchaseButton.astro, src/lib/commerce/consultingTiers.ts,
// and workers/stripe-checkout/ for the full implementation record,
// including the disclosed gap that real Stripe Price IDs were never
// provided to this build.

const ROOT = join(new URL(".", import.meta.url).pathname, "..");

const consultingPageSource = readFileSync(join(ROOT, "src/pages/consulting.astro"), "utf8");
const purchaseButtonSource = readFileSync(
  join(ROOT, "src/components/PurchaseButton.astro"),
  "utf8",
);
const workerSource = readFileSync(join(ROOT, "workers/stripe-checkout/src/worker.ts"), "utf8");

describe("Mark 29 — consultingTiers single source of truth", () => {
  it("defines exactly the three owner-specified tiers with their exact price ranges", () => {
    expect(CONSULTING_TIERS).toEqual([
      { id: "diagnostic", name: "Diagnostic", priceRange: "$1,500–$3,000" },
      { id: "systems-build", name: "Systems Build", priceRange: "$12,000–$25,000" },
      { id: "retainer", name: "Operator Retainer", priceRange: "$2,500–$5,000/month" },
    ]);
  });

  it("consultingTier() resolves each id and throws on an unknown one", () => {
    expect(consultingTier("diagnostic").name).toBe("Diagnostic");
    // @ts-expect-error deliberately invalid id for the throw-path test
    expect(() => consultingTier("not-a-real-tier")).toThrow();
  });
});

describe("Mark 29 — expanded Consulting copy (exact owner-given text)", () => {
  it("hero section includes the exact 'What You Get' bullets", () => {
    for (const bullet of [
      "30-day diagnostic with prioritized systems roadmap",
      "Documented decision record that survives team changes",
      "AI workflow implementation with your team co-owning the build",
      "Ongoing operator support for founders who need systems stewardship",
    ]) {
      expect(consultingPageSource).toContain(bullet);
    }
  });

  it("Tier 1 Diagnostic includes the exact weekly breakdown and deliverables", () => {
    for (const line of [
      "Week 1: Stakeholder interviews and current-state mapping",
      "Week 2: Friction point identification and owner-dependence audit",
      "Week 3: Systems architecture and AI workflow opportunities",
      "Week 4: Prioritized roadmap with timelines, owners, and key decisions",
      "Current-state systems map (visual + written)",
      "Friction log with severity ratings",
      "Prioritized implementation roadmap",
      "Decision record template for ongoing use",
    ]) {
      expect(consultingPageSource).toContain(line);
    }
  });

  it("Tier 2 Systems Build includes the exact scope and typical-scope bullets", () => {
    for (const line of [
      "2-4 implementation sprints (2 weeks each)",
      "AI workflow design and testing with your team",
      "Documentation that enables audit and adjustment",
      "Handoff training for your internal systems owner",
      "Client intake and onboarding automation",
      "AI-assisted content production workflows",
      "Decision support systems for recurring choices",
      "Cross-team coordination and handoff protocols",
    ]) {
      expect(consultingPageSource).toContain(line);
    }
  });

  it("Tier 3 Operator Retainer includes the exact cadence and best-for bullets", () => {
    for (const line of [
      "Weekly systems check-in (30-60 min)",
      "Async decision support via structured briefs",
      "Monthly systems audit and adjustment",
      "Quarterly strategic review and roadmap update",
      "Founders scaling past 10 people who need systems stewardship",
      "Operators managing multiple projects with competing priorities",
      "Teams implementing AI workflows who need ongoing calibration",
      "Companies preparing for funding, acquisition, or leadership transition",
    ]) {
      expect(consultingPageSource).toContain(line);
    }
  });

  it("sources each tier's price range from the CONSULTING_TIERS registry, not a hand-duplicated string", () => {
    expect(consultingPageSource).toContain("CONSULTING_TIERS[0].priceRange");
    expect(consultingPageSource).toContain("CONSULTING_TIERS[1].priceRange");
    expect(consultingPageSource).toContain("CONSULTING_TIERS[2].priceRange");
  });

  it("no longer claims 'no published pricing' now that pricing is published", () => {
    expect(consultingPageSource).not.toMatch(/no\s+booking link, calendar, or published pricing/i);
  });
});

describe("Mark 29 — PurchaseButton graceful degradation and safety", () => {
  it("renders 'Contact to Purchase' with a working /contact link when the endpoint is unset", () => {
    expect(purchaseButtonSource).toContain("Contact to Purchase");
    expect(purchaseButtonSource).toMatch(/href="\/contact"[\s\S]*?Contact to Purchase/);
  });

  it("warns in dev mode when PUBLIC_STRIPE_CHECKOUT_ENDPOINT is unset", () => {
    expect(purchaseButtonSource).toMatch(/import\.meta\.env\.DEV/);
    expect(purchaseButtonSource).toContain("console.warn");
  });

  it("includes the 'Questions? Email first' secondary link in both the live and fallback states", () => {
    const anchorOccurrences =
      purchaseButtonSource.match(/<a href="\/contact"[^>]*>\s*Questions\? Email first/g) ?? [];
    expect(anchorOccurrences.length).toBe(2);
  });

  it("never hardcodes a dollar amount or Stripe Price ID — tier identifier only is sent to the endpoint", () => {
    expect(purchaseButtonSource).toContain("JSON.stringify({ tier })");
    expect(purchaseButtonSource).not.toMatch(/price_[a-zA-Z0-9]/);
    expect(purchaseButtonSource).not.toMatch(/\$[\d,]+/);
  });

  it("uses the Signal Green / Void Black brutalist token pair with a 0.2s hover transition, per spec", () => {
    expect(purchaseButtonSource).toMatch(/background:\s*var\(--ff-accent-signal\)/);
    expect(purchaseButtonSource).toMatch(/color:\s*var\(--paper\)/);
    expect(purchaseButtonSource).toMatch(/transition:[^;]*0\.2s/);
  });

  it("is mobile-responsive (full-width button under the site's mobile breakpoint)", () => {
    expect(purchaseButtonSource).toMatch(/@media \(max-width: 40rem\)[\s\S]*?width:\s*100%/);
  });

  it("handles a failed checkout request by re-enabling the button and showing an inline status, never leaving it stuck", () => {
    expect(purchaseButtonSource).toMatch(/finally\s*\{[\s\S]*?button\.disabled = false/);
    expect(purchaseButtonSource).toContain("temporarily unavailable");
  });
});

describe("Mark 29 — Stripe checkout Worker never hardcodes a Price ID or fabricates SKU data", () => {
  it("reads all three tier Price IDs from env, never as a literal string", () => {
    expect(workerSource).toContain("STRIPE_PRICE_DIAGNOSTIC");
    expect(workerSource).toContain("STRIPE_PRICE_SYSTEMS_BUILD");
    expect(workerSource).toContain("STRIPE_PRICE_RETAINER");
    expect(workerSource).not.toMatch(/["'`]price_[a-zA-Z0-9]/);
  });

  it("fails closed with a clean error, not a 500 or hang, when a tier's Price ID is unconfigured", () => {
    expect(workerSource).toMatch(/if \(!priceId\)/);
    expect(workerSource).toContain("isn't available for checkout yet");
  });

  it("fails closed when STRIPE_SECRET_KEY is unconfigured", () => {
    expect(workerSource).toMatch(/if \(!env\.STRIPE_SECRET_KEY\)/);
  });

  it("verifies the Stripe webhook signature via Web Crypto before trusting any event", () => {
    expect(workerSource).toContain("verifyStripeSignature");
    expect(workerSource).toContain("crypto.subtle");
    expect(workerSource).toMatch(/Stripe-Signature/);
  });

  it("rejects webhook requests whose timestamp is outside the replay-protection tolerance", () => {
    expect(workerSource).toContain("WEBHOOK_TIMESTAMP_TOLERANCE_SECONDS");
  });

  it("supports multiple allowed origins (shared by texasmovement.com and alexandermathai.com), not a single hardcoded one", () => {
    expect(workerSource).toContain("ALLOWED_ORIGINS");
    expect(workerSource).toMatch(/\.split\(","\)/);
  });

  it("never fabricates a dollar amount in a Stripe API call — only a Price ID and quantity 1", () => {
    expect(workerSource).not.toMatch(/unit_amount/);
    expect(workerSource).toContain("line_items[0][price]");
  });
});
