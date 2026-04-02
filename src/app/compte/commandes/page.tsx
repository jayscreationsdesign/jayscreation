"use client"

import { useState, useEffect } from 'react'
import { getUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Commande {
  id: string
  numero_commande: string
  client_email: string
  date_commande: string
  statut: 'en_attente' | 'payee' | 'annulee'
  total: number
  articles: {
    nom: string
    quantite: number
    prix: number
  }[]
}

export default function CommandesPage() {
  const [user, setUser] = useState<any>(null)
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUser()
      
      if (!currentUser) {
        window.location.href = '/connexion'
        return
      }

      setUser(currentUser)

      // Récupérer les commandes depuis Supabase
      const { data, error } = await supabase
        .from('commandes')
        .select('*')
        .eq('client_email', currentUser.email)
        .order('date_commande', { ascending: false })

      if (error) {
        console.error('Erreur lors de la récupération des commandes:', error)
      } else {
        setCommandes(data || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-orange-100 text-orange-800'
      case 'payee':
        return 'bg-green-100 text-green-800'
      case 'annulee':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatutText = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return 'En attente'
      case 'payee':
        return 'Payée'
      case 'annulee':
        return 'Annulée'
      default:
        return 'Inconnu'
    }
  }

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return <Clock className="h-4 w-4" />
      case 'payee':
        return <CheckCircle className="h-4 w-4" />
      case 'annulee':
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
          <p className="mt-4 text-gray-600">Chargement de vos commandes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
          <p className="text-gray-600">Consultez l'historique de vos commandes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des commandes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {commandes.length === 0 ? (
                <div className="p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
                  <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande.</p>
                  <a 
                    href="/boutique" 
                    className="inline-flex items-center bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#8B4513] transition-colors"
                  >
                    Commencer mes achats
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {commandes.map((commande) => (
                    <div 
                      key={commande.id} 
                      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCommande(commande)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Commande #{commande.numero_commande}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(commande.date_commande).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            {commande.total.toFixed(2)}€
                          </p>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatutBadge(commande.statut)}`}>
                            {getStatutIcon(commande.statut)}
                            <span>{getStatutText(commande.statut)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {commande.articles.length} article{commande.articles.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Détail de la commande sélectionnée */}
          <div className="lg:col-span-1">
            {selectedCommande ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Détail Commande #{selectedCommande.numero_commande}
                  </h3>
                  <button
                    onClick={() => setSelectedCommande(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(selectedCommande.date_commande).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut:</span>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatutBadge(selectedCommande.statut)}`}>
                      {getStatutIcon(selectedCommande.statut)}
                      <span>{getStatutText(selectedCommande.statut)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-lg">
                      {selectedCommande.total.toFixed(2)}€
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Articles</h4>
                  <div className="space-y-3">
                    {selectedCommande.articles.map((article, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium text-gray-900">{article.nom}</p>
                          <p className="text-gray-600">Quantité: {article.quantite}</p>
                        </div>
                        <p className="font-medium">
                          {(article.prix * article.quantite).toFixed(2)}€
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une commande</h3>
                <p className="text-gray-600">
                  Cliquez sur une commande pour voir les détails
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
