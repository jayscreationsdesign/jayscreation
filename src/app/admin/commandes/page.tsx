'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar,
  DollarSign,
  Package,
  User
} from 'lucide-react';
import { CommandeStats } from '@/types/admin';

export default function Commandes() {
  const [commandes, setCommandes] = useState<CommandeStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCommande, setSelectedCommande] = useState<CommandeStats | null>(null);

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      const response = await fetch('/api/admin/commandes');
      const data = await response.json();
      setCommandes(data);
    } catch (error) {
      console.error('Erreur commandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCommandes = commandes.filter(commande => {
    const matchesSearch = 
      commande.client_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.client_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || commande.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'payée':
        return 'bg-green-100 text-green-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'échouée':
        return 'bg-red-100 text-red-800';
      case 'annulée':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'payée':
        return 'Payée';
      case 'en_attente':
        return 'En attente';
      case 'échouée':
        return 'Échouée';
      case 'annulée':
        return 'Annulée';
      default:
        return status;
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
          <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
          <p className="text-gray-600">
            Gestion de toutes vos commandes
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </button>
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
                placeholder="Rechercher par nom, email ou N° commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="payée">Payée</option>
              <option value="échouée">Échouée</option>
              <option value="annulée">Annulée</option>
            </select>
          </div>
        </div>
      </div>

      {/* Commandes Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
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
              {filteredCommandes.map((commande) => (
                <tr key={commande.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{commande.id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {commande.client_nom}
                      </span>
                      <span className="text-xs text-gray-500">
                        {commande.client_email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(commande.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {commande.total.toFixed(2)}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(commande.statut)}`}>
                      {getStatusLabel(commande.statut)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedCommande(commande)}
                      className="text-[#8B4513] hover:text-[#6b3410] flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCommandes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune commande trouvée
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedCommande && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Détails Commande #{selectedCommande.id.slice(-8)}
                </h2>
                <button
                  onClick={() => setSelectedCommande(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations Client</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Nom</p>
                      <p className="font-medium">{selectedCommande.client_nom}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{selectedCommande.client_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Téléphone</p>
                      <p className="font-medium">{selectedCommande.client_telephone || 'Non renseigné'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{new Date(selectedCommande.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  {selectedCommande.adresse_livraison && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Adresse de livraison</p>
                      <p className="font-medium">{selectedCommande.adresse_livraison}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Articles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Articles Commandés</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {selectedCommande.articles && selectedCommande.articles.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCommande.articles.map((article: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{article.nom}</p>
                            <p className="text-sm text-gray-600">
                              Quantité: {article.quantite} × {article.prix.toFixed(2)}€
                            </p>
                          </div>
                          <p className="font-medium">
                            {(article.quantite * article.prix).toFixed(2)}€
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucun article trouvé</p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-[#8B4513]">
                    {selectedCommande.total.toFixed(2)}€
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-[#8B4513] text-white py-2 px-4 rounded-lg hover:bg-[#6b3410] transition-colors">
                  Changer le statut
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Ajouter une note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
