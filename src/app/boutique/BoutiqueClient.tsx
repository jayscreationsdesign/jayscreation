"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown } from "lucide-react";

// Types
type SortOption = "default" | "price-asc" | "price-desc" | "rating";

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

// Composant item de catégorie
interface CategoryItemProps {
  category: any;
  children: any[];
  activeSlug: string | null;
  onSelectCategory: (slug: string | null) => void;
  level: number;
}

function CategoryItemComponent({
  category,
  children,
  activeSlug,
  onSelectCategory,
  level,
}: CategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = activeSlug === category.slug;
  const hasChildren = children.length > 0;

  return (
    <div>
      <button
        onClick={() => {
          onSelectCategory(category.slug);
          // Ne pas ouvrir/fermer le dropdown si on clique sur la catégorie parente
          // Seulement ouvrir/fermer si on clique explicitement pour toggle
        }}
        aria-current={isActive ? "page" : undefined}
        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-between ${
          isActive
            ? "bg-[#F5F0EB] border-l-4 border-accent text-accent font-semibold"
            : "text-foreground hover:bg-gray-50"
        }`}
        style={{ paddingLeft: `${16 + level * 16}px` }}
      >
        <span>{category.name}</span>
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Empêcher la propagation au parent
              setIsOpen(!isOpen); // Seulement toggle le dropdown
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </button>

      {/* Sous-catégories */}
      {hasChildren && isOpen && (
        <div className="space-y-1">
          {children.map((child) => (
            <CategoryItemComponent
              key={child.slug}
              category={child}
              children={child.children || []}
              activeSlug={activeSlug}
              onSelectCategory={onSelectCategory}
              level={level + 1}
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

  // Mettre à jour categorySlug quand searchParams change
  useEffect(() => {
    setCategorySlug(searchParams.get("category"));
  }, [searchParams]);

  // Debug pour voir le categorySlug
  console.log("categorySlug:", categorySlug);

  const filteredProducts = useMemo(
    () => getFilteredProducts(products, categorySlug),
    [categorySlug]
  );

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
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Grille principale : Sidebar + Contenu */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* SIDEBAR GAUCHE - Catégories */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="space-y-4 sticky top-8">
              {/* Titre */}
              <div>
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  Catégories
                </h2>
                {categorySlug && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <button
                      onClick={handleRemoveFilter}
                      className="text-accent hover:underline font-medium"
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
                {categories.map((category) => (
                  <CategoryItemComponent
                    key={category.slug}
                    category={category}
                    children={category.children || []}
                    activeSlug={categorySlug}
                    onSelectCategory={handleCategorySelect}
                    level={0}
                  />
                ))}
              </nav>
            </div>
          </aside>

          {/* CONTENU PRINCIPAL - Droite */}
          <main className="lg:col-span-4 order-1 lg:order-2">
            {/* HEADER avec compteur et menus déroulants */}
            <div className="mb-8 space-y-4 border-b border-gray-200 pb-6">
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col overflow-hidden rounded-3xl bg-[#FAF7F2] shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* CONTENU */}
                    <div className="flex flex-1 flex-col items-center justify-between gap-2 p-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        {/* Catégorie */}
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {product.category}
                        </p>

                        {/* Nom du produit */}
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {product.name}
                        </h3>

                        {/* Prix */}
                        <p className="text-base font-bold text-accent">
                          {product.price}
                        </p>

                        {/* Rating - Stars */}
                        {product.rating && (
                          <div className="flex items-center justify-center gap-1 mt-1">
                            {Array.from({ length: Math.round(product.rating) }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-yellow-400 text-yellow-400"
                                />
                              )
                            )}
                            <span className="ml-1 text-xs text-muted-foreground">
                              {product.rating.toFixed(1)}/5
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bouton CTA */}
                      <Link href={`/produit/${product.slug}`} className="w-full">
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full rounded-full mt-3"
                        >
                          Voir le produit
                        </Button>
                      </Link>
                    </div>
                  </div>
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
