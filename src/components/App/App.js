import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions, appSelectors } from "../../redux/app";
import { formationActions } from "../../redux/formation";
import Header from "../Header";
import ShareFormation from "../ShareFormation";
import TroopSquares from "../TroopSquares";
import TroopSelectionForm from "../TroopSelectionForm";
import ClearFormation from "../ClearFormation";
import Footer from "../Footer";
import s from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();

  const troopSelectionFormStatus = useSelector(
    appSelectors.getTroopSelectionFormStatus
  );
  const selectedSquare = useSelector(appSelectors.getSelectedSquared);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(appActions.appInitialisation()), []);

  const addToFormation = useCallback(
    ({ level, troop }) => {
      if (!troop) {
        dispatch(formationActions.removeTroopFromFormation(selectedSquare));
      } else {
        const troopToAdd = {
          troop: troop,
          level: `${level}`,
        };

        dispatch(
          formationActions.addTroopToFormation(selectedSquare, troopToAdd)
        );
        dispatch(appActions.setLastTroopAdded(troopToAdd));
      }

      dispatch(appActions.setTroopSelectionFormStatus(false));
      dispatch(appActions.clearSelectedSquare());
    },
    [dispatch, selectedSquare]
  );

  return (
    <div className={s.app}>
      {troopSelectionFormStatus && <div className={s.backdrop} />}

      <Header />

      <div role="alert" className={s.screenRotationNotification}>
        Please rotate your device
      </div>

      <ShareFormation />

      <div className={s.formationShare}>
        {troopSelectionFormStatus && (
          <TroopSelectionForm addToFormation={addToFormation} />
        )}

        <div className={s.formationBoard} id="formation-board">
          <TroopSquares />
        </div>

        <ClearFormation />
      </div>

      <Footer />
    </div>
  );
};

export default App;
