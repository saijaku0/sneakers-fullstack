"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAppSelector } from "@/shared/lib/store/redux";
import { CheckoutForm } from "@/features/checkout";
import { CheckoutOrderSummary } from "@/widgets/Checkout";
import { CheckoutEmptyState } from "@/features/checkout";

export default function CheckoutPage() {
  const itemsCount = useAppSelector((state) => state.cart.items.length);

  if (itemsCount === 0) {
    return <CheckoutEmptyState />;
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition"
        >
          <ArrowLeft size={20} />
          Назад в магазин
        </Link>

        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm h-fit">
            <CheckoutForm />
          </div>

          <div className="lg:col-span-1">
            <CheckoutOrderSummary />
          </div>
          
        </div>
      </div>
    </div>
  );
}