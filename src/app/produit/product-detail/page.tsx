"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { 
  Minus, 
  Plus, 
  Star, 
  Check, 
  ShoppingCart, 
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Package,
  Zap,
  Clock,
  Award,
  ChevronRight
} from "lucide-react";
import { useState, use } from "react";

// Thèmes disponibles pour la personnalisation
const THEMES = [
  { id: "princesse", name: "Princesse", color: "bg-pink-200" },
  { id: "super-heros", name: "Super Héros", color: "bg-blue-200" },
  { id: "jungle", name: "Jungle", color: "bg-green-200" },
  { id: "licorne", name: "Licorne", color: "bg-purple-200" },
  { id: "espace", name: "Espace", color: "bg-indigo-200" },
  { id: "dinosaure", name: "Dinosaure", color: "bg-yellow-200" },
];

// Récupérer le produit par slug
async function getProduct(slug: string): Promise<Product | null> {
  const product = products.find((p) => p.slug === slug);
  return product || null;
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* HEADER BREADCRUMB */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/boutique" className="hover:text-[#2D6A4F] transition-colors">
              Boutique
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* COLONNE GAUCHE - IMAGE ET GALERIE */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Miniatures */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 border-2 border-transparent hover:border-[#2D6A4F] transition-colors cursor-pointer">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Vue ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* COLONNE DROITE - INFORMATIONS PRODUIT */}
          <div className="space-y-8">
            
            {/* EN-TÊTE PRODUIT */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-wider text-[#2D6A4F]">
                    {product.category}
                  </p>
                  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                </div>
                
                {/* Badge POPULAIRE */}
                {product.rating && product.rating >= 4.5 && (
                  <div className="rounded-full bg-[#2D6A4F] px-4 py-2">
                    <span className="text-sm font-bold text-white">PLUS POPULAIRE</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < Math.floor(product.rating!)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({Math.floor(Math.random() * 50) + 10} avis)
                  </span>
                </div>
              )}

              {/* Prix */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#2D6A4F]">
                  {product.price}
                </span>
                {product.numericPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {(product.numericPrice * 1.3).toFixed(2)}€
                  </span>
                )}
              </div>
            </div>

            {/* SÉLECTEUR DE QUANTITÉ */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-900">Quantité</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-gray-300 bg-white">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 border-0 text-center text-lg font-medium focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="p-3 text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  En stock
                </span>
              </div>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full rounded-lg bg-[#2D6A4F] hover:bg-[#1F4A36] text-white font-semibold text-lg py-4 transition-colors"
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Ajouter au panier
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-lg border-gray-300 hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Favoris
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-lg border-gray-300 hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
              </div>
            </div>

            {/* SERVICES GARANTIS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Truck className="h-5 w-5 text-[#2D6A4F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Livraison offerte</p>
                  <p className="text-xs text-gray-600">Dès 50€ d'achat</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Shield className="h-5 w-5 text-[#2D6A4F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Garantie qualité</p>
                  <p className="text-xs text-gray-600">Satisfait ou remboursé</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <RefreshCw className="h-5 w-5 text-[#2D6A4F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Retour facile</p>
                  <p className="text-xs text-gray-600">30 jours</p>
                </div>
              </div>
            </div>

            {/* CARACTÉRISTIQUES PRINCIPALES */}
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Caractéristiques principales</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Personnalisation complète</p>
                    <p className="text-sm text-gray-600">Thèmes, textes, couleurs selon vos préférences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Qualité premium</p>
                    <p className="text-sm text-gray-600">Impression HD et matériaux résistants</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Fabrication française</p>
                    <p className="text-sm text-gray-600">15-25 jours ouvrés</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Design unique</p>
                    <p className="text-sm text-gray-600">Créations originales et exclusives</p>
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION DÉTAILLÉE */}
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p>
                  {product.longDescription || product.description || `${product.name} est un produit personnalisé de haute qualité, créé avec soin pour sublimer vos événements spéciaux. Chaque pièce est fabriquée selon vos spécifications pour garantir un résultat unique et mémorable.`}
                </p>
                <p>
                  Idéal pour les anniversaires, baptêmes, baby showers, 
                  ou toute autre célébration méritant une touche personnelle 
                  et élégante.
                </p>
              </div>
            </div>

            {/* SÉLECTEUR DE THÈME */}
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choisissez votre thème</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`rounded-lg border-2 p-4 text-center transition-all ${
                      selectedTheme.id === theme.id
                        ? "border-[#2D6A4F] bg-[#2D6A4F] text-white"
                        : "border-gray-300 bg-white hover:border-[#2D6A4F]"
                    }`}
                  >
                    <div className={`mx-auto h-8 w-8 rounded-full ${theme.color} mb-3`} />
                    <p className="text-sm font-medium">{theme.name}</p>
                  </button>
                ))}
              </div>
              
              {selectedTheme && (
                <div className="mt-4 rounded-lg bg-gray-50 p-4 border border-[#2D6A4F]">
                  <p className="text-sm font-medium text-gray-900">
                    Thème sélectionné : <span className="text-[#2D6A4F]">{selectedTheme.name}</span>
                  </p>
                </div>
              )}
            </div>

            {/* INFORMATIONS TECHNIQUES */}
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations techniques</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-900">Matériaux</p>
                  <p className="text-sm text-gray-600">{product.materials || "Papier premium, encres de qualité"}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-900">Dimensions</p>
                  <p className="text-sm text-gray-600">{product.dimensions || "Variable selon le produit"}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-900">Délai de fabrication</p>
                  <p className="text-sm text-gray-600">{product.deliveryTime || "15-25 jours ouvrés"}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-900">Pays d'origine</p>
                  <p className="text-sm text-gray-600">France</p>
                </div>
              </div>
            </div>

            {/* LIENS UTILES */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-300">
              <Link 
                href="/contact" 
                className="text-sm text-[#2D6A4F] hover:text-[#1F4A36] font-medium transition-colors"
              >
                Besoin d'aide ? Contactez-nous
              </Link>
              <Link 
                href="/boutique" 
                className="text-sm text-[#2D6A4F] hover:text-[#1F4A36] font-medium transition-colors"
              >
                Voir d'autres produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
