'use client'

import { useState } from 'react'

interface JayClubBadgeProps {
  points: number
  className?: string
}

export default function JayClubBadge({ points, className = '' }: JayClubBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  // Déterminer le tier et la couleur en fonction des points
  const getTierInfo = (points: number) => {
    if (points >= 500) {
      return {
        name: 'Diamant',
        bgColor: 'bg-gradient-to-r from-[#C8A96E] to-[#8B4513]',
        textColor: 'text-white',
        borderColor: 'border-[#C8A96E]'
      }
    } else if (points >= 150) {
      return {
        name: 'Orchidée',
        bgColor: 'bg-[#8B4513]',
        textColor: 'text-white',
        borderColor: 'border-[#8B4513]'
      }
    } else {
      return {
        name: 'Pétale',
        bgColor: 'bg-[#FFF8F0]',
        textColor: 'text-[#2C1A0E]',
        borderColor: 'border-[#8B4513]'
      }
    }
  }

  const tierInfo = getTierInfo(points)

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${tierInfo.bgColor} ${tierInfo.textColor} ${tierInfo.borderColor} border-2 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold cursor-pointer transform transition-transform hover:scale-110`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {points}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#2C1A0E] text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-50">
          <div className="font-semibold">{tierInfo.name}</div>
          <div>{points} points</div>
          {/* Flèche du tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#2C1A0E]"></div>
          </div>
        </div>
      )}
    </div>
  )
}
