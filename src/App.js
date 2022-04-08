import React, { Fragment, useEffect } from "react";
import "./App.css";
import { bingoActions } from "./store/bingo-slice";
import { useDispatch } from "react-redux";
import Game from "./components/Game.js/Game";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bingoActions.addAllNumbersToFullSet());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="App">
        <div className="holder">
          {" "}
          <Game />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
