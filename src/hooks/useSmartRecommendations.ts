"use client";

import { useCartStore } from "@/store/cartStore";
import { getRelatedProducts, getRecommendationInfo } from "@/lib/smartRecommendations";
import type { Product as LocalProduct } from "@/data/products";
import type { Product as SupabaseProduct } from "@/types/product";

type UnifiedProduct = LocalProduct | SupabaseProduct;

export function useSmartRecommendations(
  currentProduct: UnifiedProduct,
  allProducts: UnifiedProduct[]
) {
  const { items } = useCartStore();
  
  const relatedProducts = getRelatedProducts(currentProduct, items, allProducts);
  const { title, subtitle } = getRecommendationInfo(currentProduct, items, relatedProducts);
  
  return {
    relatedProducts,
    title,
    subtitle,
    hasRecommendations: relatedProducts.length > 0,
    cartItemCount: items.length
  };
}
