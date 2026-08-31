// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// This is a fully static content site (platform: "astro-cloudflare" per
// @tmi/constants ecosystem.ts). A purely static `output: "static"` Astro
// build needs NO server adapter to deploy on Cloudflare Pages — Pages serves
// any static `dist/` directory directly; `wrangler.toml`'s
// `pages_build_output_dir` is all that's required.
//
// @astrojs/cloudflare (the SSR/edge-functions adapter) was tried first, per
// the common brief's "platform: astro-cloudflare" note, but it forces
// Cloudflare's Vite plugin + wrangler config resolution even with zero
// server functions, and failed in this sandbox with a reserved-binding-name
// error ("ASSETS" binding name conflicts with a Pages-reserved name) coming
// from wrangler's own config validation — unrelated to anything in this
// site's code. Since nothing here needs SSR, the adapter was dropped rather
// than fought. If edge functions/SSR are ever needed, re-add
// `@astrojs/cloudflare` and revisit.
export default defineConfig({
  site: "https://texasmovement.com",
  output: "static",
  build: {
    format: "directory",
  },
  integrations: [mdx()],
});
