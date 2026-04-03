'use client';

import { useState, useEffect } from 'react';
import { Package, Search, Filter, Download, Eye, Plus, Edit, Trash2, TrendingUp, Crown, Star, AlertTriangle } from 'lucide-react';

export default function AdminPremiumProduits() {
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

  const produits = [
    {
      id: 1,
      nom: 'Bouquet de mariage premium',
      categorie: 'Mariage',
      prix: 149.99,
      stock: 12,
      statut: 'en_ligne',
      description: 'Bouquet floral élégant pour mariage',
      image: '/images/bouquet-mariage.jpg',
      rating: 4.8,
      ventes: 45,
      revenue: 6749,
      tags: ['premium', 'mariage', 'fleurs']
    },
    {
      id: 2,
      nom: 'Centre de table anniversaire',
      categorie: 'Événementiel',
      prix: 79.99,
      stock: 8,
      statut: 'en_ligne',
      description: 'Décoration centre de table pour anniversaire',
      image: '/images/centre-table.jpg',
      rating: 4.6,
      ventes: 38,
      revenue: 3039,
      tags: ['anniversaire', 'décoration', 'table']
    },
    {
      id: 3,
      nom: 'Composition florale luxe',
      categorie: 'Luxe',
      prix: 199.99,
      stock: 15,
      statut: 'en_ligne',
      description: 'Composition florale de luxe',
      image: '/images/composition-luxe.jpg',
      rating: 4.9,
      ventes: 32,
      revenue: 6397,
      tags: ['luxe', 'composition', 'fleurs']
    },
    {
      id: 4,
      nom: 'Bouquet printemps',
      categorie: 'Saison',
      prix: 89.99,
      stock: 3,
      statut: 'en_ligne',
      description: 'Bouquet floral printemps',
      image: '/images/bouquet-printemps.jpg',
      rating: 4.5,
      ventes: 28,
      revenue: 2240,
      tags: ['printemps', 'saisonnier', 'fleurs']
    },
    {
      id: 5,
      nom: 'Décoration mariage complète',
      categorie: 'Mariage',
      prix: 299.99,
      stock: 0,
      statut: 'hors_ligne',
      description: 'Ensemble décoration mariage complet',
      image: '/images/deco-mariage.jpg',
      rating: 4.7,
      ventes: 15,
      revenue: 4499,
      tags: ['mariage', 'décoration', 'complet']
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
    if (stock === 0) return { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'rgba(239,68,68,0.3)' };
    if (stock <= 5) return { bg: 'rgba(251,191,36,0.1)', color: '#d97706', border: 'rgba(251,191,36,0.3)' };
    return { bg: 'rgba(34,197,94,0.1)', color: '#16a34a', border: 'rgba(34,197,94,0.3)' };
  };

  const getStatutColor = (statut: string) => {
    return statut === 'en_ligne' 
      ? { bg: 'rgba(34,197,94,0.1)', color: '#16a34a', border: 'rgba(34,197,94,0.3)' }
      : { bg: 'rgba(107,114,128,0.1)', color: '#6b7280', border: 'rgba(107,114,128,0.3)' };
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
            Chargement du catalogue luxe...
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
            <Package style={{ width: '48px', height: '48px', color: '#D4A574', marginRight: '20px' }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Georgia, serif'
            }}>
              Catalogue Luxe
            </h1>
            <Crown style={{ width: '48px', height: '48px', color: '#D4A574', marginLeft: '20px' }} />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Gestion de vos créations d'exception
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
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Total Produits</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>{produits.length}</p>
              </div>
              <Package style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
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
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Produits en Ligne</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>
                  {produits.filter(p => p.statut === 'en_ligne').length}
                </p>
              </div>
              <TrendingUp style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
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
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Stock Critique</p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>
                  {produits.filter(p => p.stock <= 5).length}
                </p>
              </div>
              <AlertTriangle style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.8)' }} />
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
              placeholder="Rechercher un produit..."
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
            {['tous', 'Mariage', 'Luxe', 'Événementiel', 'Saison'].map((filter) => (
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
                {filter === 'tous' ? 'Tous' : filter}
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
            background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
            color: 'white',
            fontFamily: 'Georgia, serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Plus style={{ width: '16px', height: '16px' }} />
            Ajouter
          </button>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {filteredProduits.map((produit, index) => {
            const stockColors = getStockColor(produit.stock);
            const statutColors = getStatutColor(produit.statut);
            
            return (
              <div key={produit.id} style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '1px solid rgba(212,165,116,0.3)',
                transition: 'all 0.3s',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}>
                {produit.stock === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(239,68,68,0.9)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Georgia, serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <AlertTriangle style={{ width: '12px', height: '12px' }} />
                    Rupture
                  </div>
                )}

                {/* Product Header */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    width: '100%',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(212,165,116,0.2) 0%, rgba(139,69,19,0.2) 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Package style={{ width: '48px', height: '48px', color: '#8B4513' }} />
                  </div>
                  
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#8B4513',
                    marginBottom: '8px',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {produit.nom}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    marginBottom: '12px'
                  }}>
                    {produit.description}
                  </p>
                </div>

                {/* Product Info */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: 'rgba(212,165,116,0.1)',
                      color: '#8B4513',
                      fontFamily: 'Georgia, serif'
                    }}>
                      {produit.categorie}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} style={{ 
                          width: '14px', 
                          height: '14px', 
                          color: i < Math.floor(produit.rating) ? '#D4A574' : '#e5e7eb',
                          fill: i < Math.floor(produit.rating) ? '#D4A574' : 'none'
                        }} />
                      ))}
                      <span style={{ fontSize: '12px', color: '#666' }}>{produit.rating}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#8B4513' }}>
                      {produit.prix.toFixed(2)}€
                    </p>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: statutColors.bg,
                      color: statutColors.color,
                      border: `1px solid ${statutColors.border}`,
                      fontFamily: 'Georgia, serif'
                    }}>
                      {produit.statut === 'en_ligne' ? 'En ligne' : 'Hors ligne'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: stockColors.bg,
                      color: stockColors.color,
                      border: `1px solid ${stockColors.border}`,
                      fontFamily: 'Georgia, serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Package style={{ width: '12px', height: '12px' }} />
                      Stock: {produit.stock}
                    </span>
                    <span style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif' }}>
                      {produit.ventes} ventes
                    </span>
                  </div>
                </div>

                {/* Product Stats */}
                <div style={{
                  padding: '16px',
                  background: index === 0 ? 'linear-gradient(135deg, rgba(212,165,116,0.1) 0%, rgba(139,69,19,0.1) 100%)' : 'rgba(212,165,116,0.05)',
                  borderRadius: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif' }}>
                      Revenus
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>
                      {produit.revenue.toLocaleString()}€
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{
                    flex: 1,
                    padding: '12px',
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
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}>
                    <Eye style={{ width: '16px', height: '16px' }} />
                    Voir
                  </button>
                  <button style={{
                    padding: '12px',
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
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}>
                    <Edit style={{ width: '16px', height: '16px' }} />
                  </button>
                  <button style={{
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'rgba(239,68,68,0.1)',
                    color: '#dc2626',
                    fontFamily: 'Georgia, serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}>
                    <Trash2 style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
