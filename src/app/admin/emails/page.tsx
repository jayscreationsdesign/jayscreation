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
  Mail,
  Send,
  FileText,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description?: string;
  type: 'welcome' | 'order_confirmation' | 'order_shipped' | 'password_reset' | 'newsletter' | 'custom';
  content: string;
  variables: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  template_id?: string;
  content?: string;
  recipient_count: number;
  sent_count: number;
  opened_count: number;
  clicked_count: number;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  scheduled_at?: string;
  sent_at?: string;
  created_at: string;
}

interface EmailLog {
  id: string;
  to_email: string;
  subject: string;
  template_name?: string;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  sent_at: string;
  opened_at?: string;
  clicked_at?: string;
  error_message?: string;
}

export default function Emails() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'templates' | 'campaigns' | 'logs'>('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  
  // Form states
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    description: '',
    type: 'custom' as const,
    content: '',
    variables: '',
    is_active: true
  });
  
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    subject: '',
    template_id: '',
    content: '',
    recipient_filter: 'all',
    scheduled_at: ''
  });
  
  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const [templatesRes, campaignsRes, logsRes] = await Promise.all([
        fetch('/api/admin/emails/templates'),
        fetch('/api/admin/emails/campaigns'),
        fetch('/api/admin/emails/logs')
      ]);

      const templatesData = await templatesRes.json();
      const campaignsData = await campaignsRes.json();
      const logsData = await logsRes.json();

      console.log('DEBUG EMAIL TEMPLATES TYPE', typeof templatesData, Array.isArray(templatesData), templatesData);
      console.log('DEBUG EMAIL CAMPAIGNS TYPE', typeof campaignsData, Array.isArray(campaignsData), campaignsData);
      console.log('DEBUG EMAIL LOGS TYPE', typeof logsData, Array.isArray(logsData), logsData);

      const safeTemplates: EmailTemplate[] = Array.isArray(templatesData) ? templatesData : [];
      const safeCampaigns: EmailCampaign[] = Array.isArray(campaignsData) ? campaignsData : [];
      const safeLogs: EmailLog[] = Array.isArray(logsData) ? logsData : [];

      setTemplates(safeTemplates);
      setCampaigns(safeCampaigns);
      setLogs(safeLogs);
    } catch (error) {
      console.error('Erreur emails:', error);
      setTemplates([]);
      setCampaigns([]);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async () => {
    try {
      const variables = templateForm.variables.split(',').map(v => v.trim()).filter(Boolean);
      const data = { ...templateForm, variables };
      console.log('Sauvegarde template:', data);
      setShowTemplateModal(false);
      setSelectedTemplate(null);
      setTemplateForm({
        name: '',
        subject: '',
        description: '',
        type: 'custom',
        content: '',
        variables: '',
        is_active: true
      });
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleSaveCampaign = async () => {
    try {
      console.log('Sauvegarde campagne:', campaignForm);
      setShowCampaignModal(false);
      setSelectedCampaign(null);
      setCampaignForm({
        name: '',
        subject: '',
        template_id: '',
        content: '',
        recipient_filter: 'all',
        scheduled_at: ''
      });
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleSendTest = async () => {
    if (!selectedTemplate || !testEmail.trim()) return;
    
    try {
      console.log('Envoi test email:', selectedTemplate.id, testEmail);
      setShowTestModal(false);
      setTestEmail('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'opened': return 'bg-purple-100 text-purple-800';
      case 'clicked': return 'bg-indigo-100 text-indigo-800';
      case 'bounced': return 'bg-red-100 text-red-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'sending': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome': return 'bg-green-100 text-green-800';
      case 'order_confirmation': return 'bg-blue-100 text-blue-800';
      case 'order_shipped': return 'bg-purple-100 text-purple-800';
      case 'password_reset': return 'bg-yellow-100 text-yellow-800';
      case 'newsletter': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-2xl font-bold text-[#2C1A0E]">Emails</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-[#A0785A] text-white rounded-lg hover:bg-[#8B5A3C] transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-[#E8D5C0]">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'templates', label: 'Templates', icon: FileText },
              { id: 'campaigns', label: 'Campagnes', icon: Send },
              { id: 'logs', label: 'Logs', icon: Clock }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#8B4513] text-[#8B4513]'
                      : 'border-transparent text-[#A0785A] hover:text-[#2C1A0E]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'templates' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher un template..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  >
                    <option value="all">Tous les types</option>
                    <option value="welcome">Welcome</option>
                    <option value="order_confirmation">Confirmation commande</option>
                    <option value="order_shipped">Expédition</option>
                    <option value="password_reset">Reset mot de passe</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="custom">Custom</option>
                  </select>
                  <button
                    onClick={() => setShowTemplateModal(true)}
                    className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau template
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates
                  .filter(template => {
                    const matchesSearch = 
                      template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      template.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      template.description?.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesType = typeFilter === 'all' || template.type === typeFilter;
                    return matchesSearch && matchesType;
                  })
                  .map((template) => (
                    <div key={template.id} className="border border-[#E8D5C0] rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-[#2C1A0E]">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                        </div>
                        <div className="flex space-x-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                            {template.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            template.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {template.is_active ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                      </div>
                      
                      {template.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{template.variables.length} variables</span>
                        <span>{new Date(template.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedTemplate(template)}
                          className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTemplate(template);
                            setShowTemplateModal(true);
                          }}
                          className="flex-1 px-3 py-2 text-[#8B4513] hover:bg-[#F9F5F0] rounded-lg transition-colors text-sm"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTemplate(template);
                            setShowTestModal(true);
                          }}
                          className="flex-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm"
                        >
                          Test
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}

          {activeTab === 'campaigns' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher une campagne..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowCampaignModal(true)}
                  className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle campagne
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9F5F0]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Campagne
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Destinataires
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8D5C0]">
                    {campaigns
                      .filter(campaign => 
                        campaign.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        campaign.subject?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((campaign) => (
                        <tr key={campaign.id} className="hover:bg-[#F9F5F0]">
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium text-[#2C1A0E]">{campaign.name}</p>
                              <p className="text-sm text-gray-600">{campaign.subject}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center text-sm">
                              <Users className="w-4 h-4 mr-1 text-[#A0785A]" />
                              {campaign.sent_count} / {campaign.recipient_count}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center">
                                <Mail className="w-3 h-3 mr-1 text-blue-500" />
                                {campaign.opened_count} ouverts
                              </div>
                              <div className="flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1 text-green-500" />
                                {campaign.clicked_count} cliqués
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-600">
                              {campaign.scheduled_at && campaign.status === 'scheduled' ? (
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(campaign.scheduled_at).toLocaleDateString('fr-FR')}
                                </div>
                              ) : campaign.sent_at ? (
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(campaign.sent_at).toLocaleDateString('fr-FR')}
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(campaign.created_at).toLocaleDateString('fr-FR')}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setSelectedCampaign(campaign)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Voir les détails"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCampaign(campaign);
                                  setShowCampaignModal(true);
                                }}
                                className="p-2 text-[#8B4513] hover:bg-[#F9F5F0] rounded-lg transition-colors"
                                title="Modifier"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'logs' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher dans les logs..."
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
                  <option value="sent">Envoyés</option>
                  <option value="delivered">Livrés</option>
                  <option value="opened">Ouverts</option>
                  <option value="clicked">Cliqués</option>
                  <option value="bounced">Rejetés</option>
                  <option value="failed">Échecs</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9F5F0]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Destinataire
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Sujet
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Template
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Date d'envoi
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8D5C0]">
                    {logs
                      .filter(log => {
                        const matchesSearch = 
                          log.to_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.template_name?.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((log) => (
                        <tr key={log.id} className="hover:bg-[#F9F5F0]">
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-[#A0785A]" />
                              <span className="text-sm">{log.to_email}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm text-[#2C1A0E]">{log.subject}</p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm text-gray-600">{log.template_name || '-'}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(log.sent_at).toLocaleDateString('fr-FR')}
                              </div>
                              {log.opened_at && (
                                <div className="text-xs text-green-600 mt-1">
                                  Ouvert: {new Date(log.opened_at).toLocaleDateString('fr-FR')}
                                </div>
                              )}
                              {log.clicked_at && (
                                <div className="text-xs text-blue-600 mt-1">
                                  Cliqué: {new Date(log.clicked_at).toLocaleDateString('fr-FR')}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => console.log('Voir détails log:', log.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Voir les détails"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              {selectedTemplate ? 'Modifier le template' : 'Nouveau template'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="Nom du template"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Type *
                  </label>
                  <select
                    value={templateForm.type}
                    onChange={(e) => setTemplateForm({...templateForm, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  >
                    <option value="welcome">Welcome</option>
                    <option value="order_confirmation">Confirmation commande</option>
                    <option value="order_shipped">Expédition</option>
                    <option value="password_reset">Reset mot de passe</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Sujet *
                </label>
                <input
                  type="text"
                  value={templateForm.subject}
                  onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Sujet de l'email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm({...templateForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Description du template"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Contenu *
                </label>
                <textarea
                  value={templateForm.content}
                  onChange={(e) => setTemplateForm({...templateForm, content: e.target.value})}
                  rows={10}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent font-mono text-sm"
                  placeholder="Contenu HTML de l'email..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Variables
                </label>
                <input
                  type="text"
                  value={templateForm.variables}
                  onChange={(e) => setTemplateForm({...templateForm, variables: e.target.value})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="customer_name, order_number, etc. (séparées par des virgules)"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={templateForm.is_active}
                  onChange={(e) => setTemplateForm({...templateForm, is_active: e.target.checked})}
                  className="w-4 h-4 text-[#8B4513] border-[#E8D5C0] rounded focus:ring-[#8B4513]"
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-[#2C1A0E]">
                  Template actif
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowTemplateModal(false);
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveTemplate}
                disabled={!templateForm.name.trim() || !templateForm.subject.trim() || !templateForm.content.trim()}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedTemplate ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Modal */}
      {showTestModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              Tester le template
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Template
                </label>
                <p className="text-[#2C1A0E] font-medium">{selectedTemplate.name}</p>
                <p className="text-sm text-gray-600">{selectedTemplate.subject}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Email de test *
                </label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="test@example.com"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowTestModal(false);
                  setTestEmail('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSendTest}
                disabled={!testEmail.trim()}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Envoyer le test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
