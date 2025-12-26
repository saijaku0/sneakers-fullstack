"use client";

import Image from "next/image";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { OrderItem } from "@/entities/order/model/types";
import { cn } from "@/shared/lib/utils";

type CartItemWithSize = OrderItem & { size?: number };

interface CartListProps {
  items: CartItemWithSize[];
  actionSlot?: React.ReactNode;
  onRemoveItem?: (index: number) => void;
  onUpdateQuantity?: (index: number, type: "plus" | "minus") => void;
}

export const CartList = ({
  items,
  actionSlot,
  onRemoveItem,
  onUpdateQuantity,
}: CartListProps) => {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <ShoppingCart size={48} className="mb-4 text-gray-300" />
        <p>Корзина пуста</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[60vh] md:max-h-[300px]">
        {items.map((item, index) => {
          const currentStockInfo = item.product.productStocks.find(
            (s) => s.size === item.size
          );
          const maxAvailable = currentStockInfo
            ? currentStockInfo.quantity
            : 99;
          const isMaxLimitReached = item.quantity >= maxAvailable;

          return (
            <div
              key={index}
              className="flex items-center gap-4 border-b pb-3 last:border-0"
            >
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
                {item.product.imageUrl ? (
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No img</span>
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-1">
                <div>
                  <h4 className="font-medium text-sm leading-tight line-clamp-2">
                    {item.product.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Размер:{" "}
                    <span className="text-black font-medium">
                      {item.size} EU
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Цена: ${item.price}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                    <button
                      onClick={() => onUpdateQuantity?.(index, "minus")}
                      disabled={item.quantity <= 1}
                      className="text-gray-500 hover:text-black disabled:opacity-30 transition p-0.5"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="text-xs font-semibold w-3 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => onUpdateQuantity?.(index, "plus")}
                      disabled={isMaxLimitReached}
                      className={cn(
                        "transition p-0.5",
                        isMaxLimitReached
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:text-black"
                      )}
                      title={
                        isMaxLimitReached
                          ? `Максимум доступно: ${maxAvailable} шт.`
                          : ""
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="font-bold text-sm">
                    ${item.price * item.quantity}
                  </span>
                </div>
              </div>

              {onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-gray-400 hover:text-red-500 transition p-1"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t pt-4 bg-white">
        <div className="flex justify-between items-center text-lg font-bold mb-4">
          <span>Итого:</span>
          <span>${totalPrice}</span>
        </div>

        <div className="mt-2">{actionSlot}</div>
      </div>
    </div>
  );
};
