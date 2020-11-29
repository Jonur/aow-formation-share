import React, { useCallback, useRef, useState } from "react";
import { func, shape, string } from "prop-types";
import {
  ENTER_KEY_CODE,
  MAX_TROOP_LEVEL,
  TAB_KEY_CODE,
} from "../../utils/constants";
import { troops } from "../../data";
import s from "./TroopSelectionForm.module.scss";

const TroopSelectionForm = ({
  addToFormation,
  lastTroopAdded,
  setTroopSelectionFormStatus,
}) => {
  const troopSelectionRef = useRef();

  const [currentlySelectedTroop, setCurrentlySelectedTroop] = useState(
    lastTroopAdded.troop || troops.names[0]
  );
  const [
    currentlySelectedTroopLevel,
    setCurrentlySelectedTroopLevel,
  ] = useState(lastTroopAdded.level || MAX_TROOP_LEVEL);

  const handleCloseForm = useCallback(
    () => setTroopSelectionFormStatus(false),
    [setTroopSelectionFormStatus]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      addToFormation({
        troop: currentlySelectedTroop,
        level: currentlySelectedTroopLevel,
      });
    },
    [addToFormation, currentlySelectedTroop, currentlySelectedTroopLevel]
  );

  const handleSubmitWithEnter = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      e.preventDefault();

      addToFormation({
        troop: currentlySelectedTroop,
        level: currentlySelectedTroopLevel,
      });
    }
  };

  const focusTroopSelection = useCallback((e) => {
    if (e.keyCode === TAB_KEY_CODE) {
      e.preventDefault();
      troopSelectionRef.current.focus();
    }
  }, []);

  const selectTroop = useCallback(
    (e) => setCurrentlySelectedTroop(e.target.value),
    []
  );
  const selectTroopLevel = useCallback(
    (e) => setCurrentlySelectedTroopLevel(e.target.value),
    []
  );

  return (
    <form
      id="troop-selection-form"
      name="troopSelectionForm"
      onSubmit={handleFormSubmit}
      className={s.troopSelectionForm}
    >
      <button
        title="Close the form"
        className={s.close}
        onClick={handleCloseForm}
        type="button"
        tabIndex={-1}
      >
        &times;
      </button>

      <select
        name="troop"
        defaultValue={currentlySelectedTroop}
        title="Select troop"
        autoFocus
        onKeyDown={handleSubmitWithEnter}
        onChange={selectTroop}
        tabIndex={1}
        ref={troopSelectionRef}
      >
        <option value="" key="no-troop">
          --- No troop ---
        </option>
        {troops.names.map((name) => (
          <option value={name} key={`troop-${name}`}>
            {name}
          </option>
        ))}
      </select>

      <select
        name="level"
        defaultValue={currentlySelectedTroopLevel}
        title="Select troop level"
        onKeyDown={handleSubmitWithEnter}
        onChange={selectTroopLevel}
        tabIndex={2}
      >
        {Array.from(new Array(MAX_TROOP_LEVEL))
          .map((lvl, index) => (
            <option value={index + 1} key={`lvl-${index + 1}`}>
              {index + 1}
            </option>
          ))
          .reverse()}
      </select>

      <button type="submit" tabIndex={3} onKeyDown={focusTroopSelection}>
        Add
      </button>
    </form>
  );
};

TroopSelectionForm.propTypes = {
  addToFormation: func.isRequired,
  lastTroopAdded: shape({
    level: string,
    troop: string,
  }).isRequired,
  setTroopSelectionFormStatus: func.isRequired,
};

export default TroopSelectionForm;
