"use client"

import { useState, useRef, useEffect } from 'react'
import { ZoomIn, ZoomOut, Search, Plus } from 'lucide-react'

interface ImageMagnifierProps {
  src: string
  alt: string
  className?: string
  maxZoom?: number
  minZoom?: number
  zoomStep?: number
}

export default function ImageMagnifier({ 
  src, 
  alt, 
  className = "",
  maxZoom = 3,
  minZoom = 1,
  zoomStep = 0.5
}: ImageMagnifierProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovering) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    setZoom(1.5) // Zoom modéré au survol
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setZoom(1)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + zoomStep, maxZoom))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - zoomStep, minZoom))
  }

  const getLensStyle = () => {
    if (!containerRef.current) return {}

    const rect = containerRef.current.getBoundingClientRect()
    const lensSize = 120 // Taille de la loupe en pixels

    return {
      width: `${lensSize}px`,
      height: `${lensSize}px`,
      left: `${position.x - lensSize / 2}px`,
      top: `${position.y - lensSize / 2}px`,
      backgroundImage: `url(${src})`,
      backgroundPosition: `-${position.x * zoom - lensSize / 2}px -${position.y * zoom - lensSize / 2}px`,
      backgroundSize: `${rect.width * zoom}px ${rect.height * zoom}px`,
      display: isHovering ? 'block' : 'none',
      cursor: 'none'
    }
  }

  const getZoomedImageStyle = () => {
    if (!containerRef.current || !isHovering) return {}

    const rect = containerRef.current.getBoundingClientRect()
    
    return {
      transform: `scale(${zoom})`,
      transformOrigin: `${position.x}px ${position.y}px`,
      transition: 'transform 0.1s ease-out'
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isHovering ? 'none' : 'zoom-in' }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-100"
        style={getZoomedImageStyle()}
        draggable={false}
      />
      
      {/* Loupe au survol */}
      {isHovering && (
        <div
          className="absolute pointer-events-none z-10 flex items-center justify-center"
          style={{
            left: `${position.x - 18}px`,
            top: `${position.y - 18}px`,
            width: '36px',
            height: '36px'
          }}
        >
          <div className="relative">
            {/* Cercle élégant avec dégradé */}
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 36 36" 
              className="absolute drop-shadow-xl"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(139, 69, 19, 0.4))' }}
            >
              <defs>
                <linearGradient id="magnifierGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A574" />
                  <stop offset="100%" stopColor="#8B4513" />
                </linearGradient>
              </defs>
              <circle 
                cx="18" 
                cy="18" 
                r="16" 
                fill="url(#magnifierGradient)" 
                stroke="#ffffff" 
                strokeWidth="1"
                opacity="0.95"
              />
            </svg>
            
            {/* Icône loupe personnalisée */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Corps de la loupe */}
              <circle 
                cx="9" 
                cy="9" 
                r="7" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              {/* Manche de la loupe */}
              <line 
                x1="14" 
                y1="14" 
                x2="20" 
                y2="20" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              {/* Plus au centre */}
              <line 
                x1="9" 
                y1="6" 
                x2="9" 
                y2="12" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <line 
                x1="6" 
                y1="9" 
                x2="12" 
                y2="9" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
      
      {/* Icônes de contrôle de zoom */}
      {isHovering && (
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleZoomIn()
            }}
            className="bg-white/90 hover:bg-white text-[#8B4513] p-1 rounded-full shadow-md transition-colors"
            title="Zoomer"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleZoomOut()
            }}
            className="bg-white/90 hover:bg-white text-[#8B4513] p-1 rounded-full shadow-md transition-colors"
            title="Dézoomer"
          >
            <ZoomOut size={16} />
          </button>
        </div>
      )}
      
          </div>
  )
}
