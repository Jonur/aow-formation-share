import { createSelector } from "reselect";
import { gameDataSelectors } from "../gameData";
import { heroSelectors } from "../hero";

export const getFormation = ({ formation }) => formation;

export const getIsFormationEmpty = createSelector(
  getFormation,
  (formation) => !Object.keys(formation).length
);

export const getFormationLinkParams = createSelector(
  getFormation,
  gameDataSelectors.getTroopIdHashMap,
  (formation, troopHashMap) =>
    Object.keys(formation).reduce(
      (acc, square) =>
        `${acc}&${square}=${troopHashMap[formation[square].troop].id},${
          formation[square].level
        }`,
      ""
    )
);

export const getFormationPower = createSelector(
  getFormation,
  heroSelectors.getHeroData,
  gameDataSelectors.getTroopIdHashMap,
  gameDataSelectors.getHeroesIdHashMap,
  gameDataSelectors.getPower,
  (formation, hero, troopIdHashMap, heroesIdHashMap, power) => {
    const heroPower = hero.id
      ? power[heroesIdHashMap[hero.id].grade].hero[+hero.level - 1]
      : 0;

    const troopsPower = Object.values(formation).reduce((acc, troop) => {
      const troopData = troopIdHashMap[troop.troop];
      const troopGrade = troopData.gradedAs || troopData.grade;
      const troopPower = power[troopGrade].troop[+troop.level - 1];
      return acc + troopPower;
    }, 0);

    return heroPower + troopsPower;
  }
);

export const getFormationCount = createSelector(
  getFormation,
  heroSelectors.getHeroData,
  gameDataSelectors.getTroopIdHashMap,
  (formation, hero, troopIdHashMap) => {
    const heroNumber = hero.id ? 1 : 0;

    const troopsNumber = Object.values(formation).reduce((acc, troop) => {
      return acc + troopIdHashMap[troop.troop].count;
    }, 0);

    return heroNumber + troopsNumber;
  }
);
