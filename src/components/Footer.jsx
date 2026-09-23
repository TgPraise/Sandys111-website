import { Link } from "react-router-dom";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t hairline-dark bg-charcoal py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <span className="font-display text-2xl font-semibold text-cream">
              Sandy's<span className="text-gold">111</span>
            </span>
            <p className="mt-4 max-w-xs text-sm text-paper-dim">
              {site.tagline} — Romford. Come for the food, stay for the vibes.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-paper-dim/60">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-paper-dim">
              <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
              <li><Link to="/events" className="hover:text-gold">What's On</Link></li>
              <li><Link to="/about" className="hover:text-gold">About</Link></li>
              <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
              <li><Link to="/venue-hire" className="hover:text-gold">Venue Hire</Link></li>
              <li><Link to="/careers" className="hover:text-gold">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-paper-dim/60">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-paper-dim">
              <li>{site.address.line1}, {site.address.line2}</li>
              <li>
                {site.phone.status === "confirmed" ? (
                  <a href={`tel:${site.phone.value}`} className="hover:text-gold">
                    {site.phone.value}
                  </a>
                ) : (
                  <span className="italic text-paper-dim/60">Phone — confirming soon</span>
                )}
              </li>
              <li>
                {site.email.status === "confirmed" ? (
                  <a href={`mailto:${site.email.value}`} className="hover:text-gold">
                    {site.email.value}
                  </a>
                ) : (
                  <span className="italic text-paper-dim/60">Email — confirming soon</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t hairline-dark pt-8 text-xs text-paper-dim/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Company No.{" "}
            {site.companyNumber}. Please drink responsibly. Challenge 25
            operates on this premises.
          </p>
          <Link to="/privacy" className="underline hover:text-gold">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
