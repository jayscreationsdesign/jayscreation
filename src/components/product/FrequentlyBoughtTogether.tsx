'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { type Product } from '@/data/products'
import { supabase } from '@/lib/supabase'
import { useCartStore } from '@/store/cartStore'
import { formatPriceEUR } from '@/lib/formatPrice'
import { getImageSrc } from '@/lib/images'
import { ShoppingCart, Plus } from 'lucide-react'

interface RelatedProduct {
  id: string
  slug: string
  name: string
  price: string | number
  image?: string
  category?: string
}

interface FrequentlyBoughtTogetherProps {
  product: Product
}

export default function FrequentlyBoughtTogether({ product }: FrequentlyBoughtTogetherProps) {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    loadFrequentlyBoughtTogether()
  }, [product.id])

  const loadFrequentlyBoughtTogether = async () => {
    try {
      // Récupérer les produits complémentaires depuis la table cross_sell
      const { data, error } = await supabase
        .from('cross_sell')
        .select(`
          related_product_id,
          products!cross_sell_related_product_id_fkey (
            id,
            slug,
            name,
            price,
            image,
            category
          )
        `)
        .eq('main_product_id', product.id)
        .order('position', { ascending: true })
        .limit(3)

      if (error) throw error

      const products = data?.map(item => ({
        id: item.products.id,
        slug: item.products.slug,
        name: item.products.name,
        price: item.products.price,
        image: item.products.image,
        category: item.products.category
      })) || []

      setRelatedProducts(products)
    } catch (error) {
      console.error('Erreur chargement produits complémentaires:', error)
      // Fallback avec des produits de la même catégorie
      try {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('products')
          .select('*')
          .eq('category', product.category)
          .neq('id', product.id)
          .limit(3)

        if (!fallbackError && fallbackData) {
          const fallbackProducts = fallbackData.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            price: p.price,
            image: p.image,
            category: p.category
          }))
          setRelatedProducts(fallbackProducts)
        }
      } catch (fallbackErr) {
        console.error('Erreur fallback:', fallbackErr)
      }
    } finally {
      setLoading(false)
    }
  }

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const calculateTotal = () => {
    let total = 0
    
    // Ajouter le prix du produit principal
    const mainProductPrice = typeof product.price === 'number' 
      ? product.price 
      : parseFloat(product.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0')
    total += mainProductPrice

    // Ajouter les prix des produits sélectionnés
    selectedProducts.forEach(productId => {
      const relatedProduct = relatedProducts.find(p => p.id === productId)
      if (relatedProduct) {
        const price = typeof relatedProduct.price === 'number'
          ? relatedProduct.price
          : parseFloat(relatedProduct.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0')
        total += price
      }
    })

    return total
  }

  const handleAddSelectionToCart = () => {
    // Ajouter le produit principal
    const mainProductPrice = typeof product.price === 'number' 
      ? product.price 
      : parseFloat(product.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0')
    
    addItem({
      id: product.slug,
      nom: product.name,
      prix: mainProductPrice,
      quantite: 1,
      image: product.image || "/images/products/placeholder.png",
      theme: undefined,
      slug: product.slug,
    })

    // Ajouter les produits sélectionnés
    selectedProducts.forEach(productId => {
      const relatedProduct = relatedProducts.find(p => p.id === productId)
      if (relatedProduct) {
        const price = typeof relatedProduct.price === 'number'
          ? relatedProduct.price
          : parseFloat(relatedProduct.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0')
        
        addItem({
          id: relatedProduct.slug,
          nom: relatedProduct.name,
          prix: price,
          quantite: 1,
          image: relatedProduct.image || "/images/products/placeholder.png",
          theme: undefined,
          slug: relatedProduct.slug,
        })
      }
    })

    alert(`\u2705 ${1 + selectedProducts.size} produit(s) ajout\u00e9(s) au panier !`)
  }

  if (loading) {
    return (
      <section className="py-12 bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-8">Souvent achetés ensemble</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="bg-[#E8E4DF] h-32 rounded-lg mb-4"></div>
                <div className="bg-[#E8E4DF] h-4 rounded mb-2"></div>
                <div className="bg-[#E8E4DF] h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#2C2C2C] mb-8">Souvent achetés ensemble</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Produit principal */}
          <div className="bg-white rounded-xl p-4 border-2 border-[#8B4513]">
            <div className="relative aspect-square overflow-hidden bg-[#FAF7F2] rounded-lg mb-4">
              <Image
                src={getImageSrc(product.image)}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute top-2 right-2 bg-[#8B4513] text-white text-xs px-2 py-1 rounded">
                Principal
              </div>
            </div>
            <h3 className="font-semibold text-[#2C2C2C] text-sm mb-2">{product.name}</h3>
            <div className="text-lg font-bold text-[#8B4513] mb-2">
              {formatPriceEUR(
                typeof product.price === 'number' ? product.price : 
                parseFloat(product.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0')
              )}
            </div>
          </div>

          {/* Produits complémentaires */}
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="bg-white rounded-xl p-4 border border-[#E8E4DF]">
              <div className="relative">
                <div className="relative aspect-square overflow-hidden bg-[#FAF7F2] rounded-lg mb-4">
                  <Image
                    src={getImageSrc(relatedProduct.image)}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                
                {/* Checkbox */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleProductSelection(relatedProduct.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedProducts.has(relatedProduct.id)
                        ? 'bg-[#8B4513] border-[#8B4513]'
                        : 'bg-white border-[#E8E4DF] hover:border-[#8B4513]'
                    }`}
                  >
                    {selectedProducts.has(relatedProduct.id) && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>
              
              <h3 className="font-semibold text-[#2C2C2C] text-sm mb-2">{relatedProduct.name}</h3>
              <div className="text-lg font-bold text-[#8B4513] mb-2">
                {formatPriceEUR(
                  typeof relatedProduct.price === 'number' ? relatedProduct.price : 
                  parseFloat(relatedProduct.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0')
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total et bouton d'action */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-[#E8E4DF]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm text-[#6B6B6B] mb-1">
                Total pour {1 + selectedProducts.size} produit(s) :
              </div>
              <div className="text-2xl font-bold text-[#2C2C2C]">
                {formatPriceEUR(calculateTotal())}
              </div>
            </div>
            
            <button
              onClick={handleAddSelectionToCart}
              className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Ajouter la sélection au panier
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
