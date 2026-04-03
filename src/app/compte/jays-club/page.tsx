"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { Crown, Star, Gift, Trophy, Target, Zap, ArrowLeft, Award, Percent, Calendar, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function JaysClubPage() {
  const [user, setUser] = useState<any>(null)
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
          <p className="mt-4 text-gray-600">Chargement de Jay's Club...</p>
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
            { label: "Mon programme fidélité Jay's Club" }
          ]}
        />
      </div>

      {/* Titre de la page - APRÈS le breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B4513] to-[#C8A96E] rounded-full flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Jay's Club</h1>
                <p className="text-gray-600">Mon programme de fidélité</p>
              </div>
            </div>
            <Link 
              href="/boutique" 
              className="bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#6b3410] transition-colors"
            >
              Boutique
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Avantages Exclusifs */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-[#8B4513]/5 rounded-lg border border-[#8B4513]/20">
              <Percent className="h-6 w-6 text-[#8B4513]" />
              <div>
                <p className="font-medium text-gray-900">-10% sur tous vos achats</p>
                <p className="text-sm text-gray-600">Réduction permanente</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#8B4513]/5 rounded-lg border border-[#8B4513]/20">
              <Gift className="h-6 w-6 text-[#8B4513]" />
              <div>
                <p className="font-medium text-gray-900">Cadeaux d'anniversaire</p>
                <p className="text-sm text-gray-600">25% de réduction</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#8B4513]/5 rounded-lg border border-[#8B4513]/20">
              <Zap className="h-6 w-6 text-[#8B4513]" />
              <div>
                <p className="font-medium text-gray-900">Livraison prioritaire</p>
                <p className="text-sm text-gray-600">24h chrono</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#8B4513]/5 rounded-lg border border-[#8B4513]/20">
              <Trophy className="h-6 w-6 text-[#8B4513]" />
              <div>
                <p className="font-medium text-gray-900">Accès anticipé</p>
                <p className="text-sm text-gray-600">Nouveautés et soldes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#8B4513]/5 rounded-lg border border-[#8B4513]/20">
              <Target className="h-6 w-6 text-[#8B4513]" />
              <div>
                <p className="font-medium text-gray-900">Offres personnalisées</p>
                <p className="text-sm text-gray-600">Selon vos préférences</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#8B4513]/5 rounded-lg border border-[#8B4513]/20">
              <Award className="h-6 w-6 text-[#8B4513]" />
              <div>
                <p className="font-medium text-gray-900">Programme parrainage</p>
                <p className="text-sm text-gray-600">10€ par ami parrainé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Niveaux de Fidélité */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="space-y-4">
            {/* Niveau 1 - Bronze */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Bronze</h3>
                    <p className="text-sm text-gray-600">0 - 1,000 points</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">✅ Atteint</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• -5% sur tous les achats</p>
                <p>• Livraison offerte dès 50€</p>
              </div>
            </div>

            {/* Niveau 2 - Silver */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Silver</h3>
                    <p className="text-sm text-gray-600">1,001 - 3,000 points</p>
                  </div>
                </div>
                <span className="text-sm text-[#8B4513] font-medium">⭐ Actuel</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• -10% sur tous les achats</p>
                <p>• Livraison offerte dès 30€</p>
                <p>• Cadeau d'anniversaire</p>
              </div>
              {/* Barre de progression */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>1,000</span>
                  <span>2,450 / 3,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#8B4513] to-[#C8A96E] h-2 rounded-full" style={{width: '72.5%'}}></div>
                </div>
              </div>
            </div>

            {/* Niveau 3 - Gold */}
            <div className="border border-gray-200 rounded-lg p-4 opacity-60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Gold</h3>
                    <p className="text-sm text-gray-600">3,001 - 5,000 points</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">🔒 550 points</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• -15% sur tous les achats</p>
                <p>• Livraison offerte systématiquement</p>
                <p>• Cadeaux exclusifs</p>
                <p>• Service client prioritaire</p>
              </div>
            </div>
          </div>
        </div>

        {/* Historique des points */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Achat - Commande #1003</p>
                  <p className="text-sm text-gray-600">15 Mars 2024</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">+145 pts</span>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Achat - Commande #1002</p>
                  <p className="text-sm text-gray-600">10 Mars 2024</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">+89 pts</span>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Gift className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Utilisation - Réduction FIDELITE</p>
                  <p className="text-sm text-gray-600">5 Mars 2024</p>
                </div>
              </div>
              <span className="text-red-600 font-medium">-50 pts</span>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gift className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Bonus - Anniversaire</p>
                  <p className="text-sm text-gray-600">1 Mars 2024</p>
                </div>
              </div>
              <span className="text-purple-600 font-medium">+100 pts</span>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/compte/reductions" 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Gift className="h-8 w-8 text-[#8B4513] mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Mes réductions VIP</h3>
            <p className="text-sm text-gray-600">Profitez de vos avantages exclusifs</p>
          </Link>

          <Link 
            href="/compte/commandes" 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Target className="h-8 w-8 text-[#8B4513] mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Gagner des points</h3>
            <p className="text-sm text-gray-600">Cumulez des points avec vos achats</p>
          </Link>

          <Link 
            href="/contact" 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Crown className="h-8 w-8 text-[#8B4513] mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Service VIP</h3>
            <p className="text-sm text-gray-600">Support client prioritaire</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
