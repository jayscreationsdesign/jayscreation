'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Download, Eye, Package, Calendar, TrendingUp, Crown, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function AdminPremiumCommandes() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('toutes');

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const commandes = [
    {
      id: 'CMD-2024-001',
      client: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      date: '2024-03-15',
      montant: 234.50,
      statut: 'payée',
      produits: ['Bouquet mariage premium', 'Centre de table anniversaire'],
      methodePaiement: 'Carte bancaire',
      dateLivraison: '2024-03-20'
    },
    {
      id: 'CMD-2024-002',
      client: 'Marie Martin',
      email: 'marie.martin@email.com',
      date: '2024-03-14',
      montant: 156.00,
      statut: 'en_attente',
      produits: ['Composition florale luxe'],
      methodePaiement: 'PayPal',
      dateLivraison: '2024-03-22'
    },
    {
      id: 'CMD-2024-003',
      client: 'Pierre Bernard',
      email: 'pierre.bernard@email.com',
      date: '2024-03-13',
      montant: 89.99,
      statut: 'payée',
      produits: ['Bouquet printemps'],
      methodePaiement: 'Carte bancaire',
      dateLivraison: '2024-03-18'
    },
    {
      id: 'CMD-2024-004',
      client: 'Sophie Petit',
      email: 'sophie.petit@email.com',
      date: '2024-03-12',
      montant: 445.00,
      statut: 'expédiée',
      produits: ['Décoration mariage complète', 'Faire-part personnalisés'],
      methodePaiement: 'Virement bancaire',
      dateLivraison: '2024-03-25'
    },
    {
      id: 'CMD-2024-005',
      client: 'Lucas Robert',
      email: 'lucas.robert@email.com',
      date: '2024-03-11',
      montant: 178.50,
      statut: 'annulée',
      produits: ['Centre de table anniversaire'],
      methodePaiement: 'Carte bancaire',
      dateLivraison: '-'
    }
  ];

  const filteredCommandes = commandes.filter(commande => {
    const matchesSearch = commande.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         commande.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commande.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'toutes' || commande.statut === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'payée': return <CheckCircle style={{ width: '16px', height: '16px' }} />;
      case 'en_attente': return <Clock style={{ width: '16px', height: '16px' }} />;
      case 'expédiée': return <Package style={{ width: '16px', height: '16px' }} />;
      case 'annulée': return <XCircle style={{ width: '16px', height: '16px' }} />;
      default: return null;
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'payée': return { bg: 'rgba(34,197,94,0.1)', color: '#16a34a', border: 'rgba(34,197,94,0.3)' };
      case 'en_attente': return { bg: 'rgba(251,191,36,0.1)', color: '#d97706', border: 'rgba(251,191,36,0.3)' };
      case 'expédiée': return { bg: 'rgba(59,130,246,0.1)', color: '#2563eb', border: 'rgba(59,130,246,0.3)' };
      case 'annulée': return { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'rgba(239,68,68,0.3)' };
      default: return { bg: 'rgba(107,114,128,0.1)', color: '#6b7280', border: 'rgba(107,114,128,0.3)' };
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
            Chargement des commandes royales...
          </h2>
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
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <ShoppingCart style={{ width: '48px', height: '48px', color: '#D4A574', marginRight: '20px' }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Georgia, serif'
            }}>
              Commandes Royales
            </h1>
            <Crown style={{ width: '48px', height: '48px', color: '#D4A574', marginLeft: '20px' }} />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Gestion de vos commandes d'exception
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Total Commandes</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>{commandes.length}</p>
              </div>
              <ShoppingCart style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 100%)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Commandes Payées</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>
                  {commandes.filter(c => c.statut === 'payée').length}
                </p>
              </div>
              <CheckCircle style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #8B4513 100%)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>CA Total</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>
                  {commandes.reduce((sum, c) => sum + c.montant, 0).toLocaleString()}€
                </p>
              </div>
              <TrendingUp style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '24px',
          borderRadius: '20px',
          marginBottom: '32px',
          border: '1px solid rgba(212,165,116,0.3)',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <Search style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '20px', 
              height: '20px', 
              color: '#D4A574' 
            }} />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                border: '1px solid rgba(212,165,116,0.3)',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#F5E6D3',
                fontFamily: 'Georgia, serif',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {['toutes', 'payée', 'en_attente', 'expédiée', 'annulée'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: selectedFilter === filter 
                    ? 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)'
                    : 'rgba(255,255,255,0.1)',
                  color: selectedFilter === filter ? 'white' : 'rgba(255,255,255,0.7)',
                  fontFamily: 'Georgia, serif'
                }}
              >
                {filter === 'toutes' ? 'Toutes' : filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>

          <button style={{
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            background: 'rgba(212,165,116,0.2)',
            color: '#D4A574',
            fontFamily: 'Georgia, serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Download style={{ width: '16px', height: '16px' }} />
            Exporter
          </button>
        </div>

        {/* Orders Table */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          border: '1px solid rgba(212,165,116,0.3)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(212,165,116,0.3)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Commande</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Client</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Date</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Montant</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Statut</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Livraison</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommandes.map((commande, index) => {
                  const statutColors = getStatutColor(commande.statut);
                  return (
                    <tr key={commande.id} style={{
                      borderBottom: '1px solid rgba(212,165,116,0.1)',
                      backgroundColor: index % 2 === 0 ? 'rgba(212,165,116,0.05)' : 'transparent'
                    }}>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <p style={{ fontWeight: '600', color: '#8B4513', fontSize: '16px' }}>
                            {commande.id}
                          </p>
                          <p style={{ fontSize: '12px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                            {commande.produits.length} produit{commande.produits.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>
                            {commande.client}
                          </p>
                          <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                            {commande.email}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar style={{ width: '16px', height: '16px', color: '#D4A574' }} />
                          <span style={{ fontSize: '14px', color: '#666' }}>{commande.date}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>
                          {commande.montant.toFixed(2)}€
                        </p>
                        <p style={{ fontSize: '12px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                          {commande.methodePaiement}
                        </p>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: statutColors.bg,
                          color: statutColors.color,
                          border: `1px solid ${statutColors.border}`,
                          fontFamily: 'Georgia, serif',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          {getStatutIcon(commande.statut)}
                          {commande.statut === 'en_attente' ? 'En attente' : 
                           commande.statut === 'expédiée' ? 'Expédiée' :
                           commande.statut.charAt(0).toUpperCase() + commande.statut.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <p style={{ fontSize: '14px', color: '#666' }}>
                          {commande.dateLivraison === '-' ? '-' : commande.dateLivraison}
                        </p>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: 'none',
                          cursor: 'pointer',
                          background: 'rgba(212,165,116,0.1)',
                          color: '#8B4513',
                          fontFamily: 'Georgia, serif',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Eye style={{ width: '14px', height: '14px' }} />
                          Voir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
