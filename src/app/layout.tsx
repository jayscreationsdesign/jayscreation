import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/mobile-only-fixes.css";

import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jay's Créations Design",
    template: "%s | Jay's Créations Design",
  },
  description:
    "Site e-commerce premium de papeterie événementielle : faire-part, invitations, menus et marque-places.",
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
        <div className="w-full max-w-none">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
        {/* ChatWidget - only show on non-admin pages */}
        <ChatWidget />
      </body>
    </html>
  );
}

