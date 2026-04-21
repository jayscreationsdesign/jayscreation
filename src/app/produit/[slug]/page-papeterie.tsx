import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductClientPapeterie from "@/components/product/ProductClientPapeterie";
import { ProductPageTracker } from "@/components/product/ProductPageTracker";
import { ProductJsonLd } from "@/components/product/ProductJsonLd";

// ─── Génération statique & SEO ────────────────────────────────────────────────

export function generateStaticParams() {
  // Générer uniquement pour les produits de la catégorie "papeterie-telechargeable"
  return products
    .filter(p => p.categorySlug === "papeterie-telechargeable")
    .map((p) => ({ slug: p.slug }));
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
    : `${product.name} - Kit de papeterie téléchargeable personnalisée pour vos événements`;
  
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

export default async function ProductPagePapeterie({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product || product.categorySlug !== "papeterie-telechargeable") {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* SEO JSON-LD */}
      <ProductJsonLd product={product} />
      
      {/* Track product view */}
      <ProductPageTracker product={product} />
      
      {/* Contenu principal pour la catégorie Papeterie Téléchargeable */}
      <ProductClientPapeterie slug={slug} />
    </div>
  );
}
