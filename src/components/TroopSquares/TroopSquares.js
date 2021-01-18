import React, { useCallback } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { appActions, appSelectors } from "../../redux/app";
import { gameDataSelectors } from "../../redux/gameData";
import { formationSelectors } from "../../redux/formation";
import s from "./TroopSquares.module.scss";

const TroopSquares = () => {
  const dispatch = useDispatch();

  const troopHashMap = useSelector(gameDataSelectors.getTroopIdHashMap);
  const boardSquaresGrid = useSelector(gameDataSelectors.getBoardSquaresGrid);
  const troopGradesHashMap = useSelector(
    gameDataSelectors.getTroopGradesHashMap
  );
  const formation = useSelector(formationSelectors.getFormation);
  const content = useSelector(appSelectors.getLocalisedContent);

  const handleTroopSquareClick = useCallback(
    (squareNum) => {
      dispatch(appActions.setTroopSelectionFormStatus(true));
      dispatch(appActions.setSelectedSquare(`${squareNum}`));
    },
    [dispatch]
  );

  return boardSquaresGrid.map((squareNum) => {
    const hasTroops = formation[`${squareNum}`]?.troop;
    const troop = hasTroops && troopHashMap[formation[`${squareNum}`].troop];
    const troopGradeClass = hasTroops
      ? troopGradesHashMap[troop.grade].title.toLowerCase()
      : "";
    const troopName = hasTroops ? content.gameData.troops[troop.id] : "";

    return (
      <button
        title={
          hasTroops
            ? `${troopName} ${content["game.level"]} ${
                formation[`${squareNum}`].level
              }`
            : `${content["game.square"]} ${squareNum}: ${content["button.label.clickToAddTroops"]}`
        }
        className={classNames(s.troopSquare, {
          [s[troopGradeClass]]: hasTroops,
        })}
        key={`square-${squareNum}`}
        id={`square-${squareNum}`}
        onClick={() => handleTroopSquareClick(squareNum)}
      >
        <span
          className={classNames({
            [s.troopLevel]: hasTroops,
            [s.emptySquareNumber]: !hasTroops,
          })}
        >
          {hasTroops ? formation[`${squareNum}`].level : squareNum}
        </span>

        {hasTroops && (
          <img className={s.troopImage} src={troop.image} alt={troopName} />
        )}
      </button>
    );
  });
};

export default TroopSquares;
