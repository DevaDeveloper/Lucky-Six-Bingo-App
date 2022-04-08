import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { getRandNumber, initializeTicketsSixNumbers } from "./getRandom";
import { generateRandom } from "./getRandom";
import { config } from "../components/Settings/Config";
import { v4 as uuid } from "uuid";

enableMapSet();

const initialState = {
  manualTicket: new Set(),
  allNumbersSet: new Set(),
  tickets: [],
  ballTurn: 1,
  randomBall: 0,
  lastDrawn: 0,
  withdrawnNumbers: [],
  winningTickets: [],
  bet: 1,
};

// change bet amount
const changeBet = (state, action) => {
  state.bet = action.payload;
};

// Generate X number of tickets
const initializeTicketsSix = (state, action) => {
  for (let i = 0; i < action.payload; i++) {
    const oneTicket = initializeTicketsSixNumbers();
    state.tickets.push({
      id: uuid(),
      numbers: oneTicket,
      counter: 0,
      wonAmount: 0,
      bet: state.bet,
      myDrawnNumbersArr: [],
    });
  }
  for (let ticket of state.tickets) {
    console.log(ticket.id, ticket.numbers);
  }
};

// Add 48 numbers to withdrawl from
const addAllNumbersToFullSet = (state, action) => {
  for (let i = 1; i <= 48; i++) {
    state.allNumbersSet.add(i);
  }
};

// Withdraw number and push it to withdrawl array
const startNumberWithdrawl = (state, action) => {
  state.randomBall = generateRandom();
  if (state.tickets.length !== 0) {
    if (state.ballTurn > 35) {
      alert("Round is over!");
    } else {
      while (!state.allNumbersSet.has(state.randomBall)) {
        state.randomBall = generateRandom();
      }
      if (state.allNumbersSet.has(state.randomBall)) {
        state.allNumbersSet.delete(state.randomBall);
        state.lastDrawn = state.randomBall;
        state.withdrawnNumbers.push(state.randomBall);
        state.ballTurn++;
      }
    }
  } else {
    alert("Please pick your numbers");
  }
};

//check for withdrawn number
const checkForNumber = (state, action) => {
  for (let ticket of state.tickets) {
    if (ticket.numbers.has(state.randomBall)) {
      ticket.numbers.delete(state.randomBall);
      ticket.myDrawnNumbersArr.push(state.randomBall);
      ticket.counter++;
    }
  }
};

//check for winning tickets
const checkForWinningTickets = (state, action) => {
  for (let ticket of state.tickets) {
    if (ticket.counter === 6) {
      ticket.wonAmount = ticket.bet * config.odds[state.ballTurn - 1];
      state.winningTickets.push({
        id: ticket.id,
        wonNumbers: ticket.myDrawnNumbersArr,
        wonAmount: ticket.wonAmount,
        bet: ticket.bet,
      });
      ticket.counter++;
    }
  }
};

//reset round stats
const startNewRound = (state, action) => {
  state.allNumbersSet = new Set();
  for (let i = 1; i <= 48; i++) {
    state.allNumbersSet.add(i);
  }

  state.tickets = [];
  state.ballTurn = 1;
  state.randomBall = 0;
  state.lastDrawn = 0;
  state.withdrawnNumbers = [];
  state.winningTickets = [];
  state.bet = 1;
};

// Adding manual numbers to ticket
const AddToMyTicket = (state, action) => {
  if (state.manualTicket.size < 6 && !state.manualTicket.has(action.payload)) {
    state.manualTicket.add(action.payload);
  } else if (state.manualTicket.has(action.payload)) {
    state.manualTicket.delete(action.payload);
  }
  console.log(state.manualTicket);
};

// Adding manual ticket to tickets array
const AddToOtherTickets = (state, action) => {
  if (state.manualTicket.size === 6) {
    state.tickets.push({
      id: uuid(),
      numbers: state.manualTicket,
      counter: 0,
      wonAmount: 0,
      myDrawnNumbersArr: [],
      bet: state.bet,
    });
    state.manualTicket = new Set();
  } else {
    return alert("You must pick 6 numbers for one ticket to proceed!");
  }
};

export const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    //change bet amount
    changeBet,
    // Generate random number
    generateRandom,

    //Generate X number of tickets
    initializeTicketsSix,

    // Generate all numbers to new Set
    addAllNumbersToFullSet,

    //withdraw number and push it to withdrawl array
    startNumberWithdrawl,

    //check for withdrawn number
    checkForNumber,

    // Add numbers manually to ticket
    AddToMyTicket,

    // Check winning tickets
    checkForWinningTickets,

    // Reset round stats
    startNewRound,

    // Add manually choosen ticket to other tickets
    AddToOtherTickets,

    extraReducers: (builder) => {
      builder.addCase(getRandNumber, (state, action) => {
        state.withdrawnNumbers.push(action.payload);
      });
    },
  },
});

export const bingoActions = bingoSlice.actions;
export default bingoSlice;
