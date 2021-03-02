import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gameDataSelectors } from "../../redux/gameData";
import { appActions, appSelectors } from "../../redux/app";
import { heroActions, heroSelectors } from "../../redux/hero";
import {
  ENTER_KEY_CODE,
  TAB_KEY_CODE,
  ESCAPE_KEY_CODE,
} from "../../utils/constants";
import s from "./HeroForm.module.scss";

const HeroForm = () => {
  const dispatch = useDispatch();
  const heroSelectionRef = useRef();
  const heroFormRef = useRef();

  const content = useSelector(appSelectors.getLocalisedContent);
  const localisedHeroes = useSelector(gameDataSelectors.getLocalisedHeroes);
  const heroLevels = useSelector(gameDataSelectors.getHeroLevelsReversed);
  const selectedHero = useSelector(heroSelectors.getHero);

  const handleCloseForm = useCallback(() => {
    dispatch(appActions.setHeroFormStatus({ status: false }));
  }, [dispatch]);

  const handleCloseFormWithEscape = (e) => {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      e.preventDefault();
      handleCloseForm();
    }
  };

  const focusHeroSelection = useCallback((e) => {
    if (e.keyCode === TAB_KEY_CODE) {
      e.preventDefault();
      heroSelectionRef.current.focus();
    }
  }, []);

  const handleAddHero = useCallback(
    (e) => {
      e.preventDefault();
      const { hero, level } = heroFormRef.current.elements;
      dispatch(heroActions.updateHero({ id: hero.value, level: level.value }));
    },
    [dispatch]
  );

  const handleSubmitWithEnter = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      e.stopPropagation();
      handleAddHero(e);
    }
  };

  return (
    <form
      id="hero-form"
      name="heroForm"
      onSubmit={handleAddHero}
      className={s.heroForm}
      onKeyDown={handleCloseFormWithEscape}
      ref={heroFormRef}
    >
      <button
        title={content["button.label.closeHeroForm"]}
        className={s.close}
        onClick={handleCloseForm}
        type="button"
        tabIndex={-1}
      >
        &times;
      </button>

      <label className={s.label} htmlFor="hero">
        {content["select.label.heroName"]}
      </label>
      <select
        id="hero"
        name="hero"
        defaultValue={selectedHero.id || localisedHeroes[0].id}
        title={content["select.label.heroName"]}
        autoFocus
        onKeyDown={handleSubmitWithEnter}
        tabIndex={1}
        ref={heroSelectionRef}
      >
        <option value="" key="no-hero">
          {content["select.label.noHero"]}
        </option>
        {localisedHeroes.map(({ id, name }, idx) => (
          <option value={id} key={`hero-${id}-${idx}`}>
            {name}
          </option>
        ))}
      </select>

      <label className={s.label} htmlFor="level">
        {content["select.label.heroLevel"]}
      </label>
      <select
        id="level"
        name="level"
        defaultValue={selectedHero.level || heroLevels[0]}
        title={content["select.label.heroLevel"]}
        onKeyDown={handleSubmitWithEnter}
        tabIndex={2}
      >
        {heroLevels.map((lvl) => (
          <option value={lvl} key={`lvl-${lvl}`}>
            {lvl}
          </option>
        ))}
      </select>

      <button type="submit" tabIndex={4} onKeyDown={focusHeroSelection}>
        {content["button.label.setHero"]}
      </button>
    </form>
  );
};

export default HeroForm;
