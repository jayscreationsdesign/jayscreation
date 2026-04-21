"use client";

import { useState } from "react";
import { type Product } from "@/data/products";
import AvisTab from "@/components/ui/AvisTab";

interface ProductInfoPapeterieProps {
  product: Product;
  onAddToCart?: (itemOrQuantity?: any) => void;
}

const PRODUITS_PRIX: Record<string, number> = {
  chips: 2.99, canette: 2.99, "kinder-maxi": 2.99,
  "kinder-country": 2.99, "kinder-bueno": 2.99, mms: 2.99,
  "contour-bouteille": 2.99, "bulle-savon": 2.99, caprisun: 2.99,
  "mini-chocolat": 2.99, popcorn: 2.99, pringles: 2.99,
  dragibus: 2.99, "sachet-bonbon": 2.99,
  "pack-papeterie": 16.99, poster: 14.99,
};

const PRODUITS_LIST = [
  { value: "chips", label: "Sachet de chips" },
  { value: "canette", label: "Canette" },
  { value: "kinder-maxi", label: "Kinder Maxi" },
  { value: "kinder-country", label: "Kinder Country" },
  { value: "kinder-bueno", label: "Kinder Bueno" },
  { value: "mms", label: "M&m's" },
  { value: "contour-bouteille", label: "Contour bouteille" },
  { value: "bulle-savon", label: "Bulle de savon" },
  { value: "caprisun", label: "Caprisun" },
  { value: "mini-chocolat", label: "Mini chocolat" },
  { value: "popcorn", label: "Popcorn" },
  { value: "pringles", label: "Pringles" },
  { value: "dragibus", label: "Dragibus" },
  { value: "sachet-bonbon", label: "Sachet de bonbon" },
  { value: "pack-papeterie", label: "Pack papeterie (8 produits au choix)" },
  { value: "poster", label: "Poster" },
];

