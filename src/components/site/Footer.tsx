"use client";

import Link from "next/link";
import { Camera, Mail, Music2, MapPin, Phone, Clock, Heart } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setMessage(data.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setMessage("Erreur serveur");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className="mt-auto w-screen bg-[#2C1A0E] border-t border-[#E8E4DF]">
      {/* Section principale - Pleine largeur */}
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 lg:grid-cols-5">
            
            {/* Colonne 1 : Brand - Plus large */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#8B4513] flex items-center justify-center">
                  <span className="font-heading text-lg font-bold text-white">J</span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Jay&apos;s Creations Design
                  </h3>
                  <p className="text-xs text-[#D4A574] font-medium">Pour Sublimer Vos Événements</p>
                </div>
              </Link>
              
              {/* Contact info */}
              <div className="mt-2 space-y-3">
                <div className="flex items-center gap-3 text-sm text-white">
                  <div className="h-8 w-8 rounded-full bg-[#8B4513] flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span>15 Quai d&apos;Asnières, 92390 Villeneuve-la-Garenne</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white">
                  <div className="h-8 w-8 rounded-full bg-[#8B4513] flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <a href="tel:+33763920823" className="hover:text-[#6b3410] transition-colors font-medium">
                    +33 7 63 92 08 23
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-white">
                  <div className="h-8 w-8 rounded-full bg-[#8B4513] flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <a href="mailto:contact@jayscreationsdesign.fr" className="hover:text-[#6b3410] transition-colors font-medium">
                    contact@jayscreationsdesign.fr
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-white">
                  <div className="h-8 w-8 rounded-full bg-[#8B4513] flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Lun. – Ven. : 7h – 19h</div>
                    <div>Week-end : 10h – 17h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne 2 : Navigation - masque sur mobile */}
            <div className="hidden md:block">
              <h4 className="font-heading text-sm font-bold text-[#D4A574] uppercase tracking-[0.1em] mb-4">
                Navigation
              </h4>
              <nav className="space-y-2">
                <Link href="/a-propos" className="block text-sm text-white hover:text-[#6b3410] transition-colors">
                  À propos
                </Link>
                <Link href="/contact" className="block text-sm text-white hover:text-[#6b3410] transition-colors">
                  Contact
                </Link>
                <Link href="/panier" className="block text-sm text-white hover:text-[#6b3410] transition-colors">
                  Panier
                </Link>
                <Link href="/commande" className="block text-sm text-white hover:text-[#6b3410] transition-colors">
                  Commande
                </Link>
              </nav>
            </div>

            {/* Colonne 3 : Services - masque sur mobile */}
            <div className="hidden md:block">
              <h4 className="font-heading text-sm font-bold text-[#D4A574] uppercase tracking-[0.1em] mb-4">
                Services
              </h4>
              <nav className="space-y-2">
                <Link href="/boutique?category=papeterie-sweet-tables" className="block text-sm text-white hover:text-[#6b3410] transition-colors">
                  Papeterie Personnalisée
                </Link>
                <Link href="/boutique?category=flocage" className="block text-sm text-white hover:text-[#6b3410] transition-colors">
                  Flocages
                </Link>
                <Link href="/boutique?category=cadeaux-invites" className="block text-sm text-white hover:text-[#6b3410] transition-colors">
                  Cadeaux Invités
                </Link>
                <Link href="/boutique?category=chocolat" className="block text-sm text-white hover:text-[#6b3410] transition-colors">
                  Chocolats Personnalisés
                </Link>
              </nav>
            </div>

            {/* Colonne 4 : Newsletter & Réseaux */}
            <div>
              <h4 className="font-heading text-sm font-bold text-[#D4A574] uppercase tracking-[0.1em] mb-4">
                Restons Connectés
              </h4>
              
              <p className="text-sm leading-6 text-white mb-4">
                Abonnez-vous pour recevoir les nouveautés, offres exclusives et inspirations.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  name="newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className="w-full h-11 rounded-full border border-[#E8E4DF] bg-white/80 backdrop-blur px-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-full bg-[#8B4513] text-white font-medium text-sm hover:bg-[#6B3410] hover:text-[#D4A574] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Inscription...' : 'S\'abonner'}
                </button>
                {message && (
                  <p className={`text-xs mt-2 ${message.includes('Merci') || message.includes('déjà') ? 'text-green-300' : 'text-red-300'}`}>
                    {message}
                  </p>
                )}
              </form>

              <div className="mt-6">
                <h3 className="font-heading text-sm font-bold text-[#D4A574] uppercase tracking-[0.1em] mb-3">
                  Suivez-nous
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/jays_creations_design/"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-[#8B4513] border border-[#8B4513] flex items-center justify-center text-white hover:bg-[#6B3410] hover:text-[#D4A574] transition-all transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Camera className="h-4 w-4 text-white" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@jayscreationsdesign"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-[#8B4513] border border-[#8B4513] flex items-center justify-center text-white hover:bg-[#6B3410] hover:text-[#D4A574] transition-all transform hover:scale-110"
                    aria-label="TikTok"
                  >
                    <Music2 className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar - Pleine largeur avec fond */}
      <div className="w-full bg-[#2C1A0E] border-t border-[#E8E4DF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white flex items-center gap-1">
              © 2026 Jay&apos;s Creations Design. Tous droits réservés.
              <span className="text-[#D4A574]">Fabriqué en France</span>
              <span className="text-[#D4A574]">🇫🇷</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-white">
              <Link href="/politique-de-confidentialite" className="hover:text-[#6b3410] transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/cgv" className="hover:text-[#6b3410] transition-colors">
                CGV
              </Link>
              <Link href="/mentions-legales" className="hover:text-[#6b3410] transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
