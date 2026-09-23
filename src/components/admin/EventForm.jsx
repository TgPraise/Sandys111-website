import { useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadFlyerImage } from "../../lib/uploadImage";

const emptyFields = {
  title: "",
  category: "Nightlife",
  date: "",
  time: "",
  lastEntry: "",
  age: "",
  shortDescription: "",
  ticketUrl: "",
};

const CATEGORIES = ["Nightlife", "Comedy", "Live", "Food & Drink", "Food & Music"];

export default function EventForm({ onCreate, creating }) {
  const [form, setForm] = useState(emptyFields);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.ticketUrl) return;

    setError(null);
    let imageUrl = null;

    if (imageFile) {
      setUploading(true);
      try {
        imageUrl = await uploadFlyerImage(imageFile);
      } catch (err) {
        setUploading(false);
        setError(err.message || "Couldn't upload the flyer — try a smaller image.");
        return;
      }
      setUploading(false);
    }

    await onCreate({
      ...form,
      age: form.age || null,
      lastEntry: form.lastEntry || null,
      image: imageUrl,
    });

    setForm(emptyFields);
    clearImage();
  };

  const inputClass =
    "w-full border-b hairline-dark bg-transparent py-2.5 text-cream placeholder:text-paper-dim/50 outline-none focus:border-gold";
  const busy = creating || uploading;

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <input
        required
        placeholder="Event title"
        className={`sm:col-span-2 ${inputClass}`}
        value={form.title}
        onChange={update("title")}
      />

      <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
        Category
        <select className={`${inputClass} text-base normal-case`} value={form.category} onChange={update("category")}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-charcoal-800">
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-paper-dim/60">
        Date
        <input required type="date" className={`${inputClass} text-base normal-case`} value={form.date} onChange={update("date")} />
      </label>

      <input required placeholder="Time (e.g. 9:00 PM – 3:00 AM)" className={inputClass} value={form.time} onChange={update("time")} />
      <input placeholder="Last entry (optional)" className={inputClass} value={form.lastEntry} onChange={update("lastEntry")} />
      <input placeholder="Age restriction (optional, e.g. 18+)" className={`sm:col-span-2 ${inputClass}`} value={form.age} onChange={update("age")} />

      {/* flyer upload */}
      <div className="sm:col-span-2">
        <p className="mb-2 text-xs uppercase tracking-widest text-paper-dim/60">
          Flyer image (optional)
        </p>

        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Flyer preview"
              className="max-h-48 rounded-sm border hairline-dark object-contain"
            />
            <button
              type="button"
              onClick={clearImage}
              aria-label="Remove image"
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-cream shadow hover:text-pink-400"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed hairline-dark px-6 py-8 text-sm text-paper-dim transition-colors hover:border-gold hover:text-gold">
            <Upload size={16} />
            Click to upload a flyer image
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        )}
        {error && <p className="mt-2 text-sm text-pink-400">{error}</p>}
      </div>

      <input
        required
        placeholder="Ticket URL (Eventbrite, Skiddle, etc.)"
        className={`sm:col-span-2 ${inputClass}`}
        value={form.ticketUrl}
        onChange={update("ticketUrl")}
      />
      <textarea
        placeholder="Short description"
        rows={2}
        className={`sm:col-span-2 resize-none ${inputClass}`}
        value={form.shortDescription}
        onChange={update("shortDescription")}
      />

      <button
        type="submit"
        disabled={busy}
        className="mt-1 w-full rounded-full bg-gold py-3 font-medium text-charcoal transition-all hover:shadow-glow disabled:opacity-50 sm:col-span-2"
      >
        {uploading ? "Uploading flyer…" : creating ? "Posting…" : "Post Event"}
      </button>
    </form>
  );
}
