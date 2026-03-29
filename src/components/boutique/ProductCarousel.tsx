"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Product } from "@/data/products";

interface ProductCarouselProps {
  product: Product;
  className?: string;
}

export default function ProductCarousel({ product, className = "" }: ProductCarouselProps) {
  // Récupérer toutes les images : image principale + images additionnelles
  const images = product.images ? [product.image, ...product.images] : [product.image];
  const total = images.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  // Si une seule image, afficher simplement l'image
  if (total === 1) {
    return (
      <div className={`relative aspect-square w-full overflow-hidden rounded-xl border border-gray-200 ${className}`}>
        <Image
          src={images[0]}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Conteneur minimaliste */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-200">
        <Image
          src={images[activeIndex]}
          alt={`${product.name} — vue ${activeIndex + 1}`}
          fill
          className="object-contain"
        />

        {/* Flèche gauche - style unifié */}
        {total > 1 && (
          <button
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border-2 border-gray-200 transition-all duration-300 hover:bg-[#c8a96e] hover:scale-110 hover:shadow-xl"
          >
            <ChevronLeft size={18} className="text-gray-600 transition-colors group-hover:text-white" />
          </button>
        )}

        {/* Flèche droite - style unifié */}
        {total > 1 && (
          <button
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border-2 border-gray-200 transition-all duration-300 hover:bg-[#c8a96e] hover:scale-110 hover:shadow-xl"
          >
            <ChevronRight size={18} className="text-gray-600 transition-colors group-hover:text-white" />
          </button>
        )}

        {/* Indicateurs simples */}
        {total > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === activeIndex
                    ? "bg-gray-800 w-6"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
