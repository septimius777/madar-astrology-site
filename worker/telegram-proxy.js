/**
 * Cloudflare Worker: transparent proxy in front of Telegram's Bot API.
 *
 * Why this exists: api.telegram.org is network-filtered in some countries
 * (Iran being the relevant one here). Cloudflare's edge network isn't, so
 * this Worker sits in front of it — your backend calls THIS Worker's URL
 * instead of api.telegram.org directly, and the Worker forwards the
 * request (path, method, body, everything) straight through to Telegram
 * and streams the response back untouched.
 *
 * Deploy this once (free tier, takes ~2 minutes via the dashboard — see
 * the main README), then in your backend's .env set:
 *
 *   TELEGRAM_API_BASE=https://<your-worker-name>.<your-subdomain>.workers.dev
 *
 * That's the only backend change needed — src/services/telegram.service.js
 * already builds its URLs from TELEGRAM_API_BASE, so no code change there.
 */
export default {
  async fetch(request) {
    const incoming = new URL(request.url);

    // Only ever forward to Telegram — this Worker is not a general proxy.
    const target = new URL(incoming.pathname + incoming.search, "https://api.telegram.org");

    const forwarded = new Request(target, {
      method: request.method,
      headers: request.headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    });

    try {
      const response = await fetch(forwarded);
      // Return Telegram's response as-is (status, body, content-type).
      return new Response(response.body, {
        status: response.status,
        headers: response.headers,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ ok: false, description: `Worker could not reach Telegram: ${err.message}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
