#!/usr/bin/env node
/**
 * check-public-output.mjs — repo-local guard rail, runs on `dist/` AFTER
 * `astro build` (wired as the "postbuild" npm script). Zero dependencies,
 * plain Node, no TypeScript loader required — it parses the vendored
 * @tmi/constants source and this repo's src/lib/site.ts with regexes
 * instead of importing them, so it works the same way in CI as it does
 * locally with no build step of its own.
 *
 * Fails (process.exit(1)) if, anywhere under dist/:
 *   1. The literal string "TBD" or "__TBD__" appears in any .html/.xml/.json/.txt file.
 *   2. Any <a href="mailto:...">, or form `action="mailto:..."`, references
 *      an address not in VERIFIED_INBOXES.
 *   3. sitemap*.xml or any <link rel="canonical"> references a property
 *      whose PROPERTIES[key].status !== "live".
 *   4. Any href to a *.texasmovement.com (or the apex) property whose
 *      status !== "live" appears anywhere in the output (nav/footer and
 *      the lane directory both funnel through this — see src/lib/site.ts
 *      and DivisionCard.astro, which render non-live properties as plain
 *      text specifically so this can never trip).
 *   5. A build made with PUBLIC_PREVIEW=true is missing the noindex robots
 *      meta tag on any HTML page.
 *   6. Any "linkedin.com" URL appears anywhere in dist/, in any form (link,
 *      JSON-LD, plain text) — including the founder's personal profile, not
 *      just the two conflicting/unconfirmed company-page URLs
 *      ("linkedin.com/company/texas-movement-consulting" and
 *      "linkedin.com/company/texasmovement"). No LinkedIn URL is confirmed
 *      for public output yet — see HELD_PENDING_CONFIRMATION /
 *      isHeldPendingConfirmation() in src/lib/site.ts for the full rationale
 *      and the one-line un-hold procedure once Alexander provides the real
 *      canonical URL.
 *   7. (Mark 18) A fetch() call whose first argument is a string literal
 *      pointing at an absolute external URL — the shape a live contact-form
 *      submission endpoint would take if PUBLIC_CONTACT_ENDPOINT were ever
 *      set without a corresponding, deliberate exception added here. Mirrors
 *      the equivalent EXTERNAL_FETCH_PATTERN check on the sibling
 *      alexandermathai.com repo's scripts/postbuild-guard.mjs. See
 *      docs/mark-18-contact-intake-implementation.md.
 *
 *   node scripts/check-public-output.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = join(new URL(".", import.meta.url).pathname, "..");
const DIST = join(ROOT, "dist");
const CONSTANTS_ECOSYSTEM = join(ROOT, "packages", "constants", "src", "ecosystem.ts");
const SITE_LIB = join(ROOT, "src", "lib", "site.ts");
const TBD_SENTINEL = "__TBD__";

// A fetch() call whose first argument is a string literal pointing at an
// absolute external URL — see check 7 above.
const EXTERNAL_FETCH_PATTERN = /fetch\s*\(\s*["'`]https?:\/\//i;

const errors = [];
const err = (m) => errors.push(m);

if (!existsSync(DIST)) {
  console.error(`dist/ not found at ${DIST} — run \`astro build\` first.`);
  process.exit(1);
}

/* ---------- resolve PUBLIC_PREVIEW the same way Layout.astro does ------ */
function loadDotEnv() {
  const envPath = join(ROOT, ".env");
  if (!existsSync(envPath)) return {};
  const out = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return out;
}
const dotenv = loadDotEnv();
// Mark 33 — matches src/layouts/Layout.astro's fallback-direction reversal:
// only the literal string "true" means preview now; unset/anything else
// means production. See that file's Mark 33 comment for the full record.
const publicPreviewRaw = process.env.PUBLIC_PREVIEW ?? dotenv.PUBLIC_PREVIEW ?? "false";
const isPreview = publicPreviewRaw === "true";

/* ---------- parse ecosystem.ts for {domain -> status} ------------------ */
const eco = readFileSync(CONSTANTS_ECOSYSTEM, "utf8");
const APEX = "texasmovement.com";
const domainStatus = new Map(); // domain -> status
const blocks = eco.split(/\n\s{2}[a-z]+:\s*\{/).slice(1);
for (const b of blocks) {
  const key = b.match(/key:\s*"([a-z]+)"/)?.[1];
  const status = b.match(/status:\s*"([a-z]+)"/)?.[1];
  if (!key || !status) continue;
  let domain;
  if (/domain:\s*APEX/.test(b)) {
    domain = APEX;
  } else {
    const sub = b.match(/domain:\s*sub\("([a-z]+)"\)/)?.[1];
    domain = sub ? `${sub}.${APEX}` : b.match(/domain:\s*"([^"]+)"/)?.[1];
  }
  if (domain) domainStatus.set(domain, status);
}
if (domainStatus.size === 0) {
  console.error("Could not parse any property domains out of ecosystem.ts — aborting (fail closed).");
  process.exit(1);
}

