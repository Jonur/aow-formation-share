import { createSelector } from "reselect";
import { MAX_BARRACKS_ENTRIES } from "../../utils/constants";

export const getBarracks = ({ barracks }) => barracks;

export const getBarracksTroops = createSelector(getBarracks, (barracks) => {
  const barracksTroops = [];
  if (barracks.size) {
    barracks.forEach((count, key) => {
      const [troopId, level] = key.split(",");
      barracksTroops.push({ count, troopId, level });
    });
    return barracksTroops;
  } else {
    return [];
  }
});

export const getBarracksLinkParams = createSelector(getBarracks, (barracks) => {
  if (barracks.size) {
    let barracksLinkParams = "&b=";

    barracks.forEach(
      (value, key) => (barracksLinkParams += `${key},${value}-`)
    );

    const lastChar = barracksLinkParams[barracksLinkParams.length - 1];
    const shouldRemoveTrailingDash = lastChar === "-";
    if (shouldRemoveTrailingDash) {
      barracksLinkParams = barracksLinkParams.slice(0, -1);
    }

    return barracksLinkParams;
  } else {
    return "";
  }
});

export const getIsBarracksMaxedOut = createSelector(
  getBarracks,
  (barracks) => barracks.size >= MAX_BARRACKS_ENTRIES
);
