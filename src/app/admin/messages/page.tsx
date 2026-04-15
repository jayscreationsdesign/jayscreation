'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Mail,
  Calendar,
  MessageSquare,
  Reply,
  Trash2,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
  replied_at?: string;
  priority: 'low' | 'medium' | 'high';
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  
  // Reply form state
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      const data = await response.json();
      console.log('DEBUG MESSAGES TYPE', typeof data, Array.isArray(data), data);
      const safeMessages: Message[] = Array.isArray(data) ? data : [];
      setMessages(safeMessages);
    } catch (error) {
      console.error('Erreur messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const safeMessages = Array.isArray(messages) ? messages : [];
  const filteredMessages = safeMessages.filter(message => {
    const matchesSearch = 
      message.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    try {
      // Logique pour envoyer la réponse
      console.log('Réponse envoyée:', replyText);
      setShowReplyModal(false);
      setReplyText('');
      setSelectedMessage(null);
      fetchMessages(); // Rafraîchir les messages
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse:', error);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      // Logique pour marquer comme lu
      console.log('Message marqué comme lu:', messageId);
      fetchMessages(); // Rafraîchir
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  };

  const handleArchive = async (messageId: string) => {
    try {
      // Logique pour archiver
      console.log('Message archivé:', messageId);
      fetchMessages(); // Rafraîchir
    } catch (error) {
      console.error('Erreur lors de l\'archivage:', error);
    }
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
        <h1 className="text-2xl font-bold text-[#2C1A0E]">Messages</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="unread">Non lus</option>
            <option value="read">Lus</option>
            <option value="replied">Répondus</option>
            <option value="archived">Archivés</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          >
            <option value="all">Toutes les priorités</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>

          <button className="flex items-center px-4 py-2 border border-[#E8D5C0] rounded-lg hover:bg-[#F9F5F0] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun message trouvé</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E8D5C0]">
            {filteredMessages.map((message) => (
              <div key={message.id} className="p-4 hover:bg-[#F9F5F0] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-[#2C1A0E]">{message.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {message.customer_name} ({message.customer_email})
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(message.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 line-clamp-2">{message.message}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedMessage(message)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Voir"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMessage(message);
                        setShowReplyModal(true);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Répondre"
                    >
                      <Reply className="w-4 h-4" />
                    </button>
                    {message.status === 'unread' && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Marquer comme lu"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleArchive(message.id)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Archiver"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de réponse */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              Répondre à {selectedMessage.customer_name}
            </h3>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Sujet:</strong> {selectedMessage.subject}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Message:</strong> {selectedMessage.message}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#A0785A] mb-2">
                Votre réponse
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                placeholder="Écrivez votre réponse..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowReplyModal(false);
                  setReplyText('');
                  setSelectedMessage(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Envoyer la réponse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualisation */}
      {selectedMessage && !showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              {selectedMessage.subject}
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {selectedMessage.customer_name} ({selectedMessage.customer_email})
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                  {selectedMessage.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                  {selectedMessage.priority}
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={() => setShowReplyModal(true)}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
              >
                Répondre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
