import { createSlice } from '@reduxjs/toolkit';
import { CANVAS_SIZE, SCALE } from '../constants';

const initialState = {
  applePos: {x: 15, y: 15}
}

export const appleSlice = createSlice({
  name: 'applePos',
  initialState,
  reducers: {
    setApple(state, action) {
      const currentSnakePos: {x: number, y: number}[] = action.payload;
      let isAvailable;

      repeat: while (true) {
        const newApplePosX = Math.floor(Math.random() * CANVAS_SIZE.x / SCALE);
        const newApplePosY = Math.floor(Math.random() * CANVAS_SIZE.y / SCALE);

        currentSnakePos.forEach((item) => {
          if (item.x !== newApplePosX && item.y !== newApplePosY) {
            isAvailable = true;
          } else {
            isAvailable = false;
          }
        })
        
        if (!isAvailable) {
          continue repeat;
        } else {
          console.log(newApplePosX, newApplePosY);
          state.applePos = {
            x: newApplePosX,
            y: newApplePosY,
          }
          return;
        }
      }

    }
  }
});

export const appleActions = appleSlice.actions;