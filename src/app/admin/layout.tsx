'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Si on est sur la page de login, on ne fait pas de vérification
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }

    // Vérification de l'authentification pour les autres pages admin
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
      setIsLoading(false);
    } catch (error) {
      router.push('/admin/login');
      setIsLoading(false);
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const menuItems = [
    {
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    {
      href: '/admin/clients',
      icon: Users,
      label: 'Clients',
    },
    {
      href: '/admin/commandes',
      icon: ShoppingCart,
      label: 'Commandes',
    },
    {
      href: '/admin/produits',
      icon: Package,
      label: 'Produits & Stocks',
    },
    {
      href: '/admin/devis',
      icon: FileText,
      label: 'Devis',
    },
    {
      href: '/admin/statistiques',
      icon: BarChart3,
      label: 'Statistiques',
    },
    {
      href: '/admin/parametres',
      icon: Settings,
      label: 'Paramètres',
    },
  ];

  // Si on est sur la page de login, on retourne juste les enfants sans layout admin
  if (pathname === '/admin/login') {
    return (
      <html lang="fr">
        <body className="min-h-screen">
          {children}
        </body>
      </html>
    );
  }

  // Si on est en chargement ou non authentifié
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2C1A0E] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-0'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-[#1a0f08]">
          <h1 className="text-white font-bold text-lg">
            Jay's Creations
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 mb-4">
            <p className="text-white text-sm font-medium">
              {user.prenom} {user.nom}
            </p>
            <p className="text-gray-400 text-xs">
              {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
            </p>
          </div>

          <ul className="space-y-2 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#8B4513] text-white'
                        : 'text-gray-300 hover:bg-[#3d2817] hover:text-white'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {menuItems.find(item => item.href === pathname)?.label || 'Admin'}
              </h2>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
