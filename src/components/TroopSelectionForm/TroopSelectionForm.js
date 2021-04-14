import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { appActions, appSelectors } from "../../redux/app";
import { gameDataSelectors } from "../../redux/gameData";
import { formationActions, formationSelectors } from "../../redux/formation";
import { barracksActions, barracksSelectors } from "../../redux/barracks";
import {
  ENTER_KEY_CODE,
  ESCAPE_KEY_CODE,
  TAB_KEY_CODE,
  TROOP_SOURCES,
} from "../../utils/constants";
import s from "./TroopSelectionForm.module.scss";

const TroopSelectionForm = () => {
  const dispatch = useDispatch();
  const troopSelectionRef = useRef();

  const localisedTroops = useSelector(gameDataSelectors.getLocalisedTroops);
  const troopLevels = useSelector(gameDataSelectors.getTroopLevelsReversed);
  const lastTroopAdded = useSelector(appSelectors.getLastTroopAdded);
  const selectedSquare = useSelector(appSelectors.getSelectedSquared);
  const content = useSelector(appSelectors.getLocalisedContent);
  const barracksTroops = useSelector(barracksSelectors.getBarracksTroops);
  const troopHashMap = useSelector(gameDataSelectors.getTroopIdHashMap);
  const formation = useSelector(formationSelectors.getFormation);
  const barracks = useSelector(barracksSelectors.getBarracks);

  const [troopSource, setTroopSource] = useState(TROOP_SOURCES.DATA);

  const [currentlySelectedTroop, setCurrentlySelectedTroop] = useState(
    lastTroopAdded.troop || localisedTroops[0].id
  );
  const [
    currentlySelectedTroopLevel,
    setCurrentlySelectedTroopLevel,
  ] = useState(lastTroopAdded.level || troopLevels[0]);

  const handleCloseForm = useCallback(() => {
    dispatch(appActions.setTroopSelectionFormStatus(false));
    dispatch(appActions.clearSelectedSquare());
  }, [dispatch]);

  const addToFormation = useCallback(
    ({ level, troop }) => {
      if (!troop) {
        dispatch(formationActions.removeTroopFromFormation(selectedSquare));
      } else {
        const troopToAdd = {
          troop: troop,
          level: `${level}`,
        };

        dispatch(
          formationActions.addTroopToFormation(selectedSquare, troopToAdd)
        );
        dispatch(appActions.setLastTroopAdded(troopToAdd));
      }

      dispatch(appActions.setTroopSelectionFormStatus(false));
      dispatch(appActions.clearSelectedSquare());
    },
    [dispatch, selectedSquare]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      addToFormation({
        troop: currentlySelectedTroop,
        level: currentlySelectedTroopLevel,
      });

      const isAddingFromBarracks = troopSource === TROOP_SOURCES.BARRACKS;
      if (isAddingFromBarracks) {
        const key = [
          currentlySelectedTroop,
          currentlySelectedTroopLevel,
        ].toString();
        const barracksEntryCount = +barracks.get(key);

        if (barracksEntryCount === 1) {
          dispatch(
            barracksActions.removeTroopsFromBarracks({
              troop: currentlySelectedTroop,
              level: currentlySelectedTroopLevel,
            })
          );
        } else {
          dispatch(
            barracksActions.updateTroopsInBarracks({
              troop: currentlySelectedTroop,
              level: currentlySelectedTroopLevel,
              count: barracksEntryCount - 1,
            })
          );
        }

        const shouldMovePreviousTrooptoBarracks = !!formation[selectedSquare];
        if (shouldMovePreviousTrooptoBarracks) {
          dispatch(
            barracksActions.addTroopsToBarracks({
              troop: formation[selectedSquare].troop,
              level: formation[selectedSquare].level,
              count: 1,
            })
          );
        }
      }
    },
    [
      addToFormation,
      currentlySelectedTroop,
      currentlySelectedTroopLevel,
      troopSource,
      selectedSquare,
      formation,
      barracks,
      dispatch,
    ]
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

  const [displayTroopLevelSelect, setDisplayTroopLevelSelect] = useState(true);
  const selectTroop = useCallback((e) => {
    const selectedTroop = e.target.value;
    setDisplayTroopLevelSelect(!!selectedTroop);
    setCurrentlySelectedTroop(selectedTroop);
  }, []);
  const selectTroopLevel = useCallback(
    (e) => setCurrentlySelectedTroopLevel(e.target.value),
    []
  );
  const selectBarracksTroop = useCallback((e) => {
    const [troopId, troopLevel] = e.target.value.split("-");
    setCurrentlySelectedTroop(troopId);
    setCurrentlySelectedTroopLevel(troopLevel);
  }, []);

  const selectTab = useCallback(
    (e, tab) => {
      e.preventDefault();
      setTroopSource(tab);

      if (tab === TROOP_SOURCES.DATA) {
        setCurrentlySelectedTroop(localisedTroops[0].id);
        setCurrentlySelectedTroopLevel(troopLevels[0]);
      } else if (tab === TROOP_SOURCES.BARRACKS) {
        const { troopId, level } = barracksTroops[0];
        setCurrentlySelectedTroop(troopId);
        setCurrentlySelectedTroopLevel(level);
      }
    },
    [localisedTroops, troopLevels, barracksTroops]
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
        title={content["button.label.closeTroopSelectionForm"]}
        className={s.close}
        onClick={handleCloseForm}
        type="button"
        tabIndex={-1}
      >
        &times;
      </button>

      {!!barracksTroops.length && (
        <nav className={s.troopSelectionFormTabs}>
          <button
            className={classNames(s.tab, s.data, {
              [s.selected]: troopSource === TROOP_SOURCES.DATA,
            })}
            onClick={(e) => selectTab(e, TROOP_SOURCES.DATA)}
          >
            {content["troopSelectionForm.tabs.data"]}
          </button>

          <button
            className={classNames(s.tab, s.barracks, {
              [s.selected]: troopSource === TROOP_SOURCES.BARRACKS,
            })}
            onClick={(e) => selectTab(e, TROOP_SOURCES.BARRACKS)}
          >
            {content["troopSelectionForm.tabs.barracks"]}
          </button>
        </nav>
      )}

      {troopSource === TROOP_SOURCES.DATA && (
        <>
          <select
            name="troop"
            defaultValue={currentlySelectedTroop}
            title={content["select.label.troopName"]}
            autoFocus
            onKeyDown={handleSubmitWithEnter}
            onChange={selectTroop}
            tabIndex={1}
            ref={troopSelectionRef}
          >
            <option value="" key="no-troop">
              {content["select.noValue.troopName"]}
            </option>
            {localisedTroops.map(({ id, name }, idx) => (
              <option value={id} key={`troop-${id}-${idx}`}>
                {name}
              </option>
            ))}
          </select>

          {displayTroopLevelSelect && (
            <select
              name="level"
              defaultValue={currentlySelectedTroopLevel}
              title={content["select.label.troopLevel"]}
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
        </>
      )}

      {troopSource === TROOP_SOURCES.BARRACKS && (
        <>
          <select
            defaultValue={currentlySelectedTroop}
            name="troop"
            title={content["select.label.troopName"]}
            autoFocus
            onKeyDown={handleSubmitWithEnter}
            onChange={selectBarracksTroop}
            tabIndex={1}
            ref={troopSelectionRef}
          >
            {barracksTroops.map(({ troopId, level }) => {
              const troop = troopHashMap[troopId];
              const troopName = content.gameData.troops[troop.id];

              return (
                <option
                  value={`${troopId}-${level}`}
                  key={`${troopId}-${level}`}
                >
                  {`${troopName}, ${content["game.level"]} ${level}`}
                </option>
              );
            })}
          </select>

          <span className={s.notification}>
            <i
              className={classNames(
                "fas",
                "fa-info-circle",
                s.notificationIcon
              )}
            ></i>
            {content["troopSelectionForm.tabs.barracks.notification"]}
          </span>
        </>
      )}

      <button type="submit" tabIndex={3} onKeyDown={focusTroopSelection}>
        {displayTroopLevelSelect
          ? content["button.label.addTroop"]
          : content["button.label.noTroop"]}
      </button>
    </form>
  );
};

export default TroopSelectionForm;
