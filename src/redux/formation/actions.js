export const ADD_TROOP_TO_FORMATION = "ADD_TROOP_TO_FORMATION";
export const REMOVE_TROOP_FROM_FORMATION = "REMOVE_TROOP_FROM_FORMATION";
export const SET_FORMATION = "SET_FORMATION";
export const EMPTY_FORMATION_BOARD = "EMPTY_FORMATION_BOARD";
export const SWAP_TROOP_SQUARES = "SWAP_TROOP_SQUARES";
export const MOVE_TROOP_TO_EMPTY_SQUARE = "MOVE_TROOP_TO_EMPTY_SQUARE";

export const addTroopToFormation = (square, troopToAdd) => ({
  type: ADD_TROOP_TO_FORMATION,
  payload: { square, troopToAdd },
});

export const removeTroopFromFormation = (square) => ({
  type: REMOVE_TROOP_FROM_FORMATION,
  payload: { square },
});

export const setFormation = (formation = {}) => ({
  type: SET_FORMATION,
  payload: { formation },
});

export const emptyFormationBoard = () => ({
  type: EMPTY_FORMATION_BOARD,
});

export const swapTroopSquares = ({ squareDrag, squareDrop }) => ({
  type: SWAP_TROOP_SQUARES,
  payload: { squareDrag, squareDrop },
});

export const moveTroopToEmptySquare = ({ squareDrag, squareDrop }) => ({
  type: MOVE_TROOP_TO_EMPTY_SQUARE,
  payload: { squareDrag, squareDrop },
});
