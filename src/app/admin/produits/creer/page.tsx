'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X,
  Package,
  Euro,
  Box,
  Tag
} from 'lucide-react';
import { formatPriceEUR } from '@/lib/formatPrice';

export default function CreerProduit() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    is_active: true,
    images: [] as string[],
    sku: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    }
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        weight: parseFloat(formData.weight) || null,
        dimensions: formData.weight ? {
          length: parseFloat(formData.dimensions.length) || null,
          width: parseFloat(formData.dimensions.width) || null,
          height: parseFloat(formData.dimensions.height) || null
        } : null
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        router.push('/admin/produits');
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Erreur lors de la création du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleDimensionChange = (field: keyof typeof formData.dimensions, value: string) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#A0785A] hover:text-[#8B4513] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#2C1A0E] font-['Playfair_Display']">
              Créer un produit
            </h1>
            <p className="text-[#A0785A]">
              Ajouter un nouveau produit à votre catalogue
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Création...' : 'Créer le produit'}
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-[#E8D5C0] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Informations générales</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="Entrez le nom du produit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="Décrivez votre produit..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
                      Prix (â¬) *
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0785A]" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        step="0.01"
                        min="0"
                        className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
                      Stock *
                    </label>
                    <div className="relative">
                      <Box className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0785A]" />
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
                    Catégorie
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0785A]" />
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
                    SKU (Référence)
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="SKU-001"
                  />
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Dimensions et poids</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
                    Poids (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
                    Dimensions (cm)
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#A0785A] mb-1">Longueur</label>
                      <input
                        type="number"
                        value={formData.dimensions.length}
                        onChange={(e) => handleDimensionChange('length', e.target.value)}
                        step="0.1"
                        min="0"
                        className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#A0785A] mb-1">Largeur</label>
                      <input
                        type="number"
                        value={formData.dimensions.width}
                        onChange={(e) => handleDimensionChange('width', e.target.value)}
                        step="0.1"
                        min="0"
                        className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#A0785A] mb-1">Hauteur</label>
                      <input
                        type="number"
                        value={formData.dimensions.height}
                        onChange={(e) => handleDimensionChange('height', e.target.value)}
                        step="0.1"
                        min="0"
                        className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                        placeholder="0.0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-[#FFF8F0] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Statut</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#8B4513] border-[#E8D5C0] rounded focus:ring-[#8B4513]"
                  />
                  <span className="text-sm text-[#2C1A0E]">Produit actif</span>
                </label>
                <p className="text-xs text-[#A0785A]">
                  Les produits actifs sont visibles dans la boutique
                </p>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-[#FFF8F0] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">Aperçu</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="w-32 h-32 bg-[#E8D5C0] rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Package className="w-8 h-8 text-[#A0785A]" />
                  </div>
                  <h4 className="font-medium text-[#2C1A0E]">
                    {formData.name || 'Nom du produit'}
                  </h4>
                  {formData.price && (
                    <p className="text-lg font-bold text-[#8B4513]">
                      {formatPriceEUR(parseFloat(formData.price))}
                    </p>
                  )}
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      formData.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {formData.is_active ? 'Actif' : 'Inactif'}
                    </span>
                    {formData.stock && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Stock: {formData.stock}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
