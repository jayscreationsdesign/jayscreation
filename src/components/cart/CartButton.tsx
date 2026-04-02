"use client";

import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartButton() {
  const { count } = useCartStore();

  return (
    <Link href="/panier">
      <Button
        variant="outline"
        size="sm"
        className="relative border-[#8B4513] text-[#8B4513] hover:bg-white hover:border-[#8B4513] hover:text-[#D4A574]"
      >
        <ShoppingBag size={20} />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#8B4513] text-white text-xs font-medium flex items-center justify-center">
            {count}
          </span>
        )}
      </Button>
    </Link>
  );
}
