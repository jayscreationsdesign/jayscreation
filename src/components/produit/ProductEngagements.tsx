const ENGAGEMENTS = [
  {
    label: "QUALITÉ",
    title: "Matériaux premium",
    desc: "Nous sélectionnons les meilleurs papiers, encres et finitions pour des créations qui durent.",
  },
  {
    label: "DÉLAIS",
    title: "Livraison maîtrisée",
    desc: "Réalisation en 15-25 jours, suivi par email, livraison soignée en France métropolitaine.",
  },
  {
    label: "SERVICE",
    title: "Accompagnement personnalisé",
    desc: "Un aperçu maquette sous 24h, des échanges jusqu'à satisfaction, un service client réactif.",
  },
];

export default function ProductEngagements() {
  return (
    <section className="bg-[#FAF7F2] py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="font-heading text-center text-3xl text-[#2C2C2C] md:text-4xl">
          Nos engagements
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {ENGAGEMENTS.map((e) => (
            <div key={e.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C8A96E]">
                {e.label}
              </p>
              <h3 className="font-heading mt-2 text-xl text-[#2C2C2C]">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B] text-justify">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
