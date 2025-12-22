"use client";
import { useEffect, ReactNode, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { createPortal } from "react-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  title,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 w-full rounded-t-2xl bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out sm:max-h-[85vh]", // На мобилках на весь низ
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </>,
    document.body
  );
}
