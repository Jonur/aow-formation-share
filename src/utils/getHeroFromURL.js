import getUrlParamHashes from "./getUrlParamHashes";

const getHeroFromURL = (heroesIdHashMap, maxHeroLevel) => {
  const urlParamHashes = getUrlParamHashes();

  const heroInURL = urlParamHashes
    .find((hash) => hash?.split("=")?.[0] === "h")
    ?.split("=")?.[1];

  if (heroInURL) {
    const [heroId, heroLevel] = heroInURL.split("-");

    const isValidHero = !!heroesIdHashMap[heroId];
    const isValidHeroLevel = +heroLevel >= 1 && +heroLevel <= maxHeroLevel;

    if (isValidHero && isValidHeroLevel) {
      return (
        isValidHero && isValidHeroLevel && { id: heroId, level: heroLevel }
      );
    }
  }
};

export default getHeroFromURL;
