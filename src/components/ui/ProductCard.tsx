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

interface ProductCardProps {
  product: Product & {
    pricing_type?: 'unit_with_minimum' | 'lot_pricing' | 'quote';
    unit_price?: number;
    min_quantity?: number;
    lots?: Array<{
      lot_price: number;
    }>;
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
}) {
  switch (product.pricing_type) {
    case 'unit_with_minimum':
      return `À partir de ${product.unit_price?.toFixed(2)}$`
    case 'lot_pricing':
      // Afficher le prix du lot le moins cher
      const cheapestLot = product.lots?.sort((a, b) => a.lot_price - b.lot_price)[0]
      return cheapestLot ? `Dès ${cheapestLot.lot_price.toFixed(2)}$` : 'Sur devis'
    case 'quote':
      return 'Sur devis'
    default:
      return product.price || 'Sur devis'
  }
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
          <div className="product-card-uniform relative h-64 w-full rounded-t-3xl overflow-hidden shadow-lg bg-[#E8D5B7]">
            <ImageCarousel
              images={allImages}
              alt={product.name}
              variant="category"
              aspectRatio={aspectRatio}
              showArrows={true}
              showDots={true}
              showThumbnails={false}
              className="w-full"
            />
          </div>
        ) : (
          <div className="product-card-uniform relative h-64 w-full overflow-hidden rounded-t-3xl shadow-lg">
            {displayImage.includes('placeholder') ? (
              <ProductImagePlaceholder productName={product.name} />
            ) : (
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105 p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ backgroundColor: '#E8D5B7' }}
                onError={handleImageError}
              />
            )}
          </div>
        )}
      </div>

      {/* CONTENU */}
      <div className="flex flex-1 flex-col items-center justify-between gap-2 p-6 text-center">
        <div className="flex flex-col items-center gap-2">
          {/* Badge "Sélection du moment" - conditionnel */}
          {(product.id === "1" || product.name?.includes("Sélection")) && (
            <div className="inline-block rounded-full bg-[#E8D4B8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8B4513] mb-2">
              Sélection du moment
            </div>
          )}
          
          {/* Catégorie */}
          {showCategory && (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.category}
            </p>
          )}

          {/* Nom du produit */}
          <h3 className="font-heading text-base font-semibold text-foreground line-clamp-2">
            {product.name}
          </h3>

          {/* Prix adapté selon le pricing_type */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-base font-bold text-jc-accent">
              {formatPrice(product)}
            </p>
            {/* Indication de quantité minimum si applicable */}
            {product.pricing_type === 'unit_with_minimum' && (product.min_quantity && product.min_quantity > 1) && (
              <span className="text-xs text-muted-foreground">
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
                    size={14}
                    className={
                      i < Math.floor(product.rating!)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        {/* Bouton standardisé */}
        <PrimaryCtaButton 
          href={`/produit/${product.slug}`}
          className="px-4 py-2 text-sm"
        >
          Voir
        </PrimaryCtaButton>
      </div>
    </div>
  );
}
