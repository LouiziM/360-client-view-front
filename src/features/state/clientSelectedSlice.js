import { createSlice } from "@reduxjs/toolkit";

const clientSelectedSlice = createSlice({
  name: "clientSelected",
  initialState: { clientSelected: null },
  reducers: {
    setClientSelected: (state, action) => {
      state.clientSelected = action.payload;
    }
  },
});

export const { setClientSelected } = clientSelectedSlice.actions;

export default clientSelectedSlice.reducer;