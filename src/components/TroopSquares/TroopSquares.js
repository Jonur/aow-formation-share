import React from "react";
import { func } from "prop-types";
import { TYPE_FORMATION } from "../../utils/propTypes";
import { SQUARES } from "../../utils/constants";
import s from "./TroopSquares.module.scss";

const TroopSquares = ({ formation, showTroopSelectionForm }) =>
  Array.from(new Array(SQUARES))
    .fill("square")
    .map((name, i) => (
      <button
        data-hastroops={formation[`${i + 1}`]?.troop}
        data-square={i + 1}
        className={s.troopSquare}
        key={`${name}-${i + 1}`}
        id={`${name}-${i + 1}`}
        onClick={showTroopSelectionForm}
      >
        {formation[`${i + 1}`]?.troop ? "YES" : i + 1}
      </button>
    ));

TroopSquares.propTypes = {
  formation: TYPE_FORMATION,
  showTroopSelectionForm: func.isRequired,
};

export default TroopSquares;
