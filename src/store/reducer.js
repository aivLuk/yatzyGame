import * as actionTypes from './actionTypes';

const initialState = {
    currentDiceValues: [],
    lockedDice: [],
    locked: false,
    rollsLeft: 3,
    onePair: 0,
    fives: 0,
    chance: 0,
    onePairLocked: null,
    fivesLocked: null,
    chanceLocked: null,
    totalSum: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DICES_ROLLED:
            return {
                ...state,
                rollsLeft: state.rollsLeft - 1,
                locked: false,

            }
        case actionTypes.DICE_LOCKED:
            const updatedLockedDice = [...state.lockedDice];
            if (updatedLockedDice.includes(action.index)) {
                const indx = updatedLockedDice.indexOf(action.index);
                updatedLockedDice.splice(indx, 1);
            } else {
                updatedLockedDice.push(action.index)
            }
            return {
                ...state,
                lockedDice: updatedLockedDice,
                locked: true,
            }
        case actionTypes.CURRENT_VALUES_GENERATED:
            const copiedCurrentValues = [...action.curVals]
            const chanceSum = copiedCurrentValues.reduce((a, b) => a + b, 0);
            const filteredFives = copiedCurrentValues.filter(el => el === 5);
            const fivesSum = 5 * +filteredFives.length;
            const sortedValues = copiedCurrentValues.sort(function (a, b) { return b - a })
            const filteredOnePair = sortedValues.filter((el, i) => el === sortedValues[i + 1])
            let onePairSum = 0;
            if (typeof filteredOnePair[0] === "number") {
                onePairSum = filteredOnePair[0] * 2;
            }
            return {
                ...state,
                locked: true,
                currentDiceValues: action.curVals,
                chance: chanceSum,
                fives: fivesSum,
                onePair: onePairSum,
            }
        case actionTypes.FIVES_SELECTED: {
            let totSum = null;
            if (state.onePairLocked !== null && state.chanceLocked !== null) {
                totSum = state.chanceLocked + state.onePairLocked + state.fives
            }
            return {
                ...state,
                fivesLocked: state.fives,
                onePair: 0,
                chance: 0,
                fives: 0,
                rollsLeft: 3,
                lockedDice: [],
                locked: true,
                totalSum: totSum
            }
        }
        case actionTypes.ONE_PAIR_SELECTED: {
            let totSum = null;
            if (state.fivesLocked !== null && state.chanceLocked !== null) {
                totSum = state.fivesLocked + state.chanceLocked + state.onePair
            }
            return {
                ...state,
                onePairLocked: state.onePair,
                fives: 0,
                chance: 0,
                onePair: 0,
                rollsLeft: 3,
                lockedDice: [],
                locked: true,
                totalSum: totSum
            }
        }
        case actionTypes.CHANCE_SELECTED: {
            let totSum = null;
            if (state.onePairLocked !== null && state.fivesLocked !== null) {
                totSum = state.fivesLocked + state.onePairLocked + state.chance
            }
            return {
                ...state,
                chanceLocked: state.chance,
                onePair: 0,
                fives: 0,
                chance: 0,
                rollsLeft: 3,
                lockedDice: [],
                locked: true,
                totalSum: totSum
            }
        }
        default: return state;
    }
}

export default reducer;