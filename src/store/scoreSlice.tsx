import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  score: 0,
  highScore: 0
}

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore(state, action) {
      if (action.payload === 'restart') {
        state.score = 0;
      } else {
        state.score += action.payload;
      }
    },
    setHighScore(state) {
      state.highScore = Number(window.localStorage.getItem('highScore'));
    }
  }
})

export const scoreActions = scoreSlice.actions;