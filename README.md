# Sandy's 111 — Site Rebuild (Day 1)

Vite + React + Tailwind + Framer Motion + React Router.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
```

## What's built (Day 1 scope: Foundation + Home)

- Design tokens (charcoal / cream / aged-gold / muted botanical green),
  Fraunces + Inter type system — see `tailwind.config.js`
- Navbar (scroll-aware) + full-height mobile drawer nav
- Hero with the ~5s cinematic intro sequence: "Sandy's" drops in with an
  impact flash, then the "111" numerals assemble behind it (left slide,
  right slide, ground materialise), then eyebrow → headline → CTAs
  stagger in. Skips straight to the end state under `prefers-reduced-motion`.
- Homepage sections 2–7 per the spec: Three Reasons, Trust Bar (live
  open/closed status computed from real hours), What's On preview (with
  empty-state handling), From the Kitchen, The Rum Room, Split CTA
- Footer with privacy policy link + responsible-drinking/Challenge 25 line
- A real (if minimal) Privacy Policy page
- Routes for every other page in the spec (`/menu`, `/events`, `/about`,
  `/gallery`, `/private-hire`, `/book`, `/contact`) — currently friendly
  "coming soon" stubs so nothing 404s, to be filled in Day 2

## Where to edit content

- `src/data/site.js` — single source of truth for address, phone, email,
  hours, socials, map link. **Every field is marked `status: "pending"` or
  `"confirmed"`** — components check this and render an honest "confirming
  soon" state instead of ever showing a fake number. Once the client
  confirms something, flip its `status` to `"confirmed"` and fill in the
  value — it updates everywhere automatically.
- `src/data/events.js` — event objects (matches the shape needed for the
  future admin panel) + the recurring weekly-nights list.
- `src/data/menu.js` — sample dishes/cocktails for homepage layout, prices
  intentionally `null` until the client's real menu arrives (renders as
  "Menu TBC", never a guessed number).

## Still pending (blocking real launch, not this build)

Everything flagged `status: "pending"` in `site.js`: exact address
confirmation, phone/WhatsApp/email, opening hours, socials, and the real
menu + prices. All addressed the moment the client confirms them Tuesday.

## Not yet built (Day 2)

Menu, Events (+ detail), About, Gallery, Private Hire, Book, and Contact
pages themselves; the booking form; the events/booking admin panel
(password-gated per current decision).
