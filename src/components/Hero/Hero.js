import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { appActions } from "../../redux/app";
import { heroSelectors } from "../../redux/hero";
import { gameDataSelectors } from "../../redux/gameData";

import s from "./Hero.module.scss";

const Hero = () => {
  const dispatch = useDispatch();

  const heroData = useSelector(heroSelectors.getHeroData);
  const troopGradesHashMap = useSelector(
    gameDataSelectors.getTroopGradesHashMap
  );

  const heroGrade = heroData.id
    ? troopGradesHashMap[heroData.gradeId].title.toLowerCase()
    : "";

  console.log({ stars: heroData.stars });

  const shouldShowStars = +heroData.stars > 0;

  return (
    <div className={s.heroBar}>
      <button
        className={classNames(s.hero, {
          [s[heroGrade]]: heroGrade,
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

      {shouldShowStars && (
        <div className="stars">
          {new Array(+heroData.stars).fill(0).map((_, index) => (
            <i key={`stars-${index}`} class="fa fa-star" aria-hidden="true"></i>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
