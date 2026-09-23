import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/**
 * Sends a notification email to the venue via EmailJS. Requires a template
 * on the EmailJS side with {{subject}}, {{message}} and {{reply_to}}
 * variables — see ADMIN.md for the exact setup and template content.
 * Throws if EmailJS isn't configured or the send fails — callers should
 * fall back to mailto (see Book.jsx / Order.jsx) when this rejects.
 */
export async function sendNotificationEmail({ subject, message, replyTo }) {
  if (!isEmailJsConfigured) {
    throw new Error("EmailJS is not configured");
  }
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { subject, message, reply_to: replyTo },
    { publicKey: PUBLIC_KEY }
  );
}
