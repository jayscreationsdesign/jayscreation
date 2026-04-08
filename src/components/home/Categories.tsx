"use client"
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton"

export function Categories() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-jc-text text-center mb-8 sm:mb-12">
          Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: "Mariage", subtitle: "Invitations & Faire-parts" },
            { name: "Naissance", subtitle: "Baptême & Cadeaux" },
            { name: "Événements", subtitle: "Professionnel & Privé" },
            { name: "Marque-places", subtitle: "Tables & Noms" }
          ].map((category) => (
            <div key={category.name} className="text-center">
              <div className="rounded-xl sm:rounded-2xl border-[#8B4513] bg-jc-surface p-4 sm:p-6 mb-3 sm:mb-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-[#8B4513] font-semibold text-sm sm:text-base lg:text-lg">{category.name}</span>
                </div>
                <div className="h-px bg-[#8B4513] mb-2 sm:mb-3"></div>
                <div className="mt-3 sm:mt-4 flex justify-center sm:justify-start">
                  <PrimaryCtaButton href={`/boutique?category=${category.name.toLowerCase()}`} showArrow={false} className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2">
                    {category.name}
                  </PrimaryCtaButton>
                </div>
                <p className="text-[#8B4513]/70 text-xs sm:text-sm mt-2 sm:mt-4">
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
