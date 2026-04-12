import type { Product } from "@/data/products";

export interface ExtendedProduct extends Product {
  in_stock: boolean;
  unit_price: number;
  created_at: string;
  sales_count: number | null;
  featured: boolean | null;
  pricing_type?: "unit_with_minimum" | "lot_pricing" | "quote" | undefined;
  min_quantity?: number | undefined;
  lots?: { lot_price: number; }[] | undefined;
  price_min?: number | undefined;
  price_max?: number | undefined;
}
