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
  XCircle,
  Grid,
  List,
  Minus,
  MoreVertical
} from 'lucide-react';
import { formatPriceEUR } from '@/lib/formatPrice';

// Helper pour normaliser les données en tableau
function toArray<T = any>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value == null) return []
  return []
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  is_active: boolean;
  image_url?: string;
  description?: string;
  category?: {
    id: string;
    name: string;
  };
  sales_count?: number;
}

export default function Produits() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockValues, setStockValues] = useState<{[key: string]: number}>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      
      const dataArray = toArray<any>(data)

      // Initialize stock values
      const initialStockValues: { [key: string]: number } = {}
      dataArray.forEach((product) => {
        initialStockValues[product.id] = product.stock || 0
      })

      setStockValues(initialStockValues)
      setProducts(dataArray)
    } catch (error) {
      console.error('Erreur produits:', error);
      setProducts([])
      setStockValues({})
    } finally {
      setLoading(false);
    }
  };

  // Log de contrôle
  console.log('DEBUG PRODUCTS ARRAY', {
    isArray: Array.isArray(products),
    length: products.length,
  })

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category?.name === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'actif' && product.is_active) ||
      (statusFilter === 'inactif' && !product.is_active);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { icon: XCircle, color: 'text-red-500', label: 'Rupture', bgColor: 'bg-red-100' };
    if (stock <= 5) return { icon: AlertTriangle, color: 'text-yellow-500', label: 'Stock bas', bgColor: 'bg-yellow-100' };
    return { icon: CheckCircle, color: 'text-green-500', label: 'Disponible', bgColor: 'bg-green-100' };
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (isActive: boolean) => {
    return isActive ? 'En ligne' : 'Hors ligne';
  };

  // Get unique categories
  const categories = [...new Set(products.map((p: any) => p.category?.name).filter(Boolean))];

  const handleStockChange = (productId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setStockValues(prev => ({ ...prev, [productId]: numValue }));
  };

  const handleStockUpdate = async (productId: string) => {
    try {
      const newStock = stockValues[productId];
      await fetch(`/api/admin/products/${productId}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      
      // Update local state
      setProducts(prev => prev.map((p: any) => 
        p.id === productId ? { ...p, stock: newStock } : p
      ));
      
      setEditingStock(null);
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const toggleProductStatus = async (productId: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/admin/products/${productId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      
      // Update local state
      setProducts(prev => prev.map((p: any) => 
        p.id === productId ? { ...p, is_active: !currentStatus } : p
      ));
    } catch (error) {
      console.error('Error updating status:', error);
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
          <h1 className="text-2xl font-bold text-[#2C1A0E] font-['Playfair_Display']">Produits</h1>
          <p className="text-[#A0785A]">
            Gestion de votre catalogue et des stocks ({products.length} produits)
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/admin/produits/creer'}
          className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un produit
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Total Produits</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">{products.length}</p>
            </div>
            <Package className="h-8 w-8 text-[#8B4513]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">En ligne</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {products.filter((p: any) => p.is_active).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Rupture de stock</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {products.filter((p: any) => (p.stock || 0) === 0).length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Stock bas</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {products.filter((p: any) => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
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
                placeholder="Rechercher par nom ou catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:w-48">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((category: string) => (
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
              className="w-full px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">En ligne</option>
              <option value="inactif">Hors ligne</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-[#E8D5C0] rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#8B4513] text-white' : 'text-[#A0785A]'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[#8B4513] text-white' : 'text-[#A0785A]'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => {
            const stockStatus = getStockStatus(product.stock || 0);
            const StockIcon = stockStatus.icon;
            
            return (
              <div key={product.id} className="bg-white rounded-lg border border-[#E8D5C0] overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="aspect-square bg-[#FFF8F0] relative">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-[#E8D5C0]" />
                    </div>
                  )}
                  
                  {/* Stock Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bgColor} ${stockStatus.color}`}>
                    <StockIcon className="w-3 h-3 inline mr-1" />
                    {stockStatus.label}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-[#2C1A0E] mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-[#A0785A] mb-2">{product.category?.name || 'Non catégorisé'}</p>
                  
                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-lg font-bold text-[#8B4513]">
                      {formatPriceEUR(product.price || 0)}
                    </span>
                  </div>

                  {/* Stock Management */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#A0785A]">Stock:</span>
                      {editingStock === product.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            value={stockValues[product.id]}
                            onChange={(e) => handleStockChange(product.id, e.target.value)}
                            className="w-16 px-2 py-1 border border-[#E8D5C0] rounded text-sm"
                            min="0"
                          />
                          <button
                            onClick={() => handleStockUpdate(product.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingStock(null)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-[#2C1A0E]">{stockValues[product.id]}</span>
                          <button
                            onClick={() => setEditingStock(product.id)}
                            className="text-[#8B4513] hover:text-[#6b3410]"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-[#A0785A]">Statut:</span>
                    <button
                      onClick={() => toggleProductStatus(product.id, product.is_active)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(product.is_active)}`}
                    >
                      {getStatusLabel(product.is_active)}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-[#E8D5C0] pt-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
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
                    <button className="text-[#A0785A] hover:text-[#2C1A0E]">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#E8D5C0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E8D5C0]">
                {filteredProducts.map((product: any) => {
                  const stockStatus = getStockStatus(product.stock || 0);
                  const StockIcon = stockStatus.icon;
                  
                  return (
                    <tr key={product.id} className="hover:bg-[#FFF8F0]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-[#2C1A0E]">
                              {product.name}
                            </div>
                            <div className="text-xs text-[#A0785A]">
                              {product.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A0785A]">
                        {product.category?.name || 'Non catégorisé'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C1A0E]">
                        {formatPriceEUR(product.price || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StockIcon className={`h-4 w-4 mr-2 ${stockStatus.color}`} />
                          {editingStock === product.id ? (
                            <div className="flex items-center space-x-1">
                              <input
                                type="number"
                                value={stockValues[product.id]}
                                onChange={(e) => handleStockChange(product.id, e.target.value)}
                                className="w-16 px-2 py-1 border border-[#E8D5C0] rounded text-sm"
                                min="0"
                              />
                              <button
                                onClick={() => handleStockUpdate(product.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <CheckCircle className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setEditingStock(null)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <XCircle className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-[#2C1A0E]">{stockValues[product.id]}</span>
                              <button
                                onClick={() => setEditingStock(product.id)}
                                className="text-[#8B4513] hover:text-[#6b3410]"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleProductStatus(product.id, product.is_active)}
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(product.is_active)}`}
                        >
                          {getStatusLabel(product.is_active)}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedProduct(product)}
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-[#A0785A]">
              Aucun produit trouvé
            </div>
          )}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8D5C0]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2C1A0E]">
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-[#A0785A] hover:text-[#2C1A0E]"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Product Image */}
              {selectedProduct.image_url && (
                <div className="flex justify-center">
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-[#A0785A]">Slug</h3>
                  <p className="font-medium text-[#2C1A0E]">{selectedProduct.slug}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#A0785A]">Catégorie</h3>
                  <p className="font-medium text-[#2C1A0E]">{selectedProduct.category?.name || 'Non catégorisé'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#A0785A]">Prix</h3>
                  <p className="font-medium text-[#2C1A0E]">{formatPriceEUR(selectedProduct.price || 0)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#A0785A]">Stock</h3>
                  <p className="font-medium text-[#2C1A0E]">{selectedProduct.stock || 0} unités</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#A0785A]">Statut</h3>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(selectedProduct.is_active)}`}>
                    {getStatusLabel(selectedProduct.is_active)}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#A0785A]">Ventes</h3>
                  <p className="font-medium text-[#2C1A0E]">{selectedProduct.sales_count || 0} ventes</p>
                </div>
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <div>
                  <h3 className="text-sm font-medium text-[#A0785A] mb-2">Description</h3>
                  <div className="bg-[#FFF8F0] rounded-lg p-4">
                    <p className="text-[#2C1A0E]">{selectedProduct.description}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-[#8B4513] text-white py-2 px-4 rounded-lg hover:bg-[#6b3410] transition-colors">
                  Modifier le produit
                </button>
                <button className="flex-1 border border-[#E8D5C0] text-[#2C1A0E] py-2 px-4 rounded-lg hover:bg-[#FFF8F0] transition-colors">
                  Dupliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
