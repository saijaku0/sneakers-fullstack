"use client";
import ProductPage from "@/views/Product/ui/ProductPage";
import { use } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function SneakerPage({ params }: Props) {
  const { id } = use(params);

  const productId = Number(id);
  return <ProductPage id={productId} />;
}
