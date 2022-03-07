import { configureStore } from "@reduxjs/toolkit";
import bingoReducer from "./bingo-slice";
import gameSlice from "./game-slice";
import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  reducer: { bingo: bingoReducer.reducer, game: gameSlice.reducer },
});
