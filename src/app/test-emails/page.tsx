"use client";

import { useState } from 'react';
import { triggerWelcomeEmail, triggerNewOrderEmails, triggerQuoteRequestEmail, triggerLowStockAlert, triggerAbandonedCartEmail } from '@/lib/email-triggers';

export default function TestEmailsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const testWelcomeEmail = async () => {
    setLoading(true);
    try {
      await triggerWelcomeEmail({
        email: 'test@example.com',
        name: 'Client Test'
      });
      addResult('✅ Email de bienvenue envoyé avec succès');
    } catch (error) {
      addResult(`❌ Erreur email bienvenue: ${error}`);
    }
    setLoading(false);
  };

  const testOrderEmails = async () => {
    setLoading(true);
    try {
      await triggerNewOrderEmails({
        id: 'TEST-001',
        customer_name: 'Jean Dupont',
        customer_email: 'jean.dupont@example.com',
        customer_phone: '06 12 34 56 78',
        total: 49.90,
        items: [{ name: 'Faire-part mariage', quantity: 2 }],
        created_at: new Date().toISOString()
      });
      addResult('✅ Emails de commande envoyés avec succès');
    } catch (error) {
      addResult(`❌ Erreur emails commande: ${error}`);
    }
    setLoading(false);
  };

  const testQuoteRequest = async () => {
    setLoading(true);
    try {
      await triggerQuoteRequestEmail({
        name: 'Marie Martin',
        email: 'marie.martin@example.com',
        phone: '06 98 76 54 32',
        product: 'Faire-part baptême',
        quantity: '50',
        budget: '200-300€',
        event_date: '2024-06-15',
        message: 'Je souhaite un devis pour 50 faire-parts de baptême avec personnalisation.'
      });
      addResult('✅ Email de devis envoyé avec succès');
    } catch (error) {
      addResult(`❌ Erreur email devis: ${error}`);
    }
    setLoading(false);
  };

  const testLowStock = async () => {
    setLoading(true);
    try {
      await triggerLowStockAlert({
        id: 'PROD-001',
        name: 'Faire-part mariage premium',
        sku: 'FP-MARRIAGE-001',
        stock: 3,
        alert_threshold: 5
      });
      addResult('✅ Alerte de stock faible envoyée avec succès');
    } catch (error) {
      addResult(`❌ Erreur alerte stock: ${error}`);
    }
    setLoading(false);
  };

  const testAbandonedCart = async () => {
    setLoading(true);
    try {
      await triggerAbandonedCartEmail({
        customer_email: 'client.abandonne@example.com',
        items: [
          { name: 'Invitation mariage', quantity: 2 },
          { name: 'Menu mariage', quantity: 1 }
        ],
        total: 89.90
      });
      addResult('✅ Email panier abandonné envoyé avec succès');
    } catch (error) {
      addResult(`❌ Erreur email panier abandonné: ${error}`);
    }
    setLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">📧 Test des Emails Automatiques</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tester les emails</h2>
          <p className="text-gray-600 mb-6">
            Cliquez sur les boutons ci-dessous pour tester chaque type d'email automatique.
            Les emails seront envoyés aux adresses configurées (admin et client de test).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={testWelcomeEmail}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎉 Email de bienvenue
            </button>
            
            <button
              onClick={testOrderEmails}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📦 Emails de commande
            </button>
            
            <button
              onClick={testQuoteRequest}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📋 Demande de devis
            </button>
            
            <button
              onClick={testLowStock}
              disabled={loading}
              className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⚠️ Alerte stock faible
            </button>
            
            <button
              onClick={testAbandonedCart}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🛒 Panier abandonné
            </button>
            
            <button
              onClick={clearResults}
              className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600"
            >
              🗑️ Effacer les résultats
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Résultats des tests</h2>
          <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-gray-500 text-center">Aucun test effectué. Cliquez sur les boutons ci-dessus pour commencer.</p>
            ) : (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={index} className={`text-sm ${result.includes('✅') ? 'text-green-700' : 'text-red-700'}`}>
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Configuration requise</h3>
          <div className="text-blue-700 space-y-2">
            <p>• Assurez-vous d'avoir configuré les enregistrements DNS (SPF, DKIM, DMARC)</p>
            <p>• Vérifiez la configuration SMTP dans Supabase</p>
            <p>• Testez avec des vraies adresses email pour vérifier la réception</p>
            <p>• Consultez les logs de Supabase en cas d'erreur</p>
          </div>
        </div>
      </div>
    </div>
  );
}
