'use client';

import { useState, useEffect } from 'react';
import { Users, ShoppingCart, Package, TrendingUp, AlertTriangle, DollarSign, Eye, BarChart3 } from 'lucide-react';

export default function AdminLuxeDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const recentOrders = [
    { id: '1', client: 'Jean Dupont', email: 'jean.dupont@email.com', date: '2024-03-15', total: 234.50, statut: 'payée' },
    { id: '2', client: 'Marie Martin', email: 'marie.martin@email.com', date: '2024-03-14', total: 156.00, statut: 'en_attente' },
    { id: '3', client: 'Pierre Bernard', email: 'pierre.bernard@email.com', date: '2024-03-13', total: 89.99, statut: 'payée' }
  ];

  const topProducts = [
    { nom: 'Bouquet de mariage premium', categorie: 'Mariage', ventes: 45, revenue: 6749, stock: 12 },
    { nom: 'Centre de table anniversaire', categorie: 'Événementiel', ventes: 38, revenue: 3039, stock: 8 },
    { nom: 'Composition florale luxe', categorie: 'Luxe', ventes: 32, revenue: 6397, stock: 15 }
  ];

  const lowStockProducts = [
    { nom: 'Décoration mariage', stock: 0, categorie: 'Mariage' },
    { nom: 'Bouquet printemps', stock: 3, categorie: 'Saison' }
  ];

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f5f4 0%, #faf9f7 50%, #fef3e2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid #8B4513',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '24px'
          }}></div>
          <p style={{ color: '#8B4513', fontSize: '18px', fontWeight: '500' }}>
            Chargement du tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
          Tableau de bord
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Vue d'ensemble de votre activité commerciale
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Total Clients
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a' }}>
                {stats.totalClients}
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#3b82f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Total Commandes
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a' }}>
                {stats.totalCommandes}
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#10b981',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingCart style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Chiffre d'Affaires
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a' }}>
                {stats.chiffreAffaires.toLocaleString()}€
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#8B4513',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Panier Moyen
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a' }}>
                {stats.panierMoyen.toFixed(2)}€
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#6366f1',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              Commandes récentes
            </h2>
            <Eye style={{ width: '20px', height: '20px', color: '#8B4513' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentOrders.slice(0, 5).map((order) => (
              <div key={order.id} style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: '600', color: '#1a1a1a' }}>{order.client}</p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{order.email}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{order.date}</p>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#1a1a1a' }}>
                      {order.total.toFixed(2)}€
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: order.statut === 'payée' ? '#dcfce7' : order.statut === 'en_attente' ? '#fef3c7' : '#f3f4f6',
                    color: order.statut === 'payée' ? '#166534' : order.statut === 'en_attente' ? '#92400e' : '#6b7280'
                  }}>
                    {order.statut === 'payée' ? 'Payée' : order.statut === 'en_attente' ? 'En attente' : order.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              Top produits
            </h2>
            <BarChart3 style={{ width: '20px', height: '20px', color: '#8B4513' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topProducts.map((product, index) => (
              <div key={product.nom} style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#8B4513' : index === 1 ? '#9ca3af' : '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ marginLeft: '12px' }}>
                      <p style={{ fontWeight: '600', color: '#1a1a1a' }}>{product.nom}</p>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>{product.categorie}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{product.ventes} ventes</p>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#1a1a1a' }}>
                      {product.revenue.toLocaleString()}€
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1a1a1a',
            display: 'flex',
            alignItems: 'center'
          }}>
            <AlertTriangle style={{ width: '20px', height: '20px', color: '#ef4444', marginRight: '12px' }} />
            Alertes de stock
          </h2>
          <span style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {lowStockProducts.length > 1 ? `${lowStockProducts.length} produits critiques` : `${lowStockProducts.length} produit critique`}
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {lowStockProducts.map((product) => (
            <div key={product.nom} style={{
              padding: '16px',
              backgroundColor: '#fef2f2',
              borderRadius: '12px',
              border: '1px solid #fecaca'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#dc2626' }}>{product.nom}</p>
                  <p style={{ fontSize: '14px', color: '#b91c1c' }}>Stock: {product.stock}</p>
                  <p style={{ fontSize: '12px', color: '#991b1b' }}>Catégorie: {product.categorie}</p>
                </div>
                <Package style={{ width: '32px', height: '32px', color: '#ef4444' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
