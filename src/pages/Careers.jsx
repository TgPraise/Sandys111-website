import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, X, FileText } from "lucide-react";
import { site } from "../data/site";
import { careersStore } from "../lib/careersStore";
import { uploadCV } from "../lib/uploadCV";
import { sendNotificationEmail, isEmailJsConfigured } from "../lib/emailClient";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import Eyebrow from "../components/ui/Eyebrow";

const emptyForm = {
  name: "",
  age: "",
  dob: "",
  rightToWork: "",
  rightToWorkDetails: "",
  summary: "",
  email: "",
  phone: "",
  company: "", // honeypot
};

function validate(form, cvFile) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email.";
  if (!/^[\d+()\s-]{7,}$/.test(form.phone.trim())) errors.phone = "Please enter a valid phone number.";
  const ageNum = Number(form.age);
  if (!ageNum || ageNum < 16 || ageNum > 100) errors.age = "Please enter a valid age.";
  if (!form.dob) errors.dob = "Please enter your date of birth.";
  if (!form.rightToWork) errors.rightToWork = "Please select an option.";
  if (form.rightToWork === "Yes" && !form.rightToWorkDetails.trim()) {
    errors.rightToWorkDetails = "Please briefly specify (e.g. British citizen, Settled status, visa type).";
  }
  if (form.summary.trim().length < 20) errors.summary = "Please write a few sentences.";
  if (!cvFile) errors.cv = "Please attach your CV.";
  return errors;
}

const inputClass =
  "w-full border-b hairline-dark bg-transparent py-3 text-cream placeholder:text-paper-dim/50 focus:border-gold outline-none transition-colors";
const errorClass = "mt-1 text-xs text-pink-400";

export default function Careers() {
  const [form, setForm] = useState(emptyForm);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | uploading | submitting | success | error

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((e2) => ({ ...e2, [key]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvFile(file);
    if (errors.cv) setErrors((e2) => ({ ...e2, cv: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.company) {
      setStatus("success");
      return;
    }

    const foundErrors = validate(form, cvFile);
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setStatus("uploading");
    let cv;
    try {
      cv = await uploadCV(cvFile);
    } catch (err) {
      setStatus("error");
      setErrors((e2) => ({ ...e2, cv: err.message || "Couldn't upload your CV — try a smaller file." }));
      return;
    }

    setStatus("submitting");

    const applicationRecord = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      age: Number(form.age),
      dob: form.dob,
      right_to_work: form.rightToWork,
      right_to_work_details: form.rightToWorkDetails || null,
      summary: form.summary,
      cv_url: cv.url,
      cv_file_name: cv.fileName,
    };

    try {
      await careersStore.create(applicationRecord);
    } catch {
      setStatus("error");
      return;
    }

    const subjectText = `Job application — ${form.name}`;
    const cvLine = isSupabaseConfigured
      ? `CV: ${cv.url}`
      : "CV: attached — view/download it in the admin panel (Careers tab).";
    const messageText = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nAge: ${form.age}\nDOB: ${form.dob}\nRight to work in the UK: ${form.rightToWork}${form.rightToWorkDetails ? ` (${form.rightToWorkDetails})` : ""}\n\nWhy Sandy's 111:\n${form.summary}\n\n${cvLine}`;

    if (isEmailJsConfigured) {
      try {
        await sendNotificationEmail({ subject: subjectText, message: messageText, replyTo: form.email });
      } catch {
        // Email failed but the application is already saved — don't lose
        // it, and mailto can't carry a CV attachment/data-URL reliably,
        // so just point staff to the admin panel instead of a broken send.
      }
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <Eyebrow>Application received</Eyebrow>
        <h1 className="font-display text-4xl text-cream sm:text-5xl">
          Thanks for applying
        </h1>
        <p className="mt-4 max-w-sm text-paper-dim">
          We've got your application and CV — if it looks like a fit,
          we'll be in touch directly.
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

  const busy = status === "uploading" || status === "submitting";

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-24 pt-32">
      <Eyebrow>Careers</Eyebrow>
      <h1 className="font-display text-4xl text-cream sm:text-5xl">Join the Team</h1>
      <p className="mt-4 max-w-md text-paper-dim">
        Fancy working somewhere with this much energy? Tell us a bit about
        yourself and attach your CV.
      </p>

      {status === "error" && (
        <div className="mt-8 rounded-sm border border-pink-400/40 bg-pink-400/5 px-4 py-3 text-sm text-pink-300">
          Something went wrong submitting your application. Please try again.
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
          <input placeholder="Full name" className={inputClass} value={form.name} onChange={update("name")} />
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
          <input type="number" placeholder="Age" className={inputClass} value={form.age} onChange={update("age")} />
          {errors.age && <p className={errorClass}>{errors.age}</p>}
        </div>
        <div>
          <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
            Date of birth
            <input type="date" className={`${inputClass} text-base normal-case tracking-normal`} value={form.dob} onChange={update("dob")} />
          </label>
          {errors.dob && <p className={errorClass}>{errors.dob}</p>}
        </div>

        <div>
          <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
            Right to work in the UK
            <select className={`${inputClass} text-base normal-case tracking-normal`} value={form.rightToWork} onChange={update("rightToWork")}>
              <option value="" className="bg-charcoal-800">Select…</option>
              <option value="Yes" className="bg-charcoal-800">Yes</option>
              <option value="No" className="bg-charcoal-800">No</option>
            </select>
          </label>
          {errors.rightToWork && <p className={errorClass}>{errors.rightToWork}</p>}
        </div>
        <div>
          <input
            placeholder="If yes, please specify (e.g. British citizen, visa type)"
            className={inputClass}
            value={form.rightToWorkDetails}
            onChange={update("rightToWorkDetails")}
            disabled={form.rightToWork !== "Yes"}
          />
          {errors.rightToWorkDetails && <p className={errorClass}>{errors.rightToWorkDetails}</p>}
        </div>

        <textarea
          placeholder="Why Sandy's 111? A few sentences on why you'd be a good fit."
          rows={4}
          className={`sm:col-span-2 resize-none ${inputClass}`}
          value={form.summary}
          onChange={update("summary")}
        />
        {errors.summary && <p className={`sm:col-span-2 ${errorClass}`}>{errors.summary}</p>}

        {/* CV upload */}
        <div className="sm:col-span-2">
          <p className="mb-2 text-xs uppercase tracking-widest text-paper-dim/60">CV</p>
          {cvFile ? (
            <div className="flex items-center justify-between rounded-sm border hairline-dark px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-cream">
                <FileText size={16} className="text-gold" />
                {cvFile.name}
              </span>
              <button
                type="button"
                onClick={() => setCvFile(null)}
                aria-label="Remove CV"
                className="text-paper-dim hover:text-pink-400"
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed hairline-dark px-6 py-8 text-sm text-paper-dim transition-colors hover:border-gold hover:text-gold">
              <Upload size={16} />
              Click to attach your CV (PDF or Word, under 5MB)
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
            </label>
          )}
          {errors.cv && <p className={errorClass}>{errors.cv}</p>}
        </div>

        <button
          type="submit"
          disabled={busy}
          className="mt-2 w-full rounded-full bg-gold py-4 font-medium text-charcoal transition-all hover:shadow-glow disabled:opacity-60 sm:col-span-2"
        >
          {status === "uploading" ? "Uploading CV…" : status === "submitting" ? "Sending…" : "Send Application"}
        </button>
      </form>
    </div>
  );
}
