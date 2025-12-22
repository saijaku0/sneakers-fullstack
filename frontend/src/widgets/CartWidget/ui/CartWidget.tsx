"use client";
import { useState } from "react";
import { CartButton } from "@/features/cartButton";
import { Drawer } from "@/shared/ui";
import { CartList } from "@/entities/cart/ui/CartList";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { CheckoutButton } from "@/features/checkoutButton";
import { cn } from "@/shared/lib/utils";

const DEMO_ITEMS = [
  { id: 1, name: "Nike Air Max", price: 120, image: "👟" },
  { id: 2, name: "Adidas Superstar", price: 90, image: "👞" },
];

export default function CartWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  const isMobile = useMediaQuery("(max-width: 425px)");

  const wrapperRef = useClickOutside(() => {
    if (!isMobile) setIsOpen(false); 
  });

  const toggleCart = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative" ref={wrapperRef}>
      <CartButton 
         count={DEMO_ITEMS.length} 
         onClick={toggleCart} 
      />

      {isMobile && (
        <Drawer 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          title={`Корзина (${DEMO_ITEMS.length})`}
        >
           <CartList items={DEMO_ITEMS} actionSlot={<CheckoutButton />} />
        </Drawer>
      )}

      {!isMobile && isOpen && (
        <div 
          className={cn(
            "absolute top-full right-0 mt-3 z-50",
            "w-96 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5",
            "p-5 origin-top-right",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-300"
          )}
        >
           <h3 className="font-bold text-lg mb-4">Корзина</h3>
           <CartList items={DEMO_ITEMS} actionSlot={<CheckoutButton />} />
        </div>
      )}
    </div>
  );
};