"use client"

export function Hero() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#FAF7F2] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] mb-6">
            Jay's Creations Design
          </h1>
          <p className="text-xl md:text-2xl text-[#6B6B6B] mb-8">
            Papeterie personnalisée pour sublimer vos événements
          </p>
          <p className="text-lg text-[#6B6B6B] mb-12 max-w-2xl mx-auto">
            Mariage, baptême, anniversaire... Créations uniques et sur-mesure 
            pour rendre vos moments inoubliables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#8B4513] text-white px-8 py-3 rounded-lg hover:bg-[#B89A5E] transition-colors">
              Découvrir nos créations
            </button>
            <button className="border-2 border-[#8B4513] text-[#8B4513] px-8 py-3 rounded-lg hover:bg-[#FAF7F2] transition-colors">
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-[#8B4513]/10 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#8B4513]/5 rounded-full"></div>
    </section>
  );
}
