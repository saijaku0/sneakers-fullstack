import { Brand } from "../model/types";

interface Props {
  title: string;
  description: string;
  brand: Brand;
}

export const ProductInfo = ({ title, description, brand }: Props) => {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 font-medium mb-2">{brand.name}</span>
      <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        {description}
      </p>
    </div>
  );
};