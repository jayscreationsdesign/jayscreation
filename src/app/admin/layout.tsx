'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase-client';
import { 
  LayoutDashboard,
  ShoppingCart,
  Calendar,
  Package,
  Plus,
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  Bell,
  Tag,
  Image,
  Star,
  Ticket,
  TrendingUp,
  Mail,
  CreditCard,
  ThumbsUp
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        
        if (!session) {
          router.push('/admin/login');
          return;
        }

        // Check admin role in profiles table
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!profile || profile.role !== 'admin') {
          router.push('/admin/login');
          return;
        }

        setUser(session.user);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/admin/login');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchNewOrders = async () => {
      try {
        const { count } = await supabaseClient
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Nouveau');
        setNewOrdersCount(count || 0);
      } catch (error) {
        console.error('Error fetching new orders count:', error);
      }
    };
    fetchNewOrders();
  }, []);

  const handleLogout = async () => {
    try {
      await supabaseClient.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuSections = [
  {
    title: 'Principal',
    items: [
      { href: '/admin', icon: LayoutDashboard, 
        label: 'Dashboard', badge: null }
    ]
  },
  {
    title: 'Catalogue',
    items: [
      { href: '/admin/produits', icon: Package, 
        label: 'Produits', badge: null },
      { href: '/admin/produits/creer', icon: Plus, 
        label: 'Ajouter produit', badge: null },
      { href: '/admin/categories', icon: Tag, 
        label: 'Catégories', badge: null },
      { href: '/admin/medias', icon: Image, 
        label: 'Médias', badge: null }
    ]
  },
  {
    title: 'Ventes',
    items: [
      { href: '/admin/commandes', icon: ShoppingCart, 
        label: 'Commandes', badge: newOrdersCount },
      { href: '/admin/devis', icon: FileText, 
        label: 'Devis', badge: null },
      { href: '/admin/clients', icon: Users, 
        label: 'Clients', badge: null },
      { href: '/admin/coupons', icon: Ticket, 
        label: 'Coupons', badge: null }
    ]
  },
  {
    title: 'Fidélité',
    items: [
      { href: '/admin/jays-club', icon: Star, 
        label: "Jay's Club", badge: null },
      { href: '/admin/messages', icon: MessageSquare, 
        label: 'Messages', badge: null },
      { href: '/admin/avis', icon: ThumbsUp, 
        label: 'Avis clients', badge: null }
    ]
  },
  {
    title: 'Planning',
    items: [
      { href: '/admin/disponibilites', icon: Calendar, 
        label: 'Disponibilités', badge: null }
    ]
  },
  {
    title: 'Analyse',
    items: [
      { href: '/admin/statistiques', icon: BarChart3, 
        label: 'Statistiques', badge: null },
      { href: '/admin/revenus', icon: TrendingUp, 
        label: 'Revenus', badge: null }
    ]
  },
  {
    title: 'Système',
    items: [
      { href: '/admin/emails', icon: Mail, 
        label: 'Emails', badge: null },
      { href: '/admin/stripe', icon: CreditCard, 
        label: 'Stripe', badge: null },
      { href: '/admin/parametres', icon: Settings, 
        label: 'Paramètres', badge: null }
    ]
  }
];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A96E]"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#3C2415] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-[#C8A96E]/20">
          <div className="text-center">
            <h1 className="text-[#C8A96E] font-bold text-xl font-['Playfair_Display'] italic">
              Jay's Creations
            </h1>
            <p className="text-[#C8A96E]/60 text-xs mt-1">Administration</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {menuSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[#C8A96E]/50 text-xs font-semibold uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#C8A96E]/20 border-l-2 border-[#C8A96E] text-[#C8A96E] font-semibold'
                            : 'text-[#C8A96E]/70 hover:bg-[#F5EFE6] hover:text-[#C8A96E]'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                        {item.badge && item.badge > 0 && (
                          <span className="ml-auto bg-[#C8A96E] text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#C8A96E]/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#C8A96E] to-[#3C2415] rounded-full flex items-center justify-center ring-2 ring-[#C8A96E]/30">
              <span className="text-white font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-[#C8A96E] text-sm font-medium">{user?.email}</p>
              <p className="text-[#C8A96E]/50 text-xs">Administrateur</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-[#C8A96E]/70 hover:bg-[#F5EFE6] hover:text-[#C8A96E] transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E8D5B7] h-16 relative">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent absolute top-0 left-0 right-0" />
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#3C2415]"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-[#3C2415] font-['Playfair_Display']">
                  {menuSections
                    .flatMap(section => section.items)
                    .find(item => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)))?.label || 'Dashboard'}
                </h2>
                <p className="text-xs text-[#C8A96E]">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-[#C8A96E] hover:bg-[#F5EFE6] rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {newOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {newOrdersCount}
                  </span>
                )}
              </button>
              <Link 
                href="/" 
                className="flex items-center px-3 py-2 text-sm text-[#C8A96E] hover:bg-[#F5EFE6] rounded-lg transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Voir le site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
