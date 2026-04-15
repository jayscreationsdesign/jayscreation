'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Mail, Phone, MapPin, Calendar, DollarSign, ShoppingCart, User, Crown, Star } from 'lucide-react';

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showAddPointsModal, setShowAddPointsModal] = useState(false);
  const [showTierModal, setShowTierModal] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/customers');
      const data = await response.json();
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#A0785A]">Chargement des clients...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2C1A0E]">Clients</h1>
        <button className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un client
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          Filtrer
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white border border-[#E8D5C0] rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[#2C1A0E]">
                  {client.first_name} {client.last_name}
                </h3>
                <p className="text-sm text-[#A0785A]">{client.email}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-[#8B4513] hover:bg-[#FFF8F0] rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-[#A0785A]">
                <Phone className="w-4 h-4 mr-2" />
                {client.telephone || 'Non renseigné'}
              </div>
              <div className="flex items-center text-sm text-[#A0785A]">
                <MapPin className="w-4 h-4 mr-2" />
                {client.address || 'Non renseigné'}
              </div>
              <div className="flex items-center text-sm text-[#A0785A]">
                <Calendar className="w-4 h-4 mr-2" />
                Inscrit le {new Date(client.created_at).toLocaleDateString()}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E8D5C0]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-[#D4A574]" />
                  <span className="text-sm font-medium text-[#2C1A0E]">
                    {client.loyalty_tier || 'Pétale'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-[#2C1A0E]">
                    {client.loyalty_points || 0} pts
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-[#D4A574] text-white rounded-lg hover:bg-[#c1965f] transition-colors text-sm">
                Voir les détails
              </button>
              <button className="flex-1 px-3 py-2 border border-[#E8D5C0] text-[#2C1A0E] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">
                Contacter
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-[#A0785A] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#2C1A0E] mb-2">Aucun client trouvé</h3>
          <p className="text-[#A0785A]">
            {searchTerm ? 'Aucun client ne correspond à votre recherche.' : 'Aucun client inscrit pour le moment.'}
          </p>
        </div>
      )}
    </div>
  );
}