export default function ProductInfoPapeterie({ product, onAddToCart }: ProductInfoPapeterieProps) {
  const [selectedFormat, setSelectedFormat] = useState<"kit" | "unit">("kit");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [childName, setChildName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [visualInfo, setVisualInfo] = useState("");

  const getPrice = (): string => {
    if (!selectedProduct) return "— €";
    
    // Prix fixes selon le produit
    if (selectedProduct === "pack-papeterie") return "16,99 €";
    if (selectedProduct === "poster") return "14,99 €";
    return "2,99 €"; // Tous les autres produits
  };

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
  };

  const handleEffacer = () => {
    setSelectedProduct("");
  };

  return (
    <div className="space-y-5">

      {/* Onglet AVIS vertical */}
      <AvisTab showOnMobile={false} />

      {/* A) Tags badges */}
      <div className="flex flex-wrap gap-2">
        {["Nouveau", "Exclusif", "Personnalisable"].map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium"
            style={{ 
              backgroundColor: '#C8A96E18', 
              color: '#8B4513', 
              border: '1px solid #D4A574', 
              borderRadius: '20px',
              display: 'inline-block',
              padding: '0.25rem 0.6rem',
              width: 'auto',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* B) Titre produit */}
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#3C2415', lineHeight: 1.2 }}>
        {product.name}
      </h1>

      {/* C) Étoiles + nb avis */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} style={{ color: '#C8A96E', fontSize: '14px' }}>★</span>
          ))}
        </div>
        <span style={{ color: '#8B4513', fontSize: '11px' }}>4.9 / 5 · 38 avis</span>
      </div>

      {/* D) Section CHOISIR VOTRE FORMAT */}
      <div style={{ background: 'white', border: '1px solid #D4A574', borderRadius: '10px', padding: '12px' }}>
        <div style={{ display: 'inline-block', minWidth: '0' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8B4513', marginBottom: '10px', whiteSpace: 'nowrap' }}>
            Choisir votre format
          </p>
        </div>

        {/* Cards Kit / Unité */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <div
            onClick={() => setSelectedFormat("kit")}
            style={{
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '8px',
              border: selectedFormat === "kit" ? '1.5px solid #C8A96E' : '1px solid #D4A574',
              background: selectedFormat === "kit" ? '#FDF9F4' : 'white',
            }}
          >
            <p style={{ fontSize: '10px', fontWeight: 500, color: '#C8A96E' }}>Kit Complet</p>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#3C2415' }}>16,99 €</p>
            <p style={{ fontSize: '9px', color: '#8B4513' }}>8 produits au choix</p>
          </div>
          <div
            onClick={() => setSelectedFormat("unit")}
            style={{
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '8px',
              border: selectedFormat === "unit" ? '1.5px solid #C8A96E' : '1px solid #D4A574',
              background: selectedFormat === "unit" ? '#FDF9F4' : 'white',
            }}
          >
            <p style={{ fontSize: '10px', fontWeight: 500, color: '#8B4513' }}>À l'unité</p>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#3C2415' }}>2,99 €</p>
            <p style={{ fontSize: '9px', color: '#8B4513' }}>par produit</p>
          </div>
        </div>

        {/* Menu déroulant produit */}
        <p style={{ fontSize: '10px', color: '#8B4513', marginBottom: '4px' }}>Choisir un produit</p>
        <div style={{ position: 'relative', display: 'inline-block', minWidth: '0' }}>
          <select
            value={selectedProduct}
            onChange={(e) => handleProductChange(e.target.value)}
            style={{
              width: 'auto',
              minWidth: '0',
              maxWidth: '100%',
              background: '#FAF7F2',
              border: '1px solid #D4A574',
              borderRadius: '6px',
              padding: '7px 32px 7px 10px',
              fontSize: '11px',
              color: '#3C2415',
              appearance: 'none',
              WebkitAppearance: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="">Choisir une option</option>
            {PRODUITS_LIST.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>

        {/* Bouton Effacer */}
        {selectedProduct && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '5px' }}>
            <button
              onClick={handleEffacer}
              style={{ fontSize: '10px', color: '#8B4513', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Effacer
            </button>
          </div>
        )}

        {/* Prix dynamique */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #D4A574' }}>
          <span style={{ fontSize: '10px', color: '#8B4513' }}>Prix</span>
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#3C2415' }}>{getPrice()}</span>
        </div>
      </div>

      {/* E) Personnalisation */}
      <div style={{ background: 'white', border: '1px solid #D4A574', borderRadius: '10px', padding: '12px' }}>
        <div style={{ display: 'inline-block', minWidth: '0' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8B4513', marginBottom: '10px', whiteSpace: 'nowrap' }}>
            Personnalisation
          </p>
        </div>
        <p style={{ fontSize: '10px', color: '#8B4513', marginBottom: '4px' }}>Prénom de l'enfant</p>
        <input
          type="text"
          placeholder="Ex : Emma"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          style={{ width: '100%', background: '#FAF7F2', border: '1px solid #D4A574', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', color: '#3C2415', marginBottom: '8px' }}
        />
        <p style={{ fontSize: '10px', color: '#8B4513', marginBottom: '4px' }}>Date de l'événement</p>
        <input
          type="text"
          placeholder="Ex : 15 juin 2025"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          style={{ width: '100%', background: '#FAF7F2', border: '1px solid #D4A574', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', color: '#3C2415' }}
        />
      </div>

      {/* F) Information Visuel */}
      <div style={{ display: 'inline-block', minWidth: '0', background: 'white', border: '1px solid #D4A574', borderRadius: '10px', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8B4513', whiteSpace: 'nowrap', margin: 0 }}>
            Information Visuel <span style={{ color: '#E24B4A' }}>*</span>
          </p>
        </div>
        <p style={{ fontSize: '10px', color: '#8B4513', marginBottom: '4px' }}>Décrivez votre visuel souhaité</p>
        <textarea
          placeholder="thème, couleur, personnage, élément..."
          value={visualInfo}
          onChange={(e) => setVisualInfo(e.target.value)}
          rows={3}
          style={{
            width: 'auto',
            minWidth: '200px',
            background: '#FAF7F2',
            border: '1px solid #D4A574',
            borderRadius: '6px',
            padding: '8px 10px',
            fontSize: '11px',
            color: '#3C2415',
            resize: 'none',
            height: '60px',
          }}
        />
        <p style={{ fontSize: '9px', color: '#8B4513', marginTop: '4px' }}>
          Ces informations nous permettront de créer votre design personnalisé
        </p>
      </div>

      {/* G) Quantité */}
      <div style={{ background: 'white', border: '1px solid #D4A574', borderRadius: '10px', padding: '12px' }}>
        <div style={{ display: 'inline-block', minWidth: '0' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8B4513', marginBottom: '10px', whiteSpace: 'nowrap' }}>
            Quantité
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ width: '28px', height: '28px', border: '1px solid #D4A574', borderRadius: '6px', background: 'white', color: '#8B4513', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            −
          </button>
          <span style={{ width: '36px', height: '28px', border: '1px solid #D4A574', borderRadius: '6px', background: '#FAF7F2', fontSize: '13px', fontWeight: 500, color: '#3C2415', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{ width: '28px', height: '28px', border: '1px solid #D4A574', borderRadius: '6px', background: 'white', color: '#8B4513', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            +
          </button>
          <span style={{ fontSize: '10px', color: '#8B4513', marginLeft: '4px' }}>kit(s) commandé(s)</span>
        </div>
      </div>

      {/* H) Badges rassurants */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {["Livraison sous 72h", "Aperçu avant impression", "Paiement sécurisé", "Modifs illimitées"].map((badge) => (
          <span
            key={badge}
            style={{ 
              background: '#FAF7F2', 
              border: '1px solid #D4A574', 
              borderRadius: '20px', 
              fontSize: '10px', 
              color: '#8B4513',
              display: 'inline-block',
              padding: '0.25rem 0.6rem',
              width: 'auto',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* I) CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ background: '#EAF5E9', border: '1px solid #D4A574', borderRadius: '6px', padding: '6px', fontSize: '10px', color: '#8B4513', textAlign: 'center' }}>
          Téléchargement immédiat après paiement
        </div>
        <button
          onClick={() => onAddToCart?.()}
          style={{ background: '#3C2415', borderRadius: '7px', padding: '10px', fontSize: '12px', color: '#FAF7F2', fontWeight: 500, border: 'none', cursor: 'pointer', width: '100%' }}
        >
          Ajouter au panier — {getPrice()}
        </button>
        <button
          onClick={() => onAddToCart?.()}
          style={{ background: '#C8A96E', borderRadius: '7px', padding: '10px', fontSize: '12px', color: 'white', fontWeight: 500, border: 'none', cursor: 'pointer', width: '100%' }}
        >
          Acheter maintenant
        </button>
        <p style={{ textAlign: 'center', fontSize: '10px', color: '#8B4513' }}>
          Visa · Mastercard · PayPal · Klarna
        </p>
      </div>

      
    </div>
  );
}
