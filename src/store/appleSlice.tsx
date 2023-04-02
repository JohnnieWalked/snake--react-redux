import { createSlice } from '@reduxjs/toolkit';
import { CANVAS_SIZE, SCALE } from '../utilities/constants';

const initialState = {
  applePos: {x: 15, y: 15}
}

export const appleSlice = createSlice({
  name: 'applePos',
  initialState,
  reducers: {
    /* when snake eats an apple - generates new XY for apple */
    setApple(state, action) {
      const currentSnakePos: {x: number, y: number}[] = action.payload;
      const newApplePosY = Math.floor(Math.random() * (CANVAS_SIZE.y / SCALE));
      let newApplePosX: number;

      function calcAppleX(): number {
        while (true) {
          newApplePosX = Math.floor(Math.random() * (CANVAS_SIZE.x / SCALE));
          if (currentSnakePos.some((item) => item.x === newApplePosX)) {
            calcAppleX();
          } else {
            return newApplePosX;
          }
        }
      }

      state.applePos = { x: calcAppleX() , y: newApplePosY};
    },
  }
});

export const appleActions = appleSlice.actions;