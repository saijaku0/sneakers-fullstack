import { Sneaker } from "@/entities/product/model/types";

export interface OrderItem {
  sneakerId: number;
  quantity: number;
  sneakerName: string;
  size: number;
  price: number;
  product: Sneaker;
}

export interface Order {
  id: number;
  createdAt: string;
  totalPrice: number;
  address: string;
  status?   : string;
  items: OrderItem[];
}

export interface CreateOrderItemDto {
  sneakerId: number;
  quantity: number;
  size: number;
}

export interface CreateOrderRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email?: string;
  items: CreateOrderItemDto[];
}