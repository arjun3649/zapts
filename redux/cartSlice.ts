import { Product } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// For updating quantity
interface UpdateQuantityPayload {
  id: number;
  quantity: number;
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product & { quantity: number }>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Type-safe selector
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export default cartSlice.reducer;