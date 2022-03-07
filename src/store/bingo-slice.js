import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { getRandNumber, initializeTicketsSixNumbers } from "./getRandom";
import { generateRandom } from "./getRandom";
import { consoleTesting } from "./getRandom";
import { config } from "../components/Settings/Config";
import { v4 as uuid } from "uuid";

enableMapSet();

const initialState = {
  isPlaying: false,
  allNumbersSet: new Set(),
  tickets: [],
  randomTicket: new Set(),
  ballTurn: 1,
  randomBall: 0,
  lastDrawn: 0,
  withdrawnNumbers: [],
  winningTickets: [],
  firstFiveNumbersArr: [],
  firstFiveNumbersSum: 0,
  bet: 1,
  testingNum: 10,
};

export const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    changeBet(state, action) {
      state.bet = action.payload;
    },
    generateRandom,

    consoling(state, action) {
      // good example
      const one = consoleTesting();
      state.testingNum = state.testingNum + one;
      return console.log(state.testingNum);
      //state.testingNum = state.testingNum + action.payload; XXX bad example
    },

    initializeTicketsSix(state, action) {
      for (let i = 0; i < action.payload; i++) {
        const oneTicket = initializeTicketsSixNumbers();
        state.tickets.push({
          id: uuid(),
          numbers: oneTicket,
          counter: 0,
          wonAmount: 0,
          myDrawnNumbersArr: [],
        });
      }
      for (let ticket of state.tickets) {
        console.log(ticket.id, ticket.numbers);
      }
    },

    AddToMyTicket(state, action) {
      if (state.tickets.size < 6 && !state.tickets.has(action.payload)) {
        state.tickets.add(action.payload);
      } else if (state.tickets.size <= 6 && state.tickets.has(action.payload)) {
        state.tickets.delete(action.payload);
      }
    },
    addAllNumbersToFullSet(state, action) {
      for (let i = 1; i <= 48; i++) {
        state.allNumbersSet.add(i);
      }
      console.log(state.allNumbersSet);
    },

    startNumberWithdrawl(state, action) {
      state.randomBall = generateRandom();

      if (state.tickets.length !== 0) {
        if (state.ballTurn > 35) {
          alert("Round is over!");
        } else {
          while (!state.allNumbersSet.has(state.randomBall)) {
            state.randomBall = generateRandom();
          }
          if (state.allNumbersSet.has(state.randomBall)) {
            state.ballTurn++;
            state.withdrawnNumbers.push(state.randomBall);
            state.allNumbersSet.delete(state.randomBall);
            state.lastDrawn = state.randomBall;
            for (let ticket of state.tickets) {
              if (ticket.numbers.has(state.randomBall)) {
                ticket.counter++;
                ticket.myDrawnNumbersArr.push(state.randomBall);
                console.log(`This is current ticket counter ${ticket.counter}`);
                if (ticket.counter === 6) {
                  ticket.wonAmount =
                    state.bet * config.odds[state.ballTurn - 1];
                  state.winningTickets.push({
                    id: ticket.id,
                    wonNumbers: ticket.myDrawnNumbersArr,
                    wonAmount: ticket.wonAmount,
                  });
                }
              }
            }
          }
          for (let ticket of state.winningTickets) {
            console.log(ticket);
          }
        }
      } else {
        alert("Please pick your numbers");
      }
    },

    // startNumberWithdrawl(state, action) {
    //   const randNum = () => {
    //     state.randomBall = Math.floor(Math.random() * 48) + 1;
    //   };

    //   if (state.tickets.size !== 0) {
    //     if (state.ballTurn > 35) {
    //       console.log("ROUND IS OVER");
    //       alert("ROUND IS OVER");
    //       return;
    //     } else {
    //       randNum();
    //       while (!state.allNumbersSet.has(state.randomBall)) {
    //         randNum();
    //       }
    //       if (state.firstFiveNumbersArr.length < 5) {
    //         state.firstFiveNumbersArr.push(state.randomBall);
    //       }
    //       if (state.firstFiveNumbersArr.length >= 5) {
    //         state.firstFiveNumbersSum = state.firstFiveNumbersArr.reduce(
    //           (curVal, val) => {
    //             return curVal + val;
    //           }
    //         );
    //       }
    //       console.log(state.randomBall);
    //       console.log(`broj izvacenja u ovom kolu je: ${state.ballTurn}`);
    //       if (state.allNumbersSet.has(state.randomBall)) {
    //         state.withdrawnNumbers.push(state.randomBall);
    //         state.allNumbersSet.delete(state.randomBall);
    //         if (state.tickets.has(state.randomBall)) {
    //           state.countWinner++;
    //           state.ballTurn++;
    //           state.winningNumbers.push(state.randomBall);
    //           console.log(
    //             ` broj izvucenih kuglica : ${
    //               state.countWinner
    //             }  i broj izvlacenja: ${state.ballTurn - 1}`
    //           );
    //           if (state.countWinner === 6) {
    //             console.log("We have the winner");
    //             state.wonAmount = state.bet * state.odds[state.ballTurn - 1];
    //           }
    //         } else {
    //           state.ballTurn++;
    //         }
    //       }
    //     }
    //   } else {
    //     alert("Please pick your numbers!");
    //   }
    // },

    startNewRound(state, action) {
      state.allNumbersSet = new Set();
      for (let i = 1; i <= 48; i++) {
        state.allNumbersSet.add(i);
      }
      console.log(state.allNumbersSet);
      state.tickets = [];
      state.ballTurn = 1;
      state.randomBall = 0;
      state.withdrawnNumbers = [];
      state.winningNumbers = [];
      state.bet = 1;
      state.firstFiveNumbersSum = 0;
      state.firstFiveNumbersArr = [];
      state.winningTickets = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRandNumber, (state, action) => {
      state.withdrawnNumbers.push(action.payload);
    });
  },
});

export const bingoActions = bingoSlice.actions;
export default bingoSlice;
