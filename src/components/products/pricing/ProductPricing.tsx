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
      return (
        <LotPricing
          lots={product.lots || []}
          referenceUnitPrice={product.unitPrice}
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
