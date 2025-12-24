"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/lib/store/redux";
import { toast } from "sonner";

interface Props {
  className?: string;
  onClose?: () => void;
}

export const CheckoutButton = ({ className, onClose }: Props) => {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleClick = () => {
    if (cartItems.length === 0) {
      toast.error("Корзина пуста");
      return;
    }

    if (onClose) onClose();

    router.push("/checkout");
  };

  return (
    <button
      onClick={handleClick}
      disabled={cartItems.length === 0}
      className={`w-full hover:cursor-pointer bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      Оформить заказ
    </button>
  );
};
