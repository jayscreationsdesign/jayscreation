import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Sécurisation de l'initialisation - ne pas throw si variables manquantes
if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Variables Supabase manquantes - utilisation du mode dégradé")
}

// Client sécurisé avec valeurs placeholder pour éviter les crashs
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "placeholder-key"
)

export const isSupabaseConfigured = 
  !!supabaseUrl && !!supabaseKey
