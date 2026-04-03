'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar, DollarSign, Users, Package, Crown, Download, Filter } from 'lucide-react';

export default function AdminPremiumStatistiques() {
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
      }
    },
    commandes: {
      total: 892,
      growth: 12.5,
      monthly: [45, 52, 58, 65, 72, 78, 85, 92, 98, 105, 112, 118, 892],
      status: {
        'Payées': 456,
        'En attente': 234,
        'Expédiées': 156,
        'Annulées': 46
      }
    },
    clients: {
      total: 1245,
      growth: 18.7,
      monthly: [80, 95, 110, 125, 140, 155, 170, 185, 200, 215, 230, 245, 1245],
      types: {
        'VIP': 156,
        'Premium': 324,
        'Standard': 765
      }
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
            Chargement des analytiques premium...
          </h2>
        </div>
      </div>
    );
  }

  const currentData = statsData[selectedMetric as keyof typeof statsData];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #8B4513 50%, #D4A574 75%, #F5E6D3 100%)',
      padding: '48px',
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <BarChart3 style={{ width: '48px', height: '48px', color: '#D4A574', marginRight: '20px' }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Georgia, serif'
            }}>
              Analytiques Premium
            </h1>
            <Crown style={{ width: '48px', height: '48px', color: '#D4A574', marginLeft: '20px' }} />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Analyse approfondie de votre performance
          </p>
        </div>

        {/* Period and Metric Selectors */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid rgba(212,165,116,0.3)',
            flex: 1,
            minWidth: '300px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Calendar style={{ width: '24px', height: '24px', color: '#D4A574', marginRight: '12px' }} />
              <span style={{ color: 'white', fontSize: '16px', fontWeight: '500', fontFamily: 'Georgia, serif' }}>
                Période d'analyse
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['jour', 'semaine', 'mois', 'année'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    background: selectedPeriod === period 
                      ? 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)'
                      : 'rgba(255,255,255,0.1)',
                    color: selectedPeriod === period ? 'white' : 'rgba(255,255,255,0.7)',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid rgba(212,165,116,0.3)',
            flex: 1,
            minWidth: '300px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Filter style={{ width: '24px', height: '24px', color: '#D4A574', marginRight: '12px' }} />
              <span style={{ color: 'white', fontSize: '16px', fontWeight: '500', fontFamily: 'Georgia, serif' }}>
                Métrique principale
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['ventes', 'commandes', 'clients', 'produits'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    background: selectedMetric === metric 
                      ? 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)'
                      : 'rgba(255,255,255,0.1)',
                    color: selectedMetric === metric ? 'white' : 'rgba(255,255,255,0.7)',
                    fontFamily: 'Georgia, serif'
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(212,165,116,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>
                Total {selectedMetric === 'ventes' ? 'Ventes' : 
                        selectedMetric === 'commandes' ? 'Commandes' :
                        selectedMetric === 'clients' ? 'Clients' : 'Produits'}
              </p>
              <p style={{ fontSize: '42px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
                {selectedMetric === 'ventes' ? `${currentData.total.toLocaleString()}€` :
                 selectedMetric === 'commandes' ? currentData.total :
                 currentData.total}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp style={{ width: '20px', height: '20px', color: 'rgba(255,255,255,0.8)' }} />
                <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)' }}>
                  +{currentData.growth}% vs période précédente
                </span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 100%)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>
                  Moyenne {selectedPeriod}
                </p>
                <p style={{ fontSize: '42px', fontWeight: '700', color: 'white' }}>
                  {selectedMetric === 'ventes' ? `${Math.round(currentData.total / 12).toLocaleString()}€` :
                   selectedMetric === 'commandes' ? Math.round(currentData.total / 12) :
                   Math.round(currentData.total / 12)}
                </p>
              </div>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedMetric === 'ventes' ? <DollarSign style={{ width: '32px', height: '32px', color: 'white' }} /> :
                 selectedMetric === 'commandes' ? <Package style={{ width: '32px', height: '32px', color: 'white' }} /> :
                 <Users style={{ width: '32px', height: '32px', color: 'white' }} />}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {/* Monthly Trend Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#8B4513',
              marginBottom: '24px',
              fontFamily: 'Georgia, serif'
            }}>
              Évolution mensuelle
            </h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {currentData.monthly.slice(-12).map((value, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${(value / Math.max(...currentData.monthly)) * 250}px`,
                    background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
                    borderRadius: '8px 8px 0 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#8B4513',
                      whiteSpace: 'nowrap'
                    }}>
                      {selectedMetric === 'ventes' ? `${(value / 1000).toFixed(1)}k` : value}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories/Status Breakdown */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#8B4513',
              marginBottom: '24px',
              fontFamily: 'Georgia, serif'
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
                currentData.top.reduce((acc, item) => ({ ...acc, [item.nom]: item.ventes }), {})
              ).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '120px',
                    fontSize: '14px',
                    color: '#666',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic'
                  }}>
                    {key}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: '24px',
                      background: 'rgba(212,165,116,0.2)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${(value / Object.values(
                          selectedMetric === 'ventes' ? currentData.categories :
                          selectedMetric === 'commandes' ? currentData.status :
                          selectedMetric === 'clients' ? currentData.types :
                          currentData.top.reduce((acc, item) => ({ ...acc, [item.nom]: item.ventes }), {})
                        ).reduce((a, b) => a + b, 0)) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
                        borderRadius: '12px'
                      }}></div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#8B4513',
                    minWidth: '80px',
                    textAlign: 'right'
                  }}>
                    {selectedMetric === 'ventes' ? `${(value as number).toLocaleString()}€` : value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products (if selected) */}
        {selectedMetric === 'produits' && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#8B4513',
              marginBottom: '24px',
              fontFamily: 'Georgia, serif'
            }}>
              Top 5 Produits
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentData.top.map((product, index) => (
                <div key={product.nom} style={{
                  padding: '20px',
                  background: index === 0 ? 'linear-gradient(135deg, rgba(212,165,116,0.1) 0%, rgba(139,69,19,0.1) 100%)' : 'rgba(212,165,116,0.05)',
                  borderRadius: '16px',
                  border: index === 0 ? '2px solid rgba(212,165,116,0.3)' : '1px solid rgba(212,165,116,0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: index === 0 ? 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)' : 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>
                        {product.nom}
                      </p>
                      <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                        {product.ventes} ventes
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#8B4513' }}>
                      {product.revenue.toLocaleString()}€
                    </p>
                    <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif' }}>
                      CA généré
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button style={{
            padding: '16px 32px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
            color: 'white',
            fontFamily: 'Georgia, serif',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(139,69,19,0.4)',
            transition: 'all 0.3s'
          }}>
            <Download style={{ width: '20px', height: '20px' }} />
            Exporter le rapport complet
          </button>
        </div>
      </div>
    </div>
  );
}
