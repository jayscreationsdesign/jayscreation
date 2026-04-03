'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  BarChart3,
  PieChart,
  Calendar
} from 'lucide-react';

export default function Statistiques() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/admin/statistiques?period=${period}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erreur statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  // Données simulées pour l'instant
  const mockStats = {
    revenue: {
      current: 15420,
      previous: 13420,
      growth: 14.9
    },
    orders: {
      current: 234,
      previous: 198,
      growth: 18.2
    },
    customers: {
      current: 89,
      previous: 76,
      growth: 17.1
    },
    avgOrder: {
      current: 65.9,
      previous: 67.8,
      growth: -2.8
    }
  };

  const topProducts = [
    { nom: 'Bouquet de mariage premium', ventes: 45, revenue: 6749 },
    { nom: 'Centre de table anniversaire', ventes: 38, revenue: 3039 },
    { nom: 'Composition florale luxe', ventes: 32, revenue: 6397 },
    { nom: 'Bouquet romantique', ventes: 28, revenue: 3639 },
    { nom: 'Décoration événementielle', ventes: 25, revenue: 2497 }
  ];

  const categories = [
    { nom: 'Mariage', ventes: 89, percentage: 38 },
    { nom: 'Anniversaire', ventes: 67, percentage: 29 },
    { nom: 'Événementiel', ventes: 45, percentage: 19 },
    { nom: 'Entreprise', ventes: 33, percentage: 14 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statistiques détaillées</h1>
          <p className="text-gray-600">
            Analyse complète de votre activité
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          >
            <option value="day">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {mockStats.revenue.current.toLocaleString()}€
              </p>
              <div className={`flex items-center mt-2 text-sm ${
                mockStats.revenue.growth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {mockStats.revenue.growth > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(mockStats.revenue.growth)}%
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-[#8B4513]" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {mockStats.orders.current}
              </p>
              <div className={`flex items-center mt-2 text-sm ${
                mockStats.orders.growth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {mockStats.orders.growth > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(mockStats.orders.growth)}%
              </div>
            </div>
            <ShoppingCart className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {mockStats.customers.current}
              </p>
              <div className={`flex items-center mt-2 text-sm ${
                mockStats.customers.growth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {mockStats.customers.growth > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(mockStats.customers.growth)}%
              </div>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Panier moyen</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {mockStats.avgOrder.current.toFixed(2)}€
              </p>
              <div className={`flex items-center mt-2 text-sm ${
                mockStats.avgOrder.growth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {mockStats.avgOrder.growth > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(mockStats.avgOrder.growth)}%
              </div>
            </div>
            <Package className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Produits</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{product.nom}</span>
                    <span className="text-sm text-gray-600">{product.ventes} ventes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#8B4513] h-2 rounded-full"
                      style={{ width: `${(product.ventes / 45) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm font-medium text-gray-900">{product.revenue.toLocaleString()}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Répartition par Catégorie</h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.nom}</span>
                    <span className="text-sm text-gray-600">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#8B4513] to-[#6b3410] h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm font-medium text-gray-900">{category.ventes} ventes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart (Placeholder) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Évolution du Chiffre d'Affaires</h2>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Graphique d'évolution du CA (à implémenter avec Chart.js ou Recharts)</p>
        </div>
      </div>
    </div>
  );
}
