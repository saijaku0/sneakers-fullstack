"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/shared/ui/input/Input"; 
import { useRegisterMutation } from "../api/authApi";

export const RegisterForm = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await register(formData).unwrap();
      
      router.push("/login"); 
    } catch (err) {
      console.error("Ошибка регистрации:", err);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Создание аккаунта 🚀</h1>
        <p className="text-gray-500">Заполните данные для регистрации</p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
          Ошибка регистрации. Возможно, такой email уже занят.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            name="firstName"
            label="Имя"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            name="lastName"
            label="Фамилия"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          name="password"
          type="password"
          label="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        
        <button
          disabled={isLoading}
          className="bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition active:scale-95 disabled:opacity-50 mt-2"
        >
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>

      <div className="text-center mt-6 text-sm text-gray-500">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-black font-semibold hover:underline">
          Войти
        </Link>
      </div>
    </div>
  );
};