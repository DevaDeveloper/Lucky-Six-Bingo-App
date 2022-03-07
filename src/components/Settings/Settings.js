import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bingoActions } from "../../store/bingo-slice";
import styles from "../Settings/Settings.module.css";

const Settings = (props) => {
  const dispatch = useDispatch();
  const bet = useSelector((state) => state.bingo.bet);
  const wonAmount = useSelector((state) => state.bingo.wonAmount);
  const winningTickets = useSelector((state) => state.bingo.winningTickets);

  const sameNums = [];
  const myNumbers = useSelector((state) => state.bingo.randomTicket);
  console.log(myNumbers);

  const betTicket = [];
  for (let num of myNumbers.values()) {
    betTicket.push(num);
  }

  const placeBet = (i) => {
    return (
      <button onClick={() => dispatch(bingoActions.changeBet(i))}>
        BAM {i}
      </button>
    );
  };
  const addMyTicket = (i) => {
    return (
      <span
        className={`${
          myNumbers.has(i) ? styles.pickedNumber : styles.pickNumber
        }`}
        onClick={() => dispatch(bingoActions.AddToMyTicket(i))}
      >
        {i}
      </span>
    );
  };

  return (
    <div className={styles.settingsHolder}>
      <h2>Settings</h2>
      <div className={styles.numberPickerHolder}>
        {addMyTicket(1)}
        {addMyTicket(2)}
        {addMyTicket(3)}
        {addMyTicket(4)}
        {addMyTicket(5)}
        {addMyTicket(6)}
        {addMyTicket(7)}
        {addMyTicket(8)}
        {addMyTicket(9)}
        {addMyTicket(10)}
        {addMyTicket(11)}
        {addMyTicket(12)}
        {addMyTicket(13)}
        {addMyTicket(14)}
        {addMyTicket(15)}
        {addMyTicket(16)}
        {addMyTicket(17)}
        {addMyTicket(18)}
        {addMyTicket(19)}
        {addMyTicket(20)}
        {addMyTicket(21)}
        {addMyTicket(22)}
        {addMyTicket(23)}
        {addMyTicket(24)}
        {addMyTicket(25)}
        {addMyTicket(26)}
        {addMyTicket(27)}
        {addMyTicket(28)}
        {addMyTicket(29)}
        {addMyTicket(30)}
        {addMyTicket(31)}
        {addMyTicket(32)}
        {addMyTicket(33)}
        {addMyTicket(34)}
        {addMyTicket(35)}
        {addMyTicket(36)}
        {addMyTicket(37)}
        {addMyTicket(38)}
        {addMyTicket(39)}
        {addMyTicket(40)}
        {addMyTicket(41)}
        {addMyTicket(42)}
        {addMyTicket(43)}
        {addMyTicket(44)}
        {addMyTicket(45)}
        {addMyTicket(46)}
        {addMyTicket(47)}
        {addMyTicket(48)}
      </div>
      <div className={styles.buttonsRandomNums}>
        {/* <input placeholder="unesi broj tiketa" name="tiketi"></input> */}
        <button
          onClick={() => dispatch(bingoActions.initializeTicketsSix(200))}
        >
          Generate random lucky six
        </button>
        {/* <button onClick={() => dispatch(bingoActions.initializeticketsSeven())}>
          {" "}
          Generate random lucky seven numbers
        </button> */}
      </div>

      <div className={styles.buttons}>
        <h4>Uplata:</h4>
        <span>{placeBet(1)}</span>
        <span>{placeBet(2)}</span>
        <span>{placeBet(5)}</span>
        <span>{placeBet(10)}</span>
      </div>
      <div className={styles.numbersList}>
        <div>
          <h3 className={styles.headingMiddle}>Pogodjeni brojevi:</h3>
          <ul>
            {sameNums.map((wnums) => (
              <li key={wnums}>{wnums}</li>
            ))}
          </ul>

          <ul className={styles.luckyTickets}>
            {winningTickets.map((ticket) => (
              <li key={ticket.id}>
                <span className={styles.luckyNums}>
                  Ticket Numbers:{" "}
                  {ticket.wonNumbers.map((number) => (
                    <li>{number}</li>
                  ))}
                </span>{" "}
                <br></br>
                <span>Won Amount: {ticket.wonAmount} BAM</span> <br></br>
                <span>Ticket ID: {ticket.id}</span> <br></br>
              </li>
            ))}
          </ul>

          <div className={styles.settingsInfo}>
            <p>Uplata BAM: {bet}</p>
            <p>Osvojeni iznos BAM: {wonAmount && wonAmount}</p>
          </div>
        </div>
        <h3>My Lucky Numbers</h3>
        <ul className={styles.myLuckyNumbers}>
          <li>{betTicket[0] ? betTicket[0] : 0}</li>
          <li>{betTicket[1] ? betTicket[1] : 0}</li>
          <li>{betTicket[2] ? betTicket[2] : 0}</li>
          <li>{betTicket[3] ? betTicket[3] : 0}</li>
          <li>{betTicket[4] ? betTicket[4] : 0}</li>
          <li>{betTicket[5] ? betTicket[5] : 0}</li>
          {/* {betTicket ? <li>{betTicket[6]} </li> : null} */}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
