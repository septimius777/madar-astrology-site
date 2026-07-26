import { validateContactPayload } from "../utils/validators.js";
import { sendTelegramMessage, formatContactMessage, TelegramError } from "../services/telegram.service.js";
import { env } from "../config/env.js";

/**
 * POST /api/contact
 * Request body:  { name, email, message, hp }
 * Success (200): { success: true, message?: string }
 * Failure (4xx/5xx): { success: false, error: string, debug?: string }
 *
 * `debug` is only ever included when NODE_ENV !== "production" — it's the
 * real underlying reason (timeout / network / Telegram API rejection),
 * never shown in prod so end users don't see internals, but always logged
 * server-side either way.
 */
export async function submitContactForm(req, res) {
  const { valid, errors, data } = validateContactPayload(req.body);

  // Honeypot tripped: a bot filled a field real users never see.
  // Pretend success, don't touch Telegram, don't explain why.
  if (data.hp) {
    return res.status(200).json({ success: true });
  }

  if (!valid) {
    return res.status(400).json({ success: false, error: errors[0] });
  }

  try {
    const text = formatContactMessage(data);
    await sendTelegramMessage(text);
    return res
      .status(200)
      .json({ success: true, message: "پیامت با موفقیت ارسال شد." });
  } catch (err) {
    const code = err instanceof TelegramError ? err.code : "UNKNOWN";

    // Always logged, with enough detail to actually debug from — this is
    // the piece that was missing before: previously only `err.message` was
    // logged, and a hung/timed-out request could fail before ever reaching
    // that log line.
    console.error(
      `[contact] Telegram send failed — code=${code}`,
      "\n  message:", err.message,
      err.cause ? `\n  cause: ${err.cause.code || err.cause.message}` : ""
    );

    const userMessage =
      code === "CONFIG"
        ? "سرور هنوز برای ارسال پیام تنظیم نشده. لطفاً بعداً دوباره تلاش کن."
        : code === "TIMEOUT"
        ? "ارتباط با سرویس پیام‌رسان برقرار نشد (تایم‌اوت). لطفاً کمی بعد دوباره تلاش کن."
        : code === "NETWORK"
        ? "ارتباط با سرویس پیام‌رسان برقرار نشد. لطفاً کمی بعد دوباره تلاش کن."
        : "ارسال پیام ناموفق بود. لطفاً بعداً دوباره تلاش کن.";

    return res.status(502).json({
      success: false,
      error: userMessage,
      ...(env.isDev ? { debug: `${code}: ${err.message}` } : {}),
    });
  }
}
