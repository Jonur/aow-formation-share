import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { barracksActions, barracksSelectors } from "../../redux/barracks";
import { gameDataSelectors } from "../../redux/gameData";
import { appActions, appSelectors } from "../../redux/app";

import BarracksForm from "../BarracksForm";
import s from "./Barracks.module.scss";

const Barracks = () => {
  const dispatch = useDispatch();

  const barracksTroops = useSelector(barracksSelectors.getBarracksTroops);
  const troopHashMap = useSelector(gameDataSelectors.getTroopIdHashMap);
  const troopGradesHashMap = useSelector(
    gameDataSelectors.getTroopGradesHashMap
  );
  const content = useSelector(appSelectors.getLocalisedContent);
  const barracksFormStatus = useSelector(appSelectors.getBarracksFormStatus);

  return (
    <section className={s.barracks}>
      <nav className={s.barracksTools}>
        <button
          className={classNames(s.btn, s.addBtn)}
          onClick={() =>
            dispatch(appActions.setBarracksFormStatus({ status: true }))
          }
        >
          {content["button.label.addToBarracks"]}
        </button>

        <button
          className={classNames(s.btn, s.clearBtn)}
          disabled={!barracksTroops.length}
          onClick={() => dispatch(barracksActions.emptyBarracks())}
        >
          {content["button.label.emptyBarracks"]}
        </button>
      </nav>

      {barracksFormStatus && <BarracksForm />}

      <div className={s.barracksTroops}>
        {!!barracksTroops.length &&
          barracksTroops.map(({ count, troopId, level }) => {
            const troop = troopHashMap[troopId];
            const troopName = content.gameData.troops[troop.id];
            const troopGradeClass = troopGradesHashMap[
              troop.grade
            ].title.toLowerCase();

            return (
              <div className={s.troop} key={`${troopId}-${level}`}>
                <span
                  className={s.count}
                  dangerouslySetInnerHTML={{ __html: `${count} &times;` }}
                />
                <div
                  className={classNames(s.imageContainer, s[troopGradeClass])}
                >
                  <img className={s.image} src={troop.image} alt={troopName} />
                  <span className={s.level}>{level}</span>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Barracks;
