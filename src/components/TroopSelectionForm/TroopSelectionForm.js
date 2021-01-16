import React, { useCallback, useRef, useState } from "react";
import { func } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { appActions, appSelectors } from "../../redux/app";
import { gameDataSelectors } from "../../redux/gameData";
import {
  ENTER_KEY_CODE,
  TAB_KEY_CODE,
  ESCAPE_KEY_CODE,
} from "../../utils/constants";
import s from "./TroopSelectionForm.module.scss";

const TroopSelectionForm = ({ addToFormation }) => {
  const dispatch = useDispatch();
  const troopSelectionRef = useRef();

  const troopNames = useSelector(gameDataSelectors.getTroopNames);
  const troopLevels = useSelector(gameDataSelectors.getTroopLevelsReversed);
  const lastTroopAdded = useSelector(appSelectors.getLastTroopAdded);

  const [currentlySelectedTroop, setCurrentlySelectedTroop] = useState(
    lastTroopAdded.troop || troopNames[0]
  );
  const [
    currentlySelectedTroopLevel,
    setCurrentlySelectedTroopLevel,
  ] = useState(lastTroopAdded.level || troopLevels[0]);

  const handleCloseForm = useCallback(() => {
    dispatch(appActions.setTroopSelectionFormStatus(false));
    dispatch(appActions.clearSelectedSquare());
  }, [dispatch]);

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

  const handleCloseFormWithEscape = (e) => {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      e.preventDefault();
      handleCloseForm();
    }
  };

  const focusTroopSelection = useCallback((e) => {
    if (e.keyCode === TAB_KEY_CODE) {
      e.preventDefault();
      troopSelectionRef.current.focus();
    }
  }, []);

  const [displayTroopLevelSelect, setDisplayTroolLevelSelect] = useState(true);
  const selectTroop = useCallback((e) => {
    const selectedTroop = e.target.value;
    setDisplayTroolLevelSelect(!!selectedTroop);
    setCurrentlySelectedTroop(selectedTroop);
  }, []);
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
      onKeyDown={handleCloseFormWithEscape}
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
        {troopNames.map((name) => (
          <option value={name} key={`troop-${name}`}>
            {name}
          </option>
        ))}
      </select>

      {displayTroopLevelSelect && (
        <select
          name="level"
          defaultValue={currentlySelectedTroopLevel}
          title="Select troop level"
          onKeyDown={handleSubmitWithEnter}
          onChange={selectTroopLevel}
          tabIndex={2}
        >
          {troopLevels.map((lvl) => (
            <option value={lvl} key={`lvl-${lvl}`}>
              {lvl}
            </option>
          ))}
        </select>
      )}

      <button type="submit" tabIndex={3} onKeyDown={focusTroopSelection}>
        {displayTroopLevelSelect ? "Add" : "Set"}
      </button>
    </form>
  );
};

TroopSelectionForm.propTypes = {
  addToFormation: func.isRequired,
};

export default TroopSelectionForm;
