"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/shared/lib/store/redux";
import { setCredentials } from "@/entities/session/model/sessionSlice";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Imitate an API call
    setTimeout(() => {
      dispatch(
        setCredentials({
          user: { username: "Ivan", email: "test@test.ru" },
          token: "fake-jwt-token",
        })
      );
      setLoading(false);
      router.push("/"); 
    }, 1000);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">С возвращением! 👋</h1>
        <p className="text-gray-500">Введите данные для входа</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            required
            type="email"
            placeholder="example@mail.com"
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>
        
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
           <input
            required
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>

        <button
          disabled={loading}
          className="bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? "Вход..." : "Войти в аккаунт"}
        </button>
      </form>

      <div className="text-center mt-6 text-sm text-gray-500">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-black font-semibold hover:underline">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};