// src/lib/hub-routes.ts
//
// Mark 4 hub-route registry — the single list every new local TMI hub route
// added in this pass (/about, /ecosystem, /consulting, /media, /performance,
// /distribution, /hero, /partners) and Header.astro's primary nav both read
// from. Mirrors the "one source of truth" pattern already used by
// src/lib/site.ts (ECOSYSTEM_MAP) — do not hand-duplicate a route path, nav
// label, or posture string anywhere else.
//
// This is a purely local, in-repo route registry for pages that live ONLY
// in this repository. It is intentionally separate from PROPERTIES /
// ECOSYSTEM_MAP (@tmi/constants + src/lib/site.ts), which describe the
// wider, still-largely-unbuilt multi-repo TMI ecosystem (separate
// sub-property repos/subdomains). Per the owner's Mark 4 infrastructure
// direction, the ecosystem now runs on exactly two canonical Cloudflare
// Pages projects (texasmovement.com and alexandermathai.com) — every route
// below is a real path under texasmovement.com itself, not a link to a
// *.texasmovement.com subdomain. Never pass PROPERTIES[key].url for any of
// these paths; use the local path string directly.
//
// Every route below is safely inert by construction, with four deliberate
// exceptions:
//   - /contact (Mark 18): a real contact form, gated behind
//     PUBLIC_CONTACT_ENDPOINT (unset in every build this repository runs
//     today, which keeps it fully inert) — see
//     docs/mark-18-contact-intake-implementation.md.
//   - /consulting (Mark 28, extended Mark 29, extended Mark 34, all
//     owner-authorized policy amendments): links out to /contact via a
//     real "Request Diagnostic Brief" CTA (Mark 28; also surfaced on the
//     homepage — see ConsultingCTA.astro), and (Mark 34, "Open the
//     Doors") each pricing tier has a real "Email Us" / "Get in Touch"
//     mailto CTA to consulting@texasmovement.com — see
//     ConsultingEmailCta.astro. This replaced Mark 29's Stripe "Purchase
//     [Tier]" flow (still deployed and available, see
//     src/components/PurchaseButton.astro and workers/stripe-checkout/,
//     just no longer linked from this page). No inquiry form lives on
//     /consulting's own markup either way — the real conversion surfaces
//     live entirely in the delegated ConsultingEmailCta component.
//   - /hero (Mark 28, owner-authorized policy amendment): now renders
//     HeroProductCarousel.astro, which build-time-fetches HERO's public
//     Shopify product feed and links out to real hero.texasmovement.com
//     product pages — see src/lib/commerce/heroProducts.ts. Checkout,
//     fulfillment, and account systems remain entirely on Shopify; nothing
//     here processes payment or personal data.
//   - /ecosystem (Mark 30, owner-authorized policy reversal): its
//     "FOUNDER CONTEXT" section previously stated this page "does not link
//     to" alexandermathai.com. The owner has now explicitly authorized a
//     real cross-property link there (and a matching "Founder Dossier"
//     card on the homepage — see FounderBridge.astro), so that claim was
//     corrected. The outbound href itself is rendered by the imported
//     FounderContextLink.astro component (sourced from
//     PROPERTIES.founder.url), keeping ecosystem.astro's own literal
//     source free of a direct http(s) href, same pattern as /consulting
//     and /hero above.
// No other route links to any external destination, form, booking flow, or
// checkout.

/** Exact, restrained status line shown near the top of a route that
 *  describes a future capability rather than the current, accurate state
 *  of the site itself. `null` is used for /about and /ecosystem, which
 *  describe current architecture rather than a not-yet-active offer. */
export type PostureLabel =
  | "Deployment Pending — not yet live"
  | "Deployment Pending — Active Signal Telemetry Live via media.texasmovement.com"
  | "External storefront / internally unaudited"
  | "Diagnostic Intake Open — qualified operators"
  | "Confirmed Storefront — Public Catalog Live"
  | null;

export interface HubRoute {
  readonly path: string;
  /** Label shown in primary nav, or null if this route is intentionally
   *  NOT in primary nav (see CLAUDE.md-style rule: HERO, Distribution, and
   *  Partners stay reachable only via /ecosystem's internal links, never
   *  promoted to top-level nav). */
  readonly navLabel: string | null;
  readonly postureLabel: PostureLabel;
}

export const HUB_ROUTES: readonly HubRoute[] = [
  { path: "/about", navLabel: "About", postureLabel: null },
  { path: "/ecosystem", navLabel: "Ecosystem", postureLabel: null },
  { path: "/contact", navLabel: "Contact", postureLabel: null },
  { path: "/consulting", navLabel: "Consulting", postureLabel: "Diagnostic Intake Open — qualified operators" },
  {
    path: "/media",
    navLabel: "Media",
    postureLabel: "Deployment Pending — Active Signal Telemetry Live via media.texasmovement.com",
  },
  { path: "/performance", navLabel: "Performance", postureLabel: "Deployment Pending — not yet live" },
  { path: "/distribution", navLabel: null, postureLabel: "Deployment Pending — not yet live" },
  {
    path: "/hero",
    navLabel: null,
    postureLabel: "Confirmed Storefront — Public Catalog Live",
  },
  { path: "/partners", navLabel: null, postureLabel: "Deployment Pending — not yet live" },
  { path: "/vault", navLabel: null, postureLabel: null },
] as const;

/** Primary-nav entries only, in the order they should render. Matches the
 *  owner's exact Mark 4 instruction: "Primary navigation may include:
 *  About, Ecosystem, Consulting, Media, Performance." HERO, Distribution,
 *  and Partners are deliberately excluded from this list. */
export function navRoutes(): readonly HubRoute[] {
  return HUB_ROUTES.filter((r) => r.navLabel !== null);
}

export function hubRoute(path: string): HubRoute | undefined {
  return HUB_ROUTES.find((r) => r.path === path);
}
