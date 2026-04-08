'use client'

interface QuotePricingProps {
  productName: string
}

export default function QuotePricing({ productName }: QuotePricingProps) {
  return (
    <div>
      {/* Prix */}
      <div className="mb-4">
        <span className="text-2xl font-bold text-[#C8A96E]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Sur devis
        </span>
      </div>

      {/* Explication */}
      <div className="px-4 py-3 bg-[#FAF7F2] rounded-xl mb-6 border border-[#E8E0D4]">
        <p className="text-sm text-[#666] leading-relaxed">
          Ce produit est entièrement personnalisé selon vos besoins. Contactez-nous pour recevoir un devis gratuit sous 24h avec un aperçu maquette.
        </p>
      </div>

      {/* Bouton demander un devis */}
      <a
        href={`/contact?produit=${encodeURIComponent(productName)}`}
        className="block w-full py-4 bg-[#3C2415] hover:bg-[#4E3222] text-white font-bold rounded-full text-sm text-center transition-colors shadow-md"
      >
        Demander un devis gratuit 
      </a>

      {/* Infos rassurantes */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <span className="text-xs text-[#999] flex items-center gap-1"> Réponse sous 24h</span>
        <span className="text-xs text-[#999] flex items-center gap-1"> Aperçu maquette inclus</span>
      </div>
    </div>
  )
}
