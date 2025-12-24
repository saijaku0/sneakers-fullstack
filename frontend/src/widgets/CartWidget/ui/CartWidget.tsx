"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/lib/store/redux";
import {
  removeFromCart,
  changeQuantity,
} from "@/entities/cart/model/cartSlice";
import { CartButton } from "@/features/cartButton";
import { Drawer } from "@/shared/ui";
import { CartList } from "@/entities/cart/ui/CartList";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { CheckoutButton } from "@/features/checkoutButton";
import { cn } from "@/shared/lib/utils";
import { OrderItem } from "@/entities/cart/model/types";

export default function CartWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 425px)");
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const closeCart = () => setIsOpen(false);

  const formattedItems: OrderItem[] = cartItems.map((item) => ({
    id: parseInt(item.id) || Math.floor(Math.random() * 10000),
    sneakerId: item.product.id,
    sneakerName: item.product.title,
    quantity: item.quantity,
    price: item.product.price,
    size: item.size,
    product: item.product,
  }));

  const handleRemove = (index: number) => {
    const realId = cartItems[index].id;
    dispatch(removeFromCart(realId));
  };

  const handleUpdateQuantity = (index: number, type: "plus" | "minus") => {
    const realId = cartItems[index].id;

    dispatch(changeQuantity({ id: realId, type }));
  };

  const wrapperRef = useClickOutside(() => {
    if (!isMobile) setIsOpen(false);
  });

  const toggleCart = () => setIsOpen((prev) => !prev);

  const listProps = {
    items: formattedItems,
    actionSlot: <CheckoutButton onClose={closeCart} />,
    onRemoveItem: handleRemove,
    onUpdateQuantity: handleUpdateQuantity,
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <CartButton count={totalCount} onClick={toggleCart} />

      {isMobile && (
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`Корзина (${totalCount})`}
        >
          <CartList {...listProps} />
        </Drawer>
      )}

      {!isMobile && isOpen && (
        <div
          className={cn(
            "absolute top-full right-0 mt-3 z-50",
            "z-100",
            "w-96 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5",
            "p-5 origin-top-right",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-300"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Корзина</h3>
            <span className="text-sm text-gray-500">{totalCount} товара</span>
          </div>

          <CartList {...listProps} />
        </div>
      )}
    </div>
  );
}
