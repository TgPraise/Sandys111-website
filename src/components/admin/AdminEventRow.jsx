import { Trash2 } from "lucide-react";
import { formatDate } from "../../lib/formatDate";

export default function AdminEventRow({ event, onToggleSoldOut, onDelete }) {
  const { day, month } = formatDate(event.date);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b hairline-dark py-4">
      <div className="flex items-center gap-4">
        <div className="font-display text-2xl text-gold">
          {day} <span className="text-sm text-paper-dim">{month}</span>
        </div>
        <div>
          <p className="text-cream">{event.title}</p>
          <p className="text-xs text-paper-dim">{event.category} · {event.time}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-xs text-paper-dim">
          <input
            type="checkbox"
            checked={!!event.soldOut}
            onChange={(e) => onToggleSoldOut(event.id, e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          Fully booked
        </label>
        <button
          onClick={() => onDelete(event.id)}
          aria-label={`Delete ${event.title}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border hairline-dark text-paper-dim transition-colors hover:border-pink-400 hover:text-pink-400"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
