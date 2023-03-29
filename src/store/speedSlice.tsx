import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  speed: null
}

export const speedSlice = createSlice({
  name: 'speed',
  initialState,
  reducers: {
    setSpeed(state, action) {
      state.speed = action.payload;
    }
  }
})

export const speedActions = speedSlice.actions;