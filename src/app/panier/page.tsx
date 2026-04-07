"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import { validateCoupon, calculateDiscount, formatDiscountValue, OFFICIAL_COUPONS } from "@/lib/discounts";

export default function PanierPage() {
  const { items, removeItem, updateQuantite, clearCart } = useCartStore();
  const [codePromo, setCodePromo] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [promoError, setPromoError] = useState('');
  const [hydrated, setHydrated] = useState(false);
  
  const sousTotal = items.reduce(
    (acc, item) => acc + (item.prix * item.quantite), 0
  );

  // Debug pour voir l'état du panier
  useEffect(() => {
    console.log('🛒 Panier - Items:', items);
    console.log('🛒 Panier - Sous-total:', sousTotal);
  }, [items, sousTotal]);

  // Hydrater le store côté client
  useEffect(() => {
    // Forcer l'hydratation du store
    const hasHydrated = useCartStore.persist.hasHydrated();
    if (!hasHydrated) {
      useCartStore.persist.rehydrate();
    }
    setHydrated(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleApplyPromo = () => {
    setPromoError('');
    setAppliedCoupon(null);
    
    if (!codePromo.trim()) {
      setPromoError('Veuillez entrer un code promo');
      return;
    }
    
    const coupon = validateCoupon(codePromo, sousTotal);
    
    if (coupon) {
      setAppliedCoupon(coupon);
      setPromoError('');
    } else {
      setPromoError('Code promo invalide ou conditions non remplies');
    }
  };

  const getRemise = () => {
    if (!appliedCoupon) return 0;
    return calculateDiscount(appliedCoupon, sousTotal);
  };

  const getRemiseLivraison = () => {
    if (!appliedCoupon || appliedCoupon.type !== 'livraison_gratuite') return 0;
    // Simulation des frais de livraison (5.90€)
    return 5.90;
  };

  const totalAvecRemise = sousTotal - getRemise();

  
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
          <PrimaryCtaButton onClick={clearCart} showArrow={false} className="text-sm">
            Vider le panier
          </PrimaryCtaButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Articles */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} 
                className="bg-white rounded-2xl p-6 border border-[#E8E4DF] 
                flex gap-6 items-center">
                
                {/* Image */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img 
                    src={item.image || "/images/products/placeholder.png"}
                    alt={item.nom}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                
                {/* Détails */}
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <Link href={`/produit/${item.slug}`}
                      className="cursor-pointer font-semibold text-[#8B4513] 
                      hover:text-[#6b3410] hover:underline transition-colors 
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
                      className="cursor-pointer text-[#8B4513] hover:text-[#6b3410] transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#E8E4DF] sticky top-8">
              <h2 className="text-lg font-bold text-[#8B4513] mb-6">
                Récapitulatif
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Sous-total</span>
                  <span className="font-medium text-[#8B4513]">
                    {formatPrice(sousTotal)}
                  </span>
                </div>
                
                {/* Section Coupon */}
                <div className="border-t border-[#E8E4DF] pt-4">
                  <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] p-4 rounded-xl mb-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white p-2 rounded-full">
                        <Tag size={20} className="text-[#8B4513]" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Coupon de réduction</h3>
                        <p className="text-white/90 text-sm">Profitez de nos offres exclusives !</p>
                      </div>
                    </div>
                    
                    {!appliedCoupon ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={codePromo}
                          onChange={(e) => setCodePromo(e.target.value)}
                          placeholder="Entrez votre code coupon"
                          className="w-full px-4 py-3 border-2 border-white/30 rounded-lg text-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 bg-white/95 placeholder-gray-500 mb-3"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="w-full px-4 py-3 bg-white text-[#8B4513] rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors shadow-md"
                        >
                          Appliquer le coupon
                        </button>
                        {promoError && (
                          <div className="bg-red-500/20 border border-red-400 p-2 rounded-lg">
                            <p className="text-red-100 text-xs font-medium">{promoError}</p>
                          </div>
                        )}
                        <div className="bg-white/20 backdrop-blur p-3 rounded-lg">
                          <p className="text-white text-xs font-medium mb-2">?? Codes disponibles :</p>
                          <div className="space-y-2">
                            {OFFICIAL_COUPONS.filter(c => c.statut === 'actif').slice(0, 2).map(coupon => (
                              <div key={coupon.id} className="flex items-center justify-between">
                                <code className="bg-white/30 px-3 py-1 rounded text-white font-bold text-sm">{coupon.code}</code>
                                <span className="text-white/90 text-xs">{formatDiscountValue(coupon)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-500/20 backdrop-blur border-2 border-green-400 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-400 p-2 rounded-full">
                              <span className="text-white text-lg">🎉</span>
                            </div>
                            <div>
                              <span className="text-white font-bold text-sm">
                                Coupon {appliedCoupon.code} appliqué !
                              </span>
                              <p className="text-white/90 text-xs">{appliedCoupon.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setAppliedCoupon(null);
                              setCodePromo('');
                              setPromoError('');
                            }}
                            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {getRemise() > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-medium">Réduction ({formatDiscountValue(appliedCoupon)})</span>
                    <span className="text-green-600 font-medium">
                      -{formatPrice(getRemise())}
                    </span>
                  </div>
                )}
                
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
                  <span className="text-xl font-bold text-[#2C2C2C]">Total</span>
                  <span className="text-2xl font-bold text-[#8B4513]">
                    {formatPrice(totalAvecRemise)}
                  </span>
                </div>
              </div>
              
              {/* Message de réassurance */}
              <div className="bg-[#FAF7F2] p-4 rounded-lg text-sm text-[#6B6B6B] mb-6">
                <p className="mb-1">✓ Livraison offerte dès 50€ d'achat</p>
                <p className="mb-1">✓ Modifications jusqu'à validation</p>
                <p>✓ Satisfait ou remboursé 30 jours</p>
              </div>
              
              {/* Boutons d'action */}
              <div className="space-y-3 mt-6">
                <PrimaryCtaButton href="/commande" className="w-full">
                  Commander
                </PrimaryCtaButton>
                <PrimaryCtaButton href="/boutique" className="w-full">
                  Continuer mes achats
                </PrimaryCtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
