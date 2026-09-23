export default function AdminVenueHireRow({ enquiry, onToggleContacted }) {
  const submitted = new Date(enquiry.created_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b hairline-dark py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-cream">{enquiry.name} · {enquiry.event_type}</p>
          <p className="text-xs text-paper-dim">
            {enquiry.guests} guests
            {enquiry.date && ` · ${enquiry.date}`}
            {enquiry.arrival_time && ` · ${enquiry.arrival_time}`}
          </p>
          <p className="mt-1 text-xs text-paper-dim/70">
            {enquiry.phone} · {enquiry.email}
          </p>
          {enquiry.message && (
            <p className="mt-1 max-w-md text-xs italic text-paper-dim/70">"{enquiry.message}"</p>
          )}
          {enquiry.contact_ok && (
            <p className="mt-1 text-[10px] uppercase tracking-wide text-gold-light">
              Happy to be contacted
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-paper-dim/60">Submitted {submitted}</span>
          <label className="flex items-center gap-2 text-xs text-paper-dim">
            <input
              type="checkbox"
              checked={!!enquiry.contacted}
              onChange={(e) => onToggleContacted(enquiry.id, e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            Contacted
          </label>
        </div>
      </div>
    </div>
  );
}
