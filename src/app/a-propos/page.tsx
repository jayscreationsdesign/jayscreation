const values = [
  {
    title: "Artisanat",
    description:
      "Chaque pièce est pensée avec soin, du choix des papiers aux finitions.",
  },
  {
    title: "Personnalisation",
    description:
      "Typographies, couleurs, formats : nous adaptons la papeterie à votre histoire.",
  },
  {
    title: "Qualité Premium",
    description:
      "Dorure, impression de qualité et détails élégants pour un rendu exceptionnel.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl text-foreground">💫 Notre histoire</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur">
          <div className="text-sm leading-7 text-muted-foreground">
            <p className="mb-4">
              Née d'une passion de maman
            </p>
            <p className="mb-4">
              Tout a commencé avec mes propres enfants. Comme toutes les mamans, je voulais que leurs anniversaires, leurs fêtes soient uniques et mémorables. Mais impossible de trouver exactement ce que j'imaginais...
            </p>
            <p className="mb-4">
              Alors j'ai décidé de le créer moi-même ! De fil en aiguille, les mamans autour de moi m'ont demandé de réaliser leurs invitations, leurs boîtes cadeaux, leurs décorations... Jay's Creations Design était né.
            </p>
            <p>
              Aujourd'hui, je mets tout mon cœur à créer pour vos familles ce que je crée pour la mienne : des souvenirs précieux, faits main, avec amour et attention aux détails. Parce que chaque événement mérite d'être sublimé.
            </p>
            <p className="mt-4 text-center">
              — Jay ✨
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-[radial-gradient(ellipse_at_top,rgba(200,169,110,0.22),transparent_65%)] p-5">
            <div className="font-heading text-xl text-foreground">
              Une signature élégante, épurée, intemporelle.
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Notre objectif : créer des pièces qui donnent le ton dès le
              premier regard.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur">
          <div className="font-heading text-2xl text-foreground">Valeurs</div>
          <div className="mt-5 grid gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-background p-5 transition-colors hover:bg-muted"
              >
                <div className="text-lg font-heading text-foreground">
                  {v.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

