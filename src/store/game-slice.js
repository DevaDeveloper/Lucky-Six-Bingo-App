import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  allSetNumbrs: new Set(),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state, action) {
      state.isPlaying = true;
    },
    stopGame(state, action) {
      state.isPlaying = false;
    },
    addAllNumbersToFullSet(state, action) {
      for (let i = 1; i <= 48; i++) {
        state.allNumbersSet.add(i);
      }
      console.log(state.allNumbersSet);
    },
  },
});

export default gameSlice;
export const gameSliceActions = gameSlice.actions;
