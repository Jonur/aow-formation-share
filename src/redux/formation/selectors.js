import { createSelector } from "reselect";
import { appSelectors } from "../app";
import { gameDataSelectors } from "../gameData";
import { heroSelectors } from "../hero";
import removeEmptyEntries from "../../utils/removeEmptyEntries";

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
  gameDataSelectors.getIncreasableTroopCounts,
  (formation, hero, troopIdHashMap, increasableTroopCounts) => {
    const heroNumber = hero.id ? 1 : 0;

    const troopsNumber = Object.values(formation).reduce((acc, troop) => {
      const maxTroopCount = troopIdHashMap[troop.troop].count;
      const troopCount = increasableTroopCounts[maxTroopCount][troop.level - 1];

      return acc + troopCount;
    }, 0);

    return heroNumber + troopsNumber;
  }
);

export const getFormationHealthPoints = createSelector(
  getFormation,
  heroSelectors.getHeroData,
  gameDataSelectors.getTroopIdHashMap,
  (formation, hero, troopIdHashMap) => {
    const troopsHP = Object.values(formation).reduce((acc, troop) => {
      const troopData = troopIdHashMap[troop.troop];
      const troopHP = troopData.hp[troop.level - 1];

      let summonHP = 0;
      if (troopData.summon) {
        summonHP = troopData.summon.hp[troop.level - 1];
      }

      return acc + troopHP + summonHP;
    }, 0);

    if (hero.id) {
      const heroHP = hero.hp[+hero.level - 1];
      return heroHP + troopsHP;
    } else {
      return troopsHP;
    }
  }
);

export const getFormationRaceData = createSelector(
  getFormation,
  heroSelectors.getHeroData,
  gameDataSelectors.getTroopIdHashMap,
  gameDataSelectors.getIncreasableTroopCounts,
  appSelectors.getLocalisedContent,
  getFormationCount,
  (
    formation,
    hero,
    troopIdHashMap,
    increasableTroopCounts,
    content,
    formationCount
  ) => {
    const races = Object.keys(content.gameData.races).reduce(
      (acc, race) => ({
        ...acc,
        [race]: {
          count: 0,
          label: content.gameData.races[race],
        },
      }),
      {}
    );

    const troopRaceData = Object.values(formation).reduce((acc, troop) => {
      const troopData = troopIdHashMap[troop.troop];
      const maxTroopCount = troopData.count;
      const troopCount = increasableTroopCounts[maxTroopCount][troop.level - 1];

      return {
        ...acc,
        [troopData.race]: {
          ...acc[troopData.race],
          count: acc[troopData.race].count + troopCount,
        },
      };
    }, races);

    const heroAddedRaceData = hero.id
      ? {
          ...troopRaceData,
          [hero.race]: {
            ...troopRaceData[hero.race],
            count: troopRaceData[hero.race].count + 1,
          },
        }
      : troopRaceData;

    const raceData = Object.keys(heroAddedRaceData).reduce((acc, race) => {
      return {
        ...acc,
        [race]: {
          ...heroAddedRaceData[race],
          percentage: (heroAddedRaceData[race].count / formationCount) * 100,
        },
      };
    }, {});

    return raceData;
  }
);

export const getFormationGradeData = createSelector(
  getFormation,
  heroSelectors.getHeroData,
  gameDataSelectors.getTroopIdHashMap,
  gameDataSelectors.getIncreasableTroopCounts,
  appSelectors.getLocalisedContent,
  getFormationCount,
  (
    formation,
    hero,
    troopIdHashMap,
    increasableTroopCounts,
    content,
    formationCount
  ) => {
    const grades = Object.keys(content.gameData.grades).reduce(
      (acc, grade) => ({
        ...acc,
        [grade]: {
          count: 0,
          label: content.gameData.grades[grade],
        },
      }),
      {}
    );

    const troopGradeData = Object.values(formation).reduce((acc, troop) => {
      const troopData = troopIdHashMap[troop.troop];
      const maxTroopCount = troopData.count;
      const troopCount = increasableTroopCounts[maxTroopCount][troop.level - 1];

      return {
        ...acc,
        [troopData.grade]: {
          ...acc[troopData.grade],
          count: acc[troopData.grade].count + troopCount,
        },
      };
    }, grades);

    const heroAddedGradeData = hero.id
      ? {
          ...troopGradeData,
          [hero.gradeId]: {
            ...troopGradeData[hero.gradeId],
            count: troopGradeData[hero.gradeId].count + 1,
          },
        }
      : troopGradeData;

    const gradeData = Object.keys(heroAddedGradeData).reduce((acc, grade) => {
      return {
        ...acc,
        [grade]: {
          ...heroAddedGradeData[grade],
          percentage: (heroAddedGradeData[grade].count / formationCount) * 100,
        },
      };
    }, {});

    return gradeData;
  }
);

export const getFormationTroopData = createSelector(
  getFormation,
  gameDataSelectors.getTroopIdHashMap,
  gameDataSelectors.getIncreasableTroopCounts,
  appSelectors.getLocalisedContent,
  getFormationCount,
  (
    formation,
    troopIdHashMap,
    increasableTroopCounts,
    content,
    formationCount
  ) => {
    const troops = Object.keys(content.gameData.troops).reduce(
      (acc, troop) => ({
        ...acc,
        [troop]: {
          count: 0,
          label: content.gameData.troops[troop],
        },
      }),
      {}
    );

    const troopGroupCountData = Object.values(formation).reduce(
      (acc, troop) => {
        const troopData = troopIdHashMap[troop.troop];
        const maxTroopCount = troopData.count;
        const troopCount =
          increasableTroopCounts[maxTroopCount][troop.level - 1];

        return {
          ...acc,
          [troopData.id]: {
            ...acc[troopData.id],
            count: acc[troopData.id].count + troopCount,
          },
        };
      },
      troops
    );

    const troopGroupCount = Object.keys(troopGroupCountData).reduce(
      (acc, troop) => {
        return {
          ...acc,
          [troop]: {
            ...troopGroupCountData[troop],
            percentage:
              (troopGroupCountData[troop].count / formationCount) * 100,
          },
        };
      },
      {}
    );

    return removeEmptyEntries(troopGroupCount);
  }
);
