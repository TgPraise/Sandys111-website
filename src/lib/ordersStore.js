import { supabase, isSupabaseConfigured } from "./supabaseClient";

const LOCAL_KEY = "sandys111-orders-demo-v1";

function readLocal() {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocal(orders) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(orders));
}

const localBackend = {
  async getAll() {
    return readLocal().sort((a, b) => b.created_at.localeCompare(a.created_at));
  },
  async create(order) {
    const orders = readLocal();
    const newOrder = {
      id: "ord-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      fulfilled: false,
      created_at: new Date().toISOString(),
      ...order,
    };
    writeLocal([...orders, newOrder]);
    return newOrder;
  },
  async update(id, patch) {
    const orders = readLocal();
    const next = orders.map((o) => (o.id === id ? { ...o, ...patch } : o));
    writeLocal(next);
    return next.find((o) => o.id === id);
  },
};

const supabaseBackend = {
  async getAll() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async create(order) {
    const { data, error } = await supabase
      .from("orders")
      .insert({ fulfilled: false, ...order })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async update(id, patch) {
    const { data, error } = await supabase
      .from("orders")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

export const ordersStore = isSupabaseConfigured ? supabaseBackend : localBackend;
export const usingLocalOrdersStore = !isSupabaseConfigured;
