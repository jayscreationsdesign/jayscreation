"use client"

export function About() {
  return (
    <section className="py-16" style={{
      background: "linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 50%, #F5E6D3 100%)"
    }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Badge en haut */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-sm font-medium border border-[#8B4513]/20">
            Simple & rapide
          </span>
        </div>

        {/* Titre principal */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#8B4513] mb-4 tracking-tight">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-[#8B4513] max-w-2xl mx-auto leading-relaxed">
            Créez vos souvenirs uniques en quelques clics, du choix des produits à la réception chez vous
          </p>
        </div>

        {/* 4 étapes horizontales sur desktop - CENTRAGE FORCÉ */}
        <div className="hidden lg:block">
          <div className="flex justify-center">
            <div className="grid grid-cols-7 gap-8 justify-items-center items-start max-w-5xl">
              {/* Étape 1 */}
              <div className="flex max-w-[260px] flex-col items-center text-center col-span-1">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Choisissez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Sélectionnez vos produits et votre thème préféré
                </p>
              </div>

              {/* Séparateur 1 */}
              <div className="flex items-center justify-center col-span-1">
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#D4A574] to-transparent"></div>
              </div>

              {/* Étape 2 */}
              <div className="flex max-w-[260px] flex-col items-center text-center col-span-1">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Personnalisez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Ajoutez prénoms, dates, textes et options
                </p>
              </div>

              {/* Séparateur 2 */}
              <div className="flex items-center justify-center col-span-1">
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#D4A574] to-transparent"></div>
              </div>

              {/* Étape 3 */}
              <div className="flex max-w-[260px] flex-col items-center text-center col-span-1">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Validez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Recevez un aperçu et confirmez votre commande
                </p>
              </div>

              {/* Séparateur 3 */}
              <div className="flex items-center justify-center col-span-1">
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#D4A574] to-transparent"></div>
              </div>

              {/* Étape 4 */}
              <div className="flex max-w-[260px] flex-col items-center text-center col-span-1">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Recevez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Livraison sous 15 à 25 jours directement chez vous
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Version tablette - CENTRAGE FORCÉ */}
        <div className="hidden md:block lg:hidden mt-16">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-8 justify-items-center items-start max-w-3xl">
              {/* Étape 1 */}
              <div className="flex max-w-[260px] flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Choisissez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Sélectionnez vos produits et votre thème préféré
                </p>
              </div>

              {/* Étape 2 */}
              <div className="flex max-w-[260px] flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Personnalisez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Ajoutez prénoms, dates, textes et options
                </p>
              </div>

              {/* Étape 3 */}
              <div className="flex max-w-[260px] flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Validez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Recevez un aperçu et confirmez votre commande
                </p>
              </div>

              {/* Étape 4 */}
              <div className="flex max-w-[260px] flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Recevez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Livraison sous 15 à 25 jours directement chez vous
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Version mobile - CENTRAGE FORCÉ */}
        <div className="md:hidden mt-16">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 justify-items-center items-start max-w-sm">
              {/* Étape 1 */}
              <div className="flex max-w-[260px] flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-lg">1</span>
                </div>
                <h3 className="text-lg font-semibold text-[#8B4513] mb-3">Choisissez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Sélectionnez vos produits et votre thème préféré
                </p>
              </div>

              {/* Étape 2 */}
              <div className="flex max-w-[260px] flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-lg">2</span>
                </div>
                <h3 className="text-lg font-semibold text-[#8B4513] mb-3">Personnalisez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Ajoutez prénoms, dates, textes et options
                </p>
              </div>

              {/* Étape 3 */}
              <div className="flex max-w-[260px] flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-lg">3</span>
                </div>
                <h3 className="text-lg font-semibold text-[#8B4513] mb-3">Validez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Recevez un aperçu et confirmez votre commande
                </p>
              </div>

              {/* Étape 4 */}
              <div className="flex max-w-[260px] flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B4513] transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#D4A574] font-bold text-lg">4</span>
                </div>
                <h3 className="text-lg font-semibold text-[#8B4513] mb-3">Recevez</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Livraison sous 15 à 25 jours directement chez vous
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Texte de conclusion */}
        <div className="text-center mt-16">
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto leading-relaxed">
            Des créations uniques qui transforment vos événements en souvenirs précieux
          </p>
        </div>
      </div>
    </section>
  );
}
