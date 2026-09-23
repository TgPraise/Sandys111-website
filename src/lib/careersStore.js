import { supabase, isSupabaseConfigured } from "./supabaseClient";

const LOCAL_KEY = "sandys111-careers-demo-v1";

function readLocal() {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocal(applications) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(applications));
}

const localBackend = {
  async getAll() {
    return readLocal().sort((a, b) => b.created_at.localeCompare(a.created_at));
  },
  async create(application) {
    const applications = readLocal();
    const newApplication = {
      id: "app-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      reviewed: false,
      created_at: new Date().toISOString(),
      ...application,
    };
    writeLocal([...applications, newApplication]);
    return newApplication;
  },
  async update(id, patch) {
    const applications = readLocal();
    const next = applications.map((a) => (a.id === id ? { ...a, ...patch } : a));
    writeLocal(next);
    return next.find((a) => a.id === id);
  },
};

const supabaseBackend = {
  async getAll() {
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async create(application) {
    const { data, error } = await supabase
      .from("job_applications")
      .insert({ reviewed: false, ...application })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async update(id, patch) {
    const { data, error } = await supabase
      .from("job_applications")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

export const careersStore = isSupabaseConfigured ? supabaseBackend : localBackend;
export const usingLocalCareersStore = !isSupabaseConfigured;
