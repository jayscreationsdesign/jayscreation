"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCartStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantite, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = (e.target as HTMLFormElement).search.value;
    if (searchQuery.trim()) {
      window.location.href = `/boutique?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${
      scrolled ? "shadow-md" : ""
    }`}>
      <div className="border-b border-border bg-[#FAF7F2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt="Jay's Creations Design"
              width={32}
              height={32}
              className="object-contain"
              priority
              style={{ width: 'auto', height: '40px' }}
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-heading text-base sm:text-lg font-bold tracking-wide text-foreground">
                Jay&apos;s Creations Design
              </div>
              <div className="text-xs text-muted-foreground">
                Pour Sublimer Vos Événements
              </div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/boutique"
              className={`text-sm font-medium transition-colors duration-200 hover:text-[#6b3410] ${
                pathname === "/boutique" ? "text-[#2C1A0E]" : "text-[#2C1A0E]"
              }`}
            >
              Boutique
            </Link>
            <Link
              href="/categories"
              className={`text-sm font-medium transition-colors duration-200 hover:text-[#6b3410] ${
                pathname === "/categories" ? "text-[#2C1A0E]" : "text-[#2C1A0E]"
              }`}
            >
              Catégories
            </Link>
            <Link
              href="/a-propos"
              className={`text-sm font-medium transition-colors duration-200 hover:text-[#6b3410] ${
                pathname === "/a-propos" ? "text-[#2C1A0E]" : "text-[#2C1A0E]"
              }`}
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors duration-200 hover:text-[#6b3410] ${
                pathname === "/contact" ? "text-[#2C1A0E]" : "text-[#2C1A0E]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Recherche */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Compte */}
            <Link
              href="/compte"
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Mon compte"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Panier */}
            <Link
              href="/panier"
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Panier"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#8B4513] text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Menu mobile */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background p-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              onClick={toggleMobileMenu}
              aria-label="Menu"
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

      {/* Panneau de recherche */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-sm z-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                name="search"
                placeholder="Rechercher un produit"
                className="w-full h-12 pl-5 pr-14 bg-white border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]"
                autoFocus
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Drawer latéral */}
          <div className="fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl z-50 lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="p-4" aria-label="Menu mobile">
              <div className="space-y-2">
                <Link
                  href="/boutique"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                    pathname === "/boutique"
                      ? "text-[#2C1A0E] bg-[#FAF7F2]"
                      : "text-[#2C1A0E] hover:bg-[#FAF7F2]"
                  }`}
                >
                  Boutique
                </Link>
                <Link
                  href="/categories"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                    pathname === "/categories"
                      ? "text-[#2C1A0E] bg-[#FAF7F2]"
                      : "text-[#2C1A0E] hover:bg-[#FAF7F2]"
                  }`}
                >
                  Catégories
                </Link>
                <Link
                  href="/a-propos"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                    pathname === "/a-propos"
                      ? "text-[#2C1A0E] bg-[#FAF7F2]"
                      : "text-[#2C1A0E] hover:bg-[#FAF7F2]"
                  }`}
                >
                  À propos
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                    pathname === "/contact"
                      ? "text-[#2C1A0E] bg-[#FAF7F2]"
                      : "text-[#2C1A0E] hover:bg-[#FAF7F2]"
                  }`}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
