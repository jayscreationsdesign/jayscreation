'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Package, 
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { DashboardStats, CommandeStats, ProductStats } from '@/types/admin';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<CommandeStats[]>([]);
  const [topProducts, setTopProducts] = useState<ProductStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        fetch('/api/admin/dashboard/stats'),
        fetch('/api/admin/dashboard/recent-orders'),
        fetch('/api/admin/dashboard/top-products')
      ]);

      const [statsData, ordersData, productsData] = await Promise.all([
        statsRes.json(),
        ordersRes.json(),
        productsRes.json()
      ]);

      setStats(statsData);
      setRecentOrders(ordersData);
      setTopProducts(productsData);
    } catch (error) {
      console.error('Erreur dashboard:', error);
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

  if (!stats) {
    return (
      <div className="text-center text-gray-500">
        Erreur lors du chargement des données
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Clients',
      value: stats.totalClients,
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Commandes',
      value: stats.totalCommandes,
      icon: ShoppingCart,
      change: '+8%',
      changeType: 'positive' as const,
      color: 'bg-green-500'
    },
    {
      title: 'Chiffre d\'Affaires',
      value: `${stats.chiffreAffaires.toLocaleString()}€`,
      icon: DollarSign,
      change: '+15%',
      changeType: 'positive' as const,
      color: 'bg-[#8B4513]'
    },
    {
      title: 'Panier Moyen',
      value: `${stats.panierMoyen.toFixed(2)}€`,
      icon: TrendingUp,
      change: '+5%',
      changeType: 'positive' as const,
      color: 'bg-purple-500'
    },
    {
      title: 'Taux Conversion',
      value: `${stats.tauxConversion.toFixed(1)}%`,
      icon: Package,
      change: '+2%',
      changeType: 'positive' as const,
      color: 'bg-orange-500'
    },
    {
      title: 'Taux Abandon',
      value: `${stats.tauxAbandon.toFixed(1)}%`,
      icon: AlertTriangle,
      change: '-3%',
      changeType: 'negative' as const,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Vue d'ensemble de votre activité
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className={`flex items-center mt-4 text-sm ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.changeType === 'positive' ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {stat.change} vs mois dernier
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Commandes Récentes
          </h2>
          <div className="space-y-4">
            {recentOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.client_nom}</p>
                  <p className="text-sm text-gray-600">{order.client_email}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.total.toFixed(2)}€</p>
                  <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Produits
          </h2>
          <div className="space-y-4">
            {topProducts.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-[#8B4513]' : index === 1 ? 'bg-gray-400' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.nom}</p>
                    <p className="text-sm text-gray-600">{product.categorie}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{product.ventes} ventes</p>
                  <p className="text-sm text-gray-600">{product.prix.toFixed(2)}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Alert */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Alertes Stock
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topProducts
            .filter(product => product.stock <= 5)
            .map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-red-900">{product.nom}</p>
                  <p className="text-sm text-red-600">Stock: {product.stock}</p>
                </div>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
