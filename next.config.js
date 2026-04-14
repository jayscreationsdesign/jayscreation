/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration optimisée pour les images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 390, 412, 640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    remotePatterns: [
      { 
        protocol: 'https', 
        hostname: 'rtttjomxnchffqqaafxa.supabase.co' 
      },
      { 
        protocol: 'https', 
        hostname: 'www.jayscreationsdesign.fr' 
      },
      {
        protocol: 'https',
        hostname: 'jayscreationsdesign.fr'
      }
    ],
    // Taille minimum pour la génération d'images
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 jours
  },
  
  // Configuration du compilateur
  compiler: {
    // Supprimer les console.log en production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Headers pour la performance
  async headers() {
    return [
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
