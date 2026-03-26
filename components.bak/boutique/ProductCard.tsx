import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPriceLabel } from "@/lib/products";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="mt-2 flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < rating
              ? "fill-accent text-accent"
              : "fill-border text-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const priceLabel = formatPriceLabel(product.price, product.priceMax);
  const isSurDevis = product.price === null;

  return (
    <Link
      href="#"
      className="group relative overflow-hidden rounded-3xl border border-border bg-background/60 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md"
    >
      <div className="relative">
        <div className="h-44 w-full bg-neutral-200/70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,169,110,0.25),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="p-5">
        <div className="text-xs text-muted-foreground">{product.categoryLabel}</div>
        <div className="mt-1 font-heading text-lg leading-6 text-foreground">
          {product.name}
        </div>

        {product.rating != null && <StarRating rating={product.rating} />}

        <div
          className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs ${
            isSurDevis
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-border bg-background text-foreground"
          }`}
        >
          {priceLabel}
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full border border-accent/20 bg-accent/10 opacity-0 blur-[1px] transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
