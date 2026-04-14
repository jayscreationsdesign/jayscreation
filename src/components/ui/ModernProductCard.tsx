"use client"

import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { type Product } from "@/data/products"
import { formatPriceEUR } from "@/lib/formatPrice"
import { getImageSrc, getImageArray } from "@/lib/images"
import ProductImagePlaceholder from "@/components/products/ProductImagePlaceholder"
import { phTrackAddToCart } from "@/lib/analytics"

interface ModernProductCardProps {
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
  enableMagnifier?: boolean;
  onAddToCart?: (product: any) => void;
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
    const priceInEuros = defaultPrice.replace('$', 'â');
    
    // Si c'est une fourchette de prix, l'afficher telle quelle
    if (priceInEuros.includes(' - ')) {
      return priceInEuros;
    }
    
    return priceInEuros;
  }
  
  // Cas 4 : pas de prix
  return 'Sur devis';
}

function getPriceNumber(product: any): number {
  if (product.unit_price) return product.unit_price;
  if (product.price_min) return product.price_min;
  if (product.price && typeof product.price === 'string') {
    const priceStr = product.price.replace(/[^\d,]/g, '').replace(',', '.');
    const parsed = parseFloat(priceStr);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export function ModernProductCard({
  product,
  className = "",
  enableMagnifier = false,
  onAddToCart,
}: ModernProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Vérifier si le produit utilise un placeholder
  const isPlaceholder = !product.image || product.image.includes('placeholder') || product.image.trim() === '';
  const mainImage = getImageSrc(product.image);
  const images = getImageArray(product.images, mainImage);
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex];
  const priceNumber = getPriceNumber(product);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    setIsAdding(true)
    
    // Track PostHog event
    phTrackAddToCart({
      id: product.slug,
      name: product.name,
      price: priceNumber,
      category: product.category,
      theme: null
    })
    
    // Call parent callback if provided
    onAddToCart?.(product)
    
    setTimeout(() => setIsAdding(false), 600)
  }

  return (
    <article
      className={`group relative w-full max-w-sm overflow-hidden rounded-2xl bg-[#FFF8F0] shadow-lg transition-all duration-500 hover:shadow-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge artisanal */}
      <div className="absolute left-4 top-4 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8B4513]/90 px-3 py-1 text-xs font-medium tracking-wide text-[#FFF8F0] backdrop-blur-sm">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Artisanal
        </span>
      </div>

      {/* Image container */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/produit/${product.slug}`} className="block w-full h-full">
          {isPlaceholder ? (
            <div className="w-full h-full flex items-center justify-center">
              <ProductImagePlaceholder productName={product.name} />
            </div>
          ) : (
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 384px"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
        
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
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 md:p-6">
        {/* Catégorie */}
        <span className="text-[10px] text-[#8B4513]/50 uppercase tracking-[2px] font-medium">
          {product.category || ''}
        </span>

        <Link href={`/produit/${product.slug}`} className="block">
          <h3 className="text-lg font-semibold tracking-tight text-[#8B4513] md:text-xl hover:text-[#6B3410] transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-[#8B4513]/70">
            {product.description}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-[#8B4513]/50">
              Prix
            </span>
            <span className="text-2xl font-bold text-orange-500 md:text-3xl">
              {formatPrice(product)}
            </span>
          </div>

          {priceNumber > 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#FFF8F0] transition-all duration-300 md:px-5 md:py-3.5 ${
                isAdding
                  ? "bg-green-600"
                  : "bg-[#8B4513] hover:bg-[#6B3410] hover:shadow-lg active:scale-95"
              }`}
            >
              <ShoppingBag className={`h-4 w-4 transition-transform duration-300 ${isAdding ? "scale-110" : ""}`} />
              <span className="hidden sm:inline">
                {isAdding ? "Ajouté !" : "Ajouter au panier"}
              </span>
              <span className="sm:hidden">
                {isAdding ? "Ajouté !" : "Ajouter"}
              </span>
            </button>
          ) : (
            <Link href={`/produit/${product.slug}`}>
              <button className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#8B4513] border border-[#8B4513] hover:bg-[#8B4513] hover:text-[#FFF8F0] transition-all duration-300 md:px-5 md:py-3.5">
                <span className="hidden sm:inline">Demander un devis</span>
                <span className="sm:hidden">Devis</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#8B4513]/5 transition-transform duration-500 group-hover:scale-150" />
    </article>
  )
}
