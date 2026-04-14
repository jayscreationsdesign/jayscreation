'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [pointsEarned, setPointsEarned] = useState(0)

  useEffect(() => {
    // Récupérer les détails de la commande depuis les paramètres URL ou localStorage
    const orderId = searchParams.get('order_id')
    const total = Number(searchParams.get('total')) || 0
    
    // Calculer les points Jay's Club (1 point par euro dépensé)
    const calculatedPoints = Math.floor(total)
    setPointsEarned(calculatedPoints)
    
    setOrderDetails({
      id: orderId || 'CMD-' + Date.now(),
      total: total,
      date: new Date().toLocaleDateString('fr-FR'),
      items: [] // Sera rempli depuis l'API ou localStorage
    })
  }, [searchParams])

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#6B6B6B]">Chargement de votre confirmation...</p>
        </div>
      </div>
    )
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
              Commande confirmée !
            </h1>
            <p className="text-lg text-[#6B6B6B] mb-2">
              Merci pour votre commande. Nous l'avons bien reçue.
            </p>
            <p className="text-[#6B6B6B]">
              Un email de confirmation a été envoyé à votre adresse email.
            </p>
          </div>

          {/* Carte de récapitulatif */}
          <div className="bg-white rounded-2xl border border-[#E8E4DF] p-6 mb-8">
            <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">
              Récapitulatif de la commande
            </h2>
            <div className="space-y-3">
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
                <span className="font-bold text-[#8B4513]">{orderDetails.total.toFixed(2)} â¬</span>
              </div>
            </div>
          </div>

          {/* Encart Jay's Club Points */}
          {pointsEarned > 0 && (
            <div className="bg-[#FFF8F0] border-2 border-[#8B4513] rounded-2xl p-6 mb-8 text-center">
              <div className="text-3xl mb-3">ð</div>
              <h3 className="text-2xl font-bold text-[#2C1A0E] mb-2">
                Vous avez gagné {pointsEarned} points Jay's Club !
              </h3>
              <p className="text-[#6B6B6B] mb-4">
                Ces points ont été ajoutés à votre compte fidélité.
              </p>
              <div className="bg-[#8B4513] text-white px-4 py-2 rounded-lg inline-block">
                <span className="font-bold">Total: {pointsEarned} points</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/boutique" className="flex-1">
              <button className="w-full bg-[#8B4513] hover:bg-[#6b3410] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                Continuer mes achats
              </button>
            </Link>
            <Link href="/compte" className="flex-1">
              <button className="w-full border-2 border-[#8B4513] text-[#8B4513] font-semibold py-3 px-6 rounded-xl hover:bg-[#FFF8F0] transition-colors flex items-center justify-center gap-2">
                <ArrowRight size={20} />
                Voir mon compte
              </button>
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
  )
}
