// ---------------------------------------------------------------------------
// Event objects. Shape matches the spec's recommended model so this can move
// straight into a Supabase table for the admin (post/delete/sold-out) build.
// Tickets are always sold on an external site — ticketUrl points out.
// ---------------------------------------------------------------------------

export const events = [
  {
    id: "dapper-laughs",
    slug: "sitdown-for-standup",
    date: "2026-09-24",
    endDate: "2026-09-24",
    title: "SitDown for Standup",
    category: "Comedy",
    time: "7:30 PM – 10:00 PM",
    lastEntry: null,
    age: null,
    image: "/images/events/dapper-laughs.webp",
    shortDescription:
      "Sandy's 111 presents a stand-up night headlined by Daniel O'Reilly (Dapper Laughs), hosted by Danny Wren.",
    fullDescription:
      "A full line-up of comedy at Sandy's 111: host Danny Wren, headliner Daniel O'Reilly, plus Terry Gargin, Crazy Ginger Cabbie, Lyn Evans, Adam Cleveland and Heath Muirhead.",
    lineup: [
      "Danny Wren (Host)",
      "Daniel O'Reilly (Headliner)",
      "Terry Gargin",
      "Crazy Ginger Cabbie",
      "Lyn Evans",
      "Adam Cleveland",
      "Heath Muirhead",
    ],
    ticketUrl:
      "https://www.eventbrite.com/e/dapper-laughs-coming-to-romford-tickets-1998158075593",
    bookingCta: "tickets",
    featured: false,
    soldOut: false,
    published: true,
  },
  {
    id: "bad-and-boujee",
    slug: "bad-and-boujee-autumn-affair",
    date: "2026-09-25",
    endDate: "2026-09-25",
    title: "Bad & Boujee — 'A Autumn Affair'",
    category: "Nightlife",
    time: "9:00 PM – 3:00 AM",
    lastEntry: null,
    age: null,
    image: "/images/events/bad-and-boujee.jpg",
    shortDescription:
      "Promiscuous Promotions presents the return of Bad & Boujee for an Autumn Affair party.",
    fullDescription:
      "Promiscuous Promotions brings Bad & Boujee back to Sandy's 111 for an Autumn Affair night. More details to follow — follow @Promiscuousinfo for updates.",
    lineup: [],
    ticketUrl:
      "https://allevents.in/romford/bad-and-boujee-party-its-a-autumn-affair/100001998122450036",
    bookingCta: "tickets",
    featured: false,
    soldOut: false,
    published: true,
  },
  {
    id: "mango-mayhem-round-3",
    slug: "mango-mayhem-round-3-kisstory",
    date: "2026-09-26",
    endDate: "2026-09-26",
    title: "Mango Mayhem Round 3 — KISSTORY Edition",
    category: "Nightlife",
    time: "9:00 PM – 3:00 AM",
    lastEntry: "2:00 AM",
    age: "18+",
    image: "/images/events/mango-mayhem.jpg",
    shortDescription:
      "KISSTORY-edition dancehall and bashment night — resident DJs all night long.",
    fullDescription:
      "Sandy's 111 turns up the heat for round three of Mango Mayhem, a KISSTORY-themed night of dancehall, bashment and Afrobeats. Doors from 9pm, last entry 2am.",
    lineup: [],
    ticketUrl:
      "https://www.skiddle.com/whats-on/Romford/Sandys111/Mango-Mayhem-Round-3-KISSTORY-EDITION--Sandys-111/42682640/",
    bookingCta: "tickets",
    featured: true, // the "make this one hot" event — gets highlighted treatment
    soldOut: false,
    published: true,
  },
  {
    id: "old-skool-vibes",
    slug: "old-skool-vibes-with-ty",
    date: "2026-11-21",
    endDate: "2026-11-21",
    title: "Old Skool Vibes with Ty",
    category: "Live",
    time: "8:00 PM – 2:00 AM",
    lastEntry: null,
    age: null,
    image: "/images/events/old-skool-vibes.jpg",
    shortDescription: "A night of old-skool classics with Ty on the decks.",
    fullDescription:
      "Old Skool Vibes returns to Sandy's 111 with Ty bringing the throwback classics all night long.",
    lineup: ["Ty"],
    ticketUrl: "https://www.fatsoma.com/e/1ax58ifz/old-skool-vibes-with-ty",
    bookingCta: "tickets",
    featured: false,
    soldOut: false,
    published: true,
  },
];

// Recurring weekly nights the venue runs — separate from the one-off
// ticketed events above, shown as a lighter-weight "regulars" list. Pending
// final confirmation of the actual weekly programme from the client.
export const weeklyNights = [
  { day: "Thu", title: "Rum Club & Quiz Night", time: "From 8pm", category: "Food & Drink" },
  { day: "Fri", title: "Dancehall & Bashment Fridays", time: "From 9pm", category: "Nightlife" },
  { day: "Sat", title: "Saturday Social", time: "From 12pm", category: "Food & Music" },
  { day: "Sun", title: "Lovers Rock & Karaoke", time: "From 6pm", category: "Live" },
];
