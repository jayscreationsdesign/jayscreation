"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { categories } from "@/data/categories";
import { useCartStore } from "@/store/cartStore";

// ─── Types ────────────────────────────────────────────────────────────

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

// ─── Config ───────────────────────────────────────────────────────────

// Labels raccourcis pour tenir sur une ligne
const SHORT_LABELS: Record<string, string> = {
  "papeterie-telechargeable": "PAPETERIE TÉLÉCHARGEABLE",
  "sweet-tables-decoration": "SWEET TABLES & DÉCORATION",
};

// ─── Build nav from categories ────────────────────────────────────────────────

function buildBottomNav(): BottomNavItem[] {
  const nav: BottomNavItem[] = [];

  // Première ligne - catégories principales
  const firstLineCategories = ["sweet-tables-decoration", "anniversaires", "cadeaux-invites", "chocolat", "papeterie-telechargeable", "ramadan-eid-2026", "services"];
  
  for (const cat of categories) {
    if (firstLineCategories.includes(cat.slug)) {
      nav.push({
        label: SHORT_LABELS[cat.slug] ?? cat.name.toUpperCase(),
        href: `/boutique?category=${cat.slug}`,
        categorySlug: cat.slug,
        children: cat.children?.map((child: any) => ({
          name: child.name,
          href: `/boutique?category=${child.slug}`,
          children: child.children?.map((grand: any) => ({
            name: grand.name,
            href: `/boutique?category=${grand.slug}`,
          })),
        })),
      });
    }
  }

  // Deuxième ligne - mariage, baptême et papeterie saisonnière
  const mariageCat = categories.find(cat => cat.slug === "mariage");
  if (mariageCat) {
    nav.push({
      label: "MARIAGE",
      href: `/boutique?category=${mariageCat.slug}`,
      categorySlug: mariageCat.slug,
      children: mariageCat.children?.map((child: any) =>({
        name: child.name,
        href: `/boutique?category=${child.slug}`,
        children: child.children?.map((grand: any) => ({
          name: grand.name,
          href: `/boutique?category=${grand.slug}`,
        })),
      })),
    });
  }

  const baptemeCat = categories.find(cat => cat.slug === "bapteme");
  if (baptemeCat) {
    nav.push({
      label: "BAPTÊME",
      href: `/boutique?category=${baptemeCat.slug}`,
      categorySlug: baptemeCat.slug,
      children: baptemeCat.children?.map((child: any) => ({
        name: child.name,
        href: `/boutique?category=${child.slug}`,
        children: child.children?.map((grand: any) => ({
          name: grand.name,
          href: `/boutique?category=${grand.slug}`,
        })),
      })),
    });
  }

  const papeterieSaisonniereCat = categories.find(cat => cat.slug === "papeterie-saisonniere");
  if (papeterieSaisonniereCat) {
    nav.push({
      label: "PAPETERIE SAISONNIÈRE",
      href: `/boutique?category=${papeterieSaisonniereCat.slug}`,
      categorySlug: papeterieSaisonniereCat.slug,
      children: papeterieSaisonniereCat.children?.map((child: any) => ({
        name: child.name,
        href: `/boutique?category=${child.slug}`,
      })),
    });
  }

  return nav;
}

const bottomNav = buildBottomNav();

