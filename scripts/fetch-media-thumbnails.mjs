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
// thumbnail files must already exist in public/media-thumbnails/ before
// `astro build` starts.
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
// This script is a best-effort enhancement and must NEVER fail the build:
// every fetch failure is caught individually and simply means no thumbnail
// file is written for that video, which LatestSignalRail.astro already
// handles by rendering a static per-item placeholder instead of a broken
// image. The script always exits 0.

import esbuild from "esbuild";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const THUMB_DIR = join(ROOT, "public", "media-thumbnails");
const FETCH_TIMEOUT_MS = 8000;

async function loadYoutubeSignalModule() {
  const result = await esbuild.build({
    entryPoints: [join(ROOT, "src/lib/telemetry/youtubeSignal.ts")],
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
  });
  const code = result.outputFiles[0].text;
  const tmpFile = join(ROOT, "node_modules", ".mark26-youtube-signal-bundle.mjs");
  await mkdir(join(ROOT, "node_modules"), { recursive: true });
  await writeFile(tmpFile, code);
  return import(`file://${tmpFile}?t=${Date.now()}`);
}

async function fetchThumbnail(videoId) {
  const url = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      console.warn(`[media-thumbnails] ${url} responded ${response.status} — skipping.`);
      return null;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length === 0) return null;
    return buffer;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[media-thumbnails] ${url} fetch failed (${reason}) — skipping.`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  let mod;
  try {
    mod = await loadYoutubeSignalModule();
  } catch (err) {
    console.warn(`[media-thumbnails] could not load youtubeSignal.ts (${err}) — skipping thumbnail prefetch entirely.`);
    return;
  }

  const { getLatestSignalItems, videoIdFromLink } = mod;
  const result = await getLatestSignalItems();

  if (result.status !== "ok" || result.items.length === 0) {
    console.log("[media-thumbnails] Latest Signal has no items this build — nothing to prefetch.");
    return;
  }

  await mkdir(THUMB_DIR, { recursive: true });

  let fetched = 0;
  let skipped = 0;

  for (const item of result.items) {
    const videoId = videoIdFromLink(item.link);
    if (!videoId) {
      skipped += 1;
      continue;
    }
    const destPath = join(THUMB_DIR, `${videoId}.jpg`);
    if (existsSync(destPath)) {
      fetched += 1; // already present from a previous run in this environment
      continue;
    }
    const bytes = await fetchThumbnail(videoId);
    if (!bytes) {
      skipped += 1;
      continue;
    }
    await writeFile(destPath, bytes);
    fetched += 1;
  }

  console.log(`[media-thumbnails] ${fetched} thumbnail(s) available, ${skipped} will use the placeholder fallback.`);
}

main().catch((err) => {
  console.warn(`[media-thumbnails] unexpected error (${err}) — continuing without thumbnails.`);
});
