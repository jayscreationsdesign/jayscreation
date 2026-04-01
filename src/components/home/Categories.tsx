"use client"

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#2C2C2C] text-center mb-12">
          Nos Catégories
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "Mariage", subtitle: "Invitations & Faire-parts" },
            { name: "Baptême", subtitle: "Naissance & Cérémonie" },
            { name: "Anniversaire", subtitle: "Fêtes & Célébrations" },
            { name: "Événements", subtitle: "Professionnel & Privé" }
          ].map((category) => (
            <div key={category.name} className="text-center">
              <div className="rounded-2xl border border-[#C8A96E] bg-white p-6 mb-4">
                <div className="h-24 flex items-center justify-center mb-4">
                  <span className="text-[#C8A96E] font-semibold text-lg">{category.name}</span>
                </div>
                <div className="h-px bg-[#C8A96E] mb-3"></div>
                <p className="text-[#C8A96E]/70 text-sm">
                  {category.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
