'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Search, Filter, Download, Eye, Mail, Phone, Calendar, TrendingUp, ChevronRight, Star, MapPin } from 'lucide-react';

export default function AdminJayNewClients() {
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
      notes: 'Client fidèle, commande régulièrement des bouquets pour événements familiaux.',
      ville: 'Paris',
      codePostal: '75001',
      adresse: '123 Rue des Fleurs',
      pays: 'France',
      preferences: ['Mariage', 'Luxe'],
      satisfaction: 4.8
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
      notes: 'Intéressée par les compositions florales luxueuses.',
      ville: 'Lyon',
      codePostal: '69002',
      adresse: '456 Avenue des Roses',
      pays: 'France',
      preferences: ['Luxe', 'Saison'],
      satisfaction: 4.6
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
      notes: 'Client entreprise, commande pour événements professionnels.',
      ville: 'Nantes',
      codePostal: '44000',
      adresse: '789 Boulevard des Jardins',
      pays: 'France',
      preferences: ['Mariage', 'Événementiel'],
      satisfaction: 4.9
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
      notes: 'Première commande, potentiel d\'évolution.',
      ville: 'Toulouse',
      codePostal: '31000',
      adresse: '321 Chemin des Lilas',
      pays: 'France',
      preferences: ['Saison'],
      satisfaction: 4.2
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
      notes: 'Commande principalement des centres de table.',
      ville: 'Marseille',
      codePostal: '13001',
      adresse: '147 Rue du Vieux Port',
      pays: 'France',
      preferences: ['Événementiel'],
      satisfaction: 4.7
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.ville.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'tous' || client.statut === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            border: '4px solid #e5e7eb',
            borderTopColor: '#667eea',
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
      <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => setSelectedClient(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#667eea',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: '1px solid #667eea',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#667eea';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#667eea';
              }}
            >
              ← Retour à la liste
            </button>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb'
          }}>
            {/* Client Header */}
            <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h2 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '16px'
                  }}>
                    {selectedClient.prenom} {selectedClient.nom}
                  </h2>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      backgroundColor: selectedClient.statut === 'VIP' ? '#dbeafe' : selectedClient.statut === 'Premium' ? '#fef3c7' : '#f3f4f6',
                      color: selectedClient.statut === 'VIP' ? '#1e40af' : selectedClient.statut === 'Premium' ? '#d97706' : '#6b7280',
                      border: selectedClient.statut === 'VIP' ? '1px solid #bfdbfe' : selectedClient.statut === 'Premium' ? '1px solid #fed7aa' : '1px solid #e5e7eb'
                    }}>
                      {selectedClient.statut}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          style={{ 
                            width: '16px', 
                            height: '16px', 
                            color: i < Math.floor(selectedClient.satisfaction) ? '#f59e0b' : '#e5e7eb' 
                          }} 
                        />
                      ))}
                      <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>
                        {selectedClient.satisfaction}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Client depuis</p>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                    {selectedClient.dateInscription}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Users style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Informations de contact
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <Mail style={{ width: '20px', height: '20px', color: '#667eea', marginRight: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Email</span>
                  </div>
                  <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{selectedClient.email}</p>
                </div>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <Phone style={{ width: '20px', height: '20px', color: '#667eea', marginRight: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Téléphone</span>
                  </div>
                  <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{selectedClient.telephone}</p>
                </div>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <MapPin style={{ width: '20px', height: '20px', color: '#667eea', marginRight: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Adresse</span>
                  </div>
                  <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
                    {selectedClient.adresse}<br />
                    {selectedClient.codePostal} {selectedClient.ville}<br />
                    {selectedClient.pays}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <TrendingUp style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Statistiques du client
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                padding: '24px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Nombre de commandes</p>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{selectedClient.nombreCommandes}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Montant total dépensé</p>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{selectedClient.montantTotal.toFixed(2)}€</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Panier moyen</p>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                    {(selectedClient.montantTotal / selectedClient.nombreCommandes).toFixed(2)}€
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Dernière commande</p>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{selectedClient.derniereCommande}</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Star style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Préférences
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {selectedClient.preferences.map((pref: string, index: number) => (
                  <span key={index} style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: '1px solid #667eea'
                  }}>
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Users style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Notes internes
              </h3>
              <textarea
                defaultValue={selectedClient.notes}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '120px',
                  resize: 'vertical',
                  outline: 'none',
                  marginBottom: '16px',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="Ajouter des notes internes sur ce client..."
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  padding: '12px 24px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#5a67d8';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#667eea';
                }}
              >
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
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Clients
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Gestion de votre clientèle
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb',
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
              color: '#9ca3af' 
            }} />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 48px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: '#f8fafc',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {['tous', 'VIP', 'Premium', 'Standard'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedFilter === filter 
                    ? '#667eea' 
                    : '#f3f4f6',
                  color: selectedFilter === filter ? 'white' : '#374151'
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <button style={{
            padding: '10px 20px',
            borderRadius: '8px',
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

        {/* Clients Grid */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            {filteredClients.map((client, index) => (
              <div key={client.id} style={{
                padding: '24px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              onClick={() => setSelectedClient(client)}
            >
              {/* Client Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                    {client.prenom} {client.nom}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>#{client.id.toString().padStart(4, '0')}</p>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: client.statut === 'VIP' ? '#dbeafe' : client.statut === 'Premium' ? '#fef3c7' : '#f3f4f6',
                  color: client.statut === 'VIP' ? '#1e40af' : client.statut === 'Premium' ? '#d97706' : '#6b7280',
                  border: client.statut === 'VIP' ? '1px solid #bfdbfe' : client.statut === 'Premium' ? '1px solid #fed7aa' : '1px solid #e5e7eb'
                }}>
                  {client.statut}
                </span>
              </div>

              {/* Contact Info */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Mail style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>{client.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>{client.telephone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>{client.ville}</span>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Commandes</p>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>{client.nombreCommandes}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Total</p>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>{client.montantTotal.toFixed(2)}€</p>
                </div>
              </div>

              {/* Satisfaction */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      style={{ 
                        width: '14px', 
                        height: '14px', 
                        color: i < Math.floor(client.satisfaction) ? '#f59e0b' : '#e5e7eb' 
                      }} 
                    />
                  ))}
                  <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
                    {client.satisfaction}
                  </span>
                </div>
                <ChevronRight style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
