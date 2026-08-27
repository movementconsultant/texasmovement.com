/**
 * Stripe Checkout Worker — shared by texasmovement.com and
 * alexandermathai.com's /consulting pages (Mark 29).
 *
 * Standalone Cloudflare Worker, NOT part of either Astro site's build. This
 * file is written source code only; it has not been deployed by this
 * session (no Cloudflare account/dashboard access exists here, and no real
 * Stripe account/keys exist either). See ../README.md for deployment steps.
 *
 * ONE deployment of this Worker serves both sites — per the owner's
 * explicit Mark 29 decision, Texas Movement Consulting is one practice with
 * one set of pricing tiers, not two separate commercial offerings under
 * separate Stripe accounts. Each site's own PUBLIC_STRIPE_CHECKOUT_ENDPOINT
 * (see src/components/PurchaseButton.astro) points at this same Worker's
 * URL; ALLOWED_ORIGINS below is a comma-separated list, not a single origin
 * like the sibling contact-intake Worker's ALLOWED_ORIGIN, specifically
 * because of this cross-site sharing.
 *
 * Disclosed gap, stated plainly: the real Stripe Product/Price IDs for the
 * three tiers were never provided to this build (the task's SKU/pricing
 * list arrived as garbled digits, not actual data) — and a displayed price
 * *range* like "$1,500–$3,000" isn't itself a valid fixed Stripe Checkout
 * price. So this Worker does not hardcode any dollar amount or Price ID.
 * It looks up a Price ID per tier from `env` (STRIPE_PRICE_DIAGNOSTIC /
 * STRIPE_PRICE_SYSTEMS_BUILD / STRIPE_PRICE_RETAINER) — the owner creates
 * the real Products/Prices in their own Stripe dashboard first (at
 * whatever exact amount within each published range they choose for that
 * SKU), then sets these three env vars to the resulting Price IDs. Until
 * all three are set, POST / for that tier returns a clean JSON error
 * (never a 500, never a hang) that the frontend already treats as
 * "temporarily unavailable — use the email link."
 *
 * Endpoints:
 *   POST /          { tier: "diagnostic" | "systems-build" | "retainer" }
 *                    -> { url: <Stripe Checkout Session URL> } on success
 *   POST /webhook    Stripe webhook receiver (checkout.session.completed
 *                    triggers a notification email via Resend, reusing the
 *                    exact same pattern as workers/contact-intake).
 */

export interface Env {
  /** Stripe secret key. Set via `wrangler secret put STRIPE_SECRET_KEY` — never in wrangler.toml. */
  STRIPE_SECRET_KEY: string;
  /** Stripe webhook signing secret, from the Stripe Dashboard's webhook config. Set via `wrangler secret put STRIPE_WEBHOOK_SECRET`. */
  STRIPE_WEBHOOK_SECRET: string;
  /** Resend API key, reused for the payment-confirmation notification email. Set via `wrangler secret put RESEND_API_KEY`. */
  RESEND_API_KEY: string;
  /** Destination inbox for a payment-confirmation notification, e.g. "movementconsultant@gmail.com". */
  NOTIFY_EMAIL: string;
  /** Verified Resend sending address for that notification. */
  FROM_EMAIL: string;
  /** Comma-separated list of exact origins allowed to call this Worker, e.g. "https://texasmovement.com,https://alexandermathai.com". */
  ALLOWED_ORIGINS: string;
  /** Stripe Price ID for the Diagnostic tier — set only after creating the real Product/Price in the Stripe dashboard. */
  STRIPE_PRICE_DIAGNOSTIC?: string;
  /** Stripe Price ID for the Systems Build tier. */
  STRIPE_PRICE_SYSTEMS_BUILD?: string;
  /** Stripe Price ID for the Operator Retainer tier (a recurring/subscription Price). */
  STRIPE_PRICE_RETAINER?: string;
}

type TierId = "diagnostic" | "systems-build" | "retainer";

const TIER_CONFIG: Record<TierId, { envKey: keyof Env; mode: "payment" | "subscription" }> = {
  diagnostic: { envKey: "STRIPE_PRICE_DIAGNOSTIC", mode: "payment" },
  "systems-build": { envKey: "STRIPE_PRICE_SYSTEMS_BUILD", mode: "payment" },
  retainer: { envKey: "STRIPE_PRICE_RETAINER", mode: "subscription" },
};

function allowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean);
}

function corsHeaders(origin: string, env: Env): HeadersInit {
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
  if (allowedOrigins(env).includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function jsonResponse(body: Record<string, unknown>, status: number, origin: string, env: Env): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin, env) },
  });
}

function isTierId(value: unknown): value is TierId {
  return value === "diagnostic" || value === "systems-build" || value === "retainer";
}

