import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ContainerInterface {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerInterface) {
  return (
    <div
      className={cn(
        "container mx-auto w-full",
        "px-4 md:px-8 lg:px-16",
        className
      )}
    >
      {children}
    </div>
  );
}
