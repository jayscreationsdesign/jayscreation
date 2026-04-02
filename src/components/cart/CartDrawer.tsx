"use client";

import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, removeItem, updateQuantite, total, clearCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative border-[#8B4513] text-[#8B4513] hover:bg-[#FAF7F2] hover:border-[#6b3410]"
        >
          <ShoppingBag size={20} />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#8B4513] text-white text-xs font-medium flex items-center justify-center">
              {items.reduce((sum, item) => sum + item.quantite, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:w-96 bg-white border-l-[#8B4513]">
        <SheetHeader>
          <SheetTitle className="text-[#2C2C2C] font-heading text-xl">
            Votre Panier ({items.reduce((sum, item) => sum + item.quantite, 0)} articles)
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Liste des articles */}
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag size={48} className="mx-auto text-[#8B4513] mb-4" />
                <p className="text-[#6B6B6B] mb-4">Votre panier est vide</p>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-[#8B4513] hover:bg-[#6b3410] hover:text-[#D4A574]"
                >
                  Commencer mes achats
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-[#FAF7F2] rounded-lg">
                    {/* Image */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.nom}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Détails */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#2C2C2C] text-sm truncate">
                        {item.nom}
                      </h4>
                      {item.theme && (
                        <p className="text-xs text-[#6B6B6B]">
                          Thème : {item.theme}
                        </p>
                      )}
                      {item.personnalisation && (
                        <p className="text-xs text-[#6B6B6B] italic">
                          {item.personnalisation}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-[#8B4513]">
                        {formatPrice(item.prix)}
                      </p>
                    </div>
                    
                    {/* Contrôles */}
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <Trash2 size={16} />
                      </Button>
                      
                      <div className="flex items-center gap-1 bg-white rounded-md border border-[#8B4513]">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantite(item.id, item.quantite - 1)}
                          className="text-[#8B4513] hover:bg-[#FAF7F2] p-1 h-8 w-8"
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantite}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantite(item.id, item.quantite + 1)}
                          className="text-[#8B4513] hover:bg-[#FAF7F2] p-1 h-8 w-8"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Total et actions */}
          {items.length > 0 && (
            <div className="border-t border-[#8B4513] pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#2C2C2C]">
                  Total :
                </span>
                <span className="text-xl font-bold text-[#8B4513]">
                  {formatPrice(total)}
                </span>
              </div>
              
              <div className="space-y-2">
                <Link href="/commande" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#8B4513] hover:bg-[#6b3410] hover:text-[#D4A574]">
                    Valider ma commande
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full border-[#8B4513] text-[#8B4513] hover:bg-[#FAF7F2]"
                >
                  Vider le panier
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
