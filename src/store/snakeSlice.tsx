import { createSlice } from '@reduxjs/toolkit';

import { DIRECTION_UP, DIRECTION_DOWN, DIRECTION_RIGHT, DIRECTION_LEFT } from '../utilities/constants';

const initialState = {
  snakePos: [
    {x: 8, y: 7, directionImg: 'up'},
    {x: 8, y: 8, directionImg: 'up'},
    {x: 8, y: 9, directionImg: 'up'},
  ],
  direction: DIRECTION_UP
}

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    setSnakePos(state, action) {
      state.snakePos = action.payload;
    },

    setDirection(state, action) {
      const strDirection: string = action.payload;
      
      if (strDirection === 'ArrowUp' || strDirection === 'KeyW') {
        state.direction = (state.direction.y !== DIRECTION_DOWN.y) ? DIRECTION_UP : DIRECTION_DOWN;
      }
      if (strDirection === 'ArrowDown' || strDirection === 'KeyS') {
        state.direction = (state.direction.y !== DIRECTION_UP.y) ?  DIRECTION_DOWN : DIRECTION_UP;
      }
      if (strDirection === 'ArrowLeft' || strDirection === 'KeyA') {
        state.direction = (state.direction.x !== DIRECTION_RIGHT.x) ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      if (strDirection === 'ArrowRight' || strDirection === 'KeyD') {
        state.direction = (state.direction.x !== DIRECTION_LEFT.x) ? DIRECTION_RIGHT : DIRECTION_LEFT;
      }
    }
  }
});

export const snakePosActions = snakeSlice.actions;


