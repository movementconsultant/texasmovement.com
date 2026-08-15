// src/lib/site.ts
//
// Thin, repo-local wrapper around the vendored `@tmi/constants` package.
// It enforces the launch-safety rules that the raw constants package does
// NOT enforce by itself (raw GLOBAL_FOOTER/footerFor() includes "building"
// properties too; raw ACCOUNTS has no "verified inbox" concept). Every
// page, layout, nav, footer, and JSON-LD block goes through THIS file —
// never import @tmi/constants primitives directly in a .astro template.
import {
  PROPERTIES,
  PROPERTY_ORDER,
  footerFor,
  LEGAL_LINKS,
  publishableAccounts,
  accountsForLane,
  organizationJsonLd as rawOrganizationJsonLd,
  url,
  canonical,
  mailto,
} from "@tmi/constants";
import type { PropertyKey, SocialAccount } from "@tmi/constants";

/**
 * Inboxes confirmed live and forwarding as of this build.
 * EMPTY by default — nothing is verified until a human confirms it.
 * Edit this list only after manually confirming an inbox forwards.
 * This is intentionally NOT sourced from org.ts — org.ts lists every
 * inbox that SHOULD exist, not every inbox confirmed to exist.
 */
export const VERIFIED_INBOXES: readonly string[] = [
  // "hello@texasmovement.com",  <- uncomment only after confirming
];

export function isVerifiedInbox(address: string | undefined | null): boolean {
  return !!address && VERIFIED_INBOXES.includes(address);
}

/**
 * Accounts intentionally withheld from ALL public output pending an explicit
 * confirmation from Alexander, even though they are not `TBD`-typed in the
 * vendored `@tmi/constants/social.ts` `ACCOUNTS` array (i.e. `publishableAccounts()`
 * would otherwise treat them as safe to render).
 *
 * Named entries: the `tmi`-lane LinkedIn URL
 * (`https://www.linkedin.com/company/texasmovement`). Alexander's decision is
 * "Texas Movement International is the official LinkedIn Company Page
 * identity. Do not link to either conflicting legacy LinkedIn URL until I
 * provide the exact canonical Company Page URL" — that rules out BOTH the
 * legacy `texas-movement-consulting` URL (never in `ACCOUNTS` to begin with)
 * AND this `texasmovement` URL currently sitting in `ACCOUNTS`, because a
 * brand-approval decision ("TMI is the identity") is not the same thing as
 * operational proof this specific URL is the real Company Page link.
 *
 * To un-hold: once Alexander supplies the real canonical LinkedIn Company
 * Page URL, update the `linkedin` / lane `"tmi"` entry in
 * `packages/constants/src/social.ts` with that confirmed URL, THEN delete
 * this filter entry (one line). Do not remove the filter entry first —
 * the URL currently in `social.ts` is still unconfirmed.
 */
const HELD_PENDING_CONFIRMATION: ReadonlySet<string> = new Set([
  "https://www.linkedin.com/company/texasmovement",
]);

/**
 * Blanket LinkedIn hold: per CLAUDE.md rule 5 ("no unconfirmed brand
 * assets"), no LinkedIn URL of any kind — company page or personal profile —
 * is confirmed for public output on this property yet. The named entry above
 * only caught the `tmi`-lane company-page URL; `ACCOUNTS` also carries the
 * founder's personal LinkedIn profile (`lane: "founder"`), which is a
 * *different*, non-`TBD` URL that was leaking into every page's Organization
 * JSON-LD `sameAs` (via `publishableAccounts()`) even though it was never
 * reviewed for this decision. Filtering by domain instead of by exact URL
 * closes that gap and matches the "ZERO linkedin.com references in public
 * output" bar this repo holds itself to until Alexander confirms a URL.
 */
function isHeldPendingConfirmation(u: string): boolean {
  return HELD_PENDING_CONFIRMATION.has(u) || u.includes("linkedin.com");
}

