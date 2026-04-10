import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Activer Turbopack (normalement déjà fait avec Next 16)
  turbopack: {
    root: __dirname,
  },
  
  // Optimisations pour le développement
  compress: true,
  
  // Désactiver les source maps en dev si pas nécessaire
  productionBrowserSourceMaps: false,
  
  // Optimiser les images
  images: {
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rtttjomxnchffqqaafxa.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  },
  
  // Désactiver les checks TypeScript au build (on les fait séparément)
  typescript: { 
    ignoreBuildErrors: false,
    // Ignorer les fichiers de scripts qui ne sont pas dans le build
    tsconfigPath: './tsconfig.json'
  },
  
  // Optimiser le rechargement en dev
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },
  
  // Réduire les logs en dev
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
