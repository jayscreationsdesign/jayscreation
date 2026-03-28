"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { categories, type Category } from "@/data/categories";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavigateParams {
  category: string;
  sub?: string;
  subsub?: string;
}

interface CategoryNodeProps {
  category: Category;
  /** Ancestor slugs: [] at depth 0, [parentSlug] at depth 1, etc. */
  path: string[];
  activeCategory: string | null;
  activeSub: string | null;
  activeSubSub: string | null;
  openItems: Set<string>;
  toggleOpen: (slug: string) => void;
  onNavigate: (params: NavigateParams) => void;
}

// ─── Recursive node ──────────────────────────────────────────────────────────

function CategoryNode({
  category,
  path,
  activeCategory,
  activeSub,
  activeSubSub,
  openItems,
  toggleOpen,
  onNavigate,
}: CategoryNodeProps) {
  const depth = path.length;
  const hasChildren = (category.children?.length ?? 0) > 0;
  const isOpen = openItems.has(category.slug);

  const isActive =
    (depth === 0 && activeCategory === category.slug && !activeSub) ||
    (depth === 1 &&
      path[0] === activeCategory &&
      activeSub === category.slug &&
      !activeSubSub) ||
    (depth === 2 &&
      path[0] === activeCategory &&
      path[1] === activeSub &&
      activeSubSub === category.slug);

  // Toujours déplier si cet item est actif ou est un ancêtre de l'item actif
  const isAncestorOfActive =
    (depth === 0 && activeCategory === category.slug) ||
    (depth === 1 && path[0] === activeCategory && activeSub === category.slug);

  const shouldExpand = isOpen || isAncestorOfActive;

  const handleClick = () => {
    if (depth === 0) {
      onNavigate({ category: category.slug });
    } else if (depth === 1) {
      onNavigate({ category: path[0], sub: category.slug });
    } else {
      onNavigate({ category: path[0], sub: path[1], subsub: category.slug });
    }
    if (hasChildren) toggleOpen(category.slug);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        className={`w-full text-left py-2.5 pr-3 text-sm transition-all duration-150 flex items-center justify-between rounded-lg cursor-pointer
          ${
            isActive
              ? "bg-[#F0EBE3] border-l-[3px] border-[#C8A96E] text-[#C8A96E] font-medium"
              : depth === 0
              ? "text-foreground hover:bg-gray-50 hover:text-[#C8A96E]"
              : depth === 1
              ? "text-[#6B6B6B] hover:text-[#C8A96E]"
              : "text-[#9B9B9B] hover:text-[#C8A96E]"
          }`}
        style={{ paddingLeft: `${16 + depth * 16}px` }}
      >
        <span>{category.name}</span>
        {hasChildren && (
          <ChevronDown
            size={14}
            className={`shrink-0 transition-transform duration-200 ${
              shouldExpand ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {hasChildren && shouldExpand && (
        <div>
          {category.children!.map((child) => (
            <CategoryNode
              key={child.slug}
              category={child}
              path={[...path, category.slug]}
              activeCategory={activeCategory}
              activeSub={activeSub}
              activeSubSub={activeSubSub}
              openItems={openItems}
              toggleOpen={toggleOpen}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sidebar content (shared between desktop + mobile drawer) ────────────────

interface SidebarContentProps {
  activeCategory: string | null;
  activeSub: string | null;
  activeSubSub: string | null;
  openItems: Set<string>;
  toggleOpen: (slug: string) => void;
  onNavigate: (params: NavigateParams) => void;
  onReset: () => void;
}

function SidebarContent({
  activeCategory,
  activeSub,
  activeSubSub,
  openItems,
  toggleOpen,
  onNavigate,
  onReset,
}: SidebarContentProps) {
  return (
    <div className="space-y-1">
      {activeCategory && (
        <button
          onClick={onReset}
          className="mb-2 flex items-center gap-1 text-xs font-medium text-[#C8A96E] hover:underline cursor-pointer"
        >
          <X size={11} />
          Réinitialiser
        </button>
      )}

      {/* Tous les produits */}
      <button
        onClick={onReset}
        aria-current={!activeCategory ? "page" : undefined}
        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
          !activeCategory
            ? "bg-[#F0EBE3] border-l-[3px] border-[#C8A96E] text-[#C8A96E] font-medium"
            : "text-foreground hover:bg-gray-50 hover:text-[#C8A96E]"
        }`}
      >
        Tous les produits
      </button>

      {/* Arbre de catégories */}
      <nav aria-label="Catégories">
        {categories.map((cat) => (
          <CategoryNode
            key={cat.slug}
            category={cat}
            path={[]}
            activeCategory={activeCategory}
            activeSub={activeSub}
            activeSubSub={activeSubSub}
            openItems={openItems}
            toggleOpen={toggleOpen}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function CategoriesSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get("category");
  const activeSub = searchParams.get("sub");
  const activeSubSub = searchParams.get("subsub");

  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Auto-ouvrir les catégories parentes selon l'URL
  useEffect(() => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (activeCategory) next.add(activeCategory);
      if (activeSub) next.add(activeSub);
      return next;
    });
  }, [activeCategory, activeSub]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleOpen = (slug: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const handleNavigate = (params: NavigateParams) => {
    const urlParams = new URLSearchParams();
    urlParams.set("category", params.category);
    if (params.sub) urlParams.set("sub", params.sub);
    if (params.subsub) urlParams.set("subsub", params.subsub);
    router.push(`/boutique?${urlParams.toString()}`);
    setMobileOpen(false);
  };

  const handleReset = () => {
    router.push("/boutique");
    setMobileOpen(false);
  };

  const sharedProps: SidebarContentProps = {
    activeCategory,
    activeSub,
    activeSubSub,
    openItems,
    toggleOpen,
    onNavigate: handleNavigate,
    onReset: handleReset,
  };

  return (
    <>
      {/* ── Mobile: bouton Filtres ── */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir les filtres"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={15} />
          Filtres
          {activeCategory && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              1
            </span>
          )}
        </button>
      </div>

      {/* ── Mobile: drawer overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                Catégories
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer les filtres"
                className="rounded-lg p-1.5 hover:bg-muted transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SidebarContent {...sharedProps} />
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop: sidebar fixe ── */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground mb-3">
            Catégories
          </h2>
          <SidebarContent {...sharedProps} />
        </div>
      </aside>
    </>
  );
}
