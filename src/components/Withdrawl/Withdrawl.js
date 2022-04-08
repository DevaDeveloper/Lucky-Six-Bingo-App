import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Withdrawl.module.css";
import { bingoActions } from "../../store/bingo-slice";
import { config } from "../Settings/Config";
import { v4 as uuid } from "uuid";
import OneBall from "./OneBall";

const Withdrawl = () => {
  const dispatch = useDispatch();
  const withdrawl = useSelector((state) => state.bingo.withdrawnNumbers);
  const ballTurn = useSelector((state) => state.bingo.ballTurn);

  const oddsArr = Object.values(config.odds);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ballTurn <= 35) {
        dispatch(bingoActions.startNumberWithdrawl());
        dispatch(bingoActions.checkForNumber());
        dispatch(bingoActions.checkForWinningTickets());
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [ballTurn, dispatch, withdrawl]);

  let firstFive = withdrawl.slice(0, 6).reduce((acc, x) => {
    return acc + x;
  }, 0);

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
            <OneBall config={config} num={num} key={uuid()} />
          ))}
        </ul>
      </div>

      <div className={styles.firstFiveSum}>
        Zbir prvih 5 brojeva (122,5 +/-): {withdrawl.length > 6 ? firstFive : 0}
      </div>
      <div>Prvi broj (24,5 +/-) {withdrawl[0]}</div>
    </div>
  );
};

export default Withdrawl;
