import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRandNumber = createAsyncThunk("asyncNum", async () => {
  setTimeout(() => {
    let rand = Math.floor(Math.random() * 48) + 1;
    console.log(`"asyncThunkFunctionTesting" ${rand}`);
  }, 1000);
});

export const allTics = [];

export const consoleTesting = () => {
  return 5;
};

export const generateRandom = () => Math.floor(Math.random() * 48) + 1;

export const initializeTicketsSixNumbers = () => {
  let random;
  const ticketNums = new Set();

  while (ticketNums.size < 6) {
    random = generateRandom();
    if (!ticketNums.has(random)) {
      ticketNums.add(random);
    } else {
      random = generateRandom();
    }
  }

  return ticketNums;
};
