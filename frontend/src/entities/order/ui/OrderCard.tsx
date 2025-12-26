import { Calendar, MapPin, Package } from "lucide-react";
import { Order } from "../model/types";
import { OrderItems } from "./OrderItem";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="rounded-2xl p-6 shadow-sm bg-white">
      <div className="flex flex-wrap justify-between items-start border-b pb-4 mb-4 gap-4">
        <div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Package size={16} /> Заказ #{order.id}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <Calendar size={16} />
            {new Date(order.createdAt).toLocaleDateString()}
            <span className="text-gray-300 mx-1">|</span>
            {new Date(order.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
          <OrderItems key={idx} item={item} />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t flex items-center gap-2 text-sm text-gray-500">
        <MapPin size={16} />
        <span>Доставка: {order.address}</span>
      </div>
    </div>
  );
};
