import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { appSelectors } from "../../redux/app";
import { formationSelectors } from "../../redux/formation";
import languages from "../../i18n";
import s from "./LanguagePicker.module.scss";

const LanguagePicker = () => {
  const appLanguage = useSelector(appSelectors.getAppLanguage);
  const content = useSelector(appSelectors.getLocalisedContent);
  const composedFormationLinkParams = useSelector(
    formationSelectors.getComposedFormationLinkParams
  );

  const changeLanguage = useCallback(
    (language) => {
      const urlParams = window.location.search;
      console.log({ composedFormationLinkParams, urlParams });
      localStorage.setItem("language", language);
      window.location.replace(
        `${language}?v=2${
          composedFormationLinkParams ? composedFormationLinkParams : urlParams
        }`
      );
    },
    [composedFormationLinkParams]
  );

  return (
    <section className={s.languagePicker}>
      <h3 className={s.title}>{content["languages.title"]}</h3>

      <ul className={s.languages}>
        {Object.keys(languages).map((langCode) => (
          <li className={s.languageItem} key={langCode}>
            <button
              className={classNames(s.language, {
                [s.selected]: appLanguage === langCode,
              })}
              onClick={() => changeLanguage(langCode)}
            >
              {languages[langCode].language}
            </button>
          </li>
        ))}
      </ul>

      <span className={s.langNotes}>
        * {content["languages.asteriskNotes"]}
      </span>
    </section>
  );
};

export default LanguagePicker;
