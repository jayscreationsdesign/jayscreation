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
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4">
            {featured.slice(current, current + visibleCount).map((product) => (
              <div key={product.id}
                className="snap-start shrink-0 w-[80vw] md:w-auto bg-white rounded-2xl p-4 flex flex-col gap-2">
                
                {/* Image */}
                <div className="relative h-48 w-full bg-[#E8D5B7] rounded-xl overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      style={{ backgroundColor: '#E8D5B7' }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-[#E8D5B7]" />
                  )}
                </div>

                {/* Infos */}
                <div>
                  {/* Badge "Sélection du moment" - conditionnel */}
                  {(product.id === "1" || product.name?.includes("Sélection")) && (
                    <div className="inline-block rounded-full bg-[#E8D4B8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8B4513] mb-2">
                      Sélection du moment
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-sm font-semibold line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <Star size={10} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-[#8B4513] text-xs">5/5</span>
                    </div>
                  </div>
                  <p className="text-[#6B5B45] text-sm line-clamp-2 mb-3">
                    {product.description || 
                      `${product.name} personnalisé pour vos événements spéciaux. Design unique...`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#2C2C2C]">
                      {product.price}
                    </span>
                    <PrimaryCtaButton href={`/produit/${product.slug}`} className="w-full py-2 text-sm mt-auto">
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
