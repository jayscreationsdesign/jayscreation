import { COLORS, FONTS } from './constants';

export default function LoyaltyCtaFooter() {
  return (
    <section className="py-16 px-6">
      <div 
        className="relative max-w-lg mx-auto p-12 rounded-3xl text-center overflow-hidden"
        style={{
          background: 'linear-gradient(165deg, #3C2415 0%, #4E3222 100%)'
        }}
      >
        {/* Cercle décoratif */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: COLORS.gold }}
        />

        <div className="relative z-10">
          {/* Emoji */}
          <div className="text-5xl mb-6">✨</div>

          {/* Titre */}
          <h3 
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: FONTS.playfair }}
          >
            Prête à être récompensée ?
          </h3>

          {/* Texte */}
          <p className="text-white text-sm mb-8 leading-relaxed">
            Rejoignez le Jay's Club gratuitement et recevez immédiatement{' '}
            <strong style={{ color: COLORS.gold }}>
              20 points de bienvenue + un code -10%
            </strong>
          </p>

          {/* Bouton */}
          <a
            href="/connexion"
            className="inline-block px-8 py-4 rounded-full text-white font-medium transition-all hover:opacity-90 hover:scale-105 mb-8"
            style={{ 
              backgroundColor: COLORS.gold,
              fontFamily: FONTS.inter,
              boxShadow: `0 4px 20px ${COLORS.gold}40`
            }}
          >
            Créer mon compte gratuitement →
          </a>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
            <div className="text-center">
              <p 
                className="text-xl font-bold mb-1"
                style={{ fontFamily: FONTS.playfair, color: COLORS.gold }}
              >
                Gratuit
              </p>
              <p 
                className="text-xs uppercase tracking-wider opacity-40"
                style={{ fontSize: '10px' }}
              >
                Inscription
              </p>
            </div>
            <div className="text-center">
              <p 
                className="text-xl font-bold mb-1"
                style={{ fontFamily: FONTS.playfair, color: COLORS.gold }}
              >
                20 pts
              </p>
              <p 
                className="text-xs uppercase tracking-wider opacity-40"
                style={{ fontSize: '10px' }}
              >
                Offerts
              </p>
            </div>
            <div className="text-center">
              <p 
                className="text-xl font-bold mb-1"
                style={{ fontFamily: FONTS.playfair, color: COLORS.gold }}
              >
                −10%
              </p>
              <p 
                className="text-xs uppercase tracking-wider opacity-40"
                style={{ fontSize: '10px' }}
              >
                Bienvenue
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
