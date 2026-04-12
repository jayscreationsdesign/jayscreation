"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/data/products";
import { formatPriceEUR } from "@/lib/formatPrice";
import { getImageSrc, getImageArray } from "@/lib/images";
import ProductImagePlaceholder from "@/components/products/ProductImagePlaceholder";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import ImageMagnifier from "@/components/ui/ImageMagnifier";

interface ProductCardProps {
  product: Product & {
    pricing_type?: 'unit_with_minimum' | 'lot_pricing' | 'quote';
    unit_price?: number;
    min_quantity?: number;
    lots?: Array<{
      lot_price: number;
    }>;
    price_min?: number;
    price_max?: number;
  };
  className?: string;
}

function formatPrice(product: Product & {
  pricing_type?: 'unit_with_minimum' | 'lot_pricing' | 'quote';
  unit_price?: number;
  min_quantity?: number;
  lots?: Array<{
    lot_price: number;
  }>;
  price_min?: number;
  price_max?: number;
}) {
  // Cas 1 : prix min ET max -> fourchette
  if (product.price_min && product.price_max) {
    return `${formatPriceEUR(product.price_min)} - ${formatPriceEUR(product.price_max)}`;
  }
  
  // Cas 2 : prix unitaire simple
  if (product.unit_price) {
    return formatPriceEUR(product.unit_price);
  }
  
  // Cas 3 : prix simple (ancien champ)
  if (product.price) {
    const defaultPrice = product.price || 'Sur devis';
    const priceInEuros = defaultPrice.replace('$', '\u20AC');
    
    // Si c'est une fourchette de prix, l'afficher telle quelle
    if (priceInEuros.includes(' - ')) {
      return priceInEuros;
    }
    
    return priceInEuros;
  }
  
  // Cas 4 : pas de prix
  return 'Sur devis';
}

export default function ProductCard({ 
  product, 
  className = ""
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Vérifier si le produit utilise un placeholder (utiliser l'image originale non traitée)
  const isPlaceholder = !product.image || product.image.includes('placeholder') || product.image.trim() === '';
  const mainImage = getImageSrc(product.image);
  const images = getImageArray(product.images, mainImage);
  
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E0D4]/50 flex flex-col">
      
      {/* Zone image - fond beige, image centrée */}
      <Link href={`/produit/${product.slug}`} className="block relative bg-[#E8DFD3] aspect-square flex items-center justify-center p-3 rounded-t-2xl overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
        {isPlaceholder ? (
          <ProductImagePlaceholder productName={product.name} />
        ) : (
          <ImageMagnifier
            src={currentImage}
            alt={product.name}
            className="max-w-[95%] max-h-[95%] w-auto h-auto"
            maxZoom={2.5}
            minZoom={1}
            zoomStep={0.3}
          />
        )}
        
        {/* Flèches carrousel si plusieurs images */}
        {hasMultipleImages && (
          <>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm text-[#666] text-sm hover:bg-white transition-colors z-10"
            >
              &#8249;
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm text-[#666] text-sm hover:bg-white transition-colors z-10"
            >
              &#8250;
            </button>
          </>
        )}

        {/* Indicateurs de pagination */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none">
            {images.map((_, index) => (
              <span
                key={index}
                className={`block w-2 h-2 rounded-full ${
                  currentImageIndex === index ? 'bg-[#8B6F47]' : 'bg-white/60'
                }`}
              ></span>
            ))}
          </div>
        )}
      </Link>

      {/* Zone info - fond blanc */}
      <div className="p-4 flex flex-col items-center text-center flex-1">
        
        {/* Catégorie */}
        <span className="text-[10px] text-[#999] uppercase tracking-[2px] font-medium mb-1">
          {product.category || ''}
        </span>
        
        {/* Nom du produit - Playfair italique */}
        <Link href={`/produit/${product.slug}`} className="block text-sm font-semibold text-[#333] mb-1.5 hover:text-[#8B4513] transition-colors cursor-pointer" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
          {product.name}
        </Link>
        
        {/* Prix */}
        <p className="text-sm font-bold text-[#333] mb-3">
          {formatPrice(product)}
        </p>
        
        {/* Bouton Voir */}
        <PrimaryCtaButton 
          href={`/produit/${product.slug}`} 
          className="px-4 py-2 text-xs whitespace-nowrap w-auto flex-shrink-0"
        >
          Voir
        </PrimaryCtaButton>
      </div>
    </div>
  );
}
