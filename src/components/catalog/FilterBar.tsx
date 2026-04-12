"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/data/products";
import type { ExtendedProduct } from "@/types/extended-product";

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
  
  // Refs pour détecter les clics extérieurs
  const availabilityRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

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
      if (availabilityRef.current && !availabilityRef.current.contains(event.target as Node)) {
        setAvailabilityOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setPriceOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculer les compteurs de disponibilité
  const inStockCount = products.filter(p => p.in_stock === true).length;
  const outOfStockCount = products.filter(p => p.in_stock === false).length;
  const selectedAvailabilityCount = [availabilityFilters.inStock, availabilityFilters.outOfStock].filter(Boolean).length;

  // Logique de filtrage
  useEffect(() => {
    let filtered = [...products];

    // Filtre de disponibilité
    if (availabilityFilters.inStock && !availabilityFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === true);
    } else if (!availabilityFilters.inStock && availabilityFilters.outOfStock) {
      filtered = filtered.filter(p => p.in_stock === false);
    } else if (availabilityFilters.inStock && availabilityFilters.outOfStock) {
      // Les deux cochés = ne filtrer rien (tout garder)
    }

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
      case "relevance":
        filtered.sort((a, b) => {
          const aRelevance = a.sales_count || 0;
          const bRelevance = b.sales_count || 0;
          const aFeatured = a.featured === true ? 1 : 0;
          const bFeatured = b.featured === true ? 1 : 0;
          // D'abord par featured, puis par relevance
          if (aFeatured !== bFeatured) return bFeatured - aFeatured;
          return bRelevance - aRelevance;
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
  }, [products, availabilityFilters, priceRange, sortBy]);

  // Gestionnaires d'événements
  const handleAvailabilityChange = (type: 'inStock' | 'outOfStock') => {
    setAvailabilityFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value) || 0;
    setPriceRange(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  const resetPrice = () => {
    setPriceRange({ min: 0, max: maxPrice });
  };

  const getAvailabilityLabel = () => {
    if (selectedAvailabilityCount === 0) return "0 sélectionné";
    if (selectedAvailabilityCount === 1) return "1 sélectionné";
    return `${selectedAvailabilityCount} sélectionnés`;
  };

  return (
    <div className="flex justify-between items-center bg-white border border-[#C8A96E] rounded-none p-4">
      {/* Filtres à gauche */}
      <div className="flex items-center gap-6">
        {/* Filtre disponibilité */}
        <div className="relative" ref={availabilityRef}>
          <button
            onClick={() => setAvailabilityOpen(!availabilityOpen)}
            className={`flex items-center gap-2 px-3 py-2 border rounded-none transition-colors ${
              availabilityOpen || selectedAvailabilityCount > 0
                ? "border-[#C8A96E] text-[#C8A96E]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            <span className="text-sm">Disponibilité</span>
            <ChevronDown size={16} />
            {selectedAvailabilityCount > 0 && (
              <span className="text-xs bg-[#C8A96E] text-white px-2 py-1">
                {selectedAvailabilityCount}
              </span>
            )}
          </button>

          {availabilityOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-none shadow-lg z-50 w-64">
              <div className="p-4">
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-2">{getAvailabilityLabel()}</div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availabilityFilters.inStock}
                      onChange={() => handleAvailabilityChange('inStock')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">En stock ({inStockCount})</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availabilityFilters.outOfStock}
                      onChange={() => handleAvailabilityChange('outOfStock')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">En rupture de stock ({outOfStockCount})</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filtre prix */}
        <div className="relative" ref={priceRef}>
          <button
            onClick={() => setPriceOpen(!priceOpen)}
            className={`flex items-center gap-2 px-3 py-2 border rounded-none transition-colors ${
              priceOpen || (priceRange.min > 0 || priceRange.max < maxPrice)
                ? "border-[#C8A96E] text-[#C8A96E]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            <span className="text-sm">Prix</span>
            <ChevronDown size={16} />
            {(priceRange.min > 0 || priceRange.max < maxPrice) && (
              <span className="text-xs bg-[#C8A96E] text-white px-2 py-1">
                1
              </span>
            )}
          </button>

          {priceOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-none shadow-lg z-50 w-80">
              <div className="p-4">
                <div className="mb-3">
                  <div className="text-xs text-gray-500">
                    Le prix le plus élevé est de {maxPrice.toFixed(2)}EUR
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-8">De:</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      min="0"
                      max={priceRange.max}
                      step="0.01"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-8">À:</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      min={priceRange.min}
                      max={maxPrice}
                      step="0.01"
                    />
                  </div>
                  <button
                    onClick={resetPrice}
                    className="text-sm text-[#C8A96E] hover:underline"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tri et compteur à droite */}
      <div className="flex items-center gap-6">
        {/* Trier par */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Trier par:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#C8A96E]"
          >
            <option value="featured">En vedette</option>
            <option value="relevance">Le plus pertinent</option>
            <option value="bestsellers">Meilleures ventes</option>
            <option value="name-asc">Alphabétique, de A à Z</option>
            <option value="name-desc">Alphabétique, de Z à A</option>
            <option value="price-asc">Prix : faible à élevé</option>
            <option value="price-desc">Prix : élevé à faible</option>
            <option value="date-asc">Date, de la plus ancienne à la plus récente</option>
            <option value="date-desc">Date, de la plus récente à la plus ancienne</option>
          </select>
        </div>

        {/* Compteur de produits */}
        <div className="text-sm text-gray-600">
          {products.length} produits
        </div>
      </div>
    </div>
  );
}
