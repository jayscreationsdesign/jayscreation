'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Filter, Download, Eye, Mail, Phone, Calendar, TrendingUp, Crown } from 'lucide-react';

export default function AdminPremiumClients() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('tous');

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const clients = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@email.com',
      telephone: '06 12 34 56 78',
      dateInscription: '2024-01-15',
      nombreCommandes: 5,
      montantTotal: 1250.50,
      statut: 'VIP',
      derniereCommande: '2024-03-10'
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Marie',
      email: 'marie.martin@email.com',
      telephone: '06 23 45 67 89',
      dateInscription: '2024-02-20',
      nombreCommandes: 3,
      montantTotal: 890.00,
      statut: 'Premium',
      derniereCommande: '2024-03-12'
    },
    {
      id: 3,
      nom: 'Bernard',
      prenom: 'Pierre',
      email: 'pierre.bernard@email.com',
      telephone: '06 34 56 78 90',
      dateInscription: '2024-01-08',
      nombreCommandes: 8,
      montantTotal: 2340.75,
      statut: 'VIP',
      derniereCommande: '2024-03-14'
    },
    {
      id: 4,
      nom: 'Petit',
      prenom: 'Sophie',
      email: 'sophie.petit@email.com',
      telephone: '06 45 67 89 01',
      dateInscription: '2024-03-01',
      nombreCommandes: 1,
      montantTotal: 156.00,
      statut: 'Standard',
      derniereCommande: '2024-03-05'
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'tous' || client.statut === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
            Chargement des clients premium...
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
            <Users style={{ width: '48px', height: '48px', color: '#D4A574', marginRight: '20px' }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Georgia, serif'
            }}>
              Clients Premium
            </h1>
            <Crown style={{ width: '48px', height: '48px', color: '#D4A574', marginLeft: '20px' }} />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Gestion de votre clientèle d'exception
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
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Total Clients</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>{clients.length}</p>
              </div>
              <Users style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
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
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Clients VIP</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>
                  {clients.filter(c => c.statut === 'VIP').length}
                </p>
              </div>
              <Crown style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
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
                  {clients.reduce((sum, c) => sum + c.montantTotal, 0).toLocaleString()}€
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
              placeholder="Rechercher un client..."
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
            {['tous', 'VIP', 'Premium', 'Standard'].map((filter) => (
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
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
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

        {/* Clients Table */}
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
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Client</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Contact</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Inscription</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Commandes</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Total</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Statut</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <tr key={client.id} style={{
                    borderBottom: '1px solid rgba(212,165,116,0.1)',
                    backgroundColor: index % 2 === 0 ? 'rgba(212,165,116,0.05)' : 'transparent'
                  }}>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <p style={{ fontWeight: '600', color: '#8B4513', fontSize: '16px' }}>
                          {client.prenom} {client.nom}
                        </p>
                        <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                          #{client.id.toString().padStart(4, '0')}
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail style={{ width: '16px', height: '16px', color: '#D4A574' }} />
                          <span style={{ fontSize: '14px', color: '#666' }}>{client.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Phone style={{ width: '16px', height: '16px', color: '#D4A574' }} />
                          <span style={{ fontSize: '14px', color: '#666' }}>{client.telephone}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar style={{ width: '16px', height: '16px', color: '#D4A574' }} />
                        <span style={{ fontSize: '14px', color: '#666' }}>{client.dateInscription}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>
                          {client.nombreCommandes}
                        </p>
                        <p style={{ fontSize: '12px', color: '#666', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                          Dernière: {client.derniereCommande}
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>
                        {client.montantTotal.toFixed(2)}€
                      </p>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: 
                          client.statut === 'VIP' ? 'rgba(212,165,116,0.2)' :
                          client.statut === 'Premium' ? 'rgba(139,69,19,0.2)' :
                          'rgba(107,114,128,0.2)',
                        color: 
                          client.statut === 'VIP' ? '#8B4513' :
                          client.statut === 'Premium' ? '#D4A574' :
                          '#6b7280',
                        fontFamily: 'Georgia, serif'
                      }}>
                        {client.statut === 'VIP' && <Crown style={{ width: '12px', height: '12px', marginRight: '4px', display: 'inline' }} />}
                        {client.statut}
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
