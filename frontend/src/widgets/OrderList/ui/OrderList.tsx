import { OrderCard } from "@/entities/order";
import { useGetMyOrdersQuery } from "@/entities/order/api/orderApi";
import Link from "next/link";

export function OrderList() {
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
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
