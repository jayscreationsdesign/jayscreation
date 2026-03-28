"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { type Product } from "@/data/products";

export default function ProductGallery({ product }: { product: Product }) {
  // Images principales : image du produit + images additionnelles si elles existent
  const images = product.images ? [product.image, ...product.images] : [product.image];
  const total = images.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale avec design amélioré et cohérent */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#F0EBE3] shadow-lg">
        <Image
          src={images[activeIndex]}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 hover:scale-105"
          style={{ objectPosition: 'center' }}
          priority
        />

        {/* Flèche gauche avec design moderne */}
        {total > 1 && (
          <button
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <ChevronLeft size={22} className="text-[#2C2C2C]" />
          </button>
        )}

        {/* Flèche droite avec design moderne */}
        {total > 1 && (
          <button
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <ChevronRight size={22} className="text-[#2C2C2C]" />
          </button>
        )}

        {/* Compteur avec design élégant */}
        <div className="absolute bottom-4 left-4 rounded-full bg-black/70 backdrop-blur-sm px-4 py-2 text-sm text-white font-medium shadow-lg">
          {activeIndex + 1} / {total}
        </div>

        {/* Icôme zoom pour indiquer qu'on peut cliquer */}
        <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg opacity-0 hover:opacity-100 transition-opacity">
          <ZoomIn size={18} className="text-[#2C2C2C]" />
        </div>
      </div>

      {/* Thumbnails avec design amélioré */}
      {total > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Vue ${i + 1}`}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all hover:scale-105 md:h-24 md:w-24 ${
                i === activeIndex 
                  ? "border-[#C8A96E] shadow-lg scale-105" 
                  : "border-gray-200 hover:border-[#C8A96E]/50"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} — vue ${i + 1}`}
                fill
                className="object-contain transition-transform duration-300 hover:scale-110"
                style={{ objectPosition: 'center' }}
              />
              {/* Indicateur actif */}
              {i === activeIndex && (
                <div className="absolute inset-0 bg-[#C8A96E]/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
