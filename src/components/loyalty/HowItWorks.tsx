import { COLORS, FONTS } from './constants';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '🛍️',
      title: 'Achetez',
      description: 'Cumulez des points à chaque commande. Plus votre niveau est élevé, plus vous gagnez.'
    },
    {
      number: '02',
      icon: '📈',
      title: 'Progressez',
      description: 'Montez de niveau automatiquement. Débloquez des avantages permanents à chaque palier.'
    },
    {
      number: '03',
      icon: '🎁',
      title: 'Profitez',
      description: 'Échangez vos points contre des réductions, livraisons offertes ou créations sur-mesure.'
    }
  ];

  return (
    <section className="py-14 max-w-4xl mx-auto">
      {/* En-tête */}
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

      {/* Cartes des étapes */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="relative bg-white rounded-2xl border p-8 text-center min-w-[220px] max-w-[260px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ borderColor: COLORS.border }}
          >
            {/* Badge numéro */}
            <div 
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: COLORS.chocolat, color: COLORS.gold }}
            >
              {step.number}
            </div>

            {/* Contenu */}
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 
              className="text-lg font-bold mb-3"
              style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
            >
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.textLight }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
