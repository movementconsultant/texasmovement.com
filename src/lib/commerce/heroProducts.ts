// src/lib/commerce/heroProducts.ts
//
// Mark 28 — build-time fetch of HERO's public Shopify product feed
// (https://hero.texasmovement.com/products.json), per the owner's explicit
// policy amendment: HERO's storefront domain is the owner-confirmed,
// canonical commerce property for this ecosystem (see
// packages/constants/src/ecosystem.ts's `hero` entry — `platform: "shopify"`,
// `status: "live"`). `/products.json` is Shopify's standard, unauthenticated
// public endpoint; no API key or session is involved. This module never
// throws — `getHeroProducts()` always resolves to a HeroProductsResult, and
// a resolution/fetch/parse failure resolves `status: "fallback"` with an
// empty product list, so the calling component can degrade to a static
// "Visit HERO Store" card rather than a broken carousel. Reuses the same
// `safeFetch()` build-time-only network helper already used by the YouTube
// telemetry rails (src/lib/telemetry/fetchWithTimeout.ts) — that module was
// broadened in this same pass from a YouTube-specific description to a
// generic one, since it's now used by two independent data sources.
//
// Only the fields this ecosystem actually needs are ever extracted: title,
// handle (used to build the real product URL), a display price, and the
// first product image's remote URL (used only by
// scripts/fetch-media-thumbnails.mjs to self-host a local copy — never
// rendered directly by a component, matching the Mark 26 self-hosting
// guarantee: no image tag ever points at Shopify's CDN).
import { safeFetch } from "../telemetry/fetchWithTimeout";
import { sanitizeTitle } from "../telemetry/text";

const PRODUCTS_ENDPOINT = "https://hero.texasmovement.com/products.json";

export interface HeroProduct {
  title: string;
  handle: string;
  /** Display-ready price string (e.g. "$120.00"), or null if unavailable. */
  price: string | null;
  /** Remote Shopify CDN URL — never rendered directly; used only to
   *  self-host a local copy at build time. */
  imageUrl: string | null;
}

export interface HeroProductsResult {
  status: "ok" | "fallback";
  products: HeroProduct[];
}

interface ShopifyProductsResponse {
  products?: Array<{
    title?: unknown;
    handle?: unknown;
    images?: Array<{ src?: unknown }>;
    variants?: Array<{ price?: unknown }>;
  }>;
}

export async function getHeroProducts(limit = 4): Promise<HeroProductsResult> {
  const feedResult = await safeFetch(`${PRODUCTS_ENDPOINT}?limit=${limit}`, {
    headers: { Accept: "application/json" },
  });
  if (!feedResult) {
    return { status: "fallback", products: [] };
  }

  let parsed: ShopifyProductsResponse;
  try {
    parsed = JSON.parse(feedResult.text);
  } catch (err) {
    console.warn(`[hero-products] failed to parse products.json (${err}) — falling back.`);
    return { status: "fallback", products: [] };
  }

  const rawProducts = Array.isArray(parsed.products) ? parsed.products : [];
  const products: HeroProduct[] = [];

  for (const raw of rawProducts) {
    if (typeof raw.title !== "string" || typeof raw.handle !== "string") continue;

    const imageUrl =
      Array.isArray(raw.images) && typeof raw.images[0]?.src === "string" ? raw.images[0].src : null;
    const rawPrice =
      Array.isArray(raw.variants) && typeof raw.variants[0]?.price === "string"
        ? raw.variants[0].price
        : null;

    products.push({
      title: sanitizeTitle(raw.title),
      handle: raw.handle,
      price: rawPrice ? `$${rawPrice}` : null,
      imageUrl,
    });

    if (products.length >= limit) break;
  }

  if (products.length === 0) {
    return { status: "fallback", products: [] };
  }

  return { status: "ok", products };
}

export function heroProductUrl(handle: string): string {
  return `https://hero.texasmovement.com/products/${handle}`;
}
