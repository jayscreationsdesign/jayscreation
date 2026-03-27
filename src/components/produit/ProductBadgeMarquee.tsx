const BADGES = [
  "FAIT MAIN",
  "PERSONNALISABLE",
  "FINITIONS DORÉES",
  "LIVRAISON FRANCE",
  "QUALITÉ PREMIUM",
  "PAIEMENT SÉCURISÉ",
];

// Doublé pour le défilement infini fluide
const content = [...BADGES, ...BADGES];

export default function ProductBadgeMarquee() {
  return (
    <div className="overflow-hidden border-y border-[#E8E4DF] bg-white py-5">
      <div
        className="flex w-max items-center"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {content.map((badge, i) => (
          <div key={i} className="flex items-center">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#6B6B6B]">
              {badge}
            </span>
            <span className="mx-6 text-[#C8A96E]">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
