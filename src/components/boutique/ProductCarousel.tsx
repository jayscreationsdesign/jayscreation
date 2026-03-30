"use client";

import { type Product } from "@/data/products";
import ImageCarousel from "@/components/ui/ImageCarousel";

interface ProductCarouselProps {
  product: Product;
  className?: string;
}

export default function ProductCarousel({ product, className = "" }: ProductCarouselProps) {
  // Récupérer toutes les images : image principale + images additionnelles
  const images = product.images ? [product.image, ...product.images] : [product.image];

  return (
    <div className={`product-card-uniform relative rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <ImageCarousel
        images={images}
        alt={product.name}
        variant="category"
        className="w-full"
        aspectRatio="square"
        showArrows={true}
        showDots={true}
        showThumbnails={false}
      />
    </div>
  );
}
