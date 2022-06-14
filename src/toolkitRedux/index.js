import { configureStore } from "@reduxjs/toolkit";
import valutesReducer from "./valutesSlice";

export const store = configureStore({
  reducer: {
    valutes: valutesReducer,
  },
});
