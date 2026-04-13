"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, ChevronDown, Menu, X, User, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { categories } from "@/data/categories";
import { useCartStore } from "@/store/cartStore";
import { getCurrentUser, getUserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

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
  "etiquettes-personnalisees": "ÉTIQUETTES PERSONNALISÉES",
};

// ─── Build nav from categories ────────────────────────────────────────────────

function buildBottomNav(): BottomNavItem[] {
  const nav: BottomNavItem[] = [];

  // Première ligne - catégories principales
  const firstLineCategories = ["sweet-tables-decoration", "anniversaires", "cadeaux-invites", "toniebox", "chocolat", "papeterie-telechargeable", "etiquettes-personnalisees", "ramadan-eid-2027", "services"];
  
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

const line1Slugs = new Set(["sweet-tables-decoration", "anniversaires", "cadeaux-invites", "chocolat", "papeterie-telechargeable", "ramadan-eid-2027", "services"]);
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
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Active category read client-side to avoid useSearchParams in layout
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Panier states
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.count);
  const sousTotal = useCartStore((state) => state.total);
  const [hydrated, setHydrated] = useState(false);

  // Debug pour voir l'état du panier
  useEffect(() => {
    console.log('🛒 Header - Panier items:', items);
    console.log('🛒 Header - Total items:', totalItems);
    console.log('🛒 Header - Sous-total:', sousTotal);
    console.log('🛒 Header - Badge doit afficher:', totalItems);
  }, [items, totalItems, sousTotal]);

  // Forcer la mise à jour du badge
  useEffect(() => {
    const itemCount = items.reduce((acc, item) => acc + item.quantite, 0);
    console.log('🛒 Header - Calcul direct:', itemCount);
    if (itemCount !== totalItems) {
      console.log('🛒 Header - Décalage détecté, forcer mise à jour');
    }
  }, [items, totalItems]);

  // Hydrater le store côté client
  useEffect(() => {
    // Forcer l'hydratation du store
    const hasHydrated = useCartStore.persist.hasHydrated();
    if (!hasHydrated) {
      useCartStore.persist.rehydrate();
    }
    setHydrated(true);
  }, []);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch {
        setUser(null)
      }
    }
    checkUser()
  }, [])

  // Surveiller les changements d'authentification (connexion/déconnexion)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          try {
            const profile = await getUserProfile(session.user.id);
            setUserProfile(profile);
          } catch (profileError) {
            console.error('Erreur récupération profil après connexion:', profileError);
            setUserProfile(null);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isSearchOpen && target && !target.closest('.search-panel') && !target.closest('[data-search-trigger]')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Rediriger vers la page de recherche avec le query
      window.location.href = `/boutique?search=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      // Focus automatique sur l'input après ouverture
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    // Fermer seulement si l'input est vide
    if (!searchQuery.trim()) {
      setTimeout(() => setIsSearchOpen(false), 150);
    }
  };

  // Handle key down
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (searchQuery.trim()) {
        // Escape avec du texte : vider le champ mais rester ouvert
        setSearchQuery("");
        inputRef.current?.focus();
      } else {
        // Escape sans texte : fermer
        setIsSearchOpen(false);
      }
    }
  };

  // Dropdown open/close with a small delay on leave to avoid flickering
  const handleMouseEnter = (href: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenDropdown(href);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 800);
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
              ? "text-[#2C1A0E] border-b-[1.5px] border-[#2C1A0E] pb-[7px]"
              : "text-[#2C1A0E] hover:text-[#6b3410]"
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
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.href)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full z-50 min-w-[220px] rounded-xl bg-[#FAF7F2] shadow-xl py-3 transition-all duration-200 border border-[#8B4513] ${
                isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
            <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#FAF7F2] border-l border-t border-[#8B4513]" />
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
                    className="flex items-center justify-between px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2"
                    onClick={() => {
                      if (child.children?.length) {
                        const categorySlug = child.href.split('category=')[1];
                        const event = new CustomEvent('openSidebarCategory', { detail: { categorySlug, force: true } });
                        window.dispatchEvent(event);
                      }
                    }}
                  >
                    {child.name}
                    {child.children?.length ? <ChevronDown size={12} className="-rotate-90 text-[#2C1A0E]" /> : null}
                  </Link>
                  {child.children?.length && openSubMenu === child.href && (
                    <div className="absolute left-full top-0 min-w-[180px] rounded-xl bg-[#FAF7F2] shadow-xl py-3 z-50 border border-[#8B4513]">
                      <div className="absolute -left-[6px] top-3 w-3 h-3 rotate-45 bg-[#FAF7F2] border-l border-t border-[#8B4513]" />
                      {child.children.map((grand) => (
                        <Link
                          key={grand.href}
                          href={grand.href}
                          className="block px-5 py-2.5 text-sm font-normal text-[#2C1A0E] hover:bg-[#6b3410] hover:text-[#D4A574] transition-all duration-500 rounded-lg mx-2"
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt="Jay's Creations Design"
              width={32}
              height={32}
              className="object-contain"
              priority
              style={{ width: 'auto', height: '48px' }}
            />
            <div className="leading-tight">
              <div className="font-heading text-lg font-bold tracking-wide text-foreground">
                Jay&apos;s Creations Design
              </div>
              <div className="text-xs text-muted-foreground">
                Pour Sublimer Vos Événements
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="flex items-center gap-6">
            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#6b3410] ${
                  pathname === link.href ? "text-[#2C1A0E]" : "text-[#2C1A0E]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-end gap-2">
            {/* Première ligne : Recherche, Connexion et Panier - optimisé pour mobile */}
            <div className="flex items-center gap-1">
              {/* Recherche - taille réduite sur mobile */}
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={handleSearchClick}
                  data-search-trigger
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8B4513] text-white shadow-sm hover:bg-[#8B4513]/90 hover:text-[#D4A574] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B4513] transition-colors"
                  aria-label={isSearchOpen ? "Fermer la recherche" : "Ouvrir la recherche"}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {/* Lien Mon Compte - version mobile ultra compacte */}
              <Link
                href={user ? "/compte" : "/connexion"}
                className="flex items-center justify-center rounded-full border border-border bg-background p-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <User className="h-4 w-4" />
                <span className="ml-1">
                  {user ? (
                    userProfile?.prenom ? 
                      userProfile.prenom :
                      user.user_metadata?.prenom || 
                      user.email?.split('@')[0]
                  ) : 'Connexion'}
                </span>
              </Link>

              {/* Panier - version mobile compacte */}
              <div
                className="relative"
                onMouseEnter={handleCartMouseEnter}
                onMouseLeave={handleCartMouseLeave}
              >
                <Link
                  href="/panier"
                  className="relative inline-flex items-center justify-center rounded-full border border-border bg-background p-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <ShoppingBag className="h-4 w-4 text-[#8B4513]" />
                  {items.reduce((acc, item) => acc + item.quantite, 0) > 0 && (
                    <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#8B4513] text-sm font-bold text-white border-2 border-white shadow-lg">
                      {items.reduce((acc, item) => acc + item.quantite, 0)}
                    </span>
                  )}
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
                            src={item.image || "/images/products/placeholder.png"}
                            alt={item.nom}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              href={item.slug ? `/produit/${item.slug}` : '#'}
                              className="text-xs font-medium text-gray-900 truncate hover:text-[#6b3410] transition-colors"
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
                        className="block w-full bg-[#8B4513] text-white text-center py-3 rounded-lg text-sm font-medium hover:bg-[#A0522D] transition-colors duration-200 shadow-sm"
                      >
                        Voir mon panier
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          BARRE CATÉGORIES — desktop uniquement
      ══════════════════════════════════════════ */}
      <nav
className="block bg-white border-b border-[#8B4513] py-1.5"
        aria-label="Menu catégories"
      >
        <div className="mx-auto max-w-7xl px-8">
          {/* Ligne 1 — Catégories produits */}
          <div className="flex items-center justify-center gap-4">
            {bottomNavRow1.map(renderNavItem)}
          </div>
          {/* Ligne 2 — Catégories événements */}
          <div className="flex items-center justify-center gap-8 mt-1 pt-1 border-t border-[#8B4513]/50">
            {bottomNavRow2.map(renderNavItem)}
          </div>
        </div>
      </nav>

      {/* Panneau de recherche premium sous le header */}
      <div
        className={`search-panel absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-sm z-40 transition-all duration-300 ease-out ${
          isSearchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher un produit"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="w-full h-12 pl-5 pr-14 bg-white border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] shadow-sm transition-all duration-200"
                autoFocus
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#8B4513] bg-white">
          <nav
            aria-label="Menu mobile"
          >
            {/* Liens principaux */}
            <div className="space-y-0.5 pb-3 border-b border-[#8B4513]">
              {topNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors hover:text-[#6b3410] ${
                    pathname === link.href
                      ? "text-[#2C1A0E]"
                      : "text-[#2C1A0E] hover:bg-[#FAF7F2]"
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
                      className="flex w-full items-center justify-between px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[#2C1A0E] hover:text-[#6b3410] rounded-lg hover:bg-[#FAF7F2] transition-colors"
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
                              className="block px-4 py-2 text-sm text-[#2C1A0E] hover:text-[#6b3410] transition-colors rounded-lg hover:bg-[#FAF7F2]"
                            >
                              {child.name}
                            </Link>
                            {child.children?.map((grand) => (
                              <Link
                                key={grand.href}
                                href={grand.href}
                                className="block pl-8 py-1.5 text-xs text-[#2C1A0E] hover:text-[#6b3410] transition-colors rounded-lg hover:bg-[#FAF7F2]"
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
                    className="block px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[#2C1A0E] hover:text-[#6b3410] rounded-lg hover:bg-[#FAF7F2] transition-colors"
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
