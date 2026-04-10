'use client'
import { useState } from 'react'

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
  onAddToCart: (lot: Lot) => void
}

export default function LotPricing({ lots, referenceUnitPrice, onAddToCart }: LotPricingProps) {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null)

  return (
    <div>
      {/* Titre */}
      <p className="text-sm font-semibold text-[#333] mb-3">Choisissez votre lot :</p>

      {/* Cartes de lots */}
      <div className="flex flex-col gap-3 mb-6">
        {lots.map((lot) => (
          <button
            key={lot.id}
            type="button"
            onClick={() => setSelectedLot(lot)}
            className={`relative w-full text-left p-4 rounded-2xl border-2 transition-all ${
              selectedLot?.id === lot.id
                ? 'border-[#C8A96E] bg-[#FAF7F2] shadow-md'
                : 'border-[#E8E0D4] bg-white hover:border-[#C8A96E]/50'
            }`}
          >
            {/* Badge "Le + populaire" */}
            {lot.isPopular && (
              <div className="absolute -top-3 right-4 px-3 py-1 bg-[#C8A96E] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                Le + populaire
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#333] text-sm">{lot.lotName}</p>
                <p className="text-xs text-[#999] mt-1">
                  soit {lot.unitPriceInLot.toFixed(2)}$ / unité
                  {referenceUnitPrice && lot.savingsPercent > 0 && (
                    <span className="ml-2 text-green-600 font-semibold">
                      -{lot.savingsPercent}%
                    </span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#3C2415]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {lot.lotPrice.toFixed(2)}$
                </p>
                {referenceUnitPrice && (
                  <p className="text-xs text-[#999] line-through">
                    {(referenceUnitPrice * lot.quantity).toFixed(2)}$
                  </p>
                )}
              </div>
            </div>

            {/* Indicateur de sélection */}
            <div className={`absolute top-4 left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedLot?.id === lot.id
                ? 'border-[#C8A96E] bg-[#C8A96E]'
                : 'border-[#E8E0D4]'
            }`}>
              {selectedLot?.id === lot.id && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Bouton ajouter au panier */}
      <button
        onClick={() => selectedLot && onAddToCart(selectedLot)}
        disabled={!selectedLot}
        className={`w-full py-4 font-bold rounded-full text-sm transition-all shadow-md ${
          selectedLot
            ? 'bg-[#C8A96E] hover:bg-[#B89A5E] text-white cursor-pointer'
            : 'bg-[#E8E0D4] text-[#999] cursor-not-allowed'
        }`}
      >
        {selectedLot
          ? `Ajouter au panier - ${selectedLot.lotPrice.toFixed(2)}$` 
          : 'Sélectionnez un lot'
        }
      </button>
    </div>
  )
}
