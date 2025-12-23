"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "../api/productApi";
import { AddToCartButton } from "@/features/addToCartButton";

export const ProductList = () => {
  const router = useRouter();
  const { data: products, error, isLoading } = useGetProductsQuery();
  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-128 w-[310px] bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center py-10">
        Error loading products
      </div>
    );

  const handleProductClick = (id: number) => {
    router.push(`/sneakers/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.items.map((product) => {
        const isOutOfStock = product.productStocks.every(
          (s) => s.quantity === 0
        );

        return (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="group relative rounded-xl bg-white p-4 shadow-sm hover:shadow-md hover:cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="aspect-square flex items-center justify-center rounded-lg bg-gray-50 text-6xl">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Нет изображения</span>
                </div>
              )}

              {isOutOfStock && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                  <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-auto pt-5">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <h4 className="text-sm text-gray-600">{product.brand.name}</h4>
            </div>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-lg font-bold">${product.price}</span>

              {isOutOfStock ? (
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  Нет в наличии
                </span>
              ) : (
                <div onClick={(e) => e.stopPropagation()}>
                  <AddToCartButton product={product} variant="icon" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
