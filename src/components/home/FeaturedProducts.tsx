"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { products } from "@/data/products"
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton"

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
          <h2 className="text-4xl font-bold text-[#8B4513] mb-3">
            ✦ Tendances ✦
          </h2>
          <p className="text-[#6B4423]/80 text-sm">
            Découvrez les créations les plus populaires du moment
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center gap-4">
          
          {/* Bouton prev */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full 
            bg-white/30 text-[#8B4513] flex items-center justify-center 
            hover:bg-white/40 hover:text-[#D4A574] transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-3 md:px-4">
            {featured.slice(current, current + visibleCount).map((product) => (
              <div key={product.id}
                className="snap-start shrink-0 w-[70vw] xs:w-[75vw] sm:w-[80vw] md:w-full bg-white rounded-xl md:rounded-2xl p-2.5 xs:p-3 md:p-4 flex flex-col gap-2 min-w-0">
                
                {/* Image */}
                <div className="relative w-full aspect-square bg-[#FDFBF7] rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center p-1.5 xs:p-2 md:p-3">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[80%] max-h-[80%] xs:max-w-[85%] xs:max-h-[85%] md:max-w-full md:max-h-full w-auto h-auto object-contain"
                      style={{ backgroundColor: '#FDFBF7' }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg md:rounded-xl bg-[#FDFBF7]" />
                  )}
                </div>

                {/* Infos */}
                <div className="flex flex-col gap-1.5 md:gap-2 flex-1 min-w-0">
                  {/* Badge "Sélection du moment" - conditionnel */}
                  {(product.id === "1" || product.name?.includes("Sélection")) && (
                    <div className="inline-block rounded-full bg-[#E8D4B8] px-1.5 py-0.5 xs:px-2 md:px-3 py-0.5 md:py-1 text-[9px] xs:text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#8B4513] text-center">
                      Sélection du moment
                    </div>
                  )}
                  
                  {/* Nom du produit */}
                  <h3 className="text-[10px] xs:text-xs md:text-sm font-bold text-[#333] line-clamp-2 leading-tight">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star size={8} className="fill-yellow-500 text-yellow-500 w-3 h-3 xs:w-4 xs:h-4" />
                    <span className="text-[#8B4513] text-[9px] xs:text-[10px] md:text-xs">5/5</span>
                  </div>

                  {/* Description - cachée sur très petits écrans */}
                  <p className="text-[#6B5B45] text-[9px] xs:text-[10px] md:text-xs line-clamp-2 hidden xs:block flex-1 leading-tight">
                    {product.description || 
                      `${product.name} personnalisé pour vos événements spéciaux. Design unique...`}
                  </p>

                  {/* Prix + Bouton */}
                  <div className="flex items-center justify-between gap-1.5 md:gap-2 mt-auto">
                    <span className="text-[10px] xs:text-xs md:text-sm font-bold text-[#333] whitespace-nowrap leading-tight">
                      {product.price}
                    </span>
                    <PrimaryCtaButton 
                      href={`/produit/${product.slug}`} 
                      className="px-2 py-1 xs:px-3 py-1.5 md:px-4 md:py-2 text-[9px] xs:text-[10px] md:text-xs bg-[#8B6F47] text-white rounded-full whitespace-nowrap w-auto flex-shrink-0"
                    >
                      Voir
                    </PrimaryCtaButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bouton next */}
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
        <div className="text-center mt-8">
          <Link
            href="/boutique"
            className="cursor-pointer inline-flex items-center gap-2 
            bg-[#8B4513] text-white px-8 py-4 rounded-full font-medium 
            hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
          >
            Explorer les tendances →
          </Link>
          <p className="text-[#6B4423]/60 text-xs mt-2">
            Découvrez toutes nos créations tendance
          </p>
        </div>
      </div>
    </section>
  )
}
