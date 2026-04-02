import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rtttjomxnchffqqaafxa.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
