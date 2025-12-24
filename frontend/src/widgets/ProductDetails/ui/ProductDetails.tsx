"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useGetProductByIdQuery } from "@/entities/product/api/productApi";
import { ProductImage } from "@/entities/product/ui/ProductImage";
import { ProductInfo } from "@/entities/product/ui/ProductInfo";
import { ProductStockInfo } from "@/entities/product/ui/ProductStockInfo";
import { AddToCartButton } from "@/features/addToCartButton/ui/AddToCardButton";
import { ProductDetailsSkeleton } from "@/entities/product";
import { ProductStock } from "@/entities/product/model/types";
import { useState } from "react";

interface Props {
  productId: number;
}

export const ProductDetails = ({ productId }: Props) => {
  const router = useRouter();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);
  const [selectedStock, setSelectedStock] = useState<ProductStock | null>(null);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError || !product)
    return <div className="p-10 text-center text-red-500">Товар не найден</div>;

  const isOutOfStock = product.productStocks.every((s) => s.quantity === 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-500 hover:text-black mb-8 transition-colors hover:cursor-pointer"
      >
        <ArrowLeft className="mr-2" size={20} />
        Назад в каталог
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImage src={product.imageUrl} alt={product.title} />

        <div className="flex flex-col justify-center">
          <ProductInfo
            title={product.title}
            description={product.description}
            brand={product.brand}
          />

          <ProductStockInfo
            price={product.price}
            stocks={product.productStocks}
            selectedStockId={selectedStock?.id}
            onSelect={setSelectedStock}
          />

          <div className="flex gap-4">
            <div className="w-full md:w-auto md:min-w-[200px]">
              {isOutOfStock ? (
                <button
                  disabled
                  className="w-full py-3 px-6 rounded-xl font-medium bg-gray-200 text-gray-400"
                >
                  Раскуплено
                </button>
              ) : (
                <AddToCartButton
                  product={product}
                  variant="full"
                  currentStock={selectedStock}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
