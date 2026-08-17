import type { APIRoute } from "astro";
import { PROPERTIES } from "@tmi/constants";

export const prerender = true;

// PUBLIC_PREVIEW convention (see docs/LAUNCH_BLOCKERS.md): this build ships
// with PUBLIC_PREVIEW=true, so robots.txt disallows everything and doesn't
// reference a sitemap — matching the noindex meta tag every page emits via
// src/layouts/Layout.astro. Flip PUBLIC_PREVIEW=false only for a real
// production deploy.
export const GET: APIRoute = () => {
  const isPreview = import.meta.env.PUBLIC_PREVIEW !== "false";

  const body = isPreview
    ? ["User-agent: *", "Disallow: /", ""].join("\n")
    : ["User-agent: *", "Allow: /", "", `Sitemap: ${PROPERTIES.tmi.url}/sitemap.xml`, ""].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
