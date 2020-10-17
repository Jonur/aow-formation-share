import React from "react";
import { func } from "prop-types";
import { TYPE_FORMATION } from "../../utils/propTypes";
import { SQUARES } from "../../utils/constants";
import { troops } from "../../data";
import s from "./TroopSquares.module.scss";

const getTroopHashMap = troops.troops.reduce(
  (acc, troop) => ({ ...acc, [troop.name]: troop }),
  {}
);

const TroopSquares = ({ formation, showTroopSelectionForm }) =>
  Array.from(new Array(SQUARES))
    .fill("square")
    .map((name, i) => {
      const squareNum = i + 1;
      const hasTroops = formation[`${squareNum}`]?.troop;
      const troop =
        hasTroops && getTroopHashMap[formation[`${squareNum}`].troop];

      return (
        <button
          aria-label={hasTroops ?? `Square ${squareNum}`}
          title={hasTroops ?? `Square ${squareNum}`}
          data-square={squareNum}
          className={s.troopSquare}
          key={`${name}-${squareNum}`}
          id={`${name}-${squareNum}`}
          onClick={showTroopSelectionForm}
        >
          {hasTroops ? (
            <span className={s.troopLevel}>
              {formation[`${squareNum}`].level}
            </span>
          ) : (
            squareNum
          )}
          {hasTroops && (
            <img className={s.troopImage} src={troop.image} alt={troop.name} />
          )}
        </button>
      );
    });

TroopSquares.propTypes = {
  formation: TYPE_FORMATION,
  showTroopSelectionForm: func.isRequired,
};

export default TroopSquares;
