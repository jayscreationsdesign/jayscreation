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
import { useState } from 'react';

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
  const { items, total, clearCart } = useCartStore();
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          client: formData,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session Stripe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-[#C8A96E] mb-6" />
            <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
              Votre panier est vide
            </h1>
            <p className="text-[#6B6B6B] mb-8">
              Ajoutez des articles à votre panier pour passer commande
            </p>
            <Link href="/boutique">
              <Button className="bg-[#C8A96E] hover:bg-[#B89A5E] text-white">
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
            <Button variant="ghost" className="text-[#C8A96E] hover:bg-[#E8E4DF]">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#2C2C2C]">
            Finaliser ma commande
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Récapitulatif commande */}
          <Card className="bg-white border-[#C8A96E]">
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
                    <p className="font-semibold text-[#C8A96E]">
                      {formatPrice(item.prix * item.quantite)}
                    </p>
                  </div>
                </div>
              ))}
              
              <Separator className="bg-[#E8E4DF]" />
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-bold text-[#2C2C2C]">Total</span>
                <span className="text-2xl font-bold text-[#C8A96E]">
                  {formatPrice(total)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Formulaire client */}
          <Card className="bg-white border-[#C8A96E]">
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
                        className="border-[#C8A96E] focus:border-[#B89A5E]"
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
                        className="border-[#C8A96E] focus:border-[#B89A5E]"
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
                      className="border-[#C8A96E] focus:border-[#B89A5E]"
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
                      className="border-[#C8A96E] focus:border-[#B89A5E]"
                    />
                  </div>
                </div>

                <Separator className="bg-[#E8E4DF]" />

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
                      className="border-[#C8A96E] focus:border-[#B89A5E]"
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
                        className="border-[#C8A96E] focus:border-[#B89A5E]"
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
                        className="border-[#C8A96E] focus:border-[#B89A5E]"
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
                        className="border-[#C8A96E] focus:border-[#B89A5E]"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#E8E4DF]" />

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
                    className="border-[#C8A96E] focus:border-[#B89A5E] min-h-[100px]"
                  />
                </div>

                {/* Bouton de paiement */}
                <Button
                  type="submit"
                  disabled={isLoading || items.length === 0}
                  className="w-full bg-[#C8A96E] hover:bg-[#B89A5E] text-white py-4 text-lg"
                >
                  {isLoading ? 'Traitement en cours...' : `Payer avec Stripe - ${formatPrice(total)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
