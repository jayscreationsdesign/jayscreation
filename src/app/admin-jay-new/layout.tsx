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
  X, 
  Home,
  TrendingUp,
  DollarSign,
  Eye,
  Bell,
  ChevronRight
} from 'lucide-react';

export default function AdminJayNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (!token || !userData) {
      router.push('/admin-jay-new');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      router.push('/admin-jay-new');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin-jay-new');
  };

  const menuItems = [
    {
      href: '/admin-jay-new/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      badge: null,
      description: 'Vue d\'ensemble'
    },
    {
      href: '/admin-jay-new/clients',
      icon: Users,
      label: 'Clients',
      badge: null,
      description: 'Gestion clientèle'
    },
    {
      href: '/admin-jay-new/commandes',
      icon: ShoppingCart,
      label: 'Commandes',
      badge: null,
      description: 'Suivi commandes'
    },
    {
      href: '/admin-jay-new/produits',
      icon: Package,
      label: 'Produits',
      badge: null,
      description: 'Catalogue & stocks'
    },
    {
      href: '/admin-jay-new/devis',
      icon: FileText,
      label: 'Devis',
      badge: null,
      description: 'Demandes devis'
    },
    {
      href: '/admin-jay-new/statistiques',
      icon: BarChart3,
      label: 'Statistiques',
      badge: null,
      description: 'Analytiques'
    },
    {
      href: '/admin-jay-new/parametres',
      icon: Settings,
      label: 'Paramètres',
      badge: null,
      description: 'Configuration'
    }
  ];

  if (pathname === '/admin-jay-new') {
    return children;
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTopColor: 'white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        width: '280px',
        height: '100vh',
        background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
          padding: '0 24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}>
              <span style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>JD</span>
            </div>
            <div>
              <h1 style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                margin: 0
              }}>Jay's Creations</h1>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '12px',
                margin: 0
              }}>Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* User Info */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}>
              {user.prenom?.charAt(0) || 'A'}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '600', color: 'white', fontSize: '14px', margin: 0 }}>
                {user.prenom} {user.nom}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                {user.email}
              </p>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '500',
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                color: '#a5b4fc',
                marginTop: '4px'
              }}>
                Super Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} style={{ marginBottom: '4px' }}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                      color: isActive ? '#a5b4fc' : 'rgba(255,255,255,0.8)',
                      borderLeft: isActive ? '3px solid #667eea' : '3px solid transparent',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                      }
                    }}
                  >
                    <item.icon style={{ 
                      width: '18px', 
                      height: '18px', 
                      marginRight: '12px',
                      color: isActive ? '#667eea' : 'rgba(255,255,255,0.8)'
                    }} />
                    <div style={{ flex: 1 }}>
                      <span>{item.label}</span>
                      <p style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.5)',
                        margin: '2px 0 0 0'
                      }}>
                        {item.description}
                      </p>
                    </div>
                    {item.badge && (
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '10px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: '#ef4444',
                        color: 'white'
                      }}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight style={{ 
                      width: '16px', 
                      height: '16px', 
                      color: 'rgba(255,255,255,0.4)',
                      opacity: isActive ? 1 : 0.6
                    }} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Notifications */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell style={{ width: '16px', height: '16px', color: '#ef4444' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>
                {notifications} notifications
              </span>
            </div>
            <ChevronRight style={{ width: '16px', height: '16px', color: 'rgba(255,255,255,0.4)' }} />
          </div>
        </div>

        {/* Logout */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.8)',
              background: 'none',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.color = '#ef4444';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
          >
            <LogOut style={{ marginRight: '12px', width: '18px', height: '18px' }} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
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

      {/* Main Content */}
      <div style={{ marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'none'
            }}
          >
            <Menu style={{ width: '20px', height: '20px' }} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <DollarSign style={{ width: '16px', height: '16px', color: '#10b981' }} />
              <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                CA du jour: 1,234€
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <ShoppingCart style={{ width: '16px', height: '16px', color: '#3b82f6' }} />
              <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                12 commandes
              </span>
            </div>

            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#667eea',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s',
                border: '1px solid #667eea'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#667eea';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#667eea';
              }}
            >
              <Home style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              <span>Voir le site</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
