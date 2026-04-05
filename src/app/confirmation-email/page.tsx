"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'

function ConfirmationEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  const handleResendEmail = async () => {
    if (!email) return
    
    setLoading(true)
    setMessage('')

    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) {
        throw error
      }

      setMessage('✅ Email de confirmation renvoyé avec succès !')
    } catch (err: any) {
      console.error('Erreur resend email:', err)
      setMessage('❌ Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-[#8B4513]">Jay's Creations Design</h1>
          </Link>
        </div>

        {/* Card blanche */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Icône enveloppe */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#C8A96E] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              ✉️ Vérifiez votre boîte mail
            </h2>
          </div>

          {/* Message principal */}
          <div className="text-center mb-6">
            <p className="text-gray-700 mb-4">
              Merci pour votre inscription !
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Un email de confirmation vient d'être envoyé à <span className="font-medium text-[#8B4513]">{email || 'votre adresse email'}</span>.
              <br />
              Cliquez sur le lien dans cet email pour activer votre compte.
            </p>
            <p className="text-gray-500 text-xs mt-3">
              Pensez à vérifier vos spams si vous ne voyez rien.
            </p>
          </div>

          {/* Message de retour */}
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes('✅') 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Bouton renvoyer */}
          <button
            onClick={handleResendEmail}
            disabled={loading || !email}
            className="w-full bg-[#C8A96E] text-white py-3 rounded-lg font-medium hover:bg-[#B5955C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? 'Envoi en cours...' : 'Renvoyer l\'email de confirmation'}
          </button>

          {/* Lien retour */}
          <div className="text-center">
            <Link 
              href="/connexion" 
              className="text-sm text-[#8B4513] hover:text-[#6b3410] transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <ConfirmationEmailContent />
    </Suspense>
  )
}
