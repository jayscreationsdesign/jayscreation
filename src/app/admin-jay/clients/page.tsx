'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Filter, Download, Eye, Mail, Phone, Calendar, TrendingUp, ChevronRight } from 'lucide-react';

export default function AdminJayClients() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('tous');
  const [selectedClient, setSelectedClient] = useState<any>(null);

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
      derniereCommande: '2024-03-10',
      notes: 'Client fidèle, commande régulièrement des bouquets pour événements familiaux.'
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
      derniereCommande: '2024-03-12',
      notes: 'Intéressée par les compositions florales luxueuses.'
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
      derniereCommande: '2024-03-14',
      notes: 'Client entreprise, commande pour événements professionnels.'
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
      derniereCommande: '2024-03-05',
      notes: 'Première commande, potentiel d\'évolution.'
    },
    {
      id: 5,
      nom: 'Robert',
      prenom: 'Lucas',
      email: 'lucas.robert@email.com',
      telephone: '06 56 78 90 12',
      dateInscription: '2024-02-10',
      nombreCommandes: 4,
      montantTotal: 678.25,
      statut: 'Premium',
      derniereCommande: '2024-03-08',
      notes: 'Commande principalement des centres de table.'
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
            Chargement des clients...
          </p>
        </div>
      </div>
    );
  }

  if (selectedClient) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => setSelectedClient(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#6366f1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              ← Retour à la liste
            </button>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Client Info */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                {selectedClient.prenom} {selectedClient.nom}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Email</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedClient.email}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Téléphone</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedClient.telephone}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Date d'inscription</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedClient.dateInscription}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Statut</p>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: selectedClient.statut === 'VIP' ? '#dbeafe' : selectedClient.statut === 'Premium' ? '#fef3c7' : '#f3f4f6',
                    color: selectedClient.statut === 'VIP' ? '#1e40af' : selectedClient.statut === 'Premium' ? '#d97706' : '#6b7280'
                  }}>
                    {selectedClient.statut}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '32px',
              padding: '24px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px'
            }}>
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Nombre de commandes</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{selectedClient.nombreCommandes}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Montant total</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{selectedClient.montantTotal.toFixed(2)}€</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Panier moyen</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>
                  {(selectedClient.montantTotal / selectedClient.nombreCommandes).toFixed(2)}€
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Dernière commande</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{selectedClient.derniereCommande}</p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Notes internes
              </h3>
              <textarea
                defaultValue={selectedClient.notes}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '100px',
                  resize: 'vertical',
                  outline: 'none'
                }}
                placeholder="Ajouter des notes internes sur ce client..."
              />
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Sauvegarder les notes
                </button>
              </div>
            </div>
          </div>
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
            Clients
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Gestion de votre clientèle
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <Search style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '20px', 
              height: '20px', 
              color: '#9ca3af' 
            }} />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {['tous', 'VIP', 'Premium', 'Standard'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedFilter === filter 
                    ? '#6366f1' 
                    : '#f3f4f6',
                  color: selectedFilter === filter ? 'white' : '#374151'
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <button style={{
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#f3f4f6',
            color: '#374151',
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
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Client</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Contact</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Inscription</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Commandes</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Total</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Statut</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <tr key={client.id} style={{
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc'
                  }}>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
                          {client.prenom} {client.nom}
                        </p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>
                          #{client.id.toString().padStart(4, '0')}
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                          <span style={{ fontSize: '14px', color: '#64748b' }}>{client.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Phone style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                          <span style={{ fontSize: '14px', color: '#64748b' }}>{client.telephone}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                        <span style={{ fontSize: '14px', color: '#64748b' }}>{client.dateInscription}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                          {client.nombreCommandes}
                        </p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>
                          Dernière: {client.derniereCommande}
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                        {client.montantTotal.toFixed(2)}€
                      </p>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: client.statut === 'VIP' ? '#dbeafe' : client.statut === 'Premium' ? '#fef3c7' : '#f3f4f6',
                        color: client.statut === 'VIP' ? '#1e40af' : client.statut === 'Premium' ? '#d97706' : '#6b7280'
                      }}>
                        {client.statut}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button
                        onClick={() => setSelectedClient(client)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
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
