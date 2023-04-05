import { createSlice } from '@reduxjs/toolkit';

import { CANVAS_SIZE, SCALE } from '../utilities/constants';

const initialState = {
  applePos: {x: 15, y: 15}
}

export const appleSlice = createSlice({
  name: 'applePos',
  initialState,
  reducers: {
    setApple(state, action) {
      const currentSnakePos: {x: number}[] = action.payload;
      let newApplePosY = Math.floor(Math.random() * (CANVAS_SIZE.y / SCALE)),
          newApplePosX;
      let appleSpawnInSnake = true;

      while (appleSpawnInSnake) {
        appleSpawnInSnake = false;
        newApplePosX = Math.floor(Math.random() * (CANVAS_SIZE.x / SCALE));
        for (let item of currentSnakePos) {
          if (newApplePosX === item.x) {
            console.log('food spawned above snake... retry')
            appleSpawnInSnake = true;
          } else {
            state.applePos.x = newApplePosX;
            state.applePos.y = newApplePosY;
            break;
          }
        }
      }
    }
  }
});

export const appleActions = appleSlice.actions;