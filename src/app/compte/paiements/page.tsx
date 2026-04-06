'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, Plus, Edit2, Trash2, Calendar, CheckCircle, AlertCircle, Clock, Shield, Download } from 'lucide-react';

const COLORS = {
  gold: '#8B4513',
  goldLight: '#D4B87A',
  cream: '#FAF7F2',
  chocolat: '#3C2415',
  chocolatLight: '#4E3222',
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E8E0D4',
  creamDark: '#F0EBE3',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

const FONTS = {
  playfair: '"Playfair Display", serif',
  inter: '"Inter", sans-serif',
};

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
  status: 'active' | 'expired' | 'pending';
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paymentMethod: string;
  description: string;
  orderId?: string;
}

export default function PaiementsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'methods' | 'transactions'>('methods');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setPaymentMethods([
        {
          id: '1',
          type: 'card',
          last4: '4242',
          brand: 'Visa',
          expiryMonth: 12,
          expiryYear: 2025,
          isDefault: true,
          createdAt: '2024-01-15',
          status: 'active'
        },
        {
          id: '2',
          type: 'card',
          last4: '8888',
          brand: 'Mastercard',
          expiryMonth: 8,
          expiryYear: 2024,
          isDefault: false,
          createdAt: '2024-02-20',
          status: 'expired'
        },
        {
          id: '3',
          type: 'paypal',
          isDefault: false,
          createdAt: '2024-03-10',
          status: 'active'
        }
      ]);

      setTransactions([
        {
          id: 'txn_1',
          amount: 89.90,
          currency: 'EUR',
          status: 'completed',
          date: '2024-03-15T10:30:00Z',
          paymentMethod: 'Visa ****4242',
          description: 'Commande #12345',
          orderId: '12345'
        },
        {
          id: 'txn_2',
          amount: 45.00,
          currency: 'EUR',
          status: 'pending',
          date: '2024-03-14T15:20:00Z',
          paymentMethod: 'Mastercard ****8888',
          description: 'Commande #12344',
          orderId: '12344'
        },
        {
          id: 'txn_3',
          amount: 125.00,
          currency: 'EUR',
          status: 'failed',
          date: '2024-03-13T09:15:00Z',
          paymentMethod: 'PayPal',
          description: 'Commande #12343',
          orderId: '12343'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getCardIcon = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa': return '💳';
      case 'mastercard': return '💳';
      case 'amex': return '💳';
      default: return '💳';
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="h-5 w-5" />;
      case 'paypal': return <Shield className="h-5 w-5" />;
      case 'bank': return <Calendar className="h-5 w-5" />;
      default: return <CreditCard className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'pending': return COLORS.warning;
      case 'failed': return COLORS.error;
      default: return COLORS.textLight;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      default: return status;
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl font-medium mb-2" style={{ color: COLORS.chocolat }}>
            Chargement de vos paiements...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/compte" className="hover:text-[#3C2415] transition-colors">Mon compte</Link>
            <span>/</span>
            <span style={{ color: COLORS.chocolat }}>Paiements</span>
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
          >
            Paiements
          </h1>
          <p className="text-gray-600 mb-6">
            Gérez vos méthodes de paiement et consultez l'historique de vos transactions
          </p>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-lg" style={{ backgroundColor: COLORS.creamDark }}>
          <button
            onClick={() => setActiveTab('methods')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'methods'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-50'
            }`}
            style={{
              color: activeTab === 'methods' ? COLORS.chocolat : COLORS.textLight
            }}
          >
            Méthodes de paiement
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-50'
            }`}
            style={{
              color: activeTab === 'transactions' ? COLORS.chocolat : COLORS.textLight
            }}
          >
            Historique des transactions
          </button>
        </div>

        {activeTab === 'methods' && (
          <div className="space-y-6">
            {/* Bouton d'ajout */}
            <div className="flex justify-between items-center">
              <h2 
                className="text-xl font-bold"
                style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
              >
                Vos méthodes de paiement
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
              >
                <Plus className="h-4 w-4" />
                Ajouter une méthode
              </button>
            </div>

            {/* Liste des méthodes de paiement */}
            {paymentMethods.length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: COLORS.border }}>
                <CreditCard className="h-16 w-16 mx-auto mb-4" style={{ color: COLORS.gold }} />
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
                >
                  Aucune méthode de paiement
                </h3>
                <p className="text-gray-600 mb-6">
                  Ajoutez votre première méthode de paiement pour faciliter vos achats
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une méthode
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className="bg-white rounded-2xl border p-6 transition-all hover:shadow-lg"
                    style={{ borderColor: COLORS.border }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${COLORS.gold}20` }}
                        >
                          {getPaymentIcon(method.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 
                              className="font-semibold"
                              style={{ color: COLORS.chocolat }}
                            >
                              {method.type === 'card' ? `${method.brand} ****${method.last4}` : 'PayPal'}
                            </h3>
                            {method.isDefault && (
                              <span 
                                className="px-2 py-1 rounded-full text-xs font-medium"
                                style={{ 
                                  backgroundColor: COLORS.gold,
                                  color: COLORS.white
                                }}
                              >
                                Par défaut
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {method.type === 'card' && method.expiryMonth && method.expiryYear && (
                              <>Expire {String(method.expiryMonth).padStart(2, '0')}/{method.expiryYear}</>
                            )}
                            {method.type === 'paypal' && <>Compte PayPal</>}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(method.status)}
                        <span 
                          className="text-sm font-medium"
                          style={{ color: getStatusColor(method.status) }}
                        >
                          {method.status === 'active' ? 'Actif' : method.status === 'expired' ? 'Expiré' : 'En attente'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="text-sm font-medium hover:underline"
                            style={{ color: COLORS.gold }}
                          >
                            Définir par défaut
                          </button>
                        )}
                        <button
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          style={{ color: COLORS.text }}
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(method.id)}
                          className="p-1 rounded hover:bg-[#8B4513]10 transition-colors"
                          style={{ color: '#8B4513' }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Formulaire d'ajout */}
            {showAddForm && (
              <div className="bg-white rounded-2xl border p-6" style={{ borderColor: COLORS.border }}>
                <h3 
                  className="text-xl font-bold mb-6"
                  style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
                >
                  Ajouter une méthode de paiement
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      className="p-4 border-2 rounded-lg hover:border-[#8B4513] transition-colors"
                      style={{ borderColor: COLORS.border }}
                    >
                      <CreditCard className="h-8 w-8 mx-auto mb-2" style={{ color: COLORS.gold }} />
                      <p className="font-medium" style={{ color: COLORS.chocolat }}>Carte bancaire</p>
                    </button>
                    <button
                      className="p-4 border-2 rounded-lg hover:border-[#8B4513] transition-colors"
                      style={{ borderColor: COLORS.border }}
                    >
                      <Shield className="h-8 w-8 mx-auto mb-2" style={{ color: COLORS.gold }} />
                      <p className="font-medium" style={{ color: COLORS.chocolat }}>PayPal</p>
                    </button>
                    <button
                      className="p-4 border-2 rounded-lg hover:border-[#8B4513] transition-colors"
                      style={{ borderColor: COLORS.border }}
                    >
                      <Calendar className="h-8 w-8 mx-auto mb-2" style={{ color: COLORS.gold }} />
                      <p className="font-medium" style={{ color: COLORS.chocolat }}>Virement bancaire</p>
                    </button>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      className="bg-[#8B4513] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
                    >
                      Ajouter cette méthode
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-3 rounded-full font-medium border transition-colors"
                      style={{ 
                        borderColor: COLORS.border, 
                        color: COLORS.text,
                        backgroundColor: 'white'
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* En-tête des transactions */}
            <div className="flex justify-between items-center">
              <h2 
                className="text-xl font-bold"
                style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
              >
                Historique des transactions
              </h2>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50"
                style={{ borderColor: COLORS.border, color: COLORS.text }}
              >
                <Download className="h-4 w-4" />
                Exporter
              </button>
            </div>

            {/* Liste des transactions */}
            {transactions.length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: COLORS.border }}>
                <Calendar className="h-16 w-16 mx-auto mb-4" style={{ color: COLORS.gold }} />
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
                >
                  Aucune transaction
                </h3>
                <p className="text-gray-600">
                  Votre historique de transactions apparaîtra ici
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: COLORS.border }}>
                        <th className="text-left p-4 font-medium" style={{ color: COLORS.chocolat }}>Date</th>
                        <th className="text-left p-4 font-medium" style={{ color: COLORS.chocolat }}>Description</th>
                        <th className="text-left p-4 font-medium" style={{ color: COLORS.chocolat }}>Méthode</th>
                        <th className="text-left p-4 font-medium" style={{ color: COLORS.chocolat }}>Montant</th>
                        <th className="text-left p-4 font-medium" style={{ color: COLORS.chocolat }}>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50" style={{ borderColor: COLORS.border }}>
                          <td className="p-4">
                            <div className="text-sm" style={{ color: COLORS.text }}>
                              {new Date(transaction.date).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(transaction.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium" style={{ color: COLORS.text }}>
                              {transaction.description}
                            </div>
                            {transaction.orderId && (
                              <div className="text-xs text-gray-500">
                                Commande #{transaction.orderId}
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="text-sm" style={{ color: COLORS.text }}>
                              {transaction.paymentMethod}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold" style={{ color: COLORS.chocolat }}>
                              {transaction.amount.toFixed(2)} {transaction.currency}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(transaction.status)}
                              <span 
                                className="text-sm font-medium"
                                style={{ color: getStatusColor(transaction.status) }}
                              >
                                {getStatusText(transaction.status)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
