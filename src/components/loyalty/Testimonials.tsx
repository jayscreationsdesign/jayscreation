import { COLORS, FONTS, TESTIMONIALS } from './constants';

export default function Testimonials() {
  return (
    <section className="py-14 border-t border-b" style={{ borderColor: COLORS.border }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* En-tête */}
        <div className="text-center mb-12">
          <p 
            className="text-sm font-medium uppercase tracking-wider mb-4"
            style={{ color: COLORS.gold, letterSpacing: '0.15em' }}
          >
            Témoignages
          </p>
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
          >
            Elles adorent le Jay's Club
          </h2>
        </div>

        {/* Cartes témoignages */}
        <div className="flex flex-wrap justify-center gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-7 border max-w-sm"
              style={{ borderColor: COLORS.border }}
            >
              {/* Étoiles */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: COLORS.gold }}>★</span>
                ))}
              </div>

              {/* Citation */}
              <p 
                className="text-sm italic mb-6 leading-relaxed"
                style={{ color: COLORS.text }}
              >
                "{testimonial.content}"
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`
                  }}
                >
                  {testimonial.avatar}
                </div>
                
                {/* Infos */}
                <div>
                  <p 
                    className="font-bold text-sm"
                    style={{ color: COLORS.text }}
                  >
                    {testimonial.name}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: COLORS.gold }}
                  >
                    Niveau {testimonial.tier}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
