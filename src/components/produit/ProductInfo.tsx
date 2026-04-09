"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Check, Star } from "lucide-react";
import { type Product } from "@/data/products";
import ProductAccordions from "./ProductAccordions";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import ThemeDropdown from "@/components/products/ThemeDropdown";
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

function CheckBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#8B4513]">
        <Check size={9} className="text-white" strokeWidth={3} />
      </div>
      <span className="text-xs text-[#6B6B6B]">{label}</span>
    </div>
  );
}

export default function ProductInfo({ product, selectedTheme, canAddToCart = true, onAddToCart, onThemeChange, qty, onQtyChange }: ProductInfoProps) {
  const [purchaseType, setPurchaseType] = useState<"commande" | "devis">("commande");

  const { display, isSurDevis } = parsePrice(product);

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
          <span className="text-xs font-semibold text-[#2C2C2C]">
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
          <span className="text-xs text-[#6B6B6B]">À partir de 1€/pièce</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#8B4513]">
            <Check size={8} className="text-[#8B4513]" strokeWidth={3} />
          </div>
          <span className="text-xs text-[#6B6B6B]">Livraison offerte dès 50€</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#8B4513]">
              <Check size={8} className="text-[#8B4513]" strokeWidth={3} />
            </div>
            <span className="text-xs text-[#6B6B6B]">Modifications jusqu'à validation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#8B4513]">
              <Check size={8} className="text-[#8B4513]" strokeWidth={3} />
            </div>
            <span className="text-sm text-[#6B6B6B]">Personnalisation incluse</span>
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
          <ThemeDropdown
            selected={selectedTheme || null}
            onSelect={(value: string) => onThemeChange?.(value)}
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
            <p className="text-xs text-[#6B6B6B] mt-1">
              Ce thème sera appliqué à votre "{product.name}" personnalisé.
            </p>
          </div>
        </div>
      )}

      {/*  7. Boîte offre mise en valeur */}
      <div className="mt-6 rounded-2xl border-2 border-[#8B4513] bg-[#FAF7F2] p-5">
        {/* Badge "LES PLUS POPULAIRES" */}
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block rounded-full bg-[#8B4513] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Les plus populaires
          </span>
          <span className="text-xs font-medium text-[#8B4513"> Sur-mesure</span>
        </div>

        {/* Titre offre */}
        <div className="mb-1 flex items-center gap-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#8B4513]">
            <div className="h-2 w-2 rounded-full bg-[#8B4513]" />
          </div>
          <p className="text-base font-bold text-[#2C2C2C]">Personnalisez et économisez</p>
        </div>

        {/* Prix */}
        <div className="mb-4 flex items-baseline gap-3">
          <span
            className={`text-2xl font-bold ${
              isSurDevis ? "text-[#8B4513]" : "text-[#2C2C2C]"
            }`}
          >
            {display}
          </span>
          {!isSurDevis && (
            <span className="text-sm text-[#6B6B6B]">par unité</span>
          )}
        </div>

        {/* 6 avantages en 2 colonnes */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          {AVANTAGES.map((a) => (
            <CheckBadge key={a} label={a} />
          ))}
        </div>
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
              <p className="text-xs text-[#6B6B6B]">{product.name}</p>
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

      {/*  8. Informations de quantité et prix */}
      {!isSurDevis ? (
        <div className="mt-4 space-y-3">
          {/* Quantité avec minimum */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs">Quantité (min. {minQuantity})</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Pill quantité (fond sombre) */}
              <div className="flex items-center overflow-hidden rounded-full bg-[#2C2C2C] flex-shrink-0">
                <button
                  onClick={quantity === minQuantity ? undefined : handleDecrement}
                  className={`flex h-10 w-8 items-center justify-center text-white transition-colors ${
                    quantity === minQuantity 
                      ? "bg-gray-400 cursor-not-allowed opacity-50" 
                      : "bg-[#2C2C2C] hover:bg-[#3E3E3E] hover:text-[#D4A574]"
                  }`}
                  aria-label="Diminuer la quantité"
                  disabled={quantity === minQuantity}
                >
                  <Minus size={12} />
                </button>
                <input
                  type="number"
                  min={minQuantity}
                  value={String(quantity || minQuantity)}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || minQuantity;
                    setQuantity(Math.max(minQuantity, value));
                  }}
                  className="flex h-10 w-12 bg-transparent text-center font-medium text-white border-0 outline-none focus:ring-0 text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  aria-label="Quantité"
                />
                <button
                  onClick={handleIncrement}
                  className="flex h-10 w-8 items-center justify-center text-white transition-colors hover:bg-[#3E3E3E] hover:text-[#D4A574]"
                  aria-label="Augmenter la quantité"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Informations de prix */}
          <div className="bg-[#FAF7F2] rounded-lg p-3 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#6B6B6B]">Prix/unité :</span>
              <span className="text-sm font-semibold text-[#2C2C2C]">{unitPrice.toFixed(2)}\u20ac</span>
            </div>
            <div className="flex justify-between items-center border-t border-[#8B4513]/20 pt-1.5">
              <span className="text-xs text-[#6B6B6B]">Total :</span>
              <span className="text-sm font-bold text-[#8B4513]">{total.toFixed(2)}\u20ac</span>
            </div>
            {product.pricing?.tiers && product.pricing.tiers.length > 0 && (
              <div className="bg-[#FAF7F2] rounded-lg p-2 mt-2">
                <div className="text-xs font-medium text-[#8B4513] mb-1">Prix dégressifs</div>
                <ul className="space-y-0.5">
                  {product.pricing.tiers.map((tier: PricingTier, index: number) => (
                    <li key={index} className="text-[10px] text-[#6B6B6B]">
                      Dès {tier.min} : {tier.pricePerUnit.toFixed(2)}\u20ac/u
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bouton CTA */}
          <div className="flex items-center gap-2">
            <PrimaryCtaButton 
              onClick={() => onAddToCart?.()} 
              className="flex-1 text-xs py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={(product.requires_theme ?? true) && !selectedTheme}
            >
              <ShoppingBag size={14} className="flex-shrink-0" />
              Ajouter au panier
            </PrimaryCtaButton>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <PrimaryCtaButton 
            href="/contact" 
            showArrow={false}
            className="min-w-[200px]"
          >
            <ShoppingBag size={18} className="flex-shrink-0" />
            Demander un devis
          </PrimaryCtaButton>
        </div>
      )}

      {/* ── 9. Réassurance ─────────────────────────────────────── */}
      <p className="mt-3 text-center text-xs text-[#6B6B6B]">
        Livraison en 15-25 jours ouvrés • Paiement sécurisé
      </p>

      {/* ── Séparateur ─────────────────────────────────────────── */}
      <div className="my-8 border-b border-[#E8E4DF]" />

      {/* ── 10. Accordéons ─────────────────────────────────────── */}
      <ProductAccordions product={product} />
    </div>
  );
}
