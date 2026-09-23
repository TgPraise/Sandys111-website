import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE_WEIGHT = [0.16, 1, 0.3, 1];
const EASE_SMOOTH = [0.22, 1, 0.36, 1];

// Total time the mark holds on screen before the gate opens, once formed.
const HOLD_UNTIL = 3400; // ms

export default function IntroGate({ onComplete }) {
  const reduce = useReducedMotion();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reduce) {
      onComplete();
      return;
    }
    const t = setTimeout(() => setExiting(true), HOLD_UNTIL);
    return () => clearTimeout(t);
  }, [reduce, onComplete]);

  if (reduce) return null;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="gate"
          exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-charcoal"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
          <div className="pointer-events-none absolute inset-0 grain" />

          <div className="relative flex items-center justify-center">
            {/* 111 — background numerals */}
            <div className="absolute flex items-center justify-center gap-2 sm:gap-5">
              <motion.span
                initial={{ opacity: 0, x: -110 }}
                animate={{ opacity: 0.55, x: 0 }}
                transition={{ duration: 0.45, delay: 1.1, ease: EASE_SMOOTH }}
                className="font-logo text-[32vw] font-black italic leading-none text-gold-deep sm:text-[17rem]"
              >
                1
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 44, filter: "blur(14px)" }}
                animate={{ opacity: 0.55, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 1.9, ease: EASE_SMOOTH }}
                className="font-logo text-[32vw] font-black italic leading-none text-gold-deep sm:text-[17rem]"
              >
                1
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 110 }}
                animate={{ opacity: 0.55, x: 0 }}
                transition={{ duration: 0.45, delay: 1.5, ease: EASE_SMOOTH }}
                className="font-logo text-[32vw] font-black italic leading-none text-gold-deep sm:text-[17rem]"
              >
                1
              </motion.span>
            </div>

            {/* impact flash, timed to Sandy's landing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 0.6, 0], scale: 1.2 }}
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
              className="absolute h-56 w-56 rounded-full bg-gold/40 blur-3xl sm:h-80 sm:w-80"
            />

            {/* Sandy's — falls from top, lands in front, in the dedicated logo face */}
            <motion.span
              initial={{ opacity: 0, y: -170 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_WEIGHT }}
              className="relative font-logo text-6xl italic text-cream sm:text-8xl"
              style={{ fontWeight: 600 }}
            >
              Sandy's
            </motion.span>
          </div>

          {/* tiny tagline confirming the mark, appears once formed */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5, ease: EASE_SMOOTH }}
            className="absolute bottom-16 font-display text-xs uppercase tracking-[0.3em] text-paper-dim"
          >
            Caribbean Bar · Kitchen · Rum Lounge
          </motion.p>

          <button
            onClick={() => setExiting(true)}
            className="absolute bottom-6 right-6 text-xs uppercase tracking-wide text-paper-dim/60 transition-colors hover:text-cream"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
