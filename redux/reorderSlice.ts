import { Product } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface ReorderState {
  items: Product[];
}

const initialState: ReorderState = {
  items: [],
};

const reorderSlice = createSlice({
  name: "reorder",
  initialState,
  reducers: {
    toggleReorder: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If item already exists, remove it
        state.items.splice(existingItemIndex, 1);
      } else {
        // If item doesn't exist, add it
        state.items.push(action.payload);
      }
    },
    
  
  },
});

export const { toggleReorder} = 
  reorderSlice.actions;



export default reorderSlice.reducer;