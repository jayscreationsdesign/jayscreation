import { supabase } from '@/lib/supabase'
import type { AuthError, User, AuthResponse } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  prenom: string | null
  nom: string | null
  telephone: string | null
  adresse_livraison: string | null
  ville: string | null
  code_postal: string | null
  created_at: string
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as AuthError }
  }
}

export async function signUp(email: string, password: string, metadata: { prenom: string; nom: string }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as AuthError }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error as AuthError }
  }
}

export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      // Ne pas lancer d'erreur, simplement retourner null si pas de session
      if (error.message?.includes('Auth session missing') || error.message?.includes('No session')) {
        return null
      }
      console.error('Error getting session:', error)
      return null
    }
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      // Ne pas lancer d'erreur, simplement retourner null si pas de session
      if (error.message?.includes('Auth session missing') || error.message?.includes('No session')) {
        return null
      }
      console.error('Error getting user:', error)
      return null
    }
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profils')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('profils')
      .update(profile)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as AuthError }
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null)
  })
}

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/compte`
      }
    })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as AuthError }
  }
}
