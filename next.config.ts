import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Activer Turbopack (normalement déjà fait avec Next 16)
  turbopack: {
    root: __dirname,
  },
  
  // Désactiver les source maps en dev si pas nécessaire
  productionBrowserSourceMaps: false,
  
  // Optimiser les images
  images: {
    minimumCacheTTL: 60,
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
};

export default nextConfig;
