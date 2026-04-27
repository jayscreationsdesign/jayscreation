import { Sparkles } from "lucide-react";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2]">

      {/* ========================================
          MOBILE UNIQUEMENT (< lg)
          ======================================== */}
      <div className="lg:hidden px-5 py-8 flex flex-col items-center text-center gap-5">

        {/* Badge edition premium */}
        <div className="inline-flex items-center gap-1 rounded-full bg-[#8B4513] px-3 py-1.5 text-xs text-white">
          <Sparkles className="h-2.5 w-2.5 text-white" />
          <span>Edition premium</span>
        </div>

        {/* Titre */}
        <h1 className="font-heading text-3xl leading-tight text-[#3C2415] w-full max-w-xs">
          Faire-parts & invitations
          <span className="block text-[#C8A96E]">personnalisées</span>
        </h1>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#6B6B6B] max-w-sm">
          Créations artisanales uniques avec finitions dorées pour sublimer vos événements.
        </p>

        {/* Note avis */}
        <div className="flex items-center gap-1 text-sm text-[#6B6B6B]">
          <span className="text-[#C8A96E]">★</span>
          <span>4.9/5 base sur 127 avis clients</span>
        </div>

        {/* Boutons CTA */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <PrimaryCtaButton href="/boutique" className="w-full py-3 px-6 min-h-[44px] text-sm">
            Découvrir la boutique
          </PrimaryCtaButton>
          <PrimaryCtaButton href="/contact" showArrow={false} className="w-full py-3 px-6 min-h-[44px] text-sm">
            Demander un devis
          </PrimaryCtaButton>
        </div>

        {/* Badges 24h / 100% / Premium */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs mt-2">
          {[
            { value: "24h", label: "Aperçu" },
            { value: "100%", label: "Personnalisé" },
            { value: "Premium", label: "Qualité" },
          ].map((badge) => (
            <div
              key={badge.value}
              className="rounded-lg border border-[#8B4513] bg-[#FAF7F2] px-2 py-3 text-center flex flex-col justify-center gap-1"
            >
              <div className="text-sm font-heading text-[#8B4513] font-bold">
                {badge.value}
              </div>
              <div className="text-[10px] text-[#8B4513]/80 leading-tight">
                {badge.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================
          DESKTOP UNIQUEMENT (lg+)
          ======================================== */}
      <div className="hidden lg:block">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(139,69,19,0.35),transparent_55%)]" />
        <div className="absolute -right-40 -top-32 -z-10 h-80 w-80 rounded-full border border-[#C8A96E]/30" />
        <div className="absolute -left-44 -bottom-44 -z-10 h-[28rem] w-[28rem] rounded-full border border-[#C8A96E]/20" />

        <div className="mx-auto max-w-6xl px-8 py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">

            {/* Colonne gauche */}
            <div className="text-left">
              <div className="inline-flex items-center gap-1 rounded-full bg-[#8B4513] px-3 py-1.5 text-xs text-white">
                <Sparkles className="h-2.5 w-2.5 text-white" />
                <span>Edition premium</span>
              </div>

              <h1 className="mt-4 font-heading text-5xl lg:text-6xl leading-[1.1] text-[#3C2415]">
                Faire-parts & invitations
                <span className="block text-[#C8A96E]">personnalisées</span>
              </h1>

              <p className="mt-4 text-lg leading-6 text-[#6B6B6B] max-w-lg">
                Créations artisanales uniques avec finitions dorées pour sublimer vos événements.
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-[#6B6B6B]">
                <span className="text-[#C8A96E]">★</span>
                <span className="font-medium">4.9/5 base sur 127 avis clients</span>
              </div>

              <div className="mt-6 flex gap-3">
                <PrimaryCtaButton href="/boutique" className="text-base py-3 px-6 min-h-[44px]">
                  Découvrir la boutique
                </PrimaryCtaButton>
                <PrimaryCtaButton href="/contact" showArrow={false} className="text-base py-3 px-6 min-h-[44px]">
                  Demander un devis
                </PrimaryCtaButton>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-2 max-w-xs">
                {[
                  { value: "24h", label: "Aperçu" },
                  { value: "100%", label: "Personnalisé" },
                  { value: "Premium", label: "Qualité" },
                ].map((badge) => (
                  <div
                    key={badge.value}
                    className="rounded-lg border border-[#8B4513] bg-[#FAF7F2] px-2 py-2 text-center flex flex-col justify-center min-h-[60px]"
                  >
                    <div className="text-base font-heading text-[#8B4513] font-bold">{badge.value}</div>
                    <div className="text-[11px] text-[#8B4513]/80 leading-tight">{badge.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Colonne droite - Collections */}
            <div className="relative">
              <div className="relative rounded-2xl border border-[#8B4513]/20 bg-white/80 p-6 shadow-lg backdrop-blur max-w-sm">
                <div className="flex items-center justify-between border-b border-[#8B4513]/30 px-3 py-3">
                  <div className="text-sm font-medium text-[#2C1A0E]">Collections</div>
                  <div className="text-xs text-[#8B4513]/70">Selection</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    { title: "Mariage", desc: "Faire-part" },
                    { title: "Naissance", desc: "Cartes" },
                    { title: "Événements", desc: "Invitations" },
                    { title: "Marque-places", desc: "Final" },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group rounded-lg border border-[#8B4513]/30 bg-[radial-gradient(circle_at_top,rgba(139,69,19,0.15),transparent_60%)] p-3 transition-all hover:scale-105 hover:shadow-md min-h-[70px] flex flex-col justify-center"
                    >
                      <div className="text-sm font-heading text-[#2C1A0E] text-center font-semibold">{card.title}</div>
                      <div className="mt-1 text-xs text-[#8B4513]/70 text-center leading-tight">{card.desc}</div>
                      <div className="mt-2 h-0.5 w-4 rounded-full bg-[#8B4513]/50 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

export default Hero;