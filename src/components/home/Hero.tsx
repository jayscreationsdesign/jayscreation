import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(200,169,110,0.35),transparent_55%)]" />
      <div className="absolute -right-40 -top-32 -z-10 h-80 w-80 rounded-full border border-accent/30" />
      <div className="absolute -left-44 -bottom-44 -z-10 h-[28rem] w-[28rem] rounded-full border border-accent/20" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Édition premium, personnalisation sur-mesure
            </div>

            <h1 className="mt-6 font-heading text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Faire-part, invitations et menus
              <span className="block text-accent">
                qui signent votre événement
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
              Une identité élégante et artisanale, des finitions dorées et une
              typographie soignée pour créer des pièces uniques, du mariage aux
              célébrations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
              >
                Découvrir la boutique{" "}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Demander un devis
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background/60 px-4 py-4">
                <div className="text-2xl font-heading text-accent">24h</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Aperçu maquette
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 px-4 py-4">
                <div className="text-2xl font-heading text-accent">100%</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Personnalisé
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 px-4 py-4">
                <div className="text-2xl font-heading text-accent">Premium</div>
                <div className="mt-1 text-xs text-muted-foreground">
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
                    <div className="mt-1 text-xs leading-5 text-muted-foreground" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
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

