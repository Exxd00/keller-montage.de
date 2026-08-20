import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if credentials are available
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || 'contact-files';

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}

// Generate a unique file path
export function generateFilePath(fileName: string): string {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `uploads/${timestamp}-${randomId}-${sanitizedName}`;
}

// Get public URL for a file
export function getPublicUrl(filePath: string): string {
  if (!supabaseUrl) return '';
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;
}
