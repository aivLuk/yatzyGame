import React from 'react';
import Dice1 from '../assets/dice-1.png';
import Dice2 from '../assets/dice-2.png';
import Dice3 from '../assets/dice-3.png';
import Dice4 from '../assets/dice-4.png';
import Dice5 from '../assets/dice-5.png';
import Dice6 from '../assets/dice-6.png';
import './Dice.css';

const Dice = props => {
    let dicePic = Dice1;
    if (props.diceValue === 2) {
        dicePic = Dice2;
    }
    if (props.diceValue === 3) {
        dicePic = Dice3;
    }
    if (props.diceValue === 4) {
        dicePic = Dice4;
    }
    if (props.diceValue === 5) {
        dicePic = Dice5;
    }
    if (props.diceValue === 6) {
        dicePic = Dice6;
    }

    let classTitle = "Dice"
    if (props.locked.includes(props.indx)) {
        classTitle = "DiceSelected"
    }

    return (
        <img
            className={classTitle}
            src={dicePic}
            onClick={() => props.clicked(props.diceValue, props.indx)} />
    );
}

export default Dice;
