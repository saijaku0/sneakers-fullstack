"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/shared/lib/store/redux";
import { setToken } from "@/entities/session/model/sessionSlice";
import { useLoginMutation } from "../api/authApi";
import { Input } from "@/shared/ui";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setToken(data.token));
      router.push("/");
    } catch (err) {
      console.error("Ошибка входа:", err);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Вход</h1>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
          Неверный логин или пароль
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Пароль"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={isLoading}
          className="bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition active:scale-95 disabled:opacity-50 mt-2"
        >
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
      </form>

      <div className="text-center mt-6 text-sm text-gray-500">
        Нет аккаунта?{" "}
        <Link
          href="/register"
          className="text-black font-semibold hover:underline"
        >
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
