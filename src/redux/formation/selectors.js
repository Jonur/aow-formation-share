import { createSelector } from "reselect";
import { gameDataSelectors } from "../gameData";

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
