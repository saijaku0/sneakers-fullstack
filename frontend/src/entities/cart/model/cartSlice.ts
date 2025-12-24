import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sneaker } from "@/entities/product/model/types";

export interface CartItem {
  id: string;           
  product: Sneaker;     
  quantity: number;     
  size: number;         
  productStockId: number; 
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const loadFromStorage = (): CartState => {
  if (typeof window === "undefined") return { items: [], totalPrice: 0 };
  
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { items: [], totalPrice: 0 };
  } catch (e) {
    console.error("Ошибка чтения корзины", e);
    return { items: [], totalPrice: 0 };
  }
};

const initialState: CartState = loadFromStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Sneaker; stockId: number; size: number }>) => {
      const { product, stockId, size } = action.payload;
      
      const uniqueId = `${product.id}-${stockId}`;
      
      const existingItem = state.items.find((item) => item.id === uniqueId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: uniqueId,
          product,
          quantity: 1,
          productStockId: stockId,
          size,
        });
      }

      state.totalPrice = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      
      state.totalPrice = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    changeQuantity: (state, action: PayloadAction<{ id: string; type: "plus" | "minus" }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      
      if (item) {
        if (action.payload.type === "plus") {
          item.quantity++;
        } else if (action.payload.type === "minus" && item.quantity > 1) {
          item.quantity--;
        }
      }

      state.totalPrice = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;