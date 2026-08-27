// src/lib/commerce/consultingTiers.ts
//
// Mark 29 — single source of truth for the three Consulting pricing tiers,
// read by both consulting.astro (to render each tier's price/section) and
// PurchaseButton.astro (to know which tier identifier to POST to the Stripe
// checkout endpoint). The tier `id` values below are the exact strings sent
// in the checkout-session request body and must match the Price ID
// environment variable names the Worker reads — see
// workers/stripe-checkout/README.md.
//
// Price ranges are the owner's own given copy, shown as-is. They are
// display text only — the actual amount charged at checkout is whatever
// Stripe Price the owner configures for that tier's env var in their own
// Stripe dashboard; nothing here or in the Worker hardcodes a dollar
// figure. See workers/stripe-checkout/src/worker.ts's header comment for
// why: the real SKU/Price IDs were never provided to this build, and a
// range like "$1,500–$3,000" isn't itself a valid fixed Checkout Session
// price.

export interface ConsultingTier {
  id: "diagnostic" | "systems-build" | "retainer";
  name: string;
  priceRange: string;
}

export const CONSULTING_TIERS: readonly ConsultingTier[] = [
  { id: "diagnostic", name: "Diagnostic", priceRange: "$1,500–$3,000" },
  { id: "systems-build", name: "Systems Build", priceRange: "$12,000–$25,000" },
  { id: "retainer", name: "Operator Retainer", priceRange: "$2,500–$5,000/month" },
];

export function consultingTier(id: ConsultingTier["id"]): ConsultingTier {
  const tier = CONSULTING_TIERS.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown consulting tier id: ${id}`);
  return tier;
}
