export default function AdminOrderRow({ order, onToggleFulfilled }) {
  const submitted = new Date(order.created_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b hairline-dark py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-cream">{order.name}</p>
          <p className="mt-1 text-xs text-paper-dim">
            {order.items?.map((i) => `${i.qty} × ${i.name}`).join(", ")}
          </p>
          <p className="mt-1 text-xs text-paper-dim/70">
            {order.phone} · {order.address}
          </p>
          {order.notes && (
            <p className="mt-1 max-w-md text-xs italic text-paper-dim/70">"{order.notes}"</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-paper-dim/60">Submitted {submitted}</span>
          <label className="flex items-center gap-2 text-xs text-paper-dim">
            <input
              type="checkbox"
              checked={!!order.fulfilled}
              onChange={(e) => onToggleFulfilled(order.id, e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            Delivered
          </label>
        </div>
      </div>
    </div>
  );
}
