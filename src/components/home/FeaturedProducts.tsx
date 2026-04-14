"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { type Product } from "@/data/products";
import { products } from "@/data/products"
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton"
import { formatPriceEUR } from "@/lib/formatPrice"

function formatPrice(product: any) {
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

export function FeaturedProducts() {
  const [current, setCurrent] = useState(0)
  const featured = products.slice(0, 8)
  const visible = 4
  
  // Responsive: 1 carte sur mobile, 4 sur desktop
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 1 : 4
    }
    return 4
  }
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount())
  
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => 
    Math.min(featured.length - visibleCount, c + 1))

  return (
    <section className="py-16" style={{
      background: "linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 50%, #F5E6D3 100%)"
    }}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Titre */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-3">
            Tendances
          </h2>
          <p className="text-[#6B4423]/80 text-sm">
            Découvrez les créations les plus populaires
          </p>
        </div>

        {/* Carousel - responsive */}
        <div className="relative">
          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={prev}
              disabled={current === 0}
              className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full 
              bg-white/30 text-[#8B4513] flex items-center justify-center 
              hover:bg-white/40 hover:text-[#D4A574] transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Cards desktop */}
            <div className="grid grid-cols-4 gap-4">
              {featured.slice(current, current + visibleCount).map((product, index) => (
              <div key={product.id}
                className="bg-white rounded-2xl p-4 flex flex-col gap-2 min-w-0">
                
                {/* Image */}
                <div className="relative w-full aspect-square bg-[#FDFBF7] rounded-xl overflow-hidden flex items-center justify-center p-3">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      loading={current + index < 4 ? "eager" : "lazy"}
                      priority={current + index < 4}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/wA="
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      style={{ backgroundColor: '#FDFBF7' }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-[#FDFBF7]" />
                  )}
                </div>

                {/* Infos */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  {/* Badge "Sélection du moment" - conditionnel */}
                  {(product.id === "1" || product.name?.includes("Sélection")) && (
                    <div className="inline-block rounded-full bg-[#E8D4B8] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#8B4513] text-center">
                      Sélection du moment
                    </div>
                  )}
                  
                  {/* Nom du produit */}
                  <h3 className="text-sm font-bold text-[#333] line-clamp-2 leading-tight">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star size={8} className="fill-yellow-500 text-yellow-500 w-4 h-4" />
                    <span className="text-[#8B4513] text-xs">5/5</span>
                  </div>

                  {/* Description - cachée sur très petits écrans */}
                  <p className="text-[#6B5B45] text-xs line-clamp-2 flex-1 leading-tight">
                    {product.description || 
                      `${product.name} personnalisé pour vos événements spéciaux. Design unique...`}
                  </p>

                  {/* Prix + Bouton */}
                  <div className="flex items-center justify-between gap-2 mt-auto">
                    <span className="text-sm font-bold text-[#333] whitespace-nowrap leading-tight">
                      {formatPrice(product)}
                    </span>
                    <PrimaryCtaButton 
                      href={`/produit/${product.slug}`} 
                      className="px-4 py-2 text-xs whitespace-nowrap w-auto flex-shrink-0"
                    >
                      Voir
                    </PrimaryCtaButton>
                  </div>
                </div>
              </div>
            ))}
            </div>

            {/* Bouton next desktop */}
            <button
              onClick={next}
              disabled={current >= featured.length - visibleCount}
              className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full 
              bg-white/30 text-[#8B4513] flex items-center justify-center 
              hover:bg-white/40 hover:text-[#D4A574] transition-colors disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Version mobile - carousel horizontal scrollable */}
          <div className="lg:hidden">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 scroll-smooth">
              {featured.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-72">
                  <div className="bg-white rounded-2xl p-4 flex flex-col gap-2 h-full">
                    {/* Image */}
                    <div className="relative w-full aspect-square bg-[#FDFBF7] rounded-xl overflow-hidden flex items-center justify-center p-3">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                          style={{ backgroundColor: '#FDFBF7' }}
                        />
                      ) : (
                        <div className="w-full h-full rounded-xl bg-[#FDFBF7]" />
                      )}
                    </div>

                    {/* Infos */}
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      {/* Badge "Sélection du moment" */}
                      {(product.id === "1" || product.name?.includes("Sélection")) && (
                        <div className="inline-block rounded-full bg-[#E8D4B8] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#8B4513] text-center">
                          Sélection du moment
                        </div>
                      )}
                      
                      {/* Nom du produit */}
                      <h3 className="text-sm font-bold text-[#333] line-clamp-2 leading-tight">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star size={8} className="fill-yellow-500 text-yellow-500 w-4 h-4" />
                        <span className="text-[#8B4513] text-xs">5/5</span>
                      </div>

                      {/* Description */}
                      <p className="text-[#6B5B45] text-xs line-clamp-2 flex-1 leading-tight">
                        {product.description || 
                          `${product.name} personnalisé pour vos événements spéciaux. Design unique...`}
                      </p>

                      {/* Prix + Bouton */}
                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <span className="text-sm font-bold text-[#333] whitespace-nowrap leading-tight">
                          {formatPrice(product)}
                        </span>
                        <PrimaryCtaButton 
                          href={`/produit/${product.slug}`} 
                          className="px-4 py-2 text-xs whitespace-nowrap w-auto flex-shrink-0 min-h-[36px]"
                        >
                          Voir
                        </PrimaryCtaButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: featured.length - visibleCount + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`cursor-pointer w-2 h-2 rounded-full transition-all ${
                i === current 
                  ? "bg-[#8B4513] w-6" 
                  : "bg-[#8B4513]/30"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/boutique"
            className="cursor-pointer inline-flex items-center gap-2 
            bg-[#8B4513] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium 
            hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors text-sm sm:text-base min-h-[44px]"
          >
            Explorer les tendances
          </Link>
          <p className="text-[#6B4423]/60 text-xs sm:text-sm mt-2">
            Découvrez toutes nos créations tendance
          </p>
        </div>
      </div>
    </section>
  )
}
