import { createClient } from '@supabase/supabase-js';

// Use demo credentials for development
const DEMO_SUPABASE_URL = 'https://xyzcompany.supabase.co';
const DEMO_SUPABASE_KEY = 'public-anon-key';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEMO_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEMO_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);