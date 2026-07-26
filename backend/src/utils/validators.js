const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates + normalizes the raw request body for POST /api/contact.
 * Never trust client-side validation — this re-checks everything.
 */
export function validateContactPayload(body) {
  const errors = [];

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const hp = typeof body?.hp === "string" ? body.hp.trim() : "";

  if (!name) errors.push("نام الزامی است.");
  else if (name.length > 100) errors.push("نام خیلی طولانی است.");

  if (!email) errors.push("ایمیل الزامی است.");
  else if (!EMAIL_RE.test(email)) errors.push("فرمت ایمیل نامعتبر است.");

  if (!message) errors.push("پیام الزامی است.");
  else if (message.length > 2000) errors.push("پیام خیلی طولانی است.");

  return {
    valid: errors.length === 0,
    errors,
    data: { name, email, message, hp },
  };
}
