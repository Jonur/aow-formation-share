import { createSelector } from "reselect";
import { appSelectors } from "../app";

export const getGameData = ({ gameData }) => gameData;

export const getTroops = createSelector(getGameData, ({ troops }) => troops);

export const getTroopGrades = createSelector(
  getGameData,
  ({ grades }) => grades
);

export const getClasses = createSelector(getGameData, ({ classes }) => classes);

export const getHeroes = createSelector(getGameData, ({ heroes }) => heroes);

export const getPower = createSelector(getGameData, ({ power }) => power);

export const getIncreasableTroopCounts = createSelector(
  getGameData,
  ({ increasableTroopCounts }) => increasableTroopCounts
);

export const getHeroesIdHashMap = createSelector(getHeroes, (heroes) =>
  heroes.reduce((acc, hero) => ({ ...acc, [hero.id]: hero }), {})
);

export const getTroopHashMap = createSelector(getTroops, (troops) =>
  troops.reduce((acc, troop) => ({ ...acc, [troop.name]: troop }), {})
);

export const getTroopIdHashMap = createSelector(getTroops, (troops) =>
  troops.reduce((acc, troop) => ({ ...acc, [troop.id]: troop }), {})
);

export const getTroopNames = createSelector(getTroops, (troops) =>
  troops.map(({ name }) => name).sort()
);

export const getLocalisedTroops = createSelector(
  getTroops,
  appSelectors.getLocalisedContent,
  (troops, content) =>
    troops
      .map(({ id }) => ({ id, name: content.gameData.troops[id] }))
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
);

export const getLocalisedHeroes = createSelector(
  getHeroes,
  appSelectors.getLocalisedContent,
  (heroes, content) =>
    heroes
      .map(({ id }) => ({ id, name: content.gameData.heroes[id] }))
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
);

export const getMaxTroopLevel = createSelector(
  getGameData,
  ({ board }) => board.maxLevel
);

export const getMaxHeroLevel = createSelector(
  getGameData,
  ({ board }) => board.maxHeroLevel
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

export const getHeroLevelsReversed = createSelector(
  getMaxHeroLevel,
  (maxLevel) =>
    Array.from(new Array(maxLevel))
      .map((num, index) => index + 1)
      .reverse()
);

export const getBoardSquaresGrid = createSelector(getBoardSquares, (squares) =>
  Array.from(new Array(squares)).map((square, index) => index + 1)
);

export const getTroopGradesHashMap = createSelector(getTroopGrades, (grades) =>
  grades.reduce((acc, grade) => ({ ...acc, [grade.id]: grade }), {})
);
