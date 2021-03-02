import { createSelector } from "reselect";
import { gameDataSelectors } from "../gameData";
import { appSelectors } from "../app";

export const getHero = ({ hero }) => hero;

export const getHeroData = createSelector(
  getHero,
  gameDataSelectors.getHeroesIdHashMap,
  appSelectors.getLocalisedContent,
  (hero, heroes, content) =>
    hero.id
      ? {
          ...hero,
          class: content.gameData.classes[heroes[hero.id].class].toLowerCase(),
          grade: content.gameData.grades[heroes[hero.id].grade].toLowerCase(),
          name: content.gameData.heroes[hero.id],
          image: heroes[hero.id].image,
        }
      : {}
);

export const getHeroLinkParams = createSelector(getHero, (hero) =>
  hero.id ? `&h=${hero.id}-${hero.level}` : ""
);
