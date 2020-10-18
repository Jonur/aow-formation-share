import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header";
import ShareFormation from "../ShareFormation";
import TroopSquares from "../TroopSquares";
import TroopSelectionForm from "../TroopSelectionForm";
import ClearFormation from "../ClearFormation";
import Footer from "../Footer";
import getFormationFromURL from "../../utils/getFormationFromURL";
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

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const newFormation = {
        ...formation,
      };

      if (!e.target.troop.value) {
        delete newFormation[e.target.square.value];

        setFormation(newFormation);
      } else {
        const troopToAdd = {
          troop: e.target.troop.value,
          level: e.target.level.value,
        };

        setFormation({
          ...formation,
          [e.target.square.value]: troopToAdd,
        });
        setLastTroopAdded(troopToAdd);
      }

      setTroopSelectionFormStatus(false);
    },
    [formation]
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
            handleFormSubmit={handleFormSubmit}
            selectedSquare={selectedSquare}
            setTroopSelectionFormStatus={setTroopSelectionFormStatus}
            lastTroopAdded={lastTroopAdded}
          />
        )}
        <div className={s.formationBoard}>
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
