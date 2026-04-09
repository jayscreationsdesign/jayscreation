"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ui/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown } from "lucide-react";

// Contexte pour synchroniser l'ouverture des catégories entre header et sidebar
const SidebarSyncContext = createContext<{
  openCategory: string | null;
  setOpenCategory: (slug: string | null) => void;
}>({
  openCategory: null,
  setOpenCategory: () => {}
});

// Types
type SortOption = "default" | "price-asc" | "price-desc" | "rating";

// Filtrer les produits par recherche textuelle
const getSearchFilteredProducts = (
  allProducts: Product[],
  searchQuery: string | null
): Product[] => {
  if (!searchQuery || searchQuery.trim() === "") return allProducts;
  
  const query = searchQuery.toLowerCase().trim();
  
  return allProducts.filter((product) => {
    // Recherche dans le nom du produit
    if (product.name && product.name.toLowerCase().includes(query)) {
      return true;
    }
    
    // Recherche dans la description
    if (product.description && product.description.toLowerCase().includes(query)) {
      return true;
    }
    
    // Recherche dans la catégorie
    if (product.category && product.category.toLowerCase().includes(query)) {
      return true;
    }
    
    // Recherche dans le slug
    if (product.slug && product.slug.toLowerCase().includes(query)) {
      return true;
    }
    
    return false;
  });
};

// Filtrer les produits par catégorie (via categorySlug)
const getFilteredProducts = (
  allProducts: Product[],
  categorySlug: string | null
): Product[] => {
  if (!categorySlug) return allProducts;
  
  // Debug : afficher tous les categorySlug disponibles
  console.log("Recherche du categorySlug:", categorySlug);
  console.log("CategorySlug disponibles:", allProducts.map(p => p.categorySlug));
  
  // Filtrage normal
  let filtered = allProducts.filter((p) => p.categorySlug === categorySlug);
  
  // Si rien trouvé, essayer avec une recherche plus flexible
  if (filtered.length === 0) {
    console.log("Aucun produit trouvé, essai avec recherche flexible...");
    filtered = allProducts.filter((p) => 
      p.categorySlug?.includes(categorySlug) || 
      categorySlug.includes(p.categorySlug) ||
      p.category?.toLowerCase().includes(categorySlug.toLowerCase())
    );
  }
  
  // Si c'est une catégorie parente, chercher dans toutes les sous-catégories
  if (filtered.length === 0 && categorySlug === "sweet-tables-decoration") {
    console.log("Recherche dans toutes les sous-catégories de Sweet Tables & Décoration...");
    const subCategorySlugs = ["guirlandes-ballons"];
    filtered = allProducts.filter((p) => subCategorySlugs.includes(p.categorySlug));
  }
  
  // Si c'est la catégorie Anniversaires, chercher dans toutes les sous-catégories anniversaires
  if (filtered.length === 0 && categorySlug === "anniversaires") {
    console.log("Recherche dans toutes les sous-catégories Anniversaires...");
    const anniversairesSubCategorySlugs = ["papeterie-sweet-tables", "posters-affiches", "toppers"];
    filtered = allProducts.filter((p) => anniversairesSubCategorySlugs.includes(p.categorySlug));
  }
  
  // Si c'est la catégorie Mariage, chercher dans toutes les sous-catégories mariage
  if (filtered.length === 0 && categorySlug === "mariage") {
    console.log("Recherche dans toutes les sous-catégories Mariage...");
    const mariageSubCategorySlugs = ["faire-parts", "invitations", "menus", "tableaux-accueil", "marque-places"];
    filtered = allProducts.filter((p) => mariageSubCategorySlugs.includes(p.categorySlug));
  }
  
  // Si c'est la catégorie Baptême, chercher dans toutes les sous-catégories baptême
  if (filtered.length === 0 && categorySlug === "bapteme") {
    console.log("Recherche dans toutes les sous-catégories Baptême...");
    const baptemeSubCategorySlugs = ["faire-parts-bapteme", "invitations-bapteme", "menus-bapteme", "tableaux-accueil-bapteme", "marque-places-bapteme", "cadeaux-invites-bapteme"];
    filtered = allProducts.filter((p) => baptemeSubCategorySlugs.includes(p.categorySlug));
  }
  
  // Si c'est la catégorie Papeterie Saisonnière, chercher dans toutes les sous-catégories saisonnières
  if (filtered.length === 0 && categorySlug === "papeterie-saisonniere") {
    console.log("Recherche dans toutes les sous-catégories Papeterie Saisonnière...");
    const saisonniereSubCategorySlugs = ["noel", "saint-valentin", "paques", "halloween"];
    filtered = allProducts.filter((p) => saisonniereSubCategorySlugs.includes(p.categorySlug));
  }
  
  console.log("Produits filtrés:", filtered.length);
  
  return filtered;
};

