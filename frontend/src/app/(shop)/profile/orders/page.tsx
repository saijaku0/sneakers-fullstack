"use client";

import { useGetMyOrdersQuery } from "@/entities/cart/api/orderApi";
import Link from "next/link";
import { Package, Calendar, MapPin } from "lucide-react";

export default function MyOrdersPage() {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-10 text-center">
        <div className="animate-pulse">Загрузка истории заказов...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-10 text-center text-red-500">
        Не удалось загрузить заказы. Возможно, вы не авторизованы.
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">История заказов пуста</h1>
        <p className="text-gray-500 mb-6">Вы еще ничего не заказывали.</p>
        <Link href="/" className="text-black underline hover:no-underline">
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Мои заказы</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl p-6 shadow-sm bg-white">
            <div className="flex flex-wrap justify-between items-start border-b pb-4 mb-4 gap-4">
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Package size={16} /> Заказ #{order.id}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar size={16} /> 
                  {new Date(order.createdAt).toLocaleDateString()} 
                  <span className="text-gray-300 mx-1">|</span>
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold">${order.totalPrice}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mt-1">
                  {order.status || "В обработке"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center text-xs text-gray-400">
                      IMG
                    </div>
                    <div>
                      <p className="font-medium">{item.sneakerName}</p>
                      <p className="text-gray-500 text-xs">Размер: {item.size} EU</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>{item.quantity} x ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />
              <span>Доставка: {order.address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}