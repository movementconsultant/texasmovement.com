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

/** Live-only nav/footer — filters out "building"/"planned"/"retired" properties
 *  even though raw footerFor() would include them if inGlobalNav is true. */
export function liveFooterFor(current: PropertyKey) {
  return footerFor(current).filter((item) => PROPERTIES[item.key].status === "live");
}

/** Live-only social accounts, further filtered to ones with a resolved (non-TBD) url. */
export function liveSocialAccounts(): readonly SocialAccount[] {
  return publishableAccounts(); // already excludes TBD entries
}

/** Live-only social accounts for one lane — used to build the "Follow the
 *  network" blocks without hand-typing handles/urls anywhere in a template. */
export function liveSocialAccountsForLane(lane: PropertyKey): readonly SocialAccount[] {
  return accountsForLane(lane).filter((a) => a.url !== "__TBD__");
}

/**
 * The ONE contact route this build is allowed to expose.
 * Returns null if nothing is verified — callers MUST render no CTA in that
 * case, never a placeholder, never a raw mailto to an unverified address.
 */
export function verifiedGeneralContact(): { href: string; label: string } | null {
  const general = "hello@texasmovement.com"; // INBOXES.general
  if (!isVerifiedInbox(general)) return null;
  return { href: mailto(general), label: "Email us" };
}

/** Is this property safe to render as a live, clickable nav/footer/lane-grid
 *  destination? Mirrors the same "status === live" gate liveFooterFor()
 *  applies to the global footer, so it can be reused anywhere a property is
 *  rendered as a link target (e.g. the /lanes directory grid). */
export function isLiveProperty(key: PropertyKey): boolean {
  return PROPERTIES[key].status === "live";
}

export { PROPERTIES, PROPERTY_ORDER, LEGAL_LINKS, url, canonical };
