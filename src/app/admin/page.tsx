'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart,
  Plus,
  Mail,
  FileText,
  Ticket,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { formatPriceEUR } from '@/lib/formatPrice';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    monthlyRevenue: 0,
    activeOrders: 0,
    newCustomers: 0,
    averageCart: 0,
    orders: [] as any[],
    quotes: [] as any[],
    messages: [] as any[],
    topCustomers: [] as any[],
    topProducts: [] as any[],
    lowStockProducts: [] as any[],
    recentActivity: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Récupérer les données essentielles d'abord
      const [
        ordersRes,
        customersRes,
        productsRes
      ] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/customers'),
        fetch('/api/admin/products')
      ]);

      if (!ordersRes.ok || !customersRes.ok || !productsRes.ok) {
        throw new Error('Erreur lors du chargement des données');
      }

      const [ordersData, customersData, productsData] = await Promise.all([
        ordersRes.json(),
        customersRes.json(),
        productsRes.json()
      ]);

      // Mettre à jour les stats essentielles immédiatement
      const monthlyRevenue = ordersData
        .filter((order: any) => {
          const orderDate = new Date(order.created_at);
          const now = new Date();
          return orderDate.getMonth() === now.getMonth() && 
                 orderDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum: number, order: any) => sum + (order.total || 0), 0);

      const activeOrders = ordersData.filter((order: any) => 
        ['pending', 'processing'].includes(order.status)
      ).length;

      const newCustomers = customersData.filter((customer: any) => {
        const createdDate = new Date(customer.created_at);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return createdDate > thirtyDaysAgo;
      }).length;

      const averageCart = ordersData.length > 0 
        ? ordersData.reduce((sum: number, order: any) => sum + (order.total || 0), 0) / ordersData.length 
        : 0;

      // Mettre à jour immédiatement les stats essentielles
      setStats(prev => ({
        ...prev,
        monthlyRevenue,
        activeOrders,
        newCustomers,
        averageCart,
        orders: ordersData.slice(0, 5), // Limiter à 5 commandes récentes
        topCustomers: customersData.slice(0, 3), // Limiter à 3 meilleurs clients
        topProducts: productsData.slice(0, 3), // Limiter à 3 meilleurs produits
        lowStockProducts: productsData.filter((p: any) => p.stock < 10).slice(0, 3)
      }));

      setLoading(false);

      // Charger les données secondaires en arrière-plan
      setTimeout(async () => {
        try {
          const [quotesRes, messagesRes] = await Promise.all([
            fetch('/api/admin/quotes'),
            fetch('/api/admin/messages')
          ]);

          if (quotesRes.ok && messagesRes.ok) {
            const [quotesData, messagesData] = await Promise.all([
              quotesRes.json(),
              messagesRes.json()
            ]);

            setStats(prev => ({
              ...prev,
              quotes: quotesData.slice(0, 3),
              messages: messagesData.slice(0, 3),
              recentActivity: [
                ...ordersData.slice(0, 2).map((order: any) => ({
                  type: 'order',
                  description: `Nouvelle commande #${order.id}`,
                  time: new Date(order.created_at).toLocaleDateString(),
                  status: order.status
                })),
                ...messagesData.slice(0, 2).map((msg: any) => ({
                  type: 'message',
                  description: `Message de ${msg.name}`,
                  time: new Date(msg.created_at).toLocaleDateString(),
                  status: 'new'
                }))
              ]
            }));
          }
        } catch (error) {
          console.error('Erreur lors du chargement des données secondaires:', error);
        }
      }, 500);

    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'À valider' },
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Confirmée' },
      preparing: { color: 'bg-blue-100 text-blue-800', icon: Package, label: 'Préparation' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck, label: 'Expédiée' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Livrée' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Annulée' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getOrderActions = (order: any) => {
    switch (order.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <button className="text-green-600 hover:text-green-800">
              <CheckCircle className="w-4 h-4" />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <XCircle className="w-4 h-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      case 'confirmed':
        return (
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800">
              <Package className="w-4 h-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      case 'preparing':
        return (
          <div className="flex space-x-2">
            <button className="text-purple-600 hover:text-purple-800">
              <Truck className="w-4 h-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      case 'shipped':
        return (
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800">
              <AlertCircle className="w-4 h-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      default:
        return (
          <button className="text-blue-600 hover:text-blue-800">
            <Eye className="w-4 h-4" />
          </button>
        );
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
      {/* Header avec informations principales */}
      <div className="bg-gradient-to-r from-[#8B4513] to-[#A0785A] rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Vue d'ensemble</h1>
            <p className="text-[#D4A574]">
              Bienvenue sur votre tableau de bord administrateur Jay's Creations
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#D4A574] mb-1">Dernière mise à jour</p>
            <p className="text-lg font-semibold">
              {new Date().toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        {/* Stats principales en haut */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D4A574] mb-1">Revenus du mois</p>
                <p className="text-2xl font-bold">
                  {stats.monthlyRevenue.toFixed(2)} €
                </p>
                <p className="text-xs text-[#D4A574] mt-1">
                  {stats.orders.length} commandes
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#D4A574]" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D4A574] mb-1">Commandes actives</p>
                <p className="text-2xl font-bold">
                  {stats.activeOrders}
                </p>
                <p className="text-xs text-[#D4A574] mt-1">
                  En cours de traitement
                </p>
              </div>
              <Package className="w-8 h-8 text-[#D4A574]" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D4A574] mb-1">Nouveaux clients</p>
                <p className="text-2xl font-bold">
                  {stats.newCustomers}
                </p>
                <p className="text-xs text-[#D4A574] mt-1">
                  Ce mois-ci
                </p>
              </div>
              <Users className="w-8 h-8 text-[#D4A574]" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D4A574] mb-1">Panier moyen</p>
                <p className="text-2xl font-bold">
                  {stats.averageCart.toFixed(2)} €
                </p>
                <p className="text-xs text-[#D4A574] mt-1">
                  Par commande
                </p>
              </div>
              <ShoppingCart className="w-8 h-8 text-[#D4A574]" />
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C1A0E]">Stock faible</h3>
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="space-y-2">
            {stats.lowStockProducts.length > 0 ? (
              stats.lowStockProducts.slice(0, 3).map((product: any) => (
                <div key={product.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span className="text-sm text-[#2C1A0E]">{product.name}</span>
                  <span className="text-sm font-semibold text-yellow-600">{product.stock}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucun produit en stock faible</p>
            )}
          </div>
          {stats.lowStockProducts.length > 3 && (
            <p className="text-xs text-gray-500 mt-2">
              +{stats.lowStockProducts.length - 3} autres produits
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C1A0E]">Messages non lus</h3>
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            {stats.messages.length > 0 ? (
              stats.messages.slice(0, 3).map((message: any) => (
                <div key={message.id} className="p-2 bg-blue-50 rounded">
                  <p className="text-sm text-[#2C1A0E] truncate">{message.subject || 'Sans sujet'}</p>
                  <p className="text-xs text-gray-500">{message.customer_name}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucun message non lu</p>
            )}
          </div>
          {stats.messages.length > 3 && (
            <p className="text-xs text-gray-500 mt-2">
              +{stats.messages.length - 3} autres messages
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C1A0E]">Devis en attente</h3>
            <FileText className="w-5 h-5 text-orange-600" />
          </div>
          <div className="space-y-2">
            {stats.quotes.length > 0 ? (
              stats.quotes.slice(0, 3).map((quote: any) => (
                <div key={quote.id} className="p-2 bg-orange-50 rounded">
                  <p className="text-sm text-[#2C1A0E]">{quote.quote_number}</p>
                  <p className="text-xs text-gray-500">{quote.customer_name}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucun devis en attente</p>
            )}
          </div>
          {stats.quotes.length > 3 && (
            <p className="text-xs text-gray-500 mt-2">
              +{stats.quotes.length - 3} autres devis
            </p>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-[#E8D5C0]">
        <div className="p-6 border-b border-[#E8D5C0]">
          <h3 className="text-lg font-semibold text-[#2C1A0E]">Commandes récentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFF8F0]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  N° commande
                </th>
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
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8D5C0]">
              {stats.orders.map((order: any) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C1A0E]">
                    #{order.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B4226]">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2C1A0E]">
                    {formatPriceEUR(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A0785A]">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getOrderActions(order)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center p-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle commande
            </button>
            <button className="flex items-center justify-center p-3 bg-[#D4A574] text-white rounded-lg hover:bg-[#c1965f] transition-colors">
              <Package className="w-4 h-4 mr-2" />
              Ajouter produit
            </button>
            <button className="flex items-center justify-center p-3 bg-white border border-[#E8D5C0] text-[#2C1A0E] rounded-lg hover:bg-[#FFF8F0] transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              Envoyer email
            </button>
            <button className="flex items-center justify-center p-3 bg-white border border-[#E8D5C0] text-[#2C1A0E] rounded-lg hover:bg-[#FFF8F0] transition-colors">
              <Ticket className="w-4 h-4 mr-2" />
              Créer coupon
            </button>
            <button className="flex items-center justify-center p-3 bg-white border border-[#E8D5C0] text-[#2C1A0E] rounded-lg hover:bg-[#FFF8F0] transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              Nouveau devis
            </button>
            <button className="flex items-center justify-center p-3 bg-white border border-[#E8D5C0] text-[#2C1A0E] rounded-lg hover:bg-[#FFF8F0] transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export données
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Activité récente</h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity: any, index: number) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-[#8B4513]/10 rounded-lg">
                    <Icon className="w-4 h-4 text-[#8B4513]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2C1A0E]">{activity.title}</p>
                    <p className="text-sm text-[#A0785A]">{activity.subtitle}</p>
                    <p className="text-xs text-[#A0785A]">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Quotes */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Devis en attente</h3>
          <div className="space-y-3">
            {stats.quotes.map((quote: any) => (
              <div key={quote.id} className="flex items-center justify-between p-3 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="text-sm font-medium text-[#2C1A0E]">{quote.customer_name}</p>
                  <p className="text-xs text-[#A0785A]">{quote.project_type}</p>
                </div>
                <button className="text-[#8B4513] hover:text-[#6b3410]">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Top clients</h3>
          <div className="space-y-3">
            {stats.topCustomers.map((customer: any, index: number) => (
              <div key={customer.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#D4A574] rounded-full flex items-center justify-center">
                    <span className="text-[#2C1A0E] text-sm font-bold">
                      {customer.first_name?.[0]}{customer.last_name?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2C1A0E]">
                      {customer.first_name} {customer.last_name}
                    </p>
                    <p className="text-xs text-[#A0785A]">{customer.tier || 'Pétale'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#2C1A0E]">
                    {formatPriceEUR(customer.total_spent || 0)}
                  </p>
                  <p className="text-xs text-[#A0785A]">{customer.orders_count || 0} commandes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Produits populaires</h3>
          <div className="space-y-3">
            {stats.topProducts.map((product: any) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#8B4513]/10 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-[#8B4513]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2C1A0E]">{product.name}</p>
                    <p className="text-xs text-[#A0785A]">Stock: {product.stock}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#2C1A0E]">{product.sales_count} ventes</p>
                  <p className="text-xs text-[#A0785A]">{formatPriceEUR(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
