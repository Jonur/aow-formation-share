import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions, appSelectors } from "../../redux/app";

import t from "../../i18n/en.json";

import Header from "../Header";
import ShareFormation from "../ShareFormation";
import TroopSquares from "../TroopSquares";
import TroopSelectionForm from "../TroopSelectionForm";
import ClearFormation from "../ClearFormation";
import Footer from "../Footer";
import s from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const troopBoardRef = useRef();

  const troopSelectionFormStatus = useSelector(
    appSelectors.getTroopSelectionFormStatus
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(appActions.appInitialisation()), []);

  return (
    <div className={s.app}>
      {troopSelectionFormStatus && <div className={s.backdrop} />}

      <Header />

      <div role="alert" className={s.screenRotationNotification}>
        {t["app.alert.rotateDevice"]}
      </div>

      <ShareFormation troopBoardElement={troopBoardRef} />

      <div className={s.formationShare}>
        {troopSelectionFormStatus && <TroopSelectionForm />}

        <div
          ref={troopBoardRef}
          className={s.formationBoard}
          id="formation-board"
        >
          <TroopSquares />
        </div>

        <ClearFormation />
      </div>

      <Footer />
    </div>
  );
};

export default App;
