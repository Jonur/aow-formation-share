import React, { useCallback } from "react";
import { func, shape, string } from "prop-types";
import { MAX_TROOP_LEVEL } from "../../utils/constants";
import { troops } from "../../data";
import s from "./TroopSelectionForm.module.scss";

const TroopSelectionForm = ({
  handleFormSubmit,
  lastTroopAdded,
  selectedSquare,
  setTroopSelectionFormStatus,
}) => {
  const handleCloseForm = useCallback(
    () => setTroopSelectionFormStatus(false),
    [setTroopSelectionFormStatus]
  );

  return (
    <form
      name="troopSelectionForm"
      onSubmit={handleFormSubmit}
      className={s.troopSelectionForm}
    >
      <button
        title="Close the form"
        className={s.close}
        onClick={handleCloseForm}
        type="button"
      >
        &times;
      </button>
      <input type="hidden" name="square" value={selectedSquare} />

      <select
        name="troop"
        defaultValue={lastTroopAdded.troop}
        title="Select troop"
      >
        {troops.names.map((name) => (
          <option value={name} key={`troop-${name}`}>
            {name}
          </option>
        ))}
      </select>

      <select
        name="level"
        defaultValue={lastTroopAdded.level}
        title="Select troop level"
      >
        {Array.from(new Array(MAX_TROOP_LEVEL))
          .map((lvl, index) => (
            <option value={index + 1} key={`lvl-${index + 1}`}>
              {index + 1}
            </option>
          ))
          .reverse()}
      </select>

      <input type="submit" value="Add" />
    </form>
  );
};

TroopSelectionForm.propTypes = {
  handleFormSubmit: func.isRequired,
  lastTroopAdded: shape({
    level: string,
    troop: string,
  }).isRequired,
  selectedSquare: string.isRequired,
  setTroopSelectionFormStatus: func.isRequired,
};

export default TroopSelectionForm;
