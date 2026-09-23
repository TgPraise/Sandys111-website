import { supabase, isSupabaseConfigured } from "./supabaseClient";

const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4MB — generous for a flyer, safe for localStorage in demo mode

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a flyer image and returns a URL to use in event.image.
 * - Supabase configured: uploads to the "event-flyers" storage bucket,
 *   returns a real public URL (see ADMIN.md for bucket setup).
 * - Otherwise: converts to a base64 data URL and returns that directly —
 *   works fine for the local demo store, no external storage needed.
 */
export async function uploadFlyerImage(file) {
  if (!file) return null;

  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Image is too large — please use a file under 4MB.");
  }

  if (isSupabaseConfigured) {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("event-flyers").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("event-flyers").getPublicUrl(path);
    return data.publicUrl;
  }

  return fileToDataUrl(file);
}
