import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNav({ open, onClose, links }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col bg-charcoal md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-display text-2xl font-semibold text-cream">
              Sandy's<span className="text-gold">111</span>
            </span>
            <button onClick={onClose} aria-label="Close menu">
              <X className="text-cream" size={26} />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-2 px-6">
            <Link
              to="/book"
              onClick={onClose}
              className="mb-6 w-full rounded-full bg-gold py-4 text-center text-lg font-medium text-charcoal"
            >
              Book a Table
            </Link>

            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={onClose}
                className={`border-b hairline-dark py-4 font-display text-2xl ${
                  l.to === "/events" ? "text-gold" : "text-cream"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
