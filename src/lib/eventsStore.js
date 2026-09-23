import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { events as seedEvents } from "../data/events";

const LOCAL_KEY = "sandys111-events-demo-v1";

// -----------------------------------------------------------------------
// LOCAL (demo) BACKEND — used automatically until Supabase is connected.
// Lives in this browser's localStorage only: admin changes here are
// visible on this device/browser, but NOT to other site visitors. It
// exists so the whole add/delete/sold-out flow is fully testable today.
// -----------------------------------------------------------------------
function readLocal() {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(seedEvents));
    return [...seedEvents];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [...seedEvents];
  }
}

function writeLocal(events) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(events));
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const localBackend = {
  async getAll() {
    return readLocal().sort((a, b) => a.date.localeCompare(b.date));
  },
  async create(event) {
    const events = readLocal();
    const id = event.id || slugify(event.title) + "-" + Date.now().toString(36);
    const slug = event.slug || slugify(event.title);
    const newEvent = {
      id,
      slug,
      lineup: [],
      fullDescription: event.shortDescription || "",
      bookingCta: "tickets",
      featured: false,
      soldOut: false,
      published: true,
      ...event,
    };
    writeLocal([...events, newEvent]);
    return newEvent;
  },
  async update(id, patch) {
    const events = readLocal();
    const next = events.map((e) => (e.id === id ? { ...e, ...patch } : e));
    writeLocal(next);
    return next.find((e) => e.id === id);
  },
  async remove(id) {
    const events = readLocal();
    writeLocal(events.filter((e) => e.id !== id));
  },
};

// -----------------------------------------------------------------------
// SUPABASE BACKEND — real, cross-visitor persistence. Activates
// automatically once VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set.
// Expects an `events` table — see /ADMIN.md for the exact schema.
// -----------------------------------------------------------------------
const supabaseBackend = {
  async getAll() {
    const { data, error } = await supabase.from("events").select("*").order("date");
    if (error) throw error;
    return data;
  },
  async create(event) {
    const id = event.id || slugify(event.title) + "-" + Date.now().toString(36);
    const slug = event.slug || slugify(event.title);
    const payload = {
      lineup: [],
      fullDescription: event.shortDescription || "",
      bookingCta: "tickets",
      featured: false,
      soldOut: false,
      published: true,
      ...event,
      id,
      slug,
    };
    const { data, error } = await supabase.from("events").insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, patch) {
    const { data, error } = await supabase
      .from("events")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) throw error;
  },
};

const backend = isSupabaseConfigured ? supabaseBackend : localBackend;

export const eventsStore = backend;
export const usingLocalDemoStore = !isSupabaseConfigured;
