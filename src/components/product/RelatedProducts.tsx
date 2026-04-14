'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type Product } from '@/data/products'
import { supabase } from '@/lib/supabase'
import { formatPriceEUR } from '@/lib/formatPrice'
import { getImageSrc } from '@/lib/images'

interface RelatedProductsProps {
  product: Product
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRelatedProducts()
  }, [product.id, product.category])

  const loadRelatedProducts = async () => {
    try {
      // Récupérer les produits de la même catégorie, exclure le produit actuel
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', product.category)
        .neq('id', product.id)
        .limit(4)

      if (error) throw error
      
      // Si pas assez de produits dans la même catégorie, récupérer d'autres produits
      if (data && data.length < 4) {
        const { data: additionalProducts, error: additionalError } = await supabase
          .from('products')
          .select('*')
          .neq('id', product.id)
          .neq('category', product.category)
          .limit(4 - (data?.length || 0))

        if (!additionalError && additionalProducts) {
          setRelatedProducts([...(data || []), ...additionalProducts])
        } else {
          setRelatedProducts(data || [])
        }
      } else {
        setRelatedProducts(data || [])
      }
    } catch (error) {
      console.error('Erreur chargement produits similaires:', error)
      // En cas d'erreur, utiliser les produits locaux comme fallback
      const fallbackProducts = (product.category 
        ? require('@/data/products').products.filter((p: Product) => 
            p.category === product.category && p.slug !== product.slug
          )
        : require('@/data/products').products.filter((p: Product) => p.slug !== product.slug)
      ).slice(0, 4)
      setRelatedProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-8">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="bg-[#E8E4DF] h-48 rounded-lg mb-4"></div>
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
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#2C2C2C] mb-8">Vous aimerez aussi</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.slug} className="group">
              <Link href={`/produit/${relatedProduct.slug}`} className="block">
                <div className="bg-white rounded-xl overflow-hidden border border-[#E8E4DF] hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                    <Image
                      src={getImageSrc(relatedProduct.image)}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-4">
                    <h3 className="font-semibold text-[#2C2C2C] text-sm mb-2 line-clamp-2 group-hover:text-[#8B4513] transition-colors">
                      {relatedProduct.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-[#8B4513]">
                        {formatPriceEUR(
                          typeof relatedProduct.price === 'number' ? relatedProduct.price : 
                          parseFloat(relatedProduct.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0')
                        )}
                      </span>
                    </div>
                    
                    <button className="w-full bg-[#8B4513] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#6B3410] transition-colors">
                      Voir le produit
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
