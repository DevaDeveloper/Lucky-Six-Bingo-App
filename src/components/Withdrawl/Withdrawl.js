import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Withdrawl.module.css";
import { bingoActions } from "../../store/bingo-slice";
import { config } from "../Settings/Config";

const Withdrawl = () => {
  const dispatch = useDispatch();

  const withdrawl = useSelector((state) => state.bingo.withdrawnNumbers);
  const winningTickets = useSelector((state) => state.bingo.winningTickets);
  const ballTurn = useSelector((state) => state.bingo.ballTurn);
  let firstFiveNumbersSum = useSelector(
    (state) => state.bingo.firstFiveNumbersSum
  );

  const oddsArr = Object.values(config.odds);

  useEffect(() => {
    const timer = setTimeout(
      () => dispatch(bingoActions.startNumberWithdrawl()),
      100
    );
    return () => clearTimeout(timer);
  });

  console.log(withdrawl);
  if (winningTickets.length !== 0 && ballTurn >= 35) {
    console.log(winningTickets);
  }

  return (
    <div className={styles.withdrawingBalls}>
      <h1> Lucky Six Bingo</h1>
      <div className={styles.withdrawlBtn}>
        <button onClick={() => dispatch(bingoActions.startNumberWithdrawl())}>
          Zapocni izvlacenje
        </button>
        <button
          className={styles.newRound}
          onClick={() => dispatch(bingoActions.startNewRound())}
        >
          Sledeca runda
        </button>
      </div>
      <div className={styles.withdrawlHolder}>
        <ul className={styles.allOdds}>
          {oddsArr.map((odd) => (
            <li key={odd}>{odd > 10000 ? null : odd}</li>
          ))}
        </ul>
        <ul className={styles.balls}>
          {withdrawl.map((num) => (
            <li
              key={num}
              style={{
                backgroundColor: config.colors[num],
                color: config.textColor[num],
              }}
            >
              {num}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.firstFiveSum}>
        Zbir prvih 5 brojeva (122,5 +/-): {firstFiveNumbersSum}
      </div>
      <div>Prvi broj (24,5 +/-) {withdrawl[0]}</div>
    </div>
  );
};

export default Withdrawl;
