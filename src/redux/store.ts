import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./questionSlice";
import titleSlice from "./titleSlice";

export const store = configureStore({
  reducer: {
    title: titleSlice,
    questions: questionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
