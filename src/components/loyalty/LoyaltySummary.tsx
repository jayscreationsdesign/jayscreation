'use client';

import { useState, useEffect } from 'react';
import { COLORS, FONTS, TIERS } from './constants';

interface LoyaltySummaryProps {
  className?: string;
}

export default function LoyaltySummary({ className = '' }: LoyaltySummaryProps) {
  const [userPoints, setUserPoints] = useState(0);
  const [userTier, setUserTier] = useState<keyof typeof TIERS>('petale');
  const [totalEarned, setTotalEarned] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadLoyaltyData();
  }, []);
  
  const loadLoyaltyData = async () => {
    try {
      const response = await fetch('/api/loyalty/points');
      if (response.ok) {
        const data = await response.json();
        setUserPoints(data.points);
        setUserTier(data.tier);
        setTotalEarned(data.total_earned);
      }
    } catch (error) {
      console.error('Erreur chargement fidélité:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const tierInfo = TIERS[userTier];
  const nextTier = userTier === 'petale' ? 'orchidee' : userTier === 'orchidee' ? 'diamant' : null;
  const nextTierInfo = nextTier ? TIERS[nextTier] : null;
  const progressToNext = nextTierInfo ? 
    ((totalEarned - tierInfo.minPoints) / (nextTierInfo.minPoints - tierInfo.minPoints)) * 100 : 100;
  
  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg border p-3 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-md border border-[#E8E0D4] p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{tierInfo.icon}</span>
          <span 
            className="text-sm font-medium text-[#333333]"
            style={{ fontFamily: FONTS.playfair }}
          >
            Jay's Club
          </span>
        </div>
      </div>
      
      <div className="flex items-baseline gap-1 mb-2">
        <span 
          className="text-lg font-bold text-[#333333]"
          style={{ fontFamily: FONTS.playfair }}
        >
          {userPoints}
        </span>
        <span className="text-xs text-[#666666]">pts</span>
        <span 
          className="ml-2 px-1.5 py-0.5 rounded text-xs font-medium"
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
            color: COLORS.white
          }}
        >
          {tierInfo.name}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#333333]">
          {totalEarned} cumulés
        </span>
        
        {nextTierInfo && (
          <div className="flex items-center gap-1">
            <div 
              className="w-8 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: '#F0F0F0' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(progressToNext, 100)}%`,
                  backgroundColor: COLORS.gold
                }}
              />
            </div>
            <span className="text-xs text-[#666666]">
              +{nextTierInfo.minPoints - totalEarned}
            </span>
          </div>
        )}
        
        <a
          href="/jays-club"
          className="text-xs font-medium transition-colors hover:opacity-70"
          style={{ color: COLORS.gold }}
        >
          →
        </a>
      </div>
    </div>
  );
}
