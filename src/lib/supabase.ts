import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Créer un client factice côté SSR pour éviter les erreurs de build
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : {
      auth: {
        signInWithPassword: async () => ({ data: null, error: { message: "Supabase non configuré" } }),
        signUp: async () => ({ data: null, error: { message: "Supabase non configuré" } }),
        signInWithOAuth: async () => ({ data: null, error: { message: "Supabase non configuré" } }),
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: null } })
      },
      from: () => ({
        select: () => ({
          eq: () => ({ single: () => ({ data: null, error: null }) }),
          order: () => ({ data: [], error: null })
        })
      })
    } as any

export const isSupabaseConfigured = 
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
