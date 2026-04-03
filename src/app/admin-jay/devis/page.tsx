'use client';

import { useState, useEffect } from 'react';
import { FileText, Search, Filter, Download, Eye, Clock, CheckCircle, XCircle, Calendar, User, Package, MessageSquare } from 'lucide-react';

export default function AdminJayDevis() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('tous');
  const [selectedDevis, setSelectedDevis] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const devis = [
    {
      id: 'DEV-2024-001',
      date: '2024-03-15',
      client: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      telephone: '06 12 34 56 78',
      statut: 'nouveau',
      produits: ['Bouquet mariage premium', 'Centre de table anniversaire'],
      montantEstime: 450.00,
      message: 'Bonjour, je souhaiterais un devis pour mon mariage le 15 juin 2024. Nous aurions besoin de 10 bouquets et 5 centres de table. Pourriez-vous me proposer plusieurs options avec des fleurs de saison ?',
      evenement: 'Mariage',
      dateEvenement: '2024-06-15',
      delai: '2 mois',
      notes: 'Client très intéressé, demande plusieurs options.'
    },
    {
      id: 'DEV-2024-002',
      date: '2024-03-14',
      client: 'Marie Martin',
      email: 'marie.martin@email.com',
      telephone: '06 23 45 67 89',
      statut: 'en_cours',
      produits: ['Composition florale luxe'],
      montantEstime: 250.00,
      message: 'Je voudrais une composition florale pour une soirée d entreprise. Merci de me contacter pour discuter des détails. Le budget est flexible.',
      evenement: 'Soirée entreprise',
      dateEvenement: '2024-04-20',
      delai: '1 mois',
      notes: 'En attente de confirmation du budget exact.'
    },
    {
      id: 'DEV-2024-003',
      date: '2024-03-13',
      client: 'Pierre Bernard',
      email: 'pierre.bernard@email.com',
      telephone: '06 34 56 78 90',
      statut: 'accepte',
      produits: ['Bouquet printemps', 'Décoration anniversaire'],
      montantEstime: 180.00,
      message: 'Déjà contacté par téléphone, nous avons validé le devis. Merci de préparer la commande.',
      evenement: 'Anniversaire',
      dateEvenement: '2024-04-05',
      delai: '3 semaines',
      notes: 'Devis validé, conversion en commande prévue.'
    },
    {
      id: 'DEV-2024-004',
      client: 'Sophie Petit',
      email: 'sophie.petit@email.com',
      telephone: '06 45 67 89 01',
      date: '2024-03-12',
      statut: 'refuse',
      produits: ['Décoration mariage complète'],
      montantEstime: 1200.00,
      message: 'Le devis est trop élevé pour notre budget. Nous avons trouvé une autre solution.',
      evenement: 'Mariage',
      dateEvenement: '2024-08-10',
      delai: '5 mois',
      notes: 'Budget insuffisant, client a trouvé une alternative.'
    },
    {
      id: 'DEV-2024-005',
      client: 'Lucas Robert',
      email: 'lucas.robert@email.com',
      telephone: '06 56 78 90 12',
      date: '2024-03-11',
      statut: 'nouveau',
      produits: ['Centre de table anniversaire'],
      montantEstime: 178.50,
      message: 'Bonjour, j organise un anniversaire surprise pour 30 personnes. J aurais besoin de 3 centres de table avec des fleurs colorées et joyeuses.',
      evenement: 'Anniversaire surprise',
      dateEvenement: '2024-04-15',
      delai: '1 mois',
      notes: 'Client demande des fleurs colorées et joyeuses.'
    }
  ];

  const filteredDevis = devis.filter(devi => {
    const matchesSearch = devi.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         devi.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         devi.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'tous' || devi.statut === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'nouveau': return <Clock style={{ width: '16px', height: '16px' }} />;
      case 'en_cours': return <FileText style={{ width: '16px', height: '16px' }} />;
      case 'accepte': return <CheckCircle style={{ width: '16px', height: '16px' }} />;
      case 'refuse': return <XCircle style={{ width: '16px', height: '16px' }} />;
      default: return null;
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'nouveau': return { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe', text: 'Nouveau' };
      case 'en_cours': return { bg: '#fef3c7', color: '#d97706', border: '#fed7aa', text: 'En cours' };
      case 'accepte': return { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0', text: 'Accepté' };
      case 'refuse': return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca', text: 'Refusé' };
      default: return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb', text: statut };
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
            Chargement des devis...
          </p>
        </div>
      </div>
    );
  }

  if (selectedDevis) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => setSelectedDevis(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#6366f1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
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
            {/* Devis Header */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>
                    Devis {selectedDevis.id}
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '16px' }}>
                    {selectedDevis.client} • {selectedDevis.date}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                    {selectedDevis.montantEstime.toFixed(2)}€
                  </p>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: getStatutColor(selectedDevis.statut).bg,
                    color: getStatutColor(selectedDevis.statut).color,
                    border: `1px solid ${getStatutColor(selectedDevis.statut).border}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {getStatutIcon(selectedDevis.statut)}
                    {getStatutColor(selectedDevis.statut).text}
                  </span>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Informations client
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Nom</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedDevis.client}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Email</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedDevis.email}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Téléphone</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedDevis.telephone}</p>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Événement
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Type d'événement</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedDevis.evenement}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Date de l'événement</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedDevis.dateEvenement}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Délai</p>
                  <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedDevis.delai}</p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Produits demandés
              </h3>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                {selectedDevis.produits.map((produit: string, index: number) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    borderBottom: index < selectedDevis.produits.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}>
                    <Package style={{ width: '16px', height: '16px', color: '#6366f1' }} />
                    <p style={{ fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>
                      {produit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Message */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Message du client
              </h3>
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                  {selectedDevis.message}
                </p>
              </div>
            </div>

            {/* Internal Notes */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Notes internes
              </h3>
              <textarea
                defaultValue={selectedDevis.notes}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '100px',
                  resize: 'vertical',
                  outline: 'none',
                  marginBottom: '16px'
                }}
                placeholder="Ajouter des notes internes sur ce devis..."
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <select style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none'
              }}>
                <option value="nouveau">Nouveau</option>
                <option value="en_cours">En cours</option>
                <option value="accepte">Accepté</option>
                <option value="refuse">Refusé</option>
              </select>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileText style={{ width: '16px', height: '16px' }} />
                Changer le statut
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Sauvegarder les notes
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Contacter le client
              </button>
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
            Devis
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Gestion des demandes de devis
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
              placeholder="Rechercher un devis..."
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
            {['tous', 'nouveau', 'en_cours', 'accepte', 'refuse'].map((filter) => (
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
                {filter === 'tous' ? 'Tous' : 
                 filter === 'nouveau' ? 'Nouveaux' :
                 filter === 'en_cours' ? 'En cours' :
                 filter === 'accepte' ? 'Acceptés' : 'Refusés'}
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

        {/* Devis List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredDevis.map((devi, index) => {
              const statutColors = getStatutColor(devi.statut);
              return (
                <div key={devi.id} style={{
                  padding: '20px',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#1e293b'
                        }}>
                          {devi.id}
                        </h3>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: statutColors.bg,
                          color: statutColors.color,
                          border: `1px solid ${statutColors.border}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          {getStatutIcon(devi.statut)}
                          {statutColors.text}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '12px' }}>
                        <div>
                          <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                            {devi.client}
                          </p>
                          <p style={{ fontSize: '14px', color: '#64748b' }}>{devi.email}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>Date</p>
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{devi.date}</p>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>Événement</p>
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{devi.evenement}</p>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>Délai</p>
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{devi.delai}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                        Montant estimé
                      </p>
                      <p style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>
                        {devi.montantEstime.toFixed(2)}€
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                      Produits demandés :
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {devi.produits.map((produit, idx) => (
                        <span key={idx} style={{
                          padding: '4px 12px',
                          borderRadius: '16px',
                          fontSize: '12px',
                          backgroundColor: '#f3f4f6',
                          color: '#374151'
                        }}>
                          {produit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                      Message du client :
                    </p>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                        {devi.message}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setSelectedDevis(devi)}
                      style={{
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
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                    >
                      <Eye style={{ width: '16px', height: '16px' }} />
                      Voir détails
                    </button>
                    {devi.statut === 'nouveau' && (
                      <button style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                      }}
                    >
                      <FileText style={{ width: '16px', height: '16px' }} />
                      Traiter
                    </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
