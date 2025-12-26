"use client";

import { Search, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/redux";
import { setSearchQuery, clearSearch } from "@/features/search/model/searchSlice";

export const HeaderSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    dispatch(setSearchQuery(value));
  };

  const handleClear = () => {
    dispatch(clearSearch());
  };

  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
        <Search size={18} />
      </div>

      <input
        type="text"
        placeholder="Поиск кроссовок..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-10 text-sm outline-none transition-all border border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 placeholder:text-gray-400"
      />

      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};