'use client';

import { COLORS, FONTS, TIERS } from './constants';
import AnimatedNumber from './AnimatedNumber';

interface JaysClubHeroProps {
  userPoints: number;
  userTier: keyof typeof TIERS;
  totalEarned: number;
  isLoggedIn: boolean;
}

export default function JaysClubHero({ userPoints, userTier, totalEarned, isLoggedIn }: JaysClubHeroProps) {
  const tierInfo = TIERS[userTier];
  const nextTier = userTier === 'petale' ? 'orchidee' : userTier === 'orchidee' ? 'diamant' : null;
  const nextTierInfo = nextTier ? TIERS[nextTier] : null;
  const progressToNext = nextTierInfo ? 
    ((totalEarned - tierInfo.minPoints) / (nextTierInfo.minPoints - tierInfo.minPoints)) * 100 : 100;
  const pointsToNext = nextTierInfo ? Math.max(0, nextTierInfo.minPoints - totalEarned) : 0;
  const availableRewards = Math.floor(userPoints / 50);

  return (
    <div 
      className="relative py-16 px-6 rounded-2xl overflow-hidden mb-12"
      style={{
        background: 'linear-gradient(165deg, #3C2415 0%, #4E3222 35%, #3C2415 100%)'
      }}
    >
      {/* Éléments décoratifs */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" 
        style={{ backgroundColor: COLORS.gold }} 
      />
      <div 
        className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10" 
        style={{ backgroundColor: COLORS.gold }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-3"
        style={{ color: COLORS.gold }}
      >
        ✦
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-6">
          <span 
            className="inline-block px-4 py-2 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${COLORS.gold}14`,
              color: COLORS.gold,
              border: `1px solid ${COLORS.gold}33`,
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}
          >
            ✦ Programme de fidélité ✦
          </span>
        </div>
        
        {/* Titres */}
        <h1 
          className="text-5xl md:text-6xl font-bold text-white mb-4"
          style={{ fontFamily: FONTS.playfair, fontWeight: 800 }}
        >
          Jay's Club
        </h1>
        <p 
          className="text-lg md:text-xl italic mb-6"
          style={{ fontFamily: FONTS.playfair, color: COLORS.gold }}
        >
          Chaque événement mérite d'être récompensé
        </p>
        
        {/* Description */}
        <p 
          className="text-sm md:text-base text-white opacity-50 max-w-md mx-auto mb-8"
          style={{ lineHeight: 1.6 }}
        >
          Cumulez des points à chaque achat, parrainage et interaction. 
          Échangez-les contre des récompenses exclusives et profitez d'avantages croissants.
        </p>
        
        {/* Carte utilisateur ou CTA */}
        {isLoggedIn ? (
          <div 
            className="max-w-md mx-auto p-6 rounded-3xl backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {/* En-tête de la carte */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p 
                  className="text-xs uppercase tracking-wider opacity-70 mb-1"
                  style={{ letterSpacing: '0.1em', color: COLORS.gold }}
                >
                  VOS POINTS
                </p>
                <div className="flex items-baseline gap-2">
                  <AnimatedNumber 
                    value={userPoints} 
                    className="text-4xl md:text-5xl font-bold text-white"
                  />
                  <span className="text-xs text-white opacity-50">pts</span>
                </div>
              </div>
              <div 
                className="px-3 py-1 rounded-2xl text-xs font-medium flex items-center gap-1"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                  color: COLORS.white
                }}
              >
                <span>{tierInfo.icon}</span>
                <span>{tierInfo.name}</span>
              </div>
            </div>
            
            {/* Barre de progression */}
            {nextTierInfo && (
              <div className="mb-6">
                <div 
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${Math.min(progressToNext, 100)}%`,
                      background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-white opacity-35">
                    {userPoints} pts
                  </span>
                  <span className="text-xs text-white opacity-35">
                    Prochain niveau : {pointsToNext} pts {nextTierInfo.icon}
                  </span>
                </div>
              </div>
            )}
            
            {/* Mini-stats */}
            <div className="grid grid-cols-3 gap-2">
              <div 
                className="text-center p-2 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <p 
                  className="text-lg font-bold"
                  style={{ fontFamily: FONTS.playfair, color: COLORS.gold }}
                >
                  {availableRewards}
                </p>
                <p 
                  className="text-xs text-white opacity-40 uppercase tracking-wider"
                  style={{ fontSize: '9px' }}
                >
                  Récompenses
                </p>
              </div>
              <div 
                className="text-center p-2 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <p 
                  className="text-lg font-bold"
                  style={{ fontFamily: FONTS.playfair, color: COLORS.gold }}
                >
                  ×{tierInfo.multiplier}
                </p>
                <p 
                  className="text-xs text-white opacity-40 uppercase tracking-wider"
                  style={{ fontSize: '9px' }}
                >
                  Multiplicateur
                </p>
              </div>
              <div 
                className="text-center p-2 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <p 
                  className="text-lg font-bold"
                  style={{ fontFamily: FONTS.playfair, color: COLORS.gold }}
                >
                  {Math.floor(totalEarned * 0.05)}€
                </p>
                <p 
                  className="text-xs text-white opacity-40 uppercase tracking-wider"
                  style={{ fontSize: '9px' }}
                >
                  Économies
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="max-w-md mx-auto p-6 rounded-3xl backdrop-blur-sm text-center"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <div className="text-4xl mb-4">🎁</div>
            <h3 
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: FONTS.playfair }}
            >
              Rejoignez le Jay's Club
            </h3>
            <p className="text-white text-sm mb-6 opacity-90">
              Créez votre compte et recevez immédiatement 20 points + un code -10%
            </p>
            <a
              href="/connexion"
              className="inline-block px-6 py-3 rounded-full text-white font-medium transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: COLORS.gold }}
            >
              Créer mon compte gratuitement →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