const line1Slugs = new Set(["sweet-tables-decoration", "anniversaires", "cadeaux-invites", "chocolat", "papeterie-telechargeable", "ramadan-eid-2026", "services"]);
const bottomNavRow1 = bottomNav.filter(item => line1Slugs.has(item.categorySlug));
const bottomNavRow2 = bottomNav.filter(item => !line1Slugs.has(item.categorySlug));

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
  const [cartHover, setCartHover] = useState(false);
  const [cartDropdownHover, setCartDropdownHover] = useState(false);
  // Active category read client-side to avoid useSearchParams in layout
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Panier states
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantite, 0);
  const sousTotal = items.reduce((acc, item) => acc + item.prix * item.quantite, 0);

  // Debug pour voir les articles dans la console
  useEffect(() => {
    console.log('🛒 Articles dans le Header:', items);
    console.log('🛒 TotalItems:', totalItems);
    console.log('🛒 IDs des articles:', items.map(item => ({ id: item.id, nom: item.nom, quantite: item.quantite })));
  }, [items, totalItems]);

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
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  // Cart hover handlers with extended delay
  const handleCartMouseEnter = () => {
    if (cartCloseTimerRef.current) clearTimeout(cartCloseTimerRef.current);
    setCartHover(true);
    setCartDropdownHover(true);
  };

  const handleCartMouseLeave = () => {
    // Don't close immediately, give user time to move to dropdown
    cartCloseTimerRef.current = setTimeout(() => {
      setCartHover(false);
      setCartDropdownHover(false);
    }, 500); // 500ms delay instead of immediate
  };

  const handleCartDropdownMouseEnter = () => {
    if (cartCloseTimerRef.current) clearTimeout(cartCloseTimerRef.current);
    setCartDropdownHover(true);
  };

  const handleCartDropdownMouseLeave = () => {
    // Only close if not hovering over button or dropdown
    cartCloseTimerRef.current = setTimeout(() => {
      setCartHover(false);
      setCartDropdownHover(false);
    }, 300);
  };

  const toggleMobileItem = (href: string) => {
    setMobileOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  };

  const renderNavItem = (item: BottomNavItem) => {
    const isActive = pathname.startsWith("/boutique") && activeCategory === item.categorySlug;
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
          className={`inline-flex items-center gap-[3px] px-2 py-2 flex-shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-200 ${
            isActive
              ? "text-[#C8A96E] border-b-[1.5px] border-[#C8A96E] pb-[7px]"
              : "text-[#6B6B6B] hover:text-[#C8A96E]"
          }`}
        >
          {item.label}
          {item.children && (
            <ChevronDown
              size={12}
              className={`ml-0.5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </Link>
        {item.children && (
          <div
            onMouseEnter={() => handleMouseEnter(item.href)}
            onMouseLeave={handleMouseLeave}
            className={`absolute left-1/2 -translate-x-1/2 top-full z-50 min-w-[220px] rounded-xl bg-white shadow-xl py-3 transition-all duration-200 ${
              isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
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
                    onClick={() => {
                      if (child.children?.length) {
                        const categorySlug = child.href.split('category=')[1];
                        const event = new CustomEvent('openSidebarCategory', { detail: { categorySlug, force: true } });
                        window.dispatchEvent(event);
                      }
                    }}
                  >
                    {child.name}
                    {child.children?.length ? <ChevronDown size={12} className="-rotate-90 text-[#C8A96E]" /> : null}
                  </Link>
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
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* ══════════════════════════════════════════
          BARRE SUPÉRIEURE — logo · nav · panier
      ══════════════════════════════════════════ */}
      <div className="border-b border-border bg-[#FAF7F2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo/LOGO (2).png"
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
            <div
              className="relative"
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <Link
                href="/panier"
                className="relative inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Panier</span>
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">
                  {totalItems}
                </span>
              </Link>

              {/* Mini panier dropdown */}
              {(cartHover || cartDropdownHover) && totalItems > 0 && (
                <div 
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4"
                  onMouseEnter={handleCartDropdownMouseEnter}
                  onMouseLeave={handleCartDropdownMouseLeave}
                >
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Mon panier ({totalItems} article{totalItems > 1 ? "s" : ""})
                  </p>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <img
                          src={item.image || "/images/products/placeholder.svg"}
                          alt={item.nom}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Link
                            href={item.slug ? `/produit/${item.slug}` : '#'}
                            className="text-xs font-medium text-gray-900 truncate hover:text-blue-600 transition-colors"
                            onClick={() => {
                              console.log('🛒 Clic sur article:', item.nom); // Debug
                              setCartHover(false);
                              setCartDropdownHover(false);
                            }}
                          >
                            {item.nom}
                          </Link>
                          {item.theme && (
                            <p className="text-xs text-gray-600 capitalize">
                              {item.theme}
                            </p>
                          )}
                          <p className="text-xs text-gray-600">
                            x{item.quantite} · {(item.prix * item.quantite).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <div className="flex justify-between text-sm font-bold mb-3">
                      <span>Total</span>
                      <span className="text-gray-900">{sousTotal.toFixed(2)} €</span>
                    </div>
                    <Link
                      href="/panier"
                      className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-3 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                    >
                      Voir mon panier
                    </Link>
                  </div>
                </div>
              )}
            </div>

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

      {/* ════════════════════════════════════════
          BARRE CATÉGORIES — desktop uniquement
      ══════════════════════════════════════════ */}
      <nav
        className="hidden lg:block bg-white border-b border-[#E8E4DF] py-1.5"
        aria-label="Menu catégories"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Ligne 1 — Catégories produits */}
          <div className="flex items-center justify-center gap-4">
            {bottomNavRow1.map(renderNavItem)}
          </div>
          {/* Ligne 2 — Catégories événements */}
          <div className="flex items-center justify-center gap-8 mt-1 pt-1 border-t border-[#E8E4DF]/50">
            {bottomNavRow2.map(renderNavItem)}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E4DF] bg-white">
          <nav
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
