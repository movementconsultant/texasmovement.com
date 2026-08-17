#!/usr/bin/env node
/**
 * tests/a11y.mjs — headless axe-core accessibility scan against the built
 * `dist/` output. Requires `npm run build` to have been run first.
 *
 * Uses the pre-installed Chromium at PLAYWRIGHT_BROWSERS_PATH
 * (/opt/pw-browsers) — does NOT run `playwright install`.
 *
 *   node tests/a11y.mjs
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const ROOT = join(new URL(".", import.meta.url).pathname, "..");
const DIST = join(ROOT, "dist");
const PORT = 4321;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent((req.url ?? "/").split("?")[0]);
    if (path.endsWith("/")) path += "index.html";
    let fsPath = join(DIST, path);
    try {
      const s = await stat(fsPath);
      if (s.isDirectory()) fsPath = join(fsPath, "index.html");
    } catch {
      // try as a directory-style route (Astro "directory" build format)
      fsPath = join(DIST, path, "index.html");
    }
    const body = await readFile(fsPath);
    res.writeHead(200, { "Content-Type": MIME[extname(fsPath)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

const ROUTES = [
  "/",
  "/lanes",
  "/about",
  "/ecosystem",
  "/contact",
  "/consulting",
  "/media",
  "/performance",
  "/distribution",
  "/hero",
  "/partners",
  "/privacy",
  "/terms",
  "/accessibility",
  "/verticals/texas-movement-media",
];

async function main() {
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`static server up on http://localhost:${PORT}`);

  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium",
    headless: true,
  });

  let totalViolations = 0;
  const results = [];

  try {
    for (const route of ROUTES) {
      const context = await browser.newContext();
      // This sandbox has no working route to fonts.googleapis.com /
      // fonts.gstatic.com, and Chromium retries those font requests
      // indefinitely, which hangs `networkidle`. Font choice isn't part of
      // what axe-core checks, so block them outright and load with a plain
      // `load` wait instead.
      await context.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "load", timeout: 15000 });
      const axe = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);
      const result = await axe.analyze();
      results.push({ route, violations: result.violations });
      totalViolations += result.violations.length;
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  const line = "-".repeat(64);
  console.log(`\naxe-core a11y scan\n${line}`);
  for (const { route, violations } of results) {
    console.log(`\n${route} — ${violations.length} violation(s)`);
    for (const v of violations) {
      console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`);
      for (const node of v.nodes.slice(0, 3)) {
        console.log(`      ${node.target.join(" ")}`);
      }
    }
  }
  console.log(`\n${line}`);
  console.log(`Total violations across ${ROUTES.length} routes: ${totalViolations}`);
  console.log(line);

  if (totalViolations > 0) {
    console.log("FAILED\n");
    process.exit(1);
  }
  console.log("PASS\n");
}

main().catch((e) => {
  console.error(e);
  server.close();
  process.exit(1);
});
