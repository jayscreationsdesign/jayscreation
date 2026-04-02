"use client";

import { useState, useEffect } from 'react';

interface FreePrice {
  id: string;
  unit_amount: number;
  currency: string;
  nickname: string;
  created: number;
  product_name: string;
}

export default function FreePricingAdmin() {
  const [prices, setPrices] = useState<FreePrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState('');
  const [message, setMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    fetchFreePrices();
  }, []);

  const fetchFreePrices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-free-price');
      const data = await response.json();
      
      if (data.success) {
        setPrices(data.prices);
      } else {
        setMessage('Erreur: ' + data.error);
      }
    } catch (error) {
      setMessage('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const createFreePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName.trim()) {
      setMessage('Veuillez entrer un nom de produit');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/create-free-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: productName.trim(),
          productDescription: 'Produit gratuit - tarif 0€'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ Tarif gratuit créé: ${data.price.id}`);
        setProductName('');
        fetchFreePrices(); // Rafraîchir la liste
      } else {
        setMessage('❌ Erreur: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setMessage(`📋 Code ${code} copié!`);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🎁 Gestion des Tarifs Gratuits
          </h1>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {/* Création de tarif gratuit */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Créer un tarif gratuit
            </h2>
            <form onSubmit={createFreePrice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du produit
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ex: Cadre Personnalisé Gratuit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Création...' : 'Créer le tarif gratuit'}
              </button>
            </form>
          </div>

          {/* Codes de coupon */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🎫 Codes de coupon 100%
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-3 rounded border">
                <div>
                  <span className="font-mono font-bold text-lg">GRATUIT100</span>
                  <p className="text-sm text-gray-600">100% de réduction sur toute commande</p>
                </div>
                <button
                  onClick={() => copyCouponCode('GRATUIT100')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Copier
                </button>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded border">
                <div>
                  <span className="font-mono font-bold text-lg">FREE100</span>
                  <p className="text-sm text-gray-600">100% de réduction sur toute commande</p>
                </div>
                <button
                  onClick={() => copyCouponCode('FREE100')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Copier
                </button>
              </div>
            </div>
          </div>

          {/* Liste des tarifs gratuits existants */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tarifs gratuits existants ({prices.length})
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Chargement...</p>
              </div>
            ) : prices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun tarif gratuit trouvé
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID Tarif
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Surnom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Créé le
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prices.map((price) => (
                      <tr key={price.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {price.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {price.product_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {price.nickname || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {price.unit_amount === 0 ? 'GRATUIT' : `${price.unit_amount / 100}€`}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(price.created)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => copyCouponCode(price.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Copier ID
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
              📖 Comment utiliser
            </h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>
                <strong>1. Tarif gratuit (unit_amount = 0) :</strong> Créez des tarifs avec unit_amount = 0 pour des produits spécifiques.
              </p>
              <p>
                <strong>2. Coupon 100% :</strong> Utilisez les codes <code>GRATUIT100</code> ou <code>FREE100</code> dans le formulaire de commande.
              </p>
              <p>
                <strong>3. Résultat :</strong> Stripe Checkout ne demandera aucun moyen de paiement et redirigera directement vers la page de succès.
              </p>
              <p>
                <strong>4. Détection automatique :</strong> Les commandes avec total = 0 sont automatiquement traitées comme gratuites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
