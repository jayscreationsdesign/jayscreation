import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";

export default function SimilarProducts({
  currentProduct,
}: {
  currentProduct: Product;
}) {
  const similar = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.categorySlug === currentProduct.categorySlug
    )
    .slice(0, 4);

  const needed = 4 - similar.length;
  if (needed > 0) {
    const ids = new Set(similar.map((s) => s.id));
    similar.push(
      ...products
        .filter((p) => p.id !== currentProduct.id && !ids.has(p.id))
        .slice(0, needed)
    );
  }

  if (similar.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl text-[#2C2C2C] md:text-3xl">
          Vous aimerez aussi
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-3xl bg-[#FAF7F2] shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#E8D5B7]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  style={{ backgroundColor: '#E8D5B7' }}
                />
              </div>

              {/* Infos */}
              <div className="flex flex-1 flex-col items-center justify-between gap-2 p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  {/* Badge "Sélection du moment" - conditionnel */}
                  {(product.id === "1" || product.name?.includes("Sélection")) && (
                    <div className="inline-block rounded-full bg-[#E8D4B8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8B4513] mb-2">
                      Sélection du moment
                    </div>
                  )}
                  
                  <p className="text-xs font-medium uppercase tracking-wide text-[#6B6B6B]">
                    {product.category}
                  </p>
                  <h3 className="font-heading text-lg font-semibold text-[#2C2C2C]">
                    {product.name}
                  </h3>
                  <p className="text-base font-bold text-[#8B4513]">
                    {product.price}
                  </p>
                </div>
                <PrimaryCtaButton href={`/produit/${product.slug}`}>
                    Voir le produit
                  </PrimaryCtaButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
