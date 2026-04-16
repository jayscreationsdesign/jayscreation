'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Send,
  ShoppingCart,
  Download,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

interface Quote {
  id: string;
  customer_name: string;
  customer_email: string;
  project_type: string;
  estimated_price: number;
  quote_number: string;
  status: 'pending' | 'sent' | 'accepted' | 'rejected' | 'expired';
  created_at: string;
  sent_at?: string;
  expires_at?: string;
  notes?: string;
  items?: QuoteItem[];
}

interface QuoteItem {
  name: string;
  description?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export default function Devis() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [showRelanceModal, setShowRelanceModal] = useState(false);
  
  // New quote form state
  const [newQuote, setNewQuote] = useState({
    customer_name: '',
    customer_email: '',
    project_type: '',
    description: '',
    estimated_price: 0,
    notes: '',
    items: [{ name: '', quantity: 1, unit_price: 0, total_price: 0 }]
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes');
      const data = await response.json();
      console.log('DEBUG QUOTES TYPE', typeof data, Array.isArray(data), data);
      const safeQuotes: Quote[] = Array.isArray(data) ? data : [];
      setQuotes(safeQuotes);
    } catch (error) {
      console.error('Erreur devis:', error);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const safeQuotes = Array.isArray(quotes) ? quotes : [];
  const filteredQuotes = safeQuotes.filter(quote => {
    const matchesSearch = 
      quote.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.quote_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'sent': return Mail;
      case 'accepted': return CheckCircle;
      case 'rejected': return XCircle;
      case 'expired': return RefreshCw;
      default: return FileText;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'sent': return 'Envoyé';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      case 'expired': return 'Expiré';
      default: return status;
    }
  };

  const handleSendQuote = async (quoteId: string) => {
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}/send`, {
        method: 'POST'
      });

      if (response.ok) {
        fetchQuotes();
        alert('Devis envoyé avec succès');
      }
    } catch (error) {
      console.error('Error sending quote:', error);
    }
  };

  const handleRelance = async (quoteId: string) => {
    try {
      const quote = quotes.find(q => q.id === quoteId);
      if (!quote) return;

      // Appelle la fonction sendQuoteFollowUpEmail
      const response = await fetch('/api/admin/quotes/relance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: quote.customer_name,
          customerEmail: quote.customer_email,
          projectDescription: quote.project_type,
          estimatedPrice: quote.estimated_price,
          quoteNumber: quote.quote_number
        })
      });

      if (response.ok) {
        alert('Email de relance envoyé avec succès');
      }
    } catch (error) {
      console.error('Error sending relance:', error);
    }
  };

  const handleConvertToOrder = async (quoteId: string) => {
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}/convert`, {
        method: 'POST'
      });

      if (response.ok) {
        fetchQuotes();
        alert('Devis converti en commande avec succès');
      }
    } catch (error) {
      console.error('Error converting quote:', error);
    }
  };

  const handleCreateQuote = async () => {
    try {
      const response = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuote)
      });

      if (response.ok) {
        fetchQuotes();
        setShowNewQuoteModal(false);
        setNewQuote({
          customer_name: '',
          customer_email: '',
          project_type: '',
          description: '',
          estimated_price: 0,
          notes: '',
          items: [{ name: '', quantity: 1, unit_price: 0, total_price: 0 }]
        });
        alert('Devis créé avec succès');
      }
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  const updateQuoteItem = (index: number, field: string, value: any) => {
    const updatedItems = [...newQuote.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Recalculate total price
    if (field === 'quantity' || field === 'unit_price') {
      updatedItems[index].total_price = updatedItems[index].quantity * updatedItems[index].unit_price;
    }
    
    // Update estimated price
    const total = updatedItems.reduce((sum, item) => sum + item.total_price, 0);
    
    setNewQuote({
      ...newQuote,
      items: updatedItems,
      estimated_price: total
    });
  };

  const addQuoteItem = () => {
    setNewQuote({
      ...newQuote,
      items: [...newQuote.items, { name: '', quantity: 1, unit_price: 0, total_price: 0 }]
    });
  };

  const removeQuoteItem = (index: number) => {
    const updatedItems = newQuote.items.filter((_, i) => i !== index);
    const total = updatedItems.reduce((sum, item) => sum + item.total_price, 0);
    
    setNewQuote({
      ...newQuote,
      items: updatedItems,
      estimated_price: total
    });
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
          <h1 className="text-2xl font-bold text-[#2C1A0E] font-['Playfair_Display']">Devis</h1>
          <p className="text-[#A0785A]">
            Gestion des devis et demandes de prix ({quotes.length} devis)
          </p>
        </div>
        <button 
          onClick={() => setShowNewQuoteModal(true)}
          className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau devis
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Total Devis</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">{quotes.length}</p>
            </div>
            <FileText className="h-8 w-8 text-[#8B4513]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">En attente</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {quotes.filter(q => q.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Acceptés</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {quotes.filter(q => q.status === 'accepted').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E8D5C0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#A0785A]">Valeur totale</p>
              <p className="text-2xl font-bold text-[#2C1A0E] mt-2">
                {quotes.reduce((sum, q) => sum + q.estimated_price, 0).toFixed(2)} €
              </p>
            </div>
            <ShoppingBag className="h-8 w-8 text-[#D4A574]" />
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
                placeholder="Rechercher par nom, email ou N° devis..."
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
              <option value="pending">En attente</option>
              <option value="sent">Envoyés</option>
              <option value="accepted">Acceptés</option>
              <option value="rejected">Refusés</option>
              <option value="expired">Expirés</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg border border-[#E8D5C0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFF8F0]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  N° Devis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                  Projet
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
              {filteredQuotes.map((quote) => {
                const StatusIcon = getStatusIcon(quote.status);
                
                return (
                  <tr key={quote.id} className="hover:bg-[#FFF8F0]">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C1A0E]">
                      #{quote.quote_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-[#2C1A0E]">
                          {quote.customer_name}
                        </div>
                        <div className="text-xs text-[#A0785A] flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {quote.customer_email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2C1A0E]">
                      {quote.project_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C1A0E]">
                      {quote.estimated_price.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {getStatusLabel(quote.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A0785A]">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(quote.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="text-[#8B4513] hover:text-[#6b3410]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {quote.status === 'pending' && (
                          <button
                            onClick={() => handleSendQuote(quote.id)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Envoyer le devis"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        )}
                        
                        {(quote.status === 'sent' || quote.status === 'pending') && (
                          <button
                            onClick={() => handleRelance(quote.id)}
                            className="text-[#D4A574] hover:text-[#c1965f]"
                            title="Relancer"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        )}
                        
                        {quote.status === 'accepted' && (
                          <button
                            onClick={() => handleConvertToOrder(quote.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Convertir en commande"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button className="text-gray-600 hover:text-gray-800">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-8 text-[#A0785A]">
            Aucun devis trouvé
          </div>
        )}
      </div>

      {/* New Quote Modal */}
      {showNewQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8D5C0]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2C1A0E]">Nouveau Devis</h2>
                <button
                  onClick={() => setShowNewQuoteModal(false)}
                  className="text-[#A0785A] hover:text-[#2C1A0E]"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Nom du client
                  </label>
                  <input
                    type="text"
                    value={newQuote.customer_name}
                    onChange={(e) => setNewQuote({...newQuote, customer_name: e.target.value})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="Nom du client"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Email du client
                  </label>
                  <input
                    type="email"
                    value={newQuote.customer_email}
                    onChange={(e) => setNewQuote({...newQuote, customer_email: e.target.value})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="email@client.com"
                  />
                </div>
              </div>

              {/* Project Info */}
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Type de projet
                </label>
                <input
                  type="text"
                  value={newQuote.project_type}
                  onChange={(e) => setNewQuote({...newQuote, project_type: e.target.value})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Ex: Création de logo, Site web, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Description du projet
                </label>
                <textarea
                  value={newQuote.description}
                  onChange={(e) => setNewQuote({...newQuote, description: e.target.value})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  rows={3}
                  placeholder="Description détaillée du projet..."
                />
              </div>

              {/* Quote Items */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-[#A0785A]">
                    Articles du devis
                  </label>
                  <button
                    onClick={addQuoteItem}
                    className="text-[#8B4513] hover:text-[#6b3410]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {newQuote.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-[#FFF8F0] rounded-lg">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateQuoteItem(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                          placeholder="Nom de l'article"
                        />
                      </div>
                      <div className="w-24">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuoteItem(index, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                          placeholder="Qté"
                          min="1"
                        />
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          value={item.unit_price}
                          onChange={(e) => updateQuoteItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                          placeholder="Prix"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="w-24 text-sm font-medium text-[#2C1A0E]">
                        {item.total_price.toFixed(2)} €
                      </div>
                      {newQuote.items.length > 1 && (
                        <button
                          onClick={() => removeQuoteItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-[#E8D5C0] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#2C1A0E]">Total estimé</span>
                  <span className="text-xl font-bold text-[#8B4513]">
                    {newQuote.estimated_price.toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Notes internes
                </label>
                <textarea
                  value={newQuote.notes}
                  onChange={(e) => setNewQuote({...newQuote, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  rows={2}
                  placeholder="Notes internes..."
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={handleCreateQuote}
                  className="flex-1 bg-[#8B4513] text-white py-2 px-4 rounded-lg hover:bg-[#6b3410] transition-colors"
                >
                  Créer le devis
                </button>
                <button
                  onClick={() => setShowNewQuoteModal(false)}
                  className="flex-1 border border-[#E8D5C0] text-[#2C1A0E] py-2 px-4 rounded-lg hover:bg-[#FFF8F0] transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8D5C0]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2C1A0E]">
                  Devis #{selectedQuote.quote_number}
                </h2>
                <button
                  onClick={() => setSelectedQuote(null)}
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
                      <p className="font-medium text-[#2C1A0E]">{selectedQuote.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A0785A]">Email</p>
                      <p className="font-medium text-[#2C1A0E]">{selectedQuote.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A0785A]">Date de création</p>
                      <p className="font-medium text-[#2C1A0E]">
                        {new Date(selectedQuote.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A0785A]">Statut</p>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedQuote.status)}`}>
                        {getStatusLabel(selectedQuote.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <h3 className="text-lg font-semibold text-[#2C1A0E] mb-3">Projet</h3>
                <div className="bg-[#FFF8F0] rounded-lg p-4">
                  <div className="mb-3">
                    <p className="text-sm text-[#A0785A]">Type de projet</p>
                    <p className="font-medium text-[#2C1A0E]">{selectedQuote.project_type}</p>
                  </div>
                  {selectedQuote.notes && (
                    <div>
                      <p className="text-sm text-[#A0785A]">Description</p>
                      <p className="font-medium text-[#2C1A0E]">{selectedQuote.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-[#E8D5C0] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#2C1A0E]">Montant estimé</span>
                  <span className="text-xl font-bold text-[#8B4513]">
                    {selectedQuote.estimated_price.toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedQuote.status === 'pending' && (
                  <button
                    onClick={() => handleSendQuote(selectedQuote.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-4 w-4 mr-2 inline" />
                    Envoyer le devis
                  </button>
                )}
                
                {(selectedQuote.status === 'sent' || selectedQuote.status === 'pending') && (
                  <button
                    onClick={() => handleRelance(selectedQuote.id)}
                    className="flex-1 bg-[#D4A574] text-white py-2 px-4 rounded-lg hover:bg-[#c1965f] transition-colors"
                  >
                    <RefreshCw className="h-4 w-4 mr-2 inline" />
                    Relancer
                  </button>
                )}
                
                {selectedQuote.status === 'accepted' && (
                  <button
                    onClick={() => handleConvertToOrder(selectedQuote.id)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 inline" />
                    Convertir en commande
                  </button>
                )}
                
                <button className="flex-1 border border-[#E8D5C0] text-[#2C1A0E] py-2 px-4 rounded-lg hover:bg-[#FFF8F0] transition-colors">
                  <Download className="h-4 w-4 mr-2 inline" />
                  Télécharger PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
