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
  Home
} from 'lucide-react';

export default function AdminJayLayout({
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
      router.push('/admin-jay');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      router.push('/admin-jay');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin-jay');
  };

  const menuItems = [
    {
      href: '/admin-jay/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      badge: null
    },
    {
      href: '/admin-jay/clients',
      icon: Users,
      label: 'Clients',
      badge: null
    },
    {
      href: '/admin-jay/commandes',
      icon: ShoppingCart,
      label: 'Commandes',
      badge: null
    },
    {
      href: '/admin-jay/produits',
      icon: Package,
      label: 'Produits & Stocks',
      badge: null
    },
    {
      href: '/admin-jay/devis',
      icon: FileText,
      label: 'Devis',
      badge: null
    },
    {
      href: '/admin-jay/statistiques',
      icon: BarChart3,
      label: 'Statistiques',
      badge: null
    },
    {
      href: '/admin-jay/parametres',
      icon: Settings,
      label: 'Paramètres',
      badge: null
    }
  ];

  if (pathname === '/admin-jay') {
    return children;
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e2e8f0',
          borderTopColor: '#6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        width: '256px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          padding: '0 24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#6366f1',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>JD</span>
            </div>
            <div>
              <h1 style={{
                color: '#1e293b',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>Jay's Creations</h1>
              <p style={{
                color: '#64748b',
                fontSize: '12px'
              }}>Admin</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* User Info */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#6366f1',
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
              <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
                {user.prenom} {user.nom}
              </p>
              <p style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</p>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '500',
                backgroundColor: '#f3f4f6',
                color: '#6b7280'
              }}>
                {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px' }}>
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
                      padding: '10px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                      color: isActive ? '#6366f1' : '#64748b',
                      borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent'
                    }}
                  >
                    <item.icon style={{ 
                      width: '18px', 
                      height: '18px', 
                      marginRight: '12px',
                      color: isActive ? '#6366f1' : '#6b7280'
                    }} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        marginLeft: 'auto',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: '#ef4444',
                        color: 'white'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
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
      <div style={{ marginLeft: '256px', flex: 1 }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
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
              padding: '8px',
              borderRadius: '6px',
              display: 'none'
            }}
          >
            <Menu style={{ width: '20px', height: '20px' }} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#6366f1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Home style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              <span>Voir le site</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
