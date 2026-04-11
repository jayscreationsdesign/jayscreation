import { createClient } from '@supabase/supabase-js'

// Solution temporaire : configuration locale avec fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

export const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
