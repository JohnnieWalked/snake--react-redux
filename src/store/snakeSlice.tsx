import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snakePos: [
    [8, 7],
    [8, 8],
    [8, 9]
  ],
  direction: [1, 0]
}

export const snakePosSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    setSnakePos(state, action) {
      state.snakePos = action.payload;
    },
    setDirection(state, action) {
      switch(action.payload) {
        case 38: state.direction = [0, -1]; break; /* up */
        case 40: state.direction = [0, 1]; break; /* down */
        case 37: state.direction = [-1, 0]; break; /* left */
        case 39: state.direction = [1, 0]; break; /* right */
      }
    }
  }
});

export const snakePosActions = snakePosSlice.actions;


