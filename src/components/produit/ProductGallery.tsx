"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Product } from "@/data/products";

export default function ProductGallery({ product }: { product: Product }) {
  const images = [product.image];
  const total = images.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#FAF7F2]">
        <Image
          src={images[activeIndex]}
          alt={product.name}
          fill
          className="object-contain"
          priority
        />

        {/* Flèche gauche */}
        {total > 1 && (
          <button
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-opacity hover:opacity-90"
          >
            <ChevronLeft size={20} className="text-[#2C2C2C]" />
          </button>
        )}

        {/* Flèche droite */}
        {total > 1 && (
          <button
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-opacity hover:opacity-90"
          >
            <ChevronRight size={20} className="text-[#2C2C2C]" />
          </button>
        )}

        {/* Compteur */}
        <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          {activeIndex + 1} / {total}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Vue ${i + 1}`}
            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-opacity hover:opacity-80 md:h-20 md:w-20 ${
              i === activeIndex ? "border-[#C8A96E]" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`${product.name} — vue ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
