import { Link } from "react-router-dom";
import { events, weeklyNights } from "../../data/events";
import Eyebrow from "../ui/Eyebrow";
import CTAButton from "../ui/CTAButton";
import { ArrowRight } from "lucide-react";


function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.getDate(),
    month: d.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
  };
}

export default function WhatsOnPreview() {
  const upcoming = events.filter((e) => e.published).slice(0, 3);

  return (
    <section className="border-t hairline-dark bg-charcoal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>What's on</Eyebrow>
            <h2 className="font-display text-4xl font-medium text-cream md:text-5xl">
              Every night's a reason
            </h2>
          </div>
          <Link
            to="/events"
            className="text-sm text-cream underline decoration-gold/40 underline-offset-4 hover:text-gold"
          >
            View full calendar →
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="rounded-sm border hairline-dark px-8 py-14 text-center">
            <p className="font-display text-xl text-cream">See you soon.</p>
            <p className="mt-2 text-sm text-paper-dim">
              Nothing on the calendar right this second — check back shortly, or
              book a table for great food and drinks any night.
            </p>
            <CTAButton href="/book" variant="primary" className="mt-6">
              Book a table
            </CTAButton>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => {
              const { day, month } = formatDate(e.date);
              return (
                <Link
                  key={e.id}
                  to="/events"
                  className="group relative flex flex-col overflow-hidden rounded-sm border hairline-dark bg-charcoal-800 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow"
                >
                  {e.soldOut && (
                    <span className="absolute right-4 top-4 z-10 rounded-full bg-cream px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-charcoal">
                      Fully booked
                    </span>
                  )}
                  {e.featured && (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-charcoal">
                      🔥 Hot
                    </span>
                  )}

                  {e.image && (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal">
                      <img
                        src={e.image}
                        alt={`${e.title} flyer`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-4xl font-semibold text-gold">
                        {day}
                      </span>
                      <span className="text-sm text-paper-dim">{month}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl text-cream transition-colors group-hover:text-gold">
                      {e.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                      {e.shortDescription}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-wide text-paper-dim/70">
                      {e.category} · {e.time} {e.age && `· ${e.age}`}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-light">
                      Learn more
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t hairline-dark pt-8">
          {weeklyNights.map((n) => (
            <div key={n.day} className="flex items-baseline gap-2 text-sm">
              <span className="font-display text-gold">{n.day}</span>
              <span className="text-cream">{n.title}</span>
              <span className="text-paper-dim">{n.time}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButton href="/events" variant="secondary">
            View More
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
