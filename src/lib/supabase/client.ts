import { createClient } from '@supabase/supabase-js'

// Variables d'environnement Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Variables d\'environnement Supabase manquantes. ' +
    'NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont requis pour le chat. ' +
    'Le chat sera indisponible.'
  )
}

// Création du client Supabase
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types pour le chat
export interface ChatSession {
  id: string
  created_at: string
  visitor_id: string
  visitor_name?: string
  visitor_email?: string
}

export interface ChatMessage {
  id: string
  created_at: string
  session_id: string
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResult<T> {
  ok: boolean
  data?: T
  error?: string
}
