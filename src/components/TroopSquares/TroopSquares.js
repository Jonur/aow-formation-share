import React from "react";
import { useSelector } from "react-redux";

import { appSelectors } from "../../redux/app";
import { gameDataSelectors } from "../../redux/gameData";
import { formationSelectors } from "../../redux/formation";

import TroopSquare from "./TroopSquare";

const TroopSquares = () => {
  const troopHashMap = useSelector(gameDataSelectors.getTroopIdHashMap);
  const boardSquaresGrid = useSelector(gameDataSelectors.getBoardSquaresGrid);
  const troopGradesHashMap = useSelector(
    gameDataSelectors.getTroopGradesHashMap
  );
  const formation = useSelector(formationSelectors.getFormation);
  const content = useSelector(appSelectors.getLocalisedContent);

  return boardSquaresGrid.map((squareNum) => {
    const hasTroops = formation[`${squareNum}`]?.troop;
    const troop = hasTroops && troopHashMap[formation[`${squareNum}`].troop];
    const troopGradeClass = hasTroops
      ? troopGradesHashMap[troop.grade].title.toLowerCase()
      : "";
    const troopName = hasTroops ? content.gameData.troops[troop.id] : "";

    return (
      <TroopSquare
        key={`square-${squareNum}`}
        hasTroops={!!hasTroops}
        squareNum={squareNum}
        troop={troop}
        troopName={troopName}
        troopGradeClass={troopGradeClass}
      />
    );
  });
};

export default TroopSquares;
