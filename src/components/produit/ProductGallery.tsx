"use client";

import { useState } from "react";
import { type Product } from "@/data/products";
import ImageCarousel from "@/components/ui/ImageCarousel";

export default function ProductGallery({ product }: { product: Product }) {
  // Images principales : image du produit + images additionnelles si elles existent
  const images = product.images ? [product.image, ...product.images] : [product.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);

  // Limiter à 3 thumbnails visibles
  const maxVisibleThumbnails = 3;
  const visibleThumbnails = images.slice(thumbnailStart, thumbnailStart + maxVisibleThumbnails);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleThumbnailPrev = () => {
    setThumbnailStart(prev => Math.max(0, prev - 1));
  };

  const handleThumbnailNext = () => {
    setThumbnailStart(prev => Math.min(images.length - maxVisibleThumbnails, prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Carrousel principal */}
      <div className="product-gallery-uniform relative rounded-xl overflow-hidden shadow-md max-w-md mx-auto">
        <div className="relative aspect-[3/4]">
          <img
            src={images[currentImageIndex]}
            alt={`${product.name} - vue ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation flèches */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Carrousel de thumbnails - Style comme page d'accueil */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Flèche gauche */}
          {thumbnailStart > 0 && (
            <button
              onClick={handleThumbnailPrev}
              className="flex-shrink-0 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* Thumbnails visibles - Style comme page d'accueil */}
          {visibleThumbnails.map((img, index) => {
            const actualIndex = thumbnailStart + index;
            const isActive = actualIndex === currentImageIndex;
            
            return (
              <div
                key={actualIndex}
                onClick={() => handleThumbnailClick(actualIndex)}
                className={`relative flex-shrink-0 w-20 h-24 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl ${
                  isActive ? 'scale-105 shadow-xl' : ''
                }`}
                style={{ backgroundColor: '#fdf8ec' }}
              >
                <img
                  src={img}
                  alt={`${product.name} - vue ${actualIndex + 1}`}
                  className="w-full h-full object-contain p-2"
                />
                {/* Indicateur actif - bordure dorée */}
                {isActive && (
                  <div className="absolute inset-0 border-2 border-[#C8A96E] rounded-3xl pointer-events-none" />
                )}
              </div>
            );
          })}
          
          {/* Flèche droite */}
          {thumbnailStart + maxVisibleThumbnails < images.length && (
            <button
              onClick={handleThumbnailNext}
              className="flex-shrink-0 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
