"use client";

import { type Product } from "@/data/products";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { getImageSrc, getImageArray } from "@/lib/images";
import { useState } from "react";

interface ProductCarouselProps {
  product: Product;
  className?: string;
}

export default function ProductCarousel({ product, className = "" }: ProductCarouselProps) {
  // Gestion des erreurs d'images avec fallback
  const [imageError, setImageError] = useState(false);
  const mainImage = getImageSrc(product.image);
  const fallbackImage = "/images/products/placeholder.svg";
  const images = getImageArray(product.images, mainImage);

  const handleImageError = () => {
    setImageError(true);
  };

  const displayImages = imageError ? [fallbackImage] : images;

  return (
    <div className={`product-card-uniform relative rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <ImageCarousel
        images={displayImages}
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
