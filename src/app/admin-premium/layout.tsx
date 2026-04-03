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
  Crown,
  Star,
  Award,
  TrendingUp,
  Bell
} from 'lucide-react';

export default function AdminPremiumLayout({
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
      router.push('/admin-premium');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      router.push('/admin-premium');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin-premium');
  };

  const menuItems = [
    {
      href: '/admin-premium/dashboard',
      icon: LayoutDashboard,
      label: 'Tableau de Bord',
      badge: null,
      premium: true
    },
    {
      href: '/admin-premium/clients',
      icon: Users,
      label: 'Clients Premium',
      badge: '156',
      premium: true
    },
    {
      href: '/admin-premium/commandes',
      icon: ShoppingCart,
      label: 'Commandes Royales',
      badge: '89',
      premium: true
    },
    {
      href: '/admin-premium/produits',
      icon: Package,
      label: 'Catalogue Luxe',
      badge: '45',
      premium: true
    },
    {
      href: '/admin-premium/devis',
      icon: FileText,
      label: 'Devis Exclusifs',
      badge: '12',
      premium: true
    },
    {
      href: '/admin-premium/statistiques',
      icon: BarChart3,
      label: 'Analytiques Premium',
      badge: null,
      premium: true
    },
    {
      href: '/admin-premium/parametres',
      icon: Settings,
      label: 'Configuration',
      badge: null,
      premium: true
    }
  ];

  if (pathname === '/admin-premium') {
    return children;
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #8B4513 50%, #D4A574 75%, #F5E6D3 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '4px solid rgba(212,165,116,0.3)',
            borderTopColor: '#D4A574',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '32px'
          }}></div>
          <h2 style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            fontFamily: 'Georgia, serif'
          }}>
            Chargement de votre espace premium...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        width: '320px',
        height: '100vh',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #8B4513 100%)',
        boxShadow: '0 0 80px rgba(0,0,0,0.8)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRight: '2px solid rgba(212,165,116,0.3)'
      }}>
        {/* Logo Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100px',
          padding: '0 32px',
          background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 50%, #8B4513 100%)',
          borderBottom: '2px solid rgba(212,165,116,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            transform: 'translateX(-100%)',
            animation: 'shimmer 4s infinite'
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <Crown style={{ width: '32px', height: '32px', color: '#F5E6D3' }} />
            </div>
            <div>
              <h1 style={{
                color: '#F5E6D3',
                fontWeight: '700',
                fontSize: '20px',
                fontFamily: 'Georgia, serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>Jay's Creations</h1>
              <p style={{
                color: 'rgba(245,230,211,0.8)',
                fontSize: '14px',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic'
              }}>Administrateur Premium</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#F5E6D3',
              cursor: 'pointer',
              display: 'none',
              padding: '8px',
              borderRadius: '8px',
              transition: 'all 0.3s'
            }}
          >
            <X style={{ width: '24px', height: '24px' }} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '32px 24px' }}>
          {/* User Info */}
          <div style={{
            marginBottom: '32px',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(212,165,116,0.1) 0%, rgba(139,69,19,0.1) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(212,165,116,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px',
                boxShadow: '0 8px 24px rgba(139,69,19,0.4)',
                position: 'relative'
              }}>
                <Star style={{ width: '28px', height: '28px', position: 'absolute', top: '-4px', right: '-4px', color: '#F5E6D3' }} />
                {user.prenom?.charAt(0) || 'A'}
              </div>
              <div>
                <p style={{ fontWeight: '600', color: '#F5E6D3', fontSize: '16px', fontFamily: 'Georgia, serif' }}>
                  {user.prenom} {user.nom}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(245,230,211,0.7)', fontFamily: 'Georgia, serif' }}>
                  {user.email}
                </p>
                <div style={{ marginTop: '8px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
                    color: '#F5E6D3',
                    fontFamily: 'Georgia, serif',
                    boxShadow: '0 4px 12px rgba(139,69,19,0.3)'
                  }}>
                    <Crown style={{ width: '12px', height: '12px', marginRight: '6px' }} />
                    {user.role === 'super_admin' ? 'Super Admin' : 'Administrateur'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} style={{ marginBottom: '8px' }}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      fontSize: '15px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      background: isActive 
                        ? 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)'
                        : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#F5E6D3' : 'rgba(245,230,211,0.7)',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      border: isActive ? '2px solid rgba(212,165,116,0.5)' : '1px solid transparent',
                      fontFamily: 'Georgia, serif',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(212,165,116,0.1)';
                        e.currentTarget.style.color = '#F5E6D3';
                        e.currentTarget.style.transform = 'translateX(8px)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = 'rgba(245,230,211,0.7)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {item.premium && (
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        animation: 'shimmer 3s infinite'
                      }}></div>
                    )}
                    <item.icon style={{ 
                      width: '24px', 
                      height: '24px', 
                      marginRight: '16px',
                      color: isActive ? '#F5E6D3' : '#D4A574',
                      position: 'relative',
                      zIndex: 1
                    }} />
                    <span style={{ flex: 1, position: 'relative', zIndex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        marginLeft: '12px',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: isActive ? 'rgba(245,230,211,0.2)' : 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
                        color: isActive ? '#F5E6D3' : '#F5E6D3',
                        fontFamily: 'Georgia, serif',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        {item.badge}
                      </span>
                    )}
                    {item.premium && (
                      <Crown style={{ 
                        width: '16px', 
                        height: '16px', 
                        marginLeft: '8px',
                        color: '#F5E6D3',
                        position: 'relative',
                        zIndex: 1
                      }} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(212,165,116,0.3)' }}>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '16px 20px',
                fontSize: '15px',
                fontWeight: '500',
                color: 'rgba(239,68,68,0.8)',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'Georgia, serif'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.transform = 'translateX(8px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                e.currentTarget.style.color = 'rgba(239,68,68,0.8)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <LogOut style={{ marginRight: '16px', width: '20px', height: '20px' }} />
              <span>Déconnexion</span>
            </button>
          </div>
        </nav>
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
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 40,
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div style={{ marginLeft: '320px' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(45,45,45,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          borderBottom: '1px solid rgba(212,165,116,0.3)'
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#D4A574',
              cursor: 'pointer',
              display: 'none',
              padding: '12px',
              borderRadius: '12px',
              transition: 'all 0.3s'
            }}
          >
            <Menu style={{ width: '28px', height: '28px' }} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              background: 'rgba(212,165,116,0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(212,165,116,0.3)'
            }}>
              <TrendingUp style={{ width: '20px', height: '20px', color: '#D4A574' }} />
              <span style={{ color: '#F5E6D3', fontSize: '14px', fontWeight: '500', fontFamily: 'Georgia, serif' }}>
                +15.2% ce mois
              </span>
            </div>
            
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#D4A574',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '500',
                padding: '12px 20px',
                borderRadius: '20px',
                border: '1px solid rgba(212,165,116,0.3)',
                background: 'rgba(212,165,116,0.1)',
                transition: 'all 0.3s',
                fontFamily: 'Georgia, serif'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(212,165,116,0.2)';
                e.currentTarget.style.color = '#F5E6D3';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(212,165,116,0.1)';
                e.currentTarget.style.color = '#D4A574';
              }}
            >
              <Home style={{ width: '20px', height: '20px', marginRight: '12px' }} />
              <span>Voir le site</span>
            </Link>

            <div style={{
              position: 'relative',
              cursor: 'pointer'
            }}>
              <Bell style={{ width: '24px', height: '24px', color: '#D4A574' }} />
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '12px',
                height: '12px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                border: '2px solid rgba(26,26,26,0.95)'
              }}></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
