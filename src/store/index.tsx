import { configureStore } from "@reduxjs/toolkit";

import { snakePosSlice } from "./snakeSlice";
import { speedSlice } from "./speedSlice";

const store = configureStore({
  reducer: {
    snakePos: snakePosSlice.reducer,
    direction: snakePosSlice.reducer,
    speed: speedSlice.reducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;