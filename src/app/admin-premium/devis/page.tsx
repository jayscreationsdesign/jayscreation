'use client';

import { useState, useEffect } from 'react';
import { FileText, Search, Filter, Download, Eye, Plus, TrendingUp, Crown, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function AdminPremiumDevis() {
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

  const devis = [
    {
      id: 'DEV-2024-001',
      client: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      telephone: '06 12 34 56 78',
      date: '2024-03-15',
      statut: 'nouveau',
      produits: ['Bouquet mariage premium', 'Centre de table anniversaire'],
      montantEstime: 450.00,
      message: 'Bonjour, je souhaiterais un devis pour mon mariage le 15 juin 2024. Nous aurions besoin de 10 bouquets et 5 centres de table.',
      evenement: 'Mariage',
      dateEvenement: '2024-06-15',
      delai: '2 mois'
    },
    {
      id: 'DEV-2024-002',
      client: 'Marie Martin',
      email: 'marie.martin@email.com',
      telephone: '06 23 45 67 89',
      date: '2024-03-14',
      statut: 'en_cours',
      produits: ['Composition florale luxe'],
      montantEstime: 250.00,
      message: 'Je voudrais une composition florale pour une soirée d entreprise. Merci de me contacter pour discuter des détails.',
      evenement: 'Soirée entreprise',
      dateEvenement: '2024-04-20',
      delai: '1 mois'
    },
    {
      id: 'DEV-2024-003',
      client: 'Pierre Bernard',
      email: 'pierre.bernard@email.com',
      telephone: '06 34 56 78 90',
      date: '2024-03-13',
      statut: 'accepte',
      produits: ['Bouquet printemps', 'Décoration anniversaire'],
      montantEstime: 180.00,
      message: 'Déjà contacté par téléphone, nous avons validé le devis. Merci de préparer la commande.',
      evenement: 'Anniversaire',
      dateEvenement: '2024-04-05',
      delai: '3 semaines'
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
      delai: '5 mois'
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
      case 'nouveau': return { bg: 'rgba(59,130,246,0.1)', color: '#2563eb', border: 'rgba(59,130,246,0.3)' };
      case 'en_cours': return { bg: 'rgba(251,191,36,0.1)', color: '#d97706', border: 'rgba(251,191,36,0.3)' };
      case 'accepte': return { bg: 'rgba(34,197,94,0.1)', color: '#16a34a', border: 'rgba(34,197,94,0.3)' };
      case 'refuse': return { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'rgba(239,68,68,0.3)' };
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
            Chargement des devis exclusifs...
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
            <FileText style={{ width: '48px', height: '48px', color: '#D4A574', marginRight: '20px' }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Georgia, serif'
            }}>
              Devis Exclusifs
            </h1>
            <Crown style={{ width: '48px', height: '48px', color: '#D4A574', marginLeft: '20px' }} />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Gestion de vos demandes personnalisées
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
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Total Devis</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>{devis.length}</p>
              </div>
              <FileText style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
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
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Nouveaux</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>
                  {devis.filter(d => d.statut === 'nouveau').length}
                </p>
              </div>
              <Clock style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
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
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>CA Potentiel</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>
                  {devis.reduce((sum, d) => sum + d.montantEstime, 0).toLocaleString()}€
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
              placeholder="Rechercher un devis..."
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
            {['tous', 'nouveau', 'en_cours', 'accepte', 'refuse'].map((filter) => (
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
                {filter === 'tous' ? 'Tous' : 
                 filter === 'nouveau' ? 'Nouveaux' :
                 filter === 'en_cours' ? 'En cours' :
                 filter === 'accepte' ? 'Acceptés' : 'Refusés'}
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

        {/* Devis List */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          border: '1px solid rgba(212,165,116,0.3)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredDevis.map((devi, index) => {
              const statutColors = getStatutColor(devi.statut);
              return (
                <div key={devi.id} style={{
                  padding: '24px',
                  background: index % 2 === 0 ? 'rgba(212,165,116,0.05)' : 'rgba(139,69,19,0.05)',
                  borderRadius: '20px',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#8B4513',
                          fontFamily: 'Georgia, serif'
                        }}>
                          {devi.id}
                        </h3>
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
                          {getStatutIcon(devi.statut)}
                          {devi.statut === 'nouveau' ? 'Nouveau' :
                           devi.statut === 'en_cours' ? 'En cours' :
                           devi.statut === 'accepte' ? 'Accepté' : 'Refusé'}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '12px' }}>
                        <div>
                          <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>
                            {devi.client}
                          </p>
                          <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif' }}>
                            {devi.email}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif' }}>Date</p>
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>{devi.date}</p>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif' }}>Événement</p>
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>{devi.evenement}</p>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif' }}>Délai</p>
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>{devi.delai}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>
                        Montant estimé
                      </p>
                      <p style={{ fontSize: '24px', fontWeight: '700', color: '#8B4513' }}>
                        {devi.montantEstime.toFixed(2)}€
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
                      Produits demandés :
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {devi.produits.map((produit, idx) => (
                        <span key={idx} style={{
                          padding: '4px 12px',
                          borderRadius: '16px',
                          fontSize: '12px',
                          backgroundColor: 'rgba(212,165,116,0.1)',
                          color: '#8B4513',
                          fontFamily: 'Georgia, serif'
                        }}>
                          {produit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
                      Message du client :
                    </p>
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(212,165,116,0.05)',
                      borderRadius: '12px',
                      border: '1px solid rgba(212,165,116,0.2)'
                    }}>
                      <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}>
                        {devi.message}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button style={{
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      background: 'rgba(212,165,116,0.1)',
                      color: '#8B4513',
                      fontFamily: 'Georgia, serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s'
                    }}>
                      <Eye style={{ width: '16px', height: '16px' }} />
                      Voir détails
                    </button>
                    {devi.statut === 'nouveau' && (
                      <button style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
                        color: 'white',
                        fontFamily: 'Georgia, serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s'
                      }}>
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
