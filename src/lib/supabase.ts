import { supabaseClient } from './supabase-client'

// Utiliser le client Supabase déjà configuré avec les bonnes valeurs
export const supabase = supabaseClient
export const isSupabaseConfigured = true

export { createClient } from '@supabase/supabase-js'
