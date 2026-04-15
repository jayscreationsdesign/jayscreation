import { ModernProductCard } from "@/components/ui/ModernProductCard"
import { products } from "@/data/products"
import { useCartStore } from "@/store/cartStore"

export const dynamic = 'force-dynamic'

export default function CollectionPage() {
  const { addItem } = useCartStore()

  const handleAddToCart = (product: any) => {
    // Ajouter au panier avec les données du produit
    const cartItem = {
      id: product.slug,
      nom: product.name,
      prix: product.unit_price || product.price_min || 0,
      quantite: 1,
      image: product.image || "/images/products/placeholder.png",
      theme: undefined,
      slug: product.slug,
    }

    addItem(cartItem)
    alert(`\u2705 ${product.name} ajout\u00e9 au panier !`)
  }

  // Prendre les 3 premiers produits pour l'exemple
  const featuredProducts = products.slice(0, 3)

  return (
    <main className="min-h-screen bg-[#FFF8F0]">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <header className="mb-12 text-center md:mb-16">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#8B4513] md:text-4xl">
            Collection Artisanale
          </h1>
          <p className="mx-auto max-w-md text-[#8B4513]/70">
            Découvrez nos créations uniques, façonnées à la main avec passion
          </p>
        </header>

        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ModernProductCard
              key={product.slug}
              product={product as any}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
