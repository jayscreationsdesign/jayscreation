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
  
  // Configuration Turbopack (vide pour utiliser webpack)
  turbopack: {},
  
  // Configuration webpack pour exclure les modules Node.js incompatibles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclure complètement nodemailer et ses dépendances côté client
      config.externals = {
        ...config.externals,
        'nodemailer': 'nodemailer',
        'bcryptjs': 'bcryptjs',
        'jsonwebtoken': 'jsonwebtoken',
        'twilio': 'twilio',
        'stripe': 'stripe',
        'child_process': 'child_process',
        'fs': 'fs',
        'dns': 'dns',
        'net': 'net',
        'tls': 'tls',
        'crypto': 'crypto',
        'os': 'os',
        'path': 'path'
      }
      
      // Ignorer complètement les modules problématiques
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "fs": false,
        "dns": false,
        "net": false,
        "tls": false,
        "crypto": false,
        "stream": false,
        "url": false,
        "zlib": false,
        "http": false,
        "https": false,
        "assert": false,
        "os": false,
        "path": false,
        "child_process": false
      }
      
      // Exclure les fichiers qui importent nodemailer côté client
      config.module.rules.push({
        test: /email-server\.ts$/,
        use: 'null-loader'
      })
    }
    
    return config
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