// Trier les produits
const getSortedProducts = (
  productsToSort: Product[],
  sortBy: SortOption
): Product[] => {
  const sorted = [...productsToSort];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => {
        const priceA = a.numericPrice ?? Number.MAX_VALUE;
        const priceB = b.numericPrice ?? Number.MAX_VALUE;
        return priceA - priceB;
      });

    case "price-desc":
      return sorted.sort((a, b) => {
        const priceA = a.numericPrice ?? Number.MIN_VALUE;
        const priceB = b.numericPrice ?? Number.MIN_VALUE;
        return priceB - priceA;
      });

    case "rating":
      return sorted.sort((a, b) => {
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;
        return ratingB - ratingA;
      });

    default:
      return sorted;
  }
};

// Fonction pour trouver si une catégorie est parente d'une sous-catégorie
function isParentOfCategory(category: any, targetSlug: string): boolean {
  if (!category || !targetSlug) return false;
  if (category.slug === targetSlug) return true;
  if (category.children && Array.isArray(category.children)) {
    return category.children.some((child: any) => {
      if (child && child.slug === targetSlug) return true;
      return false;
    });
  }
  return false;
}

// Fonction pour trouver le slug du parent qui contient activeCategory comme enfant
function findParentSlug(slug: string): string | null {
  if (!slug || !categories || !Array.isArray(categories)) return null;
  
  for (const cat of categories) {
    if (!cat) continue;
    if (cat.slug === slug) return cat.slug;
    if (cat.children && Array.isArray(cat.children)) {
      for (const child of cat.children) {
        if (child && child.slug === slug) return cat.slug;
      }
    }
  }
  return null;
}

// Composant item de catégorie
interface CategoryItemProps {
  category: any;
  children: any[];
  activeSlug: string | null;
  onSelectCategory: (slug: string | null) => void;
  level: number;
  openCategories: string[];
  setOpenCategories: (categories: string[]) => void;
}

