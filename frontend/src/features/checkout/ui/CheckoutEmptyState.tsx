import Link from "next/link";

export const CheckoutEmptyState = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста 😔</h1>
      <Link href="/" className="text-blue-600 hover:underline">
        Вернуться к покупкам
      </Link>
    </div>
  );
};
