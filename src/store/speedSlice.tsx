import { createSlice } from '@reduxjs/toolkit';

import { snakeInitialSpeed } from '../utilities/constants';

interface Ispeed {
  speed: null | number,
  currentSpeed: null | number,
}

const initialState: Ispeed = {
  speed: null,
  currentSpeed: snakeInitialSpeed
}

export const speedSlice = createSlice({
  name: 'speed',
  initialState,
  reducers: {
    setSpeed(state, action) {
      if (!action.payload) {
        state.currentSpeed = state.speed;
        state.speed = action.payload;
      } else {
        state.speed = state.currentSpeed;
      }
    },
    increaseSpeed(state, action) {
      if (action.payload > 50) {
        state.speed = 70;
      } else if (action.payload > 100) {
        state.speed = 50;
      }      
    },
    restoreSpeed(state) {
      state.speed = snakeInitialSpeed;
    }
  }
})

export const speedActions = speedSlice.actions;