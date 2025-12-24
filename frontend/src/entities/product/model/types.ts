export interface Brand {
  id: number;
  name: string;
}

export interface ProductStock {
  id: number;
  size: number;
  quantity: number;
}

export interface Sneaker {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: Brand;
  productStocks: ProductStock[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  brandId?: number;
}