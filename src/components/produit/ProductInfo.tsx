"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Check, Star } from "lucide-react";
import { type Product } from "@/data/products";
import ProductAccordions from "./ProductAccordions";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import { ThemeSelector } from '@/components/product/ThemeSelector';
import ProductPricing from "@/components/products/pricing/ProductPricing";
import { THEME_CATEGORIES } from '@/config/themes';
import { getUnitPrice, type PricingTier } from "@/types/pricing";

interface ProductInfoProps {
  product: any;
  selectedTheme?: string;
  canAddToCart?: boolean;
  onAddToCart?: (quantity?: number) => void;
  onThemeChange?: (theme: string) => void;
  qty: number;
  onQtyChange: (qty: number) => void;
}

// ── Thèmes disponibles ────────────────────────────────────────────────────────
const THEMES = [
  { id: "mariage", label: "Mariage", color: "#F8E7E7" },
  { id: "bapteme", label: "Baptême", color: "#E7EEF8" },
  { id: "anniversaire", label: "Anniversaire", color: "#F8F3E7" },
  { id: "baby-shower", label: "Baby Shower", color: "#E7F8F0" },
];

// ── Avantages (boîte mise en valeur) ─────────────────────────────────────────
const AVANTAGES = [
  "Livraison gratuite",
  "Garantie de 30 jours",
  "Modifications illimitées",
  "Maquette sous 24h",
  "Offres exclusives",
  "Remises sur volume",
];

function parsePrice(product: Product): { display: string; isSurDevis: boolean } {
  if (product.price === "Sur devis") return { display: "Sur devis", isSurDevis: true };
  if (product.price.includes(" - ")) {
    return { display: `À partir de ${product.price.split(" - ")[0]}`, isSurDevis: false };
  }
  return { display: product.price, isSurDevis: false };
}

function getThemeLabel(themeId: string): string {
  // Retourner une version capitalisée du thème
  return themeId.charAt(0).toUpperCase() + themeId.slice(1).replace(/-/g, ' ');
}

function calculateTotalPrice(product: any, quantity: number): string {
  // Pour l'instant, calcul simple basé sur le prix du produit
  if (product.price === "Sur devis") return "Sur devis";
  
  let basePrice = 0;
  if (typeof product.price === 'string') {
    // Extraire le prix numérique
    const priceMatch = product.price.match(/[\d,.]+/);
    if (priceMatch) {
      basePrice = parseFloat(priceMatch[0].replace(',', '.'));
    }
  } else if (typeof product.price === 'number') {
    basePrice = product.price;
  }
  
  const total = basePrice * quantity;
  return `${total.toFixed(2).replace('.', ',')} TTC`;
}

function CheckBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#8B4513]">
        <Check size={9} className="text-white" strokeWidth={3} />
      </div>
      <span className="text-sm text-[#6B6B6B]">{label}</span>
    </div>
  );
}

// Fonction pour extraire le prix unitaire du produit
function getUnitPriceFromProduct(product: any): number {
  if (typeof product.price === 'number') {
    return product.price;
  }
  
  if (typeof product.price === 'string') {
    // Extraire le prix numérique d'une chaîne comme "3,90" ou "3.90"
    const priceMatch = product.price.match(/[\d,.]+/);
    if (priceMatch) {
      return parseFloat(priceMatch[0].replace(',', '.'));
    }
  }
  
  // Fallback sur numericPrice si disponible
  if (product.numericPrice) {
    return product.numericPrice;
  }
  
  return 0;
}

