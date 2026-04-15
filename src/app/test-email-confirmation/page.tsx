'use client'

import { useState } from 'react'
import { sendOrderConfirmationEmail } from '@/lib/email'

export default function TestEmailConfirmation() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  const handleTestEmail = async () => {
    setLoading(true)
    setResult('')

    try {
      // Données de test pour la commande
      const testOrder = {
        number: 'TEST-2024-001',
        customerName: 'Jean Dupont',
        customerEmail: 'test@example.com',
        total: 89.90,
        createdAt: new Date().toISOString(),
        items: [
          {
            name: 'Bougie "Soirée Romantique"',
            quantity: 2,
            price: 29.95
          },
          {
            name: 'Scented Candle "Vanille Douce"',
            quantity: 1,
            price: 30.00
          }
        ]
      }

      const result = await sendOrderConfirmationEmail(testOrder)
      
      if (result.success) {
        setResult('â Email de confirmation envoyÃ© avec succÃ¨s !')
      } else {
        setResult(`â Erreur lors de l\'envoi : ${result.error}`)
      }
    } catch (error) {
      setResult(`â Erreur : ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Test Email de Confirmation
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              DonnÃ©es de test :
            </h2>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>â Commande : TEST-2024-001</li>
              <li>â Client : Jean Dupont</li>
              <li>â Email : test@example.com</li>
              <li>â Total : 89,90â¬</li>
              <li>â Articles : 2 bougies</li>
            </ul>
          </div>

          <button
            onClick={handleTestEmail}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Envoi en cours...' : 'â Envoyer l\'email de test'}
          </button>

          {result && (
            <div className={`mt-6 p-4 rounded-lg border ${
              result.includes('succÃ¨s') 
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <p className="font-medium">{result}</p>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Configuration requise :
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>â Variables d\'environnement SMTP configurÃ©es :</p>
              <ul className="ml-4 list-disc">
                <li>SMTP_USER_COMMANDE</li>
                <li>SMTP_PASS_COMMANDE</li>
                <li>NEXT_PUBLIC_SITE_URL</li>
              </ul>
              <p className="mt-2">â Le template utilise le logo depuis : 
                https://www.jayscreationsdesign.fr/images/logo/logo.png</p>
              <p>â Polices Google Fonts : Great Vibes, Playfair Display, Inter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
