"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { type Product } from "@/data/products";
import ImageCarousel from "./ImageCarousel";
import { getImageSrc, getImageArray } from "@/lib/images";
import { useState } from "react";
import PrimaryCtaButton from "./PrimaryCtaButton";
import ProductImagePlaceholder from "@/components/products/ProductImagePlaceholder";
import { formatPriceEUR } from "@/lib/formatPrice";

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
  showCategory?: boolean;
  showRating?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
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
  className = "",
  showCategory = true,
  showRating = true,
  aspectRatio = "square"
}: ProductCardProps) {
  // Gestion des erreurs d'images avec fallback
  const [imageError, setImageError] = useState(false);
  const mainImage = getImageSrc(product.image);
  const fallbackImage = "/images/products/placeholder.png";
  const allImages = getImageArray(product.images, mainImage);
  const hasMultipleImages = allImages.length > 1;

  const handleImageError = () => {
    setImageError(true);
  };

  const displayImage = imageError ? fallbackImage : mainImage;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 min-h-[420px] ${className}`}
      style={{ backgroundColor: 'var(--jc-surface)', border: '1px solid var(--jc-border)' }}
    >
      {/* IMAGE avec carrousel conditionnel et fond #fdf8ec */}
      <div className="relative">
        {hasMultipleImages ? (
          <div className="product-card-uniform relative w-full aspect-square bg-[#FDFBF7] rounded-t-2xl overflow-hidden flex items-center justify-center p-3 md:p-4 shadow-lg">
            <ImageCarousel
              images={allImages}
              alt={product.name}
              variant="category"
              aspectRatio={aspectRatio}
              showArrows={true}
              showDots={true}
              showThumbnails={false}
              className="w-full max-w-[80%] max-h-[80%] md:max-w-full md:max-h-full"
            />
          </div>
        ) : (
          <div className="product-card-uniform relative w-full aspect-square bg-[#FDFBF7] rounded-t-2xl overflow-hidden flex items-center justify-center p-3 md:p-4 shadow-lg">
            {displayImage.includes('placeholder') ? (
              <ProductImagePlaceholder productName={product.name} />
            ) : (
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="max-w-[80%] max-h-[80%] md:max-w-full md:max-h-full w-auto h-auto object-contain transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ backgroundColor: '#FDFBF7' }}
                onError={handleImageError}
              />
            )}
          </div>
        )}
      </div>

      {/* CONTENU */}
      <div className="flex flex-1 flex-col items-center justify-between gap-2 px-3 py-2 md:px-4 md:py-3 text-center">
        <div className="flex flex-col items-center gap-2 w-full">
          {/* Badge "Sélection du moment" - conditionnel */}
          {(product.id === "1" || product.name?.includes("Sélection")) && (
            <div className="inline-block rounded-full bg-[#E8D4B8] px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#8B4513] mb-2">
              Sélection du moment
            </div>
          )}
          
          {/* Catégorie */}
          {showCategory && (
            <p className="text-[10px] md:text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.category}
            </p>
          )}

          {/* Nom du produit */}
          <h3 className="font-heading text-xs md:text-sm font-bold text-[#333] line-clamp-1 px-3 md:px-4 w-full">
            {product.name}
          </h3>

          {/* Prix adapté selon le pricing_type */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs md:text-sm font-bold text-[#333] whitespace-nowrap">
              {formatPrice(product)}
            </p>
            {/* Indication de quantité minimum si applicable */}
            {product.pricing_type === 'unit_with_minimum' && (product.min_quantity && product.min_quantity > 1) && (
              <span className="text-[10px] md:text-xs text-muted-foreground">
                min. {product.min_quantity} unités
              </span>
            )}
          </div>

          {/* Rating */}
          {showRating && product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={
                      i < Math.floor(product.rating!)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-[10px] md:text-xs text-muted-foreground">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        {/* Bouton standardisé */}
        <PrimaryCtaButton 
          href={`/produit/${product.slug}`}
          className="px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm whitespace-nowrap w-auto"
        >
          Voir
        </PrimaryCtaButton>
      </div>
    </div>
  );
}
