import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ScoringTable from './ScoringTable/ScoringTable';
import Dice from './Dice/Dice';
import * as actionTypes from './store/actionTypes';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const currentValues = useSelector(state => state.currentDiceValues);
  const selectedDices = useSelector(state => state.lockedDice);
  const rollsLeft = useSelector(state => state.rollsLeft);
  const locked = useSelector(state => state.locked);
  const totalSum = useSelector(state => state.totalSum);


  const rollDiceHandler = () => {
    dispatch({ type: actionTypes.DICES_ROLLED })
  }

  const diceSelectedHandler = (diceVal, index, current) => {
    dispatch({ type: actionTypes.DICE_LOCKED, value: diceVal, index: index, currValues: current })
  }


  const dice = Array.from({ length: 5 }).map(d => 5);
  let diceField = dice.map(el => < img key={Math.random()} />)

  let currValues = [];
  if (rollsLeft < 3 && rollsLeft > -1) {
    diceField = dice.map((el, i) => {
      let value = currentValues[i];
      if (!selectedDices.includes(i) && !locked) {
        value = Math.ceil(Math.random() * 6);
      }
      currValues.push(value);
      return <Dice
        key={Math.random()}
        diceValue={value}
        indx={i}
        clicked={diceSelectedHandler}
        locked={selectedDices} />
    })
    if (!locked) {
      dispatch({ type: actionTypes.CURRENT_VALUES_GENERATED, curVals: currValues })
    }
  }


  return (
    <div className="App">
      <div className="DiceField">
        {diceField && diceField}
      </div>
      <div className="ButtonContainer">
        <span>Rolls Left: {rollsLeft}</span>
        <button disabled={rollsLeft === 0 || totalSum !== null} onClick={rollDiceHandler}>Roll Dice</button>
      </div>
      <ScoringTable />
    </div>
  );
}

export default App;
