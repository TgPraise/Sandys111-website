import { site } from "../../data/site";
import { getOpenStatus } from "../../lib/openStatus";

export default function TrustBar() {
  const status = getOpenStatus(site.hours.schedule);

  return (
    <section className="border-t hairline-dark bg-charcoal-800 py-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 text-center text-sm text-paper-dim">
        <span className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status.open ? "bg-olive-light" : "bg-paper-dim/40"
            }`}
          />
          {status.open ? `Open now · until ${status.closesAt}` : "Closed now"}
          {site.hours.status === "pending" && (
            <span className="text-xs text-paper-dim/60">(hours pending confirmation)</span>
          )}
        </span>
        <span className="hidden h-3 w-px bg-cream/15 sm:block" />
        <span>{site.address.line2}</span>
        <span className="hidden h-3 w-px bg-cream/15 sm:block" />
        <span>{site.legalName} · Company No. {site.companyNumber}</span>
      </div>
    </section>
  );
}
