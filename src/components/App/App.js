import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formationActions } from "../../redux/formation";
import Header from "../Header";
import ShareFormation from "../ShareFormation";
import TroopSquares from "../TroopSquares";
import TroopSelectionForm from "../TroopSelectionForm";
import ClearFormation from "../ClearFormation";
import Footer from "../Footer";
import getFormationFromURL from "../../utils/getFormationFromURL";
import s from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();

  const [troopSelectionFormStatus, setTroopSelectionFormStatus] = useState(
    false
  );
  const [selectedSquare, setSelectedSquare] = useState();
  const [lastTroopAdded, setLastTroopAdded] = useState({});

  const showTroopSelectionForm = useCallback((squareNum) => {
    setTroopSelectionFormStatus(true);
    setSelectedSquare(squareNum);
  }, []);

  useEffect(() => {
    const formationFromURL = getFormationFromURL();
    if (Object.keys(formationFromURL).length) {
      dispatch(formationActions.setFormation(formationFromURL));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        setLastTroopAdded(troopToAdd);
      }

      setTroopSelectionFormStatus(false);
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
          <TroopSelectionForm
            addToFormation={addToFormation}
            setTroopSelectionFormStatus={setTroopSelectionFormStatus}
            lastTroopAdded={lastTroopAdded}
          />
        )}

        <div className={s.formationBoard} id="formation-board">
          <TroopSquares showTroopSelectionForm={showTroopSelectionForm} />
        </div>

        <ClearFormation />
      </div>

      <Footer />
    </div>
  );
};

export default App;
