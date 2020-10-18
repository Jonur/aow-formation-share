import React, { useCallback } from "react";
import { func } from "prop-types";
import { TYPE_FORMATION } from "../../utils/propTypes";
import s from "./ClearFormation.module.scss";

const ClearFormation = ({ formation, setFormation }) => {
  const troopsInFormation = Object.keys(formation);
  const handleClearFormation = useCallback(() => setFormation({}), [
    setFormation,
  ]);

  return (
    <nav className={s.clearFormation}>
      <button
        className={s.shareBtn}
        disabled={!troopsInFormation.length}
        onClick={handleClearFormation}
      >
        Empty Formation
      </button>
    </nav>
  );
};

ClearFormation.propTypes = {
  formation: TYPE_FORMATION,
  setFormation: func.isRequired,
};

export default ClearFormation;
