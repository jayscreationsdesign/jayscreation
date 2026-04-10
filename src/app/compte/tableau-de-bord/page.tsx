"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, getUserProfile } from '@/lib/auth'
import { ShoppingBag, Calendar, TrendingUp, Package, User, CreditCard, MapPin, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function TableauDeBordPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
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
        
        // Récupérer les commandes du client
        try {
          const ordersResponse = await fetch('/api/admin/commandes?userId=' + currentUser.id)
          if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json()
            setOrders(ordersData.orders || [])
          }
        } catch (error) {
          console.log('Erreur récupération commandes:', error)
          setOrders([])
        }
        
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

  // Calculer les statistiques réelles
  const totalOrders = orders.length
  const lastOrderDate = orders.length > 0 
    ? new Date(Math.max(...orders.map(order => new Date(order.createdAt).getTime()))).toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    : 'Aucune commande'
  
  const totalSpent = orders.reduce((sum, order) => {
    const orderTotal = typeof order.total === 'number' ? order.total : parseFloat(order.total) || 0
    return sum + orderTotal
  }, 0)

  const recentOrders = orders.slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
          <p className="mt-4 text-gray-600">Chargement de votre tableau de bord...</p>
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
            { label: "Mon compte", href: "/compte" },
            { label: "Mon tableau de bord" }
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
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
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
                <p className="text-lg font-bold text-gray-900">{lastOrderDate}</p>
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
                <p className="text-2xl font-bold text-gray-900">{totalSpent.toFixed(2)}</p>
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
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                     onClick={() => router.push('/compte/commandes')}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Commande #{order.id || order.orderId}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {typeof order.total === 'number' ? order.total.toFixed(2) : parseFloat(order.total || '0').toFixed(2)}$
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.status || 'Payée'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Aucune commande pour le moment</p>
                <Link 
                  href="/boutique" 
                  className="text-[#8B4513] hover:text-[#8B4513] font-medium transition-colors inline-flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Commencer vos achats
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Menu Mon Compte */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
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
              <Home className="h-6 w-6 text-[#8B4513]" />
              <div>
                <h3 className="font-medium text-gray-900">Mes réductions</h3>
                <p className="text-sm text-gray-600">Codes et offres</p>
              </div>
            </Link>

            <Link 
              href="/compte/adresses" 
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#8B4513] hover:bg-[#8B4513]/5 transition-all"
            >
              <MapPin className="h-6 w-6 text-[#8B4513]" />
              <div>
                <h3 className="font-medium text-gray-900">Mes adresses</h3>
                <p className="text-sm text-gray-600">Livraison et facturation</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Statistiques et activité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Réductions disponibles */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Mes Réductions</h2>
              <Link 
                href="/compte/reductions" 
                className="text-[#8B4513] hover:text-[#8B4513] font-medium transition-colors"
              >
                Voir tout
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">SOLDES2024</p>
                  <p className="text-sm text-gray-600">20% de réduction</p>
                </div>
                <span className="text-green-600 font-medium">Disponible</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">FIDELITE</p>
                  <p className="text-sm text-gray-600">5% de réduction</p>
                </div>
                <span className="text-green-600 font-medium">Disponible</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">BIENVENUE10</p>
                  <p className="text-sm text-gray-600">10% de réduction</p>
                </div>
                <span className="text-gray-600 font-medium">Utilisée</span>
              </div>
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Activité Récente</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#8B4513] rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Commande #1003 passée</p>
                  <p className="text-sm text-gray-600">Il y a 2 jours • 295,00€</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Commande #1002 livrée</p>
                  <p className="text-sm text-gray-600">Il y a 5 jours • 89,90€</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Nouvelle réduction disponible</p>
                  <p className="text-sm text-gray-600">Il y a 1 semaine • ANNIVERSAIRE</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Profil mis à jour</p>
                  <p className="text-sm text-gray-600">Il y a 2 semaines</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
            <Home className="h-8 w-8 text-[#8B4513] mb-3" />
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
