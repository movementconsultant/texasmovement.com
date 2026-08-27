import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

// Mark 27 — TMM episode thumbnail cards on the SubsidiaryDossier.astro
// expansion panel (/lanes). Reuses the exact Mark 26 recipe (self-hosted
// build-time thumbnails, per-item placeholder fallback, brutalist styling)
// scoped to the TMM row only. See tests/latest-signal.test.ts's "Mark 26 —
// self-hosted thumbnails" block for the sibling rail this mirrors, and
// src/lib/telemetry/youtubeSignal.ts's getTmmDossierEpisodes() for the
// TMM-only data source this panel draws from (never TMP's).

const ROOT = join(new URL(".", import.meta.url).pathname, "..");

const dossierSource = readFileSync(
  join(ROOT, "src/components/SubsidiaryDossier.astro"),
  "utf8",
);
const youtubeSignalSource = readFileSync(
  join(ROOT, "src/lib/telemetry/youtubeSignal.ts"),
  "utf8",
);
const scriptSource = readFileSync(
  join(ROOT, "scripts/fetch-media-thumbnails.mjs"),
  "utf8",
);

describe("Mark 27 — TMM dossier episode thumbnail cards on /lanes", () => {
  it("renders an episode <img> with alt text, explicit width/height, and loading=lazy", () => {
    expect(dossierSource).toMatch(/<img[\s\S]*?alt={episode\.title}/);
    expect(dossierSource).toContain('width="168"');
    expect(dossierSource).toContain('height="94"');
    expect(dossierSource).toContain('loading="lazy"');
  });

  it("is grayscale by default with a hover-to-color transition, never a drop shadow", () => {
    expect(dossierSource).toMatch(/\.dossier-episode-thumb\s*{[^}]*filter:\s*grayscale\(1\)/);
    expect(dossierSource).toMatch(/filter:\s*grayscale\(0\)/);
    expect(dossierSource).not.toMatch(/box-shadow\s*:\s*(?!none)/);
  });

  it("uses the --line-strong hard-border token (this codebase's brutalist border token)", () => {
    expect(dossierSource).toMatch(/\.dossier-episode-thumb\s*{[^}]*border:\s*1px solid var\(--line-strong\)/);
  });

  it("never hotlinks youtube.com or ytimg.com — the episode thumbnail src is always the self-hosted local path", () => {
    expect(dossierSource).not.toMatch(/src=.*ytimg\.com/);
    expect(dossierSource).not.toMatch(/src={thumb}[\s\S]{0,80}ytimg/);
    expect(dossierSource).toContain("/media-thumbnails/");
  });

  it("renders a monospace placeholder block (never a broken image) when a thumbnail file is missing", () => {
    expect(dossierSource).toContain("dossier-episode-thumb--placeholder");
    expect(dossierSource).toMatch(/dossier-episode-thumb-placeholder-text[\s\S]*?\{episode\.title\}/);
  });

  it("still forbids an <iframe> or any other platform embed on this panel", () => {
    expect(dossierSource).not.toMatch(/<iframe[\s>]/i);
  });

  it("respects prefers-reduced-motion for the thumbnail hover transition", () => {
    expect(dossierSource).toMatch(/prefers-reduced-motion:\s*reduce[\s\S]*?\.dossier-episode-thumb\s*{\s*transition:\s*none/);
  });

  it("falls back to the honest-empty-state Raw Signal Routing card when no episode data is available", () => {
    expect(dossierSource).toContain("tmmEpisodes.status !== \"ok\" || tmmEpisodes.items.length === 0");
    expect(dossierSource).toContain("Raw Signal Routing");
    expect(dossierSource).toContain("Full editorial archive hosted externally.");
  });

  it("does not fabricate a named series/show title anywhere in the component — episode titles come only from the real feed", () => {
    expect(dossierSource).not.toMatch(/shades of ai/i);
  });

  it("does not touch HERO's photo grid or the FounderLink/TMP panels — no episode/thumbnail markup outside the TMM row's detailKind block", () => {
    // HERO's "photos" detail block and the plain "none" empty-state message
    // must be unchanged: no thumbnail class name leaks into their markup.
    const heroBlockMatch = dossierSource.match(
      /row\.detailKind === "photos"[\s\S]*?<\/div>\s*\)\}/,
    );
    expect(heroBlockMatch).not.toBeNull();
    expect(heroBlockMatch![0]).not.toMatch(/dossier-episode/);
    expect(dossierSource).toContain("No public route exists yet.");
  });

  it("scopes the episode data source to the TMM channel only, never TMP", () => {
    expect(youtubeSignalSource).toContain("getTmmDossierEpisodes");
    expect(youtubeSignalSource).toMatch(
      /channel\.handle === "texasmovementmedia"/,
    );
  });

  it("getTmmDossierEpisodes never throws — reuses the same fallback-on-failure contract as getLatestSignalItems", () => {
    expect(youtubeSignalSource).toMatch(
      /getTmmDossierEpisodes[\s\S]*?return \{ status: "fallback", items: \[\] \}/,
    );
  });

  it("fetch-media-thumbnails.mjs was extended to prefetch dossier episode thumbnails too, not reinvented", () => {
    expect(scriptSource).toContain("getTmmDossierEpisodes");
    expect(scriptSource).toMatch(/main\(\)\.catch/);
  });
});
