'use client'

import { useEffect } from 'react'
import { Truck, Gift } from 'lucide-react'

interface FreeShippingBarProps {
  total: number
  freeShippingThreshold?: number
}

export default function FreeShippingBar({ 
  total, 
  freeShippingThreshold = 50 
}: FreeShippingBarProps) {
  // Debug pour voir les valeurs reçues
  useEffect(() => {
    console.log('ð FreeShippingBar Debug:');
    console.log('- total reçu:', total);
    console.log('- freeShippingThreshold:', freeShippingThreshold);
    console.log('- remaining:', Math.max(0, freeShippingThreshold - total));
    console.log('- isFreeShipping:', total >= freeShippingThreshold);
  }, [total, freeShippingThreshold]);

  const remaining = Math.max(0, freeShippingThreshold - total)
  const progress = Math.min(100, (total / freeShippingThreshold) * 100)
  const isFreeShipping = total >= freeShippingThreshold

  return (
    <div className="bg-white rounded-xl p-4 border border-[#E8E4DF] mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {isFreeShipping ? <Gift className="w-5 h-5 text-green-600" /> : <Truck className="w-5 h-5 text-[#8B4513]" />}
          </span>
          <span className={`font-semibold ${
            isFreeShipping ? 'text-green-600' : 'text-[#2C2C2C]'
          }`}
          dangerouslySetInnerHTML={{
            __html: isFreeShipping 
              ? 'Livraison gratuite débloquée !' 
              : `Plus que ${remaining.toFixed(2)}&euro; pour la livraison gratuite !`
          }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-sm text-[#6B6B6B] font-medium"
            dangerouslySetInnerHTML={{
              __html: `${total.toFixed(2)}&euro;`
            }}
          />
          <span className="text-sm text-[#6B6B6B]">/</span>
          <span 
            className="text-sm text-[#6B6B6B] font-medium"
            dangerouslySetInnerHTML={{
              __html: `${freeShippingThreshold}&euro;`
            }}
          />
        </div>
      </div>
      
      {/* Barre de progression */}
      <div className="w-full bg-[#E8E4DF] rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            isFreeShipping ? 'bg-green-500' : 'bg-[#8B4513]'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {!isFreeShipping && (
        <p className="mt-2 text-xs text-[#6B6B6B] text-center">
          Ajoutez des articles pour bénéficier de la livraison gratuite
        </p>
      )}
    </div>
  )
}
