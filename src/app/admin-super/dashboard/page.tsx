'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  DollarSign,
  Eye
} from 'lucide-react';

export default function AdminSuperDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
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
    { id: '1', client: 'Jean Dupont', email: 'jean.dupont@email.com', date: '2024-03-15', total: 234.50 },
    { id: '2', client: 'Marie Martin', email: 'marie.martin@email.com', date: '2024-03-14', total: 156.00 },
    { id: '3', client: 'Pierre Bernard', email: 'pierre.bernard@email.com', date: '2024-03-13', total: 89.99 }
  ];

  const topProducts = [
    { nom: 'Bouquet de mariage premium', ventes: 45, revenue: 6749 },
    { nom: 'Centre de table anniversaire', ventes: 38, revenue: 3039 },
    { nom: 'Composition florale luxe', ventes: 32, revenue: 6397 }
  ];

  const lowStockProducts = [
    { nom: 'Bouquet printemps', stock: 2 },
    { nom: 'Décoration mariage', stock: 0 },
    { nom: 'Composition romantique', stock: 4 }
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Vue d'ensemble de votre activité
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Total Clients
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.totalClients}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#3b82f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Total Commandes
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.totalCommandes}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#10b981',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingCart style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Chiffre d'Affaires
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.chiffreAffaires.toLocaleString()}€
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#8B4513',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Panier Moyen
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.panierMoyen.toFixed(2)}€
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#6366f1',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Taux Conversion
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.tauxConversion}%
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#f59e0b',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Package style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Taux Abandon
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.tauxAbandon}%
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#ef4444',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Recent Orders */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center'
          }}>
            Commandes Récentes
            <Eye style={{ marginLeft: '8px', width: '20px', height: '20px', color: '#8B4513' }} />
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentOrders.map((order) => (
              <div key={order.id} style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: '500', color: '#1f2937' }}>{order.client}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>{order.email}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>{order.date}</p>
                    <p style={{ fontWeight: 'bold', color: '#1f2937' }}>{order.total.toFixed(2)}€</p>
                  </div>
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
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Top Produits
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topProducts.map((product, index) => (
              <div key={product.nom} style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
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
                      <p style={{ fontWeight: '500', color: '#1f2937' }}>{product.nom}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>{product.ventes} ventes</p>
                    <p style={{ fontWeight: 'bold', color: '#1f2937' }}>{product.revenue.toLocaleString()}€</p>
                  </div>
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
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center'
        }}>
          Alertes Stock
          <AlertTriangle style={{ marginLeft: '8px', width: '20px', height: '20px', color: '#ef4444' }} />
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px'
        }}>
          {lowStockProducts.map((product) => (
            <div key={product.nom} style={{
              padding: '12px',
              backgroundColor: product.stock === 0 ? '#fef2f2' : '#fef3c7',
              borderRadius: '8px',
              border: product.stock === 0 ? '1px solid #fecaca' : '1px solid #fbbf24'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '500', color: product.stock === 0 ? '#dc2626' : '#92400e' }}>
                    {product.nom}
                  </p>
                  <p style={{ fontSize: '12px', color: product.stock === 0 ? '#dc2626' : '#92400e' }}>
                    Stock: {product.stock}
                  </p>
                </div>
                <AlertTriangle style={{ width: '16px', height: '16px', color: product.stock === 0 ? '#dc2626' : '#92400e' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
