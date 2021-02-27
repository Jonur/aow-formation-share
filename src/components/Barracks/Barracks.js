import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { barracksActions, barracksSelectors } from "../../redux/barracks";
import { gameDataSelectors } from "../../redux/gameData";
import { appSelectors } from "../../redux/app";

import BarracksForm from "../BarracksForm";
import BarracksToolbar from "../BarracksToolbar";
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
      <BarracksToolbar />

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
                <button
                  title={content["button.label.removeTroopFromBarracks"]}
                  className={s.removeTroop}
                  onClick={() =>
                    dispatch(
                      barracksActions.removeTroopsFromBarracks({
                        troop: troopId,
                        level,
                      })
                    )
                  }
                  type="button"
                >
                  &times;
                </button>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Barracks;
