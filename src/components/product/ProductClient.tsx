"use client"

import { products } from "@/data/products"
import ProductGallery from "@/components/produit/ProductGallery"
import ProductInfo from "@/components/produit/ProductInfo"
import { useState } from "react"
import { useCartStore } from "@/store/cartStore"
import { phTrackAddToCart, trackAddToCart } from "@/lib/analytics"

interface ProductClientProps {
  slug: string
}

export default function ProductClient({ slug }: ProductClientProps) {
  const product = products.find((p) => p.slug === slug)
  const [selectedTheme, setSelectedTheme] = useState("")
  const [qty, setQty] = useState(1)
  const { addItem } = useCartStore()

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme)
  }

  if (!product) {
    return <div>Produit non trouvé</div>
  }

  const handleAddToCart = (itemOrQuantity?: any) => {
    // Gérer les deux cas : nombre (depuis ProductInfo) ou objet (depuis ProductPricing)
    let quantityToAdd = qty;
    let itemData: any = {};

    if (typeof itemOrQuantity === 'number') {
      // Cas depuis ProductInfo : on reçoit juste la quantité
      quantityToAdd = itemOrQuantity;
    } else if (typeof itemOrQuantity === 'object' && itemOrQuantity) {
      // Cas depuis ProductPricing : on reçoit un objet complet
      itemData = itemOrQuantity;
      quantityToAdd = itemOrQuantity.quantity || qty;
    }

    const prixString = typeof product.price === "string"
      ? product.price : String(product.price)
    const prix = parseFloat(
      prixString.replace(/[^\d,]/g, "").replace(",", ".")
    ) || 0

    const cartItem = {
      id: `${product.slug}-${selectedTheme || "default"}`,
      nom: product.name,
      prix: prix,
      quantite: quantityToAdd,
      image: product.image || "/images/products/placeholder.png",
      theme: selectedTheme || undefined,
      slug: product.slug,
    }

    addItem(cartItem)
    
    // PostHog event
    phTrackAddToCart({
      id: cartItem.id,
      name: cartItem.nom,
      price: cartItem.prix,
      category: product.category,
      theme: selectedTheme
    })

    // Google Analytics 4 event
    trackAddToCart({
      id: cartItem.id,
      name: cartItem.nom,
      price: cartItem.prix
    }, quantityToAdd)

    setQty(1)
    alert(`✅ ${product.name} ajouté au panier !`)
  }

  return (
    <div className="bg-white pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-2">
            <ProductInfo 
              product={product} 
              selectedTheme={selectedTheme}
              onThemeChange={handleThemeChange}
              qty={qty}
              onQtyChange={setQty}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
      
      {/* Bouton sticky "Ajouter au panier" pour mobile - amélioré */}
      {product.themes && product.themes.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#8B4513]/20 shadow-lg p-4 z-50 lg:hidden">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleAddToCart}
              disabled={!selectedTheme}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all min-h-[52px] ${
                selectedTheme 
                  ? "bg-[#8B4513] text-white hover:bg-[#6B3410] shadow-md" 
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {selectedTheme ? "Ajouter au panier" : "Sélectionnez un thème"}
            </button>
          </div>
        </div>
      )}
      {(!product.themes || product.themes.length === 0) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#8B4513]/20 shadow-lg p-4 z-50 lg:hidden">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#8B4513] text-white py-4 px-6 rounded-xl font-semibold text-base hover:bg-[#6B3410] transition-all shadow-md min-h-[52px]"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
