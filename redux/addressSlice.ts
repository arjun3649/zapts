import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddressState {
  title: string;
}

const initialState: AddressState = {
  title: "Select Location",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;