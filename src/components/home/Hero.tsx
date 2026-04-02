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

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#8B4513] px-4 py-2 text-sm text-white">
              <Sparkles className="h-4 w-4 text-white" />
              Édition premium, personnalisation sur-mesure
            </div>

            <h1 className="mt-6 font-heading text-4xl leading-[1.05] text-jc-text sm:text-5xl">
              Faire-parts, invitations et menus
              <span className="block text-jc-accent">
                qui signent votre événement
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-jc-muted sm:text-lg text-center">
              Une identité élégante et artisanale, des finitions dorées et une
              typographie soignée pour créer des pièces uniques, du mariage aux
              célébrations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryCtaButton href="/boutique">
                Découvrir la boutique
              </PrimaryCtaButton>
              <PrimaryCtaButton href="/contact" showArrow={false}>
                Demander un devis
              </PrimaryCtaButton>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border-jc-accent bg-jc-surface px-4 py-4">
                <div className="text-2xl font-heading text-jc-accent font-bold">24h</div>
                <div className="mt-1 text-xs text-jc-accent/70">
                  Aperçu maquette
                </div>
              </div>
              <div className="rounded-2xl border-jc-accent bg-jc-surface px-4 py-4">
                <div className="text-2xl font-heading text-jc-accent font-bold">100%</div>
                <div className="mt-1 text-xs text-jc-accent/70">
                  Personnalisé
                </div>
              </div>
              <div className="rounded-2xl border-jc-accent bg-jc-surface px-4 py-4">
                <div className="text-2xl font-heading text-jc-accent font-bold">Premium</div>
                <div className="mt-1 text-xs text-jc-accent/70">
                  Finitions & dorures
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl border border-border bg-background/60 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between gap-3 border-b border-border px-2 py-3">
                <div className="text-sm font-medium text-foreground">
                  Collections
                </div>
                <div className="text-xs text-muted-foreground">
                  Sélection du moment
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { title: "Mariage", desc: "Faire-part & menus" },
                  { title: "Naissance", desc: "Cartes & souvenirs" },
                  { title: "Événements", desc: "Invitations premium" },
                  { title: "Marque-places", desc: "Touche finale" },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="group rounded-2xl border border-border bg-[radial-gradient(circle_at_top,rgba(200,169,110,0.22),transparent_60%)] p-4 transition-transform hover:-translate-y-0.5"
                  >
                    <div className="text-sm font-heading text-foreground">
                      {card.title}
                    </div>
                    <div className="mt-1 text-xs leading-5 text-muted-foreground text-center" style={{ textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>
                      {card.desc}
                    </div>
                    <div className="mt-4 h-1 w-10 rounded-full bg-accent/70" />
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

