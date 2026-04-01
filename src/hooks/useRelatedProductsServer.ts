"use client";

import { useCartStore } from "@/store/cartStore";
import { getRelatedProducts, getRecommendationTitle } from "@/lib/recommendations";
import type { Product as LocalProduct } from "@/data/products";
import type { Product as SupabaseProduct } from "@/types/product";

type UnifiedProduct = LocalProduct | SupabaseProduct;

export function useRelatedProductsServer(currentProduct: UnifiedProduct) {
  const { items } = useCartStore();
  
  // Utiliser la logique de recommandation avec le panier
  const relatedProducts = getRelatedProducts(currentProduct, items);
  
  // Obtenir le titre dynamique selon le contexte
  const { title, subtitle } = getRecommendationTitle(currentProduct, items);
  
  return {
    relatedProducts,
    title,
    subtitle
  };
}
