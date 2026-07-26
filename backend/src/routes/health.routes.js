import { Router } from "express";
import { checkTelegramConnectivity, TelegramError } from "../services/telegram.service.js";
import { env } from "../config/env.js";

const router = Router();

/**
 * GET /health/telegram — checks whether THIS server can currently reach
 * Telegram (calls the cheap `getMe` endpoint, sends no message). Use this
 * to debug connectivity/proxy issues directly, without going through the
 * contact form each time.
 *
 * Only exposes non-secret diagnostic info (never the bot token). Consider
 * removing or protecting this route if it's exposed publicly in production.
 */
router.get("/telegram", async (req, res) => {
  try {
    const result = await checkTelegramConnectivity();
    return res.json({ ok: true, ...result });
  } catch (err) {
    const code = err instanceof TelegramError ? err.code : "UNKNOWN";
    console.error(`[health/telegram] failed — code=${code}`, err.message);
    return res.status(502).json({
      ok: false,
      code,
      error: err.message,
      telegramApiBase: env.telegramApiBase,
    });
  }
});

export default router;
