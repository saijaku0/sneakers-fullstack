"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/redux";
import { clearCart } from "@/entities/cart/model/cartSlice";
import { useCreateOrderMutation } from "@/entities/cart/api/orderApi";
import { Input } from "@/shared/ui/input/Input";
import { toast } from "sonner";

export const CheckoutForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.session.user);
  const isAuth = useAppSelector((state) => state.session.isAuth);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    const orderItems = cartItems.map((item) => ({
      sneakerId: item.product.id,
      size: item.size,
      quantity: item.quantity,
    }));

    const orderData = {
      items: orderItems,
      ...formData,
    };

    console.log("🚀 Payload (Fixed):", orderData);

    try {
      await createOrder(orderData).unwrap();
      dispatch(clearCart());
      toast.success("Заказ оформлен!");
      router.push("/profile/orders");
    } catch (error: any) {
      console.error("Order error:", error);

      if (typeof error.data === "string") {
        toast.error(error.data, {
          duration: 5000,
          description: "Пожалуйста, уменьшите количество товара в корзине.",
        });
      } else if (error.data?.errors) {
        const errorMsg = Object.values(error.data.errors).flat().join(", ");
        toast.error("Ошибка данных", { description: errorMsg });
      } else {
        toast.error("Не удалось оформить заказ", {
          description: "Попробуйте позже или свяжитесь с поддержкой.",
        });
      }
    }
  };

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Контактные данные</h2>

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Имя"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Фамилия"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="Телефон"
          name="phoneNumber"
          type="tel"
          placeholder="+380..."
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Доставка</h2>
        <Input
          label="Адрес доставки (Город, улица, отделение)"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="hidden" />
    </form>
  );
};
