"use client"

export function Categories() {
  return (
    <section className="py-16 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-jc-text text-center mb-12">
          Collections
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "Mariage", subtitle: "Invitations & Faire-parts" },
            { name: "Naissance", subtitle: "Baptême & Cadeaux" },
            { name: "Événements", subtitle: "Professionnel & Privé" },
            { name: "Marque-places", subtitle: "Tables & Noms" }
          ].map((category) => (
            <div key={category.name} className="text-center">
              <div className="rounded-2xl border-[#8B4513] bg-jc-surface p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="h-24 flex items-center justify-center mb-4">
                  <span className="text-[#8B4513] font-semibold text-lg">{category.name}</span>
                </div>
                <div className="h-px bg-[#8B4513] mb-3"></div>
                <p className="text-[#8B4513]/70 text-sm">
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
