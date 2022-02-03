import getUrlParamHashes from "./getUrlParamHashes";
import { MAX_LEVEL_FOR_STARS, MIN_LEVEL_FOR_STARS } from "./constants";

const getHeroFromURL = (
  heroesIdHashMap,
  maxHeroLevel,
  maxHeroStars,
  legendaryHeroes
) => {
  const urlParamHashes = getUrlParamHashes();

  const heroInURL = urlParamHashes
    .find((hash) => hash?.split("=")?.[0] === "h")
    ?.split("=")?.[1];

  if (heroInURL) {
    const [heroId, heroLevel, heroStars = ""] = heroInURL.split("-");

    const isValidHero = !!heroesIdHashMap[heroId];
    const isSelectedHeroLegendary =
      isValidHero && !!legendaryHeroes.find((hero) => hero.id === heroId);

    const isValidHeroLevel = isSelectedHeroLegendary
      ? +heroLevel >= 1 && +heroLevel <= maxHeroLevel
      : +heroLevel >= 1 &&
        +heroLevel <= maxHeroLevel &&
        +heroLevel <= MIN_LEVEL_FOR_STARS;

    const isValidHeroStars =
      isSelectedHeroLegendary &&
      isValidHeroLevel &&
      +heroStars >= 1 &&
      +heroStars <= maxHeroStars &&
      heroLevel <= MAX_LEVEL_FOR_STARS &&
      heroLevel >= MIN_LEVEL_FOR_STARS;

    if (isValidHero && isValidHeroLevel) {
      return (
        isValidHero &&
        isValidHeroLevel && {
          id: heroId,
          level: heroLevel,
          stars: isValidHeroStars ? heroStars : "",
        }
      );
    }
  }
};

export default getHeroFromURL;
