// src/lib/telemetry/fetchWithTimeout.ts
//
// Build-time-only network helper, originally written for the "Latest
// Signal" YouTube rail and broadened in Mark 28 to also serve
// src/lib/commerce/heroProducts.ts's HERO product-feed fetch — both are
// owner-authorized, build-time-only, source-derived data fetches with the
// identical never-throw/graceful-fallback contract, so this one helper is
// shared rather than duplicated. Never used client-side — every call site
// is Astro frontmatter or a prebuild script, which execute only during
// `astro build` / `astro dev` / the npm `prebuild` step, never in the
// browser. See docs/mark-13-latest-signal-implementation.md for the
// YouTube governance context (owner-authorized build-time fetch, Mark
// 13/14).
//
// Design constraint, matching alexandermathai.com's telemetry rails: this
// function must NEVER throw and must NEVER let a slow/unreachable source
// hang or fail the build. Every failure mode (network error, timeout,
// non-2xx status) resolves to `null` — the caller degrades to a static
// fallback. This is gate F5's "build reliability, cache, timeout, and
// fallback proof" (docs/mark-12-external-feed-feasibility-and-governance.md)
// made concrete in code.

const DEFAULT_TIMEOUT_MS = 8000;

export interface SafeFetchResult {
  text: string;
  status: number;
}

export async function safeFetch(
  url: string,
  init: { timeoutMs?: number; headers?: Record<string, string> } = {},
): Promise<SafeFetchResult | null> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers = {} } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "texasmovement.com-build (+https://texasmovement.com)",
        ...headers,
      },
    });
    if (!response.ok) {
      console.warn(`[telemetry] ${url} responded ${response.status} — falling back.`);
      return null;
    }
    const text = await response.text();
    return { text, status: response.status };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[telemetry] ${url} fetch failed (${reason}) — falling back.`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}
