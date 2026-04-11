'use client'
import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { formatPriceEUR } from '@/lib/formatPrice'
import PrimaryCtaButton from '@/components/ui/PrimaryCtaButton'

interface Lot {
  id: string
  lotName: string
  quantity: number
  lotPrice: number
  unitPriceInLot: number
  savingsPercent: number
  isPopular: boolean
}

interface LotPricingProps {
  lots: Lot[]
  referenceUnitPrice?: number  // Prix unitaire de référence pour montrer les économies
  minQuantity?: number        // Quantité minimum
  onAddToCart: (lot: Lot) => void
}

export default function LotPricing({ lots, referenceUnitPrice, minQuantity = 1, onAddToCart }: LotPricingProps) {
  const [selectedLotIndex, setSelectedLotIndex] = useState<number>(-1)
  const [quantity, setQuantity] = useState<number>(minQuantity)

  const decrease = () => {
    setQuantity(q => Math.max(minQuantity, q - 1))
  }

  const increase = () => {
    setQuantity(q => q + 1)
  }

  // Prix unitaire de base du produit (dynamique selon le produit)
  const baseUnitPrice = referenceUnitPrice || lots[0]?.unitPriceInLot || 3.90
  
  // Calculer le prix en fonction de la quantité (pour le bouton CTA)
  const getCurrentPrice = () => {
    const applicableLot = lots
      .filter(lot => quantity >= lot.quantity)
      .sort((a, b) => b.quantity - a.quantity)[0]
    
    if (applicableLot) {
      return applicableLot.unitPriceInLot
    }
    return baseUnitPrice
  }

  const currentUnitPrice = getCurrentPrice()
  const currentTotal = currentUnitPrice * quantity
  
  // Total pour l'affichage (quantité x prix unitaire de base)
  const displayTotal = baseUnitPrice * quantity

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
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(minQuantity, parseInt(e.target.value) || minQuantity))}
            className="w-16 text-center border-none bg-transparent text-lg font-semibold text-[#333] focus:outline-none"
            min={minQuantity}
          />
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
        <span className="text-sm text-[#666]">{quantity} × {baseUnitPrice.toFixed(2)}€</span>
        <span className="text-xl font-bold text-[#8B4513]" style={{ fontFamily: "'Playfair Display', serif" }}>
          {displayTotal.toFixed(2)}€
        </span>
      </div>

      {/* Sélecteur de lot */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-[#333] mb-2.5"> Choisissez votre lot</p>
        <div className="flex flex-col gap-2">
          {lots.map((lot, index) => (
            <button
              key={lot.id}
              type="button"
              onClick={() => setSelectedLotIndex(index)}
              className={`relative flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left ${
                selectedLotIndex === index
                  ? 'border-[#8B4513] bg-[#FAF7F2]'
                  : 'border-[#8B4513] bg-white hover:border-[#8B4513]/50'
              }`}
            >
              {/* Badge "Populaire" */}
              {lot.isPopular && (
                <span className="absolute -top-2 right-3 bg-[#8B4513] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Populaire
                </span>
              )}

              <div className="flex items-center gap-2.5">
                <div className={`w-4.5 h-4.5 rounded-full border-2 flex-shrink-0 ${
                  selectedLotIndex === index
                    ? 'border-[#8B4513] bg-white'
                    : 'border-[#8B4513] bg-white'
                }`}>
                  {selectedLotIndex === index && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8B4513] m-auto" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#333]">{lot.lotName}</span>
                  <p className="text-xs text-[#666] mt-0.5">
                    {formatPriceEUR(lot.unitPriceInLot)}/u
                    <span className="text-green-600 font-semibold ml-1.5">-{lot.savingsPercent}%</span>
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-[#8B4513]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {formatPriceEUR(lot.lotPrice)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bouton */}
      <PrimaryCtaButton
        onClick={() => {
          const customLot = {
            id: `custom-${quantity}`,
            lotName: `${quantity} unités`,
            quantity: quantity,
            lotPrice: currentTotal,
            unitPriceInLot: currentUnitPrice,
            savingsPercent: referenceUnitPrice ? Math.round(((referenceUnitPrice - currentUnitPrice) / referenceUnitPrice) * 100) : 0,
            isPopular: false
          }
          onAddToCart(customLot)
        }}
        className="w-full text-sm py-3.5"
      >
        <ShoppingBag size={14} className="flex-shrink-0" />
        Ajouter au panier - {formatPriceEUR(currentTotal)}
      </PrimaryCtaButton>
    </div>
  )
}
