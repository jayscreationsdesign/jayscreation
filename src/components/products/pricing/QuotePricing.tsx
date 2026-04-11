'use client'

interface QuotePricingProps {
  productName: string
}

export default function QuotePricing({ productName }: QuotePricingProps) {
  return (
    <div className="bg-white rounded-2xl p-7 border-2 border-[#8B4513] max-w-md">
      {/* Prix */}
      <div className="mb-5">
        <span className="text-2xl font-bold text-[#8B4513]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Sur devis
        </span>
      </div>

      {/* Bloc info */}
      <div className="bg-[#FAF7F2] rounded-xl p-3.5 mb-5 border border-[#8B4513]">
        <p className="text-sm text-[#666] leading-relaxed">
          Ce produit est entièrement personnalisé selon vos besoins. Contactez-nous pour recevoir un devis gratuit sous 24h avec un aperçu maquette.
        </p>
      </div>

      {/* Bouton devis */}
      <a
        href={`/contact?produit=${encodeURIComponent(productName)}`}
        className="block w-full py-3.5 bg-[#8B4513] hover:bg-[#6B3410] text-white font-bold rounded-full text-sm text-center transition-colors shadow-lg cursor-pointer"
      >
        Demander un devis gratuit 
      </a>
      
      {/* Infos rassurantes */}
      <div className="flex items-center justify-center gap-5 mt-3">
        <span className="text-xs text-[#666]"> Réponse sous 24h</span>
        <span className="text-xs text-[#666]"> Maquette incluse</span>
      </div>
    </div>
  )
}
