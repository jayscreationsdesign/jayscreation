// Solution d'authentification locale temporaire
export interface User {
  id: string
  email: string
  prenom: string
  nom: string
  created_at: string
}

export interface AuthResult {
  data?: { user?: User; session?: { access_token: string } }
  error?: { message: string }
}

// Simulation de base de données utilisateurs locale
const users: User[] = []

export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    // Simulation de recherche d'utilisateur
    const user = users.find(u => u.email === email)
    
    if (!user) {
      return { error: { message: 'Email ou mot de passe incorrect' } }
    }
    
    // Simulation de vérification de mot de passe
    if (password !== 'demo123') {
      return { error: { message: 'Email ou mot de passe incorrect' } }
    }
    
    return {
      data: {
        user,
        session: { access_token: 'demo-token-' + user.id }
      }
    }
  } catch (error: any) {
    return { error: { message: 'Erreur de connexion au serveur' } }
  }
}

export async function signUp(
  email: string, 
  password: string, 
  metadata: { prenom: string; nom: string }
): Promise<AuthResult> {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return { error: { message: 'Un compte existe déjà avec cette adresse email' } }
    }
    
    // Créer un nouvel utilisateur
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      prenom: metadata.prenom,
      nom: metadata.nom,
      created_at: new Date().toISOString()
    }
    
    users.push(newUser)
    
    // Envoyer email de bienvenue (simulation)
    console.log(`Email de bienvenue envoyé à ${email}`)
    
    return {
      data: {
        user: newUser,
        session: { access_token: 'demo-token-' + newUser.id }
      }
    }
  } catch (error: any) {
    return { error: { message: 'Erreur lors de la création du compte' } }
  }
}

export async function signOut(): Promise<void> {
  // Simulation de déconnexion
  console.log('Utilisateur déconnecté')
}

export async function getCurrentUser(): Promise<User | null> {
  // Simulation de récupération de l'utilisateur courant
  const token = typeof window !== 'undefined' ? localStorage.getItem('demo-token') : null
  
  if (token && token.startsWith('demo-token-')) {
    const userId = token.replace('demo-token-', '')
    return users.find(u => u.id === userId) || null
  }
  
  return null
}

export async function getUserProfile(): Promise<User | null> {
  return getCurrentUser()
}

export function translateAuthError(message: string): string {
  const translations: Record<string, string> = {
    'Invalid login credentials': 'Email ou mot de passe incorrect.',
    'Email not confirmed': 'Votre adresse email n\'a pas encore été confirmée.',
    'User already registered': 'Un compte existe déjà avec cette adresse email.',
    'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères.',
    'Failed to fetch': 'Erreur de connexion au serveur. Veuillez réessayer.',
    'Email rate limit exceeded': 'Trop de tentatives. Veuillez patienter quelques minutes.',
    'User not found': 'Aucun compte trouvé avec cette adresse email.',
    'Error sending confirmation email': 'Erreur d\'envoi de l\'email de confirmation.',
    'Signup requires a valid password': 'Veuillez saisir un mot de passe valide.',
    'AuthRetryableFetchError': 'Erreur de connexion au serveur. Veuillez réessayer.',
  }
  return translations[message] || message || 'Une erreur est survenue.'
}

export async function signInWithGoogle(): Promise<AuthResult> {
  return { error: { message: 'Connexion Google non disponible en mode démo' } }
}
