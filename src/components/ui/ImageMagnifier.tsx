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
  estNumerique?: boolean
}

export default function ImageMagnifier({ 
  src, 
  alt, 
  className = "",
  maxZoom = 3,
  minZoom = 1,
  zoomStep = 0.5,
  estNumerique = false
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
      style={{ 
        cursor: isHovering ? 'none' : 'zoom-in',
        background: estNumerique ? '#FFF0F3' : '#FAF7F2',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full transition-transform duration-100"
        style={{
          objectFit: 'contain',
          width: '140%',
          height: '100%',
          ...getZoomedImageStyle()
        }}
        draggable={false}
      />
      
      {/* Loupe au survol */}
      {isHovering && (
        <div
          className="absolute pointer-events-none z-10 flex items-center justify-center"
          style={{
            left: `${position.x - 16}px`,
            top: `${position.y - 16}px`,
            width: '32px',
            height: '32px'
          }}
        >
          <div className="relative">
            {/* Icône loupe professionnelle - couleur ultra forcée */}
            <div 
              className="relative z-10"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))'
              }}
            >
              <style jsx>{`
                .magnifier-icon {
                  stroke: #8B4513 !important;
                  fill: none !important;
                }
                .magnifier-icon circle,
                .magnifier-icon line {
                  stroke: #8B4513 !important;
                  fill: none !important;
                }
                svg * {
                  stroke: #8B4513 !important;
                  fill: none !important;
                  color: #8B4513 !important;
                }
              `}</style>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="magnifier-icon"
                style={{ 
                  stroke: '#8B4513 !important',
                  fill: 'none !important',
                  color: '#8B4513 !important'
                }}
              >
                {/* Corps de la loupe */}
                <circle 
                  cx="9" 
                  cy="9" 
                  r="6.5" 
                  stroke="#8B4513" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  fill="none"
                  style={{ 
                    stroke: '#8B4513 !important',
                    fill: 'none !important'
                  }}
                />
                {/* Manche de la loupe */}
                <line 
                  x1="13.5" 
                  y1="13.5" 
                  x2="19" 
                  y2="19" 
                  stroke="#8B4513" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  style={{ 
                    stroke: '#8B4513 !important',
                    fill: 'none !important'
                  }}
                />
                {/* Plus au centre - horizontal */}
                <line 
                  x1="9" 
                  y1="6.5" 
                  x2="9" 
                  y2="11.5" 
                  stroke="#8B4513" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  style={{ 
                    stroke: '#8B4513 !important',
                    fill: 'none !important'
                  }}
                />
                {/* Plus au centre - vertical */}
                <line 
                  x1="6.5" 
                  y1="9" 
                  x2="11.5" 
                  y2="9" 
                  stroke="#8B4513" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  style={{ 
                    stroke: '#8B4513 !important',
                    fill: 'none !important'
                  }}
                />
              </svg>
            </div>
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
