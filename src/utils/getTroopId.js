import { troops } from "../data";

const getTroopId = (selectedTroop) =>
  Object.values(troops.troops).find((troop) => troop.name === selectedTroop).id;

export default getTroopId;
