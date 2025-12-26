import Image from "next/image";
import { CartItem } from "@/entities/cart/model/types";

interface CheckoutItemProps {
  item: CartItem;
}

export const CheckoutItem = ({ item }: CheckoutItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
        {item.product.imageUrl && (
          <Image
            src={item.product.imageUrl}
            alt={item.product.title}
            fill
            className="object-cover"
          />
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
  );
};
