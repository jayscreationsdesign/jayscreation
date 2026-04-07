import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Activer Turbopack (normalement déjà fait avec Next 16)
  turbopack: {
    root: __dirname,
  },
  
  // Optimisations pour le développement
  swcMinify: true,
  compress: true,
  
  // Désactiver les source maps en dev si pas nécessaire
  productionBrowserSourceMaps: false,
  
  // Optimiser les images
  images: {
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
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
