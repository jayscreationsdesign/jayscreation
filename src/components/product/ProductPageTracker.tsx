'use client'
import { useEffect } from 'react'
import { phTrackViewProduct, trackViewProduct } from '@/lib/analytics'

interface ProductPageTrackerProps {
  product: any
}

export function ProductPageTracker({ product }: ProductPageTrackerProps) {
  useEffect(() => {
    // Track product view when component mounts
    phTrackViewProduct({
      id: product.slug,
      name: product.name,
      price: product.price,
      category: product.category,
      theme: null
    })

    // Track product view in Google Analytics 4
    trackViewProduct({
      id: product.slug,
      name: product.name,
      price: product.price
    })
  }, [product])

  return null
}
