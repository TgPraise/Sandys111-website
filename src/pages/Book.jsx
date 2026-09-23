import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { site } from "../data/site";
import { bookingsStore } from "../lib/bookingsStore";
import { sendNotificationEmail, isEmailJsConfigured } from "../lib/emailClient";
import Eyebrow from "../components/ui/Eyebrow";

const GUEST_OPTIONS = ["1–2 guests", "3–4 guests", "5–8 guests", "9–15 guests", "15+ (private hire)"];
const OCCASION_OPTIONS = [
  "Just drinks",
  "Birthday",
  "Hen / Stag",
  "Anniversary",
  "Date night",
  "After work drinks",
  "Party / group",
  "Private hire",
  "Other",
];

const todayISO = new Date().toISOString().split("T")[0];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  guests: "",
  date: "",
  time: "",
  occasion: "",
  message: "",
  company: "", // honeypot — real users never see or fill this
};

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[\d+()\s-]{7,}$/.test(form.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email.";
  if (!form.guests) errors.guests = "Please select a party size.";
  if (!form.date) {
    errors.date = "Please pick a date.";
  } else if (form.date < todayISO) {
    errors.date = "Date can't be in the past.";
  }
  return errors;
}

const inputClass =
  "w-full border-b hairline-dark bg-transparent py-3 text-cream placeholder:text-paper-dim/50 focus:border-gold outline-none transition-colors";
const errorClass = "mt-1 text-xs text-pink-400";

export default function Book() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((e2) => ({ ...e2, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // honeypot — bots fill every field, real visitors never see this one
    if (form.company) {
      setStatus("success");
      return;
    }

    const foundErrors = validate(form);
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setStatus("submitting");

    const bookingRecord = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      guests: form.guests,
      date: form.date,
      time: form.time || null,
      occasion: form.occasion || null,
      message: form.message || null,
    };

    // Always save the booking so staff can see history in /admin,
    // regardless of whether email notification succeeds.
    try {
      await bookingsStore.create(bookingRecord);
    } catch {
      setStatus("error");
      return;
    }

    const subjectText = `Table booking request — ${form.name}`;
    const messageText = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nGuests: ${form.guests}\nDate: ${form.date}\nTime: ${form.time || "Not specified"}\nOccasion: ${form.occasion || "Not specified"}\nMessage: ${form.message || "—"}`;

    if (isEmailJsConfigured) {
      try {
        await sendNotificationEmail({ subject: subjectText, message: messageText, replyTo: form.email });
        setStatus("success");
      } catch {
        // Email failed but the booking is already saved — fall back to
        // mailto so the request still reaches the venue one way or another.
        const emailTo = site.email.status === "confirmed" ? site.email.value : "hello@sandys111.live";
        window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(messageText)}`;
        setStatus("success");
      }
    } else {
      const emailTo = site.email.status === "confirmed" ? site.email.value : "hello@sandys111.live";
      window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(messageText)}`;
      setStatus("success");
    }
  };

  const handleRetry = () => {
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <Eyebrow>Request received</Eyebrow>
        <h1 className="font-display text-4xl text-cream sm:text-5xl">
          We've got your booking request
        </h1>
        <div className="mt-6 max-w-sm rounded-sm border hairline-dark bg-charcoal-800 px-6 py-5 text-left text-sm text-paper-dim">
          <p className="text-cream">{form.name} · {form.guests}</p>
          <p className="mt-1">{form.date}{form.time && ` · ${form.time}`}</p>
          {form.occasion && <p className="mt-1">{form.occasion}</p>}
        </div>
        <p className="mt-6 max-w-sm text-sm text-paper-dim">
          Your email app should be open with the request ready to send.
          We'll get back to you directly to confirm your table — this isn't
          a confirmed booking yet.
        </p>
        <button
          onClick={() => {
            setForm(emptyForm);
            setStatus("idle");
          }}
          className="mt-8 rounded-full border border-cream/25 px-7 py-3.5 font-medium text-cream transition-colors hover:border-gold hover:text-gold"
        >
          Make another request
        </button>
      </section>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-24 pt-32">
      <Eyebrow>Reservations</Eyebrow>
      <h1 className="font-display text-4xl text-cream sm:text-5xl">Book Your Table</h1>
      <p className="mt-4 max-w-md text-paper-dim">
        Tell us when you'd like to visit and we'll get back to you to
        confirm your table.
      </p>

      {/* phone / whatsapp fallback, near the form per spec */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        {site.phone.status === "confirmed" ? (
          <a href={`tel:${site.phone.value}`} className="flex items-center gap-2 text-cream hover:text-gold">
            <Phone size={15} /> {site.phone.value}
          </a>
        ) : (
          <span className="flex items-center gap-2 text-paper-dim/60">
            <Phone size={15} /> Phone — confirming soon
          </span>
        )}
        {site.whatsapp.status === "confirmed" ? (
          <a
            href={`https://wa.me/${site.whatsapp.value.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-cream hover:text-gold"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
        ) : (
          <span className="flex items-center gap-2 text-paper-dim/60">
            <MessageCircle size={15} /> WhatsApp — confirming soon
          </span>
        )}
      </div>

      {status === "error" && (
        <div className="mt-8 rounded-sm border border-pink-400/40 bg-pink-400/5 px-4 py-3 text-sm text-pink-300">
          Something went wrong sending your request. Please try again, or
          call/WhatsApp us directly using the details above.
          <button onClick={handleRetry} className="ml-2 underline hover:text-pink-100">
            Try again
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {/* honeypot field — hidden from real users */}
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={update("company")}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div>
          <input placeholder="Name" className={inputClass} value={form.name} onChange={update("name")} />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <input type="tel" placeholder="Phone" className={inputClass} value={form.phone} onChange={update("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <input type="email" placeholder="Email" className={inputClass} value={form.email} onChange={update("email")} />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
            Guests
            <select className={`${inputClass} text-base normal-case tracking-normal`} value={form.guests} onChange={update("guests")}>
              <option value="" className="bg-charcoal-800">Select…</option>
              {GUEST_OPTIONS.map((g) => (
                <option key={g} value={g} className="bg-charcoal-800">{g}</option>
              ))}
            </select>
          </label>
          {errors.guests && <p className={errorClass}>{errors.guests}</p>}
        </div>

        <div>
          <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
            Occasion (optional)
            <select className={`${inputClass} text-base normal-case tracking-normal`} value={form.occasion} onChange={update("occasion")}>
              <option value="" className="bg-charcoal-800">Select…</option>
              {OCCASION_OPTIONS.map((o) => (
                <option key={o} value={o} className="bg-charcoal-800">{o}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
            Date
            <input type="date" min={todayISO} className={`${inputClass} text-base normal-case tracking-normal`} value={form.date} onChange={update("date")} />
          </label>
          {errors.date && <p className={errorClass}>{errors.date}</p>}
        </div>

        <div>
          <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
            Time (optional)
            <input type="time" className={`${inputClass} text-base normal-case tracking-normal`} value={form.time} onChange={update("time")} />
          </label>
        </div>

        <textarea
          placeholder="Anything else? (large groups, accessibility, special requests)"
          rows={3}
          className={`sm:col-span-2 resize-none ${inputClass}`}
          value={form.message}
          onChange={update("message")}
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 w-full rounded-full bg-gold py-4 font-medium text-charcoal transition-all hover:shadow-glow disabled:opacity-60 sm:col-span-2"
        >
          {status === "submitting" ? "Sending request…" : "Send Booking Request"}
        </button>
      </form>
    </div>
  );
}
