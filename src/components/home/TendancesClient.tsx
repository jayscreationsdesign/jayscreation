"use client";

import { ArrowRight, Star, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { useState, useRef, useEffect } from "react";

// Fonction pour nettoyer les URLs d'images en supprimant les query strings
function cleanImageUrl(url: string): string {
  if (!url) return url;
  // Supprimer tout ce qui vient après le ? (query string)
  return url.split('?')[0];
}

export default function TendancesClient() {
  // Sélectionner les 8 produits les mieux notés
  const topRatedProducts = products
    .filter((product: Product) => product.rating)
    .sort((a: Product, b: Product) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % topRatedProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + topRatedProducts.length) % topRatedProducts.length);
  };

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

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="py-16 bg-gradient-to-r from-[#8B4513] to-[#D4A574] relative overflow-hidden">
      {/* Pattern de fond subtil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-white" />
            <h2 className="font-heading text-3xl text-white sm:text-4xl font-bold">
              Tendances
            </h2>
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Découvrez les créations les plus populaires du moment
          </p>
        </div>

        {/* Carousel des produits tendance */}
        <div className="relative mb-12">
          {/* Boutons de navigation - cachés sur mobile */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
            aria-label="Produit précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
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
              {/* Dupliquer les produits pour un défilement infini */}
              {[...topRatedProducts, ...topRatedProducts].map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-1 sm:px-2"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] h-full">
                    <div className="aspect-square bg-white/20 rounded-xl mb-3 sm:mb-4 relative overflow-hidden">
                      <Image
                        src={cleanImageUrl(product.image)}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2 mb-2">
                      <h3 className="font-heading text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-300 fill-current flex-shrink-0" />
                        <span className="text-xs font-medium text-white">
                          {product.rating}/5
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-white/80 mb-3 line-clamp-2 leading-relaxed">
                      {product.description || `Produit tendance de la catégorie ${product.category}`}
                    </p>
                    
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white flex-shrink-0">
                        {product.price}
                      </span>
                      <Link
                        href={`/produit/${product.slug}`}
                        className="inline-flex items-center gap-1 bg-white/20 text-white px-2 sm:px-3 py-1 rounded-lg text-xs font-medium hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Voir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs de position */}
          <div className="flex justify-center gap-2 mt-6">
            {topRatedProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-white w-8" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Aller au produit ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call-to-action */}
        <div className="text-center">
          <Link
            href="/tendances"
            className="inline-flex items-center gap-3 bg-white text-[#8B4513] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02] group"
          >
            <span className="text-lg">Explorer les tendances</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <p className="text-white/70 text-sm mt-4">
            Découvrez toutes nos créations tendance
          </p>
        </div>
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
    </section>
  );
}
