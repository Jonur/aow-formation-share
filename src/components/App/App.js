import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header";
import ShareFormation from "../ShareFormation";
import TroopSquares from "../TroopSquares";
import TroopSelectionForm from "../TroopSelectionForm";
import ClearFormation from "../ClearFormation";
import Footer from "../Footer";
import getFormationFromURL from "../../utils/getFormationFromURL";
import getTroopId from "../../utils/getTroopId";
import s from "./App.module.scss";

const App = () => {
  const [troopSelectionFormStatus, setTroopSelectionFormStatus] = useState(
    false
  );
  const [selectedSquare, setSelectedSquare] = useState();
  const [formation, setFormation] = useState({});
  const [lastTroopAdded, setLastTroopAdded] = useState({});

  const showTroopSelectionForm = useCallback((squareNum) => {
    setTroopSelectionFormStatus(true);
    setSelectedSquare(squareNum);
  }, []);

  useEffect(() => {
    setFormation(getFormationFromURL());
  }, []);

  const addToFormation = useCallback(
    ({ level, troop }) => {
      const newFormation = {
        ...formation,
      };

      if (!troop) {
        delete newFormation[selectedSquare];

        setFormation(newFormation);
      } else {
        const troopToAdd = {
          troop: troop,
          level: `${level}`,
          id: getTroopId(troop),
        };

        setFormation({
          ...formation,
          [selectedSquare]: troopToAdd,
        });
        setLastTroopAdded(troopToAdd);
      }

      setTroopSelectionFormStatus(false);
    },
    [formation, selectedSquare]
  );

  return (
    <div className={s.app}>
      {troopSelectionFormStatus && <div className={s.backdrop} />}
      <Header />
      <div role="alert" className={s.screenRotationNotification}>
        Please rotate your device
      </div>
      <ShareFormation formation={formation} />
      <div className={s.formationShare}>
        {troopSelectionFormStatus && (
          <TroopSelectionForm
            addToFormation={addToFormation}
            setTroopSelectionFormStatus={setTroopSelectionFormStatus}
            lastTroopAdded={lastTroopAdded}
          />
        )}
        <div className={s.formationBoard} id="formation-board">
          <TroopSquares
            formation={formation}
            showTroopSelectionForm={showTroopSelectionForm}
          />
        </div>
        <ClearFormation formation={formation} setFormation={setFormation} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
