import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Heart, Sparkles, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

export const metadata: Metadata = {
  title: "Tendances - Jay's Creations Design",
  description: "Decouvrez les creations les plus populaires du moment.",
};

export default function TendancesPage() {
  const tendances = [
    {
      id: "faire-parts-romantiques",
      title: "Faire-parts Romantiques",
      description: "Designs elegants et personnalises pour vos unions.",
      icon: Heart,
      trend: "Top des ventes",
      color: "from-pink-500 to-rose-400",
      categorySlugs: ["faire-parts", "faire-parts-bapteme"],
      featuredProducts: products.filter((p: Product) => 
        p.categorySlug === "faire-parts" || 
        p.categorySlug === "faire-parts-bapteme"
      ).slice(0, 3)
    },
    {
      id: "tableaux-accueil",
      title: "Tableaux d'Accueil",
      description: "Mise en scene artistique pour accueillir vos invites.",
      icon: Star,
      trend: "Nouveaute 2026",
      color: "from-purple-500 to-indigo-400",
      categorySlugs: ["tableaux-accueil", "tableaux-accueil-bapteme"],
      featuredProducts: products.filter((p: Product) => 
        p.categorySlug === "tableaux-accueil" || 
        p.categorySlug === "tableaux-accueil-bapteme"
      ).slice(0, 3)
    },
    {
      id: "marque-places-originaux",
      title: "Marque-places Originaux",
      description: "Details uniques qui font toute la difference.",
      icon: Sparkles,
      trend: "Tendance du moment",
      color: "from-amber-500 to-orange-400",
      categorySlugs: ["marque-places", "marque-places-bapteme"],
      featuredProducts: products.filter((p: Product) => 
        p.categorySlug === "marque-places" || 
        p.categorySlug === "marque-places-bapteme"
      ).slice(0, 3)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-white">
      <section className="py-20 bg-gradient-to-r from-[#C8A96E] to-[#D4A574] relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-white" />
              <h1 className="font-heading text-4xl text-white sm:text-5xl font-bold">
                Tendances 2026
              </h1>
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Decouvrez les creations les plus populaires du moment
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {tendances.map((tendance, index) => (
            <div key={tendance.id} className="mb-20 last:mb-0">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className={`h-16 w-16 bg-gradient-to-r ${tendance.color} rounded-full flex items-center justify-center`}>
                    <tendance.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-heading text-3xl text-foreground font-bold mb-1">
                      {tendance.title}
                    </h2>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      <Star className="h-3 w-3" />
                      {tendance.trend}
                    </span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {tendance.description}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 mb-12">
                {tendance.featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="aspect-square bg-gray-50 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-accent">
                          {Number(product.price).toFixed(2)} €
                        </span>
                        <Link
                          href={`/produit/${product.slug}`}
                          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Voir
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href={`/boutique?category=${tendance.categorySlugs[0]}`}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-accent to-accent/80 text-white px-8 py-4 rounded-full font-medium hover:from-accent/90 hover:to-accent/70 transition-all duration-300 transform hover:scale-[1.02] group"
                >
                  <span className="text-lg">Voir tous les {tendance.title.toLowerCase()}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <p className="text-muted-foreground text-sm mt-4">
                  Decouvrez toute notre collection de {tendance.title.toLowerCase()}
                </p>
              </div>

              {index < tendances.length - 1 && (
                <div className="mt-16 flex items-center justify-center">
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-2xl" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#C8A96E] to-[#D4A574]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl text-white font-bold mb-4">
            Pret a creer votre moment parfait ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour des creations entierement personnalisees
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-accent px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300"
            >
              <span>Personnaliser ma creation</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <span>Explorer toute la boutique</span>
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
