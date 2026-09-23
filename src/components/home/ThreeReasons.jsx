import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const REASONS = [
  {
    key: "drink",
    label: "Drink",
    heading: "30+ rums, poured properly.",
    desc: "Jamaica, Trinidad, Barbados, Guyana and beyond — neat, in flights, or built into a proper punch.",
    to: "/menu",
    cta: "Explore the bar",
  },
  {
    key: "eat",
    label: "Eat",
    heading: "Jerk, curry goat, island comfort.",
    desc: "Real Caribbean cooking, made to order — not a buffet steam tray.",
    to: "/menu",
    cta: "View the menu",
  },
  {
    key: "vibe",
    label: "Vibe",
    heading: "Reggae, soca, dancehall, all week.",
    desc: "Resident DJs, live nights and karaoke — the room is never quiet for long.",
    to: "/events",
    cta: "See what's on",
  },
];

export default function ThreeReasons() {
  return (
    <section className="border-t hairline-dark bg-charcoal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.key} className="group">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                {r.label}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-snug text-cream">
                {r.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">{r.desc}</p>
              <Link
                to={r.to}
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-cream transition-colors hover:text-gold"
              >
                {r.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
