import { site } from "../data/site";

export default function Privacy() {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-24 pt-32 text-cream">
      <span className="text-xs uppercase tracking-[0.2em] text-gold">Legal</span>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-paper-dim">Last updated: {new Date().toLocaleDateString("en-GB")}</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-paper-dim">
        <div>
          <h2 className="mb-2 font-display text-xl text-cream">What we collect</h2>
          <p>
            When you submit a table booking or private hire enquiry, we
            collect your name, phone number, email address, and any
            details you choose to add (guest count, date, occasion,
            message). We don't collect anything beyond what you enter into
            the form.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-xl text-cream">
            How we use it
          </h2>
          <p>
            Your details are used only to process and confirm your
            booking or enquiry, and to contact you about it. We don't sell
            or share your information with third parties for marketing.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-xl text-cream">
            Where it's stored
          </h2>
          <p>
            Booking and enquiry submissions are processed via our booking
            form provider and stored securely for as long as needed to
            manage your visit, then removed on a routine basis.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-xl text-cream">
            Your rights
          </h2>
          <p>
            You can ask us what information we hold about you, or ask us
            to delete it, at any time — just get in touch using the
            details on our{" "}
            <a href="/contact" className="text-gold underline">
              Contact page
            </a>
            .
          </p>
        </div>

        <p className="text-xs text-paper-dim/60">
          {site.legalName}, Company No. {site.companyNumber}, {site.address.line1}, {site.address.line2}.
        </p>
      </div>
    </section>
  );
}
