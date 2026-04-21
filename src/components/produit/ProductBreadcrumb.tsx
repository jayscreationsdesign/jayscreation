"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type Product } from "@/data/products";

interface ProductBreadcrumbProps {
  product: Product;
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <div className="w-full">
      <nav style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '8px', 
        fontSize: '13px'
      }} aria-label="Fil d'Ariane">
        <Link href="/" className="transition-colors hover:text-[#8B4513]" style={{ color: '#C8A96E' }}>
          Accueil
        </Link>
        <ChevronRight size={14} style={{ color: '#C8A96E' }} />
        <Link href="/boutique?categorie=papeterie-telechargeable" className="transition-colors hover:text-[#8B4513]" style={{ color: '#C8A96E' }}>
          Papeterie téléchargeable
        </Link>
        <ChevronRight size={14} style={{ color: '#C8A96E' }} />
        <span className="font-medium" style={{ color: '#C8A96E', fontWeight: '600' }}>{product.name}</span>
      </nav>
    </div>
  );
}