/** Encodes a flat params object as application/x-www-form-urlencoded — the
 *  body shape Stripe's REST API expects (not JSON) for creating resources. */
function toFormBody(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

async function createCheckoutSession(
  env: Env,
  tier: TierId,
  requestOrigin: string,
): Promise<{ url: string } | { error: string }> {
  const config = TIER_CONFIG[tier];
  const priceId = env[config.envKey] as string | undefined;
  if (!priceId) {
    console.warn(`[stripe-checkout] no Price ID configured for tier "${tier}" (${config.envKey}) — the owner hasn't created this Product in Stripe yet.`);
    return { error: "This tier isn't available for checkout yet — please use the email link below." };
  }

  const successUrl = `${requestOrigin}/consulting?checkout=success`;
  const cancelUrl = `${requestOrigin}/consulting?checkout=cancelled`;

  const body = toFormBody({
    mode: config.mode,
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const result = (await response.json().catch(() => ({}))) as { url?: string; error?: { message?: string } };
    if (!response.ok || !result.url) {
      console.error("[stripe-checkout] Stripe API error:", result.error?.message ?? response.status);
      return { error: "Checkout is temporarily unavailable — please use the email link below." };
    }
    return { url: result.url };
  } catch (err) {
    console.error("[stripe-checkout] request to Stripe failed:", err);
    return { error: "Checkout is temporarily unavailable — please use the email link below." };
  }
}

const WEBHOOK_TIMESTAMP_TOLERANCE_SECONDS = 300;

/** Verifies a Stripe webhook signature per Stripe's documented HMAC-SHA256
 *  scheme (signed payload = "{timestamp}.{rawBody}"), using Web Crypto only
 *  — no Stripe SDK dependency, matching this repo's zero-dependency Worker
 *  convention. Rejects stale timestamps (replay protection). */
async function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): Promise<boolean> {
  if (!signatureHeader) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((kv) => {
      const [key, value] = kv.split("=");
      return [key, value];
    }),
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const timestampSeconds = Number.parseInt(timestamp, 10);
  if (!Number.isFinite(timestampSeconds)) return false;
  const ageSeconds = Math.abs(Date.now() / 1000 - timestampSeconds);
  if (ageSeconds > WEBHOOK_TIMESTAMP_TOLERANCE_SECONDS) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${rawBody}`));
  const computedHex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return computedHex === signature;
}

async function sendConfirmationEmail(env: Env, sessionSummary: string): Promise<void> {
  const html = `
    <h2>Stripe checkout completed</h2>
    <p>${sessionSummary}</p>
  `.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: env.NOTIFY_EMAIL,
        subject: "Consulting checkout completed",
        html,
      }),
    });
    if (!response.ok) {
      console.error("[stripe-checkout] confirmation email delivery failed:", response.status);
    }
  } catch (err) {
    console.error("[stripe-checkout] confirmation email send threw:", err);
  }
}

async function handleWebhook(request: Request, env: Env): Promise<Response> {
  const rawBody = await request.text();
  const signature = request.headers.get("Stripe-Signature");
  const valid = await verifyStripeSignature(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid signature." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let event: { type?: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data?.object ?? {};
    const summary = `Session ${session.id ?? "(unknown id)"} — amount ${session.amount_total ?? "?"} ${session.currency ?? ""}, customer email ${session.customer_details && (session.customer_details as Record<string, unknown>).email || "(not provided)"}.`;
    await sendConfirmationEmail(env, summary);
  }

  // Always 200 to a verified webhook — Stripe retries on non-2xx, and
  // there's nothing else actionable here beyond the notification above.
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") ?? "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    if (url.pathname === "/webhook") {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), {
          status: 405,
          headers: { "Content-Type": "application/json" },
        });
      }
      return handleWebhook(request, env);
    }

    if (request.method !== "POST") {
      return jsonResponse({ ok: false, error: "Method not allowed." }, 405, origin, env);
    }

    if (!allowedOrigins(env).includes(origin)) {
      return jsonResponse({ ok: false, error: "Origin not allowed." }, 403, origin, env);
    }

    if (!env.STRIPE_SECRET_KEY) {
      console.warn("[stripe-checkout] STRIPE_SECRET_KEY not configured — every checkout request will fail closed.");
      return jsonResponse(
        { ok: false, error: "Checkout is temporarily unavailable — please use the email link below." },
        503,
        origin,
        env,
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON body." }, 400, origin, env);
    }

    const tier = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>).tier : undefined;
    if (!isTierId(tier)) {
      return jsonResponse({ ok: false, error: "Unknown tier." }, 400, origin, env);
    }

    const result = await createCheckoutSession(env, tier, origin);
    if ("error" in result) {
      return jsonResponse({ ok: false, error: result.error }, 502, origin, env);
    }
    return jsonResponse({ ok: true, url: result.url }, 200, origin, env);
  },
};
