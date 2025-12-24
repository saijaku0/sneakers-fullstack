"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAppSelector } from "@/shared/lib/store/redux";
import { CheckoutForm } from "@/features/checkout/ui/CheckoutForm";
import { useCreateOrderMutation } from "@/entities/cart/api/orderApi";

export default function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  
  const [_, { isLoading }] = useCreateOrderMutation({
    fixedCacheKey: "shared-checkout", 
  });

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста 😔</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Вернуться к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className=" min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition">
          <ArrowLeft size={20} />
          Назад в магазин
        </Link>

        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm h-fit">
             <CheckoutForm />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-6">Ваш заказ</h3>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      {item.product.imageUrl && (
                        <Image src={item.product.imageUrl} alt="" fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-2">{item.product.title}</p>
                      <p className="text-xs text-gray-500">Размер: {item.size}</p>
                      <p className="text-sm font-bold mt-1">
                        {item.quantity} x ${item.product.price}
                      </p>
                    </div>
                  </div>
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
          </div>

        </div>
      </div>
    </div>
  );
}