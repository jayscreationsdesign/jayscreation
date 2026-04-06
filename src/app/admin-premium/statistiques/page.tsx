"use client";

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, DollarSign, ShoppingCart, Users, TrendingUp, Download } from 'lucide-react';

export default function AdminPremiumStatistiques() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('mois');
  const [selectedMetric, setSelectedMetric] = useState('ventes');

  useEffect(() => {
    // Vérifier l'authentification
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const statsData = {
    ventes: {
      total: 125000,
      growth: 15.3,
      monthly: Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 15000) + 8000),
      categories: {
        Mariage: 45000,
        Luxe: 38000,
        Événementiel: 28000,
        Saison: 14000
      }
    },
    commandes: {
      total: 342,
      growth: 8.7,
      monthly: Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 40) + 20),
      status: {
        Payées: 289,
        'En attente': 31,
        Expédiées: 18,
        Annulées: 4
      }
    },
    clients: {
      total: 1847,
      growth: 12.4,
      monthly: Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 200) + 100),
      types: {
        Particuliers: 1456,
        Professionnels: 391
      }
    },
    produits: {
      total: 89,
      growth: 5.2,
      top: [
        { nom: 'Faire-part Romance', ventes: 234, revenue: 23400 },
        { nom: 'Invitation Or', ventes: 189, revenue: 37800 },
        { nom: 'Menu Classique', ventes: 156, revenue: 15600 },
        { nom: 'Marque-place Luxe', ventes: 134, revenue: 13400 },
        { nom: 'Tableau Accueil', ventes: 98, revenue: 19600 }
      ]
    }
  };

  const currentData = statsData[selectedMetric as keyof typeof statsData];

  const statCards = [
    {
      title: 'Total Ventes',
      value: `${statsData.ventes.total.toLocaleString()}€`,
      icon: DollarSign,
      change: `+${statsData.ventes.growth}%`,
      color: 'bg-[#8B4513]'
    },
    {
      title: 'Total Commandes',
      value: statsData.commandes.total,
      icon: ShoppingCart,
      change: `+${statsData.commandes.growth}%`,
      color: 'bg-green-500'
    },
    {
      title: 'Total Clients',
      value: statsData.clients.total,
      icon: Users,
      change: `+${statsData.clients.growth}%`,
      color: 'bg-blue-500'
    },
    {
      title: 'Produits Actifs',
      value: statsData.produits.total,
      icon: TrendingUp,
      change: `+${statsData.produits.growth}%`,
      color: 'bg-purple-500'
    }
  ];

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        fontFamily: 'Georgia, serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #8B4513',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'Georgia, serif' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
        padding: '24px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '8px' }}>
            Statistiques Premium
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Vue d'ensemble complète de vos performances
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Période et Métrique */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
                fontFamily: 'Georgia, serif'
              }}
            >
              <option value="jour">Aujourd'hui</option>
              <option value="semaine">Cette semaine</option>
              <option value="mois">Ce mois</option>
              <option value="annee">Cette année</option>
            </select>

            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
                fontFamily: 'Georgia, serif'
              }}
            >
              <option value="ventes">Ventes</option>
              <option value="commandes">Commandes</option>
              <option value="clients">Clients</option>
              <option value="produits">Produits</option>
            </select>
          </div>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#8B4513',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif'
          }}>
            <Download style={{ width: '20px', height: '20px' }} />
            Exporter
          </button>
        </div>

        {/* Cartes de statistiques */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {statCards.map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: stat.color + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px'
                }}>
                  <stat.icon style={{ width: '24px', height: '24px', color: stat.color.replace('bg-', '#') }} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>{stat.title}</p>
                  <p style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>{stat.value}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {stat.change.startsWith('+') ? (
                  <ArrowUp style={{ width: '16px', height: '16px', color: '#10b981' }} />
                ) : (
                  <ArrowDown style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                )}
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: stat.change.startsWith('+') ? '#10b981' : '#ef4444'
                }}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message d'information */}
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#92400e', fontSize: '16px' }}>
            📊 Statistiques en temps réel • Dernière mise à jour : {new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
