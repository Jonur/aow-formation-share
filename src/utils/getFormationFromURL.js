const getFormationFromURL = (
  troopNames,
  troopHashMap,
  maxTroopLevel,
  boardSquares
) => {
  const troopsFromURL = {};
  const urlParamHashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    ?.split("&");

  if (urlParamHashes.length) {
    let hash;
    let squareTroopData;

    const urlVersion = +urlParamHashes
      .find((hash) => hash?.split("=")?.[0] === "v")
      ?.split("=")?.[1];

    for (var i = 0; i < urlParamHashes.length; i++) {
      hash = urlParamHashes[i]?.split("=");
      squareTroopData = hash?.[1]?.split(",");

      const isValidSquareNumber = +hash?.[0] >= 0 && +hash?.[0] <= boardSquares;
      const isValidTroopLevel =
        +squareTroopData?.[1] >= 1 && +squareTroopData?.[1] <= maxTroopLevel;
      let isValidTroop = false;
      let troop;

      if (urlVersion === 2) {
        isValidTroop = !!troopHashMap[squareTroopData?.[0]];
        troop = isValidTroop && troopHashMap[squareTroopData[0]].id;
      } else {
        isValidTroop = troopNames.includes(unescape(squareTroopData?.[0]));
        troop = isValidTroop && unescape(squareTroopData[0]);
      }

      if (isValidSquareNumber && isValidTroopLevel && isValidTroop) {
        troopsFromURL[hash?.[0]] = {
          level: squareTroopData[1],
          troop,
        };
      }
    }
  }

  return troopsFromURL;
};

export default getFormationFromURL;
