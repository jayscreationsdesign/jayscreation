import { supabase, isSupabaseConfigured } from '@/lib/supabase'
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
  console.log('Tentative création compte:', email)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { prenom: metadata.prenom, nom: metadata.nom },
    },
  })

  if (error) {
    console.error('SignUp error:', error.message)
    throw error
  }

  if (!data?.user?.id) {
    throw new Error('Le compte n\'a pas pu être créé. Veuillez réessayer.')
  }

  console.log('Compte créé avec succès:', data.user.id)

  // Créer le compte de fidélité (NON BLOQUANT)
  try {
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    await fetch(`${baseUrl}/api/loyalty/add-points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret': process.env.LOYALTY_API_SECRET || 'jcd-loyalty-secret',
      },
      body: JSON.stringify({
        userId: data.user.id,
        type: 'signup',
        points: 20,
        description: 'Création de compte',
        referenceId: data.user.id
      }),
    })
    console.log('Compte fidélité créé')
  } catch (loyaltyError) {
    console.error('Compte fidélité non créé (non bloquant):', loyaltyError)
  }

  // Envoyer notre email de bienvenue avec coupon BIENVENUE10 via Nodemailer/Ionos (NON BLOQUANT)
  // Cet email est EN PLUS de l'email de confirmation Supabase
  try {
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    await fetch(`${baseUrl}/api/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret': process.env.NEXT_PUBLIC_EMAIL_API_SECRET || 'jcd2026secret',
      },
      body: JSON.stringify({
        type: 'welcome',
        data: { prenom: metadata.prenom, email },
      }),
    })
    console.log('Email bienvenue envoyé')
  } catch (emailError) {
    console.error('Email bienvenue non envoyé (non bloquant):', emailError)
  }

  // Notifier l'admin (NON BLOQUANT)
  try {
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    await fetch(`${baseUrl}/api/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret': process.env.NEXT_PUBLIC_EMAIL_API_SECRET || 'jcd2026secret',
      },
      body: JSON.stringify({
        type: 'signup-notification',
        data: {
          prenom: metadata.prenom,
          nom: metadata.nom,
          email,
          date: new Date().toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
          }),
        },
      }),
    })
    console.log('Notification admin envoyée')
  } catch (emailError) {
    console.error('Notification admin non envoyée (non bloquant):', emailError)
  }

  return data
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
