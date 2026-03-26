import Link from "next/link";
import { Camera, Mail, Music2 } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="font-heading text-lg tracking-wide text-foreground">
                JaysCreation
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Papeterie premium, cadeaux et supports personnalises. Un style
              elegant, artisanal, epure.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-accent" />
              <span className="font-medium text-foreground">
                contact@jayscreation.fr
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-foreground">Liens</div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground">
                  Accueil
                </Link>
                <Link href="/boutique" className="hover:text-foreground">
                  Boutique
                </Link>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
                <Link href="/a-propos" className="hover:text-foreground">
                  A propos
                </Link>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-foreground">
                Categories
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <Link
                  href="/boutique?cat=papeterie"
                  className="hover:text-foreground"
                >
                  Papeterie Personnalisee
                </Link>
                <Link
                  href="/boutique?cat=flyers"
                  className="hover:text-foreground"
                >
                  Flyers & Cartes de visite
                </Link>
                <Link
                  href="/boutique?cat=flocages"
                  className="hover:text-foreground"
                >
                  Flocages
                </Link>
                <Link
                  href="/boutique?cat=objets-cadeaux"
                  className="hover:text-foreground"
                >
                  Objets & Cadeaux
                </Link>
              </div>
            </div>
          </div>

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
            <div className="mt-6 text-sm font-medium text-foreground">Reseaux</div>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://instagram.com/jayscreation"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                aria-label="Instagram"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com/@jayscreation"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                aria-label="TikTok"
              >
                <Music2 className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              <div className="font-medium text-foreground">Lu - Ve</div>
              <div>9h - 18h</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {year} JaysCreation. Tous droits reserves.</div>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-foreground">
              Mentions legales
            </Link>
            <Link href="/confidentialite" className="hover:text-foreground">
              Confidentialite
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

