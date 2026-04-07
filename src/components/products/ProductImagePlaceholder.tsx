'use client'

export default function ProductImagePlaceholder({ productName }: { productName?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5E6D3] relative overflow-hidden">
      {/* Motif décoratif subtil */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, #8B4513 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Cercle décoratif */}
      <div className="relative z-10 w-20 h-20 rounded-full border-2 border-[#8B4513]/30 flex items-center justify-center mb-4">
        <div className="w-14 h-14 rounded-full border border-[#8B4513]/20 flex items-center justify-center">
          {/* Icône élégante -- étoile dorée */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L16.91 19.02L12 15.77L7.09 19.02L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z" 
              fill="#8B4513" opacity="0.4"/>
            <path d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L16.91 19.02L12 15.77L7.09 19.02L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z" 
              stroke="#8B4513" strokeWidth="1.5" fill="none" opacity="0.7"/>
          </svg>
        </div>
      </div>

      {/* Texte */}
      <p className="relative z-10 text-[#8B4513] text-sm font-semibold tracking-wider uppercase">
        Aperçu à venir
      </p>
      {productName && (
        <p className="relative z-10 text-[#3C2415]/60 text-sm mt-2 text-center px-4 font-medium italic" 
           style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {productName}
        </p>
      )}

      {/* Ligne décorative dorée en bas */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#8B4513]/40 to-transparent" />
    </div>
  )
}
