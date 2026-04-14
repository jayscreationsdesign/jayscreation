import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import ProductClient from "@/components/product/ProductClient";
import ProductBadgeMarquee from "@/components/produit/ProductBadgeMarquee";
import ProductDarkHero from "@/components/produit/ProductDarkHero";
import ProductEngagements from "@/components/produit/ProductEngagements";
import ProductReviewsNew from "@/components/produit/ProductReviewsNew";
import RelatedProducts from "@/components/product/RelatedProducts";
import FrequentlyBoughtTogether from "@/components/product/FrequentlyBoughtTogether";
import ProductFAQ from "@/components/produit/ProductFAQ";
import RelatedProductsCarousel from "@/components/product/RelatedProductsCarousel";
import HowToOrder from "@/components/home/HowToOrder";
import { ProductPageTracker } from "@/components/product/ProductPageTracker";
import { ProductJsonLd } from "@/components/product/ProductJsonLd";

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
  
  const description = product.description 
    ? product.description.slice(0, 160) 
    : `${product.name} - Création artisanale personnalisée pour vos événements`;
  
  const imageUrl = product.image || '/images/logo/logo.png';
  
  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [imageUrl],
      locale: 'fr_FR'
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: [imageUrl]
    }
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

  return (
    <div className="bg-white">
      {/* SEO JSON-LD */}
      <ProductJsonLd product={product} />
      
      {/* Track product view */}
      <ProductPageTracker product={product} />
      
      {/* Fil d'Ariane */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
      </div>

      {/* Contenu principal avec ThemeSelector */}
      <ProductClient slug={slug} />

      {/* Section 3 - Carrousel "Vous aimerez peut-être aussi" */}
      <RelatedProductsCarousel currentProduct={product} allProducts={products} />

      {/* Section 4 - Bande de badges défilante */}
      <ProductBadgeMarquee />

      {/* Section 5 - Dark hero */}
      <ProductDarkHero />

      {/* Section 6 - Nos engagements */}
      <ProductEngagements />

      {/* Section 7 - Avis clients */}
      <ProductReviewsNew product={product} />

      {/* Section 8 - Produits fréquemment achetés ensemble */}
      <FrequentlyBoughtTogether product={product} />

      {/* Section 9 - Produits similaires */}
      <RelatedProducts product={product} />

      {/* Section 10 - FAQ produit */}
      <ProductFAQ />

      {/* Section 9 - Comment commander */}
      <HowToOrder />
    </div>
  );
}
