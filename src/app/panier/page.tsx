"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import { validateCoupon, calculateDiscount, formatDiscountValue, OFFICIAL_COUPONS } from "@/lib/discounts";
import { phTrackCheckout, trackBeginCheckout } from "@/lib/analytics";
import FreeShippingBar from "@/components/ui/FreeShippingBar";

export default function PanierPage() {
  const { items, removeItem, updateQuantite, clearCart } = useCartStore();
  const [codePromo, setCodePromo] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [promoError, setPromoError] = useState('');
  const [hydrated, setHydrated] = useState(false);
  
  // Constante pour le seuil de livraison gratuite
  const SEUIL_LIVRAISON_GRATUITE = 50;
  
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

  // Debug pour voir les valeurs exactes
  useEffect(() => {
    console.log('ð Panier Debug:');
    console.log('- sousTotal:', sousTotal);
    console.log('- getRemise():', getRemise());
    console.log('- totalAvecRemise:', totalAvecRemise);
    console.log('- items:', items.map(item => ({ nom: item.nom, prix: item.prix, quantite: item.quantite })));
  }, [sousTotal, totalAvecRemise, items]);

  const handleCheckout = () => {
    // Track checkout initiation
    phTrackCheckout(totalAvecRemise, items);
    
    // Track checkout initiation in Google Analytics 4
    trackBeginCheckout(items);
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
      <div className="max-w-6xl mx-auto px-3 py-4 sm:px-4 sm:py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link href="/boutique"
            className="cursor-pointer flex items-center gap-2 text-jc-accent hover:text-jc-accent-dark transition-colors">
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Retour boutique</span>
          </Link>
          <h1 className="text-xl font-bold text-[#8B4513] text-center">
            Panier ({items.reduce((sum, item) => sum + item.quantite, 0)} art.)
          </h1>
          <PrimaryCtaButton onClick={clearCart} showArrow={false} className="text-xs py-1.5">
            Vider
          </PrimaryCtaButton>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8">
          
          {/* Articles - full width sur mobile */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} 
                className="bg-white rounded-lg p-4 sm:p-4 border border-[#E8E4DF] 
                flex flex-col sm:flex-row gap-4">
                
                {/* Image */}
                <div className="relative w-20 h-20 sm:w-20 sm:h-20 flex-shrink-0 mx-auto sm:mx-0">
                  <Image 
                    src={item.image || "/images/products/placeholder.png"}
                    alt={item.nom}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Détails */}
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <Link href={`/produit/${item.slug}`}
                      className="cursor-pointer font-semibold text-[#8B4513] text-base sm:text-base
                      hover:text-[#6b3410] hover:underline transition-colors 
                      block truncate">
                      {item.nom}
                    </Link>
                    {item.theme && (
                      <span className="text-sm text-[#8B4513] capitalize block mt-1">
                        {item.theme}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => updateQuantite(item.id, Math.max(1, item.quantite - 1))}
                      className="cursor-pointer w-10 h-10 rounded-full border border-[#E8E4DF] 
                      flex items-center justify-center hover:border-[#8B4513] transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium text-[#8B4513] text-base">
                      {item.quantite}
                    </span>
                    <button
                      onClick={() => updateQuantite(item.id, item.quantite + 1)}
                      className="cursor-pointer w-10 h-10 rounded-full border border-[#E8E4DF] 
                      flex items-center justify-center hover:border-[#8B4513] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6B6B6B]">Prix/unitaire</p>
                      <p className="font-bold text-[#8B4513] text-base">
                        {formatPrice(item.prix)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer text-[#8B4513] hover:text-[#6b3410] transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Récapitulatif - sticky sur desktop, normal sur mobile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-[#E8E4DF] lg:sticky lg:top-8">
              <h2 className="text-lg sm:text-lg font-bold text-[#8B4513] mb-4 sm:mb-6">
                Récapitulatif
              </h2>
              
              {/* Barre de livraison gratuite */}
              <FreeShippingBar total={totalAvecRemise} />
              
              <div className="space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
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
                        <p className="text-white/90 text-sm whitespace-nowrap">Profitez de nos offres exclusives !</p>
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
                          <div className="flex items-center gap-2 mb-2">
                      <Tag size={14} className="text-white" />
                      <p className="text-white text-xs font-medium">Codes disponibles :</p>
                    </div>
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
                  <span className="text-[#8B4513] font-medium">
                    {totalAvecRemise >= SEUIL_LIVRAISON_GRATUITE ? 'Gratuite' : 'Calculée à l\'étape suivante'}
                  </span>
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
                <p>✓ Service client disponible 7j/7</p>
              </div>
              
              {/* Boutons d'action - optimisés mobile */}
              <div className="space-y-3 mt-6">
                <Link href="/commande" onClick={handleCheckout}>
                  <PrimaryCtaButton className="w-full py-4 text-base min-h-[52px]">
                    Commander
                  </PrimaryCtaButton>
                </Link>
                <PrimaryCtaButton href="/boutique" className="w-full py-3 text-sm min-h-[44px]">
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
