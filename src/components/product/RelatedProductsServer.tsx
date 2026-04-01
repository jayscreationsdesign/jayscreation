"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/products";
import RelatedProductsCarousel from "@/components/product/RelatedProductsCarousel";
import type { Product as SupabaseProduct } from "@/types/product";

interface RelatedProductsServerProps {
  currentProduct: SupabaseProduct;
}

export default function RelatedProductsServer({ currentProduct }: RelatedProductsServerProps) {
  const [allProducts, setAllProducts] = useState<SupabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-[#FAF7F2]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <RelatedProductsCarousel currentProduct={currentProduct} allProducts={allProducts} />;
}
