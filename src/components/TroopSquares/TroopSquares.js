import React, { useCallback } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../redux/app";
import { gameDataSelectors } from "../../redux/gameData";
import { formationSelectors } from "../../redux/formation";
import s from "./TroopSquares.module.scss";

const TroopSquares = () => {
  const dispatch = useDispatch();

  const troopHashMap = useSelector(gameDataSelectors.getTroopHashMap);
  const boardSquaresGrid = useSelector(gameDataSelectors.getBoardSquaresGrid);
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

    return (
      <button
        title={
          hasTroops
            ? `${troop.name} level ${formation[`${squareNum}`].level}`
            : `Square ${squareNum}: Click to add troops!`
        }
        className={classNames(s.troopSquare, {
          [s[`${troop?.grade?.toLowerCase()}`]]: hasTroops,
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
