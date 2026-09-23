import { Plus } from "lucide-react";
import Price from "./Price";

export default function MenuRow({ item, orderable = false, onOrder }) {
  const content = (
    <>
      <span className="whitespace-nowrap font-display text-lg text-cream transition-colors group-hover:text-gold sm:text-xl">
        {item.name}
      </span>
      {item.tags?.length > 0 && (
        <span className="shrink-0 -translate-y-0.5 rounded-full border border-gold/30 px-2 py-0.5 text-[10px] text-gold-light">
          {item.tags.join(" · ")}
        </span>
      )}
      <span
        aria-hidden="true"
        className="mx-1 flex-1 border-b border-dotted border-cream/20"
      />
      <Price price={item.price} status={item.status} className="shrink-0 font-display text-base" />
    </>
  );

  if (!orderable) {
    return <div className="group flex items-baseline gap-3 py-3.5">{content}</div>;
  }

  return (
    <button
      onClick={() => onOrder?.(item)}
      className="group relative flex w-full items-baseline gap-3 py-3.5 text-left"
    >
      {content}

      {/* hover/tap affordance — order this drink. Always faintly visible on
          touch devices (no hover state there), fully revealed on hover/focus. */}
      <span
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-charcoal opacity-70 shadow-glow transition-all duration-200 sm:translate-x-2 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-x-0 sm:group-focus-visible:opacity-100"
      >
        <Plus size={13} />
        Order
      </span>
    </button>
  );
}
