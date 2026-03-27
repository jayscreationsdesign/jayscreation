import { ArrowRight, Star, Heart, Sparkles } from "lucide-react";

export default function Tendances() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#C8A96E] to-[#D4A574] relative overflow-hidden">
      {/* Pattern de fond subtil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-white" />
            <h2 className="font-heading text-3xl text-white sm:text-4xl font-bold">
              Tendances
            </h2>
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Découvrez les créations les plus populaires du moment
          </p>
        </div>

        {/* Grille des tendances */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {[
            {
              icon: Heart,
              title: "Faire-parts Romantiques",
              description: "Designs élégants et personnalisés pour vos unions",
              trend: "Top des ventes"
            },
            {
              icon: Star,
              title: "Tableaux d'Accueil",
              description: "Mise en scène artistique pour accueillir vos invités",
              trend: "Nouveauté 2026"
            },
            {
              icon: Sparkles,
              title: "Marque-places Originaux",
              description: "Détails uniques qui font toute la différence",
              trend: "Tendance du moment"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full">
                  {item.trend}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call-to-action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white text-[#C8A96E] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02] group">
            <span className="text-lg">Explorer les tendances</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <p className="text-white/70 text-sm mt-4">
            Découvrez toutes nos créations tendance
          </p>
        </div>
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
    </section>
  );
}
