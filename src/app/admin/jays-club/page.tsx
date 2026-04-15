'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit,
  Gift,
  Users,
  TrendingUp,
  Award,
  Plus,
  Download,
  RefreshCw,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';

interface JayClubMember {
  id: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  points: number;
  points_earned: number;
  points_redeemed: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  join_date: string;
  last_activity: string;
  is_active: boolean;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points_required: number;
  points_value: number;
  tier_required: 'bronze' | 'silver' | 'gold' | 'platinum' | 'all';
  is_active: boolean;
  stock_quantity?: number;
  expires_at?: string;
  created_at: string;
}

export default function JaysClub() {
  const [members, setMembers] = useState<JayClubMember[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'members' | 'rewards' | 'analytics'>('members');
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<JayClubMember | null>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  
  // Form states
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [pointsReason, setPointsReason] = useState('');
  const [rewardForm, setRewardForm] = useState({
    title: '',
    description: '',
    points_required: 0,
    points_value: 0,
    tier_required: 'all' as const,
    stock_quantity: 0,
    expires_at: '',
    is_active: true
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const [membersRes, rewardsRes] = await Promise.all([
        fetch('/api/admin/jays-club/members'),
        fetch('/api/admin/jays-club/rewards')
      ]);

      const membersData = await membersRes.json();
      const rewardsData = await rewardsRes.json();

      console.log('DEBUG JAYS CLUB MEMBERS TYPE', typeof membersData, Array.isArray(membersData), membersData);
      console.log('DEBUG JAYS CLUB REWARDS TYPE', typeof rewardsData, Array.isArray(rewardsData), rewardsData);

      const safeMembers: JayClubMember[] = Array.isArray(membersData) ? membersData : [];
      const safeRewards: Reward[] = Array.isArray(rewardsData) ? rewardsData : [];

      setMembers(safeMembers);
      setRewards(safeRewards);
    } catch (error) {
      console.error('Erreur Jay\'s Club:', error);
      setMembers([]);
      setRewards([]);
    } finally {
      setLoading(false);
    }
  };

  const safeMembers = Array.isArray(members) ? members : [];
  const filteredMembers = safeMembers.filter(member => {
    const matchesSearch = 
      member.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.customer_phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = tierFilter === 'all' || member.tier === tierFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && member.is_active) ||
      (statusFilter === 'inactive' && !member.is_active);
    
    return matchesSearch && matchesTier && matchesStatus;
  });

  const safeRewards = Array.isArray(rewards) ? rewards : [];
  const filteredRewards = safeRewards.filter(reward => {
    const matchesSearch = 
      reward.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && reward.is_active;
  });

  const handleAddPoints = async () => {
    if (!selectedMember || pointsToAdd <= 0 || !pointsReason.trim()) return;
    
    try {
      console.log('Ajout de points:', selectedMember.id, pointsToAdd, pointsReason);
      setShowPointsModal(false);
      setPointsToAdd(0);
      setPointsReason('');
      setSelectedMember(null);
      fetchData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de points:', error);
    }
  };

  const handleSaveReward = async () => {
    try {
      console.log('Sauvegarde récompense:', rewardForm);
      setShowRewardModal(false);
      setRewardForm({
        title: '',
        description: '',
        points_required: 0,
        points_value: 0,
        tier_required: 'all',
        stock_quantity: 0,
        expires_at: '',
        is_active: true
      });
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return Award;
      case 'silver': return Award;
      case 'gold': return Award;
      case 'platinum': return Award;
      default: return Award;
    }
  };

  const getStats = () => {
    const totalMembers = members.length;
    const activeMembers = members.filter(m => m.is_active).length;
    const totalPoints = members.reduce((sum, m) => sum + m.points, 0);
    const totalEarned = members.reduce((sum, m) => sum + m.points_earned, 0);
    const totalRedeemed = members.reduce((sum, m) => sum + m.points_redeemed, 0);
    
    const tierCounts = {
      bronze: members.filter(m => m.tier === 'bronze').length,
      silver: members.filter(m => m.tier === 'silver').length,
      gold: members.filter(m => m.tier === 'gold').length,
      platinum: members.filter(m => m.tier === 'platinum').length
    };

    return {
      totalMembers,
      activeMembers,
      totalPoints,
      totalEarned,
      totalRedeemed,
      tierCounts,
      activeRewards: rewards.filter(r => r.is_active).length
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2C1A0E]">Jay's Club</h1>
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A0785A]">Total membres</p>
              <p className="text-2xl font-bold text-[#2C1A0E]">{stats.totalMembers}</p>
              <p className="text-xs text-green-600">{stats.activeMembers} actifs</p>
            </div>
            <Users className="w-8 h-8 text-[#A0785A]" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A0785A]">Points totaux</p>
              <p className="text-2xl font-bold text-[#2C1A0E]">{stats.totalPoints}</p>
              <p className="text-xs text-gray-500">{stats.totalEarned} gagnés / {stats.totalRedeemed} utilisés</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#A0785A]" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A0785A]">Récompenses</p>
              <p className="text-2xl font-bold text-[#2C1A0E]">{stats.activeRewards}</p>
              <p className="text-xs text-green-600">Disponibles</p>
            </div>
            <Gift className="w-8 h-8 text-[#A0785A]" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A0785A]">Répartition</p>
              <div className="flex space-x-2 mt-2">
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">{stats.tierCounts.bronze} B</span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">{stats.tierCounts.silver} A</span>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{stats.tierCounts.gold} O</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">{stats.tierCounts.platinum} P</span>
              </div>
            </div>
            <Award className="w-8 h-8 text-[#A0785A]" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-[#E8D5C0]">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'members', label: 'Membres', icon: Users },
              { id: 'rewards', label: 'Récompenses', icon: Gift },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
          {activeTab === 'members' && (
            <>
              {/* Filtres */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher un membre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                
                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                >
                  <option value="all">Tous les niveaux</option>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Argent</option>
                  <option value="gold">Or</option>
                  <option value="platinum">Platine</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actifs</option>
                  <option value="inactive">Inactifs</option>
                </select>
              </div>

              {/* Members List */}
              {filteredMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun membre trouvé</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F9F5F0]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                          Membre
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                          Niveau
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                          Date d'inscription
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                          Dernière activité
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#A0785A] uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8D5C0]">
                      {filteredMembers.map((member) => {
                        const TierIcon = getTierIcon(member.tier);
                        return (
                          <tr key={member.id} className="hover:bg-[#F9F5F0]">
                            <td className="px-4 py-4">
                              <div>
                                <p className="font-medium text-[#2C1A0E]">{member.customer_name}</p>
                                <p className="text-sm text-gray-500">{member.customer_email}</p>
                                {member.customer_phone && (
                                  <p className="text-xs text-gray-400">{member.customer_phone}</p>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(member.tier)}`}>
                                <TierIcon className="w-3 h-3 mr-1" />
                                {member.tier}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div>
                                <p className="font-medium text-[#2C1A0E]">{member.points}</p>
                                <p className="text-xs text-gray-500">
                                  +{member.points_earned} / -{member.points_redeemed}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(member.join_date).toLocaleDateString('fr-FR')}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(member.last_activity).toLocaleDateString('fr-FR')}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedMember(member)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Voir les détails"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedMember(member);
                                    setShowPointsModal(true);
                                  }}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Ajouter des points"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setShowMemberModal(true)}
                                  className="p-2 text-[#8B4513] hover:bg-[#F9F5F0] rounded-lg transition-colors"
                                  title="Modifier"
                                >
                                  <Edit className="w-4 h-4" />
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
            </>
          )}

          {activeTab === 'rewards' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher une récompense..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowRewardModal(true)}
                  className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle récompense
                </button>
              </div>

              {filteredRewards.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Gift className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucune récompense trouvée</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRewards.map((reward) => (
                    <div key={reward.id} className="border border-[#E8D5C0] rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-[#2C1A0E]">{reward.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reward.tier_required === 'all' 
                            ? 'bg-gray-100 text-gray-800'
                            : getTierColor(reward.tier_required)
                        }`}>
                          {reward.tier_required === 'all' ? 'Tous' : reward.tier_required}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{reward.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A0785A]">Points requis:</span>
                          <span className="font-medium text-[#2C1A0E]">{reward.points_required}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A0785A]">Valeur:</span>
                          <span className="font-medium text-[#2C1A0E]">{reward.points_value} pts</span>
                        </div>
                        {reward.stock_quantity !== undefined && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#A0785A]">Stock:</span>
                            <span className={`font-medium ${
                              reward.stock_quantity > 10 ? 'text-green-600' : 
                              reward.stock_quantity > 0 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {reward.stock_quantity}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedReward(reward)}
                          className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReward(reward);
                            setShowRewardModal(true);
                          }}
                          className="flex-1 px-3 py-2 text-[#8B4513] hover:bg-[#F9F5F0] rounded-lg transition-colors text-sm"
                        >
                          Modifier
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Analytics en cours de développement</p>
                <p className="text-sm">Graphiques et statistiques détaillées bientôt disponibles</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Points */}
      {showPointsModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              Ajouter des points à {selectedMember.customer_name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Points actuels
                </label>
                <p className="text-2xl font-bold text-[#2C1A0E]">{selectedMember.points}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Nombre de points à ajouter *
                </label>
                <input
                  type="number"
                  min="1"
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Entrez le nombre de points"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Raison *
                </label>
                <textarea
                  value={pointsReason}
                  onChange={(e) => setPointsReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Raison de l'ajout de points..."
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Nouveau total:</strong> {selectedMember.points + pointsToAdd} points
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowPointsModal(false);
                  setPointsToAdd(0);
                  setPointsReason('');
                  setSelectedMember(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddPoints}
                disabled={pointsToAdd <= 0 || !pointsReason.trim()}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajouter les points
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Reward */}
      {showRewardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              {selectedReward ? 'Modifier la récompense' : 'Nouvelle récompense'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  value={rewardForm.title}
                  onChange={(e) => setRewardForm({...rewardForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Titre de la récompense"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Description *
                </label>
                <textarea
                  value={rewardForm.description}
                  onChange={(e) => setRewardForm({...rewardForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Description de la récompense"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Points requis *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={rewardForm.points_required}
                    onChange={(e) => setRewardForm({...rewardForm, points_required: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Valeur en points
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={rewardForm.points_value}
                    onChange={(e) => setRewardForm({...rewardForm, points_value: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Niveau requis
                  </label>
                  <select
                    value={rewardForm.tier_required}
                    onChange={(e) => setRewardForm({...rewardForm, tier_required: e.target.value as any})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  >
                    <option value="all">Tous</option>
                    <option value="bronze">Bronze</option>
                    <option value="silver">Argent</option>
                    <option value="gold">Or</option>
                    <option value="platinum">Platine</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={rewardForm.stock_quantity}
                    onChange={(e) => setRewardForm({...rewardForm, stock_quantity: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="Illimité si vide"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={rewardForm.is_active}
                  onChange={(e) => setRewardForm({...rewardForm, is_active: e.target.checked})}
                  className="w-4 h-4 text-[#8B4513] border-[#E8D5C0] rounded focus:ring-[#8B4513]"
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-[#2C1A0E]">
                  Récompense active
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowRewardModal(false);
                  setRewardForm({
                    title: '',
                    description: '',
                    points_required: 0,
                    points_value: 0,
                    tier_required: 'all',
                    stock_quantity: 0,
                    expires_at: '',
                    is_active: true
                  });
                  setSelectedReward(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveReward}
                disabled={!rewardForm.title.trim() || !rewardForm.description.trim() || rewardForm.points_required <= 0}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedReward ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
