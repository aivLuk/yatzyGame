import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../store/actionTypes';
import './ScoringTable.css';

const ScoringTable = () => {
    const dispatch = useDispatch();
    const onePair = useSelector(state => state.onePair)
    const fives = useSelector(state => state.fives)
    const chance = useSelector(state => state.chance)
    const onePairLocked = useSelector(state => state.onePairLocked)
    const fivesLocked = useSelector(state => state.fivesLocked)
    const chanceLocked = useSelector(state => state.chanceLocked)
    const totalSum = useSelector(state => state.totalSum)

    const fivesSelectedHandler = () => {
        dispatch({ type: actionTypes.FIVES_SELECTED })
    }
    const onePairSelectedHandler = () => {
        dispatch({ type: actionTypes.ONE_PAIR_SELECTED })
    }
    const chanceSelectedHandler = () => {
        dispatch({ type: actionTypes.CHANCE_SELECTED })
    }

    return (
        <div className="ScoringTable">
            <div className="FivesContainer">
                <div>Fives</div>
                <div onClick={fivesLocked === null ? fivesSelectedHandler : undefined}>{fives}</div>
                <div className="ValueSelected">{fivesLocked}</div>
            </div>
            <div className="OnePairContainer">
                <div>One Pair</div>
                <div onClick={onePairLocked === null ? onePairSelectedHandler : undefined}>{onePair}</div>
                <div className="ValueSelected">{onePairLocked}</div>
            </div>
            <div>
                <div className="ChanceContainer">Chance</div>
                <div onClick={chanceLocked === null ? chanceSelectedHandler : undefined}>{chance}</div>
                <div className="ValueSelected">{chanceLocked}</div>
            </div>
            <div className="SumContainer">
                <div>Total Sum</div>
                <div>{totalSum}</div>
            </div>
        </div>
    );
}

export default ScoringTable;