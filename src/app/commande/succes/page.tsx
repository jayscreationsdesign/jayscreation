"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag, Package, Truck } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Vider le panier automatiquement
    clearCart();

    // Récupérer les détails de la commande si nécessaire
    if (sessionId) {
      // Ici vous pourriez faire un appel API pour récupérer les détails
      // Pour l'instant, on simule un succès
      setOrderDetails({
        id: sessionId,
        total: '0.00', // À récupérer depuis l'API
        date: new Date().toLocaleDateString('fr-FR'),
      });
    }

    setIsLoading(false);
  }, [sessionId, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#6B6B6B]">Traitement de votre commande...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Message de succès principal */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">
              Paiement réussi !
            </h1>
            <p className="text-lg text-[#6B6B6B] mb-2">
              Merci pour votre commande. Nous avons bien reçu votre paiement.
            </p>
            <p className="text-[#6B6B6B]">
              Un email de confirmation a été envoyé à votre adresse email.
            </p>
          </div>

          {/* Carte de résumé */}
          <Card className="bg-white border-[#8B4513] mb-8">
            <CardHeader>
              <CardTitle className="text-[#2C2C2C] flex items-center gap-2">
                <Package size={24} />
                Résumé de la commande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderDetails && (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Numéro de commande:</span>
                    <span className="font-medium text-[#2C2C2C]">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Date:</span>
                    <span className="font-medium text-[#2C2C2C]">{orderDetails.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Total payé:</span>
                    <span className="font-bold text-[#8B4513]">{orderDetails.total} €</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Informations de suivi */}
          <div className="bg-white rounded-xl border border-[#8B4513] p-6 mb-8">
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4 flex items-center gap-2">
              <Truck size={20} className="text-[#8B4513]" />
              Prochaines étapes
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#8B4513] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <p className="text-[#6B6B6B]">
                  <strong>Validation (24-48h):</strong> Nous étudions votre commande et vos besoins de personnalisation.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#8B4513] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <p className="text-[#6B6B6B]">
                  <strong>Maquette (2-3 jours):</strong> Vous recevrez par email une maquette de votre création personnalisée.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#8B4513] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <p className="text-[#6B6B6B]">
                  <strong>Production (10-15 jours):</strong> Après validation de la maquette, nous lançons la production.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#8B4513] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <p className="text-[#6B6B6B]">
                  <strong>Livraison (2-3 jours):</strong> Votre commande est expédiée et vous sera livrée rapidement.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/boutique" className="flex-1">
              <Button className="w-full bg-[#8B4513] hover:bg-[#6b3410] hover:text-[#D4A574] text-white">
                <ShoppingBag size={20} className="mr-2" />
                Continuer mes achats
              </Button>
            </Link>
            <Link href="/contact" className="flex-1">
              <Button variant="outline" className="w-full border-[#8B4513] text-[#8B4513] hover:bg-[#FAF7F2]">
                Contacter le support
              </Button>
            </Link>
          </div>

          {/* Message de réassurance */}
          <div className="text-center mt-8 p-4 bg-[#FAF7F2] rounded-lg">
            <p className="text-sm text-[#6B6B6B]">
              Pour toute question concernant votre commande, n'hésitez pas à nous contacter à{' '}
              <a href="mailto:contact@jayscreationsdesign.fr" className="text-[#8B4513] hover:underline">
                contact@jayscreationsdesign.fr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccesPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
