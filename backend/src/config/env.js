import "dotenv/config";

const REQUIRED_FOR_TELEGRAM = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"];

const missing = REQUIRED_FOR_TELEGRAM.filter((key) => !process.env[key]);
if (missing.length) {
  console.warn(
    `[config] Missing env vars: ${missing.join(", ")}. ` +
      `POST /api/contact will respond with an error until these are set in .env`
  );
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: (process.env.NODE_ENV || "development") !== "production",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID || "",
  // Where Telegram Bot API calls go. Defaults to Telegram directly. If
  // that's blocked on your network (e.g. hosted somewhere Telegram is
  // filtered, like Iran), point this at the Cloudflare Worker proxy in
  // /worker instead — see backend/README.md for the 2-minute deploy.
  telegramApiBase: process.env.TELEGRAM_API_BASE || "https://api.telegram.org",
  requestTimeoutMs: Number(process.env.TELEGRAM_TIMEOUT_MS) || 10000,
};
