import { mains } from "../../data/menu";
import Eyebrow from "../ui/Eyebrow";
import Price from "../ui/Price";
import CTAButton from "../ui/CTAButton";


export default function FromTheKitchen() {
  const [hero, ...rest] = mains;

  return (
    <section className="border-t hairline-dark bg-cream py-24 text-ink">
      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow className="text-gold-deep">From the kitchen</Eyebrow>
        <h2 className="mb-12 font-display text-4xl font-medium md:text-5xl">
          Island flavours, made to order
        </h2>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="border-b hairline-light pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-cream-dim">
              <img
                src="images/food/curryed-goat.jpg"
                alt={hero.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-5 font-display text-2xl">{hero.name}</h3>
            <Price
              price={hero.price}
              status={hero.status}
              className="mt-3 block font-display text-lg"
            />
          </div>

          <div className="flex flex-col divide-y hairline-light">
            {rest.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between gap-4 py-6 first:pt-0"
              >
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-lg">{d.name}</h4>
                  {d.tags?.length > 0 && (
                    <span className="rounded-full border border-gold-deep/30 px-2 py-0.5 text-[10px] text-gold-deep">
                      {d.tags.join(" · ")}
                    </span>
                  )}
                </div>
                <Price
                  price={d.price}
                  status={d.status}
                  className="shrink-0 font-display"
                />
              </div>
            ))}
          </div>
        </div>

        <CTAButton href="/menu" variant="secondary-light" className="mt-10">
          View full menu
        </CTAButton>
      </div>
    </section>
  );
}
