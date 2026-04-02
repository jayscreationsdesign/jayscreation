"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/data/products";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { getImageSrc, getImageArray } from "@/lib/images";
import { useState } from "react";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import { products, type Product as LocalProduct } from "@/data/products";
import type { Product as SupabaseProduct } from "@/types/product";
import { useSmartRecommendations } from "@/hooks/useSmartRecommendations";

// Types unifiés
type UnifiedProduct = LocalProduct | SupabaseProduct;

// Fonction pour nettoyer les URLs d'images
function cleanImageUrl(url: string): string {
  if (!url) return url;
  return url.split('?')[0];
}

// Fonction pour vérifier si c'est un produit Supabase
function isSupabaseProduct(product: UnifiedProduct): product is SupabaseProduct {
  return 'nom' in product;
}

// Fonction pour obtenir les champs unifiés
function getProductFields(product: UnifiedProduct) {
  if (isSupabaseProduct(product)) {
    return {
      id: product.id,
      name: product.nom,
      price: typeof product.prix === 'number' ? `${product.prix.toFixed(2)}€` : product.prix,
      category: product.categorie || '',
      image: (product as any).images?.[0] || (product as any).image || '',
      slug: product.slug,
      rating: undefined,
      description: product.description
    };
  } else {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category || '',
      image: (product as any).image || '',
      slug: product.slug,
      rating: product.rating,
      description: product.description
    };
  }
}

interface RelatedProductsCarouselProps {
  currentProduct: UnifiedProduct;
  allProducts?: UnifiedProduct[];
}

export default function RelatedProductsCarousel({ 
  currentProduct,
  allProducts = products
}: RelatedProductsCarouselProps) {
  // Utiliser la logique de recommandation intelligente avec scoring
  const { relatedProducts, title, subtitle, hasRecommendations } = useSmartRecommendations(
    currentProduct, 
    allProducts
  );

  // Ne pas afficher le carrousel s'il n'y a pas de recommandations
  if (!hasRecommendations) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, relatedProducts.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, relatedProducts.length - 3)) % Math.max(1, relatedProducts.length - 3));
  };

  if (relatedProducts.length === 0) {
    return null; // Ne pas afficher si aucun produit similaire
  }

  return (
    <section className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl text-[#2C2C2C] sm:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel des produits */}
        <div className="relative mb-12">
          {/* Boutons de navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white text-[#8B4513] p-3 rounded-full hover:bg-[#FAF7F2] transition-all duration-300 border border-[#8B4513] shadow-lg"
            aria-label="Produit précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white text-[#8B4513] p-3 rounded-full hover:bg-[#FAF7F2] transition-all duration-300 border border-[#8B4513] shadow-lg"
            aria-label="Produit suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Grille défilante */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 25}%)`
              }}
            >
              {/* Afficher les produits */}
              {relatedProducts.map((product, index) => {
                const fields = getProductFields(product);
                return (
                  <div
                    key={`${fields.id}-${index}`}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-2"
                  >
                    <div className="bg-white rounded-2xl p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] h-full border border-[#E8E4DF]">
                      <div className="h-56 rounded-xl mb-4 relative overflow-hidden bg-[#E8D5B7]">
                        <Image
                          src={cleanImageUrl(fields.image)}
                          alt={fields.name}
                          fill
                          className="object-contain"
                          style={{ backgroundColor: '#E8D5B7' }}
                        />
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        {/* Badge "Sélection du moment" - conditionnel */}
                        {(fields.id === "1" || fields.name?.includes("Sélection")) && (
                          <div className="inline-block rounded-full bg-[#E8D4B8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8B4513] mb-2">
                            Sélection du moment
                          </div>
                        )}
                        
                        <h3 className="font-heading text-base font-semibold text-[#2C2C2C] line-clamp-2">
                          {fields.name}
                        </h3>
                        {fields.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-[#8B4513] fill-current" />
                            <span className="text-xs font-medium text-[#6B6B6B]">
                              {fields.rating}/5
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-[#6B5B45] mb-3 line-clamp-2">
                        {fields.description || `Création de la catégorie ${fields.category}`}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-[#2C2C2C]">
                          {fields.price}
                        </span>
                        <Link
                          href={`/produit/${fields.slug}`}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#8B4513] rounded-lg hover:bg-[#A0522D] transition-colors duration-200 shadow-sm"
                        >
                          Voir
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Indicateurs de position */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.max(1, relatedProducts.length - 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#8B4513] w-8" 
                    : "bg-[#E8E4DF] hover:bg-[#8B4513]/60"
                }`}
                aria-label={`Aller au produit ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
