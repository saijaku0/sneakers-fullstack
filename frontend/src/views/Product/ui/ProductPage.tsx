"use client";

import { ProductDetails } from "@/widgets/ProductDetails";

export default function ProductPage({ id }: { id: number }) {
  return <ProductDetails productId={id} />;
}
