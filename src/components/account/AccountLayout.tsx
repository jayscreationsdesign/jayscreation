"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut, getUser } from '@/lib/auth'
import { User, ShoppingBag, MapPin, LogOut, Package, CreditCard, Gift, LayoutDashboard, Crown, ChevronRight } from 'lucide-react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

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
        // En cas d'erreur, rediriger vers la connexion
        console.error('Error checking authentication:', error)
        router.push('/connexion')
      }
    }

    checkAuth()
  }, [router, pathname])

  const handleSignOut = async () => {
    const result = await signOut()
    
    if (!result.error) {
      router.push('/')
    }
  }

  const menuItems = [
    {
      label: 'Mon tableau de bord',
      href: '/compte/tableau-de-bord',
      icon: LayoutDashboard,
      active: pathname === '/compte/tableau-de-bord'
    },
    {
      label: "Mon programme fidélité Jay's Club",
      href: '/compte/jays-club',
      icon: Crown,
      active: pathname === '/compte/jays-club'
    },
    {
      label: 'Mon profil',
      href: '/compte/profil',
      icon: User,
      active: pathname === '/compte/profil'
    },
    {
      label: 'Mes commandes',
      href: '/compte/commandes',
      icon: ShoppingBag,
      active: pathname === '/compte/commandes'
    },
    {
      label: 'Mes réductions',
      href: '/compte/reductions',
      icon: Gift,
      active: pathname === '/compte/reductions'
    },
    {
      label: 'Mes adresses',
      href: '/compte/adresses',
      icon: MapPin,
      active: pathname === '/compte/adresses'
    },
    {
      label: 'Paiements',
      href: '/compte/paiements',
      icon: CreditCard,
      active: pathname === '/compte/paiements'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header compte */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/compte" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mon Compte</h1>
                <p className="text-sm text-gray-600">
                  {user?.email?.split('@')[0] || user?.user_metadata?.prenom}
                </p>
              </div>
            </Link>
            
            <Link 
              href="/boutique" 
              className="text-[#8B4513] hover:text-[#8B4513] font-medium transition-colors"
            >
              Retour à la boutique
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        item.active
                          ? 'bg-[#8B4513]/10 text-[#8B4513] font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap flex-1">{item.label}</span>
                      <ChevronRight className={`h-4 w-4 flex-shrink-0 ${
                        item.active ? 'text-[#8B4513]' : 'text-gray-600'
                      }`} />
                    </Link>
                  )
                })}
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap flex-1">Déconnexion</span>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-red-600" />
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
