"use client"

import { ProductList } from "@/entities/product";
import { Container } from "@/shared/ui";
import { useMemo } from "react";
import { useGetProductsQuery } from "@/entities/product/api/productApi";
import { useAppSelector } from "@/shared/lib/store/redux";

export default function HomePage() {
  const { data: rawData, isLoading } = useGetProductsQuery();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const products = Array.isArray(rawData) ? rawData : rawData?.items || [];

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchQuery) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <Container>
      <Container className="mt-10">
        {searchQuery && (
          <h2 className="text-xl font-bold mb-4">
            Результаты поиска: "{searchQuery}"
          </h2>
        )}

        <ProductList products={filteredProducts} isLoading={isLoading} />

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 mt-10">
            Ничего не найдено :(
          </div>
        )}
      </Container>
    </Container>
  );
}
