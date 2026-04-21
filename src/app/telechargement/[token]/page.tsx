'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Download, AlertCircle, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface DownloadToken {
  id: string
  order_id: string
  token: string
  fichier_url: string
  expires_at: string
  used: boolean
  created_at: string
}

export default function DownloadPage() {
  const params = useParams()
  const router = useRouter()
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [validToken, setValidToken] = useState<DownloadToken | null>(null)
  const [error, setError] = useState<string>('')
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const tokenParam = params.token as string
    if (tokenParam) {
      setToken(tokenParam)
      validateToken(tokenParam)
    } else {
      setError('Token manquant')
      setLoading(false)
    }
  }, [params.token])

  const validateToken = async (tokenToCheck: string) => {
    try {
      const { data, error } = await supabase
        .from('download_tokens')
        .select('*')
        .eq('token', tokenToCheck)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error) {
        setError('Lien de téléchargement invalide ou expiré')
        setLoading(false)
        return
      }

      setValidToken(data)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors de la validation du lien')
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!validToken) return

    setDownloading(true)
    try {
      // Marquer le token comme utilisé
      await supabase
        .from('download_tokens')
        .update({ used: true })
        .eq('token', token)

      // Télécharger le fichier
      const link = document.createElement('a')
      link.href = validToken.fichier_url
      link.download = ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Rediriger vers une page de confirmation
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (err) {
      setError('Erreur lors du téléchargement')
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#FAF7F2' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B3A2A] mx-auto mb-4"></div>
          <p className="text-[#6B6B6B]">Vérification du lien de téléchargement...</p>
        </div>
      </div>
    )
  }

  if (error || !validToken) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#FAF7F2' }}
      >
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-4">
            Lien invalide
          </h1>
          <p className="text-[#6B6B6B] mb-6">
            {error || 'Ce lien de téléchargement est invalide ou a expiré.'}
          </p>
          <p className="text-sm text-[#6B6B6B] mb-6">
            Contactez-nous à{' '}
            <a 
              href="mailto:commande@jayscreationsdesign.fr" 
              className="text-[#6B3A2A] hover:underline"
            >
              commande@jayscreationsdesign.fr
            </a>
            {' '}pour obtenir de l'aide.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#6B3A2A' }}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#FAF7F2' }}
    >
      <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
        {/* Logo JCD */}
        <div className="mb-6">
          <img 
            src="/images/logo/logo.png" 
            alt="Jay's Creations Design" 
            className="h-12 mx-auto"
          />
        </div>

        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-[#2C2C2C] mb-4">
          Votre fichier est prêt !
        </h1>
        
        <p className="text-[#6B6B6B] mb-6">
          Votre fichier personnalisé Jay's Creations est prêt à être téléchargé.
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-[#6B6B6B]">
            <strong>Ce lien est valable 7 jours</strong>
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
          style={{ backgroundColor: '#6B3A2A' }}
        >
          <Download className="w-5 h-5" />
          {downloading ? 'Téléchargement en cours...' : 'Télécharger mon fichier'}
        </button>

        {downloading && (
          <p className="mt-4 text-sm text-[#6B6B6B]">
            Redirection automatique dans quelques secondes...
          </p>
        )}
      </div>
    </div>
  )
}
