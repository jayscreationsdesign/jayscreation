"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FilterBar from "@/components/catalog/FilterBar";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/data/products";
import type { ExtendedProduct } from "@/types/extended-product";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetcher les produits de la catégorie depuis Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO: Remplacer par l'appel Supabase réel
        // Pour l'instant, simulation avec données locales
        const response = await fetch(`/api/products?category_slug=${categorySlug}`);
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des produits');
        }
        
        const data = await response.json();
        
        // Les données sont déjà adaptées par l'API
        const adaptedProducts: ExtendedProduct[] = data;
        
        setProducts(adaptedProducts);
        setFilteredProducts(adaptedProducts);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger les produits');
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchProducts();
    }
  }, [categorySlug]);

  const handleFilter = (filtered: ExtendedProduct[]) => {
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A96E] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#C8A96E] text-white rounded hover:bg-[#B3985F] transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête de la catégorie */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C1A0E] mb-2">
            {products[0]?.category || 'Catégorie'}
          </h1>
          <p className="text-gray-600">
            {products.length} produit{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Barre de filtres */}
        <FilterBar 
          products={products} 
          onFilter={handleFilter}
        />

        {/* Grille de produits */}
        {filteredProducts.length === 0 ? (
          <div className="mt-8 text-center py-12">
            <p className="text-gray-600">Aucun produit ne correspond à vos filtres.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
