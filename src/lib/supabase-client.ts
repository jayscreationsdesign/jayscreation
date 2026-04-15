import { createClient } from '@supabase/supabase-js';

// Variables d'environnement Supabase avec fallbacks pour développement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHRqb214bmNoZmZxcWFhZnhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MjM1NDAsImV4cCI6MjA5MDA5OTU0MH0.gaglop45XZ9EDRmQACbiDTSWw5FmU7yrMrh24aUxdaI';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHRqb214bmNoZmZxcWFhZnhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUyMzU0MCwiZXhwIjoyMDkwMDk5NTQwfQ.g7G3SvP8Q12otYv7yiKjeBARU1DHxvKJ3rKvLqScnzk';

// Validation des variables d'environnement
if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required');
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required');
}

// Client Supabase pour le côté serveur (accès complet)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Client Supabase pour le côté client (accès limité)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabaseAdmin;
