"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useAppDispatch } from "@/shared/lib/store/redux";
import { addToCart } from "@/entities/cart/model/cartSlice";
import { ProductStock, Sneaker } from "@/entities/product/model/types";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  product: Sneaker;
  variant?: "icon" | "full";
  className?: string;
  currentStock?: ProductStock | null;
}

export const AddToCartButton = ({
  product,
  variant = "full",
  className,
  currentStock,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isAdded) {
      const timeout = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAdded]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Добавляю сток с ID:", currentStock?.id);

    if (!currentStock) {
      toast.error("Пожалуйста, выберите размер!", {
        description: "Нажмите на нужный размер перед добавлением в корзину.",
        duration: 3000,
      });
      return;
    }

    dispatch(
      addToCart({
        product: product,
        stockId: currentStock.id,
        size: currentStock.size,
      })
    );

    setIsAdded(true);
    toast.success(`Товар добавлен (Размер ${currentStock.size})`);
  };

  const baseStyles = cn(
    "transition-all duration-300 active:scale-95 flex items-center justify-center gap-2",
    isAdded
      ? "bg-green-500 hover:bg-green-600 text-white"
      : "bg-black hover:bg-gray-800 text-white",
    className
  );

  if (variant === "icon") {
    return (
      <Link
        href={`/sneakers/${product.id}`}
        className={cn(
          baseStyles,
          "p-2.5 rounded-full shadow-sm hover:cursor-pointer"
        )}
        aria-label="Добавить в корзину"
      >
        <ShoppingCart size={20} />
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(baseStyles, "w-full py-3 px-6 rounded-xl font-medium")}
    >
      {isAdded ? (
        <>
          <Check size={20} />
          <span>Добавлено</span>
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          <span>В корзину — ${product.price}</span>
        </>
      )}
    </button>
  );
};
