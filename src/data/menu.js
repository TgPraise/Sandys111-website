// ---------------------------------------------------------------------------
// The real menu. Prices are `null` + `status: "pending"` until the client
// confirms final pricing — renders as "Menu TBC" (see ui/Price.jsx), never
// a guessed number. No tasting descriptions are invented for house-original
// items (several of these names are clearly Sandy's-specific creations,
// not classics we could safely describe).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// The real menu. Mains and most sides now have confirmed prices, pulled
// directly from the physical venue menu (photo supplied). Anything without
// a clean price match stays `null` + `status: "pending"` — renders as
// "Menu TBC" (see ui/Price.jsx), never a guessed number. No tasting
// descriptions are invented for house-original cocktails (several of these
// names are clearly Sandy's-specific creations, not classics we could
// safely describe).
// ---------------------------------------------------------------------------

export const mains = [
  { id: "curry-goat", name: "Curry Goat", price: "£15.25", status: "confirmed", tags: [] },
  { id: "jerk-chicken", name: "Jerk Chicken", price: "£13.95", status: "confirmed", tags: [] },
  { id: "escovitch-fish", name: "Escovitch Fish", price: "£17.95", status: "confirmed", tags: ["P"] },
  { id: "ital-bowl", name: "Ital Bowl with Roti", price: "£11.25", status: "confirmed", tags: ["VG"] },
];

export const sides = [
  { id: "mac-cheese", name: "Mac & Cheese", price: "£4.25", status: "confirmed", tags: ["V"] },
  { id: "coleslaw", name: "Coleslaw", price: "£2.25", status: "confirmed", tags: [] },
  { id: "plantain", name: "Plantain (6)", price: "£2.25", status: "confirmed", tags: ["V"] },
  { id: "saltfish-fritters", name: "Saltfish Fritters (6)", price: "£4.95", status: "confirmed", tags: ["P"] },
  // no clean price match on the photo (closest is "Bacon & Cheese Loaded
  // Fries" £5.95, which may or may not be the same item) — left pending
  { id: "mac-cheese-loaded", name: "Mac & Cheese Loaded", price: null, status: "pending", tags: [] },
  { id: "fries", name: "Fries", price: null, status: "pending", tags: [] },
  { id: "fried-dumplings", name: "Fried Dumplings (2)", price: "£2.25", status: "confirmed", tags: ["V"] },
  { id: "festivals", name: "Festivals (2)", price: "£2.75", status: "confirmed", tags: ["V"] },
];

export const cocktails = [
  { id: "pornstar-martini", name: "Pornstar Martini", price: null, status: "pending" },
  { id: "sex-on-the-beach", name: "Sex On The Beach", price: null, status: "pending" },
  { id: "hurricane", name: "Hurricane", price: null, status: "pending" },
  { id: "sarti-spritz", name: "Sarti Spritz", price: null, status: "pending" },
  { id: "espresso-martini", name: "Espresso Martini", price: null, status: "pending" },
  { id: "woo-woo", name: "Woo Woo", price: null, status: "pending" },
  { id: "purple-disco-machine", name: "Purple Disco Machine", price: null, status: "pending" },
  { id: "great-godfather", name: "Great Godfather", price: null, status: "pending" },
  { id: "aperol-spritz", name: "Aperol Spritz", price: null, status: "pending" },
  { id: "pina-colada", name: "Piña Colada", price: null, status: "pending" },
  { id: "zombie", name: "Zombie", price: null, status: "pending" },
  { id: "sea-you-later", name: "Sea You Later", price: null, status: "pending" },
  { id: "beach-babes", name: "Beach Babes", price: null, status: "pending" },
  { id: "mojito", name: "Mojito", price: null, status: "pending" },
  { id: "long-island-iced-tea", name: "Long Island Iced Tea", price: null, status: "pending" },
];

export const rumOrigins = ["Jamaica", "Trinidad", "Barbados", "Guyana", "Beyond"];

export const rumCount = {
  status: "pending", // "30+" appears in current positioning — confirm current count with client
  display: "30+",
};
