"use client";

import RelatedProductsCarousel from "@/components/product/RelatedProductsCarousel";
import type { Product as LocalProduct } from "@/data/products";
import type { Product as SupabaseProduct } from "@/types/product";

type UnifiedProduct = LocalProduct | SupabaseProduct;

interface RelatedProductsWrapperProps {
  currentProduct: UnifiedProduct;
}

export default function RelatedProductsWrapper({ currentProduct }: RelatedProductsWrapperProps) {
  return <RelatedProductsCarousel currentProduct={currentProduct} />;
}
