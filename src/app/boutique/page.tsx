"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, type Product } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import CategoriesSidebar from "@/components/boutique/CategoriesSidebar";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getFilteredProducts(
  allProducts: Product[],
  activeSlug: string | null
): Product[] {
  if (!activeSlug) return allProducts;
  return allProducts.filter((p) => p.categorySlug === activeSlug);
}

function getSortedProducts(
  productsToSort: Product[],
  sortBy: SortOption
): Product[] {
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
}

// ─── Page content ─────────────────────────────────────────────────────────────

function BoutiquePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Use most-specific param: subsub > sub > category
  const subsub = searchParams.get("subsub");
  const sub = searchParams.get("sub");
  const category = searchParams.get("category");
  const activeSlug = subsub ?? sub ?? category;

  const filteredProducts = useMemo(
    () => getFilteredProducts(products, activeSlug),
    [activeSlug]
  );

  const sortedProducts = useMemo(
    () => getSortedProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy]
  );

  const totalResults = sortedProducts.length;
  const startIndex = totalResults > 0 ? 1 : 0;

  const handleRemoveFilter = () => {
    router.push("/boutique");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-start gap-8">
          {/* SIDEBAR */}
          <CategoriesSidebar />

          {/* CONTENU PRINCIPAL */}
          <main className="flex-1 min-w-0">
            {/* Header : compteur + tri */}
            <div className="mb-8 space-y-4 border-b border-gray-200 pb-6">
              <div className="text-sm text-muted-foreground">
                Affichage de{" "}
                <span className="font-semibold text-foreground">
                  {startIndex}
                </span>
                –
                <span className="font-semibold text-foreground">
                  {totalResults}
                </span>{" "}
                sur{" "}
                <span className="font-semibold text-foreground">
                  {totalResults}
                </span>{" "}
                résultats
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {activeSlug && (
                    <button
                      onClick={handleRemoveFilter}
                      className="text-xs font-medium text-accent hover:underline"
                    >
                      ✕ Réinitialiser les filtres
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort-select"
                    className="text-sm font-medium shrink-0"
                  >
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
                      <SelectItem value="price-desc">
                        Prix décroissant
                      </SelectItem>
                      <SelectItem value="rating">Les mieux notés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Grille produits */}
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
                    {/* Image */}
                    <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Contenu */}
                    <div className="flex flex-1 flex-col items-center justify-between gap-2 p-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {product.category}
                        </p>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {product.name}
                        </h3>
                        <p className="text-base font-bold text-accent">
                          {product.price}
                        </p>
                        {product.rating && (
                          <div className="flex items-center justify-center gap-1 mt-1">
                            {Array.from({
                              length: Math.round(product.rating),
                            }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="ml-1 text-xs text-muted-foreground">
                              {product.rating.toFixed(1)}/5
                            </span>
                          </div>
                        )}
                      </div>

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

// ─── Page wrapper avec Suspense ───────────────────────────────────────────────

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BoutiquePageContent />
    </Suspense>
  );
}
