"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  ChevronDown, 
  Star, 
  Shield, 
  Printer, 
  RefreshCw, 
  CreditCard, 
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  FileText,
  Truck,
  Eye
} from "lucide-react";

interface PricingTier {
  id: string;
  label: string;
  minQuantity: number;
  maxQuantity: number;
  unitPrice: number;
  isPopular?: boolean;
}

interface ProductPageCompleteProps {
  product: {
    id: string;
    name: string;
    subtitle?: string;
    image: string;
    images: string[];
    price: string;
    description?: string;
    features: string[];
  };
}

export default function ProductPageComplete({ product }: ProductPageCompleteProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState("1-5");
  const [activeTab, setActiveTab] = useState("description");
  const [personalization, setPersonalization] = useState("");

  const themes = [
    { id: "avengers", name: "Avengers" },
    { id: "minnie", name: "Minnie" },
    { id: "roi-lion", name: "Roi Lion" },
    { id: "princesse", name: "Princesse" },
    { id: "paw-patrol", name: "Paw Patrol" },
    { id: "spiderman", name: "Spiderman" }
  ];

  const pricingTiers: PricingTier[] = [
    {
      id: "1-5",
      label: "1–5 unités",
      minQuantity: 1,
      maxQuantity: 5,
      unitPrice: 2.99,
    },
    {
      id: "6-20",
      label: "6–20 unités",
      minQuantity: 6,
      maxQuantity: 20,
      unitPrice: 2.49,
      isPopular: true,
    },
    {
      id: "20+",
      label: "20+",
      minQuantity: 20,
      maxQuantity: 999,
      unitPrice: 0,
    }
  ];

  const badges = [
    { icon: Truck, text: "Livraison offerte dès 50€" },
    { icon: Eye, text: "Aperçu sous 24h" },
    { icon: Printer, text: "Impression HD 300 DPI" },
    { icon: RefreshCw, text: "Modifications incluses" },
    { icon: CreditCard, text: "Paiement sécurisé" },
    { icon: Heart, text: "Satisfait ou retouché" },
  ];

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GALERIE GAUCHE */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Image principale */}
              <div className="relative aspect-square bg-[#E8E0D4] rounded-xl overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-[#E8E0D4] rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-[#C8A96E]' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - vue ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PANNEAU DROITE */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              
              {/* Nom et sous-titre */}
              <div>
                <h1 className="font-serif text-2xl font-bold text-[#3C2415]" style={{ fontFamily: 'Playfair Display' }}>
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="mt-2 text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* BADGES RÉASSURANCE */}
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-3 bg-[#FAF7F2] border border-[#E8E0D4] rounded-lg"
                    >
                      <Icon size={16} className="text-[#C8A96E]" />
                      <span className="text-xs text-[#3C2415]">{badge.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* SÉLECTEUR THÈME */}
              <div>
                <label className="block text-sm font-medium text-[#3C2415] mb-3">Thème</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        selectedTheme === theme.id
                          ? 'bg-[#C8A96E] text-white'
                          : 'bg-white border border-[#E8E0D4] text-[#3C2415] hover:border-[#C8A96E]'
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* CHAMP PERSONNALISATION */}
              <div>
                <label className="block text-sm font-medium text-[#3C2415] mb-3">Personnalisation</label>
                <textarea
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                  placeholder="Prénom et/ou âge"
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E8E0D4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent"
                />
              </div>

              {/* PRICING TIERS */}
              <div>
                <label className="block text-sm font-medium text-[#3C2415] mb-3">Quantité</label>
                <div className="space-y-3">
                  {pricingTiers.map((tier) => {
                    const isTier20Plus = tier.id === "20+";
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedTier === tier.id
                            ? 'border-[#C8A96E] bg-[#FAF7F2]'
                            : 'border-[#E8E0D4] bg-white hover:border-[#C8A96E]'
                        } ${tier.isPopular ? 'ring-2 ring-[#C8A96E]/20' : ''}`}
                      >
                        {tier.isPopular && (
                          <div className="absolute -top-2 -right-2 bg-[#C8A96E] text-white text-xs px-2 py-1 rounded-full">
                            Le plus populaire
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#3C2415]">{tier.label}</span>
                          {!isTier20Plus && (
                            <span className="text-lg font-bold text-[#3C2415]">
                              {tier.unitPrice.toFixed(2).replace('.', ',')}€/u
                            </span>
                          )}
                        </div>
                        {isTier20Plus && (
                          <span className="text-sm text-[#3C2415]">Sur devis</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COMPTEUR QUANTITÉ */}
              <div>
                <label className="block text-sm font-medium text-[#3C2415] mb-3">Quantité</label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 rounded-lg border border-[#E8E0D4] bg-white flex items-center justify-center hover:border-[#C8A96E]"
                  >
                    <Minus size={16} className="text-[#3C2415]" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border border-[#E8E0D4] rounded-lg py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96E] focus:border-transparent"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 rounded-lg border border-[#E8E0D4] bg-white flex items-center justify-center hover:border-[#C8A96E]"
                  >
                    <Plus size={16} className="text-[#3C2415]" />
                  </button>
                </div>
              </div>

              {/* CTA PRINCIPAL */}
              <button className="w-full py-4 px-6 rounded-lg font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 bg-[#3C2415] hover:bg-[#C8A96E]">
                <ShoppingBag size={20} />
                Ajouter au panier
              </button>

              {/* CTA SECONDAIRE */}
              <button className="w-full py-3 px-6 rounded-lg font-semibold text-[#3C2415] border-2 border-[#C8A96E] transition-all hover:bg-[#C8A96E] hover:text-white">
                Demander un devis
              </button>
            </div>
          </div>
        </div>

        {/* TABS EN BAS */}
        <div className="mt-16 border-t border-[#E8E0D4]">
          <div className="flex space-x-8">
            {["description", "guide-impression", "avis"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-[#C8A96E] border-b-2 border-[#C8A96E]"
                    : "text-[#6B6B6B] hover:text-[#3C2415]"
                }`}
              >
                {tab === "description" && "Description"}
                {tab === "guide-impression" && "Guide impression"}
                {tab === "avis" && "Avis"}
              </button>
            ))}
          </div>
          
          <div className="bg-white p-8">
            {activeTab === "description" && (
              <div className="prose max-w-none text-[#6B6B6B]">
                <h3 className="text-lg font-semibold mb-4 text-[#3C2415]">Description</h3>
                <p className="text-sm leading-relaxed">
                  {product.description || "Étiquettes personnalisées de confiseries pour rendre vos événements encore plus magiques. Nos créations uniques sont entièrement personnalisables selon vos envies."}
                </p>
              </div>
            )}
            
            {activeTab === "guide-impression" && (
              <div className="prose max-w-none text-[#6B6B6B]">
                <h3 className="text-lg font-semibold mb-4 text-[#3C2415]">Guide d'impression</h3>
                <div className="space-y-3 text-sm">
                  <p>• Utilisez du papier de qualité 200-300g/m²</p>
                  <p>• Imprimez en mode haute qualité (300 DPI)</p>
                  <p>• Découpez soigneusement les étiquettes</p>
                  <p>• Appliquez sur des surfaces propres et sèches</p>
                </div>
              </div>
            )}
            
            {activeTab === "avis" && (
              <div className="text-center text-[#6B6B6B]">
                <p>Aucun avis pour le moment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
