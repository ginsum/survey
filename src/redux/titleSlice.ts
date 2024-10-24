import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TitleState {
  title: string;
  description: string;
}

const initialState: TitleState = {
  title: "",
  description: "",
};

export const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    changeDesc: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const { changeTitle, changeDesc } = titleSlice.actions;

export default titleSlice.reducer;
