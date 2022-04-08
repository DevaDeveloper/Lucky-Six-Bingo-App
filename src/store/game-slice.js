import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  firstFiveNumbersArr: [],
  firstFiveNumbersSum: 0,
  winningTickets: [],
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
    firstFiveNumsSum(state, action) {
      state.firstFiveNumbersSum = action.payload;
    },
  },
});

export default gameSlice;
export const gameSliceActions = gameSlice.actions;
