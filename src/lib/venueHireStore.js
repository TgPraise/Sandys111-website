import { supabase, isSupabaseConfigured } from "./supabaseClient";

const LOCAL_KEY = "sandys111-venue-hire-demo-v1";

function readLocal() {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocal(enquiries) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(enquiries));
}

const localBackend = {
  async getAll() {
    return readLocal().sort((a, b) => b.created_at.localeCompare(a.created_at));
  },
  async create(enquiry) {
    const enquiries = readLocal();
    const newEnquiry = {
      id: "vh-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      contacted: false,
      created_at: new Date().toISOString(),
      ...enquiry,
    };
    writeLocal([...enquiries, newEnquiry]);
    return newEnquiry;
  },
  async update(id, patch) {
    const enquiries = readLocal();
    const next = enquiries.map((e) => (e.id === id ? { ...e, ...patch } : e));
    writeLocal(next);
    return next.find((e) => e.id === id);
  },
};

const supabaseBackend = {
  async getAll() {
    const { data, error } = await supabase
      .from("venue_hire_enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async create(enquiry) {
    const { data, error } = await supabase
      .from("venue_hire_enquiries")
      .insert({ contacted: false, ...enquiry })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async update(id, patch) {
    const { data, error } = await supabase
      .from("venue_hire_enquiries")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

export const venueHireStore = isSupabaseConfigured ? supabaseBackend : localBackend;
export const usingLocalVenueHireStore = !isSupabaseConfigured;
