"use client";

import { useState } from "react";
import { formatPriceEUR } from "@/lib/formatPrice";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import { ShoppingBag } from "lucide-react";

// Couleurs JC
const GOLD = "#C8A96E";
const CREAM = "#FAF7F2";
const CHOCOLAT = "#3C2415";
const WHITE = "#FFFFFF";
const TEXT = "#333333";
const TEXT_LIGHT = "#666666";
const BORDER = "#8B4513";

export interface SizeOption {
  id: string;
  label: string;
  dimension: string;
  price: number;
}

export interface SizeSelectorProps {
  sizes: SizeOption[];
  minQuantity: number;
  onSizeChange?: (sizeIndex: number, size: SizeOption) => void;
  onQuantityChange?: (quantity: number) => void;
  onAddToCart?: (item: {
    size: SizeOption;
    quantity: number;
    total: number;
  }) => void;
  className?: string;
}

export default function SizeSelector({ 
  sizes, 
  minQuantity = 10, 
  onSizeChange, 
  onQuantityChange,
  onAddToCart,
  className = "" 
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(minQuantity);

  const currentSize = sizes[selectedSize];
  const currentPrice = currentSize.price;
  const total = quantity * currentPrice;

  const handleSizeChange = (index: number) => {
    setSelectedSize(index);
    onSizeChange?.(index, sizes[index]);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(minQuantity, newQuantity);
    setQuantity(validQuantity);
    onQuantityChange?.(validQuantity);
  };

  return (
    <div className={className}>
      {/* Titre section */}
      <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, margin: "0 0 10px 0" }}>
        <span style={{ marginRight: 4 }}>Taille</span>
        <span style={{ fontSize: 11, color: "#8B4513", fontWeight: 500 }}>(min. {minQuantity} unités)</span>
      </p>

      {/* Pills S / M / L */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {sizes.map((size, i) => (
          <button
            key={size.id}
            type="button"
            onClick={() => handleSizeChange(i)}
            style={{
              flex: 1, 
              padding: "14px 8px", 
              borderRadius: 14, 
              cursor: "pointer",
              border: selectedSize === i ? `2px solid ${GOLD}` : `1.5px solid ${BORDER}`,
              background: selectedSize === i ? CREAM : WHITE,
              transition: "all 0.2s ease", 
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Lettre taille */}
            <span style={{
              display: "block", 
              fontSize: 20, 
              fontWeight: 800, 
              letterSpacing: 1,
              color: selectedSize === i ? GOLD : "#ccc",
              marginBottom: 4,
            }}>
              {size.id}
            </span>

            {/* Label */}
            <span style={{
              display: "block", 
              fontSize: 11, 
              color: TEXT_LIGHT,
              marginBottom: 2,
            }}>
              {size.label}
            </span>

            {/* Dimension */}
            <span style={{
              display: "block", 
              fontSize: 10, 
              color: "#bbb",
              marginBottom: 6,
            }}>
              {size.dimension}
            </span>

            {/* Prix */}
            <span style={{
              display: "block", 
              fontSize: 15, 
              fontWeight: 700,
              color: selectedSize === i ? CHOCOLAT : TEXT,
              fontFamily: "'Playfair Display', serif",
            }}>
              {formatPriceEUR(size.price)}
            </span>

            {/* Indicateur sélection */}
            {selectedSize === i && (
              <div style={{
                position: "absolute", 
                top: -6, 
                left: "50%", 
                transform: "translateX(-50%)",
                width: 12, 
                height: 12, 
                borderRadius: "50%",
                background: GOLD, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
              }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Info taille sélectionnée */}
      <div style={{
        display: "flex", 
        alignItems: "center", 
        gap: 8,
        padding: "8px 12px", 
        background: CREAM, 
        borderRadius: 10,
        border: `1px solid ${BORDER}`,
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 14 }}>Taille</span>
        <span style={{ fontSize: 12, color: TEXT_LIGHT }}>
          <strong style={{ color: TEXT }}>{currentSize.id}</strong> - {currentSize.label} ({currentSize.dimension})
        </span>
      </div>

      {/* Sélecteur quantité */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, margin: 0 }}>Quantité</p>
          <span style={{ fontSize: 11, color: "#8B4513", fontWeight: 500 }}>min. {minQuantity} unités</span>
        </div>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          border: `1.5px solid ${BORDER}`, 
          borderRadius: 100, 
          overflow: "hidden", 
          width: "fit-content" 
        }}>
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= minQuantity}
            style={{
              width: 44, 
              height: 44, 
              border: "none", 
              background: "transparent",
              fontSize: 18, 
              color: quantity <= minQuantity ? "#ddd" : TEXT_LIGHT, 
              cursor: quantity <= minQuantity ? "default" : "pointer",
            }}
          >-</button>
          <span style={{
            width: 56, 
            height: 44, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: 15, 
            fontWeight: 700, 
            color: TEXT, 
            borderLeft: `1px solid ${BORDER}`, 
            borderRight: `1px solid ${BORDER}`,
          }}>{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            style={{
              width: 44, 
              height: 44, 
              border: "none", 
              background: "transparent",
              fontSize: 18, 
              color: TEXT_LIGHT, 
              cursor: "pointer",
            }}
          >+</button>
        </div>
      </div>

      {/* Total */}
      <div style={{
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        background: CREAM, 
        borderRadius: 12, 
        padding: "14px 16px", 
        marginBottom: 20,
        border: `1px solid ${BORDER}`,
      }}>
        <div>
          <span style={{ fontSize: 12, color: TEXT_LIGHT, display: "block" }}>
            {quantity} × {formatPriceEUR(currentPrice)} (taille {currentSize.id})
          </span>
        </div>
        <span style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: 24, 
          fontWeight: 700, 
          color: CHOCOLAT 
        }}>
          {formatPriceEUR(total)}
        </span>
      </div>

      {/* Bouton Ajouter au panier */}
      <PrimaryCtaButton 
        onClick={() => {
          onAddToCart?.({
            size: currentSize,
            quantity,
            total
          });
        }}
        className="w-full text-sm py-3.5"
      >
        <ShoppingBag size={14} className="flex-shrink-0" />
        Ajouter au panier - {formatPriceEUR(total)}
      </PrimaryCtaButton>
    </div>
  );
}
