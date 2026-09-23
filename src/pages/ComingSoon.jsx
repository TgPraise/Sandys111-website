import { Link } from "react-router-dom";
import CTAButton from "../components/ui/CTAButton";

export default function ComingSoon({ title }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-gold">
        Coming very soon
      </span>
      <h1 className="mt-4 font-display text-4xl text-cream sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-md text-paper-dim">
        This page is being built as part of the site rebuild — check back
        shortly, or head back home in the meantime.
      </p>
      <div className="mt-8 flex gap-4">
        <CTAButton href="/" variant="primary">Back home</CTAButton>
      </div>
      <Link to="/book" className="mt-6 text-sm text-paper-dim underline hover:text-gold">
        Or book a table now →
      </Link>
    </section>
  );
}
