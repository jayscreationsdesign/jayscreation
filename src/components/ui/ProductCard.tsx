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
  enableMagnifier?: boolean;
}

const formatPrice = (price: string | number): string => {
  if (!price) return '';
  const priceStr = String(price);
  // Remplace $ par EUR, puis ajoute l'espace devant les symboles
  return priceStr
    .replace(/\$/g, '\u20AC')
    .replace(/(\d)¥/g, '$1 ¥')
    .replace(/(\d)\$/g, '$1 $')
    .replace(/(\d)£/g, '$1 £')
    .replace(/(\d)¢/g, '$1 ¢')
    .replace(/(\d)\u20AC/g, '$1 \u20AC')
    .replace(/(\d)¥/g, '$1 ¥')
    .replace(/\s+\u20AC/g, ' \u20AC') // évite les doubles espaces
    .trim();
};

function formatProductPrice(product: Product & {
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
    return `${formatPrice(formatPriceEUR(product.price_min))} - ${formatPrice(formatPriceEUR(product.price_max))}`;
  }
  
  // Cas 2 : prix unitaire simple
  if (product.unit_price) {
    return formatPrice(formatPriceEUR(product.unit_price));
  }
  
  // Cas 3 : prix simple (ancien champ)
  if (product.price) {
    const defaultPrice = product.price || 'Sur devis';
    const priceInEuros = defaultPrice.replace('$', '\u20AC');
    
    // Si c'est une fourchette de prix, l'afficher telle quelle
    if (priceInEuros.includes(' - ')) {
      return formatPrice(priceInEuros);
    }
    
    return formatPrice(priceInEuros);
  }
  
  // Cas 4 : pas de prix
  return 'Sur devis';
}

export default function ProductCard({ 
  product, 
  className = "",
  enableMagnifier = true
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalQty, setModalQty] = useState(1);
  
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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E0D4]/50 flex flex-col">
      
      {/* Zone image - fond beige, image centrée */}
      <div className="relative bg-[#E8DFD3] aspect-square flex items-center justify-center p-3 rounded-t-2xl overflow-hidden">
        <Link href={`/produit/${product.slug}`} className="block w-full h-full">
          {isPlaceholder ? (
            <ProductImagePlaceholder productName={product.name} />
          ) : enableMagnifier ? (
            <ImageMagnifier
              src={currentImage}
              alt={product.name}
              className="max-w-[95%] max-h-[95%] w-auto h-auto"
              maxZoom={2.5}
              minZoom={1}
              zoomStep={0.3}
            />
          ) : (
            <img
              src={currentImage}
              alt={product.name}
              className="max-w-[95%] max-h-[95%] w-auto h-auto object-cover pointer-events-none"
              draggable={false}
            />
          )}
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

        {/* Bouton APERÇU au-dessus des points */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-[#3C2415] text-xs font-semibold uppercase tracking-[1.5px] px-4 py-1.5 rounded cursor-pointer hover:bg-gray-100 transition-colors shadow-lg border border-[#E8E0D4] pointer-events-auto"
            style={{ 
              fontSize: '11px', 
              fontWeight: 600, 
              letterSpacing: '1.5px', 
              textTransform: 'uppercase'
            }}
          >
            APERÇU
          </button>
        </div>

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
      </div>

      {/* Zone info - fond blanc */}
      <div className="p-4 flex flex-col items-center text-center flex-1">
        
        {/* Catégorie */}
        <span className="text-[10px] text-[#999] uppercase tracking-[2px] font-medium mb-1">
          {product.category || ''}
        </span>
        
        {/* Nom du produit - Playfair serif élégant */}
        <Link href={`/produit/${product.slug}`} className="block mb-1.5 hover:text-[#8B4513] transition-colors cursor-pointer" style={{ 
          fontFamily: "'Playfair Display', serif",
          fontSize: '15px',
          fontWeight: 400,
          color: '#3C2415',
          textAlign: 'center',
          lineHeight: 1.3,
          letterSpacing: '0.3px'
        }}>
          {product.name}
        </Link>
        
        {/* Trait de séparation */}
        <div style={{ 
          width: '30px', 
          height: '1.5px', 
          backgroundColor: '#8B4513', 
          margin: '6px auto' 
        }} />
        
        {/* Prix */}
        <p className="text-sm font-bold text-[#333] mb-3">
          {formatProductPrice(product)}
        </p>
        
        {/* Bouton Voir */}
        <PrimaryCtaButton 
          href={`/produit/${product.slug}`} 
          className="px-4 py-2 text-xs whitespace-nowrap w-auto flex-shrink-0"
        >
          Voir
        </PrimaryCtaButton>
      </div>

      {showModal && (
  <div
    onClick={() => setShowModal(false)}
    style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ background: 'white', borderRadius: '12px', maxWidth: '700px', width: '100%', display: 'flex', overflow: 'hidden', position: 'relative', maxHeight: '90vh' }}
    >
      {/* Bouton fermer */}
      <button
        onClick={() => setShowModal(false)}
        style={{ position: 'absolute', top: '12px', right: '16px', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#3C2415', zIndex: 10 }}
      >
        ×
      </button>

      {/* Image grande */}
      <div style={{ width: '45%', flexShrink: 0 }}>
        <img
          src={product.image || '/images/products/placeholder.png'}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px' }}
        />
      </div>

      {/* Infos droite */}
      <div style={{ flex: 1, padding: '28px 24px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#3C2415', marginBottom: '8px' }}>
          {product.name}
        </h2>
        <p style={{ fontSize: '20px', color: '#C8A96E', fontWeight: 600, marginBottom: '16px' }}>
          {product.price}
        </p>
        {product.description && (
          <p style={{ fontSize: '14px', color: '#6B6B6B', lineHeight: 1.7, marginBottom: '16px', borderBottom: '1px solid #E8E0D4', paddingBottom: '16px' }}>
            {product.description}
          </p>
        )}

        {/* Catégorie */}
        {product.category && (
          <p style={{ fontSize: '12px', color: '#9a8880', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            {product.category}
          </p>
        )}

        {/* Quantité + Ajouter au panier */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D4A574', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              onClick={() => setModalQty(Math.max(1, modalQty - 1))}
              style={{ width: '36px', height: '44px', background: '#FAF7F2', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#3C2415' }}
            >-</button>
            <span style={{ width: '44px', textAlign: 'center', fontSize: '15px', color: '#3C2415', fontWeight: 500 }}>{modalQty}</span>
            <button
              onClick={() => setModalQty(modalQty + 1)}
              style={{ width: '36px', height: '44px', background: '#FAF7F2', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#3C2415' }}
            >+</button>
          </div>
          <button
            onClick={() => {
              // Simulation d'ajout au panier (à adapter avec votre logique réelle)
              console.log(`Ajout de ${modalQty} x ${product.name} au panier`);
              setShowModal(false)
            }}
            style={{ flex: 1, background: '#3C2415', color: 'white', border: 'none', borderRadius: '6px', padding: '12px 16px', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            Ajouter au panier
          </button>
        </div>

        {/* Lien fiche complète */}
        <a
          href={`/produit/${product.slug}`}
          style={{ display: 'inline-block', fontSize: '13px', color: '#C8A96E', textDecoration: 'underline', marginTop: '4px' }}
        >
          Plus de détails
        </a>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
