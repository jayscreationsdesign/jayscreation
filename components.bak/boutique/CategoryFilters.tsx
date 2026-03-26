import Link from "next/link";
import { CATEGORIES, type ProductCategoryValue } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function CategoryFilters({
  active,
}: {
  active: "all" | ProductCategoryValue;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.value;
        const href =
          cat.value === "all"
            ? "/boutique"
            : `/boutique?cat=${encodeURIComponent(cat.value)}`;

        return (
          <Link
            key={cat.value}
            href={href}
            className={cn(
              "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm transition-colors",
              isActive
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background text-foreground hover:bg-muted"
            )}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}

