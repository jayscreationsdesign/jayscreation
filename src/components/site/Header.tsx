"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { categories } from "@/data/categories";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownChild {
  name: string;
  href: string;
  children?: Array<{ name: string; href: string }>;
}

interface BottomNavItem {
  label: string;
  href: string;
  categorySlug: string;
  children?: DropdownChild[];
}

// ─── Config ───────────────────────────────────────────────────────────────────

// Catégories à exclure de la barre navigation
const SKIP_SLUGS = new Set(["formation", "divers-objets-cadeaux"]);

// Labels raccourcis pour tenir sur une ligne
const SHORT_LABELS: Record<string, string> = {
  "divers-objets-cadeaux": "OBJETS & CADEAUX",
  "papeterie-telechargeable": "PAPETERIE TÉLÉCH.",
};

// ─── Build nav from categories ────────────────────────────────────────────────

function buildBottomNav(): BottomNavItem[] {
  const nav: BottomNavItem[] = [];

  for (const cat of categories) {
    if (SKIP_SLUGS.has(cat.slug)) continue;
    nav.push({
      label: SHORT_LABELS[cat.slug] ?? cat.name.toUpperCase(),
      href: `/boutique?category=${cat.slug}`,
      categorySlug: cat.slug,
      children: cat.children?.map((child) => ({
        name: child.name,
        href: `/boutique?category=${child.slug}`,
        children: child.children?.map((grand) => ({
          name: grand.name,
          href: `/boutique?category=${grand.slug}`,
        })),
      })),
    });
  }

  return nav;
}

const bottomNav = buildBottomNav();

const topNavLinks = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenItems, setMobileOpenItems] = useState<Set<string>>(new Set());
  // Active category read client-side to avoid useSearchParams in layout
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Read active category from URL (client-side only, no useSearchParams)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveCategory(params.get("category"));
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Dropdown open/close with a small delay on leave to avoid flickering
  const handleMouseEnter = (href: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenDropdown(href);
  };
  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 80);
  };

  const toggleMobileItem = (href: string) => {
    setMobileOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* ════════════════════════════════════════════
          BARRE SUPÉRIEURE — logo · nav · panier
      ════════════════════════════════════════════ */}
      <div className="border-b border-border bg-[#FAF7F2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo-jays.png"
              alt="Jay's Creations Design"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-heading text-xl font-bold tracking-wide text-foreground">
                Jay&apos;s Creations Design
              </div>
              <div className="text-xs text-muted-foreground">
                Pour Sublimer Vos Événements
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-6 md:flex">
            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-accent ${
                  pathname === link.href ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Panier */}
            <Link
              href="/panier"
              className="relative inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Panier</span>
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">
                0
              </span>
            </Link>

            {/* Hamburger — mobile uniquement */}
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted transition-colors"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          BARRE CATÉGORIES — desktop uniquement
      ════════════════════════════════════════════ */}
      <nav
        className="hidden lg:block bg-white border-b border-[#E8E4DF]"
        aria-label="Menu catégories"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch justify-center">
            {bottomNav.map((item) => {
              const isActive =
                pathname.startsWith("/boutique") &&
                activeCategory === item.categorySlug;
              const isOpen = openDropdown === item.href;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.href)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`
                      inline-flex items-center gap-[3px] px-4 py-3
                      text-xs font-medium uppercase tracking-[0.15em] whitespace-nowrap
                      transition-colors duration-300
                      ${
                        isActive
                          ? "text-[#C8A96E] border-b-[1.5px] border-[#C8A96E] pb-[11px]"
                          : "text-[#6B6B6B] hover:text-[#C8A96E]"
                      }
                    `}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={12}
                        className={`ml-0.5 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <div
                      onMouseEnter={() => handleMouseEnter(item.href)}
                      onMouseLeave={handleMouseLeave}
                      className={`
                        absolute left-1/2 -translate-x-1/2 top-full z-50
                        min-w-[220px] rounded-xl bg-white shadow-xl py-3
                        transition-all duration-200
                        ${
                          isOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }
                      `}
                    >
                      {/* Petit triangle décoratif */}
                      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-[#E8E4DF]" />

                      <div className="relative">
                        {item.children.map((child) => (
                          <div
                            key={child.href}
                            className="relative"
                            onMouseEnter={() => child.children?.length ? setOpenSubMenu(child.href) : setOpenSubMenu(null)}
                            onMouseLeave={() => setOpenSubMenu(null)}
                          >
                            <Link
                              href={child.href}
                              className="flex items-center justify-between px-5 py-2.5 text-sm font-normal text-[#2C2C2C] hover:bg-[#FAF7F2] hover:text-[#C8A96E] transition-colors duration-150"
                            >
                              {child.name}
                              {child.children?.length ? <ChevronDown size={12} className="-rotate-90 text-[#C8A96E]" /> : null}
                            </Link>

                            {/* Sous-menu niveau 3 */}
                            {child.children?.length && openSubMenu === child.href && (
                              <div className="absolute left-full top-0 min-w-[180px] rounded-xl bg-white shadow-xl py-3 z-50">
                                <div className="absolute -left-[6px] top-3 w-3 h-3 rotate-45 bg-white border-l border-t border-[#E8E4DF]" />
                                {child.children.map((grand) => (
                                  <Link
                                    key={grand.href}
                                    href={grand.href}
                                    className="block px-5 py-2.5 text-sm font-normal text-[#2C2C2C] hover:bg-[#FAF7F2] hover:text-[#C8A96E] transition-colors duration-150"
                                  >
                                    {grand.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          MENU MOBILE — hamburger + accordéon
      ════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8E4DF] max-h-[80vh] overflow-y-auto">
          <nav
            className="mx-auto max-w-7xl px-4 py-3"
            aria-label="Menu mobile"
          >
            {/* Liens principaux */}
            <div className="space-y-0.5 pb-3 border-b border-[#E8E4DF]">
              {topNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    pathname === link.href
                      ? "text-[#C8A96E]"
                      : "text-[#2C2C2C] hover:text-[#C8A96E] hover:bg-[#FAF7F2]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Catégories en accordéon */}
            <div className="space-y-0.5 pt-3">
              {bottomNav.map((item) =>
                item.children ? (
                  <div key={item.href}>
                    <button
                      className="flex w-full items-center justify-between px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[#6B6B6B] hover:text-[#C8A96E] rounded-lg hover:bg-[#FAF7F2] transition-colors"
                      onClick={() => toggleMobileItem(item.href)}
                      aria-expanded={mobileOpenItems.has(item.href)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`shrink-0 transition-transform duration-200 ${
                          mobileOpenItems.has(item.href) ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileOpenItems.has(item.href) && (
                      <div className="pl-4 pb-1 space-y-0.5">
                        {item.children.map((child) => (
                          <div key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-[#6B6B6B] hover:text-[#C8A96E] transition-colors rounded-lg hover:bg-[#FAF7F2]"
                            >
                              {child.name}
                            </Link>
                            {child.children?.map((grand) => (
                              <Link
                                key={grand.href}
                                href={grand.href}
                                className="block pl-8 py-1.5 text-xs text-[#6B6B6B] hover:text-[#C8A96E] transition-colors rounded-lg hover:bg-[#FAF7F2]"
                              >
                                ↳ {grand.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[#6B6B6B] hover:text-[#C8A96E] rounded-lg hover:bg-[#FAF7F2] transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
