"use client"

export function About() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-jc-text mb-6 sm:mb-8">
          À Propos de Jay's Creations Design
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-jc-muted mb-4 sm:mb-6 leading-relaxed">
          Spécialiste de la papeterie personnalisée depuis 2016, Jay's Creations Design 
          transforme vos événements en moments inoubliables grâce à des créations uniques 
          et sur-mesure.
        </p>
        <p className="text-sm sm:text-base lg:text-lg text-jc-muted mb-6 sm:mb-8 leading-relaxed">
          De l'invitation à la décoration, chaque pièce est conçue avec passion et 
          savoir-faire pour refléter parfaitement votre style et l'esprit de votre événement.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#8B4513] mb-1 sm:mb-2">8+</div>
            <div className="text-xs sm:text-sm text-[#6B6B6B]">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#8B4513] mb-1 sm:mb-2">5000+</div>
            <div className="text-xs sm:text-sm text-[#6B6B6B]">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#8B4513] mb-1 sm:mb-2">100%</div>
            <div className="text-xs sm:text-sm text-[#6B6B6B]">Personnalisable</div>
          </div>
        </div>
      </div>
    </section>
  );
}
