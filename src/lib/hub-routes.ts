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
// Every route below is safely inert by construction, with one deliberate
// exception added in Mark 18: /contact is a real contact form, gated behind
// PUBLIC_CONTACT_ENDPOINT (unset in every build this repository runs today,
// which keeps it fully inert) — see docs/mark-18-contact-intake-implementation.md.
// No other route links to any external destination, form, booking flow, or
// checkout.

/** Exact, restrained status line shown near the top of a route that
 *  describes a future capability rather than the current, accurate state
 *  of the site itself. `null` is used for /about and /ecosystem, which
 *  describe current architecture rather than a not-yet-active offer. */
export type PostureLabel =
  | "Deployment Pending — not yet live"
  | "External storefront / internally unaudited"
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
  { path: "/consulting", navLabel: "Consulting", postureLabel: "Deployment Pending — not yet live" },
  { path: "/media", navLabel: "Media", postureLabel: "Deployment Pending — not yet live" },
  { path: "/performance", navLabel: "Performance", postureLabel: "Deployment Pending — not yet live" },
  { path: "/distribution", navLabel: null, postureLabel: "Deployment Pending — not yet live" },
  {
    path: "/hero",
    navLabel: null,
    postureLabel: "External storefront / internally unaudited",
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
