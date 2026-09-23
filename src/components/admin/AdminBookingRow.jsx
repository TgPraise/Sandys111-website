export default function AdminBookingRow({ booking, onToggleContacted }) {
  const submitted = new Date(booking.created_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b hairline-dark py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-cream">{booking.name} · {booking.guests}</p>
          <p className="text-xs text-paper-dim">
            {booking.date}{booking.time && ` · ${booking.time}`}{booking.occasion && ` · ${booking.occasion}`}
          </p>
          <p className="mt-1 text-xs text-paper-dim/70">
            {booking.phone} · {booking.email}
          </p>
          {booking.message && (
            <p className="mt-1 max-w-md text-xs italic text-paper-dim/70">"{booking.message}"</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-paper-dim/60">Submitted {submitted}</span>
          <label className="flex items-center gap-2 text-xs text-paper-dim">
            <input
              type="checkbox"
              checked={!!booking.contacted}
              onChange={(e) => onToggleContacted(booking.id, e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            Contacted
          </label>
        </div>
      </div>
    </div>
  );
}