/**
 * Placeholder slot for the eventual real, confirmed LinkedIn Company Page
 * URL. Intentionally unused by every rendering path today — it exists only
 * so that wiring the real URL in later (once Alexander provides it) is a
 * small, obvious change: set the real URL in `social.ts`, delete the
 * `HELD_PENDING_CONFIRMATION` entry above, and this flag becomes moot.
 * Do not set this to a literal URL string and do not read it from a
 * template until that happens.
 */
export const LINKEDIN_URL_PENDING = true;

/**
 * Presentation-only ecosystem-map labels, used by /lanes and the homepage's
 * "Explore the ecosystem" section. These do NOT change
 * `PROPERTIES[key].status` (the real lifecycle/safety source of truth used
 * by `isLiveProperty()`, sitemap/canonical gating, etc.) — they're an
 * explicit editorial decision by the site owner about how the hub currently
 * *presents* the ecosystem's build state, independent of whether an
 * individual property's own site happens to be deployed elsewhere. Every
 * entry is intentionally non-interactive wherever it's rendered: see
 * src/pages/lanes.astro and src/pages/index.astro.
 *
 * "private" additionally means: excluded from the global footer (see
 * `liveFooterFor()` below) and from the primary nav (see Header.astro) —
 * mentioned only in the static ecosystem map, never linked or indexed as an
 * independent offer.
 *
 * "live" means: explicitly approved by the owner to appear as a real,
 * clickable destination in global navigation/footer, on top of the
 * ecosystem-map mention. No entry currently uses this value — as of the
 * owner's approved ecosystem presentation, every property is "building" or
 * "private", so `liveFooterFor()` below currently renders nothing. This is
 * deliberate, not a bug: a property only leaves the informational-only map
 * (`/lanes`, the homepage teaser) and becomes a real footer/nav link when
 * its `ECOSYSTEM_MAP` entry is explicitly updated to `"live"` — a small,
 * reviewable, one-entry change, never inferred from `PROPERTIES[key].status`
 * alone.
 */
export type EcosystemBadge = "building" | "private" | "live";
export interface EcosystemMapEntry {
  readonly key: PropertyKey;
  readonly group: "core" | "founder" | "vertical";
  readonly badge: EcosystemBadge;
  readonly blurb: string;
}
export const ECOSYSTEM_MAP: readonly EcosystemMapEntry[] = [
  {
    key: "tmi",
    group: "core",
    badge: "building",
    blurb:
      "The institutional umbrella for performance, culture, media, technology, and disciplined execution.",
  },
  {
    key: "founder",
    group: "founder",
    badge: "building",
    blurb: "Founder perspective, systems, writing, media, and building in public.",
  },
  {
    key: "media",
    group: "vertical",
    badge: "building",
    blurb: "Independent media, editorial series, and cultural documentation.",
  },
  {
    key: "consulting",
    group: "vertical",
    badge: "building",
    blurb: "Digital ecosystem strategy, brand architecture, and implementation systems.",
  },
  {
    key: "hero",
    group: "vertical",
    badge: "building",
    blurb: "Consumer products, apparel, footwear, and performance-oriented design.",
  },
  {
    key: "performance",
    group: "vertical",
    badge: "building",
    blurb: "Training, movement, athletic development, and performance systems.",
  },
  {
    key: "founderlink",
    group: "vertical",
    badge: "private",
    blurb: "Internal founder routing and cross-lane coordination.",
  },
  {
    key: "distribution",
    group: "vertical",
    badge: "building",
    blurb: "Content, product, and partnership distribution infrastructure.",
  },
  {
    key: "social",
    group: "vertical",
    badge: "building",
    blurb: "Community, social publishing, and public conversation systems.",
  },
  {
    key: "health",
    group: "vertical",
    badge: "private",
    blurb: "Future health and wellness work; no public claim, offer, or advice.",
  },
  {
    key: "reparations",
    group: "vertical",
    badge: "private",
    blurb: "Future research or advocacy work; no public claim, offer, or CTA.",
  },
] as const;

export function ecosystemEntry(key: PropertyKey): EcosystemMapEntry | undefined {
  return ECOSYSTEM_MAP.find((e) => e.key === key);
}

