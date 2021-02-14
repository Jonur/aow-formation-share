import { createSelector } from "reselect";

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
