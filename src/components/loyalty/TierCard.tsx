'use client';

import { COLORS, FONTS, TIERS } from './constants';

interface TierCardProps {
  tier: keyof typeof TIERS;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export default function TierCard({ tier, isActive, onClick, className = '' }: TierCardProps) {
  const tierInfo = TIERS[tier];
  
  const getTierBenefits = () => {
    switch (tier) {
      case 'petale':
        return [
          '1€ = 1 point de fidélité',
          'Ventes privées exclusives',
          'Code de bienvenue -10%',
          'Newsletter avec avant-premières'
        ];
      case 'orchidee':
        return [
          '1€ = 1.5 points de fidélité',
          'Livraison offerte dès 30€',
          'Réduction permanente -5%',
          'Avant-premières des nouveautés',
          'Cadeau surprise anniversaire'
        ];
      case 'diamant':
        return [
          '1€ = 2 points de fidélité',
          'Livraison toujours offerte',
          'Réduction permanente -10%',
          'Création sur-mesure offerte/an',
          'Collection exclusive',
          'Service prioritaire & conseils dédiés'
        ];
      default:
        return [];
    }
  };

  return (
    <div 
      className={`
        relative bg-white rounded-2xl p-6 transition-all duration-400 cursor-pointer
        ${isActive 
          ? 'transform -translate-y-1 shadow-xl' 
          : 'hover:transform hover:-translate-y-0.5 hover:shadow-md'
        }
        ${className}
      `}
      onClick={isActive ? undefined : onClick}
      style={{
        border: isActive ? `2px solid ${COLORS.gold}` : `1.5px solid ${COLORS.border}`,
        backgroundColor: isActive ? (tier === 'petale' ? COLORS.cream : undefined) : undefined,
        ...(isActive && tier !== 'petale' ? {
          background: tierInfo.color,
          color: tierInfo.textColor
        } : {})
      }}
    >
      {/* Badge multiplicateur */}
      {isActive && (
        <div 
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            backgroundColor: tier === 'petale' ? COLORS.gold : (tier === 'orchidee' ? COLORS.white : COLORS.gold),
            color: tier === 'orchidee' ? COLORS.chocolat : (tier === 'petale' ? COLORS.white : COLORS.chocolat)
          }}
        >
          ×{tierInfo.multiplier}
        </div>
      )}

      <div className="text-center">
        {/* Icône et nom */}
        <div className="text-4xl mb-3">{tierInfo.icon}</div>
        <h3 
          className="text-xl font-bold mb-2"
          style={{ fontFamily: FONTS.playfair }}
        >
          {tierInfo.name}
        </h3>
        <p 
          className="text-sm opacity-75 mb-4"
          style={{ color: isActive ? 'inherit' : COLORS.textLight }}
        >
          {tierInfo.minPoints} – {tierInfo.maxPoints === Infinity ? '∞' : tierInfo.maxPoints} points
        </p>
        
        {/* Contenu selon l'état */}
        {isActive ? (
          <div className="text-left">
            <div className="space-y-2">
              {getTierBenefits().map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 transform" style={{ transform: 'translateY(-6px)' }}>
                  <span 
                    className="text-sm font-bold"
                    style={{ color: tierInfo.checkColor }}
                  >
                    ✓
                  </span>
                  <span 
                    className="text-sm"
                    style={{ color: isActive ? 'inherit' : COLORS.text }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p 
              className="text-sm font-medium"
              style={{ color: COLORS.gold }}
            >
              Voir les avantages →
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
