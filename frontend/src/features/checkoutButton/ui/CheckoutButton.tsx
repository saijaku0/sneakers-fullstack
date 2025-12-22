"use client";

import { useRouter } from "next/navigation";
//import { Button } from "@/shared/ui/button/Button";

export const CheckoutButton = () => {
  const router = useRouter();
  const handleCheckout = () => {
    // Here we navigate to the checkout page, better check login status leter
    router.push("/order/checkout");
  };

  return (
    <button
      className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition active:scale-[0.98]"
      onClick={handleCheckout}
    >
      Оформить заказ
    </button>
  );
};
