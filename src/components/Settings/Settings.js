import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bingoActions } from "../../store/bingo-slice";
import styles from "../Settings/Settings.module.css";
import { v4 as uuid } from "uuid";
import { gameSliceActions } from "../../store/game-slice";
import TicketBalls from "./TicketBalls";

const Settings = (props) => {
  const dispatch = useDispatch();
  const bet = useSelector((state) => state.bingo.bet);
  const myNumbers = useSelector((state) => state.bingo.manualTicket);
  const winningTickets = useSelector((state) => state.bingo.winningTickets);
  const allTicketsPlayed = useSelector((state) => state.bingo.tickets);
  const withdrawl = useSelector((state) => state.bingo.withdrawnNumbers);
  const [playXTickets, setPlayXTickets] = useState(1);
  const numsToAdd = [];
  for (let i = 1; i <= 48; i++) {
    numsToAdd.push(i);
  }

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

  return (
    <div className={styles.settingsHolder}>
      <h2>Settings</h2>
      <div className={styles.outterHolder}>
        <div className={styles.innerHolder}>
          <div className={styles.numberPickerHolder}>
            {numsToAdd.map((i) => (
              <TicketBalls
                key={i}
                myNumbers={myNumbers}
                styles={styles}
                i={i}
              />
            ))}
          </div>
          <div className={styles.buttonsRandomNums}>
            <button onClick={() => dispatch(bingoActions.AddToOtherTickets())}>
              Uplati manuelni tiket
            </button>
            <div className={styles.inputForTickets}>
              <input
                placeholder="unesi broj tiketa"
                name="tiketi"
                onChange={(e) => setPlayXTickets(e.target.value)}
              ></input>
              <button
                onClick={() =>
                  dispatch(bingoActions.initializeTicketsSix(playXTickets))
                }
              >
                Generate random lucky six
              </button>
            </div>
          </div>

          <div className={styles.buttons}>
            <h4>Uplata:</h4>
            <span>{placeBet(1)}</span>
            <span>{placeBet(2)}</span>
            <span>{placeBet(5)}</span>
            <span>{placeBet(10)}</span>
          </div>

          <div className={styles.playedTicketsPara}>
            <p>Uplata BAM: {bet}</p>
            <p>Broj odigranih tiketa: {allTicketsPlayed.length}</p>
          </div>

          <div className={styles.roundButtons}>
            <button onClick={() => dispatch(gameSliceActions.startGame())}>
              Round about to start
            </button>
            <button onClick={() => dispatch(bingoActions.startNewRound())}>
              Pick new numbers
            </button>
          </div>
        </div>
        <div className={styles.numbersList}>
          <h4>Izvuceni brojevi:</h4>
          <ul className={styles.guessedNumbers}>
            {withdrawl.map((num) => (
              <li key={uuid()}>{num}</li>
            ))}
          </ul>
          <div>
            <h3 className={styles.headingMiddle}>
              Pogodjeni tiketi: {winningTickets.length}
            </h3>

            <ul className={styles.luckyTickets}>
              {winningTickets.map((ticket) => (
                <li key={ticket.id}>
                  <span className={styles.luckyNums}>
                    Ticket Numbers:
                    {ticket.wonNumbers.map((num) => {
                      return (
                        <div className={styles.winningNumsDiv} key={uuid()}>
                          {num}
                        </div>
                      );
                    })}
                  </span>{" "}
                  <br></br>
                  <span>
                    Won Amount: {ticket.wonAmount} BAM, Uplata: {ticket.bet}
                  </span>{" "}
                  <br></br>
                  <span>Ticket ID: {ticket.id}</span> <br></br>
                </li>
              ))}
            </ul>
          </div>
          <h3>My Lucky Numbers</h3>
          <ul className={styles.myLuckyNumbers}>
            <li>{betTicket[0] ? betTicket[0] : 0}</li>
            <li>{betTicket[1] ? betTicket[1] : 0}</li>
            <li>{betTicket[2] ? betTicket[2] : 0}</li>
            <li>{betTicket[3] ? betTicket[3] : 0}</li>
            <li>{betTicket[4] ? betTicket[4] : 0}</li>
            <li>{betTicket[5] ? betTicket[5] : 0}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
