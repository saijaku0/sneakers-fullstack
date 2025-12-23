"use client";
import Link from "next/link";

export const RegisterForm = () => {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Создание аккаунта 🚀</h1>
        <p className="text-gray-500">Заполните данные для регистрации</p>
      </div>

      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Имя" className="w-full border rounded-xl p-3 outline-none focus:border-black transition" />
        <input type="email" placeholder="Email" className="w-full border rounded-xl p-3 outline-none focus:border-black transition" />
        <input type="password" placeholder="Пароль" className="w-full border rounded-xl p-3 outline-none focus:border-black transition" />
        
        <button className="bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition active:scale-95 mt-2">
          Зарегистрироваться
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