import { formatDate } from "../../lib/formatDate";

export default function EventCard({ event }) {
  const { day, month, weekday } = formatDate(event.date);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-sm border bg-charcoal-800 transition-all ${
        event.featured
          ? "border-gold/70 shadow-glow"
          : "hairline-dark hover:border-gold/40"
      }`}
    >
      {event.featured && (
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-charcoal">
          🔥 Hot right now
        </span>
      )}
      {event.soldOut && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-cream px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-charcoal">
          Fully booked
        </span>
      )}

      {/* flyer — shown whole, not cropped, so nothing on the artwork gets cut off */}
      <div className="flex items-center justify-center bg-charcoal p-3">
        {event.image ? (
          <img
            src={event.image}
            alt={`${event.title} flyer`}
            className="max-h-[420px] w-full rounded-sm object-contain"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center text-sm text-paper-dim">
            Flyer coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-semibold text-gold">{day}</span>
          <div className="leading-tight">
            <p className="text-sm text-cream">{month} · {weekday}</p>
            <p className="text-xs text-paper-dim">{event.time}</p>
          </div>
        </div>

        <h3 className="font-display text-xl text-cream">{event.title}</h3>
        <p className="text-sm leading-relaxed text-paper-dim">{event.shortDescription}</p>

        {event.age && (
          <p className="text-xs uppercase tracking-wide text-paper-dim/70">
            {event.age}
            {event.lastEntry && ` · Last entry ${event.lastEntry}`}
          </p>
        )}

        <div className="mt-auto pt-2">
          {event.soldOut ? (
            <span className="inline-flex w-full items-center justify-center rounded-full border border-cream/20 px-6 py-3 text-sm text-paper-dim">
              Fully booked
            </span>
          ) : (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-charcoal transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              Get Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
