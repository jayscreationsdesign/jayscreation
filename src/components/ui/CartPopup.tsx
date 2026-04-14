'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { type Product } from '@/data/products'
import { supabase } from '@/lib/supabase'
import { formatPriceEUR } from '@/lib/formatPrice'
import { getImageSrc } from '@/lib/images'

interface CartPopupProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

interface SuggestedProduct {
  id: string
  slug: string
  name: string
  price: string | number
  image?: string
}

export default function CartPopup({ isOpen, onClose, product }: CartPopupProps) {
  const [suggestedProduct, setSuggestedProduct] = useState<SuggestedProduct | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && product) {
      loadSuggestedProduct()
    }
  }, [isOpen, product])

  useEffect(() => {
    if (isOpen) {
      // Fermer automatiquement après 4 secondes
      const timer = setTimeout(() => {
        onClose()
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  const loadSuggestedProduct = async () => {
    setLoading(true)
    try {
      // Récupérer un produit suggéré aléatoire de la même catégorie
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', product.category)
        .neq('id', product.id)
        .limit(1)

      if (error) throw error

      if (data && data.length > 0) {
        const suggested = data[0]
        setSuggestedProduct({
          id: suggested.id,
          slug: suggested.slug,
          name: suggested.name,
          price: suggested.price,
          image: suggested.image
        })
      }
    } catch (error) {
      console.error('Erreur chargement produit suggéré:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all">
        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#2C2C2C] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Contenu */}
        <div className="text-center">
          {/* Icône de succès */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} className="text-green-600" />
          </div>

          {/* Message principal */}
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">
            Vous avez ajouté "{product.name}" au panier
          </h3>

          {/* Produit suggéré */}
          {!loading && suggestedProduct && (
            <div className="mt-6 p-4 bg-[#FAF7F2] rounded-xl">
              <p className="text-sm text-[#6B6B6B] mb-3">
                Les clients ont aussi acheté :
              </p>
              
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-[#E8E4DF] flex-shrink-0">
                  <Image
                    src={getImageSrc(suggestedProduct.image)}
                    alt={suggestedProduct.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-[#2C2C2C] text-sm">
                    {suggestedProduct.name}
                  </h4>
                  <p className="text-[#8B4513] font-bold">
                    {formatPriceEUR(
                      typeof suggestedProduct.price === 'number' ? suggestedProduct.price : 
                      parseFloat(suggestedProduct.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0')
                    )}
                  </p>
                </div>
              </div>

              <Link href={`/produit/${suggestedProduct.slug}`}>
                <button className="mt-3 w-full bg-[#8B4513] hover:bg-[#6B3410] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Voir ce produit
                </button>
              </Link>
            </div>
          )}

          {loading && (
            <div className="mt-6 p-4 bg-[#FAF7F2] rounded-xl">
              <div className="animate-pulse">
                <div className="bg-[#E8E4DF] h-4 rounded mb-2"></div>
                <div className="bg-[#E8E4DF] h-4 rounded w-3/4"></div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/panier" className="flex-1">
              <button 
                onClick={onClose}
                className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Voir le panier
              </button>
            </Link>
            
            <button
              onClick={onClose}
              className="flex-1 border border-[#8B4513] text-[#8B4513] py-3 px-4 rounded-lg font-medium hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
            >
              <ArrowRight size={18} />
              Continuer mes achats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
