import Link from "next/link";
import { Camera, Mail, Music2, MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Colonne 1 : Identité + Contact */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-heading text-lg tracking-wide text-foreground">
                Jay&apos;s Creations Design
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Pour Sublimer Vos Événements — papeterie, cadeaux et objets personnalisés sur mesure.
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span>15 Quai d&apos;Asnières<br />92390 Villeneuve-la-Garenne</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+33749072861" className="hover:text-foreground transition-colors">
                  07 49 07 28 61
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:jayscreations.d@gmail.com" className="hover:text-foreground transition-colors">
                  jayscreations.d@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <div>
                  <div>Lun – Ven : 7h – 19h</div>
                  <div>Week-end : 10h – 17h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne 2 : Liens */}
          <div>
            <div className="text-sm font-medium text-foreground">Navigation</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
              <Link href="/boutique" className="hover:text-foreground transition-colors">Produits</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <Link href="/a-propos" className="hover:text-foreground transition-colors">À propos</Link>
              <Link href="/mon-compte" className="hover:text-foreground transition-colors">Mon Compte</Link>
            </div>
          </div>

          {/* Colonne 3 : Catégories */}
          <div>
            <div className="text-sm font-medium text-foreground">Catégories</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/boutique?category=papeterie-personnalisee" className="hover:text-foreground transition-colors">
                Papeterie Personnalisée
              </Link>
              <Link href="/boutique?category=flyers-cartes-visite" className="hover:text-foreground transition-colors">
                Flyers & Cartes de visite
              </Link>
              <Link href="/boutique?category=flocages" className="hover:text-foreground transition-colors">
                Flocages
              </Link>
              <Link href="/boutique?category=objets-cadeaux-personnalises" className="hover:text-foreground transition-colors">
                Objets & Cadeaux Personnalisés
              </Link>
            </div>
          </div>

          {/* Colonne 4 : Newsletter + Réseaux */}
          <div>
            <div className="text-sm font-medium text-foreground">Newsletter</div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Nouvelles collections, offres et inspirations. Pas de spam.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                name="newsletter"
                placeholder="vous@exemple.fr"
                className="h-10 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              />
              <button
                type="button"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-2xl bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                OK
              </button>
            </form>

            <div className="mt-6 text-sm font-medium text-foreground">Réseaux sociaux</div>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://www.instagram.com/jays_creations_design/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                aria-label="Instagram"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@jayscreationsdesign"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                aria-label="TikTok"
              >
                <Music2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© 2026 Jay&apos;s Creations Design. Tous droits réservés.</div>
          <div className="flex items-center gap-6">
            <Link href="/politique-de-confidentialite" className="hover:text-foreground transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/cgv" className="hover:text-foreground transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
