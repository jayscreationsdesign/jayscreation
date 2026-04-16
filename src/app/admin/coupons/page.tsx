'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit,
  Trash2,
  Plus,
  Download,
  RefreshCw,
  Ticket,
  Calendar,
  Percent,
  DollarSign,
  Copy,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  description?: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimum_amount?: number;
  usage_limit?: number;
  usage_count: number;
  starts_at?: string;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    minimum_amount: 0,
    usage_limit: 0,
    starts_at: '',
    expires_at: '',
    is_active: true
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/admin/coupons');
      const data = await response.json();
      console.log('DEBUG COUPONS TYPE', typeof data, Array.isArray(data), data);
      const safeCoupons: Coupon[] = Array.isArray(data) ? data : [];
      setCoupons(safeCoupons);
    } catch (error) {
      console.error('Erreur coupons:', error);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const safeCoupons = Array.isArray(coupons) ? coupons : [];
  const filteredCoupons = safeCoupons.filter(coupon => {
    const matchesSearch = 
      coupon.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || coupon.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && coupon.is_active) ||
      (statusFilter === 'inactive' && !coupon.is_active) ||
      (statusFilter === 'expired' && coupon.expires_at && new Date(coupon.expires_at) < new Date());
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description || '',
      type: coupon.type,
      value: coupon.value,
      minimum_amount: coupon.minimum_amount || 0,
      usage_limit: coupon.usage_limit || 0,
      starts_at: coupon.starts_at ? new Date(coupon.starts_at).toISOString().split('T')[0] : '',
      expires_at: coupon.expires_at ? new Date(coupon.expires_at).toISOString().split('T')[0] : '',
      is_active: coupon.is_active
    });
    setShowEditModal(true);
  };

  const handleDelete = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    try {
      console.log('Sauvegarde coupon:', formData);
      setShowEditModal(false);
      setSelectedCoupon(null);
      fetchCoupons();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCoupon) return;
    
    try {
      console.log('Suppression coupon:', selectedCoupon.id);
      setShowDeleteModal(false);
      setSelectedCoupon(null);
      fetchCoupons();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({...formData, code});
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusColor = (coupon: Coupon) => {
    if (!coupon.is_active) return 'bg-gray-100 text-gray-800';
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return 'bg-red-100 text-red-800';
    }
    if (coupon.starts_at && new Date(coupon.starts_at) > new Date()) {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (coupon: Coupon) => {
    if (!coupon.is_active) return 'Inactif';
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return 'Expiré';
    }
    if (coupon.starts_at && new Date(coupon.starts_at) > new Date()) {
      return 'À venir';
    }
    return 'Actif';
  };

  const getStatusIcon = (coupon: Coupon) => {
    if (!coupon.is_active) return XCircle;
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return XCircle;
    }
    if (coupon.starts_at && new Date(coupon.starts_at) > new Date()) {
      return Clock;
    }
    return CheckCircle;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2C1A0E]">Codes de réduction</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => {
              setSelectedCoupon(null);
              setFormData({
                code: '',
                description: '',
                type: 'percentage',
                value: 0,
                minimum_amount: 0,
                usage_limit: 0,
                starts_at: '',
                expires_at: '',
                is_active: true
              });
              setShowEditModal(true);
            }}
            className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau coupon
          </button>
          <button className="flex items-center px-4 py-2 bg-[#A0785A] text-white rounded-lg hover:bg-[#8B5A3C] transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          >
            <option value="all">Tous les types</option>
            <option value="percentage">Pourcentage</option>
            <option value="fixed">Montant fixe</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
            <option value="expired">Expirés</option>
          </select>

          <button className="flex items-center px-4 py-2 border border-[#E8D5C0] rounded-lg hover:bg-[#F9F5F0] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Coupons */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredCoupons.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Ticket className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun coupon trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9F5F0]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Valeur
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Utilisations
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Validité
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D5C0]">
                {filteredCoupons.map((coupon) => {
                  const StatusIcon = getStatusIcon(coupon);
                  return (
                    <tr key={coupon.id} className="hover:bg-[#F9F5F0]">
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-semibold text-[#2C1A0E]">{coupon.code}</span>
                          <button
                            onClick={() => copyToClipboard(coupon.code)}
                            className="p-1 text-gray-400 hover:text-[#8B4513] transition-colors"
                            title="Copier le code"
                          >
                            {copiedCode === coupon.code ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-600">
                          {coupon.description || '-'}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          {coupon.type === 'percentage' ? (
                            <Percent className="w-4 h-4 text-[#A0785A]" />
                          ) : (
                            <DollarSign className="w-4 h-4 text-[#A0785A]" />
                          )}
                          <span className="text-sm text-gray-600">
                            {coupon.type === 'percentage' ? 'Pourcentage' : 'Montant fixe'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold text-[#2C1A0E]">
                            {coupon.type === 'percentage' ? `${coupon.value}%` : `${coupon.value} €`}
                          </p>
                          {(coupon.minimum_amount || 0) > 0 && (
                            <p className="text-xs text-gray-500">
                              Min. {coupon.minimum_amount} €
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-[#2C1A0E]">{coupon.usage_count}</p>
                          {(coupon.usage_limit || 0) > 0 && (
                            <p className="text-xs text-gray-500">
                              / {coupon.usage_limit}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-600">
                          {coupon.starts_at && (
                            <p>Du: {new Date(coupon.starts_at).toLocaleDateString('fr-FR')}</p>
                          )}
                          {coupon.expires_at && (
                            <p>Au: {new Date(coupon.expires_at).toLocaleDateString('fr-FR')}</p>
                          )}
                          {!coupon.starts_at && !coupon.expires_at && (
                            <p className="text-gray-400">Illimité</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(coupon)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {getStatusText(coupon)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(coupon)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(coupon)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal d'édition */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              {selectedCoupon ? 'Modifier le coupon' : 'Nouveau coupon'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Code *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                    className="flex-1 px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent font-mono"
                    placeholder="CODEPROMO"
                    maxLength={20}
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    className="px-3 py-2 bg-[#A0785A] text-white rounded-lg hover:bg-[#8B5A3C] transition-colors"
                  >
                    Générer
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Description du coupon"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  >
                    <option value="percentage">Pourcentage</option>
                    <option value="fixed">Montant fixe</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Valeur *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={formData.type === 'percentage' ? 100 : undefined}
                    step={formData.type === 'percentage' ? 1 : 0.01}
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder={formData.type === 'percentage' ? '%' : '€'}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Montant minimum
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.minimum_amount}
                  onChange={(e) => setFormData({...formData, minimum_amount: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="0 (aucun minimum)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Limite d'utilisation
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.usage_limit}
                  onChange={(e) => setFormData({...formData, usage_limit: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="0 (illimité)"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={formData.starts_at}
                    onChange={(e) => setFormData({...formData, starts_at: e.target.value})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Date d'expiration
                  </label>
                  <input
                    type="date"
                    value={formData.expires_at}
                    onChange={(e) => setFormData({...formData, expires_at: e.target.value})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-4 h-4 text-[#8B4513] border-[#E8D5C0] rounded focus:ring-[#8B4513]"
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-[#2C1A0E]">
                  Coupon actif
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedCoupon(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.code.trim() || formData.value <= 0}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedCoupon ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suppression */}
      {showDeleteModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              Supprimer le coupon
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                Êtes-vous sûr de vouloir supprimer le coupon <strong>{selectedCoupon.code}</strong> ?
              </p>
              {selectedCoupon.usage_count > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>Attention :</strong> Ce coupon a été utilisé {selectedCoupon.usage_count} fois.
                    La suppression ne supprimera pas l'historique d'utilisation.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCoupon(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
