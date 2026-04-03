'use client';

import { useState, useEffect } from 'react';
import { Users, ShoppingCart, Package, TrendingUp, AlertTriangle, DollarSign, Eye, BarChart3, Crown, Star, Award } from 'lucide-react';

export default function AdminPremiumDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('mois');

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const stats = {
    totalClients: 156,
    totalCommandes: 89,
    chiffreAffaires: 15420,
    panierMoyen: 173.26,
    tauxConversion: 2.5,
    tauxAbandon: 15.2
  };

  const recentOrders = [
    { id: '1', client: 'Jean Dupont', email: 'jean.dupont@email.com', date: '2024-03-15', total: 234.50, statut: 'payée', produits: ['Bouquet mariage premium'] },
    { id: '2', client: 'Marie Martin', email: 'marie.martin@email.com', date: '2024-03-14', total: 156.00, statut: 'en_attente', produits: ['Centre de table anniversaire'] },
    { id: '3', client: 'Pierre Bernard', email: 'pierre.bernard@email.com', date: '2024-03-13', total: 89.99, statut: 'payée', produits: ['Composition florale luxe'] }
  ];

  const topProducts = [
    { nom: 'Bouquet de mariage premium', categorie: 'Mariage', ventes: 45, revenue: 6749, stock: 12, rating: 5 },
    { nom: 'Centre de table anniversaire', categorie: 'Événementiel', ventes: 38, revenue: 3039, stock: 8, rating: 4.8 },
    { nom: 'Composition florale luxe', categorie: 'Luxe', ventes: 32, revenue: 6397, stock: 15, rating: 4.9 }
  ];

  const lowStockProducts = [
    { nom: 'Décoration mariage', stock: 0, categorie: 'Mariage', urgence: 'critique' },
    { nom: 'Bouquet printemps', stock: 3, categorie: 'Saison', urgence: 'élevée' }
  ];

  const PremiumCard = ({ title, value, icon: Icon, change, changeType, color, gradient }: any) => (
    <div style={{
      background: gradient,
      borderRadius: '24px',
      padding: '32px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      border: '1px solid rgba(255,255,255,0.2)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.25)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <p style={{ fontSize: '16px', fontWeight: '500', color: 'rgba(255,255,255,0.9)' }}>{title}</p>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
        </div>
        <p style={{ fontSize: '36px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>{value}</p>
        {change && (
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.9)' }}>
            <span style={{ marginRight: '8px' }}>{change}</span>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: changeType === 'positive' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: changeType === 'positive' ? '#22c55e' : '#ef4444'
              }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

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
            marginBottom: '16px',
            fontFamily: 'Georgia, serif'
          }}>
            Chargement de votre espace premium...
          </h2>
          <p style={{
            color: 'rgba(212,165,116,0.8)',
            fontSize: '16px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Préparation de votre tableau de bord d'exception
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #8B4513 50%, #D4A574 75%, #F5E6D3 100%)',
      padding: '48px',
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Crown style={{ width: '48px', height: '48px', color: '#D4A574', marginRight: '20px' }} />
            <h1 style={{
              fontSize: '56px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Georgia, serif'
            }}>
              Tableau de Bord Premium
            </h1>
            <Crown style={{ width: '48px', height: '48px', color: '#D4A574', marginLeft: '20px' }} />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '20px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Vue d'exception de votre empire floral
          </p>
        </div>

        {/* Period Selector */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '24px',
          borderRadius: '20px',
          marginBottom: '48px',
          border: '1px solid rgba(212,165,116,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(212,165,116,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <BarChart3 style={{ width: '20px', height: '20px', color: '#D4A574' }} />
              </div>
              <span style={{ color: 'white', fontSize: '18px', fontWeight: '500' }}>Période d'analyse</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['jour', 'semaine', 'mois', 'année'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '12px 24px',
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
        </div>

        {/* Premium Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '56px'
        }}>
          <PremiumCard 
            title="Clients Premium" 
            value={stats.totalClients} 
            icon={Users} 
            change="+15%" 
            changeType="positive"
            color="#8B4513"
            gradient="linear-gradient(135deg, #8B4513 0%, #D4A574 100%)"
          />
          <PremiumCard 
            title="Commandes Royales" 
            value={stats.totalCommandes} 
            icon={ShoppingCart} 
            change="+12%" 
            changeType="positive"
            color="#D4A574"
            gradient="linear-gradient(135deg, #D4A574 0%, #8B4513 100%)"
          />
          <PremiumCard 
            title="Chiffre d'Affaires" 
            value={`${stats.chiffreAffaires.toLocaleString()}€`} 
            icon={DollarSign} 
            change="+18%" 
            changeType="positive"
            color="#F5E6D3"
            gradient="linear-gradient(135deg, #F5E6D3 0%, #D4A574 100%)"
          />
          <PremiumCard 
            title="Panier Moyen" 
            value={`${stats.panierMoyen.toFixed(2)}€`} 
            icon={TrendingUp} 
            change="+8%" 
            changeType="positive"
            color="#8B4513"
            gradient="linear-gradient(135deg, #2d2d2d 0%, #8B4513 100%)"
          />
        </div>

        {/* Recent Orders & Top Products */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
          gap: '32px',
          marginBottom: '56px'
        }}>
          {/* Recent Orders */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#8B4513',
                fontFamily: 'Georgia, serif'
              }}>
                Commandes Récentes
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: 'rgba(212,165,116,0.1)',
                borderRadius: '20px',
                border: '1px solid rgba(212,165,116,0.3)'
              }}>
                <Eye style={{ width: '20px', height: '20px', color: '#8B4513', marginRight: '8px' }} />
                <span style={{ color: '#8B4513', fontSize: '14px', fontWeight: '500' }}>Voir tout</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentOrders.slice(0, 5).map((order, index) => (
                <div key={order.id} style={{
                  padding: '20px',
                  background: index % 2 === 0 ? 'rgba(212,165,116,0.05)' : 'rgba(139,69,19,0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(212,165,116,0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,69,19,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#8B4513', fontSize: '16px' }}>{order.client}</p>
                      <p style={{ fontSize: '14px', color: '#666' }}>{order.email}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '14px', color: '#666' }}>{order.date}</p>
                      <p style={{ fontWeight: 'bold', fontSize: '20px', color: '#8B4513' }}>
                        {order.total.toFixed(2)}€
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: order.statut === 'payée' ? 'rgba(34,197,94,0.1)' : 'rgba(251,191,36,0.1)',
                      color: order.statut === 'payée' ? '#16a34a' : '#d97706',
                      fontFamily: 'Georgia, serif'
                    }}>
                      {order.statut === 'payée' ? '✓ Payée' : '⏳ En attente'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                      {order.produits.length} produit{order.produits.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#8B4513',
                fontFamily: 'Georgia, serif'
              }}>
                Produits Vedettes
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Star style={{ width: '24px', height: '24px', color: '#D4A574' }} />
                <Award style={{ width: '24px', height: '24px', color: '#8B4513' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {topProducts.map((product, index) => (
                <div key={product.nom} style={{
                  padding: '20px',
                  background: index === 0 ? 'linear-gradient(135deg, rgba(212,165,116,0.1) 0%, rgba(139,69,19,0.1) 100%)' : 'rgba(212,165,116,0.05)',
                  borderRadius: '16px',
                  border: index === 0 ? '2px solid rgba(212,165,116,0.3)' : '1px solid rgba(212,165,116,0.2)',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,69,19,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  {index === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '16px',
                      background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: 'Georgia, serif'
                    }}>
                      ⭐ N°1
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: index === 0 ? 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)' : 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginRight: '16px',
                        boxShadow: '0 4px 12px rgba(139,69,19,0.3)'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <p style={{ fontWeight: '600', color: '#8B4513', fontSize: '16px' }}>{product.nom}</p>
                        <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{product.categorie}</p>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                          <div style={{ display: 'flex', marginRight: '8px' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} style={{ 
                                width: '12px', 
                                height: '12px', 
                                color: i < Math.floor(product.rating) ? '#D4A574' : '#e5e7eb',
                                fill: i < Math.floor(product.rating) ? '#D4A574' : 'none'
                              }} />
                            ))}
                          </div>
                          <span style={{ fontSize: '12px', color: '#666' }}>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>{product.ventes} ventes</p>
                      <p style={{ fontWeight: 'bold', fontSize: '20px', color: '#8B4513' }}>
                        {product.revenue.toLocaleString()}€
                      </p>
                      <p style={{ fontSize: '12px', color: product.stock <= 5 ? '#dc2626' : '#16a34a', marginTop: '4px' }}>
                        Stock: {product.stock}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stock Alerts */}
        <div style={{
          background: 'rgba(239,68,68,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(239,68,68,0.15)',
          border: '2px solid rgba(239,68,68,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#dc2626',
              fontFamily: 'Georgia, serif',
              display: 'flex',
              alignItems: 'center'
            }}>
              <AlertTriangle style={{ width: '32px', height: '32px', color: '#dc2626', marginRight: '16px' }} />
              Alertes Critiques de Stock
            </h2>
            <span style={{
              background: 'rgba(239,68,68,0.1)',
              color: '#dc2626',
              padding: '12px 24px',
              borderRadius: '20px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Georgia, serif'
            }}>
              {lowStockProducts.length > 1 ? `${lowStockProducts.length} produits critiques` : `${lowStockProducts.length} produit critique`}
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {lowStockProducts.map((product) => (
              <div key={product.nom} style={{
                padding: '24px',
                background: product.urgence === 'critique' ? 'rgba(239,68,68,0.1)' : 'rgba(251,191,36,0.1)',
                borderRadius: '16px',
                border: product.urgence === 'critique' ? '2px solid rgba(239,68,68,0.3)' : '2px solid rgba(251,191,36,0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {product.urgence === 'critique' && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #dc2626 100%)',
                    animation: 'pulse 2s infinite'
                  }}></div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: '600', color: product.urgence === 'critique' ? '#dc2626' : '#d97706', fontSize: '18px' }}>
                      {product.nom}
                    </p>
                    <p style={{ fontSize: '16px', color: product.urgence === 'critique' ? '#dc2626' : '#d97706', marginBottom: '8px' }}>
                      Stock: {product.stock}
                    </p>
                    <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                      Catégorie: {product.categorie}
                    </p>
                  </div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: product.urgence === 'critique' ? 'rgba(239,68,68,0.2)' : 'rgba(251,191,36,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Package style={{ 
                      width: '32px', 
                      height: '32px', 
                      color: product.urgence === 'critique' ? '#dc2626' : '#d97706' 
                    }} />
                  </div>
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
