import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import ProductGallery from "@/components/produit/ProductGallery";
import ProductInfo from "@/components/produit/ProductInfo";
import ProductBadgeMarquee from "@/components/produit/ProductBadgeMarquee";
import ProductDarkHero from "@/components/produit/ProductDarkHero";
import ProductEngagements from "@/components/produit/ProductEngagements";
import ProductFAQ from "@/components/produit/ProductFAQ";
import SimilarProducts from "@/components/produit/SimilarProducts";
import HowToOrder from "@/components/home/HowToOrder";

// ─── Génération statique & SEO ────────────────────────────────────────────────

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description ?? product.name,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="bg-white">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — Héro produit
          Fond blanc · 2 colonnes (55% galerie / 45% infos)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Fil d'Ariane */}
        <nav
          className="mb-8 flex items-center gap-2 text-sm text-[#6B6B6B]"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="transition-colors hover:text-[#2C2C2C]">
            Accueil
          </Link>
          <ChevronRight size={14} />
          <Link href="/boutique" className="transition-colors hover:text-[#2C2C2C]">
            Boutique
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-[#2C2C2C]">{product.name}</span>
        </nav>

        {/* Grille héro */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Galerie — 55% = col-span-3 sur grille 5 */}
          <div className="lg:col-span-3">
            <ProductGallery product={product} />
          </div>
          {/* Infos — 45% = col-span-2 sur grille 5 */}
          <div className="lg:col-span-2">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — Galerie pleine largeur scroll horizontal
          Fond crème #FAF7F2 · snap scroll · images plein écran
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF7F2]">
        <div className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square w-screen flex-shrink-0 snap-center md:w-[80vw]"
            >
              <Image
                src={img}
                alt={`${product.name} — vue ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — Bande de badges défilante
          Fond blanc · animation marquee CSS infinie
      ═══════════════════════════════════════════════════════════════ */}
      <ProductBadgeMarquee />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — Dark hero
          Fond #2C2C2C · titre italic · 3 blocs dorés
      ═══════════════════════════════════════════════════════════════ */}
      <ProductDarkHero />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — Nos engagements
          Fond crème #FAF7F2 · 3 colonnes QUALITÉ / DÉLAIS / SERVICE
      ═══════════════════════════════════════════════════════════════ */}
      <ProductEngagements />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — FAQ produit
          Fond blanc · max-w-3xl · 4 accordéons chevron doré
      ═══════════════════════════════════════════════════════════════ */}
      <ProductFAQ />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 — Comment commander ?
          Composant existant HowToOrder (fond crème, 6 étapes)
      ═══════════════════════════════════════════════════════════════ */}
      <HowToOrder />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9 — Produits similaires
          Fond blanc · cartes rounded-3xl style boutique · 4 produits
      ═══════════════════════════════════════════════════════════════ */}
      <SimilarProducts currentProduct={product} />

    </div>
  );
}
