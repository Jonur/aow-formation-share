import React, { useCallback, useState } from "react";
import TroopSquares from "../TroopSquares";
import TroopSelectionForm from "../TroopSelectionForm";
import s from "./App.module.scss";

const App = () => {
  const [troopSelectionFormStatus, setTroopSelectionFormStatus] = useState(
    false
  );
  const [selectedSquare, setSelectedSquare] = useState();
  const [formation, setFormation] = useState({});

  const showTroopSelectionForm = useCallback((e) => {
    setTroopSelectionFormStatus(true);
    setSelectedSquare(e.target.attributes["data-square"].value);
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setFormation({
        ...formation,
        [e.target.square.value]: {
          troop: e.target.troop.value,
          level: e.target.level.value,
        },
      });
      setTroopSelectionFormStatus(false);
    },
    [formation]
  );

  return (
    <div className={s.formationShare}>
      {troopSelectionFormStatus && (
        <TroopSelectionForm
          handleFormSubmit={handleFormSubmit}
          selectedSquare={selectedSquare}
        />
      )}
      <div className={s.formationBoard}>
        <TroopSquares
          formation={formation}
          showTroopSelectionForm={showTroopSelectionForm}
        />
      </div>
    </div>
  );
};

export default App;
