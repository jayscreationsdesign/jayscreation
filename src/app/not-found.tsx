import Link from 'next/link'
import { Home, ShoppingBag, Palette } from 'lucide-react'

export default function NotFound() {
  const categories = [
    {
      name: 'Papeterie',
      description: 'Faire-parts, invitations, menus personnalisés',
      href: '/boutique?category=papeterie-telechargeable',
      icon: 'ð'
    },
    {
      name: 'Sweet Tables',
      description: 'Décoration et gourmandises pour vos événements',
      href: '/boutique?category=sweet-tables-decoration',
      icon: 'ð§'
    },
    {
      name: 'Cadeaux',
      description: 'Presents originaux et personnalisés',
      href: '/boutique?category=cadeaux-invites',
      icon: 'ð'
    }
  ]

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Header avec logo */}
      <div className="text-center py-8">
        <Link href="/" className="inline-flex items-center justify-center">
          <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">JC</span>
          </div>
        </Link>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            {/* Illustration SVG */}
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Pinceau */}
                <rect
                  x="45"
                  y="20"
                  width="10"
                  height="60"
                  fill="#8B4513"
                  rx="2"
                />
                <rect
                  x="42"
                  y="15"
                  width="16"
                  height="8"
                  fill="#8B4513"
                  rx="2"
                />
                {/* Poils du pinceau */}
                <rect
                  x="47"
                  y="75"
                  width="6"
                  height="15"
                  fill="#C8A96E"
                  rx="1"
                />
                {/* Gouttes de peinture */}
                <circle cx="52" cy="85" r="2" fill="#8B4513" opacity="0.7" />
                <circle cx="48" cy="88" r="1.5" fill="#C8A96E" opacity="0.7" />
                <circle cx="55" cy="87" r="1" fill="#8B4513" opacity="0.5" />
              </svg>
            </div>

            {/* Titre principal */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C1A0E] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Oops !
            </h1>

            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-[#6B6B6B] mb-8 max-w-2xl mx-auto">
              Cette page semble avoir disparu comme nos créations les plus populaires...
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/">
                <button className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 min-h-[48px]">
                  <Home size={20} />
                  Retour à l'accueil
                </button>
              </Link>
              
              <Link href="/boutique">
                <button className="border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 min-h-[48px]">
                  <ShoppingBag size={20} />
                  Voir la boutique
                </button>
              </Link>
            </div>
          </div>

          {/* Suggestions de catégories */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#2C1A0E] mb-8">
              Explorez nos catégories populaires
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="group bg-white rounded-2xl p-6 border border-[#E8E4DF] hover:shadow-lg hover:border-[#8B4513] transition-all duration-300"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#2C1A0E] mb-2 group-hover:text-[#8B4513] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-4 text-[#8B4513] font-medium text-sm group-hover:text-[#6B3410] transition-colors">
                    Découvrir â
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Message de réassurance */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-6 border border-[#E8E4DF] max-w-2xl mx-auto">
              <Palette className="w-8 h-8 text-[#8B4513] mx-auto mb-3" />
              <p className="text-[#6B6B6B] mb-2">
                Besoin d'aide pour trouver ce que vous cherchez ?
              </p>
              <Link href="/contact">
                <button className="text-[#8B4513] font-medium hover:text-[#6B3410] transition-colors">
                  Contactez notre équipe créative
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
