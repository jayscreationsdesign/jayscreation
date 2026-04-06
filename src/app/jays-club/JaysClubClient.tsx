'use client';

import { useState, useEffect } from 'react';
import { COLORS, FONTS, TIERS } from '@/components/loyalty/constants';

export default function JaysClubClient() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
      {/* Header simple */}
      <header className="bg-white border-b sticky top-0 z-40" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <a 
              href="/"
              className="text-2xl font-bold flex items-center gap-2"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              <span className="text-3xl">🌸</span>
              Jay's Creations Design
            </a>
            <a
              href="/compte"
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              style={{ borderColor: COLORS.gold, color: COLORS.chocolat }}
            >
              Mon compte
            </a>
          </nav>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-8">
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
                className="inline-block px-6 py-3 rounded-full text-white font-medium transition-all hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: COLORS.gold }}
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
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              Un programme simple et généreux
            </h2>
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
                <h3 
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
                >
                  {step.title}
                </h3>
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
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              Les niveaux d'excellence
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {Object.values(TIERS).map((tier, index) => (
              <div 
                key={tier.name}
                className="bg-white rounded-2xl p-6 text-center min-w-[200px] transition-all duration-300 hover:scale-105"
                style={{ 
                  border: `2px solid ${COLORS.gold}`,
                  backgroundColor: COLORS.cream,
                  color: COLORS.text
                }}
              >
                <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: COLORS.chocolat }}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8B4513]/5 text-[#8B4513]">
                    <span className="text-lg">{tier.icon}</span>
                  </span>
                  <span>{tier.name}</span>
                </div>
                <p className="text-sm opacity-75 mb-3">
                  {tier.minPoints === 0 ? `0 – ${tier.maxPoints} pts` : 
                   tier.maxPoints === Infinity ? `${tier.minPoints}+ pts` : 
                   `${tier.minPoints} – ${tier.maxPoints} pts`}
                </p>
                <p className="text-sm font-medium">
                  Voir les avantages →
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
