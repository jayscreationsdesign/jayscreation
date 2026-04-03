'use client';

import { useState, useEffect } from 'react';
import { Users, ShoppingCart, Package, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Eye, BarChart3, Calendar, Filter } from 'lucide-react';

export default function AdminJayDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('mois');

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
    { nom: 'Bouquet mariage premium', ventes: 45, revenue: 6749, stock: 12 },
    { nom: 'Composition florale luxe', ventes: 38, revenue: 6397, stock: 15 },
    { nom: 'Centre de table anniversaire', ventes: 32, revenue: 3039, stock: 8 },
    { nom: 'Bouquet printemps', ventes: 28, revenue: 2240, stock: 3 },
    { nom: 'Décoration mariage complète', ventes: 15, revenue: 4499, stock: 0 }
  ];

  const lowStockProducts = [
    { nom: 'Décoration mariage', stock: 0, categorie: 'Mariage', urgence: 'critique' },
    { nom: 'Bouquet printemps', stock: 3, categorie: 'Saison', urgence: 'élevée' },
    { nom: 'Centre de table anniversaire', stock: 8, categorie: 'Événementiel', urgence: 'modérée' }
  ];

  const StatCard = ({ title, value, icon: Icon, change, changeType, color }: any) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.2s'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>{title}</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{value}</p>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: color,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
      </div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
          {changeType === 'positive' ? (
            <TrendingUp style={{ width: '16px', height: '16px', color: '#10b981', marginRight: '4px' }} />
          ) : (
            <TrendingDown style={{ width: '16px', height: '16px', color: '#ef4444', marginRight: '4px' }} />
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
    </div>
  );

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e2e8f0',
            borderTopColor: '#6366f1',
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
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Tableau de bord
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Vue d'ensemble de votre activité
          </p>
        </div>

        {/* Period Selector */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Calendar style={{ width: '20px', height: '20px', color: '#6366f1', marginRight: '12px' }} />
              <span style={{ color: '#374151', fontSize: '16px', fontWeight: '500' }}>Période</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['jour', 'semaine', 'mois', 'année'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: selectedPeriod === period 
                      ? '#6366f1' 
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <StatCard 
            title="Total Clients" 
            value={stats.totalClients} 
            icon={Users} 
            change="+12%" 
            changeType="positive"
            color="#3b82f6"
          />
          <StatCard 
            title="Total Commandes" 
            value={stats.totalCommandes} 
            icon={ShoppingCart} 
            change="+8%" 
            changeType="positive"
            color="#10b981"
          />
          <StatCard 
            title="Chiffre d'Affaires" 
            value={`${stats.chiffreAffaires.toLocaleString()}€`} 
            icon={DollarSign} 
            change="+15%" 
            changeType="positive"
            color="#6366f1"
          />
          <StatCard 
            title="Panier Moyen" 
            value={`${stats.panierMoyen.toFixed(2)}€`} 
            icon={TrendingUp} 
            change="+5%" 
            changeType="positive"
            color="#8b5cf6"
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
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '24px'
            }}>
              Évolution des ventes
            </h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {ventesMensuelles.slice(-6).map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${(item.ventes / Math.max(...ventesMensuelles.map(v => v.ventes))) * 250}px`,
                    backgroundColor: '#6366f1',
                    borderRadius: '4px 4px 0 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#6366f1'
                    }}>
                      {(item.ventes / 1000).toFixed(1)}k
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
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '24px'
            }}>
              Top 5 Produits
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {topProduits.map((product, index) => (
                <div key={product.nom} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#6366f1' : index === 1 ? '#8b5cf6' : index === 2 ? '#10b981' : '#f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>{product.nom}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>{product.ventes} ventes</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
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
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <AlertTriangle style={{ width: '20px', height: '20px', color: '#ef4444', marginRight: '8px' }} />
            Alertes de stock
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            {lowStockProducts.map((product) => (
              <div key={product.nom} style={{
                padding: '16px',
                backgroundColor: product.urgence === 'critique' ? '#fef2f2' : product.urgence === 'élevée' ? '#fffbeb' : '#f0fdf4',
                borderRadius: '8px',
                border: product.urgence === 'critique' ? '1px solid #fecaca' : product.urgence === 'élevée' ? '1px solid #fed7aa' : '1px solid #bbf7d0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: '600', color: product.urgence === 'critique' ? '#dc2626' : product.urgence === 'élevée' ? '#d97706' : '#16a34a' }}>
                      {product.nom}
                    </p>
                    <p style={{ fontSize: '14px', color: product.urgence === 'critique' ? '#dc2626' : product.urgence === 'élevée' ? '#d97706' : '#16a34a' }}>
                      Stock: {product.stock}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Catégorie: {product.categorie}</p>
                  </div>
                  <Package style={{ 
                    width: '32px', 
                    height: '32px', 
                    color: product.urgence === 'critique' ? '#dc2626' : product.urgence === 'élevée' ? '#d97706' : '#16a34a' 
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
