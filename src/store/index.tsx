import { configureStore } from "@reduxjs/toolkit";

import { snakeSlice } from "./snakeSlice";
import { appleSlice } from "./appleSlice";
import { speedSlice } from "./speedSlice";
import { scoreSlice } from "./scoreSlice";

const store = configureStore({
  reducer: {
    snakePos: snakeSlice.reducer,
    direction: snakeSlice.reducer,
    applePos: appleSlice.reducer,
    speed: speedSlice.reducer,
    score: scoreSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;