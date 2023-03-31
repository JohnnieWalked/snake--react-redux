import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snakePos: [
    {x: 8, y: 7, directionImg: 'up'},
    {x: 8, y: 8, directionImg: 'up'},
    {x: 8, y: 9, directionImg: 'up'},
  ],
  direction: {x: 1, y: 0}
}

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    setSnakePos(state, action) {
      state.snakePos = action.payload;
    },
    setDirection(state, action) {
      switch(action.payload) {
        case 38: state.direction = {x: 0, y: -1}; break; /* up */
        case 40: state.direction = {x: 0, y: 1}; break; /* down */
        case 37: state.direction = {x: -1, y: 0}; break; /* left */
        case 39: state.direction = {x: 1, y: 0}; break; /* right */
      }
    }
  }
});

export const snakePosActions = snakeSlice.actions;


