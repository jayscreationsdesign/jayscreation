'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Product } from '@/types/product';

export default function Produits() {
  const [produits, setProduits] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await fetch('/api/admin/produits');
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error('Erreur produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProduits = produits.filter(produit => {
    const matchesSearch = 
      produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (produit.categorie && produit.categorie.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || produit.categorie === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'actif' && produit.actif) ||
      (statusFilter === 'inactif' && !produit.actif);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { icon: XCircle, color: 'text-red-500', label: 'Rupture' };
    if (stock <= 5) return { icon: AlertTriangle, color: 'text-yellow-500', label: 'Stock bas' };
    return { icon: CheckCircle, color: 'text-green-500', label: 'Disponible' };
  };

  const getStatusBadge = (actif: boolean) => {
    return actif 
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (actif: boolean) => {
    return actif ? 'En ligne' : 'Hors ligne';
  };

  // Get unique categories
  const categories = [...new Set(produits.map(p => p.categorie).filter(Boolean))];

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
          <h1 className="text-3xl font-bold text-gray-900">Produits & Stocks</h1>
          <p className="text-gray-600">
            Gestion de votre catalogue et des stocks
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Produits</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{produits.length}</p>
            </div>
            <Package className="h-8 w-8 text-[#8B4513]" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En ligne</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {produits.filter(p => p.actif).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rupture de stock</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {produits.filter(p => p.stock === 0).length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stock bas</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {produits.filter(p => p.stock > 0 && p.stock <= 5).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher par nom ou catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:w-48">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">En ligne</option>
              <option value="inactif">Hors ligne</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProduits.map((produit) => {
                const stockStatus = getStockStatus(produit.stock);
                const StockIcon = stockStatus.icon;
                
                return (
                  <tr key={produit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {produit.image_principale && (
                          <img
                            src={produit.image_principale}
                            alt={produit.nom}
                            className="h-10 w-10 rounded-lg object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {produit.nom}
                          </div>
                          <div className="text-xs text-gray-500">
                            {produit.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {produit.categorie || 'Non catégorisé'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <span className="font-medium">
                          {produit.prix.toFixed(2)}€
                        </span>
                        {produit.prix_promo && (
                          <span className="ml-2 text-red-500 line-through text-xs">
                            {produit.prix_promo.toFixed(2)}€
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StockIcon className={`h-4 w-4 mr-2 ${stockStatus.color}`} />
                        <span className="text-sm font-medium text-gray-900">
                          {produit.stock}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {stockStatus.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(produit.actif)}`}>
                        {getStatusLabel(produit.actif)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedProduct(produit)}
                          className="text-[#8B4513] hover:text-[#6b3410]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProduits.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun produit trouvé
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedProduct.nom}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Product Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Slug</h3>
                  <p className="font-medium">{selectedProduct.slug}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Catégorie</h3>
                  <p className="font-medium">{selectedProduct.categorie || 'Non catégorisé'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Prix</h3>
                  <p className="font-medium">{selectedProduct.prix.toFixed(2)}€</p>
                  {selectedProduct.prix_promo && (
                    <p className="text-sm text-red-500">Promo: {selectedProduct.prix_promo.toFixed(2)}€</p>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Stock</h3>
                  <p className="font-medium">{selectedProduct.stock} unités</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Statut</h3>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(selectedProduct.actif)}`}>
                    {getStatusLabel(selectedProduct.actif)}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Personnalisable</h3>
                  <p className="font-medium">{selectedProduct.personnalisable ? 'Oui' : 'Non'}</p>
                </div>
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Description</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedProduct.description}</p>
                  </div>
                </div>
              )}

              {/* Images */}
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Images</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProduct.nom} - Image ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Themes */}
              {selectedProduct.themes && selectedProduct.themes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Thèmes</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.themes.map((theme, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#8B4513] text-white text-xs rounded-full"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-[#8B4513] text-white py-2 px-4 rounded-lg hover:bg-[#6b3410] transition-colors">
                  Modifier le produit
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Mettre à jour le stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
