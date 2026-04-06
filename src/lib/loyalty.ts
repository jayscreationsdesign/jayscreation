import { supabase } from './supabase';

// Paliers
export const TIERS = {
  petale: { name: 'Pétale', icon: '🌸', minPoints: 0, maxPoints: 149, multiplier: 1 },
  orchidee: { name: 'Orchidée', icon: '🌺', minPoints: 150, maxPoints: 499, multiplier: 1.5 },
  diamant: { name: 'Diamant', icon: '💎', minPoints: 500, maxPoints: Infinity, multiplier: 2 },
} as const;

export type Tier = keyof typeof TIERS;

// Récompenses
export const REWARDS = [
  { id: 'free_shipping', name: 'Livraison offerte', points: 50, icon: '📦' },
  { id: 'discount_5', name: 'Bon de réduction de 5€', points: 100, icon: '🎫' },
  { id: 'discount_15', name: 'Bon de réduction de 15€', points: 200, icon: '🎁' },
  { id: 'free_product', name: 'Produit offert au choix', points: 350, icon: '✨' },
  { id: 'custom_creation', name: 'Création sur-mesure offerte', points: 500, icon: '👑' },
] as const;

export type RewardId = typeof REWARDS[number]['id'];

// Façons de gagner
export const EARN_METHODS = [
  { type: 'purchase', name: 'Chaque euro dépensé', points: '1 à 2 pts', icon: '🛒' },
  { type: 'signup', name: 'Créer un compte', points: '+20 pts', icon: '👤', value: 20 },
  { type: 'birthday', name: "Jour d'anniversaire", points: '+30 pts', icon: '🎂', value: 30 },
  { type: 'review', name: 'Laisser un avis', points: '+10 pts', icon: '⭐', value: 10 },
  { type: 'referral', name: 'Parrainer un proche', points: '+50 pts', icon: '💌', value: 50 },
  { type: 'instagram', name: 'Partager sur Instagram', points: '+5 pts', icon: '📸', value: 5 },
] as const;

export type TransactionType = 'purchase' | 'signup' | 'birthday' | 'review' | 'referral' | 'instagram' | 'reward_redeemed' | 'manual';

// Fonction pour déterminer le palier
export function getTier(totalEarned: number): Tier {
  if (totalEarned >= 500) return 'diamant';
  if (totalEarned >= 150) return 'orchidee';
  return 'petale';
}

// Fonction pour calculer les points d'un achat selon le palier
export function calculatePurchasePoints(amount: number, tier: Tier): number {
  return Math.floor(amount * TIERS[tier].multiplier);
}

// Fonction pour obtenir les points de l'utilisateur
export async function getUserPoints(userId: string) {
    
  const { data, error } = await supabase
    .from('loyalty_points')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error && error.code !== 'PGRST116') {
    throw error;
  }
    
  return data;
}

// Fonction pour créer l'enregistrement de points pour un nouvel utilisateur
export async function createLoyaltyAccount(userId: string) {
    
  const { data, error } = await supabase
    .from('loyalty_points')
    .insert({
      user_id: userId,
      points: 20, // Points de bienvenue
      total_earned: 20,
      tier: 'petale'
    })
    .select()
    .single();
    
  if (error) throw error;
  
  // Ajouter la transaction de bienvenue
  await addLoyaltyTransaction(userId, 'signup', 20, 'Création de compte');
  
  return data;
}

// Fonction pour ajouter des points
export async function addLoyaltyTransaction(
  userId: string, 
  type: TransactionType, 
  points: number, 
  description: string,
  referenceId?: string
) {
    
  // Mettre à jour les points de l'utilisateur
  const { data: currentPoints, error: fetchError } = await supabase
    .from('loyalty_points')
    .select('points, total_earned')
    .eq('user_id', userId)
    .single();
    
  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  }
  
  const newPoints = (currentPoints?.points || 0) + points;
  const newTotalEarned = (currentPoints?.total_earned || 0) + Math.max(0, points);
  const newTier = getTier(newTotalEarned);
  
  // Mettre à jour ou créer l'enregistrement
  const { error: updateError } = await supabase
    .from('loyalty_points')
    .upsert({
      user_id: userId,
      points: newPoints,
      total_earned: newTotalEarned,
      tier: newTier,
      updated_at: new Date().toISOString()
    });
    
  if (updateError) throw updateError;
  
  // Ajouter la transaction
  const { error: transactionError } = await supabase
    .from('loyalty_transactions')
    .insert({
      user_id: userId,
      type,
      points,
      description,
      reference_id: referenceId
    });
    
  if (transactionError) throw transactionError;
  
  return { points: newPoints, total_earned: newTotalEarned, tier: newTier };
}

// Fonction pour échanger des points contre une récompense
export async function redeemReward(userId: string, rewardId: RewardId) {
    
  const reward = REWARDS.find(r => r.id === rewardId);
  if (!reward) {
    throw new Error('Récompense invalide');
  }
  
  // Vérifier les points de l'utilisateur
  const { data: userPoints, error: pointsError } = await supabase
    .from('loyalty_points')
    .select('points')
    .eq('user_id', userId)
    .single();
    
  if (pointsError || !userPoints || userPoints.points < reward.points) {
    throw new Error('Points insuffisants');
  }
  
  // Générer un code de coupon
  const couponCode = `JAY-${rewardId.toUpperCase()}-${Date.now()}`;
  
  // Créer la récompense
  const { error: rewardError } = await supabase
    .from('loyalty_rewards')
    .insert({
      user_id: userId,
      reward_type: rewardId,
      points_spent: reward.points,
      status: 'active',
      coupon_code: couponCode,
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 an
    });
    
  if (rewardError) throw rewardError;
  
  // Déduire les points
  await addLoyaltyTransaction(userId, 'reward_redeemed', -reward.points, `Échange : ${reward.name}`);
  
  return { couponCode, reward };
}

// Fonction pour obtenir l'historique des transactions
export async function getTransactionHistory(userId: string, limit: number = 50) {
    
  const { data, error } = await supabase
    .from('loyalty_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (error) throw error;
  
  return data;
}

// Fonction pour obtenir les récompenses de l'utilisateur
export async function getUserRewards(userId: string) {
    
  const { data, error } = await supabase
    .from('loyalty_rewards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data;
}
