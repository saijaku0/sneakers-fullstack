import { Sneaker } from "@/entities/product/model/types";

export interface CartItem {
  id: string;           
  product: Sneaker;     
  quantity: number;     
  size: number;         
  productStockId: number; 
}



