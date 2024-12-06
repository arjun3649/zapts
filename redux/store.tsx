import { configureStore } from "@reduxjs/toolkit";
 import addressReducer from "./addressSlice";
import cartReducer from "./cartSlice";
 import reorderReducer from "./reorderSlice"

export const store = configureStore({
  reducer: {
    address: addressReducer,
    cart: cartReducer,
    reorder:reorderReducer
    
  },
});
