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
            { name: "Mariage", color: "bg-[#F8E7E7]" },
            { name: "Baptême", color: "bg-[#E7EEF8]" },
            { name: "Anniversaire", color: "bg-[#F8F3E7]" },
            { name: "Événements", color: "bg-[#E7F8F0]" }
          ].map((category) => (
            <div key={category.name} className="text-center">
              <div className={`h-24 rounded-lg ${category.color} mb-4 flex items-center justify-center`}>
                <span className="text-[#2C2C2C] font-semibold">{category.name}</span>
              </div>
              <p className="text-[#6B6B6B] text-sm">
                Créations personnalisées pour {category.name.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
