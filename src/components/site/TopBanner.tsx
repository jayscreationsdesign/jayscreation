'use client'

import { useState, useEffect } from 'react'
import { X, Copy } from 'lucide-react'

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Vérifier si le bandeau a déjà été fermé
    const closed = localStorage.getItem('topBannerClosed')
    if (!closed) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('topBannerClosed', 'true')
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BIENVENUE10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#8B4513] h-10 flex items-center justify-center px-4">
      <div className="flex items-center gap-3 text-white text-xs sm:text-sm">
        <span className="hidden sm:inline">{"\ud83c\udf81"} -10% sur votre première commande avec le code BIENVENUE10</span>
        <span className="sm:hidden">{"\ud83c\udf81"} -10% avec BIENVENUE10</span>
        
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded-md transition-colors text-xs"
        >
          <Copy size={12} />
          <span>{copied ? 'Copié!' : 'Copier'}</span>
        </button>
        
        <button
          onClick={handleClose}
          className="ml-2 text-white/70 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
