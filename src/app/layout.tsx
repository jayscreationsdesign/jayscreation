import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/mobile-only-fixes.css";
import { Suspense } from "react";

import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import ChatWrapper from "@/components/chat/ChatWrapper";
import TopBanner from "@/components/site/TopBanner";
import WelcomePopup from "@/components/site/WelcomePopup";
import { PostHogProvider } from "@/providers/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jayscreationsdesign.fr'),
  title: {
    default: "Jay's Creations Design - Papeterie & Cadeaux Personnalisés",
    template: "%s | Jay's Creations Design"
  },
  description: "Créations artisanales personnalisées pour vos événements : mariage, baptême, anniversaire. Papeterie, sublimation, chocolat, sweet tables.",
  keywords: ["papeterie personnalisée", "cadeaux personnalisés", "mariage", "baptême", "sweet table", "sublimation"],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.jayscreationsdesign.fr',
    siteName: "Jay's Creations Design",
    images: [{ url: '/images/logo/logo.png', width: 1200, height: 630 }]
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <div className="w-full max-w-none">
            <TopBanner />
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
          {/* ChatWidget - only show on non-admin pages */}
          <ChatWrapper />
          <WelcomePopup />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}

