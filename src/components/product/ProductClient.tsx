"use client"

import { products } from "@/data/products"
import ProductGallery from "@/components/produit/ProductGallery"
import ProductInfo from "@/components/produit/ProductInfo"
import ProductTabsComplete from "@/components/produit/ProductTabsComplete"
import { useState } from "react"
import { useCartStore } from "@/store/cartStore"
import { phTrackAddToCart, trackAddToCart } from "@/lib/analytics"
import { Download, CheckCircle, ShoppingBag } from "lucide-react"

interface ProductClientProps {
  slug: string
}

export default function ProductClient({ slug }: ProductClientProps) {
  const product = products.find((p) => p.slug === slug)
  const [selectedTheme, setSelectedTheme] = useState("")
  const [qty, setQty] = useState(1)
  const { addItem } = useCartStore()

  // Vérifier si le produit est numérique (à adapter selon votre structure de données)
  const estNumerique = product?.estNumerique || false

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
    <div style={{ backgroundColor: '#FAF7F2', paddingBottom: '5rem' }} className="lg:pb-0">
      <div className="w-full flex flex-col">
        {/* Conteneur principal avec grid 2 colonnes */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Badges pour produits numériques */}
          {estNumerique && (
            <div className="flex justify-center gap-4 mb-6">
              <div 
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: '#FFE4E8', color: '#993556' }}
              >
                Numérique
              </div>
              <div 
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: '#EAF3DE', color: '#3B6D11' }}
              >
                Impression illimitée
              </div>
            </div>
          )}

          {/* Grid 2 colonnes : Image + Infos */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <ProductGallery product={product} />
              
              {/* Section contenu du téléchargement pour produits numériques */}
              {estNumerique && (
                <div 
                  className="mt-8 p-6 rounded-xl"
                  style={{ backgroundColor: 'var(--color-background-secondary, #F9FAFB)' }}
                >
                  <h3 className="text-lg font-semibold mb-4 text-[#2C2C2C]">
                    Contenu du téléchargement
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-[#4B5563]">
                        Fichier PDF haute résolution — Prêt à imprimer 300 DPI
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-[#4B5563]">
                        Fichier PNG transparent — Fond transparent inclus
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-[#4B5563]">
                        Guide d'impression inclus — Instructions détaillées
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Section informations complémentaires pour produits numériques */}
              {estNumerique && (
                <div 
                  className="mt-6 p-6 rounded-xl"
                  style={{ backgroundColor: 'var(--color-background-secondary, #F9FAFB)' }}
                >
                  <h3 className="text-lg font-semibold mb-4 text-[#2C2C2C]">
                    Informations complémentaires
                  </h3>
                  <div className="space-y-3 text-sm text-[#6B6B6B]">
                    <p>• Étiquette au format PDF pour impression sur feuille A4</p>
                    <p>• Fichier haute résolution</p>
                    <p>• Aucun produit physique n'est vendu, le contenu est entièrement digital</p>
                    <p>• Nous n'apportons pas de modifications à nos conceptions ou aux mesures de nos produits</p>
                    <p>• Vous serez responsable de l'impression et de l'assemblage</p>
                    <p>• Pour une qualité optimale, privilégiez du papier brillant</p>
                    <p>• Pour l'assemblage, optez pour du ruban adhésif double face ou un pistolet à colle</p>
                    <p>• Après l'envoi du lien de téléchargement, nous ne procédons à aucun retour, modification ou remboursement</p>
                    <p>• Veuillez lire la description avant achat</p>
                  </div>
                </div>
              )}
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
              
              {/* Badge "Téléchargement immédiat" pour produits numériques */}
              {estNumerique && (
                <div 
                  className="mt-4 px-4 py-2 rounded-full text-center text-sm font-semibold"
                  style={{ backgroundColor: '#EAF3DE', color: '#3B6D11' }}
                >
                  Téléchargement immédiat
                </div>
              )}

              {/* Deux boutons CTA pour produits numériques */}
              {estNumerique && (
                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => handleAddToCart()}
                    className="w-full py-3.5 px-4 rounded-lg font-semibold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#6B3A2A', color: 'white' }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Ajouter au panier — {product.price} EUR
                  </button>
                  <button
                    onClick={() => handleAddToCart()}
                    className="w-full py-3.5 px-4 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C8A96E', color: 'white' }}
                  >
                    Acheter maintenant
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section onglets adaptée à la largeur des 10 onglets */}
        <div className="w-full mt-0">
          <ProductTabsComplete product={product} />
        </div>
      </div>

      {/* Section "Comment ça marche" pour produits numériques */}
      {estNumerique && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C2C2C] mb-4">
              Comment ça marche
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Recevez votre fichier personnalisé en 4 étapes simples
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Étape 1 */}
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                style={{ backgroundColor: '#6B3A2A' }}
              >
                1
              </div>
              <h3 className="font-semibold text-[#2C2C2C] mb-2">
                Tu passes commande
              </h3>
              <p className="text-[#6B6B6B] text-sm">
                avec tes informations de personnalisation
              </p>
            </div>

            {/* Étape 2 */}
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                style={{ backgroundColor: '#6B3A2A' }}
              >
                2
              </div>
              <h3 className="font-semibold text-[#2C2C2C] mb-2">
                Jay's Creations crée
              </h3>
              <p className="text-[#6B6B6B] text-sm">
                ton fichier sous 72h
              </p>
            </div>

            {/* Étape 3 */}
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                style={{ backgroundColor: '#C8A96E' }}
              >
                3
              </div>
              <h3 className="font-semibold text-[#2C2C2C] mb-2">
                Tu reçois un lien
              </h3>
              <p className="text-[#6B6B6B] text-sm">
                de téléchargement par email
              </p>
            </div>

            {/* Étape 4 */}
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                style={{ backgroundColor: '#C8A96E' }}
              >
                4
              </div>
              <h3 className="font-semibold text-[#2C2C2C] mb-2">
                Tu imprimes
              </h3>
              <p className="text-[#6B6B6B] text-sm">
                autant de fois que tu veux !
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Bouton sticky "Ajouter au panier" pour mobile - amélioré */}
      {product.themes && product.themes.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-[#8B4513]/20 shadow-lg p-4 z-50 lg:hidden" style={{ backgroundColor: '#FAF7F2' }}>
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
        <div className="fixed bottom-0 left-0 right-0 border-t border-[#8B4513]/20 shadow-lg p-4 z-50 lg:hidden" style={{ backgroundColor: '#FAF7F2' }}>
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
