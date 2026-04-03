import { createClient } from '@supabase/supabase-js';

// Configuration Supabase avec vos vraies clés
const supabaseUrl = 'https://rtttjmonchffqqaafxh.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHRqb214bmNoZmZxcWFhZnhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUyMzU0MCwiZXhwIjoyMDkwMDk5NTQwfQ.g7G3SvP8Q12otYv7yiKjeBARU1DHxvKJ3rKvLqScnzk';

// Client Supabase pour le côté serveur (accès complet)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Client Supabase pour le côté client (accès limité)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHRqb214bmNoZmZxcWFhZnhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MjM1NDAsImV4cCI6MjA5MDA5OTU0MH0.gaglop45XZ9EDRmQACbiDTSWw5FmU7yrMrh24aUxdaI'
);

export default supabaseAdmin;
