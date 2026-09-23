import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { mains, sides, cocktails } from "../data/menu";
import { useCart } from "../context/CartContext";
import Eyebrow from "../components/ui/Eyebrow";
import MenuRow from "../components/ui/MenuRow";
import CTAButton from "../components/ui/CTAButton";

const EASE = [0.22, 1, 0.36, 1];

function Column({ heading, items, hideHeading = false, orderable = false, onOrder }) {
  return (
    <div>
      <h3
        className={`mb-1 font-display text-2xl text-gold ${hideHeading ? "invisible" : ""}`}
      >
        {heading}
      </h3>
      <div className="divide-y divide-cream/5">
        {items.map((item) => (
          <MenuRow key={item.id} item={item} orderable={orderable} onOrder={onOrder} />
        ))}
      </div>
    </div>
  );
}

export default function Menu() {
  const [tab, setTab] = useState("food");
  const [stickyVisible, setStickyVisible] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOrder = (item) => {
    addItem(item);
    navigate("/order");
  };

  // split cocktails into two roughly-even columns for the drinks panel
  const half = Math.ceil(cocktails.length / 2);
  const cocktailsA = cocktails.slice(0, half);
  const cocktailsB = cocktails.slice(half);

  return (
    <div className="min-h-screen pb-32 pt-32">
      {/* intro */}
      <section className="mx-auto max-w-4xl px-6 text-center">
        <Eyebrow className="justify-center">The Menu</Eyebrow>
        <h1 className="font-display text-5xl text-cream sm:text-6xl">Island Flavours</h1>
        <p className="mx-auto mt-4 max-w-md text-paper-dim">
          Real Caribbean cooking and a serious rum-backed drinks list — full
          pricing confirmed soon. Hover any item to order it straight to your door.
        </p>

        {/* toggle */}
        <div className="mx-auto mt-10 inline-flex rounded-full border hairline-dark p-1">
          {["food", "drinks"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2 text-sm font-medium capitalize transition-colors ${
                tab === t ? "bg-gold text-charcoal" : "text-paper-dim hover:text-cream"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* panels */}
      <section className="mx-auto mt-16 max-w-4xl px-6">
        <AnimatePresence mode="wait">
          {tab === "food" ? (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid gap-14 sm:grid-cols-2"
            >
              <Column heading="Mains" items={mains} orderable onOrder={handleOrder} />
              <Column heading="Sides" items={sides} orderable onOrder={handleOrder} />
            </motion.div>
          ) : (
            <motion.div
              key="drinks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid gap-14 sm:grid-cols-2"
            >
              <Column heading="Cocktails" items={cocktailsA} orderable onOrder={handleOrder} />
              <Column
                heading="Cocktails"
                items={cocktailsB}
                hideHeading
                orderable
                onOrder={handleOrder}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* sticky book cta, appears once scrolled in */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t hairline-dark bg-charcoal/95 px-6 py-4 backdrop-blur-md"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
              <p className="hidden text-sm text-paper-dim sm:block">
                Like what you see?
              </p>
              <CTAButton href="/book" variant="primary" className="w-full sm:w-auto">
                Book a Table
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
