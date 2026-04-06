'use client';

import { COLORS, FONTS } from './constants';

interface LoyaltyTabsProps {
  activeTab: 'tiers' | 'rewards' | 'earn';
  onTabChange: (tab: 'tiers' | 'rewards' | 'earn') => void;
}

export default function LoyaltyTabs({ activeTab, onTabChange }: LoyaltyTabsProps) {
  const tabs = [
    {
      id: 'tiers' as const,
      label: 'Niveaux',
      icon: '🏆'
    },
    {
      id: 'rewards' as const,
      label: 'Récompenses',
      icon: '🎁'
    },
    {
      id: 'earn' as const,
      label: 'Gagner des points',
      icon: '⭐'
    }
  ];

  return (
    <div 
      className="bg-white rounded-2xl p-1.5 mb-8 inline-flex"
      style={{ borderColor: COLORS.border, borderWidth: '1px' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-4 py-2 rounded-xl font-medium transition-all duration-300
            flex items-center gap-2 text-sm md:text-base
            ${activeTab === tab.id 
              ? 'text-white shadow-md' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
          style={{
            backgroundColor: activeTab === tab.id ? COLORS.chocolat : 'transparent',
            fontFamily: FONTS.inter
          }}
        >
          <span className="text-base">{tab.icon}</span>
          <span className="hidden md:inline">{tab.label}</span>
          <span className="md:hidden text-xs">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
