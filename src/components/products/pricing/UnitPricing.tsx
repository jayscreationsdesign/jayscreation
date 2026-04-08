'use client'
import { useState } from 'react'

interface UnitPricingProps {
  unitPrice: number
  minQuantity: number
  maxQuantity: number
  quantityStep: number
  onAddToCart: (quantity: number, totalPrice: number) => void
}

export default function UnitPricing({ unitPrice, minQuantity, maxQuantity, quantityStep, onAddToCart }: UnitPricingProps) {
  const [quantity, setQuantity] = useState(minQuantity)
  const total = quantity * unitPrice

  const decrease = () => {
    const newQty = Math.max(minQuantity, quantity - quantityStep)
    setQuantity(newQty)
  }

  const increase = () => {
    const newQty = Math.min(maxQuantity, quantity + quantityStep)
    setQuantity(newQty)
  }

  return (
    <div>
      {/* Prix unitaire */}
      <div className="mb-4">
        <span className="text-2xl font-bold text-[#333]" style={{ fontFamily: "'Playfair Display', serif" }}>
          {unitPrice.toFixed(2)}$
        </span>
        <span className="text-sm text-[#999] ml-2">/ unité</span>
      </div>

      {/* Alerte quantité minimum */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#FAF7F2] rounded-xl mb-4 border border-[#E8E0D4]">
        <span className="text-[#C8A96E] text-lg">i</span>
        <span className="text-sm text-[#666]">
          Quantité minimum : <strong className="text-[#333]">{minQuantity} unités</strong>
        </span>
      </div>

      {/* Sélecteur de quantité */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-semibold text-[#333]">Quantité :</span>
        <div className="flex items-center border border-[#E8E0D4] rounded-full overflow-hidden">
          <button
            onClick={decrease}
            disabled={quantity <= minQuantity}
            className="w-10 h-10 flex items-center justify-center text-lg text-[#666] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || minQuantity
              setQuantity(Math.max(minQuantity, Math.min(maxQuantity, val)))
            }}
            className="w-16 h-10 text-center text-sm font-bold border-x border-[#E8E0D4] outline-none bg-white"
          />
          <button
            onClick={increase}
            disabled={quantity >= maxQuantity}
            className="w-10 h-10 flex items-center justify-center text-lg text-[#666] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FAF7F2] rounded-xl mb-6 border border-[#E8E0D4]">
        <span className="text-sm text-[#666]">Total pour {quantity} unités :</span>
        <span className="text-xl font-bold text-[#3C2415]" style={{ fontFamily: "'Playfair Display', serif" }}>
          {total.toFixed(2)}$
        </span>
      </div>

      {/* Bouton ajouter au panier */}
      <button
        onClick={() => onAddToCart(quantity, total)}
        className="w-full py-4 bg-[#C8A96E] hover:bg-[#B89A5E] text-white font-bold rounded-full text-sm transition-colors shadow-md"
      >
        Ajouter au panier - {total.toFixed(2)}$
      </button>
    </div>
  )
}
