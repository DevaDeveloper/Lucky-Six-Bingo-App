import React, { Fragment, useEffect } from "react";
import "./App.css";
import Settings from "./components/Settings/Settings";
import Withdrawl from "./components/Withdrawl/Withdrawl";
import { bingoActions } from "./store/bingo-slice";
import { useDispatch } from "react-redux";

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
          <Withdrawl />
          <Settings />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
