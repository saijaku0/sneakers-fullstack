"use client";

import Link from "next/link";
import { User, LogIn, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/redux";
import { logout } from "@/entities/session/model/sessionSlice";

export const AuthButton = () => {
  const isAuth = useAppSelector((state) => state.session.isAuth);
  const user = useAppSelector((state) => state.session.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAuth) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end text-sm">
            <span className="font-bold">{user?.username}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
        
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border">
            <User size={20} />
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition hover:cursor-pointer"
          title="Выйти"
        >
          <LogOut size={20} />
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white hover:bg-gray-800 transition active:scale-95 shadow-lg shadow-black/20"
    >
      <LogIn size={18} />
      <span className="hidden sm:inline font-medium">Войти</span>
    </Link>
  );
};