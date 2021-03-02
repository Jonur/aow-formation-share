import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { appActions } from "../../redux/app";
import { heroSelectors } from "../../redux/hero";

import s from "./Hero.module.scss";

const Hero = () => {
  const dispatch = useDispatch();

  const heroData = useSelector(heroSelectors.getHeroData);

  return (
    <div className={s.heroBar}>
      <button
        className={classNames(s.hero, {
          [s[heroData.grade]]: heroData.grade,
        })}
        aria-label={heroData.name}
        onClick={() => dispatch(appActions.setHeroFormStatus({ status: true }))}
      >
        {heroData.id ? (
          <>
            <img className={s.image} src={heroData.image} alt={heroData.name} />
            <span className={s.level}>{heroData.level}</span>
          </>
        ) : (
          <div className={s.placeholder}>
            <i className="fas fa-plus"></i>
          </div>
        )}
      </button>
    </div>
  );
};

export default Hero;
