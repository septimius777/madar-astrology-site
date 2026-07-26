import { useState, type FormEvent } from "react";
import Reveal from "../ui/Reveal";
import { useParallax } from "../../hooks/useParallax";

/**
 * Where the form POSTs to. Override at build time with an env var:
 *   VITE_CONTACT_API_URL=https://api.example.com/contact
 * Falls back to a same-origin relative path — works if your Express server
 * is reverse-proxied under the same domain, or via Vite's dev-server
 * `server.proxy` option in vite.config.ts. See the chat explanation for the
 * full request/response contract this expects from the backend.
 */
const CONTACT_ENDPOINT =
  (import.meta.env.VITE_CONTACT_API_URL as string | undefined) ?? "/api/contact";

const REQUEST_TIMEOUT_MS = 12000;

type Status = "idle" | "loading" | "success" | "error";

/** What the frontend sends. `hp` is a honeypot field — see explanation. */
interface ContactPayload {
  name: string;
  email: string;
  message: string;
  hp: string;
}

/** What the backend is expected to respond with. See chat explanation. */
interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const DEFAULT_SUCCESS_MESSAGE = "پیامت با موفقیت ارسال شد. به‌زودی پاسخ می‌دهیم.";
const DEFAULT_ERROR_MESSAGE =
  "ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کن یا کمی بعد امتحان کن.";
const NETWORK_ERROR_MESSAGE =
  "اتصال برقرار نشد. اینترنتت را بررسی کن و دوباره تلاش کن.";

/**
 * Ports the CONTACT section (the comet), now wired up to actually submit to
 * a backend instead of being a front-end-only demo.
 */
export default function MedarContactSection() {
  const planetRef = useParallax<HTMLDivElement>(0.15);

  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: ContactPayload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      hp: String(data.get("hp_field") ?? ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setFeedback("لطفاً همه‌ی فیلدها را پر کن.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      let body: ContactResponse | null = null;
      try {
        body = (await res.json()) as ContactResponse;
      } catch {
        // Backend didn't return JSON (e.g. crashed before responding) —
        // fall through to the generic error message below.
      }

      if (res.ok && body?.success) {
        setStatus("success");
        setFeedback(body.message || DEFAULT_SUCCESS_MESSAGE);
        form.reset();
      } else {
        setStatus("error");
        setFeedback(body?.error || DEFAULT_ERROR_MESSAGE);
      }
    } catch {
      // Covers both real network failures and the AbortError from the
      // timeout above — either way, the user just needs "it didn't go through".
      setStatus("error");
      setFeedback(NETWORK_ERROR_MESSAGE);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  const isLoading = status === "loading";

  return (
    <section id="contact" className="medar-section medar-contact">
      <div
        ref={planetRef}
        className="medar-planet medar-planet--comet"
        aria-hidden="true"
      />
      <div className="medar-container medar-contact__grid">
        <div className="medar-contact__intro">
          <Reveal as="p" className="medar-eyebrow">
            ☄ یک پیام بفرست
          </Reveal>
          <Reveal as="h2" className="medar-section-title">
            شروعِ گفت‌وگو
          </Reveal>
          <Reveal as="p">
            سؤالی درباره‌ی زایچه‌ات داری، یا می‌خواهی یک جلسه رزرو کنی؟ همین‌جا بنویس.
          </Reveal>
        </div>

        <Reveal
          as="form"
          className="medar-contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Honeypot: hidden from real users, invisible to screen readers,
              but a naive bot filling every field will fill this too. If
              `hp` arrives non-empty, the backend should silently pretend
              success without actually sending anything. */}
          <input
            type="text"
            name="hp_field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="medar-hp-field"
          />

          <label>
            <span>نام</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              disabled={isLoading}
            />
          </label>
          <label>
            <span>ایمیل</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              disabled={isLoading}
            />
          </label>
          <label>
            <span>پیام</span>
            <textarea name="message" rows={4} required disabled={isLoading} />
          </label>

          <button
            type="submit"
            className="medar-btn medar-btn--primary"
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال…" : "ارسالِ پیام"}
          </button>

          {feedback && (
            <p
              className={`medar-contact-form__status medar-contact-form__status--${status}`}
              aria-live="polite"
            >
              {feedback}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}