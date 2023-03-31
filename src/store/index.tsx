import { configureStore } from "@reduxjs/toolkit";

import { snakeSlice } from "./snakeSlice";
import { appleSlice } from "./appleSlice";
import { speedSlice } from "./speedSlice";

const store = configureStore({
  reducer: {
    snakePos: snakeSlice.reducer,
    direction: snakeSlice.reducer,
    applePos: appleSlice.reducer,
    speed: speedSlice.reducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;