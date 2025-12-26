import { OrderItem } from "../model/types";

interface OrderItemProps {
  item: OrderItem;
}

export const OrderItems = ({ item }: OrderItemProps) => {
  return (
    <div className="flex justify-between items-center text-sm">
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
        <p>
          {item.quantity} x ${item.price}
        </p>
      </div>
    </div>
  );
};