/* ---------- parse site.ts for VERIFIED_INBOXES -------------------------- */
const siteLib = readFileSync(SITE_LIB, "utf8");
const verifiedBlockMatch = siteLib.match(/VERIFIED_INBOXES[^=]*=\s*\[([\s\S]*?)\];/);
const verifiedInboxes = new Set();
if (verifiedBlockMatch) {
  for (const line of verifiedBlockMatch[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//")) continue;
    const m = trimmed.match(/"([^"]+)"/);
    if (m) verifiedInboxes.add(m[1]);
  }
}

/* ---------- walk dist/ --------------------------------------------------- */
// .js added in Mark 18 so check 7 (external fetch()) can actually scan
// built client-side bundles, not just server-rendered HTML/XML/JSON/TXT.
const TEXT_EXT = new Set([".html", ".xml", ".json", ".txt", ".js"]);
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const files = walk(DIST);
const textFiles = files.filter((f) => TEXT_EXT.has(extname(f)));

for (const file of textFiles) {
  const rel = file.slice(DIST.length + 1);
  const content = readFileSync(file, "utf8");

  // 1. TBD sentinel
  if (content.includes(TBD_SENTINEL) || /\bTBD\b/.test(content)) {
    err(`${rel}: contains literal "TBD" / "__TBD__" in public output`);
  }

  // 2. mailto hrefs / form actions not in VERIFIED_INBOXES
  const mailtoMatches = [
    ...content.matchAll(/(?:href|action)\s*=\s*"mailto:([^"?]+)(?:\?[^"]*)?"/gi),
  ];
  for (const m of mailtoMatches) {
    const addr = m[1].trim();
    if (!verifiedInboxes.has(addr)) {
      err(`${rel}: mailto/form action to unverified inbox "${addr}" (not in VERIFIED_INBOXES)`);
    }
  }

  // 3. sitemap / canonical referencing a non-live property
  const isSitemap = /sitemap.*\.xml$/i.test(rel);
  if (isSitemap) {
    for (const m of content.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      checkUrlIsLive(m[1], rel, "sitemap <loc>");
    }
  }
  for (const m of content.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)) {
    checkUrlIsLive(m[1], rel, "canonical link");
  }

  // 4. any href to a non-live property anywhere in the output
  for (const m of content.matchAll(/href="(https:\/\/[^"]+)"/g)) {
    checkUrlIsLive(m[1], rel, "href");
  }

  // 5. noindex marker required on preview builds
  if (isPreview && extname(file) === ".html") {
    const hasNoindex = /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/.test(content);
    if (!hasNoindex) {
      err(`${rel}: PUBLIC_PREVIEW=true but page is missing the noindex robots meta tag`);
    }
  }

  // 6. no LinkedIn URL of any kind is confirmed for public output yet
  if (/linkedin\.com/i.test(content)) {
    err(`${rel}: contains a "linkedin.com" URL — no LinkedIn URL is confirmed for public output yet, see isHeldPendingConfirmation() in src/lib/site.ts`);
  }

  // 7. no fetch() call to an external URL (Mark 18 — see header comment)
  if (EXTERNAL_FETCH_PATTERN.test(content)) {
    err(`${rel}: contains a fetch() call targeting an external URL (unconfirmed contact-form endpoint)`);
  }
}

function checkUrlIsLive(rawUrl, rel, context) {
  let host;
  try {
    host = new URL(rawUrl).host;
  } catch {
    return;
  }
  if (!domainStatus.has(host)) return; // not one of ours (e.g. fonts.googleapis.com, youtube.com) — not in scope
  const status = domainStatus.get(host);
  if (status !== "live") {
    err(`${rel}: ${context} references "${rawUrl}" — property status is "${status}", not "live"`);
  }
}

/* ---------- report -------------------------------------------------------- */
const line = "-".repeat(64);
console.log(`\ncheck-public-output\n${line}`);
console.log(`dist files scanned: ${textFiles.length} (of ${files.length} total)`);
console.log(`PUBLIC_PREVIEW resolved to: ${isPreview} (raw: "${publicPreviewRaw}")`);
console.log(`known property domains: ${[...domainStatus.keys()].join(", ")}`);
console.log(`verified inboxes: ${verifiedInboxes.size === 0 ? "(none)" : [...verifiedInboxes].join(", ")}`);
console.log(`\nErrors: ${errors.length}`);
errors.forEach((e) => console.log(`  X ${e}`));
console.log(line);

if (errors.length) {
  console.log("FAILED\n");
  process.exit(1);
}
console.log("PASS\n");