export default function ProductInfo({ product, selectedTheme, canAddToCart = true, onAddToCart, onThemeChange, qty, onQtyChange }: ProductInfoProps) {
  const [purchaseType, setPurchaseType] = useState<"commande" | "devis">("commande");

  const { display, isSurDevis } = parsePrice(product);
  
  // Extraire le prix unitaire correct
  const productUnitPrice = getUnitPriceFromProduct(product);

  // Fonction utilitaire pour les quantités minimales basée sur les slugs
  function getMinQuantityForSlug(slug: string): number {
    switch (slug) {
      case 'boites-pop-corn-personnalisees':
        return 6
      case 'kinder-maxi-personnalise':
        return 6
      case 'capri-sun-personnalise':
        return 6
      case 'carte-de-remmerciement-personnalisee':
        return 20
      case 'etiquette-bouteille-eau-personnalisee':
        return 6
      case 'flacon-bulle-savon-personnalise':
        return 6
      case 'paquet-chips-personnalise':
        return 6
      case 'pringles-personnalise':
        return 6
      case 'sac-cadeau-personnalise':
        return 6
      case 'sachet-bonbon-personnalise':
        return 6
      case 'haribo-dragibus-personnalise':
        return 6
      case 'mms-personnalise':
        return 6
      case 'box-pyramide':
        return 10
      case 'cone-friandise-personnalise':
        return 6
      default:
        return 1
    }
  }

  // Utiliser la fonction pour obtenir le minimum, avec fallback sur le nom pour Kinder Maxi
  let minQuantity = getMinQuantityForSlug(product.slug)
  
  // Forcer certains produits à leur minimum spécifique
  if (product.name.includes('Kinder Maxi') || product.name.includes('Capri-Sun') || product.name.includes('Étiquette Capri-Sun') || product.name.includes('Étiquette Bouteille d\'Eau') || product.name.includes('Tube bulles de savon personnalisé') || product.name.includes('Sachet de Bonbons Personnalisé') || product.name.includes('Haribo Dragibus') || product.name.includes('M&Ms')) {
    minQuantity = 6
  } else if (product.name.includes('Pringles Personnalisé')) {
    minQuantity = 5
  } else if (product.name.includes('Carte de Remerciement')) {
    minQuantity = 20
  }
  
  const [quantity, setQuantity] = useState<number>(minQuantity)

  // Debug temporaire pour vérifier
  console.log('DEBUG - Slug:', product.slug, 'Name:', product.name, 'MinQuantity:', minQuantity, 'Quantity:', quantity)
  console.log('DEBUG - Input value should be:', String(quantity || minQuantity))
  
  const handleDecrement = () => {
    setQuantity(q => (q <= minQuantity ? minQuantity : q - 1))
  }
  
  const handleIncrement = () => {
    setQuantity(q => q + 1)
  }

  // Calculer le prix unitaire en fonction de la quantité et des paliers
  const unitPrice = product.pricing 
    ? getUnitPrice(quantity, product.pricing)
    : (product.numericPrice || parseFloat(product.price.replace(/[^\d,]/g, "").replace(",", ".")) || 0);

  const total = unitPrice * quantity;

  
  return (
    <div>
      {/* ── 1. Titre ───────────────────────────────────── */}
      <h1 className="font-heading text-3xl font-bold leading-tight text-[#2C2C2C] md:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      {/* ── 2. Description SEO optimisée ─────────────────────────── */}
      <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B]" style={{ textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>
        {product.description ?? 
          `Papeterie artisanale 100% personnalisée pour mariage, baptême, anniversaire — thème, couleurs et texte sur-mesure. Créations uniques avec finitions dorées et qualité premium. Livraison offerte dès 50€ d'achat. Personnalisation illimitée jusqu'à validation. Commandez votre ${product.name} personnalisé dès maintenant pour sublimer votre événement !`
        }
      </p>

      {/* ── 3. Étoiles + avis ──────────────────────────── */}
      {product.rating && (
        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                strokeWidth={1.5}
                className={
                  i < Math.round(product.rating!)
                    ? "fill-[#8B4513] text-[#8B4513]"
                    : "fill-transparent text-[#8B4513]"
                }
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-[#2C2C2C]">
            {(product.reviewCount ?? 124).toLocaleString("fr-FR")} avis
          </span>
        </div>
      )}

      {/* ── 4. Badges de confiance ───────────────────────────── */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#8B4513]">
            <Check size={8} className="text-[#8B4513]" strokeWidth={3} />
          </div>
          <span className="text-base text-[#6B6B6B]">À partir de 1€/pièce</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#8B4513]">
            <Check size={8} className="text-[#8B4513]" strokeWidth={3} />
          </div>
          <span className="text-base text-[#6B6B6B]">Livraison offerte dès 50€</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#8B4513]">
              <Check size={8} className="text-[#8B4513]" strokeWidth={3} />
            </div>
            <span className="text-base text-[#6B6B6B]">Modifications jusqu'à validation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#8B4513]">
              <Check size={8} className="text-[#8B4513]" strokeWidth={3} />
            </div>
            <span className="text-base text-[#6B6B6B]">Personnalisation incluse</span>
          </div>
        </div>
      </div>

      {/* ── 6. Section thème ─────────────────────────────────────── */}
      {product.themes && product.themes.length > 0 && (
        <div className="mt-8">
          <div className="text-base font-semibold text-[#2C2C2C] flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#8B4513] rounded-full" />
            </div>
            Choisissez votre thème
          </div>
          <ThemeSelector
            value={selectedTheme}
            onChange={(value: string | null) => onThemeChange?.(value || "")}
            categories={THEME_CATEGORIES}
            label=""
            placeholder=" Sélectionnez un thème..."
          />
          {!selectedTheme && (
            <p className="text-sm text-amber-700 mt-1">
              Veuillez sélectionner un thème pour continuer
            </p>
          )}
        </div>
      )}

      {/* ── 7. Thème sélectionné (affichage seulement) ─────────────── */}
      {selectedTheme && (
        <div className="mt-8">
          <div className="p-4 bg-white rounded-lg border border-[#8B4513]/30">
            <p className="text-sm text-[#2C2C2C]">
              <span className="font-medium">Thème sélectionné :</span> {getThemeLabel(selectedTheme)}
            </p>
            <span className="text-base text-[#6B6B6B] mt-1">
              Ce thème sera appliqué à votre "{product.name}" personnalisé.
            </span>
          </div>
        </div>
      )}

      {/*  7. Badge Les plus populaires */}
      <div className="mt-8 rounded-2xl border-2 border-[#8B4513] bg-[#FAF7F2] p-4 sm:p-5">
        {/* Badge "LES PLUS POPULAIRES" */}
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="inline-block rounded-full bg-[#8B4513] px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white">
            Les plus populaires
          </span>
          <span className="text-xs sm:text-sm font-medium text-[#8B4513]">Sur-mesure</span>
        </div>

        {/* Titre offre */}
        <div className="mb-1 flex items-center gap-2 sm:gap-3">
          <div className="flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full border-2 border-[#8B4513]">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#8B4513]" />
          </div>
          <p className="text-sm sm:text-base font-bold text-[#2C2C2C]">Personnalisez et économisez</p>
        </div>

        {/* Prix */}
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-baseline sm:gap-3 gap-1">
          <span className="text-lg sm:text-2xl font-bold text-[#2C2C2C]">
            2,50€ / unité
          </span>
          <span className="text-xs sm:text-sm text-[#6B6B6B]">min. {minQuantity} pièces</span>
        </div>

        {/* Avantages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#8B4513]">
              <Check size={8} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-xs sm:text-base text-[#6B6B6B]">Livraison gratuite</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#8B4513]">
              <Check size={8} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-xs sm:text-base text-[#6B6B6B]">Garantie de 30 jours</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#8B4513]">
              <Check size={8} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-xs sm:text-base text-[#6B6B6B]">Modifications illimitées</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#8B4513]">
              <Check size={8} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-xs sm:text-base text-[#6B6B6B]">Maquette sous 24h</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#8B4513]">
              <Check size={8} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-xs sm:text-base text-[#6B6B6B]">Offres exclusives</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#8B4513]">
              <Check size={8} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-xs sm:text-base text-[#6B6B6B]">Remises sur volume</span>
          </div>
        </div>
      </div>

      {/*  8. Section Prix */}
      <div className="mt-8">
        <ProductPricing
          product={{
            name: product.name,
            slug: product.slug,
            pricingType: product.pricing_type === 'lot_pricing' ? 'lot_pricing' : 
                        product.price === "Sur devis" ? 'quote' : 'unit_with_minimum',
            unitPrice: productUnitPrice,
            minQuantity: minQuantity,
            maxQuantity: product.maxQuantity || 999,
            quantityStep: 1,
            lots: product.pricing?.tiers && product.pricing.tiers.length > 0 ? product.pricing.tiers.map((tier: any, index: number) => {
              const savingsPercent = Math.round(((productUnitPrice - tier.pricePerUnit) / productUnitPrice) * 100);
              
              return {
                id: `tier-${tier.min}`,
                lotName: `${tier.min} unités`,
                quantity: tier.min,
                lotPrice: tier.pricePerUnit * tier.min,
                unitPriceInLot: tier.pricePerUnit,
                savingsPercent: savingsPercent,
                isPopular: index === 1 // Le deuxième palier est populaire
              };
            }) : undefined
          }}
          selectedTheme={selectedTheme}
          onAddToCart={(item: any) => {
            // Logique d'ajout au panier
            console.log('Ajout au panier:', item)
          }}
        />
      </div>

      
      {/*  7. Option d'achat (radio) */}
      <div className="mt-3">
        <label
          className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 px-5 py-4 transition-all ${
            purchaseType === "commande"
              ? "border-[#8B4513] bg-white"
              : "border-[#E8E4DF] bg-white hover:border-[#8B4513]/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                purchaseType === "commande"
                  ? "border-[#8B4513]"
                  : "border-[#E8E4DF]"
              }`}
            >
              {purchaseType === "commande" && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#8B4513]" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2C2C2C]">
                Commande personnalisée unique
              </p>
              <p className="text-sm text-[#6B6B6B]">{product.name}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-[#2C2C2C]">{display}</span>
          <input
            type="radio"
            className="sr-only"
            checked={purchaseType === "commande"}
            onChange={() => setPurchaseType("commande")}
          />
        </label>
      </div>

      
      {/* ── 9. Réassurance ─────────────────────────────────────── */}
      <p className="mt-3 text-center text-sm text-[#6B6B6B]">
        Livraison en 15-25 jours ouvrés * Paiement sécurisé
      </p>

      {/* ── Séparateur ─────────────────────────────────────────── */}
      <div className="my-8 border-b border-[#E8E4DF]" />

      {/* ── 10. Accordéons ─────────────────────────────────────── */}
      <ProductAccordions product={product} />
    </div>
  );
}
