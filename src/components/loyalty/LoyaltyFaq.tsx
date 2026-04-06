'use client';

import { useState } from 'react';
import { COLORS, FONTS, FAQ } from './constants';

export default function LoyaltyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-14" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-2xl mx-auto px-6">
        {/* En-tête */}
        <div className="text-center mb-12">
          <p 
            className="text-sm font-medium uppercase tracking-wider mb-4"
            style={{ color: COLORS.gold, letterSpacing: '0.15em' }}
          >
            Questions fréquentes
          </p>
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
          >
            Tout savoir sur le Jay's Club
          </h2>
        </div>

        {/* Questions accordéon */}
        <div className="space-y-3">
          {FAQ.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border overflow-hidden transition-all duration-300"
              style={{
                borderColor: openIndex === index ? COLORS.gold : COLORS.border
              }}
            >
              {/* Bouton question */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span 
                  className="font-medium pr-4"
                  style={{ 
                    color: COLORS.text, 
                    fontSize: '14px',
                    fontFamily: FONTS.inter
                  }}
                >
                  {item.question}
                </span>
                <span 
                  className="text-xl transition-transform duration-300 flex-shrink-0"
                  style={{ 
                    color: COLORS.gold,
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
                  }}
                >
                  +
                </span>
              </button>

              {/* Réponse */}
              {openIndex === index && (
                <div 
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{ color: COLORS.textLight, lineHeight: 1.6 }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
