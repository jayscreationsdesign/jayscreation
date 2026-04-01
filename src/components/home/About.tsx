"use client"

export function About() {
  return (
    <section className="py-16 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-jc-text mb-8">
          À Propos de Jay's Creations Design
        </h2>
        <p className="text-lg text-jc-muted mb-6 leading-relaxed">
          Spécialiste de la papeterie personnalisée depuis 2016, Jay's Creations Design 
          transforme vos événements en moments inoubliables grâce à des créations uniques 
          et sur-mesure.
        </p>
        <p className="text-lg text-jc-muted mb-8 leading-relaxed">
          De l'invitation à la décoration, chaque pièce est conçue avec passion et 
          savoir-faire pour refléter parfaitement votre style et l'esprit de votre événement.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#8B4513] mb-2">8+</div>
            <div className="text-[#6B6B6B]">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#8B4513] mb-2">5000+</div>
            <div className="text-[#6B6B6B]">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#8B4513] mb-2">100%</div>
            <div className="text-[#6B6B6B]">Personnalisable</div>
          </div>
        </div>
      </div>
    </section>
  );
}
