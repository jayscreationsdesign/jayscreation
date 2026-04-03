'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, Filter, Download, Eye, Package, MapPin, Calendar, DollarSign, TrendingUp, ChevronRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function AdminJayNewCommandes() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('tous');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
      date: '2024-03-15',
      client: {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@email.com'
      },
      montant: 299.99,
      statut: 'payée',
      moyenPaiement: 'Carte bancaire',
      produits: [
        { id: 1, nom: 'Bouquet mariage premium', quantite: 2, prix: 149.99, variant: 'Grand' },
        { id: 2, nom: 'Centre de table anniversaire', quantite: 1, prix: 94.97, variant: 'Standard' }
      ],
      adresseFacturation: {
        rue: '123 Rue des Fleurs',
        ville: 'Paris',
        codePostal: '75001',
        pays: 'France'
      },
      adresseLivraison: {
        rue: '123 Rue des Fleurs',
        ville: 'Paris',
        codePostal: '75001',
        pays: 'France'
      },
      statutHistorique: [
        { date: '2024-03-15 10:30', statut: 'En attente', details: 'Commande créée' },
        { date: '2024-03-15 10:35', statut: 'Payée', details: 'Paiement validé' },
        { date: '2024-03-15 11:00', statut: 'En préparation', details: 'Commande en cours de préparation' },
        { date: '2024-03-15 14:30', statut: 'Expédiée', details: 'Commande expédiée' }
      ],
      notesInternes: 'Client VIP, livraison prioritaire demandée.'
    },
    {
      id: 'CMD-2024-002',
      date: '2024-03-14',
      client: {
        id: 2,
        nom: 'Martin',
        prenom: 'Marie',
        email: 'marie.martin@email.com'
      },
      montant: 168.34,
      statut: 'en_attente',
      moyenPaiement: 'PayPal',
      produits: [
        { id: 3, nom: 'Composition florale luxe', quantite: 1, prix: 168.34, variant: 'Luxe' }
      ],
      adresseFacturation: {
        rue: '456 Avenue des Roses',
        ville: 'Lyon',
        codePostal: '69002',
        pays: 'France'
      },
      adresseLivraison: {
        rue: '456 Avenue des Roses',
        ville: 'Lyon',
        codePostal: '69002',
        pays: 'France'
      },
      statutHistorique: [
        { date: '2024-03-14 15:20', statut: 'En attente', details: 'Commande créée' },
        { date: '2024-03-14 15:25', statut: 'En attente', details: 'En attente de paiement' }
      ],
      notesInternes: 'Première commande de ce client, vérifier la qualité.'
    },
    {
      id: 'CMD-2024-003',
      date: '2024-03-13',
      client: {
        id: 3,
        nom: 'Bernard',
        prenom: 'Pierre',
        email: 'pierre.bernard@email.com'
      },
      montant: 449.91,
      statut: 'expédiée',
      moyenPaiement: 'Virement bancaire',
      produits: [
        { id: 4, nom: 'Décoration mariage complète', quantite: 1, prix: 299.93, variant: 'Premium' },
        { id: 5, nom: 'Bouquet printemps', quantite: 2, prix: 74.99, variant: 'Moyen' }
      ],
      adresseFacturation: {
        rue: '789 Boulevard des Jardins',
        ville: 'Nantes',
        codePostal: '44000',
        pays: 'France'
      },
      adresseLivraison: {
        rue: '789 Boulevard des Jardins',
        ville: 'Nantes',
        codePostal: '44000',
        pays: 'France'
      },
      statutHistorique: [
        { date: '2024-03-13 09:15', statut: 'En attente', details: 'Commande créée' },
        { date: '2024-03-13 09:20', statut: 'En attente', details: 'En attente de virement' },
        { date: '2024-03-13 14:30', statut: 'Payée', details: 'Virement reçu' },
        { date: '2024-03-13 15:00', statut: 'En préparation', details: 'Commande en préparation' },
        { date: '2024-03-13 16:45', statut: 'Expédiée', details: 'Expédiée via Chronopost' }
      ],
      notesInternes: 'Commande entreprise, facture à envoyer en comptabilité.'
    },
    {
      id: 'CMD-2024-004',
      date: '2024-03-12',
      client: {
        id: 4,
        nom: 'Petit',
        prenom: 'Sophie',
        email: 'sophie.petit@email.com'
      },
      montant: 156.00,
      statut: 'annulée',
      moyenPaiement: 'Carte bancaire',
      produits: [
        { id: 6, nom: 'Bouquet saison', quantite: 1, prix: 156.00, variant: 'Standard' }
      ],
      adresseFacturation: {
        rue: '321 Chemin des Lilas',
        ville: 'Toulouse',
        codePostal: '31000',
        pays: 'France'
      },
      adresseLivraison: {
        rue: '321 Chemin des Lilas',
        ville: 'Toulouse',
        codePostal: '31000',
        pays: 'France'
      },
      statutHistorique: [
        { date: '2024-03-12 11:30', statut: 'En attente', details: 'Commande créée' },
        { date: '2024-03-12 11:35', statut: 'Annulée', details: 'Annulée par le client' }
      ],
      notesInternes: 'Client a annulé suite à un problème de livraison.'
    },
    {
      id: 'CMD-2024-005',
      date: '2024-03-11',
      client: {
        id: 5,
        nom: 'Robert',
        prenom: 'Lucas',
        email: 'lucas.robert@email.com'
      },
      montant: 678.25,
      statut: 'en_preparation',
      moyenPaiement: 'Carte bancaire',
      produits: [
        { id: 7, nom: 'Centre de table événementiel', quantite: 3, prix: 226.08, variant: 'Grand' },
        { id: 8, nom: 'Décoration florale luxe', quantite: 2, prix: 113.00, variant: 'Premium' }
      ],
      adresseFacturation: {
        rue: '147 Rue du Vieux Port',
        ville: 'Marseille',
        codePostal: '13001',
        pays: 'France'
      },
      adresseLivraison: {
        rue: '147 Rue du Vieux Port',
        ville: 'Marseille',
        codePostal: '13001',
        pays: 'France'
      },
      statutHistorique: [
        { date: '2024-03-11 16:45', statut: 'En attente', details: 'Commande créée' },
        { date: '2024-03-11 16:50', statut: 'Payée', details: 'Paiement validé' },
        { date: '2024-03-12 09:00', statut: 'En préparation', details: 'Commande en préparation' }
      ],
      notesInternes: 'Événement professionnel, livraison urgente demandée.'
    }
  ];

  const filteredOrders = commandes.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'tous' || order.statut === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'payée': return '#10b981';
      case 'en_attente': return '#f59e0b';
      case 'en_preparation': return '#3b82f6';
      case 'expédiée': return '#8b5cf6';
      case 'annulée': return '#ef4444';
      case 'remboursée': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'payée': return CheckCircle;
      case 'en_attente': return Clock;
      case 'en_preparation': return Package;
      case 'expédiée': return TrendingUp;
      case 'annulée': return XCircle;
      case 'remboursée': return AlertCircle;
      default: return Clock;
    }
  };

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
            Chargement des commandes...
          </p>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => setSelectedOrder(null)}
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
            {/* Order Header */}
            <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h2 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '16px'
                  }}>
                    {selectedOrder.id}
                  </h2>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      backgroundColor: `${getStatusColor(selectedOrder.statut)}20`,
                      color: getStatusColor(selectedOrder.statut),
                      border: `1px solid ${getStatusColor(selectedOrder.statut)}40`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {(() => {
                        const Icon = getStatusIcon(selectedOrder.statut);
                        return <Icon style={{ width: '16px', height: '16px' }} />;
                      })()}
                      {selectedOrder.statut.charAt(0).toUpperCase() + selectedOrder.statut.slice(1).replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {selectedOrder.date}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Montant total</p>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                    {selectedOrder.montant.toFixed(2)}€
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                    {selectedOrder.moyenPaiement}
                  </p>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <ShoppingCart style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Informations client
              </h3>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                      {selectedOrder.client.prenom} {selectedOrder.client.nom}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                      {selectedOrder.client.email}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                      Client #{selectedOrder.client.id.toString().padStart(4, '0')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Package style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Produits commandés
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedOrder.produits.map((product: any, index: number) => (
                  <div key={index} style={{
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                        {product.nom}
                      </p>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        Variant: {product.variant} • Quantité: {product.quantite}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                        {(product.prix * product.quantite).toFixed(2)}€
                      </p>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        {product.prix.toFixed(2)}€ / unité
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MapPin style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Adresses
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                    Adresse de facturation
                  </h4>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>
                      {selectedOrder.adresseFacturation.rue}<br />
                      {selectedOrder.adresseFacturation.codePostal} {selectedOrder.adresseFacturation.ville}<br />
                      {selectedOrder.adresseFacturation.pays}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                    Adresse de livraison
                  </h4>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>
                      {selectedOrder.adresseLivraison.rue}<br />
                      {selectedOrder.adresseLivraison.codePostal} {selectedOrder.adresseLivraison.ville}<br />
                      {selectedOrder.adresseLivraison.pays}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status History */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Calendar style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Historique des statuts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedOrder.statutHistorique.map((history: any, index: number) => (
                  <div key={index} style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {(() => {
                        const Icon = getStatusIcon(history.statut);
                        return <Icon style={{ width: '20px', height: '20px', color: getStatusColor(history.statut) }} />;
                      })()}
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                          {history.statut.charAt(0).toUpperCase() + history.statut.slice(1).replace('_', ' ')}
                        </p>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>
                          {history.details}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        {history.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <ShoppingCart style={{ width: '24px', height: '24px', color: '#667eea', marginRight: '12px' }} />
                Notes internes
              </h3>
              <textarea
                defaultValue={selectedOrder.notesInternes}
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
                placeholder="Ajouter des notes internes sur cette commande..."
              />
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
                <select style={{
                  padding: '12px 24px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  <option value="">Changer le statut</option>
                  <option value="en_preparation">En préparation</option>
                  <option value="expédiée">Expédiée</option>
                  <option value="annulée">Annulée</option>
                  <option value="remboursée">Remboursée</option>
                </select>
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
            Commandes
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Suivi des commandes clients
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
              placeholder="Rechercher une commande..."
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
            {['tous', 'payée', 'en_attente', 'en_preparation', 'expédiée', 'annulée'].map((filter) => (
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
                {filter === 'en_attente' ? 'En attente' : 
                 filter === 'en_preparation' ? 'En préparation' :
                 filter.charAt(0).toUpperCase() + filter.slice(1)}
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

        {/* Orders Grid */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
            {filteredOrders.map((order, index) => (
              <div key={order.id} style={{
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
              onClick={() => setSelectedOrder(order)}
            >
              {/* Order Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                    {order.id}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>{order.date}</p>
                </div>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: `${getStatusColor(order.statut)}20`,
                  color: getStatusColor(order.statut),
                  border: `1px solid ${getStatusColor(order.statut)}40`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {(() => {
                    const Icon = getStatusIcon(order.statut);
                    return <Icon style={{ width: '14px', height: '14px' }} />;
                  })()}
                  {order.statut.charAt(0).toUpperCase() + order.statut.slice(1).replace('_', ' ')}
                </span>
              </div>

              {/* Client Info */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                  {order.client.prenom} {order.client.nom}
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>{order.client.email}</p>
              </div>

              {/* Order Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Montant</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>
                    {order.montant.toFixed(2)}€
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Produits</p>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                    {order.produits.length}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {order.moyenPaiement}
                </span>
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
