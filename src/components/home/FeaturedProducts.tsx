"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { products } from "@/data/products"

export function FeaturedProducts() {
  const [current, setCurrent] = useState(0)
  const featured = products.slice(0, 8)
  const visible = 4

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => 
    Math.min(featured.length - visible, c + 1))

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
            hover:bg-white/40 transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          <div className="flex gap-4 overflow-hidden flex-1">
            {featured.slice(current, current + visible).map((product) => (
              <div key={product.id}
                className="flex-1 min-w-0 bg-white/40 backdrop-blur-sm 
                rounded-2xl p-4 border border-white/50">
                
                {/* Image */}
                <div className="w-full aspect-square rounded-xl overflow-hidden 
                  bg-white/20 mb-4 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/30 rounded-xl" />
                  )}
                </div>

                {/* Infos */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-[#8B4513] font-semibold text-sm truncate flex-1">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <Star size={10} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-[#8B4513] text-xs">5/5</span>
                    </div>
                  </div>
                  <p className="text-[#6B4423]/70 text-xs line-clamp-2 mb-3">
                    {product.description || 
                      `${product.name} personnalisé pour vos événements spéciaux. Design unique...`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B4513] font-bold text-sm">
                      {product.price}
                    </span>
                    <Link
                      href={`/produit/${product.slug}`}
                      className="cursor-pointer bg-white/40 hover:bg-white/50 
                      text-[#8B4513] text-xs px-3 py-1.5 rounded-full 
                      transition-colors border border-white/60"
                    >
                      Voir
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bouton next */}
          <button
            onClick={next}
            disabled={current >= featured.length - visible}
            className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full 
            bg-white/30 text-[#8B4513] flex items-center justify-center 
            hover:bg-white/40 transition-colors disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: featured.length - visible + 1 }).map((_, i) => (
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
            hover:bg-[#6B3410] transition-colors"
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
