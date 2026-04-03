'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar, DollarSign, Users, Package, Download, Filter, RefreshCw } from 'lucide-react';

export default function AdminJayStatistiques() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('mois');
  const [selectedMetric, setSelectedMetric] = useState('ventes');

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const statsData = {
    ventes: {
      total: 45678,
      growth: 15.2,
      monthly: [12000, 15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 45678],
      categories: {
        'Mariage': 15678,
        'Luxe': 12456,
        'Événementiel': 9876,
        'Saison': 7668
      },
      daily: [450, 520, 480, 610, 580, 720, 690, 750, 820, 780, 850, 920, 890]
    },
    commandes: {
      total: 892,
      growth: 12.5,
      monthly: [45, 52, 58, 65, 72, 78, 85, 92, 98, 105, 112, 118],
      status: {
        'Payées': 456,
        'En attente': 234,
        'Expédiées': 156,
        'Annulées': 46
      },
      daily: [15, 18, 16, 20, 19, 22, 21, 23, 25, 24, 26, 28, 27]
    },
    clients: {
      total: 1245,
      growth: 18.7,
      monthly: [80, 95, 110, 125, 140, 155, 170, 185, 200, 215, 230, 245],
      types: {
        'VIP': 156,
        'Premium': 324,
        'Standard': 765
      },
      daily: [3, 4, 3, 5, 4, 6, 5, 6, 7, 6, 8, 7, 9]
    },
    produits: {
      total: 45,
      growth: 8.3,
      top: [
        { nom: 'Bouquet mariage premium', ventes: 156, revenue: 23400 },
        { nom: 'Composition florale luxe', ventes: 134, revenue: 26800 },
        { nom: 'Centre de table anniversaire', ventes: 98, revenue: 7840 },
        { nom: 'Bouquet printemps', ventes: 87, revenue: 7830 },
        { nom: 'Décoration mariage complète', ventes: 45, revenue: 13500 }
      ]
    }
  };

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
            Chargement des statistiques...
          </p>
        </div>
      </div>
    );
  }

  const currentData = statsData[selectedMetric as keyof typeof statsData] as any;

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
            Statistiques détaillées
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Analyse approfondie de votre performance
          </p>
        </div>

        {/* Period and Metric Selectors */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Calendar style={{ width: '20px', height: '20px', color: '#6366f1', marginRight: '12px' }} />
              <span style={{ color: '#374151', fontSize: '16px', fontWeight: '500' }}>Période d'analyse</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['jour', 'semaine', 'mois', 'année'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
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

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <BarChart3 style={{ width: '20px', height: '20px', color: '#6366f1', marginRight: '12px' }} />
              <span style={{ color: '#374151', fontSize: '16px', fontWeight: '500' }}>Métrique principale</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['ventes', 'commandes', 'clients', 'produits'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: selectedMetric === metric 
                      ? '#6366f1' 
                      : '#f3f4f6',
                    color: selectedMetric === metric ? 'white' : '#374151'
                  }}
                >
                  {metric === 'ventes' ? 'Ventes' :
                   metric === 'commandes' ? 'Commandes' :
                   metric === 'clients' ? 'Clients' : 'Produits'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                  Total {selectedMetric === 'ventes' ? 'Ventes' : 
                          selectedMetric === 'commandes' ? 'Commandes' :
                          selectedMetric === 'clients' ? 'Clients' : 'Produits'}
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                  {selectedMetric === 'ventes' ? `${currentData.total.toLocaleString()}€` :
                   selectedMetric === 'commandes' ? currentData.total :
                   currentData.total}
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#6366f1',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedMetric === 'ventes' ? <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} /> :
                 selectedMetric === 'commandes' ? <Package style={{ width: '24px', height: '24px', color: 'white' }} /> :
                 <Users style={{ width: '24px', height: '24px', color: 'white' }} />}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
              <TrendingUp style={{ width: '16px', height: '16px', color: '#10b981', marginRight: '8px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#10b981' }}>
                +{currentData.growth}% vs période précédente
              </span>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                  Moyenne {selectedPeriod}
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                  {selectedMetric === 'ventes' ? `${Math.round(currentData.total / 12).toLocaleString()}€` :
                   selectedMetric === 'commandes' ? Math.round(currentData.total / 12) :
                   Math.round(currentData.total / 12)}
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#8b5cf6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Monthly Trend Chart */}
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
              Évolution mensuelle
            </h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {currentData.monthly.slice(-12).map((value: number, index: number) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${(value / Math.max(...currentData.monthly)) * 250}px`,
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
                      {selectedMetric === 'ventes' ? `${(value / 1000).toFixed(1)}k` : value}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Trend Chart */}
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
              Évolution quotidienne (13 derniers jours)
            </h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
              {currentData.daily.slice(-13).map((value: number, index: number) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${(value / Math.max(...currentData.daily)) * 250}px`,
                    backgroundColor: '#8b5cf6',
                    borderRadius: '2px 2px 0 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#8b5cf6'
                    }}>
                      {value}
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown */}
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
            Répartition par {selectedMetric === 'ventes' ? 'catégorie' : 
                           selectedMetric === 'commandes' ? 'statut' :
                           selectedMetric === 'clients' ? 'type' : 'performance'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(
              selectedMetric === 'ventes' ? currentData.categories :
              selectedMetric === 'commandes' ? currentData.status :
              selectedMetric === 'clients' ? currentData.types :
              currentData.top.reduce((acc: any, item: any) => ({ ...acc, [item.nom]: item.ventes }), {})
            ).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '120px', fontSize: '14px', color: '#64748b' }}>
                  {key}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    height: '24px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: `${(value as number / Object.values(
                        selectedMetric === 'ventes' ? currentData.categories :
                        selectedMetric === 'commandes' ? currentData.status :
                        selectedMetric === 'clients' ? currentData.types :
                        currentData.top.reduce((acc: any, item: any) => ({ ...acc, [item.nom]: item.ventes }), {})
                      ).reduce((a: number, b: number) => a + b, 0)) * 100}%`,
                      height: '100%',
                      backgroundColor: '#6366f1',
                      borderRadius: '12px'
                    }}></div>
                  </div>
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1e293b',
                  minWidth: '80px',
                  textAlign: 'right'
                }}>
                  {selectedMetric === 'ventes' ? `${(value as number).toLocaleString()}€` : value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products (if selected) */}
        {selectedMetric === 'produits' && (
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentData.top.map((product: any, index: number) => (
                <div key={product.nom} style={{
                  padding: '16px',
                  backgroundColor: index === 0 ? '#f8fafc' : '#ffffff',
                  borderRadius: '8px',
                  border: index === 0 ? '2px solid #6366f1' : '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#6366f1' : index === 1 ? '#8b5cf6' : '#10b981',
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
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                        {product.nom}
                      </p>
                      <p style={{ fontSize: '14px', color: '#64748b' }}>
                        {product.ventes} ventes
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>
                      {product.revenue.toLocaleString()}€
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                      CA généré
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button style={{
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}
          >
            <Download style={{ width: '20px', height: '20px' }} />
            Exporter le rapport complet
          </button>
        </div>
      </div>
    </div>
  );
}
