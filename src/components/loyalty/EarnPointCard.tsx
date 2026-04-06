import { COLORS, FONTS, EARN_METHODS } from './constants';

export default function EarnPointCard({ method, index }: { method: typeof EARN_METHODS[0]; index: number }) {
  return (
    <div 
      className="bg-white rounded-2xl p-7 text-center border transition-all duration-300 hover:scale-105 hover:shadow-lg"
      style={{ borderColor: COLORS.border }}
    >
      {/* Icône */}
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
        style={{
          backgroundColor: COLORS.cream,
          border: `1.5px solid ${COLORS.border}`
        }}
      >
        {method.icon}
      </div>

      {/* Titre */}
      <h3 
        className="font-bold mb-2"
        style={{ fontFamily: FONTS.playfair, color: COLORS.text, fontSize: '14px' }}
      >
        {method.action}
      </h3>

      {/* Description */}
      <p 
        className="text-sm mb-4"
        style={{ color: COLORS.textLight }}
      >
        {method.description}
      </p>

      {/* Badge points */}
      <div 
        className="inline-block px-3 py-1 rounded-full text-sm font-bold"
        style={{
          backgroundColor: `${COLORS.gold}20`,
          color: COLORS.gold,
          border: `1px solid ${COLORS.gold}40`
        }}
      >
        {method.points}
      </div>
    </div>
  );
}
