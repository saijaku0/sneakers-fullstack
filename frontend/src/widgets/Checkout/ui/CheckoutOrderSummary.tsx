"use client";

import { useAppSelector } from "@/shared/lib/store/redux";
import { useCreateOrderMutation } from "@/entities/cart/api/orderApi";
import { CheckoutItem } from "@/entities/checkout";

export const CheckoutOrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const [_, { isLoading }] = useCreateOrderMutation({
    fixedCacheKey: "shared-checkout",
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
      <h3 className="text-xl font-bold mb-6">Ваш заказ</h3>

      <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
        {cartItems.map((item) => (
          <CheckoutItem key={item.id} item={item} />
        ))}
      </div>

      <div className="border-t pt-4 mb-6 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Товары ({cartItems.length})</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Доставка</span>
          <span>Бесплатно</span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4">
          <span>Итого</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      <button
        form="checkout-form"
        type="submit"
        disabled={isLoading}
        className="w-full hover:cursor-pointer bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition active:scale-95 disabled:opacity-50"
      >
        {isLoading ? "Обработка..." : `Оплатить $${totalPrice}`}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        Нажимая кнопку, вы соглашаетесь с условиями обработки данных
      </p>
    </div>
  );
};