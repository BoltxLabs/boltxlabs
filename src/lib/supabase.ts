import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create client if environment variables are properly configured
export const supabase = supabaseUrl && supabaseKey && supabaseUrl.startsWith('https://') 
  ? createClient(supabaseUrl, supabaseKey)
  : null;