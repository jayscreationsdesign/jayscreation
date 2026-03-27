import Link from "next/link";
import { Camera, Mail, Music2, MapPin, Phone, Clock, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto w-screen bg-gradient-to-br from-[#FAF7F2] to-[#F5F0EB] border-t border-[#E8E4DF]">
      {/* Section principale - Pleine largeur */}
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 lg:grid-cols-5">
            
            {/* Colonne 1 : Brand - Plus large */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="font-heading text-lg font-bold text-accent">J</span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Jay&apos;s Creations Design
                  </h3>
                  <p className="text-xs text-accent font-medium">Pour Sublimer Vos Événements</p>
                </div>
              </Link>
              
              {/* Contact info */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <span>15 Quai d&apos;Asnières, 92390 Villeneuve-la-Garenne</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <a href="tel:+33749072861" className="hover:text-foreground transition-colors font-medium">
                    07 49 07 28 61
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <a href="mailto:jayscreations.d@gmail.com" className="hover:text-foreground transition-colors font-medium">
                    jayscreations.d@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">Lun – Ven : 7h – 19h</div>
                    <div>Week-end : 10h – 17h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne 2 : Navigation */}
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-[0.1em] mb-4">
                Navigation
              </h4>
              <nav className="space-y-2">
                <Link href="/" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  Accueil
                </Link>
                <Link href="/boutique" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  Boutique
                </Link>
                <Link href="/contact" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
                <Link href="/a-propos" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  À propos
                </Link>
                <Link href="/mon-compte" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  Mon Compte
                </Link>
              </nav>
            </div>

            {/* Colonne 3 : Services */}
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-[0.1em] mb-4">
                Services
              </h4>
              <nav className="space-y-2">
                <Link href="/boutique?category=papeterie-sweet-tables" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  Papeterie Personnalisée
                </Link>
                <Link href="/boutique?category=flocage" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  Flocages
                </Link>
                <Link href="/boutique?category=cadeaux-invites" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  Cadeaux Invités
                </Link>
                <Link href="/boutique?category=chocolat" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  Chocolats Personnalisés
                </Link>
              </nav>
            </div>

            {/* Colonne 4 : Newsletter & Réseaux */}
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-[0.1em] mb-4">
                Restons Connectés
              </h4>
              
              <p className="text-sm leading-6 text-muted-foreground mb-4">
                Abonnez-vous pour recevoir les nouveautés, offres exclusives et inspirations.
              </p>
              
              <form className="space-y-3">
                <input
                  type="email"
                  name="newsletter"
                  placeholder="Votre adresse email"
                  className="w-full h-11 rounded-full border border-[#E8E4DF] bg-white/80 backdrop-blur px-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 transition-all"
                />
                <button
                  type="button"
                  className="w-full h-11 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  S&apos;abonner
                </button>
              </form>

              <div className="mt-6">
                <h5 className="font-heading text-xs font-bold text-foreground uppercase tracking-[0.1em] mb-3">
                  Suivez-nous
                </h5>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/jays_creations_design/"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-white/80 backdrop-blur border border-[#E8E4DF] flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Camera className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@jayscreationsdesign"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full bg-white/80 backdrop-blur border border-[#E8E4DF] flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all transform hover:scale-110"
                    aria-label="TikTok"
                  >
                    <Music2 className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar - Pleine largeur avec fond */}
      <div className="w-full bg-[#F5F0EB]/50 border-t border-[#E8E4DF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              © 2026 Jay&apos;s Creations Design. Tous droits réservés.
              <span className="text-accent">Made with</span>
              <Heart className="h-3 w-3 text-accent fill-accent" />
              <span className="text-accent">en France</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <Link href="/politique-de-confidentialite" className="hover:text-accent transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/cgv" className="hover:text-accent transition-colors">
                CGV
              </Link>
              <Link href="/mentions-legales" className="hover:text-accent transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
