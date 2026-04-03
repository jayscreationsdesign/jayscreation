'use client';

import { useState, useEffect } from 'react';
import { Package, Search, Filter, Download, Eye, Plus, Edit, Trash2, TrendingUp, AlertTriangle, Tag, DollarSign } from 'lucide-react';

export default function AdminJayProduits() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('tous');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const produits = [
    {
      id: 1,
      nom: 'Bouquet de mariage premium',
      categorie: 'Mariage',
      prix: 149.99,
      stock: 12,
      statut: 'en_ligne',
      description: 'Bouquet floral élégant composé de roses blanches et lys parfaits pour les mariages.',
      images: ['/images/bouquet-mariage-1.jpg', '/images/bouquet-mariage-2.jpg'],
      variantes: [
        { nom: 'Taille', options: ['Standard', 'Grand', 'XL'], prix: [149.99, 199.99, 249.99] },
        { nom: 'Couleur', options: ['Blanc', 'Rose', 'Rouge'], prix: [149.99, 149.99, 149.99] }
      ],
      historiqueStock: [
        { date: '2024-03-15', mouvement: 'Vente', quantite: -2, stock: 12 },
        { date: '2024-03-14', mouvement: 'Vente', quantite: -1, stock: 14 },
        { date: '2024-03-10', mouvement: 'Ajout', quantite: 20, stock: 15 }
      ]
    },
    {
      id: 2,
      nom: 'Centre de table anniversaire',
      categorie: 'Événementiel',
      prix: 79.99,
      stock: 8,
      statut: 'en_ligne',
      description: 'Décoration centre de table moderne pour anniversaires et célébrations.',
      images: ['/images/centre-table-1.jpg'],
      variantes: [
        { nom: 'Taille', options: ['Petit', 'Moyen', 'Grand'], prix: [59.99, 79.99, 99.99] }
      ],
      historiqueStock: [
        { date: '2024-03-14', mouvement: 'Vente', quantite: -2, stock: 8 },
        { date: '2024-03-12', mouvement: 'Vente', quantite: -1, stock: 10 },
        { date: '2024-03-08', mouvement: 'Ajout', quantite: 15, stock: 11 }
      ]
    },
    {
      id: 3,
      nom: 'Composition florale luxe',
      categorie: 'Luxe',
      prix: 199.99,
      stock: 15,
      statut: 'en_ligne',
      description: 'Composition florale haut de gamme avec orchidées et fleurs exotiques.',
      images: ['/images/composition-luxe-1.jpg', '/images/composition-luxe-2.jpg'],
      variantes: [
        { nom: 'Style', options: ['Moderne', 'Classique', 'Exotique'], prix: [199.99, 189.99, 219.99] }
      ],
      historiqueStock: [
        { date: '2024-03-13', mouvement: 'Vente', quantite: -1, stock: 15 },
        { date: '2024-03-10', mouvement: 'Ajout', quantite: 10, stock: 16 }
      ]
    },
    {
      id: 4,
      nom: 'Bouquet printemps',
      categorie: 'Saison',
      prix: 89.99,
      stock: 3,
      statut: 'en_ligne',
      description: 'Bouquet coloré avec tulipes, jonquilles et marguerites.',
      images: ['/images/bouquet-printemps-1.jpg'],
      variantes: [
        { nom: 'Taille', options: ['Standard', 'Grand'], prix: [89.99, 119.99] }
      ],
      historiqueStock: [
        { date: '2024-03-15', mouvement: 'Vente', quantite: -1, stock: 3 },
        { date: '2024-03-14', mouvement: 'Vente', quantite: -2, stock: 4 },
        { date: '2024-03-12', mouvement: 'Ajout', quantite: 10, stock: 6 }
      ]
    },
    {
      id: 5,
      nom: 'Décoration mariage complète',
      categorie: 'Mariage',
      prix: 299.99,
      stock: 0,
      statut: 'hors_ligne',
      description: 'Ensemble complet de décoration pour mariage : bouquets, centres de table, arches.',
      images: ['/images/deco-mariage-1.jpg', '/images/deco-mariage-2.jpg', '/images/deco-mariage-3.jpg'],
      variantes: [
        { nom: 'Package', options: ['Essentiel', 'Premium', 'Complet'], prix: [199.99, 299.99, 499.99] }
      ],
      historiqueStock: [
        { date: '2024-03-10', mouvement: 'Vente', quantite: -1, stock: 0 },
        { date: '2024-03-08', mouvement: 'Vente', quantite: -1, stock: 1 },
        { date: '2024-03-05', mouvement: 'Ajout', quantite: 5, stock: 2 }
      ]
    }
  ];

  const filteredProduits = produits.filter(produit => {
    const matchesSearch = produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         produit.categorie.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'tous' || produit.categorie === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStockColor = (stock: number) => {
    if (stock === 0) return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca', text: 'Rupture' };
    if (stock <= 5) return { bg: '#fef3c7', color: '#d97706', border: '#fed7aa', text: 'Stock bas' };
    return { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0', text: 'Normal' };
  };

  const getStatutColor = (statut: string) => {
    return statut === 'en_ligne' 
      ? { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0', text: 'En ligne' }
      : { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb', text: 'Hors ligne' };
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
            Chargement des produits...
          </p>
        </div>
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => setSelectedProduct(null)}
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
            {/* Product Header */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>
                    {selectedProduct.nom}
                  </h2>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {selectedProduct.categorie}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: getStatutColor(selectedProduct.statut).bg,
                      color: getStatutColor(selectedProduct.statut).color,
                      border: `1px solid ${getStatutColor(selectedProduct.statut).border}`
                    }}>
                      {getStatutColor(selectedProduct.statut).text}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: getStockColor(selectedProduct.stock).bg,
                      color: getStockColor(selectedProduct.stock).color,
                      border: `1px solid ${getStockColor(selectedProduct.stock).border}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Package style={{ width: '12px', height: '12px' }} />
                      Stock: {selectedProduct.stock}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>
                    {selectedProduct.prix.toFixed(2)}€
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                    Prix de base
                  </p>
                </div>
              </div>
              
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                {selectedProduct.description}
              </p>
            </div>

            {/* Images */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Images
              </h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {selectedProduct.images.map((image: string, index: number) => (
                  <div key={index} style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e5e7eb'
                  }}>
                    <Package style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Variants */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Variantes
              </h3>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                {selectedProduct.variantes.map((variante: any, index: number) => (
                  <div key={index} style={{ marginBottom: index < selectedProduct.variantes.length - 1 ? '16px' : '0' }}>
                    <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px', marginBottom: '8px' }}>
                      {variante.nom}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                      {variante.options.map((option: string, optIndex: number) => (
                        <div key={optIndex} style={{
                          padding: '8px 12px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontSize: '14px', color: '#374151' }}>{option}</span>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                            {variante.prix[optIndex].toFixed(2)}€
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock History */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Historique du stock
              </h3>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                {selectedProduct.historiqueStock.map((item: any, index: number) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: index < selectedProduct.historiqueStock.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: item.mouvement === 'Ajout' ? '#dcfce7' : '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{
                          fontSize: '16px',
                          color: item.mouvement === 'Ajout' ? '#16a34a' : '#dc2626'
                        }}>
                          {item.mouvement === 'Ajout' ? '+' : '-'}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                          {item.mouvement}
                        </p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>
                          {item.date}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                        {item.quantite > 0 ? '+' : ''}{item.quantite}
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>
                        Stock: {item.stock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
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
                <Edit style={{ width: '16px', height: '16px' }} />
                Modifier
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
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
                <Package style={{ width: '16px', height: '16px' }} />
                Mettre à jour le stock
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
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
                <Trash2 style={{ width: '16px', height: '16px' }} />
                Supprimer
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
            Produits & Stocks
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Gestion de votre catalogue et des stocks
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
              placeholder="Rechercher un produit..."
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
            {['tous', 'Mariage', 'Luxe', 'Événementiel', 'Saison'].map((filter) => (
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
                {filter === 'tous' ? 'Tous' : filter}
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
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Plus style={{ width: '16px', height: '16px' }} />
            Ajouter
          </button>

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

        {/* Products Grid */}
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
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Produit</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Catégorie</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Prix</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Stock</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Statut</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProduits.map((produit, index) => {
                  const stockColors = getStockColor(produit.stock);
                  const statutColors = getStatutColor(produit.statut);
                  return (
                    <tr key={produit.id} style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc'
                    }}>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
                            {produit.nom}
                          </p>
                          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                            {produit.variantes.length} variante{produit.variantes.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: '#f3f4f6',
                          color: '#374151'
                        }}>
                          {produit.categorie}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                          {produit.prix.toFixed(2)}€
                        </p>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: stockColors.bg,
                          color: stockColors.color,
                          border: `1px solid ${stockColors.border}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          {produit.stock === 0 && <AlertTriangle style={{ width: '12px', height: '12px' }} />}
                          {produit.stock}
                        </span>
                        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                          {stockColors.text}
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
                          border: `1px solid ${statutColors.border}`
                        }}>
                          {statutColors.text}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => setSelectedProduct(produit)}
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
                          <button style={{
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
                          }}>
                            <Edit style={{ width: '14px', height: '14px' }} />
                          </button>
                          <button style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <Trash2 style={{ width: '14px', height: '14px' }} />
                          </button>
                        </div>
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
