import React from "react";
import { func } from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { gameDataSelectors } from "../../redux/gameData";
import { TYPE_FORMATION } from "../../utils/propTypes";
import troopHashMap from "../../utils/getTroopHashMap";
import s from "./TroopSquares.module.scss";

const TroopSquares = ({ formation, showTroopSelectionForm }) => {
  const boardSquaresGrid = useSelector(gameDataSelectors.getBoardSquaresGrid);

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
        onClick={() => showTroopSelectionForm(`${squareNum}`)}
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

TroopSquares.propTypes = {
  formation: TYPE_FORMATION,
  showTroopSelectionForm: func.isRequired,
};

export default TroopSquares;
