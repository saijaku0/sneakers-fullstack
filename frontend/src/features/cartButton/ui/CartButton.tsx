import { cn } from "@/shared/lib/utils";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  count?: number;
  onClick: () => void;
  className?: string;
}

export function CartButton({ count = 0, onClick, className }: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-2 hover:bg-gray-100 rounded-full transition-colors",
        className
      )}
    >
      <ShoppingCart className="w-6 h-6" />

      {count > 0 && (
        <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
