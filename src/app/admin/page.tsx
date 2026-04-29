'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Package, 
  Users, 
  ShoppingCart,
  Plus,
  Mail,
  FileText,
  Calendar,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  AlertCircle,
  DollarSign,
  ShoppingBag,
  Star,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase-client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    monthlyRevenue: 0,
    monthlyOrders: 0,
    pendingQuotes: 0,
    averageCart: 0,
    revenueChart: [] as any[],
    recentOrders: [] as any[],
    topProducts: [] as any[],
    activityFeed: [] as any[],
    calendarEvents: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders data
      const { data: orders } = await supabaseClient
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      // Fetch products data
      const { data: products } = await supabaseClient
        .from('products')
        .select('*')
        .eq('visible', true);

      // Fetch quotes data
      const { data: quotes } = await supabaseClient
        .from('quotes')
        .select('*')
        .eq('status', 'pending');

      // Fetch disponibilites data
      const { data: disponibilites } = await supabaseClient
        .from('disponibilites')
        .select('*')
        .gte('date', new Date().toISOString().split('T')[0])
        .lte('date', new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]);

      if (orders && products && quotes && disponibilites) {
        // Calculate monthly revenue
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyOrders = orders.filter((order: any) => {
          const orderDate = new Date(order.created_at);
          return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
        });

        const monthlyRevenue = monthlyOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
        
        const averageCart = monthlyOrders.length > 0 
          ? monthlyRevenue / monthlyOrders.length 
          : 0;

        // Revenue chart data (last 6 months)
        const revenueChart = [];
        for (let i = 5; i >= 0; i--) {
          const monthDate = new Date(currentYear, currentMonth - i, 1);
          const monthOrders = orders.filter((order: any) => {
            const orderDate = new Date(order.created_at);
            return orderDate.getMonth() === monthDate.getMonth() && orderDate.getFullYear() === monthDate.getFullYear();
          });
          
          revenueChart.push({
            month: monthDate.toLocaleDateString('fr-FR', { month: 'short' }),
            revenue: monthOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)
          });
        }

        // Top products (most ordered)
        const topProducts = products
          .sort((a: any, b: any) => (b.sales_count || 0) - (a.sales_count || 0))
          .slice(0, 5);

        // Activity feed
        const activityFeed = [
          ...monthlyOrders.slice(0, 3).map((order: any) => ({
            id: order.id,
            type: 'order',
            title: `Nouvelle commande #${order.id}`,
            description: `${order.client_name} - ${order.total} €`,
            time: getRelativeTime(order.created_at),
            icon: ShoppingCart,
            color: 'text-green-600'
          })),
          ...quotes.slice(0, 2).map((quote: any) => ({
            id: quote.id,
            type: 'quote',
            title: `Nouveau devis reçu`,
            description: `${quote.client_name} - ${quote.event_type}`,
            time: getRelativeTime(quote.created_at),
            icon: FileText,
            color: 'text-orange-600'
          }))
        ].slice(0, 5);

        setStats({
          monthlyRevenue,
          monthlyOrders: monthlyOrders.length,
          pendingQuotes: quotes.length,
          averageCart,
          revenueChart,
          recentOrders: monthlyOrders.slice(0, 5),
          topProducts,
          activityFeed,
          calendarEvents: disponibilites
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Nouveau': { color: 'bg-[#EAF4EE] text-[#2D6A4F]', label: 'Nouveau' },
      'En cours': { color: 'bg-[#FEF5E7] text-[#B7770D]', label: 'En cours' },
      'Expédié': { color: 'bg-[#EBF5FB] text-[#2471A3]', label: 'Expédié' },
      'Annulé': { color: 'bg-[#FDEDEC] text-[#C0392B]', label: 'Annulé' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Nouveau'];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getRelativeTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 60) return `Il y a ${mins} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A96E]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-[#E8D5B7] p-6 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8A96E] via-[#E8D5B7] to-[#C8A96E]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B6B6B]">CA du mois</p>
              <p className="text-2xl font-bold text-[#3C2415] mt-2">
                {stats.monthlyRevenue.toFixed(2)} €
              </p>
              <div className="flex items-center mt-2">
                {getTrendIcon(12)}
                <span className="text-sm text-green-600 ml-1">+12%</span>
                <span className="text-xs text-[#6B6B6B] ml-2">vs mois dernier</span>
              </div>
            </div>
            <div className="p-3 bg-[#F0E4CC] rounded-lg">
              <DollarSign className="w-6 h-6 text-[#C8A96E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E8D5B7] p-6 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8A96E] via-[#E8D5B7] to-[#C8A96E]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B6B6B]">Nombre commandes</p>
              <p className="text-2xl font-bold text-[#3C2415] mt-2">
                {stats.monthlyOrders}
              </p>
              <div className="flex items-center mt-2">
                {getTrendIcon(8)}
                <span className="text-sm text-green-600 ml-1">+8%</span>
                <span className="text-xs text-[#6B6B6B] ml-2">vs mois dernier</span>
              </div>
            </div>
            <div className="p-3 bg-[#F0E4CC] rounded-lg">
              <ShoppingCart className="w-6 h-6 text-[#C8A96E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E8D5B7] p-6 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8A96E] via-[#E8D5B7] to-[#C8A96E]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B6B6B]">Devis en attente</p>
              <p className="text-2xl font-bold text-[#3C2415] mt-2">
                {stats.pendingQuotes}
              </p>
              <div className="flex items-center mt-2">
                {getTrendIcon(-3)}
                <span className="text-sm text-red-600 ml-1">-3%</span>
                <span className="text-xs text-[#6B6B6B] ml-2">vs mois dernier</span>
              </div>
            </div>
            <div className="p-3 bg-[#F0E4CC] rounded-lg">
              <FileText className="w-6 h-6 text-[#C8A96E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E8D5B7] p-6 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8A96E] via-[#E8D5B7] to-[#C8A96E]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B6B6B]">Panier moyen</p>
              <p className="text-2xl font-bold text-[#3C2415] mt-2">
                {stats.averageCart.toFixed(2)} €
              </p>
              <div className="flex items-center mt-2">
                {getTrendIcon(5)}
                <span className="text-sm text-green-600 ml-1">+5%</span>
                <span className="text-xs text-[#6B6B6B] ml-2">vs mois dernier</span>
              </div>
            </div>
            <div className="p-3 bg-[#F0E4CC] rounded-lg">
              <Package className="w-6 h-6 text-[#C8A96E]" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[#3C2415] font-['Playfair_Display']">
              Chiffre d'affaires
            </h3>
            <p className="text-xs text-[#C8A96E] mt-0.5">
              6 derniers mois
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#3C2415]">
              {stats.revenueChart.reduce((s, d) => s + d.revenue, 0).toFixed(2)} €
            </p>
            <p className="text-xs text-[#6B6B6B]">
              Total période
            </p>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between space-x-2">
          {stats.revenueChart.map((item, index) => (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-full">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#3C2415] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {item.revenue.toFixed(0)} €
                </div>
                <div 
                  className="w-full bg-[#C8A96E] hover:bg-[#3C2415] transition-colors rounded-t-sm"
                  style={{ 
                    height: `${Math.max((item.revenue / Math.max(...stats.revenueChart.map(d => d.revenue), 1)) * 100, 4)}%` 
                  }}
                />
              </div>
              <span className="text-xs text-[#6B6B6B] mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#3C2415] mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link href="/admin/commandes/nouveau">
            <button className="flex flex-col items-center p-4 border border-[#E8D5B7] rounded-xl hover:border-[#C8A96E] hover:bg-[#F5EFE6] hover:shadow-sm transition-all w-full group">
              <div className="w-10 h-10 bg-[#F0E4CC] rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#C8A96E] transition-colors">
                <Plus className="w-5 h-5 text-[#C8A96E] group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium text-[#3C2415] text-center leading-tight">
                Nouvelle commande
              </span>
            </button>
          </Link>
          <Link href="/admin/produits/nouveau">
            <button className="flex flex-col items-center p-4 border border-[#E8D5B7] rounded-xl hover:border-[#C8A96E] hover:bg-[#F5EFE6] hover:shadow-sm transition-all w-full group">
              <div className="w-10 h-10 bg-[#F0E4CC] rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#C8A96E] transition-colors">
                <Package className="w-5 h-5 text-[#C8A96E] group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium text-[#3C2415] text-center leading-tight">
                Ajouter produit
              </span>
            </button>
          </Link>
          <Link href="/admin/devis/nouveau">
            <button className="flex flex-col items-center p-4 border border-[#E8D5B7] rounded-xl hover:border-[#C8A96E] hover:bg-[#F5EFE6] hover:shadow-sm transition-all w-full group">
              <div className="w-10 h-10 bg-[#F0E4CC] rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#C8A96E] transition-colors">
                <FileText className="w-5 h-5 text-[#C8A96E] group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium text-[#3C2415] text-center leading-tight">
                Créer devis
              </span>
            </button>
          </Link>
          <Link href="/admin/disponibilites">
            <button className="flex flex-col items-center p-4 border border-[#E8D5B7] rounded-xl hover:border-[#C8A96E] hover:bg-[#F5EFE6] hover:shadow-sm transition-all w-full group">
              <div className="w-10 h-10 bg-[#F0E4CC] rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#C8A96E] transition-colors">
                <Calendar className="w-5 h-5 text-[#C8A96E] group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium text-[#3C2415] text-center leading-tight">
                Gérer agenda
              </span>
            </button>
          </Link>
          <Link href="mailto:commande@jayscreationsdesign.fr">
            <button className="flex flex-col items-center p-4 border border-[#E8D5B7] rounded-xl hover:border-[#C8A96E] hover:bg-[#F5EFE6] hover:shadow-sm transition-all w-full group">
              <div className="w-10 h-10 bg-[#F0E4CC] rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#C8A96E] transition-colors">
                <Mail className="w-5 h-5 text-[#C8A96E] group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium text-[#3C2415] text-center leading-tight">
                Email client
              </span>
            </button>
          </Link>
          <Link href="/admin/statistiques">
            <button className="flex flex-col items-center p-4 border border-[#E8D5B7] rounded-xl hover:border-[#C8A96E] hover:bg-[#F5EFE6] hover:shadow-sm transition-all w-full group">
              <div className="w-10 h-10 bg-[#F0E4CC] rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#C8A96E] transition-colors">
                <Download className="w-5 h-5 text-[#C8A96E] group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium text-[#3C2415] text-center leading-tight">
                Exporter stats
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#3C2415] mb-4">Commandes récentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8D5B7]">
                  <th className="text-left py-2 text-xs font-medium text-[#6B6B6B] uppercase">Ref</th>
                  <th className="text-left py-2 text-xs font-medium text-[#6B6B6B] uppercase">Client</th>
                  <th className="text-left py-2 text-xs font-medium text-[#6B6B6B] uppercase">Montant</th>
                  <th className="text-left py-2 text-xs font-medium text-[#6B6B6B] uppercase">Statut</th>
                  <th className="text-left py-2 text-xs font-medium text-[#6B6B6B] uppercase">Date</th>
                  <th className="text-left py-2 text-xs font-medium text-[#6B6B6B] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-[#E8D5B7]">
                    <td className="py-3 text-sm text-[#3C2415]">#{order.id}</td>
                    <td className="py-3 text-sm text-[#6B6B6B]">{order.client_name}</td>
                    <td className="py-3 text-sm text-[#3C2415]">{order.total} €</td>
                    <td className="py-3">{getStatusBadge(order.status || 'Nouveau')}</td>
                    <td className="py-3 text-sm text-[#6B6B6B]">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3">
                      <Link href={`/admin/commandes/${order.id}`}>
                        <button className="p-1.5 text-[#C8A96E] hover:bg-[#F5EFE6] rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <Link href="/admin/commandes" className="text-sm text-[#C8A96E] hover:text-[#3C2415] font-medium transition-colors">
              Voir toutes les commandes →
            </Link>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#3C2415] mb-4">Top produits</h3>
          <div className="space-y-3">
            {stats.topProducts.map((product: any) => (
              <div key={product.id} className="flex items-center justify-between p-3 border border-[#E8D5B7] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#F5EFE6] rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#C8A96E]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#3C2415]">{product.name}</p>
                    <p className="text-xs text-[#6B6B6B]">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#3C2415]">{product.price} €</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-[#6B6B6B]">Stock: {product.stock || '∞'}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      (product.stock || 0) > 5 
                        ? 'bg-[#EAF4EE] text-[#2D6A4F]' 
                        : (product.stock || 0) > 0 
                          ? 'bg-[#FEF5E7] text-[#B7770D]' 
                          : 'bg-[#FDEDEC] text-[#C0392B]'
                    }`}>
                      {(product.stock || 0) > 5 
                        ? 'OK' 
                        : (product.stock || 0) > 0 
                          ? 'Bas' 
                          : 'Rupture'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#3C2415] mb-4">Activité récente</h3>
          <div className="space-y-3">
            {stats.activityFeed.map((activity: any) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="relative mt-1.5 flex-shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      activity.type === 'order' 
                        ? 'bg-[#2D6A4F]' 
                        : activity.type === 'quote'
                          ? 'bg-[#C8A96E]'
                          : 'bg-[#2471A3]'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#3C2415]">{activity.title}</p>
                    <p className="text-xs text-[#6B6B6B]">{activity.description}</p>
                    <p className="text-xs text-[#C8A96E] mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[#3C2415] font-['Playfair_Display']">
                Disponibilités
              </h3>
              <p className="text-xs text-[#C8A96E]">
                {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <Link href="/admin/disponibilites">
              <button className="text-xs text-[#C8A96E] hover:text-[#3C2415] font-medium border border-[#E8D5B7] px-3 py-1.5 rounded-lg hover:bg-[#F5EFE6] transition-colors">
                Gérer →
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
              <div key={index} className="text-xs font-medium text-[#6B6B6B] py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(new Date().getFullYear(), new Date().getMonth(), i - 2);
              const dateStr = date.toISOString().split('T')[0];
              const isAvailable = date.getMonth() === new Date().getMonth();
              const isTaken = stats.calendarEvents.some((event: any) => event.date === dateStr && event.status === 'taken');
              
              if (!isAvailable) return <div key={i} />;
              
              return (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center text-xs rounded ${
                    isTaken 
                      ? 'bg-[#C8A96E] text-white' 
                      : 'border border-[#E8D5B7] text-[#6B6B6B]'
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
