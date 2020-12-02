import { createSelector } from "reselect";

export const getGameData = ({ gameData }) => gameData;

export const getTroops = createSelector(getGameData, ({ troops }) => troops);

export const getTroopNames = createSelector(getTroops, (troops) =>
  troops.map(({ name }) => name).sort()
);

export const getMaxTroopLevel = createSelector(
  getGameData,
  ({ board }) => board.maxLevel
);

export const getBoardSquares = createSelector(
  getGameData,
  ({ board }) => board.squares
);

export const getTroopLevelsReversed = createSelector(
  getMaxTroopLevel,
  (maxLevel) =>
    Array.from(new Array(maxLevel))
      .map((num, index) => index + 1)
      .reverse()
);

export const getBoardSquaresGrid = createSelector(getBoardSquares, (squares) =>
  Array.from(new Array(squares)).map((square, index) => index + 1)
);
