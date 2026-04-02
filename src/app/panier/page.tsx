"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import { useState, useEffect } from "react";

export default function PanierPage() {
  const { items, removeItem, updateQuantite, clearCart } = useCartStore();
  const [hasHydrated, setHasHydrated] = useState(false);
  
  // Gérer l'hydratation côté client
  useEffect(() => {
    setHasHydrated(true);
  }, []);
  
  // Attendre l'hydratation du store avant d'afficher le contenu
  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]"></div>
          <p className="mt-4 text-[#6B6B6B]">Chargement du panier...</p>
        </div>
      </div>
    );
  }
  
  const sousTotal = items.reduce(
    (acc, item) => acc + (item.prix * item.quantite), 0
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl border border-[#E8E4DF] px-10 py-12 shadow-[0_18px_45px_rgba(0,0,0,0.04)] max-w-md">
          <div className="bg-[#FAF7F2] rounded-full p-3 mx-auto mb-4 w-fit">
            <ShoppingBag size={48} className="text-[#8B4513]" />
          </div>
          <h2 className="text-[#2C1A0E] font-semibold text-xl mb-2">
            Votre panier est vide
          </h2>
          <p className="text-[#6B6B6B] text-sm max-w-md mx-auto mb-8">
            Découvrez nos créations personnalisées et ajoutez vos articles préférés pour commencer votre commande.
          </p>
          <PrimaryCtaButton href="/boutique">
            Découvrir la boutique
          </PrimaryCtaButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jc-bg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/boutique"
            className="cursor-pointer flex items-center gap-3 text-jc-accent hover:text-jc-accent-dark transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Continuer mes achats</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#8B4513]">
            Mon Panier ({items.reduce((sum, item) => sum + item.quantite, 0)} articles)
          </h1>
          <button
            onClick={clearCart}
            className="cursor-pointer px-6 py-2 bg-[#8B4513] text-white 
            rounded-full font-medium hover:bg-[#D4A574] hover:text-white
            transition-colors duration-200 shadow-sm"
          >
            Vider le panier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Articles */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={48} className="text-[#8B4513] mx-auto mb-4" />
                <p className="text-[#8B4513]">Votre panier est vide</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} 
                  className="bg-white rounded-2xl p-6 border border-[#E8E4DF] 
                  flex gap-6 items-center">
                  
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.image || "/images/products/placeholder.svg"}
                      alt={item.nom}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Détails */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <Link href={`/produit/${item.slug}`}
                        className="cursor-pointer font-semibold text-[#2C2C2C] 
                        hover:text-[#8B4513] hover:underline transition-colors 
                        block truncate">
                        {item.nom}
                      </Link>
                      {item.theme && (
                        <span className="text-xs text-[#8B4513] capitalize ml-2">
                          Thème : {item.theme}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => updateQuantite(item.id, Math.max(1, item.quantite - 1))}
                        className="cursor-pointer w-8 h-8 rounded-full border border-[#E8E4DF] 
                        flex items-center justify-center hover:border-[#8B4513] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-12 text-center font-medium text-[#8B4513]">
                        {item.quantite}
                      </span>
                      <button
                        onClick={() => updateQuantite(item.id, item.quantite + 1)}
                        className="cursor-pointer w-8 h-8 rounded-full border border-[#E8E4DF] 
                        flex items-center justify-center hover:border-[#8B4513] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#6B6B6B]">Prix unitaire</p>
                        <p className="font-bold text-[#8B4513]">
                          {formatPrice(item.prix)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="cursor-pointer text-[#8B4513] hover:text-[#A0522D] transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#E8E4DF] sticky top-8">
              <h2 className="text-lg font-bold text-[#8B4513] mb-6">
                Récapitulatif
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B6B6B]">Sous-total</span>
                  <span className="font-medium text-[#8B4513]">
                    {formatPrice(sousTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Livraison</span>
                  <span className="text-green-600 font-medium">Gratuite</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">TVA</span>
                  <span className="font-medium text-[#2C2C2C]">Incluse</span>
                </div>
              </div>
              
              <div className="border-t border-[#E8E4DF] pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#8B4513]">Total</span>
                  <span className="text-2xl font-bold text-[#8B4513]">
                    {formatPrice(sousTotal)}
                  </span>
                </div>
              </div>
              
              {/* Message de réassurance */}
              <div className="bg-[#FAF7F2] p-4 rounded-lg text-sm text-[#6B6B6B] mb-6">
                <p className="mb-1">✓ Livraison offerte dès 50€ d'achat</p>
                <p className="mb-1">✓ Modifications jusqu'à validation</p>
                <p>✓ Service client 7j/7</p>
              </div>
              
              {/* Boutons d'action */}
              <div className="mt-8">
                <Link href="/commande">
                  <button className="cursor-pointer w-full bg-[#8B4513] text-white 
                    text-center py-4 rounded-full font-medium hover:bg-[#D4A574] hover:text-white
                    transition-colors duration-200 shadow-sm">
                    Commander
                  </button>
                </Link>
              </div>
              
              <div className="mt-6">
                <Link href="/boutique">
                  <button className="cursor-pointer w-full bg-[#8B4513] text-white 
                    text-center py-4 rounded-full font-medium hover:bg-[#D4A574] hover:text-white
                    transition-colors duration-200 shadow-sm">
                    Continuer mes achats
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
