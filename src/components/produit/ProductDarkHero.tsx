import { Sparkles, Star, Heart } from "lucide-react";

const PILLARS = [
  {
    Icon: Sparkles,
    title: "Personnalisation totale",
    desc: "thème, couleurs, texte et police sur-mesure",
  },
  {
    Icon: Star,
    title: "Finitions premium",
    desc: "dorure, impression haute qualité, papier épais",
  },
  {
    Icon: Heart,
    title: "Fait avec amour",
    desc: "chaque pièce réalisée à la main avec soin",
  },
];

export default function ProductDarkHero() {
  return (
    <section className="bg-[#2C2C2C] py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Titre italic */}
        <h2 className="font-heading text-center text-3xl font-bold italic text-white md:text-5xl">
          Papeterie artisanale pour vos plus beaux moments
        </h2>
        <p className="mt-4 text-center text-lg text-white/70">
          Des créations uniques, personnalisées avec soin et des finitions premium
        </p>

        {/* 3 blocs */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {PILLARS.map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <Icon size={40} className="text-[#C8A96E]" />
              <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
