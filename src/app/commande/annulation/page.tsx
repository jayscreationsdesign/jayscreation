import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function AnnulationPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Message d'annulation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <XCircle size={48} className="text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">
              Paiement annulé
            </h1>
            <p className="text-lg text-[#6B6B6B] mb-2">
              Votre paiement a été annulé.
            </p>
            <p className="text-[#6B6B6B]">
              Aucun montant n'a été débité de votre carte. Vous pouvez recommencer votre commande quand vous le souhaitez.
            </p>
          </div>

          {/* Carte d'information */}
          <Card className="bg-white border-[#8B4513] mb-8">
            <CardHeader>
              <CardTitle className="text-[#2C2C2C]">
                Que s'est-il passé ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#6B6B6B]">
                L'annulation du paiement peut avoir plusieurs causes :
              </p>
              <ul className="list-disc list-inside text-[#6B6B6B] space-y-2">
                <li>Vous avez fermé la fenêtre de paiement</li>
                <li>Une erreur de connexion est survenue</li>
                <li>La carte a été refusée par la banque</li>
                <li>Vous avez volontairement annulé le paiement</li>
              </ul>
              <p className="text-[#6B6B6B]">
                Votre panier a été conservé et vous pouvez finaliser votre commande à tout moment.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/commande" className="flex-1">
              <Button className="w-full bg-[#8B4513] hover:bg-[#6b3410] hover:text-[#D4A574] text-white">
                <ArrowLeft size={20} className="mr-2" />
                Retour à la commande
              </Button>
            </Link>
            <Link href="/boutique" className="flex-1">
              <Button variant="outline" className="w-full border-[#8B4513] text-[#8B4513] hover:bg-[#FAF7F2]">
                <ShoppingBag size={20} className="mr-2" />
                Retour à la boutique
              </Button>
            </Link>
          </div>

          {/* Message de support */}
          <div className="text-center mt-8 p-4 bg-[#FAF7F2] rounded-lg">
            <p className="text-sm text-[#6B6B6B] mb-2">
              Besoin d'aide ? Notre équipe est là pour vous assister.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:contact@jayscreationsdesign.fr" 
                className="text-[#8B4513] hover:underline"
              >
                contact@jayscreationsdesign.fr
              </a>
              <a 
                href="tel:+33612345678" 
                className="text-[#8B4513] hover:underline"
              >
                +33 6 12 34 56 78
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
