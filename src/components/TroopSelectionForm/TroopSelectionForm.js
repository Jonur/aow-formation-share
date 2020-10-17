import React, { useCallback } from "react";
import { func, string } from "prop-types";
import { MAX_TROOP_LEVEL } from "../../utils/constants";
import { troops } from "../../data";
import s from "./TroopSelectionForm.module.scss";

const TroopSelectionForm = ({
  handleFormSubmit,
  selectedSquare,
  setTroopSelectionFormStatus,
}) => {
  const handleCloseForm = useCallback(
    () => setTroopSelectionFormStatus(false),
    [setTroopSelectionFormStatus]
  );

  return (
    <>
      <div className={s.backdrop} />
      <form
        name="troopSelectionForm"
        onSubmit={handleFormSubmit}
        className={s.troopSelectionForm}
      >
        <button className={s.close} onClick={handleCloseForm} type="button">
          &times;
        </button>
        <input type="hidden" name="square" value={selectedSquare} />

        <select name="troop">
          {troops.names.map((name) => (
            <option value={name} key={`troop-${name}`}>
              {name}
            </option>
          ))}
        </select>

        <select name="level">
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
    </>
  );
};

TroopSelectionForm.propTypes = {
  handleFormSubmit: func.isRequired,
  selectedSquare: string.isRequired,
  setTroopSelectionFormStatus: func.isRequired,
};

export default TroopSelectionForm;
