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

      <div className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-12 lg:py-24">
        <div className="grid items-center gap-6 lg:gap-8 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#8B4513] px-2 py-1 text-xs text-white">
              <Sparkles className="h-2.5 w-2.5 text-white" />
              <span className="hidden sm:inline">Édition premium</span>
              <span className="sm:hidden">Premium</span>
            </div>

            <h1 className="mt-3 font-heading text-xl leading-[1.1] text-jc-text sm:text-2xl lg:text-4xl lg:text-5xl">
              Faire-parts & invitations
              <span className="block text-jc-accent">
                personnalisées
              </span>
            </h1>

            <p className="mt-2 text-sm leading-5 text-jc-muted sm:mt-3 sm:text-base sm:leading-6 max-w-lg mx-auto lg:mx-0">
              Créations artisanales uniques avec finitions dorées pour sublimer vos événements.
            </p>

            <div className="mt-4 flex flex-col gap-2 w-full max-w-xs mx-auto lg:mx-0">
              <PrimaryCtaButton href="/boutique" className="w-full text-xs py-2 sm:text-sm sm:py-2.5">
                Découvrir la boutique
              </PrimaryCtaButton>
              <PrimaryCtaButton href="/contact" showArrow={false} className="w-full text-xs py-2 sm:text-sm sm:py-2.5">
                Demander un devis
              </PrimaryCtaButton>
            </div>

            {/* 3 éléments 24h/100%/Premium - scrollable horizontal sur mobile */}
            <div className="mt-6 lg:mt-8">
              <div className="flex gap-4 overflow-x-auto pb-2 lg:hidden">
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
              
              {/* Version desktop - grille normale */}
              <div className="hidden lg:grid grid-cols-3 gap-1 w-full">
                <div className="rounded-lg border-jc-accent bg-jc-surface px-2 py-2 text-center">
                  <div className="text-sm font-heading text-jc-accent font-bold">24h</div>
                  <div className="text-[9px] text-jc-accent/70 leading-tight">
                    Aperçu
                  </div>
                </div>
                <div className="rounded-lg border-jc-accent bg-jc-surface px-2 py-2 text-center">
                  <div className="text-sm font-heading text-jc-accent font-bold">100%</div>
                  <div className="text-[9px] text-jc-accent/70 leading-tight">
                    Personnalisé
                  </div>
                </div>
                <div className="rounded-lg border-jc-accent bg-jc-surface px-2 py-2 text-center">
                  <div className="text-sm font-heading text-jc-accent font-bold">Premium</div>
                  <div className="text-[9px] text-jc-accent/70 leading-tight">
                    Qualité
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl border border-border bg-background/60 p-3 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between gap-2 border-b border-border px-2 py-2">
                <div className="text-xs font-medium text-foreground">
                  Collections
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Sélection
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {[
                  { title: "Mariage", desc: "Faire-part" },
                  { title: "Naissance", desc: "Cartes" },
                  { title: "Événements", desc: "Invitations" },
                  { title: "Marque-places", desc: "Final" },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="group rounded-lg border border-border bg-[radial-gradient(circle_at_top,rgba(200,169,110,0.22),transparent_60%)] p-2 transition-transform"
                  >
                    <div className="text-xs font-heading text-foreground text-center">
                      {card.title}
                    </div>
                    <div className="mt-0.5 text-[9px] text-muted-foreground text-center leading-tight">
                      {card.desc}
                    </div>
                    <div className="mt-1.5 h-0.5 w-4 rounded-full bg-accent/70 mx-auto" />
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

