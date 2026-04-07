"use client";

import type { Product } from "@/types/product";
import Image from "next/image";
import { getImageSrc, getImageArray } from "@/lib/images";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addItem } = useCartStore();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [qty, setQty] = useState(1);

  // DEBUG COMPLET
  console.log("=== DEBUG COMPLET PRODUIT SUPABASE ===");
  console.log("Produit complet:", product);
  console.log("product.themes:", product.themes);
  console.log("Type de product.themes:", typeof product.themes);
  console.log("Array.isArray(product.themes):", Array.isArray(product.themes));
  console.log("product.themes.length:", product.themes?.length);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  // Logique simplifiée pour la validation du thème
  const hasThemes = Array.isArray(product.themes) && product.themes.length > 0;
  const shouldRequireTheme = hasThemes;
  const canAddToCart = !shouldRequireTheme || selectedTheme.trim() !== "";

  // DEBUG LOGIQUE
  console.log("Logique de validation:");
  console.log("- hasThemes:", hasThemes);
  console.log("- shouldRequireTheme:", shouldRequireTheme);
  console.log("- selectedTheme:", selectedTheme);
  console.log("- selectedTheme.trim():", selectedTheme.trim());
  console.log("- canAddToCart:", canAddToCart);

  // Fonction pour ajouter au panier
  const handleAddToCart = () => {
    console.log("Tentative d'ajout au panier avec:", {
      selectedTheme,
      canAddToCart,
      qty
    });
    
    const cartItem = {
      id: `${product.id}-${selectedTheme || 'default'}-${Date.now()}`,
      nom: product.nom,
      prix: product.prix,
      quantite: qty,
      image: getImageSrc(product.image_principale) || "/images/products/placeholder.png",
      theme: selectedTheme || undefined,
      slug: product.slug,
    };
    
    console.log("Article ajouté au panier:", cartItem);
    addItem(cartItem);
  };

  const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "outline" | "destructive" }) => {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
    const variantClasses = {
      default: "bg-blue-100 text-blue-800",
      secondary: "bg-gray-100 text-gray-800",
      outline: "border border-gray-300 text-gray-700 bg-white",
      destructive: "bg-red-100 text-red-800",
    };
    
    return (
      <span className={`${baseClasses} ${variantClasses[variant]}`}>
        {children}
      </span>
    );
  };

  // Gestion des erreurs d'images avec fallback
  const [imageError, setImageError] = useState(false);
  const mainImage = getImageSrc(product.image_principale);
  const fallbackImage = "/images/products/placeholder.png";
  const productImages = getImageArray(product.images, mainImage);

  const handleImageError = () => {
    setImageError(true);
  };

  const displayMainImage = imageError ? fallbackImage : mainImage;
  const displayGalleryImages = imageError ? [fallbackImage] : productImages;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* En-tête produit */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image principale */}
          <div className="space-y-4">
            {displayMainImage && (
              <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200">
                <Image
                  src={displayMainImage}
                  alt={product.nom}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={handleImageError}
                />
              </div>
            )}
            
            {/* Galerie d'images */}
            {displayGalleryImages && displayGalleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {displayGalleryImages.slice(1).map((image, index) => (
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200">
                    <Image
                      src={image}
                      alt={`${product.nom} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 10vw"
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.nom}
            </h1>
              
              {/* Catégories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.categorie && (
                  <Badge variant="secondary">{product.categorie}</Badge>
                )}
                {product.sous_categorie && (
                  <Badge variant="outline">{product.sous_categorie}</Badge>
                )}
              </div>

              {/* Prix */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(product.prix)}
                </span>
                {product.prix_promo && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.prix_promo)}
                    </span>
                    <Badge variant="destructive">Promo</Badge>
                  </div>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">
                  Stock: {product.stock}
                </span>
                {product.stock > 0 ? (
                  <Badge variant="default">Disponible</Badge>
                ) : (
                  <Badge variant="destructive">Rupture</Badge>
                )}
              </div>

              {/* Section thème - AU DESSUS DE PERSONNALISATION */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Choisissez votre thème</h3>
                <div className="bg-[#FAF7F2] rounded-lg p-4 border border-[#8B4513]">
                  <select 
                    className="w-full p-3 border border-[#E8E4DF] rounded-lg text-[#2C2C2C]"
                    value={selectedTheme}
                    onChange={(e) => {
                      console.log("Changement de thème:", e.target.value);
                      setSelectedTheme(e.target.value);
                    }}
                  >
                    <option value="">Sélectionner un thème...</option>
                    <option value="mariage">Mariage</option>
                    <option value="bapteme">Baptême</option>
                    <option value="anniversaire">Anniversaire</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="ramadan-eid">Ramadan/Eid</option>
                    <option value="communion">Communion</option>
                    <option value="naissance">Naissance</option>
                    <option value="noel">Noël</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-[#6B6B6B]">
                  Choisissez le style qui correspond le mieux à votre événement
                </p>
              </div>

              {/* Personnalisation */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.personnalisable && (
                  <Badge variant="secondary">Personnalisable</Badge>
                )}
                {product.requires_theme && (
                  <Badge variant="outline">Nécessite un thème</Badge>
                )}
              </div>

              {/* Thèmes */}
              {product.themes && product.themes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Thèmes disponibles:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.themes.map((theme, index) => (
                      <Badge key={index} variant="outline">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {/* Quantité et bouton ajouter au panier */}
            {product.stock > 0 && (
              <div className="mt-6 space-y-4">
                {/* Quantité */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Quantité :</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Bouton ajouter au panier standardisé */}
                <PrimaryCtaButton onClick={handleAddToCart} disabled={!canAddToCart}>
                  <ShoppingBag size={18} />
                  Ajouter au panier
                </PrimaryCtaButton>

                {/* Message d'aide si thème requis */}
                {shouldRequireTheme && !canAddToCart && (
                  <p className="text-sm text-amber-600 text-center">
                    Veuillez sélectionner un thème avant d'ajouter au panier
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
