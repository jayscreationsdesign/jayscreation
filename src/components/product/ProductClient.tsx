"use client";

import { products } from "@/data/products";
import ProductGallery from "@/components/produit/ProductGallery";
import ProductInfo from "@/components/produit/ProductInfo";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface ProductClientProps {
  slug: string;
}

export default function ProductClient({ slug }: ProductClientProps) {
  const product = products.find((p) => p.slug === slug);
  const [selectedTheme, setSelectedTheme] = useState("");
  const { addItem } = useCartStore();

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const handleAddToCart = () => {
    const prixString = typeof product.price === "string" 
      ? product.price : String(product.price)
    const prix = parseFloat(
      prixString.replace(/[^\d,]/g, "").replace(",", ".")
    ) || 0;

    addItem({
      id: `${product.id}-${Date.now()}`,
      nom: product.name,
      prix: prix,
      quantite: 1,
      image: product.image || "/images/products/placeholder.svg",
      theme: selectedTheme || undefined,
      slug: product.slug,
    });

    alert(`✅ ${product.name} ajouté au panier !`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-2">
            <ProductInfo
              product={product}
              selectedTheme={selectedTheme}
              canAddToCart={true}
              onAddToCart={handleAddToCart}
              onThemeChange={setSelectedTheme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
