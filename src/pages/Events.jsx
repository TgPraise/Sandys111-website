import { useEffect, useState } from "react";
import { eventsStore } from "../lib/eventsStore";
import EventCard from "../components/events/EventCard";
import Eyebrow from "../components/ui/Eyebrow";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventsStore.getAll().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const upcoming = events.filter((e) => e.published);

  return (
    <div className="min-h-screen pb-24 pt-32">
      {/* intro section */}
      <section className="mx-auto max-w-6xl px-6">
        <Eyebrow>What's on</Eyebrow>
        <h1 className="max-w-2xl font-display text-4xl font-medium text-cream sm:text-6xl">
          From rum tastings to dancehall nights.
        </h1>
        <p className="mt-5 max-w-xl text-paper-dim">
          Every event is ticketed through our partners — tap Get Tickets to
          book. Table bookings for food and drinks before or during any
          night are handled separately.
        </p>
      </section>

      {/* cards section */}
      <section className="mx-auto mt-14 max-w-6xl px-6">
        {loading ? (
          <p className="py-16 text-center text-sm text-paper-dim">Loading events…</p>
        ) : upcoming.length === 0 ? (
          <div className="rounded-sm border hairline-dark px-8 py-16 text-center">
            <p className="font-display text-xl text-cream">See you soon.</p>
            <p className="mt-2 text-sm text-paper-dim">
              Nothing on the calendar right this second — check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
