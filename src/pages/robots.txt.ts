import type { APIRoute } from "astro";
import { PROPERTIES } from "@tmi/constants";

export const prerender = true;

// PUBLIC_PREVIEW convention (see docs/LAUNCH_BLOCKERS.md). Matches the
// noindex meta tag every page emits via src/layouts/Layout.astro — see
// that file's Mark 33 comment for the fallback-direction reversal.
export const GET: APIRoute = () => {
  const isPreview = import.meta.env.PUBLIC_PREVIEW === "true";

  const body = isPreview
    ? ["User-agent: *", "Disallow: /", ""].join("\n")
    : ["User-agent: *", "Allow: /", "", `Sitemap: ${PROPERTIES.tmi.url}/sitemap.xml`, ""].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
