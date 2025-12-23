"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useAppDispatch } from "@/shared/lib/store/redux";
// import { addToCart } from "@/entities/cart/model/cartSlice"; // Твой экшен
import { Sneaker } from "@/entities/product/model/types"; // Твой тип товара
import { cn } from "@/shared/lib/utils";

interface Props {
  product: Sneaker;
  variant?: "icon" | "full"; 
  className?: string;
}

export const AddToCartButton = ({ product, variant = "full", className }: Props) => {
  const dispatch = useAppDispatch();
  const [isAdded, setIsAdded] = useState(false);

  // Сбрасываем галочку "Добавлено" через 2 секунды
  useEffect(() => {
    if (isAdded) {
      const timeout = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAdded]);

  const handleClick = (e: React.MouseEvent) => {
    // 1. ВАЖНО: Останавливаем клик, чтобы не открылась страница товара
    e.preventDefault();
    e.stopPropagation();

    // 2. Добавляем в Redux
    // dispatch(addToCart(product));

    // 3. Показываем визуальный эффект
    setIsAdded(true);
  };

  // Базовые стили
  const baseStyles = cn(
    "transition-all duration-300 active:scale-95 flex items-center justify-center gap-2",
    isAdded ? "bg-green-500 hover:bg-green-600 text-white" : "bg-black hover:bg-gray-800 text-white",
    className
  );

  // ВАРИАНТ 1: Маленькая кнопка (для карточки товара в списке)
  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        className={cn(baseStyles, "p-2.5 rounded-full shadow-sm")}
        aria-label="Добавить в корзину"
      >
        {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
      </button>
    );
  }

  // ВАРИАНТ 2: Большая кнопка (для страницы товара)
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