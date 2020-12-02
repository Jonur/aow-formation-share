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

export const getTroopLevelsReversed = createSelector(
  getMaxTroopLevel,
  (maxLevel) =>
    Array.from(new Array(maxLevel))
      .map((num, index) => index + 1)
      .reverse()
);
