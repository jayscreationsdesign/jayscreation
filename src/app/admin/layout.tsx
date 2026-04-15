'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  BarChart3, 
  Package, 
  FileText, 
  MessageSquare, 
  ShoppingBag, 
  FolderOpen, 
  Image, 
  Users, 
  Gem, 
  Ticket, 
  TrendingUp, 
  Settings, 
  Mail, 
  CreditCard,
  Bell,
  Plus,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    ordersPending: 0,
    quotesPending: 0,
    messagesUnread: 0
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Temporairement désactivé pour développement - permettre l'accès admin
    setUser({ email: 'anais.manne@gmail.com', id: 'admin' });
    setIsLoading(false);
    
    // Ancienne vérification (désactivée pour test)
    /*
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        
        if (!data.authenticated || data.user?.email !== 'anais.manne@gmail.com') {
          router.push('/connexion');
          return;
        }
        
        setUser(data.user);
        setIsLoading(false);
      } catch (error) {
        router.push('/connexion');
        setIsLoading(false);
      }
    };

    checkAuth();
    */
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/connexion');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      href: '/admin',
      icon: BarChart3,
      label: 'Vue d\'ensemble',
      badge: null
    },
    {
      href: '/admin/commandes',
      icon: Package,
      label: 'Commandes',
      badge: stats.ordersPending
    },
    {
      href: '/admin/devis',
      icon: FileText,
      label: 'Devis',
      badge: stats.quotesPending
    },
    {
      href: '/admin/messages',
      icon: MessageSquare,
      label: 'Messages',
      badge: stats.messagesUnread
    },
    {
      href: '/admin/produits',
      icon: ShoppingBag,
      label: 'Produits',
      badge: null
    },
    {
      href: '/admin/categories',
      icon: FolderOpen,
      label: 'Catégories',
      badge: null
    },
    {
      href: '/admin/medias',
      icon: Image,
      label: 'Médias',
      badge: null
    },
    {
      href: '/admin/clients',
      icon: Users,
      label: 'Clients',
      badge: null
    },
    {
      href: '/admin/jays-club',
      icon: Gem,
      label: 'Jay\'s Club',
      badge: null
    },
    {
      href: '/admin/coupons',
      icon: Ticket,
      label: 'Coupons',
      badge: null
    },
    {
      href: '/admin/revenus',
      icon: TrendingUp,
      label: 'Revenus',
      badge: null
    },
    {
      href: '/admin/parametres',
      icon: Settings,
      label: 'Paramètres',
      badge: null
    },
    {
      href: '/admin/emails',
      icon: Mail,
      label: 'Emails',
      badge: null
    },
    {
      href: '/admin/stripe',
      icon: CreditCard,
      label: 'Stripe',
      badge: null
    }
  ];

  // Si on est en chargement ou non authentifié
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FFF8F0]">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-[#2C1A0E] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-0'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#8B4513]/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#8B4513] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <div>
              <h1 className="text-[#D4A574] font-bold text-sm font-['Playfair_Display']">
                Jay's Creations Design
              </h1>
              <span className="text-[#8B4513] text-xs bg-[#8B4513]/20 px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#D4A574]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[rgba(139,69,19,0.15)] border-l-3 border-[#8B4513] text-[#D4A574]'
                        : 'text-[#A0785A] hover:bg-[rgba(139,69,19,0.05)] hover:text-[#D4A574]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-[#8B4513] text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#8B4513]/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-[#D4A574] rounded-full flex items-center justify-center">
              <span className="text-[#2C1A0E] font-bold text-sm">A</span>
            </div>
            <div>
              <p className="text-[#D4A574] text-sm font-medium">Anaïs</p>
              <p className="text-[#A0785A] text-xs">Administratrice</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-[#A0785A] hover:bg-[rgba(139,69,19,0.05)] hover:text-[#D4A574] transition-colors"
          >
            <X className="mr-3 h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-[#E8D5C0] h-16">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#2C1A0E]"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <h2 className="text-lg font-semibold text-[#2C1A0E] font-['Playfair_Display']">
                  {menuItems.find(item => item.href === pathname || (item.href !== '/admin' && pathname.startsWith(item.href)))?.label || 'Admin'}
                </h2>
                <p className="text-xs text-[#A0785A]">
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/admin/produits" className="bg-[#8B4513] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#6b3410] transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Nouveau produit</span>
              </Link>
              <button className="bg-[#D4A574] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#c1965f] transition-colors flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Créer commande</span>
              </button>
              <button className="relative p-2 text-[#2C1A0E] hover:bg-[#FFF8F0] rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {(stats.ordersPending + stats.quotesPending + stats.messagesUnread) > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#8B4513] rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
