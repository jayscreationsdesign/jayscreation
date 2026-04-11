'use client'
import UnitPricing from './UnitPricing'
import LotPricing from './LotPricing'
import QuotePricing from './QuotePricing'

interface ProductPricingProps {
  product: {
    name: string
    slug: string
    pricingType: 'unit_with_minimum' | 'lot_pricing' | 'quote'
    unitPrice?: number
    minQuantity?: number
    maxQuantity?: number
    quantityStep?: number
    lots?: Array<{
      id: string
      lotName: string
      quantity: number
      lotPrice: number
      unitPriceInLot: number
      savingsPercent: number
      isPopular: boolean
    }>
  }
  selectedTheme?: string | null
  onAddToCart: (item: any) => void
}

export default function ProductPricing({ product, selectedTheme, onAddToCart }: ProductPricingProps) {
  // Vérifier qu'un thème est sélectionné si requis
  const themeRequired = product.pricingType !== 'quote' // Les devis n'ont pas besoin de thème pré-sélectionné

  switch (product.pricingType) {
    case 'unit_with_minimum':
      if (!selectedTheme && themeRequired) {
        return (
          <div className="bg-white rounded-2xl p-7 border-2 border-[#8B4513] max-w-md">
            <div className="text-center py-8">
              <span className="text-2xl mb-3"> Sélectionnez un thème</span>
              <p className="text-sm text-[#666]">Veuillez d'abord choisir un thème pour voir les options de prix</p>
            </div>
          </div>
        )
      }
      return (
        <UnitPricing
          unitPrice={product.unitPrice || 0}
          minQuantity={product.minQuantity || 1}
          maxQuantity={product.maxQuantity || 999}
          quantityStep={product.quantityStep || 1}
          onAddToCart={(quantity, totalPrice) => {
            onAddToCart({
              productId: product.slug,
              productName: product.name,
              theme: selectedTheme,
              quantity,
              unitPrice: product.unitPrice,
              totalPrice,
              type: 'unit',
            })
          }}
        />
      )

    case 'lot_pricing':
      if (!selectedTheme && themeRequired) {
        return (
          <div className="bg-white rounded-2xl p-7 border-2 border-[#8B4513] max-w-md">
            <div className="text-center py-8">
              <span className="text-2xl mb-3"> Sélectionnez un thème</span>
              <p className="text-sm text-[#666]">Veuillez d'abord choisir un thème pour voir les options de prix</p>
            </div>
          </div>
        )
      }
      return (
        <LotPricing
          lots={product.lots || []}
          referenceUnitPrice={product.unitPrice}
          minQuantity={product.minQuantity || 1}
          onAddToCart={(lot) => {
            onAddToCart({
              productId: product.slug,
              productName: product.name,
              theme: selectedTheme,
              quantity: lot.quantity,
              unitPrice: lot.unitPriceInLot,
              totalPrice: lot.lotPrice,
              lotName: lot.lotName,
              type: 'lot',
            })
          }}
        />
      )

    case 'quote':
      return <QuotePricing productName={product.name} />

    default:
      return <QuotePricing productName={product.name} />
  }
}
