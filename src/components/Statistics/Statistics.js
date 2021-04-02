import React from "react";
import { useSelector } from "react-redux";
import { appSelectors } from "../../redux/app";
import { formationSelectors } from "../../redux/formation";
import getIntlNumber from "../../utils/getIntlNumber";
import s from "./Statistics.module.scss";

const Statistics = () => {
  const content = useSelector(appSelectors.getLocalisedContent);
  const appLanguage = useSelector(appSelectors.getAppLanguage);
  const formationHealthPoints = useSelector(
    formationSelectors.getFormationHealthPoints
  );
  const formationRaceData = useSelector(
    formationSelectors.getFormationRaceData
  );
  const formationGradeData = useSelector(
    formationSelectors.getFormationGradeData
  );
  const formationCount = useSelector(formationSelectors.getFormationCount);
  const formationTroopData = useSelector(
    formationSelectors.getFormationTroopData
  );

  return (
    <div className={s.statistics}>
      <h2 className={s.header}>{content["app.tabs.statistics"]}</h2>

      <h3>{content["statistics.header.totalHP"]}</h3>
      <ul className={s.statList}>
        <li className={s.listLine}>
          <i className="fas fa-heart"></i>
          <span className={s.data}>
            {getIntlNumber(appLanguage, formationHealthPoints)}
          </span>
        </li>
      </ul>
      <p className={s.details}>{content["statistics.details.totalHP"]}</p>

      <h3>{content["statistics.header.formation.count"]}</h3>
      <ul className={s.statList}>
        <li className={s.listLine}>
          <i className="fas fa-users"></i>
          <span className={s.data}>{formationCount}</span>
        </li>
      </ul>

      <h3>{content["statistics.header.formation.analysis"]}</h3>
      <ul className={s.statList}>
        {Object.keys(formationTroopData).map((troop, idx) => (
          <li className={s.listLine} key={`troop-${idx}`}>
            <span className={s.label}>{formationTroopData[troop].label}:</span>
            <span className={s.data}>
              {formationTroopData[troop].count} (
              {getIntlNumber(appLanguage, formationTroopData[troop].percentage)}
              %)
            </span>
          </li>
        ))}
      </ul>

      <h3>{content["statistics.header.formation.races"]}</h3>
      <ul className={s.statList}>
        {Object.keys(formationRaceData).map((race, idx) => (
          <li className={s.listLine} key={`race-${idx}`}>
            <span className={s.label}>{formationRaceData[race].label}:</span>
            <span className={s.data}>
              {formationRaceData[race].count}{" "}
              {formationRaceData[race].count > 0
                ? `(${getIntlNumber(
                    appLanguage,
                    formationRaceData[race].percentage
                  )}%)`
                : ""}
            </span>
          </li>
        ))}
      </ul>

      <h3>{content["statistics.header.formation.grades"]}</h3>
      <ul className={s.statList}>
        {Object.keys(formationGradeData).map((grade, idx) => (
          <li className={s.listLine} key={`grade-${idx}`}>
            <span className={s.label}>{formationGradeData[grade].label}:</span>
            <span className={s.data}>
              {formationGradeData[grade].count}{" "}
              {formationGradeData[grade].count > 0
                ? `(${getIntlNumber(
                    appLanguage,
                    formationGradeData[grade].percentage
                  )}%)`
                : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
