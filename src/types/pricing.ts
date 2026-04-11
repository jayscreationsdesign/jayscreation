export type PricingTier = {
  min: number
  pricePerUnit: number
}

export type ProductPricing = {
  unitPrice: number
  minQuantity: number
  tiers?: PricingTier[]
}

export function getUnitPrice(quantity: number, pricing: ProductPricing): number {
  const tiers = pricing.tiers ?? []
  const applicable = tiers
    .filter(tier => quantity >= tier.min)
    .sort((a, b) => a.min - b.min)
  
  if (applicable.length === 0) return pricing.unitPrice
  return applicable[applicable.length - 1].pricePerUnit
}
