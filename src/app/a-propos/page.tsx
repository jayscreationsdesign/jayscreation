const values = [
  {
    title: "Artisanat",
    description:
      "Chaque piece est pensee avec soin, du choix des papiers aux finitions.",
  },
  {
    title: "Personnalisation",
    description:
      "Typographies, couleurs, formats : nous adaptons la papeterie a votre histoire.",
  },
  {
    title: "Qualité Premium",
    description:
      "Dorure, impression de qualite et details elegants pour un rendu exceptionnel.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl text-foreground">Notre Histoire</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur">
          <p className="text-sm leading-7 text-muted-foreground">
            JaysCreation est une marque de papeterie événementielle artisanale,
            spécialisée dans les faire-part, invitations et menus personnalisés
            avec des finitions premium (dorure, impression de qualité,
            typographie soignée).
          </p>

          <div className="mt-6 rounded-2xl border border-border bg-[radial-gradient(ellipse_at_top,rgba(200,169,110,0.22),transparent_65%)] p-5">
            <div className="font-heading text-xl text-foreground">
              Une signature elegante, epuree, intemporelle.
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Notre objectif : creer des pieces qui donnent le ton des le
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

