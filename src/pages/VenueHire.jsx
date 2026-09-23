import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site";
import { venueHireStore } from "../lib/venueHireStore";
import { sendNotificationEmail, isEmailJsConfigured } from "../lib/emailClient";
import Eyebrow from "../components/ui/Eyebrow";
import CTAButton from "../components/ui/CTAButton";

const OFFERS = [
  {
    title: "Birthdays",
    desc: "Rum, food and a room that gets loud when it's meant to — group dining with drinks and late-night options where the night allows.",
  },
  {
    title: "Celebrations",
    desc: "Anniversaries, graduations, reunions and any social gathering worth marking properly.",
  },
  {
    title: "Hen & stag groups",
    desc: "Group bookings built for a big night out — get in touch on numbers and any age restrictions for your group.",
  },
  {
    title: "Full venue hire",
    desc: "Looking to take over the space? This is an enquiry-based process — we'll check availability and come back to you, not an instant exclusive booking.",
  },
];

const EVENT_TYPES = ["Birthday", "Celebration", "Hen / Stag", "Full venue hire", "Other"];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  date: "",
  guests: "",
  eventType: "",
  arrivalTime: "",
  message: "",
  contactOk: false,
  company: "", // honeypot
};

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[\d+()\s-]{7,}$/.test(form.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email.";
  if (!form.guests) errors.guests = "Please let us know roughly how many guests.";
  if (!form.eventType) errors.eventType = "Please select what this is for.";
  return errors;
}

const inputClass =
  "w-full border-b hairline-dark bg-transparent py-3 text-cream placeholder:text-paper-dim/50 focus:border-gold outline-none transition-colors";
const errorClass = "mt-1 text-xs text-pink-400";

export default function VenueHire() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const update = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e2) => ({ ...e2, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const enquiryRecord = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      date: form.date || null,
      guests: form.guests,
      event_type: form.eventType,
      arrival_time: form.arrivalTime || null,
      message: form.message || null,
      contact_ok: form.contactOk,
    };

    try {
      await venueHireStore.create(enquiryRecord);
    } catch {
      setStatus("error");
      return;
    }

    const subjectText = `Venue hire enquiry — ${form.name}`;
    const messageText = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nEvent type: ${form.eventType}\nGuests: ${form.guests}\nPreferred date: ${form.date || "Not specified"}\nArrival time: ${form.arrivalTime || "Not specified"}\nMessage: ${form.message || "—"}\nHappy to be contacted: ${form.contactOk ? "Yes" : "Not specified"}`;

    if (isEmailJsConfigured) {
      try {
        await sendNotificationEmail({ subject: subjectText, message: messageText, replyTo: form.email });
        setStatus("success");
      } catch {
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

  if (status === "success") {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <Eyebrow>Enquiry received</Eyebrow>
        <h1 className="font-display text-4xl text-cream sm:text-5xl">
          Thanks — we've got your enquiry
        </h1>
        <p className="mt-4 max-w-sm text-paper-dim">
          This isn't a confirmed booking yet — we'll check availability and
          get back to you directly to talk through the details.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-gold px-7 py-3.5 font-medium text-charcoal transition-all hover:shadow-glow"
        >
          Back home
        </Link>
      </section>
    );
  }

  return (
    <div>
      {/* hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-charcoal pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-drinks.jpg)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16">
          <Eyebrow>Parties &amp; Venue Hire</Eyebrow>
          <h1 className="font-display text-5xl text-cream sm:text-7xl">Your party. Our vibe.</h1>
          <p className="mt-4 max-w-md text-paper-dim">
            Birthdays, celebrations, hen &amp; stag nights and full venue
            hire — let's talk about your night.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="#enquire" variant="primary">Enquire Now</CTAButton>
            <CTAButton href="/gallery" variant="secondary">View the Venue</CTAButton>
          </div>
        </div>
      </section>

      {/* offer blocks */}
      <section className="border-t hairline-dark bg-charcoal py-20">
        <div className="mx-auto max-w-6xl px-6">
          {OFFERS.map((o) => (
            <div
              key={o.title}
              className="group flex items-start gap-6 border-b hairline-dark py-7 first:pt-0 last:border-none"
            >
              <span className="mt-1 font-display text-lg text-gold/70 transition-colors group-hover:text-pink-400">
                ✻
              </span>
              <div>
                <h3 className="font-display text-xl text-cream transition-colors group-hover:text-gold">
                  {o.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-paper-dim">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* enquiry form */}
      <section id="enquire" className="border-t hairline-dark bg-charcoal-800 py-24">
        <div className="mx-auto max-w-2xl px-6">
          <Eyebrow>Enquire</Eyebrow>
          <h2 className="font-display text-4xl text-cream sm:text-5xl">Tell us about your night</h2>
          <p className="mt-4 text-paper-dim">
            Send us the details and we'll come back to you to check
            availability and talk it through.
          </p>

          {status === "error" && (
            <div className="mt-8 rounded-sm border border-pink-400/40 bg-pink-400/5 px-4 py-3 text-sm text-pink-300">
              Something went wrong sending your enquiry. Please try again, or
              email us directly.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
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
                Event type
                <select className={`${inputClass} text-base normal-case tracking-normal`} value={form.eventType} onChange={update("eventType")}>
                  <option value="" className="bg-charcoal-800">Select…</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-charcoal-800">{t}</option>
                  ))}
                </select>
              </label>
              {errors.eventType && <p className={errorClass}>{errors.eventType}</p>}
            </div>
            <div>
              <input
                placeholder="Roughly how many guests?"
                className={inputClass}
                value={form.guests}
                onChange={update("guests")}
              />
              {errors.guests && <p className={errorClass}>{errors.guests}</p>}
            </div>

            <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
              Preferred date (optional)
              <input type="date" className={`${inputClass} text-base normal-case tracking-normal`} value={form.date} onChange={update("date")} />
            </label>
            <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
              Arrival time (optional)
              <input type="time" className={`${inputClass} text-base normal-case tracking-normal`} value={form.arrivalTime} onChange={update("arrivalTime")} />
            </label>

            <textarea
              placeholder="Tell us a bit more about what you're after"
              rows={3}
              className={`sm:col-span-2 resize-none ${inputClass}`}
              value={form.message}
              onChange={update("message")}
            />

            <label className="flex items-start gap-2 text-sm text-paper-dim sm:col-span-2">
              <input
                type="checkbox"
                checked={form.contactOk}
                onChange={update("contactOk")}
                className="mt-1 h-4 w-4 accent-gold"
              />
              I'm happy to be contacted about this enquiry.
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full rounded-full bg-gold py-4 font-medium text-charcoal transition-all hover:shadow-glow disabled:opacity-60 sm:col-span-2"
            >
              {status === "submitting" ? "Sending…" : "Send Enquiry"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
