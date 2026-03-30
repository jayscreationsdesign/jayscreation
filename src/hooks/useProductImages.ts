import { useMemo } from "react";
import { type Product } from "@/data/products";

/**
 * Hook utilitaire pour gérer les images des produits
 * Retourne toutes les images et détecte si le produit a plusieurs images
 */
export function useProductImages(product: Product) {
  const { allImages, hasMultipleImages, imageCount } = useMemo(() => {
    // Combiner l'image principale avec les images additionnelles
    const allImages = product.images ? [product.image, ...product.images] : [product.image];
    const hasMultipleImages = allImages.length > 1;
    const imageCount = allImages.length;

    return {
      allImages,
      hasMultipleImages,
      imageCount
    };
  }, [product.image, product.images]);

  return {
    images: allImages,
    hasMultipleImages,
    count: imageCount
  };
}

/**
 * Hook pour générer les alt textes accessibles
 */
export function useImageAltText(product: Product, index: number, total: number) {
  return useMemo(() => {
    if (total === 1) {
      return product.name;
    }
    return `${product.name} — vue ${index + 1} sur ${total}`;
  }, [product.name, index, total]);
}

/**
 * Hook pour les attributs ARIA du carrousel
 */
export function useCarouselAria(product: Product, currentIndex: number, total: number) {
  const productId = product.slug.replace(/[^a-zA-Z0-9]/g, '-');
  
  return {
    carouselId: `carousel-${productId}`,
    regionLabel: `Carrousel d'images pour ${product.name}`,
    slideLabel: (index: number) => `Image ${index + 1} sur ${total} pour ${product.name}`,
    currentSlideLabel: `Image actuelle : ${currentIndex + 1} sur ${total}`
  };
}
