// import React from "react";

// const Testing = () => {
//   console.log("testing..");

//   const allNumbersSet = new Set();
//   const myTicket = new Set();
//   let ballTurn = 1;
//   let countWinner = 0;
//   const initialMyTicketInSet = () => {
//     while (myTicket.size < 6) {
//       let rand = Math.floor(Math.random() * 48) + 1;
//       myTicket.add(rand);
//     }
//     console.log(myTicket);
//   };

//   const initialAllNumbersInSet = () => {
//     for (let i = 1; i <= 48; i++) {
//       allNumbersSet.add(i);
//     }
//   };

//   initialAllNumbersInSet();
//   initialMyTicketInSet();

//   function startNumberWithdrawl() {
//     while (ballTurn < 36) {
//       let rand = Math.floor(Math.random() * 48) + 1;
//       console.log(rand);
//       console.log(`broj izvacenja u ovom kolu je: ${ballTurn}`);
//       if (allNumbersSet.has(rand)) {
//         allNumbersSet.delete(rand);
//         if (myTicket.has(rand)) {
//           countWinner++;
//           ballTurn++;
//           console.log(
//             ` broj izvucenih kuglica : ${countWinner}  i broj izvlacenja: ${
//               ballTurn - 1
//             }`
//           );
//           if (countWinner === 6) {
//             console.log("We have the winner");
//           }
//         } else {
//           ballTurn++;
//         }
//       } else {
//         ballTurn++;
//       }
//     }
//   }
//   for (let num of myTicket.values()) {
//     console.log(num);
//   }
//   startNumberWithdrawl();

//   return <div>Testing..</div>;
// };

// export default Testing;
