import React from "react";
import { useDispatch } from "react-redux";
import { bingoActions } from "../../store/bingo-slice";

const TicketBalls = (props) => {
  const dispatch = useDispatch();

  return (
    <span
      className={`${
        props.myNumbers.has(props.i)
          ? props.styles.pickedNumber
          : props.styles.pickNumber
      }`}
      onClick={() => dispatch(bingoActions.AddToMyTicket(props.i))}
    >
      {props.i}
    </span>
  );
};

export default TicketBalls;
