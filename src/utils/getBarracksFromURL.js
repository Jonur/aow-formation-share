import { MAX_BARRACKS_ENTRIES } from "./constants";
import getUrlParamHashes from "./getUrlParamHashes";

const getBarracksFromURL = (troopHashMap, maxTroopLevel) => {
  const urlParamHashes = getUrlParamHashes();

  const barracksInURL = urlParamHashes
    .find((hash) => hash?.split("=")?.[0] === "b")
    ?.split("=")?.[1];

  const urlBarracks = new Map();
  if (barracksInURL) {
    const barracksEntries = barracksInURL.split("-");

    barracksEntries.forEach((entry) => {
      const entryData = entry.split(",");
      const isValidEntry = entryData.length === 3;

      if (isValidEntry) {
        const isValidTroop = !!troopHashMap[entryData[0]];
        const isValidTroopLevel =
          +entryData[1] >= 1 && +entryData[1] <= maxTroopLevel;
        const isValidTroopCount =
          +entryData[2] >= 1 && +entryData[2] <= MAX_BARRACKS_ENTRIES;
        const isValidData =
          isValidTroop && isValidTroopLevel && isValidTroopCount;

        if (isValidData) {
          const key = [entryData[0], entryData[1]].toString();
          urlBarracks.set(key, entryData[2]);
        }
      }
    });
  }

  return urlBarracks;
};

export default getBarracksFromURL;
