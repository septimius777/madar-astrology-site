import rateLimit from "express-rate-limit";

/**
 * Caps contact-form submissions per IP. A public form that forwards to a
 * Telegram bot is a very ordinary spam/abuse target, so this is on by
 * default rather than something to "add later".
 */
export const contactRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "درخواست‌های زیادی ارسال شده. کمی بعد دوباره تلاش کن.",
  },
});
