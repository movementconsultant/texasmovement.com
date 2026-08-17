import type { APIRoute } from "astro";
import { canonical } from "@/lib/site";

export const prerender = true;

// This site's own indexable pages. Legal stub pages ARE included — they're
// real, reachable pages with honest "content pending" language, not broken
// routes, so there's no reason to hide them from a production sitemap. The
// Mark 4 hub routes (/about, /ecosystem, /consulting, /media, /performance,
// /distribution, /hero, /partners) follow the same rule: each is a real,
// reachable page with restrained "Building"/"external, unaudited" language,
// not a broken or misleading route, so they're included here too — subject
// to the same PUBLIC_PREVIEW gating as every other route below.
const ROUTES = [
  "/",
  "/lanes",
  "/about",
  "/ecosystem",
  "/consulting",
  "/media",
  "/performance",
  "/distribution",
  "/hero",
  "/partners",
  "/privacy",
  "/terms",
  "/accessibility",
];

// PUBLIC_PREVIEW convention: this build ships with PUBLIC_PREVIEW=true, so
// the sitemap is generated with ZERO indexable URLs (an empty <urlset>)
// rather than omitted outright — robots.txt also disallows everything, so
// nothing here is fetched by a well-behaved crawler anyway, but this keeps
// the file itself from ever advertising production URLs while noindex.
export const GET: APIRoute = () => {
  const isPreview = import.meta.env.PUBLIC_PREVIEW !== "false";
  const urls = isPreview ? [] : ROUTES.map((path) => canonical("tmi", path));

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((u) => `  <url><loc>${u}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
