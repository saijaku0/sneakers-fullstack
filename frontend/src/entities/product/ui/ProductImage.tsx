import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface Props {
  src?: string;
  alt: string;
  className?: string;
}

export const ProductImage = ({ src, alt, className }: Props) => {
  return (
    <div className={cn("relative bg-gray-50 rounded-3xl aspect-square flex items-center justify-center overflow-hidden", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-8"
          priority
        />
      ) : (
        <span className="text-4xl">👟</span>
      )}
    </div>
  );
};