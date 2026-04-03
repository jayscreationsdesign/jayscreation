'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Download, Eye, Package, Calendar, TrendingUp, CheckCircle, Clock, XCircle, AlertCircle, CreditCard } from 'lucide-react';

export default function AdminJayCommandes() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('toutes');
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
      client: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      montant: 234.50,
      statut: 'payée',
      moyenPaiement: 'Carte bancaire',
      produits: [
        { nom: 'Bouquet mariage premium', quantite: 2, prix: 149.99 },
        { nom: 'Centre de table anniversaire', quantite: 1, prix: 79.99 }
      ],
      adresseFacturation: {
        nom: 'Jean Dupont',
        adresse: '123 Rue des Fleurs',
        ville: '75001 Paris',
        telephone: '06 12 34 56 78'
      },
      adresseLivraison: {
        nom: 'Jean Dupont',
        adresse: '123 Rue des Fleurs',
        ville: '75001 Paris',
        telephone: '06 12 34 56 78'
      },
      historiqueStatut: [
        { date: '2024-03-15 10:30', statut: 'en_attente', note: 'Commande créée' },
        { date: '2024-03-15 10:45', statut: 'payée', note: 'Paiement validé' }
      ],
      notes: 'Client demande une livraison avant le 20 mars.'
    },
    {
      id: 'CMD-2024-002',
      date: '2024-03-14',
      client: 'Marie Martin',
      email: 'marie.martin@email.com',
      montant: 156.00,
      statut: 'en_attente',
      moyenPaiement: 'PayPal',
      produits: [
        { nom: 'Composition florale luxe', quantite: 1, prix: 156.00 }
      ],
      adresseFacturation: {
        nom: 'Marie Martin',
        adresse: '456 Avenue des Roses',
        ville: '69002 Lyon',
        telephone: '06 23 45 67 89'
      },
      adresseLivraison: {
        nom: 'Marie Martin',
        adresse: '456 Avenue des Roses',
        ville: '69002 Lyon',
        telephone: '06 23 45 67 89'
      },
      historiqueStatut: [
        { date: '2024-03-14 14:20', statut: 'en_attente', note: 'Commande créée' }
      ],
      notes: 'En attente de confirmation de paiement.'
    },
    {
      id: 'CMD-2024-003',
      date: '2024-03-13',
      client: 'Pierre Bernard',
      email: 'pierre.bernard@email.com',
      montant: 89.99,
      statut: 'expédiée',
      moyenPaiement: 'Carte bancaire',
      produits: [
        { nom: 'Bouquet printemps', quantite: 1, prix: 89.99 }
      ],
      adresseFacturation: {
        nom: 'Pierre Bernard',
        adresse: '789 Boulevard des Jardins',
        ville: '44000 Nantes',
        telephone: '06 34 56 78 90'
      },
      adresseLivraison: {
        nom: 'Pierre Bernard',
        adresse: '789 Boulevard des Jardins',
        ville: '44000 Nantes',
        telephone: '06 34 56 78 90'
      },
      historiqueStatut: [
        { date: '2024-03-13 09:15', statut: 'en_attente', note: 'Commande créée' },
        { date: '2024-03-13 09:30', statut: 'payée', note: 'Paiement validé' },
        { date: '2024-03-13 11:00', statut: 'expédiée', note: 'Commande expédiée' }
      ],
      notes: 'Livraison prévue pour le 15 mars.'
    },
    {
      id: 'CMD-2024-004',
      date: '2024-03-12',
      client: 'Sophie Petit',
      email: 'sophie.petit@email.com',
      montant: 445.00,
      statut: 'annulée',
      moyenPaiement: 'Virement bancaire',
      produits: [
        { nom: 'Décoration mariage complète', quantite: 1, prix: 445.00 }
      ],
      adresseFacturation: {
        nom: 'Sophie Petit',
        adresse: '321 Chemin des Lilas',
        ville: '31000 Toulouse',
        telephone: '06 45 67 89 01'
      },
      adresseLivraison: {
        nom: 'Sophie Petit',
        adresse: '321 Chemin des Lilas',
        ville: '31000 Toulouse',
        telephone: '06 45 67 89 01'
      },
      historiqueStatut: [
        { date: '2024-03-12 16:45', statut: 'en_attente', note: 'Commande créée' },
        { date: '2024-03-12 18:30', statut: 'annulée', note: 'Client a annulé la commande' }
      ],
      notes: 'Annulation suite à changement de date d\'événement.'
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
      case 'remboursée': return <AlertCircle style={{ width: '16px', height: '16px' }} />;
      default: return null;
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'payée': return { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' };
      case 'en_attente': return { bg: '#fef3c7', color: '#d97706', border: '#fed7aa' };
      case 'expédiée': return { bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' };
      case 'annulée': return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' };
      case 'remboursée': return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };
      default: return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };
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
            Chargement des commandes...
          </p>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => setSelectedOrder(null)}
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
            {/* Order Header */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>
                    Commande {selectedOrder.id}
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '16px' }}>
                    {selectedOrder.client} • {selectedOrder.date}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                    {selectedOrder.montant.toFixed(2)}€
                  </p>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: getStatutColor(selectedOrder.statut).bg,
                    color: getStatutColor(selectedOrder.statut).color,
                    border: `1px solid ${getStatutColor(selectedOrder.statut).border}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {getStatutIcon(selectedOrder.statut)}
                    {selectedOrder.statut === 'en_attente' ? 'En attente' : 
                     selectedOrder.statut === 'expédiée' ? 'Expédiée' :
                     selectedOrder.statut === 'remboursée' ? 'Remboursée' :
                     selectedOrder.statut.charAt(0).toUpperCase() + selectedOrder.statut.slice(1)}
                  </span>
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
                Produits
              </h3>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                {selectedOrder.produits.map((produit: any, index: number) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: index < selectedOrder.produits.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
                        {produit.nom}
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>
                        Quantité: {produit.quantite}
                      </p>
                    </div>
                    <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
                      {(produit.prix * produit.quantite).toFixed(2)}€
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '16px'
                }}>
                  Adresse de facturation
                </h3>
                <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                  <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px', marginBottom: '8px' }}>
                    {selectedOrder.adresseFacturation.nom}
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                    {selectedOrder.adresseFacturation.adresse}
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                    {selectedOrder.adresseFacturation.ville}
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>
                    {selectedOrder.adresseFacturation.telephone}
                  </p>
                </div>
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '16px'
                }}>
                  Adresse de livraison
                </h3>
                <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                  <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px', marginBottom: '8px' }}>
                    {selectedOrder.adresseLivraison.nom}
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                    {selectedOrder.adresseLivraison.adresse}
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                    {selectedOrder.adresseLivraison.ville}
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>
                    {selectedOrder.adresseLivraison.telephone}
                  </p>
                </div>
              </div>
            </div>

            {/* Status History */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Historique des statuts
              </h3>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                {selectedOrder.historiqueStatut.map((item: any, index: number) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    borderBottom: index < selectedOrder.historiqueStatut.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}>
                    {getStatutIcon(item.statut)}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                        {item.statut === 'en_attente' ? 'En attente' : 
                         item.statut === 'expédiée' ? 'Expédiée' :
                         item.statut === 'remboursée' ? 'Remboursée' :
                         item.statut.charAt(0).toUpperCase() + item.statut.slice(1)}
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>
                        {item.note}
                      </p>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>
                      {item.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes and Actions */}
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
                defaultValue={selectedOrder.notes}
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
                placeholder="Ajouter des notes internes sur cette commande..."
              />
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <select style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  outline: 'none'
                }}>
                  <option value="en_attente">En attente</option>
                  <option value="payée">Payée</option>
                  <option value="expédiée">Expédiée</option>
                  <option value="annulée">Annulée</option>
                  <option value="remboursée">Remboursée</option>
                </select>
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
            Commandes
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Gestion de vos commandes
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
              placeholder="Rechercher une commande..."
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
            {['toutes', 'payée', 'en_attente', 'expédiée', 'annulée', 'remboursée'].map((filter) => (
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
                {filter === 'toutes' ? 'Toutes' : 
                 filter === 'en_attente' ? 'En attente' :
                 filter === 'expédiée' ? 'Expédiées' :
                 filter === 'remboursée' ? 'Remboursées' :
                 filter.charAt(0).toUpperCase() + filter.slice(1)}
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

        {/* Orders Table */}
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
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Commande</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Client</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Montant</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Statut</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Paiement</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommandes.map((commande, index) => {
                  const statutColors = getStatutColor(commande.statut);
                  return (
                    <tr key={commande.id} style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc'
                    }}>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
                            {commande.id}
                          </p>
                          <p style={{ fontSize: '12px', color: '#64748b' }}>
                            {commande.produits.length} produit{commande.produits.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                            {commande.client}
                          </p>
                          <p style={{ fontSize: '12px', color: '#64748b' }}>
                            {commande.email}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                          <span style={{ fontSize: '14px', color: '#64748b' }}>{commande.date}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                          {commande.montant.toFixed(2)}€
                        </p>
                      </td>
                      <td style={{ padding: '16px' }}>
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
                          {getStatutIcon(commande.statut)}
                          {commande.statut === 'en_attente' ? 'En attente' : 
                           commande.statut === 'expédiée' ? 'Expédiée' :
                           commande.statut === 'remboursée' ? 'Remboursée' :
                           commande.statut.charAt(0).toUpperCase() + commande.statut.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CreditCard style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                          <span style={{ fontSize: '14px', color: '#64748b' }}>{commande.moyenPaiement}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => setSelectedOrder(commande)}
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
