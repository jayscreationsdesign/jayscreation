import { ArrowRight, Star, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";

export default function Tendances() {
  // Sélectionner les 8 produits les mieux notés
  const topRatedProducts = products
    .filter((product: Product) => product.rating)
    .sort((a: Product, b: Product) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8);

  return (
    <section className="py-16 bg-gradient-to-r from-[#8B4513] to-[#D4A574] relative overflow-hidden">
      {/* Pattern de fond subtil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-white" />
            <h2 className="font-heading text-3xl text-white sm:text-4xl font-bold">
              Tendances
            </h2>
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Découvrez les créations les plus populaires du moment
          </p>
        </div>

        {/* Grille des produits tendance */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {topRatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="aspect-square rounded-xl mb-4 relative overflow-hidden bg-[#E8D5B7]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  style={{ backgroundColor: '#E8D5B7' }}
                />
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-sm font-semibold text-white line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-300 fill-current" />
                  <span className="text-xs font-medium text-white">
                    {product.rating}/5
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-white/80 mb-3 line-clamp-2">
                {product.description || `Produit tendance de la catégorie ${product.category}`}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {product.price}
                </span>
                <Link
                  href={`/produit/${product.slug}`}
                  className="inline-flex items-center gap-1 bg-white/10 text-white/90 px-1.5 py-0.5 rounded-sm text-xs font-light hover:bg-white/20 transition-all duration-300"
                >
                  Voir
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action */}
        <div className="text-center">
          <PrimaryCtaButton href="/tendances">
            Explorer les tendances
          </PrimaryCtaButton>
          <p className="text-white/70 text-sm mt-4">
            Découvrez toutes nos créations tendance
          </p>
        </div>
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
    </section>
  );
}
