"use client";

import { useState } from 'react';
import { triggerWelcomeEmail, triggerNewOrderEmails, triggerQuoteRequestEmail } from '@/lib/email-triggers';

export default function TestEmailsSimplePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const testWelcomeEmail = async () => {
    setLoading(true);
    setResult('');
    try {
      await triggerWelcomeEmail({
        email: 'jayscreations.d@gmail.com',
        name: 'Test User'
      });
      setResult('✅ Email de bienvenue envoyé avec succès ! Vérifiez : jayscreations.d@gmail.com');
    } catch (error) {
      setResult(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
    setLoading(false);
  };

  const testOrderEmails = async () => {
    setLoading(true);
    setResult('');
    try {
      await triggerNewOrderEmails({
        id: 'TEST-001',
        customer_name: 'Client Test',
        customer_email: 'jayscreations.d@gmail.com',
        total: 49.90,
        items: [{ name: 'Faire-part test', quantity: 2 }],
        created_at: new Date().toISOString()
      });
      setResult('✅ Emails de commande envoyés ! Vérifiez : jayscreations.d@gmail.com et commande@jayscreationsdesign.fr');
    } catch (error) {
      setResult(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
    setLoading(false);
  };

  const testQuoteRequest = async () => {
    setLoading(true);
    setResult('');
    try {
      await triggerQuoteRequestEmail({
        name: 'Test Client',
        email: 'jayscreations.d@gmail.com',
        product: 'Faire-part mariage test',
        message: 'Test de demande de devis'
      });
      setResult('✅ Demande de devis envoyée ! Vérifiez : contact@jayscreationsdesign.fr');
    } catch (error) {
      setResult(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-8 text-center">
          📧 Test Emails Jay's Creations
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Configuration actuelle
          </h2>
          <div className="space-y-2 text-sm">
            <p><strong>Expéditeur bienvenue:</strong> commande@jayscreationsdesign.fr</p>
            <p><strong>Expéditeur transactions:</strong> contact@jayscreationsdesign.fr</p>
            <p><strong>SMTP:</strong> smtp.ionos.de:587</p>
            <p><strong>Email de test:</strong> jayscreations.d@gmail.com</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tester les emails
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={testWelcomeEmail}
              disabled={loading}
              className="w-full bg-[#8B4513] text-white py-3 rounded-lg font-medium hover:bg-[#6b3410] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎉 Tester Email de Bienvenue
            </button>
            
            <button
              onClick={testOrderEmails}
              disabled={loading}
              className="w-full bg-[#2e7d32] text-white py-3 rounded-lg font-medium hover:bg-[#1b5e20] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📦 Tester Emails de Commande
            </button>
            
            <button
              onClick={testQuoteRequest}
              disabled={loading}
              className="w-full bg-[#7c4dff] text-white py-3 rounded-lg font-medium hover:bg-[#6200ea] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📋 Tester Demande de Devis
            </button>
          </div>

          {loading && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
              ⏳ Envoi en cours...
            </div>
          )}

          {result && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              result.includes('✅') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {result}
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            📋 Instructions de vérification
          </h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p>• Vérifiez votre boîte <strong>jayscreations.d@gmail.com</strong></p>
            <p>• Vérifiez les spams si vous ne recevez rien</p>
            <p>• L'expéditeur doit être <strong>commande@jayscreationsdesign.fr</strong></p>
            <p>• Ouvrez la console (F12) pour voir les logs détaillés</p>
          </div>
        </div>
      </div>
    </div>
  );
}
