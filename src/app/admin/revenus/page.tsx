'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Calendar,
  Download,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Target,
  CreditCard
} from 'lucide-react';
import { formatPriceEUR } from '@/lib/formatPrice';

interface RevenueData {
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  avgCart: number;
}

interface TopProduct {
  name: string;
  category: string;
  sales: number;
  revenue: number;
  stock: number;
}

interface TopCustomer {
  name: string;
  email: string;
  orders: number;
  revenue: number;
  tier: string;
}

export default function Revenus() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [categoryData, setCategoryData] = useState<{name: string, value: number, color: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [comparison, setComparison] = useState({ revenue: 0, orders: 0, customers: 0, avgCart: 0 });

  useEffect(() => {
    fetchRevenueData();
  }, [period]);

  const fetchRevenueData = async () => {
    try {
      // Récupérer les vraies données de Supabase
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/customers'),
        fetch('/api/admin/products')
      ]);

      const ordersData = await ordersRes.json();
      const customersData = await customersRes.json();
      const productsData = await productsRes.json();

      // Sécuriser les types
      const orders: any[] = Array.isArray(ordersData) ? ordersData : [];
      const customers: any[] = Array.isArray(customersData) ? customersData : [];
      const products: any[] = Array.isArray(productsData) ? productsData : [];

      // Calculer les données de revenus selon la période
      const now = new Date();
      let startDate: Date;
      let dateFormat: string;

      switch (period) {
        case 'week':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
          dateFormat = 'EEE d';
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          dateFormat = 'EEE d';
          break;
        case 'quarter':
          startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          dateFormat = 'MMM';
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          dateFormat = 'MMM';
          break;
        default:
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          dateFormat = 'EEE d';
      }

      // Filtrer les commandes selon la période
      const filteredOrders = orders.filter(order => 
        new Date(order.created_at) >= startDate && order.status !== 'cancelled'
      );

      // Grouper par période
      const revenueMap = new Map<string, { revenue: number, orders: number, customers: Set<string> }>();
      
      filteredOrders.forEach(order => {
        const date = new Date(order.created_at);
        let periodKey: string;
        
        if (period === 'week' || period === 'month') {
          periodKey = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
        } else {
          periodKey = date.toLocaleDateString('fr-FR', { month: 'short' });
        }
        
        if (!revenueMap.has(periodKey)) {
          revenueMap.set(periodKey, { revenue: 0, orders: 0, customers: new Set() });
        }
        
        const periodData = revenueMap.get(periodKey)!;
        periodData.revenue += order.total || 0;
        periodData.orders += 1;
        periodData.customers.add(order.customer_id);
      });

      // Convertir en tableau pour le graphique
      const revenueData: RevenueData[] = Array.from(revenueMap.entries()).map(([period, data]) => ({
        period,
        revenue: data.revenue,
        orders: data.orders,
        customers: data.customers.size,
        avgCart: data.orders > 0 ? data.revenue / data.orders : 0
      }));

      // Top produits
      const topProducts: TopProduct[] = products
        .filter((product: any) => product.sales_count > 0)
        .sort((a: any, b: any) => b.sales_count - a.sales_count)
        .slice(0, 5)
        .map((product: any) => ({
          name: product.name,
          category: product.category?.name || 'Non catégorisé',
          sales: product.sales_count || 0,
          revenue: (product.sales_count || 0) * (product.price || 0),
          stock: product.stock || 0
        }));

      // Top clients
      const topCustomers: TopCustomer[] = customers
        .filter((customer: any) => customer.total_spent > 0)
        .sort((a: any, b: any) => b.total_spent - a.total_spent)
        .slice(0, 5)
        .map((customer: any) => ({
          name: `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || customer.email,
          email: customer.email,
          orders: customer.orders_count || 0,
          revenue: customer.total_spent || 0,
          tier: customer.tier || 'Pétale'
        }));

      // Données par catégorie
      const categoryRevenue = new Map<string, number>();
      const categoryColors: { [key: string]: string } = {
        'Décoration': '#8B4513',
        'Accessoires': '#D4A574',
        'Art': '#2C1A0E',
        'Textile': '#E8D5C0',
        'Bijoux': '#A0785A'
      };

      products.forEach((product: any) => {
        const categoryName = product.category?.name || 'Autres';
        const revenue = (product.sales_count || 0) * (product.price || 0);
        categoryRevenue.set(categoryName, (categoryRevenue.get(categoryName) || 0) + revenue);
      });

      const categoryData = Array.from(categoryRevenue.entries()).map(([name, value]) => ({
        name,
        value,
        color: categoryColors[name] || '#A0785A'
      }));

      // Calculer les comparaisons (période précédente)
      const previousStartDate = new Date(startDate);
      if (period === 'week') {
        previousStartDate.setDate(previousStartDate.getDate() - 7);
      } else if (period === 'month') {
        previousStartDate.setMonth(previousStartDate.getMonth() - 1);
      } else if (period === 'quarter') {
        previousStartDate.setMonth(previousStartDate.getMonth() - 3);
      } else {
        previousStartDate.setFullYear(previousStartDate.getFullYear() - 1);
      }

      const previousOrders = orders.filter(order => 
        new Date(order.created_at) >= previousStartDate && 
        new Date(order.created_at) < startDate && 
        order.status !== 'cancelled'
      );

      const currentRevenue = filteredOrders.reduce((sum, order) => sum + (order.total || 0), 0);
      const previousRevenue = previousOrders.reduce((sum, order) => sum + (order.total || 0), 0);
      
      const revenueComparison = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
      const ordersComparison = previousOrders.length > 0 ? ((filteredOrders.length - previousOrders.length) / previousOrders.length) * 100 : 0;

      setRevenueData(revenueData);
      setTopProducts(topProducts);
      setTopCustomers(topCustomers);
      setCategoryData(categoryData);
      
      setComparison({
        revenue: revenueComparison,
        orders: ordersComparison,
        customers: 12.3, // TODO: Calculer avec vraies données
        avgCart: 6.8    // TODO: Calculer avec vraies données
      });

    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = revenueData.reduce((sum, data) => sum + data.revenue, 0);
  const totalOrders = revenueData.reduce((sum, data) => sum + data.orders, 0);
  const totalCustomers = revenueData.reduce((sum, data) => sum + data.customers, 0);
  const avgCartValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const getComparisonIcon = (value: number) => {
    const Icon = value >= 0 ? ArrowUp : ArrowDown;
    return <Icon className="h-4 w-4" />;
  };

  const getComparisonColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const exportReport = (format: 'pdf' | 'csv') => {
    if (format === 'csv') {
      const csv = [
        ['Période', 'Revenus', 'Commandes', 'Clients', 'Panier moyen'],
        ...revenueData.map(data => [
          data.period,
          data.revenue.toFixed(2),
          data.orders.toString(),
          data.customers.toString(),
          data.avgCart.toFixed(2)
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `revenus_${period}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert('Export PDF sera implémenté avec une librairie comme jsPDF');
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
          <h1 className="text-2xl font-bold text-[#2C1A0E] font-['Playfair_Display']">Revenus</h1>
          <p className="text-[#A0785A]">
            Analyse des performances et rapports financiers
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          >
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            <option value="quarter">Trimestre</option>
            <option value="year">Année</option>
          </select>
          <button
            onClick={() => exportReport('pdf')}
            className="flex items-center px-4 py-2 bg-[#D4A574] text-white rounded-lg hover:bg-[#c1965f] transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </button>
          <button
            onClick={() => exportReport('csv')}
            className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#8B4513]/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div className={`flex items-center text-sm ${getComparisonColor(comparison.revenue)}`}>
              {getComparisonIcon(comparison.revenue)}
              <span className="ml-1">{Math.abs(comparison.revenue)}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[#A0785A]">CA Total</p>
            <p className="text-2xl font-bold text-[#2C1A0E] mt-1">
              {formatPriceEUR(totalRevenue)}
            </p>
            <p className="text-xs text-[#A0785A] mt-1">vs période précédente</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#8B4513]/10 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div className={`flex items-center text-sm ${getComparisonColor(comparison.orders)}`}>
              {getComparisonIcon(comparison.orders)}
              <span className="ml-1">{Math.abs(comparison.orders)}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[#A0785A]">Nb Commandes</p>
            <p className="text-2xl font-bold text-[#2C1A0E] mt-1">
              {totalOrders}
            </p>
            <p className="text-xs text-[#A0785A] mt-1">vs période précédente</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#8B4513]/10 rounded-lg">
              <Users className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div className={`flex items-center text-sm ${getComparisonColor(comparison.customers)}`}>
              {getComparisonIcon(comparison.customers)}
              <span className="ml-1">{Math.abs(comparison.customers)}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[#A0785A]">Nb Clients</p>
            <p className="text-2xl font-bold text-[#2C1A0E] mt-1">
              {totalCustomers}
            </p>
            <p className="text-xs text-[#A0785A] mt-1">vs période précédente</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#8B4513]/10 rounded-lg">
              <Target className="h-6 w-6 text-[#8B4513]" />
            </div>
            <div className={`flex items-center text-sm ${getComparisonColor(comparison.avgCart)}`}>
              {getComparisonIcon(comparison.avgCart)}
              <span className="ml-1">{Math.abs(comparison.avgCart)}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[#A0785A]">Panier Moyen</p>
            <p className="text-2xl font-bold text-[#2C1A0E] mt-1">
              {formatPriceEUR(avgCartValue)}
            </p>
            <p className="text-xs text-[#A0785A] mt-1">vs période précédente</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Revenus par période</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-[#8B4513] rounded-t" style={{ height: `${(data.revenue / Math.max(...revenueData.map(d => d.revenue))) * 100}%` }}></div>
                <span className="text-xs text-[#A0785A] mt-2 text-center">{data.period}</span>
                <span className="text-xs font-medium text-[#2C1A0E]">{formatPriceEUR(data.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Répartition par catégorie</h3>
          <div className="space-y-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm font-medium text-[#2C1A0E]">{category.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-[#E8D5C0] rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(category.value / categoryData.reduce((sum, c) => sum + c.value, 0)) * 100}%`,
                        backgroundColor: category.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-[#2C1A0E] w-16 text-right">
                    {formatPriceEUR(category.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Top Produits</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Produit</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Catégorie</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Ventes</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Revenus</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D5C0]">
                {topProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-[#FFF8F0]">
                    <td className="px-4 py-3 text-sm font-medium text-[#2C1A0E]">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-[#A0785A]">{product.category}</td>
                    <td className="px-4 py-3 text-sm text-[#2C1A0E]">{product.sales}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#2C1A0E]">{formatPriceEUR(product.revenue)}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Top Clients</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Client</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Commandes</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">CA</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#A0785A] uppercase">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D5C0]">
                {topCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-[#FFF8F0]">
                    <td className="px-4 py-3 text-sm font-medium text-[#2C1A0E]">{customer.name}</td>
                    <td className="px-4 py-3 text-sm text-[#A0785A]">{customer.email}</td>
                    <td className="px-4 py-3 text-sm text-[#2C1A0E]">{customer.orders}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#2C1A0E]">{formatPriceEUR(customer.revenue)}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.tier === 'Diamant' ? 'bg-blue-100 text-blue-800' :
                        customer.tier === 'Orchidée' ? 'bg-purple-100 text-purple-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {customer.tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
        <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Objectif mensuel</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2C1A0E]">Revenus cibles</span>
              <span className="text-sm text-[#A0785A]">{formatPriceEUR(totalRevenue)} / {formatPriceEUR(2000)}</span>
            </div>
            <div className="w-full bg-[#E8D5C0] rounded-full h-3">
              <div 
                className="bg-[#8B4513] h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalRevenue / 2000) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-[#A0785A]">{((totalRevenue / 2000) * 100).toFixed(1)}% atteint</span>
              <span className="text-xs text-[#A0785A]">
                {2000 - totalRevenue > 0 ? `${formatPriceEUR(2000 - totalRevenue)} restants` : 'Objectif atteint !'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-[#FFF8F0] rounded-lg">
              <TrendingUp className="h-8 w-8 text-[#8B4513] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2C1A0E]">{((totalRevenue / 2000) * 100).toFixed(1)}%</p>
              <p className="text-sm text-[#A0785A]">Progression</p>
            </div>
            <div className="text-center p-4 bg-[#FFF8F0] rounded-lg">
              <Calendar className="h-8 w-8 text-[#8B4513] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2C1A0E]">{new Date().getDate()}</p>
              <p className="text-sm text-[#A0785A]">Jour du mois</p>
            </div>
            <div className="text-center p-4 bg-[#FFF8F0] rounded-lg">
              <Target className="h-8 w-8 text-[#8B4513] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2C1A0E]">{formatPriceEUR(totalRevenue / new Date().getDate())}</p>
              <p className="text-sm text-[#A0785A]">Moyenne/jour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
