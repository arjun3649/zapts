import { configureStore } from "@reduxjs/toolkit";
 import addressReducer from "./addressSlice";
 import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
     address: addressReducer,
     cart: cartReducer,
    
  },
});
