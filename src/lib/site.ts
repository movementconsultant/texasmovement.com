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

/** Live-only nav/footer — filters out "building"/"planned"/"retired" properties
 *  even though raw footerFor() would include them if inGlobalNav is true. */
export function liveFooterFor(current: PropertyKey) {
  return footerFor(current).filter((item) => PROPERTIES[item.key].status === "live");
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
