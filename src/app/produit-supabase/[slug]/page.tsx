import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import type { Product } from "@/types/product";
import ProductClient from "./ProductClient";
import RelatedProductsServer from "@/components/product/RelatedProductsServer";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) return {};
  
  return {
    title: product.meta_title || product.nom,
    description: product.meta_description || product.description || product.nom,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) notFound();

  return (
    <>
      <ProductClient product={product} />
      <RelatedProductsServer currentProduct={product} />
    </>
  );
}
