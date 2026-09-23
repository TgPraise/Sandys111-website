import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "What's On" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/venue-hire", label: "Venue Hire" },
  { to: "/careers", label: "Careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b hairline-dark bg-charcoal/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-2xl font-semibold text-cream">
            Sandy's<span className="text-gold">111</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm transition-colors hover:text-gold ${
                    isActive ? "text-gold" : "text-paper-dim"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/book"
            className="hidden rounded-full bg-gold px-5 py-2 text-sm font-medium text-charcoal transition-all hover:shadow-glow md:inline-block"
          >
            Book a Table
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 bg-cream" />
            <span className="h-0.5 w-6 bg-cream" />
            <span className="h-0.5 w-6 bg-cream" />
          </button>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} links={LINKS} />
    </>
  );
}
