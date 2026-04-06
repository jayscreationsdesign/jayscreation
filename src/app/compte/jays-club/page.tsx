'use client';

import { useState, useEffect } from 'react';
import { COLORS, FONTS } from '@/components/loyalty/constants';

export default function CompteJaysClubPage() {
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      // Simuler des points utilisateur (peut être remplacé par un appel API réel)
      setUserPoints(0); // NOUVEAUX COMPTE: 0 points = niveau Pétale
    }, 1000);
  }, []);

  // Déterminer le niveau actif de l'utilisateur
  const getActiveTier = () => {
    if (userPoints >= 500) return 'diamant';
    if (userPoints >= 150) return 'orchidee';
    return 'petale';
  };

  const activeTier = getActiveTier();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8A96E] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl font-medium mb-2" style={{ color: COLORS.chocolat }}>
            Chargement de Jay's Club...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Header de la page compte */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <a href="/compte" className="hover:text-[#3C2415] transition-colors">Mon compte</a>
            <span>/</span>
            <span style={{ color: COLORS.chocolat }}>Jay's Club</span>
          </nav>
          
          <h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
          >
            Jay's Club
          </h1>
          <p 
            className="text-lg text-gray-600 mb-8"
            style={{ fontFamily: FONTS.inter }}
          >
            Votre programme de fidélité exclusif
          </p>
        </div>

        {/* Hero */}
        <div 
          className="relative py-16 px-6 rounded-2xl overflow-hidden mb-12 text-center"
          style={{
            background: 'linear-gradient(165deg, #3C2415 0%, #4E3222 35%, #3C2415 100%)'
          }}
        >
          <div className="relative z-10 max-w-4xl mx-auto">
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
            
            <h2 
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: FONTS.playfair, fontWeight: 800 }}
            >
              Jay's Club
            </h2>
            <p 
              className="text-lg md:text-xl italic mb-6"
              style={{ fontFamily: FONTS.playfair, color: COLORS.gold }}
            >
              Chaque événement mérite d'être récompensé
            </p>
            
            <p 
              className="text-sm md:text-base text-white opacity-50 max-w-md mx-auto mb-8"
              style={{ lineHeight: 1.6 }}
            >
              Cumulez des points à chaque achat, parrainage et interaction. 
              Échangez-les contre des récompenses exclusives.
            </p>
            
            {/* Carte points */}
            <div 
              className="max-w-md mx-auto p-6 rounded-3xl backdrop-blur-sm"
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
                className="inline-block bg-[#8B4513] text-white px-8 py-4 rounded-full font-medium hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
              >
                Créer mon compte gratuitement →
              </a>
            </div>
          </div>
        </div>

        {/* Comment ça marche */}
        <section className="py-14 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p 
              className="text-xs font-medium mb-4 uppercase tracking-wider"
              style={{ color: COLORS.gold, letterSpacing: '0.15em' }}
            >
              Comment ça marche
            </p>
            <h3 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              Un programme simple et généreux
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { number: '01', icon: '🛍️', title: 'Achetez', desc: 'Cumulez des points à chaque commande.' },
              { number: '02', icon: '📈', title: 'Progressez', desc: 'Montez de niveau automatiquement.' },
              { number: '03', icon: '🎁', title: 'Profitez', desc: 'Échangez vos points contre des récompenses.' }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-2xl border p-8 text-center min-w-[220px] max-w-[260px] transition-all duration-300 hover:scale-105"
                style={{ borderColor: COLORS.border }}
              >
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: COLORS.chocolat, color: COLORS.gold }}
                >
                  {step.number}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h4 
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
                >
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: COLORS.textLight }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Niveaux */}
        <section className="py-14">
          <div className="text-center mb-12">
            <h3 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              Les niveaux d'excellence
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { name: 'Pétale 🌸', range: '0 – 149 pts', tier: 'petale' },
              { name: 'Orchidée 🌺', range: '150 – 499 pts', tier: 'orchidee' },
              { name: 'Diamant 💎', range: '500+ pts', tier: 'diamant' }
            ].map((tier, index) => {
              const isActive = tier.tier === activeTier;
              
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center min-w-[200px] transition-all duration-300 hover:scale-105"
                  style={{ 
                    border: `2px solid ${COLORS.gold}`,
                    backgroundColor: isActive ? '#8B4513' : COLORS.cream,
                    color: isActive ? COLORS.white : COLORS.text
                  }}
                >
                  <h4 
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: FONTS.playfair, color: isActive ? COLORS.white : COLORS.chocolat }}
                  >
                    {tier.name}
                  </h4>
                  <p className="text-sm opacity-75 mb-3" style={{ color: isActive ? COLORS.white : COLORS.textLight }}>
                    {tier.range}
                  </p>
                  {isActive && (
                    <p className="text-sm font-medium" style={{ color: COLORS.white }}>
                      Voir les avantages →
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Lien vers la page principale */}
        <section className="py-14 text-center">
          <div className="bg-white rounded-2xl p-8 border" style={{ borderColor: COLORS.border }}>
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              Découvrez la version complète
            </h3>
            <p className="text-gray-600 mb-6">
              Accédez à toutes les fonctionnalités du Jay's Club : récompenses, historique, et bien plus encore.
            </p>
            <a
              href="/jays-club"
              className="inline-block bg-[#8B4513] text-white px-8 py-4 rounded-full font-medium hover:bg-[#6B3410] hover:text-[#D4A574] transition-colors"
            >
              Voir Jay's Club complet →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
