import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import ProductClient from "@/components/product/ProductClient";
import ProductClientPapeterie from "@/components/product/ProductClientPapeterie";
import ProductBreadcrumb from "@/components/produit/ProductBreadcrumb";
import ProductBadgeMarquee from "@/components/produit/ProductBadgeMarquee";
import ProductDarkHero from "@/components/produit/ProductDarkHero";
import ProductEngagements from "@/components/produit/ProductEngagements";
import ProductReviewsNew from "@/components/produit/ProductReviewsNew";
import RelatedProducts from "@/components/product/RelatedProducts";
import FrequentlyBoughtTogether from "@/components/product/FrequentlyBoughtTogether";
import ProductTabsComplete from "@/components/produit/ProductTabsComplete";
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

  // Vérifier si c'est un produit de la catégorie "Papeterie Téléchargeable"
  const isPapeterieTelechargeable = product.categorySlug === "papeterie-telechargeable";

  return (
    <div className="bg-white" style={{ backgroundColor: '#FAF7F2' }}>
      {/* SEO JSON-LD */}
      <ProductJsonLd product={product} />
      
      {/* Track product view */}
      <ProductPageTracker product={product} />
            
      {/* Contenu principal selon la catégorie */}
      {isPapeterieTelechargeable ? (
        <ProductClientPapeterie slug={slug} />
      ) : (
        <>
        {/* Breadcrumb pour les autres produits */}
        <div style={{ backgroundColor: '#FAF7F2' }}>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <ProductBreadcrumb product={product} />
          </div>

          {/* Séparateur */}
          <div style={{ backgroundColor: 'white', height: '32px' }} />
        </div>

        {/* Structure standard pour les autres produits */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ paddingTop: '32px' }}>
          <ProductClient slug={slug} />
        </div>

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

          {/* Section 10 - Onglets complets produit */}
          <ProductTabsComplete product={product} />

          {/* Section 9 - Comment commander */}
          <HowToOrder />
        </>
      )}
    </div>
  );
}
