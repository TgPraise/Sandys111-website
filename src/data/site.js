// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for business details. Every page pulls from here —
// change a phone number once, it updates everywhere.
//
// Per the master spec's critical rule: never invent contact details. Fields
// below are marked `status: "confirmed"` only where independent sources
// agree (Companies House + CAMRA), or `status: "pending"` where sources
// conflict or nothing verified exists yet. Components should check `status`
// before rendering a tel:/mailto: link — see PendingNote in ui/.
// ---------------------------------------------------------------------------

export const site = {
  businessName: "Sandy's 111",
  legalName: "SANDYS111 LTD",
  companyNumber: "16970821",
  tagline: "Caribbean Bar • Kitchen • Rum Lounge",

  address: {
    status: "pending", // Companies House + CAMRA agree on this address, but
    // the live site shows a different one — confirm with client before launch.
    line1: "105-111 South Street",
    line2: "Romford, RM1 1NX",
    note: "Companies House & CAMRA agree on this address — differs from the current live site. Confirm with client.",
  },

  phone: {
    status: "pending", // Two conflicting numbers in research — do not publish either as final.
    value: null,
    note: "Outreach contact gave one number, Pubs Galore lists another — confirm the live number with the client Tuesday.",
  },

  whatsapp: {
    status: "pending",
    value: null,
    note: "Same as phone — confirm before launch.",
  },

  email: {
    status: "pending",
    value: null,
    note: "No verified business email found in research — confirm with client.",
  },

  hours: {
    status: "pending", // Best available source (CAMRA, updated Jul 2026) — live site shows a different schedule.
    note: "From CAMRA (last updated Jul 2026) — confirm final hours, especially late-night closing, with client.",
    schedule: [
      { days: "Monday – Thursday", time: "12:00 – 00:00" },
      { days: "Friday – Saturday", time: "12:00 – 03:00" },
      { days: "Sunday", time: "12:00 – 00:00" },
    ],
  },

  social: {
    instagram: { status: "pending", value: null },
    facebook: { status: "pending", value: null },
    tiktok: { status: "pending", value: null },
  },

  mapUrl: {
    status: "pending",
    value: "https://www.google.com/maps/search/?api=1&query=105-111+South+Street+Romford+RM1+1NX",
    note: "Search-query link until the client confirms the exact Google Business Profile pin.",
  },

  reviews: {
    status: "pending",
    rating: null, // Restaurant Guru cross-check showed 4.4/5 (~1,303 reviews) but section is cut from v1 per decision.
  },
};
