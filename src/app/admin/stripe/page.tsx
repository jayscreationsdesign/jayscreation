'use client';

import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  CheckCircle,
  Calendar,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';

export default function Stripe() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    transactionCount: 0,
    successRate: 0,
    averageAmount: 0
  });

  const [transactions, setTransactions] = useState([
    {
      id: '1',
      amount: 129.99,
      status: 'success',
      customer: 'Marie Dupont',
      date: '2024-04-15T10:30:00Z',
      paymentMethod: 'card'
    },
    {
      id: '2',
      amount: 89.50,
      status: 'success',
      customer: 'Jean Martin',
      date: '2024-04-15T09:15:00Z',
      paymentMethod: 'card'
    },
    {
      id: '3',
      amount: 45.00,
      status: 'failed',
      customer: 'Sophie Bernard',
      date: '2024-04-15T08:45:00Z',
      paymentMethod: 'sepa'
    }
  ]);

  useEffect(() => {
    // Simuler le chargement des données Stripe
    setTimeout(() => {
      setStats({
        totalRevenue: 15420.50,
        monthlyRevenue: 3240.80,
        transactionCount: 127,
        successRate: 94.5,
        averageAmount: 121.42
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Activity className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1A0E] font-['Playfair_Display']">Stripe</h1>
          <p className="text-[#A0785A]">
            Gestion des paiements et transactions Stripe
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors">
          <CreditCard className="h-4 w-4 mr-2" />
          Tableau de bord Stripe
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Revenu total</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {stats.totalRevenue.toFixed(2)} €
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% ce mois
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Revenu mensuel</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {stats.monthlyRevenue.toFixed(2)} €
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.3% vs mois dernier
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Transactions</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {stats.transactionCount}
              </p>
              <p className="text-xs text-[#A0785A] mt-1">
                {Math.round(stats.transactionCount / 30)} par jour
              </p>
            </div>
            <ShoppingCart className="h-8 w-8 text-[#8B4513]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Taux de succès</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {stats.successRate}%
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2.1% d'amélioration
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-[#E8D5C0] overflow-hidden">
        <div className="p-6 border-b border-[#E8D5C0]">
          <h2 className="text-lg font-semibold text-[#2C1A0E]">Transactions récentes</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFF8F0]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  Méthode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8D5C0]">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-[#FFF8F0]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#2C1A0E]">
                      {transaction.customer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#2C1A0E] font-medium">
                      {transaction.amount.toFixed(2)} €
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1">
                        {transaction.status === 'success' ? 'Succès' : 
                         transaction.status === 'failed' ? 'Échec' : 'En attente'}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#A0785A]">
                      {transaction.paymentMethod === 'card' ? 'Carte' : 'SEPA'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#A0785A]">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C1A0E">Paiements en attente</h3>
            <Activity className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-[#2C1A0E] mb-2">3</div>
          <p className="text-sm text-[#A0785A]">Total: 245.50 €</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C1A0E">Remboursements</h3>
            <ArrowDownRight className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-[#2C1A0E] mb-2">2</div>
          <p className="text-sm text-[#A0785A]">Total: 178.00 €</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C1A0E">Litiges</h3>
            <AlertCircle className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-[#2C1A0E] mb-2">1</div>
          <p className="text-sm text-[#A0785A]">En cours de traitement</p>
        </div>
      </div>
    </div>
  );
}
