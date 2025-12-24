import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, value, ...props }, ref) => {
    // Проверяем, есть ли значение
    const hasValue = value !== undefined && value !== "";

    return (
      <div className="relative w-full">
        <input
          type={type}
          value={value}
          className={cn(
            "peer w-full border border-gray-300 rounded-xl px-3 py-3 outline-none transition-all bg-transparent",
            "focus:border-black focus:ring-1 focus:ring-black",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          placeholder=" "
          ref={ref}
          {...props}
        />

        {label && (
          <label
            className={cn(
              "absolute left-3 pointer-events-none transition-all duration-200 ease-out",
              "text-gray-500 font-medium",
              
              "-top-2.5 text-xs bg-white px-1", 

              !hasValue && [
                "peer-placeholder-shown:top-3.5", 
                "peer-placeholder-shown:text-base", 
                "peer-placeholder-shown:bg-white", 
                "peer-placeholder-shown:px-0", 
              ],

              "peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-black peer-focus:bg-white peer-focus:px-1"
            )}
          >
            {label}
          </label>
        )}

        {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";