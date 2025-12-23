import { cn } from "@/shared/lib/utils";
import { ProductStock } from "../model/types";

interface Props {
  price: number;
  stocks: ProductStock[];
}

export const ProductStockInfo = ({ price, stocks }: Props) => {
  const totalStock = stocks.reduce((acc, item) => acc + item.quantity, 0);
  const isOutOfStock = totalStock === 0;

  return (
    <>
      <div className="flex items-center justify-between border-t border-b py-6 mb-8">
        <div>
          <span className="block text-sm text-gray-500 mb-1">Цена:</span>
          <span className="text-3xl font-bold">${price}</span>
        </div>
        <div className="text-right">
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
              isOutOfStock ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            )}
          >
            {isOutOfStock ? "Нет в наличии" : "В наличии"}
          </span>
        </div>
      </div>

      {!isOutOfStock && (
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Доступные размеры:</h3>
          <div className="flex flex-wrap gap-2">
            {stocks
              .filter((s) => s.quantity > 0)
              .sort((a, b) => a.size - b.size)
              .map((stock) => (
                <div
                  key={stock.id}
                  className="border rounded-md px-4 py-2 text-sm font-medium cursor-default"
                  title={`Осталось: ${stock.quantity} шт.`}
                >
                  {stock.size} EU
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};