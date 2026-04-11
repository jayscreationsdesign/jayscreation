'use client'
import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { formatPriceEUR } from '@/lib/formatPrice'
import PrimaryCtaButton from '@/components/ui/PrimaryCtaButton'

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
    <div className="bg-white rounded-2xl p-7 border-2 border-[#8B4513] max-w-md">
      {/* Sélecteur quantité */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-[#333]"> Quantité</p>
          <span className="text-xs text-[#8B4513] font-medium">min. {minQuantity} unités</span>
        </div>
        <div className="flex items-center border-2 border-[#8B4513] rounded-full overflow-hidden w-fit">
          <button
            onClick={decrease}
            disabled={quantity <= minQuantity}
            className="w-11 h-11 border-none bg-transparent text-lg text-[#666] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            -
          </button>
          <span className="w-14 h-11 flex items-center justify-center text-sm font-bold text-[#333] border-x border-[#8B4513]">
            {quantity}
          </span>
          <button
            onClick={increase}
            className="w-11 h-11 border-none bg-transparent text-lg text-[#666] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* Total dynamique */}
      <div className="flex items-center justify-between bg-[#FAF7F2] rounded-xl p-3 mb-5 border border-[#8B4513]">
        <span className="text-sm text-[#666]">{quantity} × {formatPriceEUR(unitPrice)}</span>
        <span className="text-xl font-bold text-[#8B4513]" style={{ fontFamily: "'Playfair Display', serif" }}>
          {formatPriceEUR(total)}
        </span>
      </div>

      {/* Bouton */}
      <PrimaryCtaButton 
        onClick={() => onAddToCart(quantity, total)}
        className="w-full text-sm py-3.5"
      >
        <ShoppingBag size={14} className="flex-shrink-0" />
        Ajouter au panier - {formatPriceEUR(total)}
      </PrimaryCtaButton>
    </div>
  )
}
