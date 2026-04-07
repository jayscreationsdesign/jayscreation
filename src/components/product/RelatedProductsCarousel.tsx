"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/data/products";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { getImageSrc, getImageArray } from "@/lib/images";
import { useState, useEffect, useRef } from "react";
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
  title?: string;
  subtitle?: string;
}

export default function RelatedProductsCarousel({ 
  currentProduct, 
  allProducts = [],
  title = "Vous aimerez aussi",
  subtitle = "Découvrez d'autres créations qui pourraient vous plaire"
}: RelatedProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Responsive: 1 carte sur mobile, 3 sur desktop
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 1 : 3
    }
    return 3
  }
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount())
  
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
    }
    
    setIsDragging(false);
  };

  // Mouse handlers for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
  };

  // SIMPLIFICATION : Toujours utiliser les produits disponibles
  const displayProducts = allProducts
    .filter(p => {
      const fields = getProductFields(p);
      const currentFields = getProductFields(currentProduct);
      return fields.id !== currentFields.id; // Exclure seulement le produit courant
    })
    .slice(0, 8); // Prendre les 8 premiers produits

  // TOUJOURS afficher la section si on a des produits
  if (displayProducts.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, displayProducts.length - visibleCount + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, displayProducts.length - visibleCount + 1)) % Math.max(1, displayProducts.length - visibleCount + 1));
  };

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
          {/* Boutons de navigation - cachés sur mobile */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white text-[#8B4513] p-3 rounded-full hover:bg-[#FAF7F2] transition-all duration-300 border border-[#8B4513] shadow-lg"
            aria-label="Produit précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white text-[#8B4513] p-3 rounded-full hover:bg-[#FAF7F2] transition-all duration-300 border border-[#8B4513] shadow-lg"
            aria-label="Produit suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Grille défilante avec touch support */}
          <div 
            ref={carouselRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div 
              className="flex gap-4 md:gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {/* Afficher les produits */}
              {displayProducts.map((product, index) => {
                const fields = getProductFields(product);
                return (
                  <div
                    key={`${fields.id}-${index}`}
                    className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-1 sm:px-2"
                  >
                    <div className="bg-white rounded-2xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] h-full border border-[#E8E4DF] w-[90vw] sm:w-auto mx-auto">
                      <div className="h-48 sm:h-56 rounded-xl mb-3 sm:mb-4 relative overflow-hidden bg-[#E8D5B7]">
                        <Image
                          src={cleanImageUrl(fields.image)}
                          alt={fields.name}
                          fill
                          className="object-contain"
                          style={{ backgroundColor: '#E8D5B7' }}
                        />
                      </div>
                      
                      <div className="flex flex-col items-center gap-2 mb-2">
                        {/* Badge "Sélection du moment" - conditionnel */}
                        {(fields.id === "1" || fields.name?.includes("Sélection")) && (
                          <div className="inline-block rounded-full bg-[#E8D4B8] px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
                            Sélection du moment
                          </div>
                        )}
                        
                        <h3 className="font-heading text-sm sm:text-base font-semibold text-[#2C2C2C] line-clamp-2 text-center leading-tight">
                          {fields.name}
                        </h3>
                        {fields.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-[#8B4513] fill-current flex-shrink-0" />
                            <span className="text-xs font-medium text-[#6B6B6B]">
                              {fields.rating}/5
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs sm:text-sm text-[#6B5B45] mb-3 line-clamp-2 text-center leading-relaxed">
                        {fields.description || `Création de la catégorie ${fields.category}`}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                        <span className="text-sm sm:text-base font-bold text-[#2C2C2C] text-center sm:text-left">
                          {fields.price}
                        </span>
                        <Link
                          href={`/produit/${fields.slug}`}
                          className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#8B4513] rounded-lg hover:bg-[#A0522D] transition-colors duration-200 shadow-sm whitespace-nowrap"
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
            {Array.from({ length: Math.max(1, displayProducts.length - visibleCount + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#8B4513] w-8" 
                    : "bg-[#8E8E4DF] hover:bg-[#8B4513]/60"
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