export function isPrivateProperty(key: PropertyKey): boolean {
  return ecosystemEntry(key)?.badge === "private";
}

/**
 * The single gate for "may this property appear as a real, clickable link
 * in global navigation or the footer" — deliberately stricter than, and
 * independent of, `PROPERTIES[key].status`. `ECOSYSTEM_MAP` (the owner's
 * approved public presentation) is the authority: a property is eligible
 * ONLY when its entry's badge is explicitly `"live"`. A property with no
 * `ECOSYSTEM_MAP` entry, or a `"building"`/`"private"` badge, is never
 * eligible — absence of an explicit "live" mark is never treated as
 * permission.
 */
export function isFooterEligible(key: PropertyKey): boolean {
  return ecosystemEntry(key)?.badge === "live";
}

/**
 * Global footer, filtered to `isFooterEligible()` only. As of the owner's
 * approved ecosystem presentation (every property is "building" or
 * "private"), this currently returns an empty array for every `current` —
 * the footer's ecosystem/property list is correctly empty until a property
 * is explicitly marked "live" in `ECOSYSTEM_MAP`. Building/Private
 * properties remain visible ONLY on `/lanes` and the homepage's
 * informational ecosystem teaser — never here. */
export function liveFooterFor(current: PropertyKey) {
  return footerFor(current).filter((item) => isFooterEligible(item.key));
}

/** Live-only social accounts, further filtered to ones with a resolved
 *  (non-TBD) url AND not held pending confirmation (see
 *  HELD_PENDING_CONFIRMATION above) — this is the ONLY list that may back a
 *  footer/social-icon rendering path anywhere on this site. */
export function liveSocialAccounts(): readonly SocialAccount[] {
  return publishableAccounts().filter((a) => !isHeldPendingConfirmation(a.url as string));
}

/** Live-only social accounts for one lane — used to build any "follow us"
 *  style block without hand-typing handles/urls anywhere in a template.
 *  Same held-pending-confirmation filter as liveSocialAccounts(). */
export function liveSocialAccountsForLane(lane: PropertyKey): readonly SocialAccount[] {
  return accountsForLane(lane).filter(
    (a) => a.url !== "__TBD__" && !isHeldPendingConfirmation(a.url as string),
  );
}

/**
 * Organization JSON-LD, safe for public output. Wraps the vendored
 * organizationJsonLd() (which builds `sameAs` from the raw
 * publishableAccounts() — that function does NOT know about
 * HELD_PENDING_CONFIRMATION) and strips any held-pending URL out of
 * `sameAs` before it ever reaches a page. Always import THIS from a
 * template, never `organizationJsonLd` directly from "@tmi/constants".
 */
export function safeOrganizationJsonLd() {
  const org = rawOrganizationJsonLd();
  return {
    ...org,
    sameAs: (org.sameAs as string[]).filter((u) => !isHeldPendingConfirmation(u)),
  };
}

/** Exact CTA copy Alexander specified for the site's one primary CTA. Kept
 *  as a named export so it's independently testable regardless of
 *  VERIFIED_INBOXES state. */
export const CONTACT_CTA_LABEL = "Contact Texas Movement";

/**
 * The ONE contact route this build is allowed to expose.
 * Returns null if nothing is verified — callers MUST render no CTA in that
 * case, never a placeholder, never a raw mailto to an unverified address.
 */
export function verifiedGeneralContact(): { href: string; label: string } | null {
  const general = "hello@texasmovement.com"; // INBOXES.general
  if (!isVerifiedInbox(general)) return null;
  return { href: mailto(general), label: CONTACT_CTA_LABEL };
}

/** Is this property safe to render as a live, clickable nav/footer/lane-grid
 *  destination? Mirrors the same "status === live" gate liveFooterFor()
 *  applies to the global footer, so it can be reused anywhere a property is
 *  rendered as a link target (e.g. the /lanes directory grid). */
export function isLiveProperty(key: PropertyKey): boolean {
  return PROPERTIES[key].status === "live";
}

export { PROPERTIES, PROPERTY_ORDER, LEGAL_LINKS, url, canonical };
