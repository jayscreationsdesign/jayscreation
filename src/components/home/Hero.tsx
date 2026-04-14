import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2]">
      {/* Forcer déploiement Vercel - 27/03/2026 */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(139,69,19,0.35),transparent_55%)]" />
      <div className="absolute -right-40 -top-32 -z-10 h-80 w-80 rounded-full border border-accent/30" />
      <div className="absolute -left-44 -bottom-44 -z-10 h-[28rem] w-[28rem] rounded-full border border-accent/20" />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 md:py-12 lg:px-8 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#8B4513] px-3 py-1.5 text-xs text-white">
              <Sparkles className="h-2.5 w-2.5 text-white" />
              <span className="inline">Édition premium</span>
            </div>

            <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-jc-text">
              Faire-parts & invitations
              <span className="block text-jc-accent">
                personnalisées
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-6 text-jc-muted max-w-lg mx-auto lg:mx-0">
              Créations artisanales uniques avec finitions dorées pour sublimer vos événements.
            </p>

            {/* Note globale */}
            <div className="mt-3 flex items-center gap-2 text-sm text-jc-muted">
              <span className="text-jc-accent">â</span>
              <span className="font-medium">4.9/5 basé sur 127 avis clients</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none">
              <PrimaryCtaButton href="/boutique" className="w-full sm:flex-1 text-sm sm:text-base py-3 px-6 min-h-[44px]">
                Découvrir la boutique
              </PrimaryCtaButton>
              <PrimaryCtaButton href="/contact" showArrow={false} className="w-full sm:flex-1 text-sm sm:text-base py-3 px-6 min-h-[44px]">
                Demander un devis
              </PrimaryCtaButton>
            </div>

            {/* 3 éléments 24h/100%/Premium - scrollable horizontal sur mobile */}
            <div className="mt-8">
              <div className="hidden">
                <div className="flex-shrink-0 rounded-lg border-jc-accent bg-jc-surface px-3 py-2 text-center min-w-[80px]">
                  <div className="text-sm font-heading text-jc-accent font-bold">24h</div>
                  <div className="text-[9px] text-jc-accent/70 leading-tight">
                    Aperçu
                  </div>
                </div>
                <div className="flex-shrink-0 rounded-lg border-jc-accent bg-jc-surface px-3 py-2 text-center min-w-[80px]">
                  <div className="text-sm font-heading text-jc-accent font-bold">100%</div>
                  <div className="text-[9px] text-jc-accent/70 leading-tight">
                    Personnalisé
                  </div>
                </div>
                <div className="flex-shrink-0 rounded-lg border-jc-accent bg-jc-surface px-3 py-2 text-center min-w-[80px]">
                  <div className="text-sm font-heading text-jc-accent font-bold">Premium</div>
                  <div className="text-[9px] text-jc-accent/70 leading-tight">
                    Qualité
                  </div>
                </div>
              </div>
              
              {/* Badges responsive - grid optimisée pour mobile */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 w-full max-w-xs mx-auto lg:mx-0 lg:max-w-none">
                <div className="rounded-lg border border-[#8B4513] bg-[#FAF7F2] px-2 py-2 text-center min-h-[60px] flex flex-col justify-center">
                  <div className="text-sm sm:text-base font-heading text-[#8B4513] font-bold">24h</div>
                  <div className="text-[10px] sm:text-[11px] text-[#8B4513]/80 leading-tight">
                    Aperçu
                  </div>
                </div>
                <div className="rounded-lg border border-[#8B4513] bg-[#FAF7F2] px-2 py-2 text-center min-h-[60px] flex flex-col justify-center">
                  <div className="text-sm sm:text-base font-heading text-[#8B4513] font-bold">100%</div>
                  <div className="text-[10px] sm:text-[11px] text-[#8B4513]/80 leading-tight">
                    Personnalisé
                  </div>
                </div>
                <div className="rounded-lg border border-[#8B4513] bg-[#FAF7F2] px-2 py-2 text-center min-h-[60px] flex flex-col justify-center">
                  <div className="text-sm sm:text-base font-heading text-[#8B4513] font-bold">Premium</div>
                  <div className="text-[10px] sm:text-[11px] text-[#8B4513]/80 leading-tight">
                    Qualité
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative rounded-2xl border border-[#8B4513]/20 bg-white/80 p-4 sm:p-6 shadow-lg backdrop-blur max-w-sm mx-auto lg:mx-0">
              <div className="flex items-center justify-between gap-2 border-b border-[#8B4513]/30 px-3 py-3">
                <div className="text-sm font-medium text-[#2C1A0E]">
                  Collections
                </div>
                <div className="text-xs text-[#8B4513]/70">
                  Sélection
                </div>
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
                    <div className="text-xs sm:text-sm font-heading text-[#2C1A0E] text-center font-semibold">
                      {card.title}
                    </div>
                    <div className="mt-1 text-[10px] sm:text-xs text-[#8B4513]/70 text-center leading-tight">
                      {card.desc}
                    </div>
                    <div className="mt-2 h-0.5 w-4 rounded-full bg-[#8B4513]/50 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-10 -left-10 -z-10 h-28 w-28 rounded-full border border-accent/25 bg-accent/10 blur-[1px]" />
            <div className="pointer-events-none absolute -top-10 -right-10 -z-10 h-28 w-28 rounded-full border border-accent/20 bg-accent/10 blur-[1px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

