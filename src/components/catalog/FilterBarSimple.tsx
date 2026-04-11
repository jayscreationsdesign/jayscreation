"use client";

import { useState, useEffect, useRef } from "react";
import type { Product } from "@/data/products";

interface ExtendedProduct extends Product {
  in_stock: boolean;
  unit_price: number;
  created_at: string;
  sales_count: number | null;
  featured: boolean | null;
}

interface FilterBarProps {
  products: ExtendedProduct[];
  onFilter: (filtered: ExtendedProduct[]) => void;
}

export default function FilterBar({ products, onFilter }: FilterBarProps) {
  // États pour les filtres
  const [availabilityFilters, setAvailabilityFilters] = useState({
    inStock: false,
    outOfStock: false,
  });
  
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
  });
  
  const [sortBy, setSortBy] = useState("featured");
  
  // États pour les dropdowns
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  
  // Refs pour détecter les clics extérieurs
  const availabilityRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Calculer le prix maximum dynamique
  const maxPrice = products.length > 0 
    ? Math.max(...products.map(p => p.unit_price || p.numericPrice || 0))
    : 0;

  // Initialiser le prix max au chargement
  useEffect(() => {
    setPriceRange(prev => ({ ...prev, max: maxPrice }));
  }, [maxPrice]);

  // Fermer les dropdowns au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Vérifier si le clic est à l'extérieur de tous les dropdowns
      const clickedOutsideAvailability = availabilityRef.current && !availabilityRef.current.contains(event.target as Node);
      const clickedOutsidePrice = priceRef.current && !priceRef.current.contains(event.target as Node);
      const clickedOutsideSort = sortRef.current && !sortRef.current.contains(event.target as Node);

      if (clickedOutsideAvailability) {
        setAvailabilityOpen(false);
      }
      if (clickedOutsidePrice) {
        setPriceOpen(false);
      }
      if (clickedOutsideSort) {
        setSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculer les compteurs de disponibilité
  const inStockCount = products.filter(p => p.in_stock === true).length;
  const outOfStockCount = products.filter(p => p.in_stock === false).length;
  const selectedAvailabilityCount = [availabilityFilters.inStock, availabilityFilters.outOfStock].filter(Boolean).length;

  // Gestionnaires d'événements avec appel direct à onFilter
  const handleAvailabilityChange = (type: 'inStock' | 'outOfStock') => {
    const newFilters = {
      ...availabilityFilters,
      [type]: !availabilityFilters[type]
    };
    setAvailabilityFilters(newFilters);
    // Fermer les autres dropdowns
    setPriceOpen(false);
    setSortOpen(false);
    
    // Appliquer le filtrage directement
    let filtered = [...products];

    // Filtre de disponibilité
    if (newFilters.inStock && !newFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === true);
    } else if (!newFilters.inStock && newFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === false);
    }
    // Si les deux cochés = ne filtrer rien (tout garder)

    // Filtre de prix
    filtered = filtered.filter(p => {
      const price = p.unit_price || p.numericPrice || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Tri
    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => {
          const aFeatured = a.featured === true ? 1 : 0;
          const bFeatured = b.featured === true ? 1 : 0;
          return bFeatured - aFeatured;
        });
        break;
      case "bestsellers":
        filtered.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => {
          const priceA = a.unit_price || a.numericPrice || 0;
          const priceB = b.unit_price || b.numericPrice || 0;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          const priceA = a.unit_price || a.numericPrice || 0;
          const priceB = b.unit_price || b.numericPrice || 0;
          return priceB - priceA;
        });
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    onFilter(filtered);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value) || 0;
    const newRange = {
      ...priceRange,
      [type]: numValue
    };
    setPriceRange(newRange);
    // Fermer les autres dropdowns
    setAvailabilityOpen(false);
    setSortOpen(false);
    
    // Appliquer le filtrage directement
    let filtered = [...products];

    // Filtre de disponibilité
    if (availabilityFilters.inStock && !availabilityFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === true);
    } else if (!availabilityFilters.inStock && availabilityFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === false);
    }

    // Filtre de prix
    filtered = filtered.filter(p => {
      const price = p.unit_price || p.numericPrice || 0;
      return price >= newRange.min && price <= newRange.max;
    });

    // Tri
    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => {
          const aFeatured = a.featured === true ? 1 : 0;
          const bFeatured = b.featured === true ? 1 : 0;
          return bFeatured - aFeatured;
        });
        break;
      case "bestsellers":
        filtered.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => {
          const priceA = a.unit_price || a.numericPrice || 0;
          const priceB = b.unit_price || b.numericPrice || 0;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          const priceA = a.unit_price || a.numericPrice || 0;
          const priceB = b.unit_price || b.numericPrice || 0;
          return priceB - priceA;
        });
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    onFilter(filtered);
  };

  const resetPrice = () => {
    const newRange = { min: 0, max: maxPrice };
    setPriceRange(newRange);
    // Fermer les autres dropdowns
    setAvailabilityOpen(false);
    setSortOpen(false);
    
    // Appliquer le filtrage directement
    let filtered = [...products];

    // Filtre de disponibilité
    if (availabilityFilters.inStock && !availabilityFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === true);
    } else if (!availabilityFilters.inStock && availabilityFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === false);
    }

    // Filtre de prix (tous les produits après reset)
    // Tri
    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => {
          const aFeatured = a.featured === true ? 1 : 0;
          const bFeatured = b.featured === true ? 1 : 0;
          return bFeatured - aFeatured;
        });
        break;
      case "bestsellers":
        filtered.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => {
          const priceA = a.unit_price || a.numericPrice || 0;
          const priceB = b.unit_price || b.numericPrice || 0;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          const priceA = a.unit_price || a.numericPrice || 0;
          const priceB = b.unit_price || b.numericPrice || 0;
          return priceB - priceA;
        });
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    onFilter(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setSortOpen(false); // Fermer le dropdown après sélection
    // Fermer les autres dropdowns
    setAvailabilityOpen(false);
    setPriceOpen(false);
    let filtered = [...products];

    // Filtre de disponibilité
    if (availabilityFilters.inStock && !availabilityFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === true);
    } else if (!availabilityFilters.inStock && availabilityFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === false);
    }

    // Filtre de prix
    filtered = filtered.filter(p => {
      const price = p.unit_price || p.numericPrice || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Tri
    switch (value) {
      case "featured":
        filtered.sort((a, b) => {
          const aFeatured = a.featured === true ? 1 : 0;
          const bFeatured = b.featured === true ? 1 : 0;
          return bFeatured - aFeatured;
        });
        break;
      case "bestsellers":
        filtered.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => {
          const priceA = a.unit_price || a.numericPrice || 0;
          const priceB = b.unit_price || b.numericPrice || 0;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          const priceA = a.unit_price || a.numericPrice || 0;
          const priceB = b.unit_price || b.numericPrice || 0;
          return priceB - priceA;
        });
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    onFilter(filtered);
  };

  const getAvailabilityLabel = () => {
    if (selectedAvailabilityCount === 0) return "0 sélectionné";
    if (selectedAvailabilityCount === 1) return "1 sélectionné";
    return `${selectedAvailabilityCount} sélectionnés`;
  };

  return (
    <div 
      className="flex items-center justify-between bg-white border-b border-[#e8e0d8]"
      style={{ height: '48px', padding: '0 16px' }}
    >
      {/* Filtres à gauche */}
      <div className="flex items-center gap-2">
        <span className="text-[15px] text-[#6b6b6b]" style={{ fontFamily: 'Inter' }}>
          Filtre :
        </span>
        
        {/* Filtre disponibilité */}
        <div className="relative" ref={availabilityRef}>
          <button
            onClick={() => setAvailabilityOpen(!availabilityOpen)}
            className={`flex items-center gap-1 px-3 py-1 cursor-pointer transition-colors ${
              availabilityOpen || selectedAvailabilityCount > 0
                ? "border border-[#C8A96E]"
                : "border border-transparent"
            }`}
            style={{ 
              fontSize: '15px', 
              color: '#3d3d3d',
              fontFamily: 'Inter',
              borderRadius: '0',
              padding: '6px 12px'
            }}
          >
            <span>Disponibilité</span>
            <span style={{ fontSize: '10px' }}>{"\u25bc"}</span>
            {selectedAvailabilityCount > 0 && (
              <span className="text-xs bg-[#C8A96E] text-white px-2 py-1">
                {selectedAvailabilityCount}
              </span>
            )}
          </button>

          {availabilityOpen && (
            <div 
              className="absolute top-full left-0 mt-1 bg-white border-2 border-[#8B4513] rounded-lg shadow-xl z-50"
              style={{ 
                padding: '16px',
                minWidth: '220px'
              }}
            >
              <div className="mb-3">
                <div 
                  className="text-[12px] text-[#6b6b6b] mb-3"
                  style={{ 
                    borderBottom: '1px solid #f0ebe4',
                    paddingBottom: '8px'
                  }}
                >
                  {getAvailabilityLabel()}
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availabilityFilters.inStock}
                    onChange={() => handleAvailabilityChange('inStock')}
                    className="rounded border-gray-300"
                    style={{ accentColor: '#C8A96E' }}
                  />
                  <span style={{ fontSize: '13px', color: '#3d3d3d' }}>
                    En stock ({inStockCount})
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availabilityFilters.outOfStock}
                    onChange={() => handleAvailabilityChange('outOfStock')}
                    className="rounded border-gray-300"
                    style={{ accentColor: '#C8A96E' }}
                  />
                  <span style={{ 
                    fontSize: '13px', 
                    color: outOfStockCount === 0 ? '#b0a89e' : '#3d3d3d'
                  }}>
                    En rupture de stock ({outOfStockCount})
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Filtre prix */}
        <div className="relative" ref={priceRef}>
          <button
            onClick={() => setPriceOpen(!priceOpen)}
            className={`flex items-center gap-1 px-3 py-1 cursor-pointer transition-colors ${
              priceOpen || (priceRange.min > 0 || priceRange.max < maxPrice)
                ? "border border-[#C8A96E]"
                : "border border-transparent"
            }`}
            style={{ 
              fontSize: '15px', 
              color: '#3d3d3d',
              fontFamily: 'Inter',
              borderRadius: '0',
              padding: '6px 12px'
            }}
          >
            <span>Prix</span>
            <span style={{ fontSize: '10px' }}>{"\u25bc"}</span>
            {(priceRange.min > 0 || priceRange.max < maxPrice) && (
              <span className="text-xs bg-[#C8A96E] text-white px-2 py-1">
                1
              </span>
            )}
          </button>

          {priceOpen && (
            <div 
              className="absolute top-full left-0 mt-1 bg-white border-2 border-[#8B4513] rounded-lg shadow-xl z-50"
              style={{ 
                padding: '16px',
                minWidth: '280px'
              }}
            >
              <div className="mb-3">
                <div 
                  className="flex justify-between items-center"
                  style={{ 
                    borderBottom: '1px solid #f0ebe4',
                    paddingBottom: '8px',
                    marginBottom: '12px',
                    gap: '16px'
                  }}
                >
                  <span className="text-[12px] text-[#6b6b6b]" style={{ whiteSpace: 'nowrap' }}>
                    Le prix le plus élevé est de {maxPrice.toFixed(2)}EUR
                  </span>
                  <button
                    onClick={resetPrice}
                    className="inline-flex items-center justify-center rounded-full bg-[#8b4513] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#6b3410] hover:text-[#D4A574] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b4513] min-w-fit whitespace-nowrap"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px',
                marginTop: '12px'
              }}>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '13px', color: '#6b6b6b' }}>{"\u20ac"}</span>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="px-2 py-1"
                    style={{ 
                      border: '1px solid #e8e0d8',
                      padding: '6px 10px',
                      fontSize: '13px',
                      width: '100px',
                      borderRadius: '0'
                    }}
                    min="0"
                    max={priceRange.max}
                    step="0.01"
                    placeholder="De"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '13px', color: '#6b6b6b' }}>{"\u20ac"}</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="px-2 py-1"
                    style={{ 
                      border: '1px solid #e8e0d8',
                      padding: '6px 10px',
                      fontSize: '13px',
                      width: '100px',
                      borderRadius: '0'
                    }}
                    min={priceRange.min}
                    max={maxPrice}
                    step="0.01"
                    placeholder="Destination"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tri et compteur à droite */}
      <div className="flex items-center gap-2">
        {/* Trier par */}
        <div className="flex items-center gap-2">
          <span className="text-[15px] text-[#6b6b6b]" style={{ fontFamily: 'Inter' }}>
            Trier par :
          </span>
          <div className="relative" ref={sortRef}>
            <div
              onClick={() => setSortOpen(!sortOpen)}
              style={{
                background: 'white',
                border: '1px solid #8B4513',
                color: '#8B4513',
                padding: '6px 14px',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '2px'
              }}
            >
              <span>Alphabétique, de A à Z</span>
              <span style={{ fontSize: '10px', color: '#8B4513' }}>{"\u25bc"}</span>
            </div>
            {sortOpen && (
              <div 
                className="absolute top-full right-0 mt-1 rounded-xl bg-[#FAF7F2] shadow-xl py-3 z-50 border border-[#8B4513]"
                style={{ 
                  minWidth: '280px'
                }}
              >
                <div className="px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2 cursor-pointer">
                  <button
                    onClick={() => handleSortChange('featured')}
                    className="w-full text-left"
                  >
                    En vedette
                  </button>
                </div>
                <div className="px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2 cursor-pointer">
                  <button
                    onClick={() => handleSortChange('bestsellers')}
                    className="w-full text-left"
                  >
                    Meilleures ventes
                  </button>
                </div>
                <div className="px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2 cursor-pointer">
                  <button
                    onClick={() => handleSortChange('name-asc')}
                    className="w-full text-left"
                  >
                    Alphabétique, de A à Z
                  </button>
                </div>
                <div className="px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2 cursor-pointer">
                  <button
                    onClick={() => handleSortChange('name-desc')}
                    className="w-full text-left"
                  >
                    Alphabétique, de Z à A
                  </button>
                </div>
                <div className="px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2 cursor-pointer">
                  <button
                    onClick={() => handleSortChange('price-asc')}
                    className="w-full text-left"
                  >
                    Prix : faible à élevé
                  </button>
                </div>
                <div className="px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2 cursor-pointer">
                  <button
                    onClick={() => handleSortChange('price-desc')}
                    className="w-full text-left"
                  >
                    Prix : élevé à faible
                  </button>
                </div>
                <div className="px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2 cursor-pointer">
                  <button
                    onClick={() => handleSortChange('date-asc')}
                    className="w-full text-left"
                  >
                    Date, de la plus ancienne à la plus récente
                  </button>
                </div>
                <div className="px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2 cursor-pointer">
                  <button
                    onClick={() => handleSortChange('date-desc')}
                    className="w-full text-left"
                  >
                    Date, de la plus récente à la plus ancienne
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compteur de produits */}
        <div className="text-[15px] text-[#3d3d3d]" style={{ marginLeft: '16px' }}>
          {products.length} produits
        </div>
      </div>
    </div>
  );
}
