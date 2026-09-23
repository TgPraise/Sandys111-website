import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { mains, sides, cocktails } from "../data/menu";
import { site } from "../data/site";
import { useCart } from "../context/CartContext";
import { ordersStore } from "../lib/ordersStore";
import { sendNotificationEmail, isEmailJsConfigured } from "../lib/emailClient";
import Eyebrow from "../components/ui/Eyebrow";

const inputClass =
  "w-full border-b hairline-dark bg-transparent py-3 text-cream placeholder:text-paper-dim/50 focus:border-gold outline-none transition-colors";

export default function Order() {
  const { items, updateQty, removeItem, addItem, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const allItems = [...mains, ...sides, ...cocktails];
  const availableToAdd = allItems.filter((c) => !items.some((i) => i.id === c.id));

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    setError(false);

    const orderRecord = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      notes: form.notes || null,
      items,
    };

    // Always save the order so staff can see history in /admin, regardless
    // of whether email notification succeeds.
    try {
      await ordersStore.create(orderRecord);
    } catch {
      setSubmitting(false);
      setError(true);
      return;
    }

    const orderLines = items.map((i) => `${i.qty} × ${i.name}`).join("\n");
    const subjectText = `Delivery order request — ${form.name || "New order"}`;
    const messageText = `Order:\n${orderLines}\n\nName: ${form.name}\nPhone: ${form.phone}\nDelivery address: ${form.address}\nNotes: ${form.notes || "—"}\n\nPayment: on delivery`;

    if (isEmailJsConfigured) {
      try {
        await sendNotificationEmail({ subject: subjectText, message: messageText, replyTo: form.phone });
      } catch {
        const emailTo = site.email.status === "confirmed" ? site.email.value : "hello@sandys111.live";
        window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(messageText)}`;
      }
    } else {
      const emailTo = site.email.status === "confirmed" ? site.email.value : "hello@sandys111.live";
      window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(messageText)}`;
    }

    setSubmitting(false);
    setSent(true);
  };


  if (items.length === 0 && !sent) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <Eyebrow>Your order</Eyebrow>
        <h1 className="font-display text-3xl text-cream sm:text-4xl">Nothing in your order yet</h1>
        <p className="mt-3 max-w-sm text-paper-dim">
          Head back to the menu and hover a cocktail to add it.
        </p>
        <Link
          to="/menu"
          className="mt-8 rounded-full bg-gold px-7 py-3.5 font-medium text-charcoal transition-all hover:shadow-glow"
        >
          Back to menu
        </Link>
      </section>
    );
  }

  if (sent) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <Eyebrow>Order requested</Eyebrow>
        <h1 className="font-display text-3xl text-cream sm:text-4xl">
          Your order request is on its way to us
        </h1>
        <p className="mt-3 max-w-sm text-paper-dim">
          Your email app should be open with the order ready to send. We'll
          confirm availability, delivery time and total with you directly —
          payment is taken on delivery.
        </p>
        <Link
          to="/menu"
          className="mt-8 rounded-full border border-cream/25 px-7 py-3.5 font-medium text-cream transition-colors hover:border-gold hover:text-gold"
        >
          Order something else
        </Link>
      </section>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-24 pt-32">
      <Eyebrow>Your order</Eyebrow>
      <h1 className="font-display text-4xl text-cream sm:text-5xl">
        Add the details, we'll do the rest
      </h1>
      <p className="mt-3 text-paper-dim">
        Payment is taken on delivery — this just sends your order request through.
      </p>

      {/* cart */}
      <div className="mt-10 divide-y hairline-dark border-y hairline-dark">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between gap-4 py-4">
            <span className="font-display text-lg text-cream">{i.name}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(i.id, i.qty - 1)}
                aria-label={`Decrease ${i.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full border hairline-dark text-cream hover:border-gold hover:text-gold"
              >
                <Minus size={13} />
              </button>
              <span className="w-4 text-center text-cream">{i.qty}</span>
              <button
                onClick={() => updateQty(i.id, i.qty + 1)}
                aria-label={`Increase ${i.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full border hairline-dark text-cream hover:border-gold hover:text-gold"
              >
                <Plus size={13} />
              </button>
              <button
                onClick={() => removeItem(i.id)}
                aria-label={`Remove ${i.name}`}
                className="ml-1 text-paper-dim hover:text-pink-400"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-3 text-xs text-paper-dim underline hover:text-cream"
        >
          Clear order
        </button>
      )}

      {/* add more items */}
      {availableToAdd.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-3 text-xs uppercase tracking-widest text-paper-dim/60">
            Add more
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableToAdd.map((c) => (
              <button
                key={c.id}
                onClick={() => addItem(c)}
                className="rounded-full border hairline-dark px-4 py-2 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
              >
                + {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-sm border border-pink-400/40 bg-pink-400/5 px-4 py-3 text-sm text-pink-300">
          Something went wrong saving your order. Please try again.
        </div>
      )}

      {/* checkout form */}
      <form onSubmit={handleCheckout} className="mt-12 grid gap-6 sm:grid-cols-2">
        <input required placeholder="Name" className={inputClass} value={form.name} onChange={update("name")} />
        <input required type="tel" placeholder="Phone" className={inputClass} value={form.phone} onChange={update("phone")} />
        <input
          required
          placeholder="Delivery address"
          className={`sm:col-span-2 ${inputClass}`}
          value={form.address}
          onChange={update("address")}
        />
        <textarea
          placeholder="Anything else? (e.g. gate code, allergies)"
          rows={3}
          className={`sm:col-span-2 resize-none ${inputClass}`}
          value={form.notes}
          onChange={update("notes")}
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-full bg-gold py-4 font-medium text-charcoal transition-all hover:shadow-glow disabled:opacity-60 sm:col-span-2"
        >
          {submitting ? "Placing order…" : "Place Order — Pay on Delivery"}
        </button>
      </form>
    </div>
  );
}
