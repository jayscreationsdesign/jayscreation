"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { type Product } from "@/data/products";
import ImageCarousel from "./ImageCarousel";

interface ProductCardProps {
  product: Product;
  className?: string;
  showCategory?: boolean;
  showRating?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
}

export default function ProductCard({ 
  product, 
  className = "",
  showCategory = true,
  showRating = true,
  aspectRatio = "square"
}: ProductCardProps) {
  // Récupérer toutes les images : image principale + images additionnelles
  const allImages = product.images ? [product.image, ...product.images] : [product.image];
  const hasMultipleImages = allImages.length > 1;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 ${className}`}
      style={{ backgroundColor: '#fdf8ec' }}
    >
      {/* IMAGE avec carrousel conditionnel et fond #fdf8ec */}
      <div className="relative">
        {hasMultipleImages ? (
          <div className="product-card-uniform relative rounded-t-3xl overflow-hidden shadow-lg">
            <ImageCarousel
              images={allImages}
              alt={product.name}
              variant="category"
              aspectRatio={aspectRatio}
              showArrows={true}
              showDots={true}
              showThumbnails={false}
              className="w-full"
            />
          </div>
        ) : (
          <div className="product-card-uniform relative aspect-square w-full overflow-hidden rounded-t-3xl shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105 p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>

      {/* CONTENU */}
      <div className="flex flex-1 flex-col items-center justify-between gap-2 p-6 text-center">
        <div className="flex flex-col items-center gap-2">
          {/* Catégorie */}
          {showCategory && (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.category}
            </p>
          )}

          {/* Nom du produit */}
          <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2">
            {product.name}
          </h3>

          {/* Prix */}
          <p className="text-base font-bold text-accent">
            {product.price}
          </p>

          {/* Rating */}
          {showRating && product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating!)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        {/* Bouton */}
        <Link
          href={`/produit/${product.slug}`}
          className="mt-4 w-full rounded-full bg-accent px-6 py-3 text-center font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:scale-105"
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
}
