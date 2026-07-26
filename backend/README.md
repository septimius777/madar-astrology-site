# مدار backend

Express API for the "مدار" contact form → forwards submissions to a
Telegram chat via a bot. Built to match the request/response contract
`MedarContactSection.tsx` already expects.

## File structure

```
backend/
├── src/
│   ├── server.js              ← entry point, only file that calls app.listen()
│   ├── app.js                 ← builds/configures the Express app (no listening)
│   ├── config/
│   │   └── env.js             ← loads + validates env vars
│   ├── routes/
│   │   └── contact.routes.js  ← POST /api/contact
│   ├── controllers/
│   │   └── contact.controller.js
│   ├── services/
│   │   └── telegram.service.js
│   ├── middleware/
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   └── utils/
│       └── validators.js
├── .env.example
├── .gitignore
└── package.json
```

`server.js` and `app.js` are deliberately separate: `app.js` just builds
and returns the configured Express app; `server.js` is the only place that
actually binds a port. When you add more features later, new pieces follow
the same pattern:

- New route group → add a file in `routes/`, a matching one in
  `controllers/` (and `services/` if it talks to something external), then
  one line in `app.js`: `app.use("/api/whatever", whateverRouter)`.
- New third-party integration (email, DB, etc.) → a new file in `services/`.
- New shared logic → `utils/`.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Then open `.env` and fill in:
- `TELEGRAM_BOT_TOKEN` — from [@BotFather](https://t.me/BotFather)
- `TELEGRAM_CHAT_ID` — the chat you want messages delivered to (DM
  [@userinfobot](https://t.me/userinfobot) to get your own numeric id, or
  add the bot to a group/channel and use that chat's id)
- `FRONTEND_ORIGIN` — wherever your Vite dev server / production frontend
  actually runs (defaults to `http://localhost:5173`)

Run it:

```bash
npm run dev     # restarts on file changes (uses Node's built-in --watch)
# or
npm start       # plain run, no auto-restart
```

You should see `مدار backend listening on http://localhost:3000`. If the
Telegram env vars are missing, it'll also print a warning at boot — the
server still runs, but `/api/contact` will return an error until they're set.

## Wiring up the frontend

`MedarContactSection.tsx` posts to `/api/contact` by default (relative
path). In dev, since the frontend (`:5173`) and backend (`:3000`) are
different origins, pick **one** of these:

**Option A — CORS (already set up):** the backend allows `FRONTEND_ORIGIN`
via `cors()`, and you set `VITE_CONTACT_API_URL=http://localhost:3000/api/contact`
in the frontend's `.env` so it hits the backend directly.

**Option B — Vite dev proxy:** leave the frontend's endpoint as the default
relative `/api/contact`, and add this to `vite.config.ts` instead:

```ts
export default defineConfig({
  // ...
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

Either works; Option B means CORS is a non-issue even in dev, and if you
deploy both behind the same reverse proxy in production you can drop CORS
entirely.

## Testing it without the frontend

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"سارا","email":"sara@example.com","message":"سلام","hp":""}'
```

Expect `{"success":true,"message":"..."}` and a message in your Telegram
chat. Try omitting a field, or setting `"hp":"anything"`, to see the
validation and honeypot paths respond correctly.

## Request/response contract (recap)

**POST `/api/contact`**

Request body:
```json
{ "name": "string", "email": "string", "message": "string", "hp": "string" }
```

Success — HTTP 200:
```json
{ "success": true, "message": "optional string" }
```

Failure — HTTP 400 (bad input) / 429 (rate limited) / 502 (Telegram call
failed) / 500 (unexpected):
```json
{ "success": false, "error": "string" }
```

## Troubleshooting: "ارسال پیام با خطا مواجه شد" / no error in logs

If the form always fails with that generic message and nothing useful
shows up in your server console, the most common cause is **the server
can't reach `api.telegram.org` at the network level** — Telegram is
blocked in several countries (Iran being the most common case). A plain
`fetch` to a blocked host just hangs or gets reset, which used to get
swallowed silently.

**Step 1 — confirm it with the diagnostic endpoint:**
```bash
curl http://localhost:3000/health/telegram
```
If this comes back with `"code":"TIMEOUT"` or `"code":"NETWORK"`, it's
filtering — go to Step 2. Any other `code` (`CONFIG`, `API`) is a
different problem (bad token, bot not in the chat, etc), unrelated to
network filtering.

**Step 2 — deploy the included Cloudflare Worker proxy** (free, ~2 minutes,
no CLI needed):

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → sign up/log
   in (free account is fine).
2. In the sidebar: **Workers & Pages** → **Create** → **Create Worker**.
3. Give it any name (e.g. `medar-telegram-proxy`) → **Deploy** (it'll
   deploy a hello-world template first, that's fine).
4. Click **Edit code**. Delete everything in the editor and paste the
   contents of `worker/telegram-proxy.js` from this project.
5. Click **Deploy** (top right).
6. Copy the Worker's URL shown at the top — looks like
   `https://medar-telegram-proxy.<your-subdomain>.workers.dev`.
7. In this backend's `.env`, set:
   ```
   TELEGRAM_API_BASE=https://medar-telegram-proxy.<your-subdomain>.workers.dev
   ```
8. Restart the backend (`npm run dev` / `npm start`), then re-run
   `curl http://localhost:3000/health/telegram` — it should now return
   `"ok": true` with your bot's username.

No other code changes needed — `telegram.service.js` already builds every
Telegram API call from `TELEGRAM_API_BASE`, so once that env var points at
the Worker, both `/health/telegram` and the actual contact form route
through it automatically.

(Prefer the CLI instead of the dashboard? `worker/wrangler.toml` is
included — `npm install -g wrangler && wrangler login && wrangler deploy`
from inside `worker/`.)

In development (`NODE_ENV=development`, the default), failed responses
also include a `debug` field with the real error code/message so you
don't have to dig through logs while testing locally. This is
automatically omitted once `NODE_ENV=production`.

## Notes / things to harden before going live

- **Rate limiting** is on by default (5 requests / 10 min / IP) in
  `middleware/rateLimiter.js` — tune to taste.
- **Honeypot**: a non-empty `hp` field returns `success: true` without
  touching Telegram, matching what the frontend already sends.
- Consider putting this behind HTTPS (via a reverse proxy like nginx/Caddy,
  or your hosting provider) before deploying — right now it's plain HTTP,
  fine for local dev only.
- `express.json({ limit: "10kb" })` caps request body size as basic abuse
  protection; raise it only if you have a reason to.
