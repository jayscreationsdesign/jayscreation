"use client";

interface HowItWorksProps {
  product?: any;
}

export default function HowItWorks({ product }: HowItWorksProps) {
  const steps = [
    {
      number: 1,
      title: "Je commande",
      description: "Je choisis mon kit et je personnalise avec mes informations.",
      icon: "🛒"
    },
    {
      number: 2,
      title: "Je reçois l'aperçu",
      description: "Une maquette personnalisée m'est envoyée sous 48h par email.",
      icon: "🎨"
    },
    {
      number: 3,
      title: "Je valide",
      description: "Je demande des modifications jusqu'à validation finale.",
      icon: "✅"
    },
    {
      number: 4,
      title: "Je télécharge",
      description: "Mes fichiers HD sont envoyés sous 72h après validation.",
      icon: "📥"
    }
  ];

  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-2xl font-semibold mb-3"
            style={{ color: '#3C2415' }}
          >
            Comment ça marche ?
          </h2>
          <p className="text-sm" style={{ color: '#8B4513' }}>
            Simple et rapide — suivez ces 4 étapes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative p-6 rounded-xl transition-all hover:shadow-lg"
              style={{ 
                border: '1px solid #D4A574', 
                borderRadius: '12px',
                backgroundColor: 'white'
              }}
            >
              {/* Numéro en cercle */}
              <div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: '#8B4513' }}
              >
                {step.number}
              </div>
              
              {/* Ligne séparatrice */}
              {index < steps.length - 1 && (
                <div 
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5"
                  style={{ backgroundColor: '#D4A574' }}
                />
              )}
              
              {/* Contenu */}
              <div className="text-center pt-4">
                {/* Icône */}
                <div className="text-3xl mb-4">{step.icon}</div>
                
                {/* Titre */}
                <h3 
                  className="font-semibold text-sm mb-2"
                  style={{ color: '#3C2415' }}
                >
                  {step.title}
                </h3>
                
                {/* Description */}
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#8B4513' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
