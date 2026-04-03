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

export default function AdminSuperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Vérification simple du token
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (!token || !userData) {
      router.push('/admin-super');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      router.push('/admin-super');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin-super');
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

  // Si on est sur la page de login, on retourne juste les enfants
  if (pathname === '/admin-super') {
    return children;
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        width: '256px',
        height: '100vh',
        backgroundColor: '#2C1A0E',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          padding: '0 16px',
          backgroundColor: '#1a0f08'
        }}>
          <h1 style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            Jay's Creations
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'none' // Caché sur desktop
            }}
          >
            <X size={24} />
          </button>
        </div>

        <nav style={{ marginTop: '32px' }}>
          <div style={{ padding: '0 16px', marginBottom: '16px' }}>
            <p style={{
              color: 'white',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {user.prenom} {user.nom}
            </p>
            <p style={{
              color: '#9ca3af',
              fontSize: '12px'
            }}>
              {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
            </p>
          </div>

          <ul style={{ listStyle: 'none', padding: '0 8px' }}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} style={{ marginBottom: '4px' }}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      backgroundColor: isActive ? '#8B4513' : 'transparent',
                      color: isActive ? 'white' : '#d1d5db'
                    }}
                  >
                    <item.icon style={{ marginRight: '12px', width: '20px', height: '20px' }} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px'
          }}>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: 'transparent',
                color: '#d1d5db',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <LogOut style={{ marginRight: '12px', width: '20px', height: '20px' }} />
              Déconnexion
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div style={{ marginLeft: '256px' }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 0 0 rgba(0,0,0,0.1)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              display: 'none' // Caché sur desktop
            }}
          >
            <Menu size={24} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              {menuItems.find(item => item.href === pathname)?.label || 'Admin'}
            </h2>
          </div>
        </header>

        {/* Page content */}
        <main style={{ padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
