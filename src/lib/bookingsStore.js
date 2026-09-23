import { supabase, isSupabaseConfigured } from "./supabaseClient";

const LOCAL_KEY = "sandys111-bookings-demo-v1";

function readLocal() {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocal(bookings) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(bookings));
}

const localBackend = {
  async getAll() {
    return readLocal().sort((a, b) => b.created_at.localeCompare(a.created_at));
  },
  async create(booking) {
    const bookings = readLocal();
    const newBooking = {
      id: "bk-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      contacted: false,
      created_at: new Date().toISOString(),
      ...booking,
    };
    writeLocal([...bookings, newBooking]);
    return newBooking;
  },
  async update(id, patch) {
    const bookings = readLocal();
    const next = bookings.map((b) => (b.id === id ? { ...b, ...patch } : b));
    writeLocal(next);
    return next.find((b) => b.id === id);
  },
};

const supabaseBackend = {
  async getAll() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async create(booking) {
    const { data, error } = await supabase
      .from("bookings")
      .insert({ contacted: false, ...booking })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async update(id, patch) {
    const { data, error } = await supabase
      .from("bookings")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

export const bookingsStore = isSupabaseConfigured ? supabaseBackend : localBackend;
export const usingLocalBookingsStore = !isSupabaseConfigured;
