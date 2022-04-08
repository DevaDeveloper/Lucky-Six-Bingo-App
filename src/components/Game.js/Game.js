import React, { useEffect } from "react";
import Withdrawl from "../Withdrawl/Withdrawl";
import Settings from "../Settings/Settings";
import styles from "./Game.module.css";
import { useSelector, useDispatch } from "react-redux";
import { gameSliceActions } from "../../store/game-slice";

const Game = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.game.isPlaying);
  const ballTurn = useSelector((state) => state.bingo.ballTurn);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ballTurn >= 35) {
        dispatch(gameSliceActions.stopGame());
      }
      return () => clearTimeout(timer);
    }, 5000);
  }, [isPlaying, dispatch, ballTurn]);

  return (
    <div className={styles.holder}>
      {isPlaying && <Withdrawl />}
      {!isPlaying && <Settings />}
    </div>
  );
};

export default Game;
