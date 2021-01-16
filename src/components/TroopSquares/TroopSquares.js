import React, { useCallback } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import t from "../../i18n/en.json";
import { appActions } from "../../redux/app";
import { gameDataSelectors } from "../../redux/gameData";
import { formationSelectors } from "../../redux/formation";
import s from "./TroopSquares.module.scss";

const TroopSquares = () => {
  const dispatch = useDispatch();

  const troopHashMap = useSelector(gameDataSelectors.getTroopHashMap);
  const boardSquaresGrid = useSelector(gameDataSelectors.getBoardSquaresGrid);
  const troopGradesHashMap = useSelector(
    gameDataSelectors.getTroopGradesHashMap
  );
  const formation = useSelector(formationSelectors.getFormation);

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
    const troopGrade = hasTroops
      ? troopGradesHashMap[troop.grade].title.toLowerCase()
      : "";

    return (
      <button
        title={
          hasTroops
            ? `${troop.name} ${t["game.level"]} ${
                formation[`${squareNum}`].level
              }`
            : `${t["game.square"]} ${squareNum}: ${t["button.label.clickToAddTroops"]}`
        }
        className={classNames(s.troopSquare, {
          [s[troopGrade]]: hasTroops,
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
          <img className={s.troopImage} src={troop.image} alt={troop.name} />
        )}
      </button>
    );
  });
};

export default TroopSquares;
