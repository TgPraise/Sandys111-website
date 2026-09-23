import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If the project hasn't connected Supabase yet, this is null and every
// caller (see lib/eventsStore.js) falls back to a localStorage-backed demo
// store instead of crashing.
export const supabase = url && key ? createClient(url, key) : null;

export const isSupabaseConfigured = Boolean(supabase);
