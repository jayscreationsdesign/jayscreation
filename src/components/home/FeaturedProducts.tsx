"use client"

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#2C2C2C] text-center mb-12">
          Produits Vedettes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 bg-[#E8E4DF] flex items-center justify-center">
                <span className="text-[#6B6B6B]">Image {i}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2C2C2C] mb-2">
                  Produit Vedette {i}
                </h3>
                <p className="text-[#6B6B6B] mb-4">
                  Description du produit avec personnalisation unique
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#C8A96E]">29,90€</span>
                  <button className="bg-[#C8A96E] text-white px-4 py-2 rounded-lg hover:bg-[#B89A5E] transition-colors">
                    Voir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
