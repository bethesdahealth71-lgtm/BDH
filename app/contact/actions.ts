"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

/**
 * Contact form handler.
 *
 * Privacy note (Alberta HIA / PIPEDA): this form deliberately does NOT ask for
 * health information, and the copy tells people not to send any. General enquiry
 * only. Anything clinical belongs on the phone or in the booking system, which
 * is a compliant health record.
 *
 * Spam protection is a honeypot + a timing check rather than a third-party
 * CAPTCHA — no visitor data is shipped to an ad network, and there is no
 * accessibility barrier for screen-reader or motor-impaired users.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a real person never fills a hidden field.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  // Timing: a human takes more than two seconds to fill this in.
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (startedAt && Date.now() - startedAt < 2000) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    fieldErrors.email = "That email address does not look right.";
  if (message.length < 10) fieldErrors.message = "A sentence or two is enough — just not blank.";
  if (message.length > 2000) fieldErrors.message = "Please keep it under 2000 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // TODO(deploy): deliver the message. Options, in order of preference for a
  // health clinic:
  //   1. Postmark / Resend transactional email to the clinic inbox, over TLS,
  //      with the message body NOT logged to any third-party analytics.
  //   2. The clinic's existing Jane inbox, if it exposes an API.
  // Do NOT pipe this into a marketing CRM — even a general enquiry from a
  // patient is arguably personal information under PIPEDA.
  //
  //   await sendEmail({ to: site.email, replyTo: email, subject: `Website enquiry — ${name}`, text: message })
  //
  // Until that is wired up this returns success without delivering, so the
  // integration MUST be completed before launch.
  // ───────────────────────────────────────────────────────────────────────────

  if (process.env.NODE_ENV !== "production") {
    console.warn("[contact] No delivery configured. Message was not sent.", { name, email });
  }

  return {
    status: "success",
    message: "Thanks — we've got your message and will reply within one business day.",
  };
}
