"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, signUp, signInWithGoogle } from '@/lib/auth'
import { translateError } from '@/lib/error-messages'
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'

export default function ConnexionPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'admin'>('signin')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  // États pour le formulaire de connexion
  const [signinEmail, setSigninEmail] = useState('')
  const [signinPassword, setSigninPassword] = useState('')

  // États pour le formulaire admin
  const [adminEmail, setAdminEmail] = useState('admin@jayscreationsdesign.fr')
  const [adminPassword, setAdminPassword] = useState('')

  // États pour le formulaire d'inscription
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const result = await signIn(signinEmail, signinPassword)
    
    if (result.error) {
      console.error('Login error:', result.error)
      setError('Impossible de se connecter, réessayez plus tard.')
      setLoading(false)
      return
    }
    
    // si pas d'erreur, continuer le flux de connexion
    setSuccess('Connexion réussie ! Redirection...')
    
    // Redirection vers le compte client
    window.location.replace('/compte')
    
    setLoading(false)
  }

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    console.log('Tentative connexion admin:', adminEmail)
    const result = await signIn(adminEmail, adminPassword)
    
    if (result.error) {
      console.error('Admin login error:', result.error)
      setError('Identifiants admin incorrects')
      setLoading(false)
      return
    }
    
    console.log('Connexion admin réussie, user:', result.data?.user?.email)
    // si pas d'erreur, continuer le flux de connexion
    setSuccess('Connexion admin réussie ! Redirection...')
    
    // SOLUTION DÉFINITIVE : Redirection immédiate et forcée
    console.log('DÉMARRAGE REDIRECTION ADMIN IMMÉDIATE')
    
    // Méthode 1 : Redirection immédiate
    window.location.href = '/admin'
    
    // Méthode 2 : Backup après 100ms (au cas où)
    setTimeout(() => {
      if (window.location.pathname !== '/admin') {
        console.log('Backup: Redirection forcée vers /admin')
        window.location.replace('/admin')
      }
    }, 100)
    
    // Méthode 3 : Dernier recours après 500ms
    setTimeout(() => {
      if (window.location.pathname !== '/admin') {
        console.log('Dernier recours: Redirection absolue')
        window.open('/admin', '_self')
      }
    }, 500)
    
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (signupPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    if (signupPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      setLoading(false)
      return
    }

    try {
      const data = await signUp(signupEmail, signupPassword, { prenom, nom })
      
      // Déconnecter immédiatement l'utilisateur pour qu'il ne puisse pas accéder au compte
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      await supabase.auth.signOut()
      
      // Rediriger vers la page de confirmation
      router.push(`/confirmation-email?email=${encodeURIComponent(signupEmail)}`)
    } catch (err: any) {
      setError(translateError(err.message) || 'Erreur lors de la création du compte')
    }
    
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    const result = await signInWithGoogle()
    
    if (result.error) {
      setError(translateError(result.error.message) || 'Erreur lors de la connexion avec Google')
    } else {
      // Google OAuth fonctionne directement, pas besoin de confirmation email
      router.push('/compte')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-[#8B4513]">Jay's Creations Design</h1>
          </Link>
          <p className="text-gray-600 mt-2">Votre espace client personnalisé</p>
        </div>

        {/* Card blanche */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Onglets */}
          <div className="flex mb-6 border-b border-[#8B4513]">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 pb-3 font-medium transition-colors ${
                activeTab === 'signin'
                  ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
                  : 'text-gray-500 hover:text-[#6b3410]'
              }`}
            >
              Se connecter
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 pb-3 font-medium transition-colors ${
                activeTab === 'signup'
                  ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
                  : 'text-gray-500 hover:text-[#6b3410]'
              }`}
            >
              Créer un compte
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 pb-3 font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
                  : 'text-gray-500 hover:text-[#6b3410]'
              }`}
            >
              Administration
            </button>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Message de succès */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Formulaire de connexion */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={signinEmail}
                    onChange={(e) => setSigninEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signinPassword}
                    onChange={(e) => setSigninPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                <div className="text-right">
                  <a href="/mot-de-passe-oublie" className="text-sm text-[#C8A96E] hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B4513] text-white py-3 rounded-lg font-medium hover:bg-[#6b3410] hover:text-[#D4A574] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          )}

          {/* Formulaire d'inscription */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                      placeholder="Jean"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                      placeholder="Dupont"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B4513] text-white py-3 rounded-lg font-medium hover:bg-[#6b3410] hover:text-[#D4A574] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Création...' : 'Créer un compte'}
              </button>

                          </form>
          )}

          {/* Formulaire admin */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Admin
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                    placeholder="admin@jayscreationsdesign.fr"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe Admin
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                    placeholder="Mot de passe admin"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B4513] text-white py-3 rounded-lg font-medium hover:bg-[#6b3410] hover:text-[#D4A574] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter à l\'admin'}
              </button>
            </form>
          )}

          {/* Séparateur */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Bouton Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-5.91 0-2.2-.4-4.25-1.06-5.91l3.57-2.77C17.46 1.98 14.97 1 12 1z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 9.03 1 6.58 2.09 4.59 3.64l3.15 3.15c1.15-1.08 1.84-2.59 1.84-4.21z"/>
            </svg>
            Continuer avec Google
          </button>

          {/* Lien vers la boutique */}
          <div className="text-center mt-6">
            <Link href="/boutique" className="text-[#8B4513] hover:underline text-sm">
              Retour à la boutique
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
