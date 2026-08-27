#!/usr/bin/env node
// scripts/fetch-media-thumbnails.mjs
//
// Mark 26 — explicit policy amendment to the Latest Signal rail's "Ticker
// Tape Guardrails" (Mark 13/14): thumbnails are now authorized for that
// rail specifically, because they are factual, source-derived imagery
// (fetched from i.ytimg.com using the video ID already extracted from the
// confirmed Atom feed) rather than invented or fabricated visuals. The
// "no platform embeds" rule (no iframes, no embedded players) is
// unchanged. See src/lib/telemetry/youtubeSignal.ts and
// docs/mark-13-latest-signal-implementation.md for the full history.
//
// Runs as an npm "prebuild" lifecycle hook — BEFORE `astro build`. This is
// required, not a style choice: Astro/Vite copies public/ into dist/ as
// one of the build's early steps, before any page is rendered (verified
// empirically this pass — a file written to public/ from inside an Astro
// page's frontmatter during `astro build` did NOT end up in dist/). Any
// image files must already exist under public/ before `astro build` starts.
//
// Reuses the existing, already-tested video-ID/Atom-feed logic in
// src/lib/telemetry/youtubeSignal.ts (getLatestSignalItems,
// videoIdFromLink) rather than re-implementing channel resolution and feed
// parsing here — this script is a plain .mjs file (matching every other
// script in this directory) run directly by `node`, and that TypeScript
// module uses extensionless relative imports that only resolve under a
// bundler (Vite/tsc "bundler" moduleResolution), not Node's native ESM
// resolver — confirmed by testing `node --experimental-strip-types`
// directly against it, which fails on the extensionless imports. esbuild
// (already a transitive dependency of Astro/Vite; declared directly in
// package.json as of this Mark so this script doesn't rely on hoisting)
// bundles it in memory instead, with zero changes to the source module.
//
// Mark 27 extends this same script (per the owner's explicit "reuse the
// exact Mark 26 recipe" instruction) to also prefetch thumbnails for
// getTmmDossierEpisodes() — the TMM-only "latest 3" feed the
// SubsidiaryDossier.astro expansion panel on /lanes renders. The two
// sources' items are merged and deduped by video ID before fetching, since
// they can and often will overlap with Latest Signal's TMM items.
//
// Mark 28 extends this same script again (per the owner's explicit "Add to
// the existing prebuild script" instruction) with a second, independent
// job: prefetching HERO product images from
// https://hero.texasmovement.com/products.json (see
// src/lib/commerce/heroProducts.ts). This is a different domain and a
// different data shape from the YouTube job above, so it's implemented as
// its own self-contained section (own module loader, own fetch/write loop)
// wrapped in its own try/catch — a failure fetching HERO's product feed
// must never block or skip the YouTube thumbnail prefetch, and vice versa.
//
// This script is a best-effort enhancement and must NEVER fail the build:
// every fetch failure is caught individually and simply means no image
// file is written for that item, which the calling component already
// handles by rendering a static placeholder instead of a broken image.
// The script always exits 0.

import esbuild from "esbuild";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const THUMB_DIR = join(ROOT, "public", "media-thumbnails");
const HERO_PRODUCTS_DIR = join(ROOT, "public", "hero-products");
const FETCH_TIMEOUT_MS = 8000;

async function bundleModule(entryRelPath, tmpFileName) {
  const result = await esbuild.build({
    entryPoints: [join(ROOT, entryRelPath)],
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
  });
  const code = result.outputFiles[0].text;
  const tmpFile = join(ROOT, "node_modules", tmpFileName);
  await mkdir(join(ROOT, "node_modules"), { recursive: true });
  await writeFile(tmpFile, code);
  return import(`file://${tmpFile}?t=${Date.now()}`);
}

async function fetchImageBuffer(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      console.warn(`[prebuild-images] ${url} responded ${response.status} — skipping.`);
      return null;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length === 0) return null;
    return buffer;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[prebuild-images] ${url} fetch failed (${reason}) — skipping.`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function writeIfMissing(destPath, url) {
  if (existsSync(destPath)) return "cached";
  const bytes = await fetchImageBuffer(url);
  if (!bytes) return "skipped";
  await writeFile(destPath, bytes);
  return "fetched";
}

async function prefetchYoutubeThumbnails() {
  let mod;
  try {
    mod = await bundleModule(
      "src/lib/telemetry/youtubeSignal.ts",
      ".mark26-youtube-signal-bundle.mjs",
    );
  } catch (err) {
    console.warn(`[media-thumbnails] could not load youtubeSignal.ts (${err}) — skipping thumbnail prefetch entirely.`);
    return;
  }

  const { getLatestSignalItems, getTmmDossierEpisodes, videoIdFromLink } = mod;
  const [latestSignal, dossierEpisodes] = await Promise.all([
    getLatestSignalItems(),
    getTmmDossierEpisodes(3),
  ]);

  const itemsByVideoId = new Map();
  for (const item of [...latestSignal.items, ...dossierEpisodes.items]) {
    const videoId = videoIdFromLink(item.link);
    if (videoId && !itemsByVideoId.has(videoId)) {
      itemsByVideoId.set(videoId, item);
    }
  }

  if (itemsByVideoId.size === 0) {
    console.log("[media-thumbnails] no Latest Signal or dossier episode items this build — nothing to prefetch.");
    return;
  }

  await mkdir(THUMB_DIR, { recursive: true });

  let fetched = 0;
  let skipped = 0;

  for (const [videoId] of itemsByVideoId) {
    const outcome = await writeIfMissing(
      join(THUMB_DIR, `${videoId}.jpg`),
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    );
    if (outcome === "skipped") skipped += 1;
    else fetched += 1;
  }

  console.log(`[media-thumbnails] ${fetched} thumbnail(s) available, ${skipped} will use the placeholder fallback.`);
}

async function prefetchHeroProductImages() {
  let mod;
  try {
    mod = await bundleModule(
      "src/lib/commerce/heroProducts.ts",
      ".mark28-hero-products-bundle.mjs",
    );
  } catch (err) {
    console.warn(`[hero-products] could not load heroProducts.ts (${err}) — skipping product image prefetch entirely.`);
    return;
  }

  const { getHeroProducts } = mod;
  const result = await getHeroProducts(4);

  if (result.status !== "ok" || result.products.length === 0) {
    console.log("[hero-products] no HERO products this build — nothing to prefetch.");
    return;
  }

  await mkdir(HERO_PRODUCTS_DIR, { recursive: true });

  let fetched = 0;
  let skipped = 0;

  for (const product of result.products) {
    if (!product.imageUrl) {
      skipped += 1;
      continue;
    }
    const outcome = await writeIfMissing(
      join(HERO_PRODUCTS_DIR, `${product.handle}.jpg`),
      product.imageUrl,
    );
    if (outcome === "skipped") skipped += 1;
    else fetched += 1;
  }

  console.log(`[hero-products] ${fetched} product image(s) available, ${skipped} will use the placeholder fallback.`);
}

async function main() {
  // Each job is isolated: a failure in one must never block or skip the
  // other (different domain, different data shape, independently owned).
  try {
    await prefetchYoutubeThumbnails();
  } catch (err) {
    console.warn(`[media-thumbnails] unexpected error (${err}) — continuing without YouTube thumbnails.`);
  }
  try {
    await prefetchHeroProductImages();
  } catch (err) {
    console.warn(`[hero-products] unexpected error (${err}) — continuing without HERO product images.`);
  }
}

main().catch((err) => {
  console.warn(`[prebuild-images] unexpected error (${err}) — continuing without prefetched images.`);
});
