"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Check, Star } from "lucide-react";
import { type Product } from "@/data/products";
import ProductAccordions from "./ProductAccordions";

interface ProductInfoProps {
  product: Product;
  selectedTheme?: string;
  canAddToCart?: boolean;
  onAddToCart?: (quantity?: number) => void;
  onThemeChange?: (theme: string) => void;
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
  "Livraison Gratuite",
  "Garantie De 30 Jours",
  "Modifications Illimitées",
  "Maquette Sous 24h",
  "Bénéficiez D'offres Exclusives",
  "Remises Sur Volume",
];

function parsePrice(product: Product): { display: string; isSurDevis: boolean } {
  if (product.price === "Sur devis") return { display: "Sur devis", isSurDevis: true };
  if (product.price.includes(" - ")) {
    return { display: `À partir de ${product.price.split(" - ")[0]}`, isSurDevis: false };
  }
  return { display: product.price, isSurDevis: false };
}

function CheckBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#C8A96E]">
        <Check size={9} className="text-white" strokeWidth={3} />
      </div>
      <span className="text-xs text-[#6B6B6B]">{label}</span>
    </div>
  );
}

export default function ProductInfo({ product, selectedTheme, canAddToCart = true, onAddToCart, onThemeChange }: ProductInfoProps) {
  const [qty, setQty] = useState(1);
  const [purchaseType, setPurchaseType] = useState<"commande">("commande");
  const { display, isSurDevis } = parsePrice(product);

  return (
    <div>
      {/* ── 1. Titre ───────────────────────────────────── */}
      <h1 className="font-heading text-3xl font-bold leading-tight text-[#2C2C2C] md:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      {/* ── 2. Description ─────────────────────────────────── */}
      <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B]" style={{ textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>
        {product.description ??
          `Papeterie artisanale 100% personnalisée — thème, couleurs et texte sur-mesure. Idéal pour mariage, baptême, anniversaire et toute célébration unique.*`}
      </p>

      {/* ── 3. Étoiles + avis ──────────────────────────── */}
      {product.rating && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={17}
                strokeWidth={1.5}
                className={
                  i < Math.round(product.rating!)
                    ? "fill-[#C8A96E] text-[#C8A96E]"
                    : "fill-transparent text-[#C8A96E]"
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
      <div className="mt-5 flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#C8A96E]">
            <Check size={10} className="text-[#C8A96E]" strokeWidth={3} />
          </div>
          <span className="text-sm text-[#6B6B6B]">À partir de 1€ seulement par pièce</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#C8A96E]">
            <Check size={10} className="text-[#C8A96E]" strokeWidth={3} />
          </div>
          <span className="text-sm text-[#6B6B6B]">Livraison offerte dès 50€ d'achat</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#C8A96E]">
              <Check size={10} className="text-[#C8A96E]" strokeWidth={3} />
            </div>
            <span className="text-sm text-[#6B6B6B]">Modifications jusqu'à validation</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#C8A96E]">
              <Check size={10} className="text-[#C8A96E]" strokeWidth={3} />
            </div>
            <span className="text-sm text-[#6B6B6B]">Personnalisation incluse</span>
          </div>
        </div>
      </div>

      {/* ── 5. Thème sélectionné (affichage seulement) ─────────────── */}
      {selectedTheme && (
        <div className="mt-8">
          <div className="p-4 bg-white rounded-lg border border-[#C8A96E]/30">
            <p className="text-sm text-[#2C2C2C]">
              <span className="font-medium">Thème sélectionné :</span> {selectedTheme}
            </p>
            <p className="text-xs text-[#6B6B6B] mt-1">
              Ce thème sera appliqué à votre "{product.name}" personnalisé.
            </p>
          </div>
        </div>
      )}

      {/* ── 6. Section thème (déplacée ici) ─────────────────────── */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4">Choisissez votre thème</h3>
        <div className="bg-[#FAF7F2] rounded-lg p-6 border border-[#C8A96E]/30">
          <div className="bg-white rounded-lg p-4 border border-[#E8E4DF]">
            <select 
              className="w-full p-3 border border-[#E8E4DF] rounded-lg text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
              value={selectedTheme || ""}
              onChange={(e) => {
                onThemeChange?.(e.target.value);
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
          <p className="mt-3 text-sm text-[#6B6B6B]">
            Choisissez le style qui correspond le mieux à votre événement
          </p>
        </div>
      </div>

      {/* ── 7. Boîte offre mise en valeur ─────────────────────── */}
      <div className="mt-6 rounded-2xl border-2 border-[#C8A96E] bg-[#FAF7F2] p-5">
        {/* Badge "LES PLUS POPULAIRES" */}
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block rounded-full bg-[#8B4513] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Les plus populaires
          </span>
          <span className="text-xs font-medium text-[#8B4513]">✦ Sur-mesure</span>
        </div>

        {/* Titre offre */}
        <div className="mb-1 flex items-center gap-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#C8A96E]">
            <div className="h-2 w-2 rounded-full bg-[#C8A96E]" />
          </div>
          <p className="text-base font-bold text-[#2C2C2C]">Personnalisez et économisez</p>
        </div>

        {/* Prix */}
        <div className="mb-4 flex items-baseline gap-3">
          <span
            className={`text-2xl font-bold ${
              isSurDevis ? "text-[#C8A96E]" : "text-[#2C2C2C]"
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

      {/* ── 7. Option d'achat (radio) ─────────────────────────── */}
      <div className="mt-3">
        <label
          className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 px-5 py-4 transition-all ${
            purchaseType === "commande"
              ? "border-[#C8A96E] bg-white"
              : "border-[#E8E4DF] bg-white hover:border-[#C8A96E]/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                purchaseType === "commande"
                  ? "border-[#C8A96E]"
                  : "border-[#E8E4DF]"
              }`}
            >
              {purchaseType === "commande" && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#C8A96E]" />
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

      {/* ── 8. Quantité + CTA côte à côte ─────────────────────── */}
      {!isSurDevis ? (
        <div className="mt-6 flex items-center gap-3">
          {/* Pill quantité (fond sombre) */}
          <div className="flex items-center overflow-hidden rounded-full bg-[#2C2C2C]">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-14 w-12 items-center justify-center text-white transition-colors hover:bg-[#3E3E3E]"
              aria-label="Diminuer la quantité"
            >
              <Minus size={16} />
            </button>
            <span className="flex h-14 w-10 items-center justify-center text-center font-medium text-white">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="flex h-14 w-12 items-center justify-center text-white transition-colors hover:bg-[#3E3E3E]"
              aria-label="Augmenter la quantité"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Bouton CTA simple - TOUJOURS CLIQUABLE */}
          <button 
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#C8A96E] text-sm font-medium uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#B89A5E] cursor-pointer"
            onClick={() => onAddToCart?.()}
            type="button"
          >
            <ShoppingBag size={18} />
            Ajouter au panier
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <Link
            href="/contact"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#C8A96E] text-sm font-medium uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#B89A5E]"
          >
            <ShoppingBag size={18} />
            Demander un devis
          </Link>
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
