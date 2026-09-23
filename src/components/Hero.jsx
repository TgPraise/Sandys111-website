import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "./ui/CTAButton";
import TypingWord from "./ui/TypingWord";

const EASE_SMOOTH = [0.22, 1, 0.36, 1];

// Triptych background — order matters: party, food, drinks.
const HERO_IMAGES = [
  { src: "/images/hero-party.jpg", alt: "The dancefloor at Sandy's 111" },
  { src: "/images/hero-food.png", alt: "Sharing plates at Sandy's 111" },
  { src: "/images/hero-drinks.jpg", alt: "Bottle service at Sandy's 111" },
];

export default function Hero({ ready = true }) {
  const reduce = useReducedMotion();
  const show = reduce || ready;

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: EASE_SMOOTH },
  });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal pt-20">
      {/* background photo triptych — party / food / drinks */}
      <div className="absolute inset-0 grid grid-cols-3 divide-x divide-charcoal/60">
        {HERO_IMAGES.map((img) => (
          <div key={img.src} className="relative h-full w-full overflow-hidden">
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* unify the three shots' varied colour grading under one warm tone */}
      <div className="pointer-events-none absolute inset-0 bg-charcoal/20 mix-blend-multiply" />
      {/* scrim for legibility — warm dark gradient, not a flat block */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/35 to-charcoal" />
      <div className="pointer-events-none absolute inset-0 bg-charcoal/10" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative z-10 flex max-w-2xl flex-col items-start px-8 text-left">
        <motion.span
          {...reveal(0)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs text-gold-light"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          The vibes start here.
        </motion.span>

        <h1 className="font-display text-4xl font-medium leading-[1.08] text-cream sm:text-6xl lg:text-7xl">
          {["Romford,", "meet your new", "favourite night out."].map((line, i) => (
            <motion.span key={line} {...reveal(0.15 + i * 0.15)} className="block">
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.div
          {...reveal(0.65)}
          className="mt-5 font-display text-xl text-gold-light sm:text-2xl lg:text-4xl"
        >
          <TypingWord startDelay={reduce ? 0 : 700} />
        </motion.div>

        <motion.div
          {...reveal(0.85)}
          className="mt-9 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          <CTAButton href="/book" variant="primary">
            Book a Table
          </CTAButton>
          <CTAButton href="/events" variant="secondary">
            What's On
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
