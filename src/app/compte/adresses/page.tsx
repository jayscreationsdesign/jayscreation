'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, MapPin, Home, Briefcase, User } from 'lucide-react';

const COLORS = {
  gold: '#C8A96E',
  goldLight: '#D4B87A',
  cream: '#FAF7F2',
  chocolat: '#3C2415',
  chocolatLight: '#4E3222',
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E8E0D4',
  creamDark: '#F0EBE3',
};

const FONTS = {
  playfair: '"Playfair Display", serif',
  inter: '"Inter", sans-serif',
};

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export default function AdressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    type: 'home',
    name: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    address2: '',
    postalCode: '',
    city: '',
    country: 'France',
    phone: '',
    isDefault: false,
  });

  useEffect(() => {
    // Simuler le chargement des adresses
    setTimeout(() => {
      setAddresses([
        {
          id: '1',
          type: 'home',
          name: 'Domicile',
          firstName: 'Jean',
          lastName: 'Dupont',
          address: '15 Rue des Fleurs',
          address2: 'Appartement 3B',
          postalCode: '75001',
          city: 'Paris',
          country: 'France',
          phone: '06 12 34 56 78',
          isDefault: true,
        },
        {
          id: '2',
          type: 'work',
          name: 'Bureau',
          firstName: 'Jean',
          lastName: 'Dupont',
          company: 'Jay\'s Creations Design',
          address: '123 Avenue des Champs-Élysées',
          postalCode: '75008',
          city: 'Paris',
          country: 'France',
          phone: '01 23 45 67 89',
          isDefault: false,
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Briefcase className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'home': return COLORS.gold;
      case 'work': return COLORS.chocolat;
      default: return COLORS.textLight;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, ...formData as Address }
          : addr
      ));
    } else {
      const { id, ...formDataWithoutId } = formData as Address;
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formDataWithoutId,
      };
      setAddresses([...addresses, newAddress]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: '',
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      address2: '',
      postalCode: '',
      city: '',
      country: 'France',
      phone: '',
      isDefault: false,
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8A96E] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl font-medium mb-2" style={{ color: COLORS.chocolat }}>
            Chargement de vos adresses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/compte" className="hover:text-[#3C2415] transition-colors">Mon compte</Link>
            <span>/</span>
            <span style={{ color: COLORS.chocolat }}>Mes Adresses</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
          >
            Mes Adresses
          </h1>
          <p className="text-gray-600 mb-6">
            Gérez vos adresses de livraison et de facturation
          </p>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Ajouter une adresse
          </button>
        </div>

        {/* Formulaire d'ajout/modification */}
        {showAddForm && (
          <div className="bg-white rounded-2xl border p-6 mb-8" style={{ borderColor: COLORS.border }}>
            <h2 
              className="text-xl font-bold mb-6"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              {editingAddress ? 'Modifier l\'adresse' : 'Ajouter une nouvelle adresse'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    Type d'adresse *
                  </label>
                  <select
                    id="address-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Address['type'] })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                    style={{ borderColor: COLORS.border }}
                  >
                    <option value="home">Domicile</option>
                    <option value="work">Bureau</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    Nom de l'adresse *
                  </label>
                  <input
                    type="text"
                    id="address-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                    style={{ borderColor: COLORS.border }}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="address-firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                    style={{ borderColor: COLORS.border }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="address-lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                    style={{ borderColor: COLORS.border }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                  Entreprise (optionnel)
                </label>
                <input
                  type="text"
                  id="address-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                  style={{ borderColor: COLORS.border }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                  Adresse *
                </label>
                <input
                  type="text"
                  id="address-address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                  style={{ borderColor: COLORS.border }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                  Complément d'adresse (optionnel)
                </label>
                <input
                  type="text"
                  id="address-address2"
                  value={formData.address2}
                  onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                  style={{ borderColor: COLORS.border }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    Code postal *
                  </label>
                  <input
                    type="text"
                    id="address-postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                    style={{ borderColor: COLORS.border }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    Ville *
                  </label>
                  <input
                    type="text"
                    id="address-city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                    style={{ borderColor: COLORS.border }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    Pays *
                  </label>
                  <input
                    type="text"
                    id="address-country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                    style={{ borderColor: COLORS.border }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                  Téléphone (optionnel)
                </label>
                <input
                  type="tel"
                  id="address-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                  style={{ borderColor: COLORS.border }}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`address-isDefault-${editingAddress ? 'edit' : 'new'}`}
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor={`address-isDefault-${editingAddress ? 'edit' : 'new'}`} className="text-sm" style={{ color: COLORS.text }}>
                  Définir comme adresse par défaut
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-[#8B4513] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
                >
                  {editingAddress ? 'Mettre à jour' : 'Ajouter l\'adresse'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-full font-medium border transition-colors"
                  style={{ 
                    borderColor: COLORS.border, 
                    color: COLORS.text,
                    backgroundColor: 'white'
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des adresses */}
        {addresses.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: COLORS.border }}>
            <MapPin className="h-16 w-16 mx-auto mb-4" style={{ color: COLORS.gold }} />
            <h3 
              className="text-xl font-bold mb-2"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              Aucune adresse enregistrée
            </h3>
            <p className="text-gray-600 mb-6">
              Ajoutez votre première adresse pour faciliter vos commandes
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Ajouter une adresse
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div 
                key={address.id}
                className="bg-white rounded-2xl border p-6 transition-all hover:shadow-lg"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${getTypeColor(address.type)}20` }}
                      >
                        {getTypeIcon(address.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 
                            className="font-bold text-lg"
                            style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
                          >
                            {address.name}
                          </h3>
                          {address.isDefault && (
                            <span 
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: '#8B4513',
                                color: COLORS.white
                              }}
                            >
                              Par défaut
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">
                          {address.firstName} {address.lastName}
                          {address.company && (
                            <span className="block">{address.company}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-gray-700 space-y-1">
                      <p>{address.address}</p>
                      {address.address2 && <p>{address.address2}</p>}
                      <p>{address.postalCode} {address.city}</p>
                      <p>{address.country}</p>
                      {address.phone && <p>{address.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{ color: COLORS.text }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 rounded-lg hover:bg-[#8B4513]10 transition-colors"
                      style={{ color: '#8B4513' }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {!address.isDefault && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: COLORS.border }}>
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-sm font-medium hover:underline"
                      style={{ color: '#8B4513' }}
                    >
                      Définir comme adresse par défaut
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
