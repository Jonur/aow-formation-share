import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { appSelectors } from "../../redux/app";
import { formationSelectors } from "../../redux/formation";
import languages from "../../i18n";
import s from "./LanguagePicker.module.scss";

const LanguagePicker = () => {
  const content = useSelector(appSelectors.getLocalisedContent);
  const formationLinkParams = useSelector(
    formationSelectors.getFormationLinkParams
  );

  const changeLanguage = useCallback(
    (language) => {
      const urlParams = window.location.search;
      localStorage.setItem("language", language);
      window.location.replace(
        `${language}${urlParams || `?v=2${formationLinkParams}`}`
      );
    },
    [formationLinkParams]
  );

  return (
    <div className={s.languagePicker}>
      <h3 className={s.title}>{content["languages.title"]}</h3>

      <nav className={s.languages}>
        {Object.keys(languages).map((langCode) => (
          <button
            className={s.language}
            onClick={() => changeLanguage(langCode)}
            key={langCode}
          >
            {languages[langCode].language}
          </button>
        ))}
      </nav>

      <span className={s.langNotes}>
        * {content["languages.asteriskNotes"]}
      </span>
    </div>
  );
};

export default LanguagePicker;
