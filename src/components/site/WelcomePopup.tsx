'use client'

import { useState, useEffect } from 'react'
import { X, Copy, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Vérifier si la pop-up a déjà été vue
    const seen = localStorage.getItem('popupSeen')
    if (!seen) {
      // Apparaître après 3 secondes
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('popupSeen', 'true')
  }

  const handleCopyAndShop = () => {
    navigator.clipboard.writeText('BIENVENUE10')
    setCopied(true)
    
    // Fermer la pop-up et rediriger après un court délai
    setTimeout(() => {
      handleClose()
      window.location.href = '/boutique'
    }, 1000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative bg-[#FFF8F0] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
        {/* Bouton fermeture */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#8B4513]/50 hover:text-[#8B4513] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Contenu */}
        <div className="text-center">
          {/* Logo */}
          <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">JC</span>
          </div>

          {/* Titre */}
          <h2 
            className="text-2xl sm:text-3xl font-bold text-[#2C1A0E] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bienvenue chez Jay's Creations Design
          </h2>

          {/* Texte */}
          <p className="text-[#6B6B6B] mb-6 text-sm sm:text-base">
            Profitez de -10% sur votre première commande
          </p>

          {/* Code promo */}
          <div className="bg-[#8B4513] text-white px-6 py-3 rounded-lg mb-6 inline-block">
            <code className="text-lg sm:text-xl font-bold">BIENVENUE10</code>
          </div>

          {/* Bouton action */}
          <button
            onClick={handleCopyAndShop}
            className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Copy size={18} />
            <span>{copied ? 'Code copié !' : 'Copier & commencer mes achats'}</span>
            <ShoppingBag size={18} />
          </button>

          {/* Texte petit */}
          <p className="text-xs text-[#8B4513]/60 mt-4">
            Offre valable sur votre première commande uniquement
          </p>
        </div>
      </div>
    </div>
  )
}
