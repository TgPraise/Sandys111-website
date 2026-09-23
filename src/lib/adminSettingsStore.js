import { supabase, isSupabaseConfigured } from "./supabaseClient";

const LOCAL_KEY = "sandys111-admin-password";
const DEFAULT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "sandys111admin";

// -----------------------------------------------------------------------
// LOCAL (demo) — password override lives in this browser's localStorage
// only. Other browsers/devices still use the .env default until Supabase
// is connected.
// -----------------------------------------------------------------------
const localBackend = {
  async getPassword() {
    return localStorage.getItem(LOCAL_KEY) || DEFAULT_PASSWORD;
  },
  async setPassword(newPassword) {
    localStorage.setItem(LOCAL_KEY, newPassword);
  },
};

// -----------------------------------------------------------------------
// SUPABASE — real, shared password stored in a one-row `admin_settings`
// table so a change is immediately live for every admin, everywhere.
// See ADMIN.md for the table schema.
// -----------------------------------------------------------------------
const supabaseBackend = {
  async getPassword() {
    const { data, error } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "admin_password")
      .maybeSingle();
    if (error || !data) return DEFAULT_PASSWORD;
    return data.value;
  },
  async setPassword(newPassword) {
    const { error } = await supabase
      .from("admin_settings")
      .upsert({ key: "admin_password", value: newPassword });
    if (error) throw error;
  },
};

export const adminSettingsStore = isSupabaseConfigured ? supabaseBackend : localBackend;
