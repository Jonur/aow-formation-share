import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gameDataSelectors } from "../../redux/gameData";
import { barracksActions, barracksSelectors } from "../../redux/barracks";
import { appActions, appSelectors } from "../../redux/app";
import {
  ENTER_KEY_CODE,
  TAB_KEY_CODE,
  ESCAPE_KEY_CODE,
  MAX_BARRACKS_TROOP_COUNT,
} from "../../utils/constants";
import s from "./BarracksForm.module.scss";

const BarracksForm = () => {
  const dispatch = useDispatch();
  const troopSelectionRef = useRef();
  const barracksFormRef = useRef();

  const content = useSelector(appSelectors.getLocalisedContent);
  const localisedTroops = useSelector(gameDataSelectors.getLocalisedTroops);
  const troopLevels = useSelector(gameDataSelectors.getTroopLevelsReversed);
  const barracks = useSelector(barracksSelectors.getBarracks);

  const handleCloseForm = useCallback(() => {
    dispatch(appActions.setBarracksFormStatus({ status: false }));
  }, [dispatch]);

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

  const handleAddTroopsToBarracks = useCallback(
    (e) => {
      e.preventDefault();
      const { troop, level, count } = barracksFormRef.current.elements;

      const selectedTroopKey = [troop.value, level.value].toString();
      const troopCombinationExists = barracks.has(selectedTroopKey);

      if (troopCombinationExists) {
        const troopBarracksCount = Math.min(
          +barracks.get(selectedTroopKey) + +count.value,
          MAX_BARRACKS_TROOP_COUNT
        );

        dispatch(
          barracksActions.updateTroopsInBarracks({
            troop: troop.value,
            level: level.value,
            count: troopBarracksCount,
          })
        );
      } else {
        dispatch(
          barracksActions.addTroopsToBarracks({
            troop: troop.value,
            level: level.value,
            count: count.value,
          })
        );
      }
    },
    [dispatch, barracks]
  );

  const handleSubmitWithEnter = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      e.stopPropagation();
      handleAddTroopsToBarracks(e);
    }
  };

  const troopCountOptions = Array.from(new Array(MAX_BARRACKS_TROOP_COUNT)).map(
    (num, index) => index + 1
  );

  return (
    <form
      id="barracks-form"
      name="barracksForm"
      onSubmit={handleAddTroopsToBarracks}
      className={s.barracksForm}
      onKeyDown={handleCloseFormWithEscape}
      ref={barracksFormRef}
    >
      <button
        title={content["button.label.closeBarracksForm"]}
        className={s.close}
        onClick={handleCloseForm}
        type="button"
        tabIndex={-1}
      >
        &times;
      </button>

      <label className={s.label} htmlFor="troop">
        {content["select.label.troopName"]}
      </label>
      <select
        id="troop"
        name="troop"
        defaultValue={localisedTroops[0].id}
        title={content["select.label.troopName"]}
        autoFocus
        onKeyDown={handleSubmitWithEnter}
        tabIndex={1}
        ref={troopSelectionRef}
      >
        {localisedTroops.map(({ id, name }, idx) => (
          <option value={id} key={`troop-${id}-${idx}`}>
            {name}
          </option>
        ))}
      </select>

      <label className={s.label} htmlFor="level">
        {content["select.label.troopLevel"]}
      </label>
      <select
        id="level"
        name="level"
        defaultValue={troopLevels[0]}
        title={content["select.label.troopLevel"]}
        onKeyDown={handleSubmitWithEnter}
        tabIndex={2}
      >
        {troopLevels.map((lvl) => (
          <option value={lvl} key={`lvl-${lvl}`}>
            {lvl}
          </option>
        ))}
      </select>

      <label className={s.label} htmlFor="count">
        {content["select.label.troopCount"]}
      </label>
      <select
        id="count"
        name="count"
        defaultValue={1}
        title={content["select.label.troopCount"]}
        onKeyDown={handleSubmitWithEnter}
        tabIndex={3}
      >
        {troopCountOptions.map((count) => (
          <option value={count} key={`count-${count}`}>
            {count}
          </option>
        ))}
      </select>

      <button type="submit" tabIndex={4} onKeyDown={focusTroopSelection}>
        {content["button.label.addTroop"]}
      </button>
    </form>
  );
};

export default BarracksForm;
