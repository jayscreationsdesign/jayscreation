'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  DollarSign, 
  Eye, 
  BarChart3, 
  Calendar, 
  Filter, 
  ArrowUp,
  ArrowDown,
  Star
} from 'lucide-react';

export default function AdminJayNewDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('mois');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const stats = {
    totalClients: 156,
    totalCommandes: 89,
    chiffreAffaires: 15420,
    panierMoyen: 173.26,
    tauxConversion: 2.5,
    tauxAbandon: 15.2
  };

  const ventesMensuelles = [
    { mois: 'Jan', ventes: 12000, commandes: 45 },
    { mois: 'Fév', ventes: 15000, commandes: 52 },
    { mois: 'Mar', ventes: 18000, commandes: 58 },
    { mois: 'Avr', ventes: 22000, commandes: 65 },
    { mois: 'Mai', ventes: 25000, commandes: 72 },
    { mois: 'Juin', ventes: 28000, commandes: 78 },
    { mois: 'Juil', ventes: 32000, commandes: 85 },
    { mois: 'Août', ventes: 35000, commandes: 92 },
    { mois: 'Sep', ventes: 38000, commandes: 98 },
    { mois: 'Oct', ventes: 42000, commandes: 105 },
    { mois: 'Nov', ventes: 45000, commandes: 112 },
    { mois: 'Déc', ventes: 45678, commandes: 118 }
  ];

  const topProduits = [
    { 
      id: 1,
      nom: 'Bouquet mariage premium', 
      ventes: 45, 
      revenue: 6749, 
      stock: 12,
      prix: 149.99,
      categorie: 'Mariage',
      rating: 4.8
    },
    { 
      id: 2,
      nom: 'Composition florale luxe', 
      ventes: 38, 
      revenue: 6397, 
      stock: 15,
      prix: 168.34,
      categorie: 'Luxe',
      rating: 4.9
    },
    { 
      id: 3,
      nom: 'Centre de table anniversaire', 
      ventes: 32, 
      revenue: 3039, 
      stock: 8,
      prix: 94.97,
      categorie: 'Événementiel',
      rating: 4.6
    },
    { 
      id: 4,
      nom: 'Bouquet printemps', 
      ventes: 28, 
      revenue: 2240, 
      stock: 3,
      prix: 80.00,
      categorie: 'Saison',
      rating: 4.7
    },
    { 
      id: 5,
      nom: 'Décoration mariage complète', 
      ventes: 15, 
      revenue: 4499, 
      stock: 0,
      prix: 299.93,
      categorie: 'Mariage',
      rating: 4.9
    }
  ];

  const lowStockProducts = [
    { nom: 'Décoration mariage', stock: 0, categorie: 'Mariage', urgence: 'critique' },
    { nom: 'Bouquet printemps', stock: 3, categorie: 'Saison', urgence: 'élevée' },
    { nom: 'Centre de table anniversaire', stock: 8, categorie: 'Événementiel', urgence: 'modérée' }
  ];

  const StatCard = ({ title, value, icon: Icon, change, changeType, color, link, onClick }: any) => (
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        transition: 'all 0.3s',
        cursor: link ? 'pointer' : 'default'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        if (link) {
          e.currentTarget.style.borderColor = color;
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        if (link) {
          e.currentTarget.style.borderColor = '#e5e7eb';
        }
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>{title}</p>
          <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{value}</p>
        </div>
        <div style={{
          width: '56px',
          height: '56px',
          backgroundColor: color,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 14px ${color}40`
        }}>
          <Icon style={{ width: '28px', height: '28px', color: 'white' }} />
        </div>
      </div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          {changeType === 'positive' ? (
            <ArrowUp style={{ width: '20px', height: '20px', color: '#10b981', marginRight: '8px' }} />
          ) : (
            <ArrowDown style={{ width: '20px', height: '20px', color: '#ef4444', marginRight: '8px' }} />
          )}
          <span style={{
            fontSize: '14px',
            fontWeight: '500',
            color: changeType === 'positive' ? '#10b981' : '#ef4444'
          }}>
            {change}
          </span>
        </div>
      )}
      {link && (
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
          <Eye style={{ width: '14px', height: '14px', marginRight: '4px' }} />
          Voir détails
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            border: '4px solid #e5e7eb',
            borderTopColor: '#667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '24px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '500' }}>
            Chargement du tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Tableau de bord
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Vue d'ensemble de votre activité
          </p>
        </div>

        {/* Period Selector */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Calendar style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '16px' }} />
              <span style={{ color: '#374151', fontSize: '16px', fontWeight: '600' }}>Période</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['jour', 'semaine', 'mois', 'année'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: selectedPeriod === period 
                      ? '#667eea' 
                      : '#f3f4f6',
                    color: selectedPeriod === period ? 'white' : '#374151'
                  }}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <StatCard 
            title="Total Clients" 
            value={stats.totalClients} 
            icon={Users} 
            change="+12%" 
            changeType="positive"
            color="#10b981"
            link="/admin-jay-new/clients"
            onClick={() => router.push('/admin-jay-new/clients')}
          />
          <StatCard 
            title="Total Commandes" 
            value={stats.totalCommandes} 
            icon={ShoppingCart} 
            change="+8%" 
            changeType="positive"
            color="#3b82f6"
            link="/admin-jay-new/commandes"
            onClick={() => router.push('/admin-jay-new/commandes')}
          />
          <StatCard 
            title="Chiffre d'Affaires" 
            value={`${stats.chiffreAffaires.toLocaleString()}€`} 
            icon={DollarSign} 
            change="+15%" 
            changeType="positive"
            color="#8b5cf6"
          />
          <StatCard 
            title="Panier Moyen" 
            value={`${stats.panierMoyen.toFixed(2)}€`} 
            icon={TrendingUp} 
            change="+5%" 
            changeType="positive"
            color="#f59e0b"
          />
          <StatCard 
            title="Taux de Conversion" 
            value={`${stats.tauxConversion}%`} 
            icon={TrendingUp} 
            change="+2%" 
            changeType="positive"
            color="#10b981"
          />
          <StatCard 
            title="Taux d'Abandon" 
            value={`${stats.tauxAbandon}%`} 
            icon={TrendingDown} 
            change="-3%" 
            changeType="positive"
            color="#ef4444"
          />
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          {/* Sales Chart */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <BarChart3 style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
              Évolution des ventes
            </h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {ventesMensuelles.slice(-6).map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${(item.ventes / Math.max(...ventesMensuelles.map(v => v.ventes))) * 250}px`,
                    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '8px 8px 0 0',
                    position: 'relative',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#667eea',
                      backgroundColor: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {(item.ventes / 1000).toFixed(1)}k€
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                    {item.mois}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Package style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
              Top 5 Produits
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {topProduits.map((product, index) => (
                <div 
                  key={product.id} 
                  style={{
                    padding: '16px',
                    backgroundColor: index === 0 ? '#f8fafc' : '#ffffff',
                    borderRadius: '12px',
                    border: index === 0 ? '2px solid #667eea' : '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => router.push(`/admin-jay-new/produits/${product.id}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: index === 0 ? '#667eea' : index === 1 ? '#8b5cf6' : index === 2 ? '#10b981' : index === 3 ? '#f59e0b' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px', marginBottom: '4px' }}>
                        {product.nom}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              style={{ 
                                width: '12px', 
                                height: '12px', 
                                color: i < Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb' 
                              }} 
                            />
                          ))}
                          <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '4px' }}>
                            {product.rating}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          • {product.categorie}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                      {product.revenue.toLocaleString()}€
                    </p>
                    <p style={{ fontSize: '12px', color: product.stock <= 5 ? '#ef4444' : '#10b981' }}>
                      Stock: {product.stock}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stock Alerts */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <AlertTriangle style={{ width: '24px', height: '24px', color: '#ef4444', marginRight: '12px' }} />
            Alertes de stock
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            {lowStockProducts.map((product) => (
              <div key={product.nom} style={{
                padding: '20px',
                backgroundColor: product.urgence === 'critique' ? '#fef2f2' : product.urgence === 'élevée' ? '#fffbeb' : '#f0fdf4',
                borderRadius: '12px',
                border: product.urgence === 'critique' ? '1px solid #fecaca' : product.urgence === 'élevée' ? '1px solid #fed7aa' : '1px solid #bbf7d0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div>
                  <p style={{ fontWeight: '600', color: product.urgence === 'critique' ? '#dc2626' : product.urgence === 'élevée' ? '#d97706' : '#16a34a', marginBottom: '8px' }}>
                    {product.nom}
                  </p>
                  <p style={{ fontSize: '14px', color: product.urgence === 'critique' ? '#dc2626' : product.urgence === 'élevée' ? '#d97706' : '#16a34a' }}>
                    Stock: {product.stock}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    Catégorie: {product.categorie}
                  </p>
                </div>
                <Package style={{ 
                  width: '40px', 
                  height: '40px', 
                  color: product.urgence === 'critique' ? '#dc2626' : product.urgence === 'élevée' ? '#d97706' : '#16a34a',
                  backgroundColor: product.urgence === 'critique' ? '#fecaca' : product.urgence === 'élevée' ? '#fed7aa' : '#bbf7d0',
                  borderRadius: '8px',
                  padding: '8px'
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
