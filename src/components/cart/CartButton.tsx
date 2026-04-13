"use client";

import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartButton() {
  const { items, count } = useCartStore();
  
  // Calcul direct pour éviter les problèmes d'hydratation
  const directCount = items.reduce((acc, item) => acc + item.quantite, 0);

  return (
    <Link href="/panier">
      <Button
        variant="outline"
        size="sm"
        className="relative border-[#8B4513] text-[#8B4513] hover:bg-white hover:border-[#8B4513] hover:text-[#D4A574]"
      >
        <ShoppingBag size={20} />
        {directCount > 0 && (
          <span className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-[#8B4513] text-white text-sm font-bold flex items-center justify-center border-2 border-white shadow-lg">
            {directCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
