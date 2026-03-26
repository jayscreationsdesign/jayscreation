const services = [
  {
    title: "Devis Personnalisé",
    description:
      "Présentez votre projet, vos envies et votre budget. Nous créons une proposition sur-mesure adaptée à votre événement.",
  },
  {
    title: "Création & Design",
    description:
      "Mise en page, typographie, illustrations. Nos designers créent des designs uniques qui reflètent votre identité.",
  },
  {
    title: "Impression Premium",
    description:
      "Dorure, vernis sélectif, impression haute résolution et papiers nobles pour des finitions exceptionnelles.",
  },
  {
    title: "Personnalisation",
    description:
      "Gravure de noms, dates, logos. Chaque détail est pensé pour rendre vos créations vraiment uniques.",
  },
  {
    title: "Conseil & Accompagnement",
    description:
      "Aide au choix des papiers, formats, techniques d'impression et délais de livraison.",
  },
  {
    title: "Téléchargement Numérique",
    description:
      "Fichiers PDF et images haute résolution à imprimer vous-même ou chez un imprimeur local.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12">
        <h1 className="font-heading text-4xl text-foreground">Nos Services</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          JaysCreation propose une gamme complète de services pour transformer
          vos idées en créations papeterie exceptionnelles. De la conception au
          rendu final, nous accompagnons chaque étape de votre projet événementiel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-3xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur transition-all hover:shadow-md hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-foreground">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-12 rounded-3xl border border-border bg-background/60 p-8 shadow-sm backdrop-blur">
        <h2 className="font-heading text-2xl text-foreground">Processus</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "1",
              title: "Prise de brief",
              description: "Discutons de votre événement et vos envies",
            },
            {
              step: "2",
              title: "Devis",
              description: "Proposition détaillée avec prix et délais",
            },
            {
              step: "3",
              title: "Création",
              description: "Conception et aller-retour ajustements",
            },
            {
              step: "4",
              title: "Livraison",
              description: "Produit fini prêt pour votre événement",
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background font-semibold">
                {item.step}
              </div>
              <h4 className="mt-3 font-medium text-foreground">{item.title}</h4>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-border bg-background/60 p-8 shadow-sm backdrop-blur">
        <h2 className="font-heading text-2xl text-foreground">
          Prêt à concrétiser votre projet ?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Contactez-nous pour discuter de vos besoins en papeterie personnalisée.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-accent px-8 font-medium text-background transition-all hover:bg-opacity-90 hover:shadow-lg"
        >
          Demander un devis
        </a>
      </section>
    </div>
  );
}
