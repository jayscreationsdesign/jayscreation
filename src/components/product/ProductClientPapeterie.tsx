"use client";

import { products } from "@/data/products";
import ProductGallery from "@/components/produit/ProductGallery";
import ProductInfoPapeterie from "@/components/produit/ProductInfoPapeterie";
import ProductTabsComplete from "@/components/produit/ProductTabsComplete";
import HowItWorks from "@/components/produit/HowItWorks";
import SimilarProducts from "@/components/produit/SimilarProducts";
import CustomerReviews from "@/components/produit/CustomerReviews";
import ProductBreadcrumb from "@/components/produit/ProductBreadcrumb";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { phTrackAddToCart, trackAddToCart } from "@/lib/analytics";

interface ProductClientPapeterieProps {
  slug: string;
}

export default function ProductClientPapeterie({ slug }: ProductClientPapeterieProps) {
  const product = products.find((p) => p.slug === slug);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStore();

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const handleAddToCart = (itemOrQuantity?: any) => {
    // Logique d'ajout au panier à adapter selon les besoins
    const cartItem = {
      id: `${product.slug}-${selectedTheme || "default"}`,
      nom: product.name,
      prix: 16.99, // Prix par défaut pour le kit complet
      quantite: qty,
      image: product.image || "/images/products/placeholder.png",
      theme: selectedTheme || undefined,
      slug: product.slug,
    };

    addItem(cartItem);
    
    // PostHog event
    phTrackAddToCart({
      id: cartItem.id,
      name: cartItem.nom,
      price: cartItem.prix,
      category: product.category,
      theme: selectedTheme
    });

    // Google Analytics 4 event
    trackAddToCart({
      id: cartItem.id,
      name: cartItem.nom,
      price: cartItem.prix
    }, qty);

    setQty(1);
    alert(`✅ ${product.name} ajouté au panier !`);
  };

  return (
    <div style={{ backgroundColor: '#FAF7F2' }}>
      {/* 1. BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductBreadcrumb product={product} />
      </div>

      {/* Séparateur */}
      <div style={{ backgroundColor: '#FAF7F2', height: '32px' }} />

      {/* 2. ZONE HAUTE (grid 2 colonnes) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ paddingTop: '32px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Colonne gauche : image principale + miniatures */}
          <div className="lg:col-span-1">
            <ProductGallery product={product} />
          </div>
          
          {/* Colonne droite : tous les éléments */}
          <div className="lg:col-span-1">
            <ProductInfoPapeterie 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      
      {/* 4. ONGLETS */}
      <div className="w-full">
        <ProductTabsComplete product={product} />
      </div>

      {/* 5. COMMENT ÇA MARCHE */}
      <HowItWorks product={product} />

      {/* 6. PRODUITS SIMILAIRES */}
      <SimilarProducts currentProduct={product} />

      {/* 7. AVIS CLIENTS */}
      <CustomerReviews product={product} />
    </div>
  );
}
