'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar,
  CheckCircle,
  Clock,
  Package,
  Truck,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { formatPriceEUR } from '@/lib/formatPrice';

export default function Commandes() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      console.log('DEBUG ORDERS TYPE', typeof data, Array.isArray(data), data);
      const safeOrders = Array.isArray(data) ? data : [];
      setOrders(safeOrders);
    } catch (error) {
      console.error('Erreur commandes:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    const matchesDate = !dateFilter || 
      new Date(order.created_at).toDateString() === new Date(dateFilter).toDateString();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

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
            <button className="text-green-600 hover:text-green-800" title="Valider">
              <CheckCircle className="w-4 h-4" />
            </button>
            <button className="text-red-600 hover:text-red-800" title="Annuler">
              <XCircle className="w-4 h-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-800" title="Voir">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      case 'confirmed':
        return (
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800" title="Préparer">
              <Package className="w-4 h-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-800" title="Voir">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      case 'preparing':
        return (
          <div className="flex space-x-2">
            <button className="text-purple-600 hover:text-purple-800" title="Expédier">
              <Truck className="w-4 h-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-800" title="Voir">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      case 'shipped':
        return (
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800" title="Tracking">
              <AlertCircle className="w-4 h-4" />
            </button>
            <button className="text-blue-600 hover:text-blue-800" title="Voir">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      default:
        return (
          <button className="text-blue-600 hover:text-blue-800" title="Voir">
            <Eye className="w-4 h-4" />
          </button>
        );
    }
  };

  const handleOrderAction = async (action: string, order: any) => {
    try {
      let response;
      
      switch (action) {
        case 'validate':
          response = await fetch('/api/admin/validate-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: order.id })
          });
          break;
        case 'cancel':
          response = await fetch('/api/admin/cancel-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: order.id })
          });
          break;
        case 'prepare':
          response = await fetch('/api/admin/prepare-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: order.id })
          });
          break;
        case 'ship':
          response = await fetch('/api/admin/ship-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: order.id })
          });
          break;
      }

      if (response?.ok) {
        fetchOrders(); // Refresh orders
      }
    } catch (error) {
      console.error('Error handling order action:', error);
    }
  };

  const exportCSV = () => {
    const csv = [
      ['N° Commande', 'Client', 'Email', 'Montant', 'Statut', 'Date'],
      ...filteredOrders.map(order => [
        order.number,
        order.customer_name,
        order.customer_email,
        order.total.toFixed(2),
        order.status,
        new Date(order.created_at).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commandes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
          <h1 className="text-2xl font-bold text-[#2C1A0E] font-['Playfair_Display']">Commandes</h1>
          <p className="text-[#A0785A]">
            Gestion de toutes vos commandes ({filteredOrders.length} commandes)
          </p>
        </div>
        <button 
          onClick={exportCSV}
          className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0785A] h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher par n° commande, nom client, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">À valider</option>
              <option value="confirmed">Confirmées</option>
              <option value="preparing">En préparation</option>
              <option value="shipped">Expédiées</option>
              <option value="delivered">Livrées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="md:w-48">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-[#E8D5C0] overflow-hidden">
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
              {paginatedOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-[#FFF8F0]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C1A0E]">
                    #{order.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#2C1A0E]">
                        {order.customer_name}
                      </span>
                      <span className="text-xs text-[#A0785A]">
                        {order.customer_email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C1A0E]">
                    {formatPriceEUR(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A0785A]">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2" onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const button = target.closest('button');
                      if (button) {
                        const title = button.getAttribute('title');
                        if (title === 'Voir') {
                          setSelectedOrder(order);
                        } else {
                          handleOrderAction((title || '').toLowerCase(), order);
                        }
                      }
                    }}>
                      {getOrderActions(order)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-[#A0785A]">
            Aucune commande trouvée
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredOrders.length > ordersPerPage && (
        <div className="flex items-center justify-between bg-white rounded-lg border border-[#E8D5C0] px-6 py-3">
          <div className="text-sm text-[#A0785A]">
            Affichage de {(currentPage - 1) * ordersPerPage + 1} à{' '}
            {Math.min(currentPage * ordersPerPage, filteredOrders.length)} sur{' '}
            {filteredOrders.length} commandes
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-[#E8D5C0] rounded-md disabled:opacity-50"
            >
              Précédent
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredOrders.length / ordersPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
              className="px-3 py-1 text-sm border border-[#E8D5C0] rounded-md disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8D5C0]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2C1A0E]">
                  Détails Commande #{selectedOrder.number}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-[#A0785A] hover:text-[#2C1A0E]"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-[#2C1A0E] mb-3">Informations Client</h3>
                <div className="bg-[#FFF8F0] rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#A0785A]">Nom</p>
                      <p className="font-medium text-[#2C1A0E]">{selectedOrder.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A0785A]">Email</p>
                      <p className="font-medium text-[#2C1A0E]">{selectedOrder.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A0785A]">Téléphone</p>
                      <p className="font-medium text-[#2C1A0E]">{selectedOrder.customer_phone || 'Non renseigné'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A0785A]">Date</p>
                      <p className="font-medium text-[#2C1A0E]">{new Date(selectedOrder.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  {selectedOrder.shipping_address && (
                    <div className="mt-4">
                      <p className="text-sm text-[#A0785A]">Adresse de livraison</p>
                      <p className="font-medium text-[#2C1A0E]">{selectedOrder.shipping_address}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-lg font-semibold text-[#2C1A0E] mb-3">Articles Commandés</h3>
                <div className="bg-[#FFF8F0] rounded-lg p-4">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between border-b border-[#E8D5C0] pb-2">
                          <div>
                            <p className="font-medium text-[#2C1A0E]">{item.name}</p>
                            <p className="text-sm text-[#A0785A]">
                              Quantité: {item.quantity} × {formatPriceEUR(item.price)}
                            </p>
                          </div>
                          <p className="font-medium text-[#2C1A0E]">
                            {formatPriceEUR(item.quantity * item.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#A0785A]">Aucun article trouvé</p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-[#E8D5C0] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#2C1A0E]">Total</span>
                  <span className="text-xl font-bold text-[#8B4513]">
                    {formatPriceEUR(selectedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Status History */}
              <div>
                <h3 className="text-lg font-semibold text-[#2C1A0E] mb-3">Historique des statuts</h3>
                <div className="bg-[#FFF8F0] rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A0785A]">Créée</span>
                      <span className="text-sm text-[#2C1A0E]">{new Date(selectedOrder.created_at).toLocaleString('fr-FR')}</span>
                    </div>
                    {selectedOrder.status_history?.map((history: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm text-[#A0785A]">{history.status}</span>
                        <span className="text-sm text-[#2C1A0E]">{new Date(history.timestamp).toLocaleString('fr-FR')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <h3 className="text-lg font-semibold text-[#2C1A0E] mb-3">Notes internes</h3>
                <textarea
                  className="w-full p-3 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  rows={3}
                  placeholder="Ajouter des notes internes..."
                  defaultValue={selectedOrder.internal_notes || ''}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-[#8B4513] text-white py-2 px-4 rounded-lg hover:bg-[#6b3410] transition-colors">
                  Mettre à jour le statut
                </button>
                <button className="flex-1 border border-[#E8D5C0] text-[#2C1A0E] py-2 px-4 rounded-lg hover:bg-[#FFF8F0] transition-colors">
                  Voir sur Stripe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
