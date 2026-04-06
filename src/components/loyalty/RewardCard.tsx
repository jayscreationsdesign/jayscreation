'use client';

import { COLORS, FONTS, REWARDS } from './constants';

interface RewardCardProps {
  rewardId: 'free_shipping' | 'discount_5' | 'discount_15' | 'free_product' | 'custom_creation';
  userPoints: number;
  onRedeem: (rewardId: 'free_shipping' | 'discount_5' | 'discount_15' | 'free_product' | 'custom_creation') => void;
  isRedeeming?: boolean;
}

export default function RewardCard({ rewardId, userPoints, onRedeem, isRedeeming = false }: RewardCardProps) {
  const reward = REWARDS.find(r => r.id === rewardId);
  
  if (!reward) return null;
  
  const isUnlocked = userPoints >= reward.points;
  const pointsNeeded = Math.max(0, reward.points - userPoints);

  return (
    <div 
      className={`
        bg-white rounded-2xl p-5 flex items-center gap-4 transition-all duration-300
        ${isUnlocked 
          ? 'border-2 opacity-100' 
          : 'border opacity-50'
        }
      `}
      style={{
        borderColor: isUnlocked ? COLORS.gold : COLORS.border,
        borderLeftWidth: isUnlocked ? '4px' : undefined,
        borderLeftColor: isUnlocked ? `linear-gradient(to bottom, ${COLORS.gold}, ${COLORS.goldLight})` : undefined
      }}
    >
      {/* Icône */}
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{
          background: isUnlocked 
            ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`
            : COLORS.creamDark,
          border: `1.5px solid ${isUnlocked ? COLORS.gold : COLORS.border}`
        }}
      >
        {reward.icon}
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <h4 
          className="font-bold mb-1"
          style={{ fontFamily: FONTS.playfair, color: COLORS.text, fontSize: '15px' }}
        >
          {reward.name}
        </h4>
        <p 
          className="text-sm"
          style={{ color: COLORS.textLight }}
        >
          {reward.description}
        </p>
      </div>

      {/* Bouton ou points restants */}
      <div className="flex-shrink-0">
        {isUnlocked ? (
          <button
            onClick={() => onRedeem(rewardId)}
            disabled={isRedeeming}
            className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: COLORS.gold, fontFamily: FONTS.inter }}
          >
            {isRedeeming ? '...' : 'Échanger →'}
          </button>
        ) : (
          <div 
            className="px-3 py-2 rounded-full text-sm font-medium text-center"
            style={{ 
              backgroundColor: COLORS.creamDark, 
              color: COLORS.textLight,
              fontFamily: FONTS.inter
            }}
          >
            {pointsNeeded} pts restants
          </div>
        )}
      </div>
    </div>
  );
}
