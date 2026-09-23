import { rumCount, rumOrigins, cocktails } from "../../data/menu";
import Eyebrow from "../ui/Eyebrow";
import Price from "../ui/Price";
import CTAButton from "../ui/CTAButton";

export default function RumRoom() {
  const signatureCocktails = cocktails.slice(0, 3);
  return (
    <section className="border-t hairline-dark bg-charcoal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow>The rum room</Eyebrow>
            <p className="font-display text-[9rem] font-black leading-none text-gold sm:text-[11rem]">
              {rumCount.display}
            </p>
            <p className="-mt-2 font-display text-2xl text-cream">rums, poured properly.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {rumOrigins.map((o) => (
                <span
                  key={o}
                  className="rounded-full border hairline-dark px-3 py-1 text-xs text-paper-dim"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>

          <div className="divide-y hairline-dark border-y hairline-dark">
            {signatureCocktails.map((c) => (
              <div key={c.id} className="flex items-baseline justify-between gap-4 py-5">
                <h4 className="font-display text-lg text-cream">{c.name}</h4>
                <Price price={c.price} status={c.status} className="shrink-0 font-display text-gold-light" />
              </div>
            ))}
            <CTAButton href="/menu" variant="secondary" className="mt-6">
              Full drinks menu
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
