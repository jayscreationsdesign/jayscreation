"use client"

export function Testimonials() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-jc-text text-center mb-8 sm:mb-12">
          Témoignages Clients
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[
            { 
              name: "Amina K.", 
              event: "Mariage", 
              rating: 5,
              text: "Jay's Creations a su capturer exactement l'ambiance que je voulais pour mon mariage. Les faire-parts étaient sublimes, les invités m'ont tous demandé où je les avais trouvés. Un travail minutieux et un service adorable du début à la fin."
            },
            { 
              name: "Émilie R.", 
              event: "Baptême", 
              rating: 5,
              text: "Pour le baptême de ma fille, j'ai commandé les boîtes dragées et les cartes de remerciement. Le rendu est vraiment premium, bien au-dessus de ce qu'on trouve habituellement. La personnalisation était parfaite, livrée dans les délais. Je recommande les yeux fermés !"
            },
            { 
              name: "Nadia B.", 
              event: "Anniversaire", 
              rating: 5,
              text: "J'ai fait appel à Jay's Creations pour les 5 ans de mon fils, thème super-héros. Les boîtes Pom'Potes personnalisées et la papeterie sweet table ont fait sensation ! Les enfants étaient ravis. Rapport qualité-prix excellent, je reviendrai pour le prochain anniversaire."
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-jc-surface p-4 sm:p-6 rounded-lg sm:rounded-xl border-jc-border">
              <div className="flex mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <span key={j} className="text-[#8B4513] text-sm sm:text-base">â</span>
                ))}
              </div>
              <p className="text-jc-muted mb-3 sm:mb-4 italic text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none">
                "{testimonial.text}"
              </p>
              <div className="font-semibold text-jc-text text-sm sm:text-base">
                {testimonial.name}
              </div>
              <div className="text-xs sm:text-sm text-jc-muted">
                {testimonial.event}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
