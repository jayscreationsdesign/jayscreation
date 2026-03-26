import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "A propos" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="font-heading text-xl tracking-wide text-foreground">
              JaysCreation
            </div>
            <div className="text-xs text-muted-foreground">
              Papeterie premium & personnalisee
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/panier"
          className="relative inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Panier</span>
          <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
            0
          </span>
        </Link>
      </div>
    </header>
  );
}

