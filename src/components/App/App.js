import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions, appSelectors } from "../../redux/app";

import { APP_TABS, DEFAULT_LANGUAGE } from "../../utils/constants";
import getIsValidLanguage from "../../i18n/utils/getIsValidLanguage";
import Header from "../Header";
import FormationToolbar from "../FormationToolbar";
import TroopSquares from "../TroopSquares";
import TroopSelectionForm from "../TroopSelectionForm";
import Barracks from "../Barracks";
import Tabs from "../Tabs";
import Settings from "../Settings";
import Hero from "../Hero";
import HeroForm from "../HeroForm";
import s from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const troopBoardRef = useRef();

  const troopSelectionFormStatus = useSelector(
    appSelectors.getTroopSelectionFormStatus
  );
  const barracksFormStatus = useSelector(appSelectors.getBarracksFormStatus);
  const heroFormStatus = useSelector(appSelectors.getHeroFormStatus);
  const content = useSelector(appSelectors.getLocalisedContent);
  const selectedTab = useSelector(appSelectors.getSelectedTab);
  const notificationMessage = useSelector(appSelectors.getNotificationMessage);

  useEffect(() => {
    const languageInURL = getIsValidLanguage(
      window.location.pathname.slice(1, 3)
    );
    const urlParams = window.location.search;

    const storedLanguage = getIsValidLanguage(localStorage.getItem("language"));
    const appLanguage = (storedLanguage || languageInURL || "").toLowerCase();
    if (!languageInURL && !storedLanguage) {
      window.location.replace(`${DEFAULT_LANGUAGE}${urlParams}`);
    } else if (storedLanguage && storedLanguage !== languageInURL) {
      window.location.replace(`${storedLanguage}${urlParams}`);
    }

    localStorage.setItem("language", appLanguage);
    dispatch(appActions.appInitialisation({ languageInURL: appLanguage }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldDisplayBackdrop =
    troopSelectionFormStatus || barracksFormStatus || heroFormStatus;

  return (
    <div className={s.app}>
      {shouldDisplayBackdrop && <div className={s.backdrop} />}
      {notificationMessage && (
        <span className={s.notificaitonMessage}>{notificationMessage}</span>
      )}

      <Header />

      <div role="alert" className={s.screenRotationNotification}>
        {content["app.alert.rotateDevice"]}
      </div>

      {selectedTab === APP_TABS.FORMATION && (
        <>
          <FormationToolbar troopBoardElement={troopBoardRef} />

          <div className={s.formationShare}>
            {troopSelectionFormStatus && <TroopSelectionForm />}

            <div
              ref={troopBoardRef}
              className={s.formationBoard}
              id="formation-board"
            >
              <TroopSquares />
            </div>

            {heroFormStatus && <HeroForm />}
            <Hero />
          </div>
        </>
      )}

      {selectedTab === APP_TABS.BARRACKS && <Barracks />}
      {selectedTab === APP_TABS.SETTINGS && <Settings />}

      <Tabs />
    </div>
  );
};

export default App;
