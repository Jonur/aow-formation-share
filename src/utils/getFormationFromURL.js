import { troops } from "../data";
import { MAX_TROOP_LEVEL, SQUARES } from "./constants";

const getFormationFromURL = () => {
  const troopsFromURL = {};
  const urlParamHashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    ?.split("&");

  if (urlParamHashes.length) {
    let hash;
    let squareTroopData;

    for (var i = 0; i < urlParamHashes.length; i++) {
      hash = urlParamHashes[i]?.split("=");

      squareTroopData = hash?.[1]?.split(",");

      const isValidSquareNumber = +hash?.[0] >= 0 && +hash?.[0] <= SQUARES;
      const isValidTroopLevel =
        +squareTroopData?.[1] >= 1 && +squareTroopData?.[1] <= MAX_TROOP_LEVEL;
      const isValidTroop = troops.names.includes(
        unescape(squareTroopData?.[0])
      );

      if (isValidSquareNumber && isValidTroopLevel && isValidTroop) {
        troopsFromURL[hash?.[0]] = {
          level: squareTroopData[1],
          troop: unescape(squareTroopData[0]),
        };
      }
    }
  }

  return troopsFromURL;
};

export default getFormationFromURL;
