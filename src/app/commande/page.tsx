"use client";

import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ShoppingBag, User, Mail, Phone, MapPin, Edit3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  pays: string;
  personnalisation: string;
}

export default function CommandePage() {
  const { items, clearCart } = useCartStore();
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
    pays: 'France',
    personnalisation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Gérer l'hydratation côté client
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Source de vérité unique pour le total
  const orderTotal = items.reduce((sum, item) => {
    const unitPrice = Number(item.prix) || 0;
    const quantity = Number(item.quantite) || 0;
    return sum + unitPrice * quantity;
  }, 0);

  // Calcul du total avec réduction
  const finalTotal = Math.max(0, orderTotal - discount);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'GRATUIT100' || couponCode.toUpperCase() === 'FREE100') {
      setDiscount(orderTotal); // 100% de réduction
      alert('🎉 Coupon 100% appliqué ! Votre commande est gratuite.');
    } else {
      alert('❌ Code coupon invalide');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          client: formData,
          total: finalTotal,
          coupon: couponCode.toUpperCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Erreur lors de la création de la session Stripe');
      }

      if (!data?.url) {
        throw new Error('Aucune URL Stripe retournée');
      }

      window.location.href = data.url;
    } catch (error) {
      setIsLoading(false);
      alert(error instanceof Error ? error.message : 'Erreur Stripe');
    }
  };

  // Afficher un état de chargement pendant l'hydratation
  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#6B6B6B]">Chargement de votre panier...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-[#8B4513] mb-6" />
            <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
              Votre panier est vide
            </h1>
            <p className="text-[#6B6B6B] mb-8">
              Ajoutez des articles à votre panier pour passer commande
            </p>
            <Link href="/boutique">
              <Button className="bg-[#8B4513] hover:bg-[#6b3410] hover:text-[#D4A574] text-white">
                Retour à la boutique
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/boutique">
            <Button variant="ghost" className="text-[#8B4513] hover:bg-[#8B4513]">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#2C2C2C]">
            Finaliser ma commande
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Récapitulatif commande */}
          <Card className="bg-white border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#2C2C2C] flex items-center gap-2">
                <ShoppingBag size={24} />
                Récapitulatif de la commande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-[#FAF7F2] rounded-lg">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.nom}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#2C2C2C]">{item.nom}</h4>
                    {item.theme && (
                      <p className="text-sm text-[#6B6B6B]">Thème: {item.theme}</p>
                    )}
                    <p className="text-sm text-[#6B6B6B]">Quantité: {item.quantite}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#8B4513]">
                      {formatPrice(item.prix * item.quantite)}
                    </p>
                  </div>
                </div>
              ))}
              
              <Separator className="bg-[#8B4513]" />
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-bold text-[#2C2C2C]">Total</span>
                <span className="text-2xl font-bold text-[#8B4513]">
                  {formatPrice(orderTotal)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Formulaire client */}
          <Card className="bg-white border-[#8B4513]">
            <CardHeader>
              <CardTitle className="text-[#2C2C2C] flex items-center gap-2">
                <User size={24} />
                Informations de livraison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom" className="text-[#2C2C2C]">
                        Prénom *
                      </Label>
                      <Input
                        id="prenom"
                        value={formData.prenom}
                        onChange={(e) => handleInputChange('prenom', e.target.value)}
                        required
                        className="border-[#8B4513] focus:border-[#6b3410]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nom" className="text-[#2C2C2C]">
                        Nom *
                      </Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => handleInputChange('nom', e.target.value)}
                        required
                        className="border-[#8B4513] focus:border-[#6b3410]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-[#2C2C2C] flex items-center gap-2">
                      <Mail size={16} />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="border-[#8B4513] focus:border-[#6b3410]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="telephone" className="text-[#2C2C2C] flex items-center gap-2">
                      <Phone size={16} />
                      Téléphone *
                    </Label>
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      required
                      className="border-[#8B4513] focus:border-[#6b3410]"
                    />
                  </div>
                </div>

                <Separator className="bg-[#8B4513]" />

                {/* Adresse de livraison */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="adresse" className="text-[#2C2C2C] flex items-center gap-2">
                      <MapPin size={16} />
                      Adresse *
                    </Label>
                    <Input
                      id="adresse"
                      value={formData.adresse}
                      onChange={(e) => handleInputChange('adresse', e.target.value)}
                      required
                      className="border-[#8B4513] focus:border-[#6b3410]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="codePostal" className="text-[#2C2C2C]">
                        Code postal *
                      </Label>
                      <Input
                        id="codePostal"
                        value={formData.codePostal}
                        onChange={(e) => handleInputChange('codePostal', e.target.value)}
                        required
                        className="border-[#8B4513] focus:border-[#6b3410]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ville" className="text-[#2C2C2C]">
                        Ville *
                      </Label>
                      <Input
                        id="ville"
                        value={formData.ville}
                        onChange={(e) => handleInputChange('ville', e.target.value)}
                        required
                        className="border-[#8B4513] focus:border-[#6b3410]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pays" className="text-[#2C2C2C]">
                        Pays *
                      </Label>
                      <Input
                        id="pays"
                        value={formData.pays}
                        onChange={(e) => handleInputChange('pays', e.target.value)}
                        required
                        className="border-[#8B4513] focus:border-[#6b3410]"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#8B4513]" />

                {/* Section Coupon */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-[#2C2C2C] flex items-center gap-2">
                      🎫 Code de réduction
                    </Label>
                    <button
                      type="button"
                      onClick={() => setShowCouponInput(!showCouponInput)}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      {showCouponInput ? 'Masquer' : 'Ajouter'}
                    </button>
                  </div>
                  
                  {showCouponInput && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Entrez votre code promo"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="border-green-300 focus:border-green-500"
                        />
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                          Appliquer
                        </button>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex items-center justify-between bg-green-100 p-2 rounded">
                          <span className="text-green-800">
                            🎉 Coupon appliqué : -{formatPrice(discount)}
                          </span>
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                      
                      <div className="text-xs text-green-600">
                        Codes valides : GRATUIT100, FREE100
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="bg-[#8B4513]" />

                {/* Personnalisation */}
                <div>
                  <Label htmlFor="personnalisation" className="text-[#2C2C2C] flex items-center gap-2">
                    <Edit3 size={16} />
                    Personnalisation / Instructions spéciales
                  </Label>
                  <Textarea
                    id="personnalisation"
                    value={formData.personnalisation}
                    onChange={(e) => handleInputChange('personnalisation', e.target.value)}
                    placeholder="Décrivez ici vos besoins de personnalisation, couleurs spécifiques, textes à ajouter, etc."
                    className="border-[#8B4513] focus:border-[#6b3410] min-h-[100px]"
                  />
                </div>

                {/* Bouton de paiement */}
                <Button
                  type="submit"
                  disabled={isLoading || items.length === 0}
                  className="w-full bg-[#8B4513] hover:bg-[#6b3410] hover:text-[#D4A574] text-white py-4 text-lg"
                >
                  {isLoading ? 'Traitement en cours...' : 
        finalTotal === 0 ? 'Valider la commande gratuite' : 
        `Payer avec Stripe - ${formatPrice(finalTotal)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
