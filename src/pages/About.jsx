import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "../data/site";
import Eyebrow from "../components/ui/Eyebrow";
import CTAButton from "../components/ui/CTAButton";

const PILLARS = [
  {
    title: "Rum",
    desc: "A serious rum shelf spanning Jamaica, Trinidad, Barbados, Guyana and beyond — served neat, in flights, or built into a proper punch.",
  },
  {
    title: "Food",
    desc: "Jerk, curry goat, ackee & saltfish and other island comfort food, cooked properly — not a steam-tray buffet.",
  },
  {
    title: "Music",
    desc: "Reggae, soca, dancehall, bashment and Afrobeats, plus live nights and karaoke — the room is rarely quiet for long.",
  },
  {
    title: "People",
    desc: "A warm, welcoming space for after-work drinks, family dinners, birthdays and late-night celebrations alike.",
  },
];

// A dish/glass photo revealed with a scroll-linked clip-path wipe —
// distinct from the load-triggered stagger used on Home/Hero.
function RevealImage({ src, alt }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
      className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-charcoal-800"
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  );
}

function TimelineSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const beats = [
    {
      label: "The concept",
      text: "Sandy's 111 was built around one idea: a Caribbean bar and rum lounge that takes both halves of that seriously — a genuinely deep rum shelf, and a kitchen that isn't an afterthought to the bar.",
    },
    {
      label: "The room",
      text: "Warm, dark, and built for a long night — a space equally suited to a quiet rum flight after work or a full dancehall night on a Saturday.",
    },
    {
      label: "Right now",
      text: "Newly open in Romford, with a full events calendar already running and the kitchen and bar both firing every night of the week.",
    },
  ];

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl px-6">
      <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-cream/10 sm:left-[7px]" />
      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gold sm:left-[7px]"
      />
      <div className="flex flex-col gap-14">
        {beats.map((b) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-8"
          >
            <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-gold bg-charcoal" />
            <p className="text-xs uppercase tracking-widest text-gold">{b.label}</p>
            <p className="mt-2 max-w-lg text-paper-dim">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const mapQuery = encodeURIComponent(`${site.address.line1} ${site.address.line2}`);

  return (
    <div className="pb-24 pt-32">
      {/* opening block */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>About</Eyebrow>
          <h1 className="font-display text-5xl text-cream sm:text-6xl">
            Proper Caribbean.
            <br />
            Right in Romford.
          </h1>
          <p className="mt-6 max-w-md text-paper-dim">
            Sandy's 111 is a Caribbean bar, kitchen and rum lounge — built
            around the idea that the drinks, the food, and the music all
            deserve equal billing, not one propping up the other two.
          </p>
        </div>
        <RevealImage src="/images/hero-drinks.jpg" alt="Bottle service at Sandy's 111" />
      </section>

      {/* four pillars */}
      <section className="mt-28 border-t hairline-dark bg-charcoal py-20">
        <div className="mx-auto max-w-6xl px-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-6 border-b hairline-dark py-7 first:pt-0 last:border-none"
            >
              <span className="mt-1 font-display text-lg text-gold/70 transition-colors group-hover:text-pink-400">
                ✻
              </span>
              <div>
                <h3 className="font-display text-xl text-cream transition-colors group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-paper-dim">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* venue story, scroll-progress timeline */}
      <section className="border-t hairline-dark py-24">
        <div className="mx-auto mb-14 max-w-2xl px-6">
          <Eyebrow>Our story</Eyebrow>
          <h2 className="font-display text-4xl text-cream sm:text-5xl">Still being written</h2>
        </div>
        <TimelineSection />
      </section>

      {/* find us / map */}
      <section className="border-t hairline-dark bg-charcoal-800 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Find us</Eyebrow>
            <h2 className="font-display text-4xl text-cream sm:text-5xl">Come say hello</h2>
            <p className="mt-4 text-paper-dim">
              {site.address.line1}, {site.address.line2}
              {site.address.status === "pending" && (
                <span className="mt-1 block text-xs italic text-paper-dim/60">
                  Confirming our exact address with the team — map shows our
                  best available location for now.
                </span>
              )}
            </p>
            <a
              href={site.mapUrl.value}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm text-gold underline decoration-gold/40 underline-offset-4 hover:text-gold-light"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border hairline-dark">
            <iframe
              title="Sandy's 111 location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full w-full grayscale-[20%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* close */}
      <section className="border-t hairline-dark py-24 text-center">
        <h2 className="font-display text-4xl text-cream sm:text-5xl">
          Ready for a night at Sandy's?
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <CTAButton href="/book" variant="primary">Book a Table</CTAButton>
          <CTAButton href="/events" variant="secondary">See What's On</CTAButton>
        </div>
      </section>
    </div>
  );
}
