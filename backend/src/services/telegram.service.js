import { env } from "../config/env.js";

/** Escapes the few characters that matter for Telegram's HTML parse mode. */
function escapeHtml(str) {
  return str.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

/** Builds the Telegram message text from a validated contact payload. */
export function formatContactMessage({ name, email, message }) {
  return [
    "📬 <b>پیام جدید از مدار</b>",
    "",
    `<b>نام:</b> ${escapeHtml(name)}`,
    `<b>ایمیل:</b> ${escapeHtml(email)}`,
    "",
    "<b>پیام:</b>",
    escapeHtml(message),
  ].join("\n");
}

/**
 * Distinguishes *why* the Telegram call failed so the controller (and your
 * logs) can tell "we're not configured" apart from "network can't reach
 * Telegram" apart from "Telegram itself rejected the message". `code` is
 * meant to be machine-checked; `message` is for logs/dev-mode responses,
 * never shown to end users as-is.
 */
export class TelegramError extends Error {
  constructor(code, message, cause) {
    super(message);
    this.name = "TelegramError";
    this.code = code; // "CONFIG" | "TIMEOUT" | "NETWORK" | "API"
    this.cause = cause;
  }
}

/**
 * All requests go through `env.telegramApiBase`. By default that's
 * https://api.telegram.org directly. If THAT'S blocked on your network
 * (e.g. server hosted somewhere Telegram is filtered, like Iran), set
 * TELEGRAM_API_BASE in .env to the URL of the Cloudflare Worker proxy in
 * /worker (see backend/README.md) — everything else here is unchanged,
 * since the Worker is a drop-in stand-in for api.telegram.org.
 */
export async function sendTelegramMessage(text) {
  if (!env.telegramBotToken || !env.telegramChatId) {
    throw new TelegramError(
      "CONFIG",
      "Telegram bot token or chat id is not configured."
    );
  }

  const url = `${env.telegramApiBase}/bot${env.telegramBotToken}/sendMessage`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), env.requestTimeoutMs);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.telegramChatId,
        text,
        parse_mode: "HTML",
      }),
      signal: controller.signal,
    });

    let data;
    try {
      data = await res.json();
    } catch (parseErr) {
      throw new TelegramError(
        "API",
        `Telegram returned a non-JSON response (HTTP ${res.status}).`,
        parseErr
      );
    }

    if (!data.ok) {
      // Reachable and responded — it just rejected the request (bad
      // token, bot not in the chat, wrong chat_id, etc).
      throw new TelegramError(
        "API",
        data.description || `Telegram API rejected the request (HTTP ${res.status}).`
      );
    }

    return data;
  } catch (err) {
    if (err instanceof TelegramError) throw err;

    if (err.name === "AbortError") {
      throw new TelegramError(
        "TIMEOUT",
        `Request to ${env.telegramApiBase} timed out after ${env.requestTimeoutMs}ms. ` +
          "If this server is hosted somewhere Telegram is network-filtered (e.g. Iran), " +
          "set TELEGRAM_API_BASE to your Cloudflare Worker proxy URL — see backend/README.md.",
        err
      );
    }

    // DNS failures, connection refused/reset, TLS errors, etc.
    throw new TelegramError(
      "NETWORK",
      `Could not reach ${env.telegramApiBase} (${err.code || err.message}). ` +
        "If this server is hosted somewhere Telegram is network-filtered (e.g. Iran), " +
        "set TELEGRAM_API_BASE to your Cloudflare Worker proxy URL — see backend/README.md.",
      err
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Lightweight connectivity check — calls Telegram's `getMe` (cheap, no
 * message sent) so you can verify the token + network path (direct or via
 * your Worker) work without submitting the whole contact form. Used by
 * GET /health/telegram.
 */
export async function checkTelegramConnectivity() {
  if (!env.telegramBotToken) {
    throw new TelegramError("CONFIG", "TELEGRAM_BOT_TOKEN is not configured.");
  }

  const url = `${env.telegramApiBase}/bot${env.telegramBotToken}/getMe`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), env.requestTimeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    const data = await res.json();
    if (!data.ok) {
      throw new TelegramError("API", data.description || "getMe rejected.");
    }
    return { botUsername: data.result?.username, apiBase: env.telegramApiBase };
  } catch (err) {
    if (err instanceof TelegramError) throw err;
    if (err.name === "AbortError") {
      throw new TelegramError("TIMEOUT", `Timed out after ${env.requestTimeoutMs}ms.`, err);
    }
    throw new TelegramError("NETWORK", err.message, err);
  } finally {
    clearTimeout(timeoutId);
  }
}
