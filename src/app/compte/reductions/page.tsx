"use client"

import { useState, useEffect } from 'react'
import { getUser } from '@/lib/auth'
import { Gift, Tag, Calendar, CheckCircle, XCircle, Clock, Percent, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { OFFICIAL_COUPONS, formatDiscountValue } from '@/lib/discounts'

interface Reduction {
  id: string
  code: string
  titre: string
  description: string
  type: 'pourcentage' | 'montant_fixe' | 'livraison_gratuite'
  valeur: number // pourcentage ou montant en euros
  minimum_commande?: number
  date_debut: string
  date_fin?: string
  statut: 'disponible' | 'utilisee' | 'expiree' | 'en_attente'
  date_utilisation?: string
  commande_utilisation?: string
  utilisations_max?: number
  utilisations_restantes?: number
}

export default function MesReductionsPage() {
  const [user, setUser] = useState<any>(null)
  const [reductions, setReductions] = useState<Reduction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'toutes' | 'disponibles' | 'utilisees' | 'expirees'>('toutes')

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUser()
      
      if (!currentUser) {
        window.location.href = '/connexion'
        return
      }

      setUser(currentUser)

      // Convertir les coupons officiels en format Reduction pour l'interface
      const convertedReductions: Reduction[] = OFFICIAL_COUPONS.map(coupon => ({
        id: coupon.id,
        code: coupon.code,
        titre: coupon.titre,
        description: coupon.description,
        type: coupon.type,
        valeur: coupon.valeur,
        minimum_commande: coupon.minimum_commande,
        date_debut: coupon.date_debut,
        date_fin: coupon.date_fin,
        statut: coupon.statut === 'actif' ? 'disponible' : 'expiree',
        utilisations_max: coupon.utilisations_max,
        utilisations_restantes: coupon.utilisations_restantes
      }));

      // Ajouter quelques réductions utilisées pour la démo
      const demoReductions: Reduction[] = [
        ...convertedReductions,
        {
          id: 'utilisee-1',
          code: 'BIENVENUE10',
          titre: 'Offre de bienvenue',
          description: '10% de réduction sur votre première commande',
          type: 'pourcentage',
          valeur: 10,
          minimum_commande: 50,
          date_debut: '2024-01-01',
          date_fin: '2024-12-31',
          statut: 'utilisee',
          date_utilisation: '2024-03-15',
          commande_utilisation: 'CMD-2024-001',
          utilisations_max: 1,
          utilisations_restantes: 0
        }
      ];

      setReductions(demoReductions)
      setLoading(false)
    }

    fetchData()
  }, [])

  const getStatutBadge = (reduction: Reduction) => {
    switch (reduction.statut) {
      case 'disponible':
        return 'bg-green-100 text-green-800'
      case 'utilisee':
        return 'bg-gray-100 text-gray-800'
      case 'expiree':
        return 'bg-red-100 text-red-800'
      case 'en_attente':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatutText = (reduction: Reduction) => {
    switch (reduction.statut) {
      case 'disponible':
        return 'Disponible'
      case 'utilisee':
        return 'Utilisée'
      case 'expiree':
        return 'Expirée'
      case 'en_attente':
        return 'En attente'
      default:
        return 'Inconnu'
    }
  }

  const getStatutIcon = (reduction: Reduction) => {
    switch (reduction.statut) {
      case 'disponible':
        return <CheckCircle className="h-4 w-4" />
      case 'utilisee':
        return <Tag className="h-4 w-4" />
      case 'expiree':
        return <XCircle className="h-4 w-4" />
      case 'en_attente':
        return <Clock className="h-4 w-4" />
      default:
        return <Tag className="h-4 w-4" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'pourcentage':
        return 'Pourcentage'
      case 'montant_fixe':
        return 'Montant fixe'
      case 'livraison_gratuite':
        return 'Livraison gratuite'
      default:
        return 'Inconnu'
    }
  }

  const getValeurAffichee = (reduction: Reduction) => {
    // Convertir Reduction en format compatible avec formatDiscountValue
    const couponFormat = {
      type: reduction.type,
      valeur: reduction.valeur
    };
    return formatDiscountValue(couponFormat as any)
  }

  const filteredReductions = reductions.filter(reduction => {
    switch (filter) {
      case 'disponibles':
        return reduction.statut === 'disponible'
      case 'utilisees':
        return reduction.statut === 'utilisee'
      case 'expirees':
        return reduction.statut === 'expiree'
      default:
        return true
    }
  })

  const stats = {
    total: reductions.length,
    disponibles: reductions.filter(r => r.statut === 'disponible').length,
    utilisees: reductions.filter(r => r.statut === 'utilisee').length,
    expirees: reductions.filter(r => r.statut === 'expiree').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
          <p className="mt-4 text-gray-600">Chargement de vos réductions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Breadcrumb - PREMIER ÉLÉMENT */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Mon compte", href: "/compte" },
            { label: "Mes réductions" }
          ]}
        />
      </div>

      {/* Titre de la page - APRÈS le breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Mes Réductions</h1>
            <Link 
              href="/boutique" 
              className="bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#6b3410] transition-colors"
            >
              Utiliser une réduction
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-[#8B4513]/10 rounded-lg">
                <Gift className="h-6 w-6 text-[#8B4513]" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total réductions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.disponibles}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Tag className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Utilisées</p>
                <p className="text-2xl font-bold text-gray-900">{stats.utilisees}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-red-50 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Expirées</p>
                <p className="text-2xl font-bold text-gray-900">{stats.expirees}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('toutes')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'toutes' 
                  ? 'bg-[#8B4513] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes ({stats.total})
            </button>
            <button
              onClick={() => setFilter('disponibles')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'disponibles' 
                  ? 'bg-[#8B4513] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Disponibles ({stats.disponibles})
            </button>
            <button
              onClick={() => setFilter('utilisees')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'utilisees' 
                  ? 'bg-[#8B4513] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Utilisées ({stats.utilisees})
            </button>
            <button
              onClick={() => setFilter('expirees')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'expirees' 
                  ? 'bg-[#8B4513] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expirées ({stats.expirees})
            </button>
          </div>
        </div>

        {/* Liste des réductions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {filteredReductions.length === 0 ? (
            <div className="p-8 text-center">
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'toutes' ? 'Aucune réduction' : `Aucune réduction ${filter}`}
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'disponibles' && 'Vous n\'avez pas de réductions disponibles pour le moment.'}
                {filter === 'utilisees' && 'Vous n\'avez pas encore utilisé de réductions.'}
                {filter === 'expirees' && 'Vous n\'avez pas de réductions expirées.'}
                {filter === 'toutes' && 'Commencez vos achats pour bénéficier d\'offres spéciales !'}
              </p>
              <Link 
                href="/boutique" 
                className="inline-flex items-center bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#6b3410] transition-colors"
              >
                Découvrir les offres
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredReductions.map((reduction) => (
                <div key={reduction.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{reduction.titre}</h3>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatutBadge(reduction)}`}>
                          {getStatutIcon(reduction)}
                          <span>{getStatutText(reduction)}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{reduction.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4 text-gray-400" />
                          <span className="font-mono font-bold text-[#8B4513]">{reduction.code}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Percent className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-green-600">{getValeurAffichee(reduction)}</span>
                        </div>
                        {reduction.minimum_commande && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">Min. {reduction.minimum_commande}€</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-500">
                            Du {new Date(reduction.date_debut).toLocaleDateString('fr-FR')}
                            {reduction.date_fin && ` au ${new Date(reduction.date_fin).toLocaleDateString('fr-FR')}`}
                          </span>
                        </div>
                      </div>

                      {reduction.utilisations_restantes !== undefined && (
                        <div className="mt-2 text-sm text-gray-600">
                          Utilisations restantes : {reduction.utilisations_restantes}/{reduction.utilisations_max}
                        </div>
                      )}

                      {reduction.statut === 'utilisee' && reduction.commande_utilisation && (
                        <div className="mt-2 text-sm text-gray-600">
                          Utilisée le {new Date(reduction.date_utilisation!).toLocaleDateString('fr-FR')} 
                          {' '}pour la commande {reduction.commande_utilisation}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-[#8B4513] mb-1">
                        {getValeurAffichee(reduction)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getTypeText(reduction.type)}
                      </div>
                    </div>
                  </div>

                  {reduction.statut === 'disponible' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#6b3410] transition-colors mr-2">
                        Copier le code
                      </button>
                      <Link 
                        href="/boutique" 
                        className="inline-block border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Utiliser maintenant
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
