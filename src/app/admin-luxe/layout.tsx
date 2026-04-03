'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, ShoppingCart, Package, FileText, BarChart3, Settings, LogOut, Menu, X, Home } from 'lucide-react';

export default function AdminLuxeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (!token || !userData) {
      router.push('/admin-luxe');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      router.push('/admin-luxe');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin-luxe');
  };

  const menuItems = [
    {
      href: '/admin-luxe/dashboard',
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      badge: null
    },
    {
      href: '/admin-luxe/clients',
      icon: Users,
      label: 'Clients',
      badge: null
    },
    {
      href: '/admin-luxe/commandes',
      icon: ShoppingCart,
      label: 'Commandes',
      badge: '12'
    },
    {
      href: '/admin-luxe/produits',
      icon: Package,
      label: 'Catalogue',
      badge: null
    },
    {
      href: '/admin-luxe/devis',
      icon: FileText,
      label: 'Devis',
      badge: '3'
    },
    {
      href: '/admin-luxe/statistiques',
      icon: BarChart3,
      label: 'Analytiques',
      badge: null
    },
    {
      href: '/admin-luxe/parametres',
      icon: Settings,
      label: 'Configuration',
      badge: null
    }
  ];

  if (pathname === '/admin-luxe') {
    return children;
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f5f4 0%, #faf9f7 50%, #fef3e2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          border: '4px solid #8B4513',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        width: '288px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '0 0 40px rgba(0,0,0,0.1)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
          padding: '0 24px',
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <span style={{
                color: '#8B4513',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>JD</span>
            </div>
            <div>
              <h1 style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>Jay's Creations</h1>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '12px'
              }}>Espace Administrateur</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'none'
            }}
          >
            <X style={{ width: '24px', height: '24px' }} />
          </button>
        </div>

        <nav style={{ padding: '24px 16px' }}>
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: 'linear-gradient(135deg, #fef3e2 0%, #fde68a 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(139,69,19,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                {user.prenom?.charAt(0) || 'A'}
              </div>
              <div>
                <p style={{ fontWeight: '600', color: '#1a1a1a' }}>{user.prenom} {user.nom}</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>{user.email}</p>
                <div style={{ marginTop: '4px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: 'rgba(139,69,19,0.1)',
                    color: '#8B4513'
                  }}>
                    {user.role === 'super_admin' ? 'Super Admin' : 'Administrateur'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} style={{ marginBottom: '4px' }}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: isActive ? 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)' : 'transparent',
                      color: isActive ? 'white' : '#6b7280',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <item.icon style={{ 
                      width: '20px', 
                      height: '20px', 
                      marginRight: '12px',
                      color: isActive ? 'white' : '#9ca3af'
                    }} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        marginLeft: '8px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: isActive ? 'white' : '#8B4513',
                        color: isActive ? '#8B4513' : 'white'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#dc2626',
                background: 'none',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <LogOut style={{ marginRight: '12px', width: '16px', height: '16px' }} />
              <span>Déconnexion</span>
            </button>
          </div>
        </nav>
      </div>

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

      <div style={{ marginLeft: '288px' }}>
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 0 0 rgba(0,0,0,0.05)',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px'
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              display: 'none'
            }}
          >
            <Menu style={{ width: '24px', height: '24px' }} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#8B4513',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <Home style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              <span>Voir le site</span>
            </Link>
          </div>
        </header>

        <main style={{ padding: '32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
