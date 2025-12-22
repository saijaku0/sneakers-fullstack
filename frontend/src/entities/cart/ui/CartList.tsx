import { ShoppingCart } from "lucide-react";
import { X } from "lucide-react";

// type definitions for cart items better in models later
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartListProps {
  items: CartItem[];
  actionSlot?: React.ReactNode;
}

export const CartList = ({ items, actionSlot }: CartListProps) => {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

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
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b pb-3 last:border-0"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-2xl">
              {item.image}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm md:text-base">{item.name}</h4>
              <p className="text-sm text-gray-500">${item.price}</p>
            </div>
            <button className="text-red-500 hover:text-red-700">
              <X />
            </button>
          </div>
        ))}
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
