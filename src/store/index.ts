import { configureStore } from "@reduxjs/toolkit";
import threadSlice from "./threadSlice";

export const store = configureStore({
  reducer: {
    thread: threadSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
