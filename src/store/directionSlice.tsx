import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  direction: [0, -1]
}

export const directionSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    setDirection(state, action) {
      state.direction = action.payload;
    }
  }
});

export const directionActions = directionSlice.actions;