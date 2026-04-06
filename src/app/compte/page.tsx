"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, getUserProfile } from '@/lib/auth'
import { ShoppingBag, Calendar, TrendingUp, Package, User, CreditCard, MapPin, LogOut, Gift, Settings, MapPin as MapPinIcon } from 'lucide-react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import LoyaltySummary from '@/components/loyalty/LoyaltySummary'

export default function ComptePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getUser()
        
        if (!currentUser) {
          router.push('/connexion')
          return
        }

        setUser(currentUser)
        
        const userProfile = await getUserProfile(currentUser.id)
        setProfile(userProfile)
        setLoading(false)
      } catch (error) {
        console.error('Error checking authentication:', error)
        router.push('/connexion')
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
          <p className="mt-4 text-gray-600">Chargement de votre compte...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Redirection en cours
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Breadcrumb - PREMIER ÉLÉMENT */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Mon compte" }
          ]}
        />
      </div>

      {/* Titre de la page - APRÈS le breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Mon Tableau de Bord</h1>
            <Link 
              href="/boutique" 
              className="bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#6b3410] hover:text-[#D4A574] transition-colors"
            >
              Retour à la boutique
            </Link>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Jay's Club Section */}
        <LoyaltySummary className="mb-8" />

        {/* Cards métriques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            onClick={() => router.push('/compte/commandes')}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-[#8B4513]/30 group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && router.push('/compte/commandes')}
          >
            <div className="flex items-center pointer-events-none">
              <div className="p-3 bg-[#8B4513]/10 rounded-lg group-hover:bg-[#8B4513]/20 transition-colors">
                <ShoppingBag className="h-6 w-6 text-[#8B4513]" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 group-hover:text-[#8B4513] transition-colors">Commandes totales</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Dernière commande</p>
                <p className="text-lg font-bold text-gray-900">15 Mars 2024</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total dépensé</p>
                <p className="text-2xl font-bold text-gray-900">1,245€</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dernières commandes */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Dernières commandes</h2>
            <Link 
              href="/compte/commandes" 
              className="text-[#8B4513] hover:text-[#8B4513] font-medium transition-colors"
            >
              Voir tout
            </Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Commande #{1000 + order}</p>
                    <p className="text-sm text-gray-600">15 Mars 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">89,90€</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Payée
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Mon Compte */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Mon Compte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/compte/profil" 
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#8B4513] hover:bg-[#8B4513]/5 transition-all"
            >
              <User className="h-6 w-6 text-[#8B4513]" />
              <div>
                <h3 className="font-medium text-gray-900">Mon profil</h3>
                <p className="text-sm text-gray-600">Mes informations</p>
              </div>
            </Link>

            <Link 
              href="/compte/commandes" 
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#8B4513] hover:bg-[#8B4513]/5 transition-all"
            >
              <ShoppingBag className="h-6 w-6 text-[#8B4513]" />
              <div>
                <h3 className="font-medium text-gray-900">Mes commandes</h3>
                <p className="text-sm text-gray-600">Historique et suivi</p>
              </div>
            </Link>

            <Link 
              href="/compte/reductions" 
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#8B4513] hover:bg-[#8B4513]/5 transition-all"
            >
              <Gift className="h-6 w-6 text-[#8B4513]" />
              <div>
                <h3 className="font-medium text-gray-900">Mes réductions</h3>
                <p className="text-sm text-gray-600">Codes et offres</p>
              </div>
            </Link>

            <Link 
              href="/compte/adresses" 
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#8B4513] hover:bg-[#8B4513]/5 transition-all"
            >
              <MapPinIcon className="h-6 w-6 text-[#8B4513]" />
              <div>
                <h3 className="font-medium text-gray-900">Mes adresses</h3>
                <p className="text-sm text-gray-600">Livraison et facturation</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Accès rapide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/boutique" 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Package className="h-8 w-8 text-[#8B4513] mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Continuer mes achats</h3>
            <p className="text-sm text-gray-600">Découvrir nos nouveaux produits</p>
          </Link>

          <Link 
            href="/compte/reductions" 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Gift className="h-8 w-8 text-[#8B4513] mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Voir mes réductions</h3>
            <p className="text-sm text-gray-600">Profiter des offres disponibles</p>
          </Link>

          <Link 
            href="/contact" 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <User className="h-8 w-8 text-[#8B4513] mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Service client</h3>
            <p className="text-sm text-gray-600">Besoin d'aide ? Contactez-nous</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
