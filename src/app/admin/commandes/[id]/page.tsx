'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Upload, 
  Download, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  Lock
} from 'lucide-react'
import { formatPriceEUR } from '@/lib/formatPrice'

interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  total: number
  statut: string
  articles: any[]
  personnalisation?: string
  created_at: string
}

export default function OrderDetail() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchOrder(params.id as string)
    }
  }, [params.id])

  const fetchOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`)
      const data = await response.json()
      setOrder(data)
    } catch (error) {
      console.error('Erreur récupération commande:', error)
      setMessage('Erreur lors de la récupération de la commande')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // Upload vers Supabase Storage
      const formData = new FormData()
      formData.append('file', file)
      formData.append('orderId', order?.id || '')

      const response = await fetch('/api/admin/upload-file', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      if (result.fileUrl) {
        setFileUrl(result.fileUrl)
        setMessage('Fichier uploadé avec succès')
      } else {
        setMessage('Erreur lors de l\'upload du fichier')
      }
    } catch (error) {
      console.error('Erreur upload:', error)
      setMessage('Erreur lors de l\'upload du fichier')
    } finally {
      setUploading(false)
    }
  }

  const handleSendFile = async () => {
    if (!order || !fileUrl) return

    setSending(true)
    try {
      const response = await fetch('/api/admin/send-download-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          customerEmail: order.customer_email,
          customerName: order.customer_name,
          fileUrl: fileUrl
        })
      })

      const result = await response.json()
      if (result.success) {
        setMessage('Lien de téléchargement envoyé avec succès')
        setFileUrl('')
      } else {
        setMessage('Erreur lors de l\'envoi du lien')
      }
    } catch (error) {
      console.error('Erreur envoi:', error)
      setMessage('Erreur lors de l\'envoi du lien')
    } finally {
      setSending(false)
    }
  }

  const hasDigitalProducts = order?.articles?.some((item: any) => item.estNumerique === true)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B3A2A]"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-4">Commande non trouvée</h1>
          <button
            onClick={() => router.push('/admin/commandes')}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#6B3A2A' }}
          >
            Retour aux commandes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/admin/commandes')}
              className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#2C2C2C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux commandes
            </button>
            <h1 className="text-xl font-semibold text-[#2C2C2C]">
              Commande #{order.id.slice(-8)}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Infos commande */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte client */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-[#2C2C2C] mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations client
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[#6B6B6B]">Nom</label>
                  <p className="mt-1 text-[#2C2C2C]">{order.customer_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B6B6B]">Email</label>
                  <p className="mt-1 text-[#2C2C2C]">{order.customer_email}</p>
                </div>
                {order.customer_phone && (
                  <div>
                    <label className="block text-sm font-medium text-[#6B6B6B]">Téléphone</label>
                    <p className="mt-1 text-[#2C2C2C]">{order.customer_phone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Carte articles */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-[#2C2C2C] mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Articles commandés
              </h2>
              <div className="space-y-3">
                {order.articles?.map((item: any, index: number) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#2C2C2C]">
                          {item.productName || item.nom}
                        </p>
                        {item.theme && (
                          <p className="text-sm text-[#6B6B6B]">Thème: {item.theme}</p>
                        )}
                        {item.estNumerique && (
                          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full ml-2"
                                style={{ backgroundColor: '#FFE4E8', color: '#993556' }}>
                            Numérique
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-[#2C2C2C]">
                        {formatPriceEUR(item.prix || item.price || 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Personnalisation */}
              {order.personnalisation && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-[#6B6B6B]">Personnalisation</label>
                  <p className="mt-1 text-[#2C2C2C]">{order.personnalisation}</p>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#2C2C2C]">Total</h3>
                <p className="text-2xl font-bold" style={{ color: '#6B3A2A' }}>
                  {formatPriceEUR(order.total)}
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite - Actions */}
          <div className="space-y-6">
            {/* Statut */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4">Statut</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                order.statut === 'payee' ? 'bg-green-100 text-green-800' :
                order.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.statut === 'payee' && <CheckCircle className="w-4 h-4 mr-1" />}
                {order.statut === 'en_attente' && <Lock className="w-4 h-4 mr-1" />}
                {order.statut}
              </div>
            </div>

            {/* Section envoi fichier pour produits numériques */}
            {hasDigitalProducts && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Envoyer le fichier au client
                </h3>
                
                <div className="space-y-4">
                  {/* Upload fichier */}
                  <div>
                    <label className="block text-sm font-medium text-[#6B6B6B] mb-2">
                      1. Uploader le fichier (PDF ou PNG)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B3A2A] focus:border-transparent disabled:opacity-50"
                    />
                    {uploading && (
                      <p className="mt-2 text-sm text-[#6B6B6B]">Upload en cours...</p>
                    )}
                  </div>

                  {/* OU URL du fichier */}
                  <div>
                    <label className="block text-sm font-medium text-[#6B6B6B] mb-2">
                      OU 2. URL du fichier (si stocké sur Supabase)
                    </label>
                    <input
                      type="url"
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B3A2A] focus:border-transparent"
                    />
                  </div>

                  {/* Bouton envoyer */}
                  <button
                    onClick={handleSendFile}
                    disabled={sending || !fileUrl || uploading}
                    className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#6B3A2A' }}
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le fichier
                      </>
                    )}
                  </button>
                </div>

                {/* Message */}
                {message && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${
                    message.includes('succès') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