function CategoryItemComponent({
  category,
  children,
  activeSlug,
  onSelectCategory,
  level,
  openCategories,
  setOpenCategories,
}: CategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = activeSlug === category.slug;
  const hasChildren = children.length > 0;

  // Ouvrir automatiquement si cette catégorie est dans openCategories
  useEffect(() => {
    if (openCategories.includes(category.slug)) {
      setIsOpen(true);
    }
  }, [openCategories, category.slug]);

  // Écouter l'événement personnalisé du header
  useEffect(() => {
    const handleHeaderCategoryClick = (event: any) => {
      const { categorySlug, force } = event.detail;
      
      // Forcer l'ouverture si demandé ou si cette catégorie est concernée
      if (force || isParentOfCategory(category, categorySlug)) {
        console.log('Ouverture forcée pour:', category.name, 'categorySlug:', categorySlug, 'force:', force);
        setIsOpen(true);
      }
    };

    window.addEventListener('openSidebarCategory', handleHeaderCategoryClick);
    return () => {
      window.removeEventListener('openSidebarCategory', handleHeaderCategoryClick);
    };
  }, [category]);

  return (
    <div>
      <button
        onClick={() => {
          onSelectCategory(category.slug);
          // Toggle du dropdown quand on clique sur la catégorie
          if (hasChildren) setIsOpen(!isOpen);
        }}
        aria-current={isActive ? "page" : undefined}
        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-between ${
          isActive
            ? "bg-[#F5F0EB] border-l-4 border-accent text-accent font-semibold"
            : "text-foreground hover:bg-[#6b3410] hover:text-[#D4A574]"
        }`}
        style={{ paddingLeft: `${16 + level * 16}px` }}
      >
        <span>{category.name}</span>
        {hasChildren && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation(); // Empêcher la propagation au parent
              setIsOpen(!isOpen); // Toggle du dropdown
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(!isOpen);
              }
            }}
            className="p-1 hover:bg-gray-100 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={`Ouvrir/fermer le sous-menu de ${category.name}`}
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        )}
      </button>

      {/* Sous-catégories */}
      {hasChildren && isOpen && (
        <div className="space-y-1">
          {children.map((child, index) => (
            <CategoryItemComponent
              key={`${child.slug ?? 'noslug'}-${index}`}
              category={child}
              children={child.children || []}
              activeSlug={activeSlug}
              onSelectCategory={onSelectCategory}
              level={level + 1}
              openCategories={openCategories}
              setOpenCategories={setOpenCategories}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Contenu principal avec Suspense
function BoutiquePageContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BoutiquePageContentInner />
    </Suspense>
  );
}

// Contenu principal
function BoutiquePageContentInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [sidebarOpenCategory, setSidebarOpenCategory] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  // Fournir le contexte aux composants enfants
  const sidebarContextValue = {
    openCategory: sidebarOpenCategory,
    setOpenCategory: setSidebarOpenCategory
  };

  // Dans un useEffect, quand l'URL change, ouvrir le bon accordéon
  useEffect(() => {
    if (categorySlug && typeof categorySlug === 'string') {
      try {
        const parentSlug = findParentSlug(categorySlug);
        if (parentSlug && typeof parentSlug === 'string') {
          setOpenCategories(prev => {
            if (!Array.isArray(prev)) return [parentSlug];
            if (prev.includes(parentSlug)) return prev;
            return [...prev, parentSlug];
          });
        }
      } catch (error) {
        console.error('Erreur dans useEffect categorySlug:', error);
      }
    }
  }, [categorySlug]);

  // Écouter le localStorage pour synchroniser l'ouverture
  useEffect(() => {
    const handleStorageChange = () => {
      const categoryToOpen = localStorage.getItem('openSidebarCategory');
      if (categoryToOpen) {
        console.log('Détection depuis localStorage:', categoryToOpen);
        setSidebarOpenCategory(categoryToOpen);
        // Nettoyer le localStorage après utilisation
        setTimeout(() => localStorage.removeItem('openSidebarCategory'), 100);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Vérifier au chargement
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Mettre à jour categorySlug et searchQuery quand searchParams change
  useEffect(() => {
    setCategorySlug(searchParams.get("category"));
  }, [searchParams]);

  // Récupérer le paramètre de recherche
  const searchQuery = searchParams.get("search");

  // Debug pour voir le categorySlug et searchQuery
  console.log("categorySlug:", categorySlug);
  console.log("searchQuery:", searchQuery);
  console.log("Total products loaded:", products.length);

  const filteredProducts = useMemo(() => {
    let resultProducts = products;
    
    // D'abord filtrer par catégorie si nécessaire
    if (categorySlug) {
      resultProducts = getFilteredProducts(resultProducts, categorySlug);
      console.log("Products after category filter:", resultProducts.length);
    }
    
    // Ensuite filtrer par recherche textuelle si nécessaire
    if (searchQuery) {
      resultProducts = getSearchFilteredProducts(resultProducts, searchQuery);
      console.log("Products after search filter:", resultProducts.length);
    }
    
    console.log("Final filtered products:", resultProducts.length);
    return resultProducts;
  }, [categorySlug, searchQuery]);

  const sortedProducts = useMemo(
    () => getSortedProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy]
  );

  const totalResults = sortedProducts.length;
  const startIndex = totalResults > 0 ? 1 : 0;
  const endIndex = totalResults;

  const handleCategorySelect = (slug: string | null) => {
    if (slug) {
      router.push(`/boutique?category=${slug}`);
    } else {
      router.push("/boutique");
    }
  };

  const handleRemoveFilter = () => {
    router.push("/boutique");
  };

  return (
    <div className="min-h-screen bg-jc-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Grille principale : Sidebar + Contenu */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* SIDEBAR GAUCHE - Catégories */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="space-y-4 sticky top-8">
              {/* Titre */}
              <div>
                <h2 className="text-lg font-heading font-semibold text-jc-text">
                  Catégories
                </h2>
                {categorySlug && (
                  <p className="text-xs text-jc-muted mt-2">
                    <button
                      onClick={handleRemoveFilter}
                      className="text-jc-accent hover:underline font-medium"
                    >
                      ✕ Réinitialiser
                    </button>
                  </p>
                )}
              </div>

              {/* Lien "Tous les produits" */}
              <button
                onClick={() => handleCategorySelect(null)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                  !categorySlug
                    ? "bg-[#F5F0EB] border-l-4 border-accent text-accent font-semibold"
                    : "text-foreground hover:bg-gray-50"
                }`}
                aria-current={!categorySlug ? "page" : undefined}
              >
                Tous les produits
              </button>

              {/* Hiérarchie des catégories */}
              <nav className="space-y-1">
                <SidebarSyncContext.Provider value={sidebarContextValue}>
                  {categories.map((category, index) => (
                    <CategoryItemComponent
                      key={`${category.slug ?? 'noslug'}-${index}`}
                      category={category}
                      children={category.children || []}
                      activeSlug={categorySlug}
                      onSelectCategory={handleCategorySelect}
                      level={0}
                      openCategories={openCategories}
                      setOpenCategories={setOpenCategories}
                    />
                  ))}
                </SidebarSyncContext.Provider>
              </nav>
            </div>
          </aside>

          {/* CONTENU PRINCIPAL - Droite */}
          <main className="lg:col-span-4 order-1 lg:order-2">
            {/* HEADER avec compteur et menus déroulants */}
            <div className="mb-8 space-y-4 border-b border-gray-200 pb-6">
              {/* Message de recherche si applicable */}
              {searchQuery && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    🔍 Recherche pour "<span className="font-semibold">{searchQuery}</span>" - {totalResults} résultat{totalResults > 1 ? "s" : ""} trouvé{totalResults > 1 ? "s" : ""}
                  </p>
                </div>
              )}

              {/* Ligne 1 : Compteur */}
              <div className="text-sm text-muted-foreground">
                Affichage de{" "}
                <span className="font-semibold text-foreground">
                  {startIndex}
                </span>
                –
                <span className="font-semibold text-foreground">
                  {endIndex}
                </span>{" "}
                sur{" "}
                <span className="font-semibold text-foreground">
                  {totalResults}
                </span>{" "}
                résultats
              </div>

              {/* Ligne 2 : Select pour le tri */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1" />
                <div className="flex items-center gap-3">
                  <label htmlFor="sort-select" className="text-sm font-medium">
                    Trier par :
                  </label>
                  <Select
                    value={sortBy}
                    onValueChange={(val) => setSortBy(val as SortOption)}
                  >
                    <SelectTrigger id="sort-select" className="w-48">
                      <SelectValue placeholder="Tri par défaut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Tri par défaut</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="rating">Les mieux notés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* ZONE PRODUITS */}
            {totalResults === 0 ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center max-w-md">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Aucun produit ne correspond
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Aucun produit ne correspond à votre sélection. Veuillez
                    essayer une autre catégorie.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.id ?? 'noid'}-${product.slug ?? 'noslug'}-${index}`}
                    product={product}
                    showCategory={true}
                    showRating={true}
                    aspectRatio="square"
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default BoutiquePageContent;
