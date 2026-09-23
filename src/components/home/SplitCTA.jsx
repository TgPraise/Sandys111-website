import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function SplitCTA() {
  return (
    <section className="border-t hairline-dark">
      <div className="grid sm:grid-cols-2">
        <Link
          to="/menu"
          className="group flex flex-col justify-between gap-10 bg-cream px-10 py-20 text-ink transition-colors hover:bg-cream-dim"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gold-deep">
            I want to eat
          </span>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-3xl sm:text-4xl">View the menu</h3>
            <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </div>
        </Link>

        <Link
          to="/events"
          className="group flex flex-col justify-between gap-10 bg-charcoal-800 px-10 py-20 text-cream transition-colors hover:bg-charcoal-700"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gold">
            I want a night out
          </span>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-3xl sm:text-4xl">See what's on</h3>
            <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </div>
        </Link>
      </div>
    </section>
  );
}
