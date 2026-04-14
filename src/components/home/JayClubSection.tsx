'use client'

import Link from 'next/link'

export default function JayClubSection() {
  const tiers = [
    {
      name: 'Pétale',
      icon: 'ð¸',
      points: '0-149 pts',
      description: 'Commencez votre voyage',
      bgColor: 'bg-[#FFF8F0]',
      textColor: 'text-[#2C1A0E]'
    },
    {
      name: 'Orchidée',
      icon: 'ðº',
      points: '150-499 pts',
      description: 'Avantages exclusifs',
      bgColor: 'bg-[#8B4513]',
      textColor: 'text-white'
    },
    {
      name: 'Diamant',
      icon: 'ð',
      points: '500+ pts',
      description: 'Statut VIP',
      bgColor: 'bg-gradient-to-r from-[#C8A96E] to-[#8B4513]',
      textColor: 'text-white'
    }
  ]

  return (
    <section className="bg-[#2C1A0E] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Rejoignez le Jay's Club
          </h2>
          <p className="text-white/90 text-lg">
            Gagnez des points à chaque achat et accédez à des avantages exclusifs
          </p>
        </div>

        {/* Tiers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`${tier.bgColor} ${tier.textColor} rounded-2xl p-6 text-center transform transition-transform hover:scale-105`}
            >
              <div className="text-4xl mb-3">{tier.icon}</div>
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm opacity-80 mb-2">{tier.points}</p>
              <p className="text-sm">{tier.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/compte/inscription">
            <button className="bg-white text-[#2C1A0E] px-8 py-3 rounded-full font-semibold hover:bg-[#FFF8F0] transition-colors inline-flex items-center gap-2">
              <span>Créer mon compte</span>
              <span className="text-lg">â</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
