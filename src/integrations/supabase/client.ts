import { createClient } from '@supabase/supabase-js';

// On utilise directement les variables d'environnement Vercel
const supabaseUrl = process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Les variables d'environnement Supabase sont manquantes.");
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);