import { supabase, isSupabaseConfigured } from "./supabaseClient";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB — generous for a CV
const BUCKET = "cv-uploads";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a CV and returns { url, fileName }.
 * - Supabase configured: uploads to the "cv-uploads" storage bucket,
 *   returns a real (public — see ADMIN.md caveat) URL.
 * - Otherwise: converts to a base64 data URL — works for the local demo
 *   store, no external storage needed, but not sent by email (too large
 *   for a mailto body) — the admin panel is where it's viewed in that mode.
 */
export async function uploadCV(file) {
  if (!file) return null;

  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("File is too large — please use a file under 5MB.");
  }

  if (isSupabaseConfigured) {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return { url: data.publicUrl, fileName: file.name };
  }

  const dataUrl = await fileToDataUrl(file);
  return { url: dataUrl, fileName: file.name };
}
