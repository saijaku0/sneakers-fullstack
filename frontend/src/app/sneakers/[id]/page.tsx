"use client";

import Image from "next/image";
import { use } from "react";
import { useGetProductByIdQuery } from "@/entities/product/api/productApi";
import { AddToCartButton } from "@/features/addToCartButton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function SneakerPage({ params }: Props) {
  const router = useRouter();

  const { id } = use(params);

  const productId = Number(id);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-[400px] bg-gray-200 rounded-2xl"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
            <div className="h-4 bg-gray-200 w-full rounded"></div>
            <div className="h-4 bg-gray-200 w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Товар не найден 😔</h1>
        <button
          onClick={() => router.back()}
          className="text-blue-500 hover:underline"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  const totalStock = product.productStocks.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const isOutOfStock = totalStock === 0;

  return (
    <div className="container mx-auto px-4 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-500 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2" size={20} />
        Назад в каталог
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-contain p-8 rounded-2xl"
              priority
            />
          ) : (
            <span className="text-4xl">👟</span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-gray-500 font-medium mb-2">
            {product.brand.name}
          </span>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            {product.title}
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            {!isOutOfStock && (
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Доступные размеры:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.productStocks
                    .filter((stock) => stock.quantity > 0)
                    .sort((a, b) => a.size - b.size)
                    .map((stock) => (
                      <div
                        key={stock.id}
                        className="border rounded-md px-4 py-2 text-sm font-medium hover:border-black cursor-pointer transition"
                        title={`Осталось: ${stock.quantity} шт.`}
                      >
                        {stock.size} EU
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-b py-6 mb-8">
            <div>
              <span className="block text-sm text-gray-500 mb-1">Цена:</span>
              <span className="text-3xl font-bold">${product.price}</span>
            </div>
            <div className="text-right">
              <span
                className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                  isOutOfStock
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                )}
              >
                {isOutOfStock ? "Нет в наличии" : "В наличии"}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full md:w-auto md:min-w-[200px]">
              <AddToCartButton product={product} variant="full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
