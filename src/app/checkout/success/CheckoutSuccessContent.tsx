"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Home, Package, Mail } from 'lucide-react';

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');
  const isFreeOrder = searchParams.get('free_order') === 'true';

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId && !isFreeOrder) {
        setLoading(false);
        return;
      }

      try {
        if (isFreeOrder) {
          // Pour les commandes gratuites, utiliser des données de base
          const freeOrderDetails = {
            id: `FREE-${Date.now()}`,
            total: 0,
            status: 'Confirmée (Gratuite)',
            date: new Date().toLocaleDateString('fr-FR'),
            items: [
              {
                name: 'Cadre Personnalisé',
                quantity: 1,
                price: 0
              }
            ],
            customer: {
              email: 'client@example.com',
              name: 'Client'
            }
          };
          setOrderDetails(freeOrderDetails);
        } else {
          // Récupérer les vraies données depuis Stripe
          const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);
          const data = await response.json();

          if (data.error) {
            throw new Error(data.error);
          }

          const session = data.session;
          const orderDetails = {
            id: session.id,
            total: session.amount_total ? session.amount_total / 100 : 0,
            status: session.payment_status === 'paid' ? 'Confirmée' : 'En attente',
            date: new Date(session.created * 1000).toLocaleDateString('fr-FR'),
            items: session.line_items?.data.map((item: any) => ({
              name: item.description,
              quantity: item.quantity,
              price: item.amount_total / 100
            })) || [],
            customer: {
              email: session.customer_details?.email || 'client@example.com',
              name: session.customer_details?.name || 'Client'
            }
          };
          setOrderDetails(orderDetails);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de commande:', error);
        // En cas d'erreur, afficher des données de base
        const fallbackDetails = {
          id: sessionId || `CMD-${Date.now()}`,
          total: 0,
          status: 'Erreur',
          date: new Date().toLocaleDateString('fr-FR'),
          items: [],
          customer: {
            email: 'client@example.com',
            name: 'Client'
          }
        };
        setOrderDetails(fallbackDetails);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId, isFreeOrder]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#E8D4B8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#2C2C2C]">Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#E8D4B8] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête succès */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">
            {isFreeOrder ? '🎉 Commande Gratuite Confirmée !' : '✅ Commande Confirmée !'}
          </h1>
          
          <p className="text-lg text-[#6B5B45] mb-2">
            Merci pour votre commande, elle a été enregistrée avec succès.
          </p>
          
          {isFreeOrder && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-green-800 font-semibold">
                🎁 Votre commande était gratuite - aucun paiement n'a été requis !
              </p>
            </div>
          )}
        </div>

        {/* Détails de la commande */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-[#8B4513] text-white p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Package className="w-6 h-6" />
              Détails de la commande
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Informations commande */}
              <div>
                <h3 className="font-semibold text-[#2C2C2C] mb-4">Informations</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#6B5B45]">Numéro de commande:</span>
                    <span className="font-mono text-[#2C2C2C]">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5B45]">Date:</span>
                    <span className="text-[#2C2C2C]">{orderDetails.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5B45]">Statut:</span>
                    <span className="text-green-600 font-semibold">{orderDetails.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5B45]">Total:</span>
                    <span className="text-[#2C2C2C] font-bold text-lg">
                      {orderDetails.total === 0 ? 'GRATUIT' : `${orderDetails.total.toFixed(2)}€`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Articles commandés */}
              <div>
                <h3 className="font-semibold text-[#2C2C2C] mb-4">Articles</h3>
                <div className="space-y-3">
                  {orderDetails.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-[#2C2C2C]">{item.name}</p>
                        <p className="text-sm text-[#6B5B45]">Quantité: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-[#2C2C2C]">
                        {item.price === 0 ? 'GRATUIT' : `${item.price.toFixed(2)}€`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations client */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Informations de contact
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-[#6B5B45]">Email:</span>
              <p className="text-[#2C2C2C] font-medium">{orderDetails.customer.email}</p>
            </div>
            <div>
              <span className="text-[#6B5B45]">Nom:</span>
              <p className="text-[#2C2C2C] font-medium">{orderDetails.customer.name}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#8B4513] text-white px-6 py-3 rounded-lg hover:bg-[#6b3410] transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          
          <Link
            href="/boutique"
            className="flex items-center justify-center gap-2 border border-[#8B4513] text-[#8B4513] px-6 py-3 rounded-lg hover:bg-[#8B4513] hover:text-white transition-colors"
          >
            <Package className="w-5 h-5" />
            Continuer mes achats
          </Link>
        </div>

        {/* Instructions supplémentaires */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📧 Prochaines étapes
          </h3>
          <div className="space-y-2 text-blue-800">
            <p>
              • Un e-mail de confirmation a été envoyé à {orderDetails.customer.email}
            </p>
            <p>
              • Vous recevrez des mises à jour sur le statut de votre commande
            </p>
            {isFreeOrder && (
              <p>
                • Votre commande gratuite sera traitée en priorité
              </p>
            )}
            <p>
              • Pour toute question, contactez notre service client
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
