"use client"
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton"

export function Categories() {
  return (
    <section className="py-12 sm:py-16 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-jc-text text-center mb-8 sm:mb-12">
          Collections
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: "Mariage", subtitle: "Invitations & Faire-parts" },
            { name: "Naissance", subtitle: "Baptême & Cadeaux" },
            { name: "Événements", subtitle: "Professionnel & Privé" },
            { name: "Marque-places", subtitle: "Tables & Noms" }
          ].map((category) => (
            <div key={category.name} className="text-center">
              <div className="rounded-2xl border border-[#8B4513]/30 bg-white p-4 sm:p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                <div className="h-16 sm:h-24 flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-[#8B4513] font-semibold text-sm sm:text-lg">{category.name}</span>
                </div>
                <div className="h-px bg-[#8B4513]/50 mb-3"></div>
                <p className="text-[#8B4513]/70 text-xs sm:text-sm mb-4 flex-grow">
                  {category.subtitle}
                </p>
                <div className="mt-auto">
                  <PrimaryCtaButton 
                    href={`/boutique?category=${category.name.toLowerCase()}`} 
                    showArrow={false}
                    className="w-full text-xs sm:text-sm py-2 px-3 min-h-[36px] sm:min-h-[44px]"
                  >
                    {category.name}
                  </PrimaryCtaButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
