import { troops } from "../data";

const getTroopIdHashMap = troops.troops.reduce(
  (acc, troop) => ({ ...acc, [troop.id]: troop }),
  {}
);

export default getTroopIdHashMap;
