import { troops } from "../data";

const getTroopHashMap = troops.troops.reduce(
  (acc, troop) => ({ ...acc, [troop.name]: troop }),
  {}
);

export default getTroopHashMap;
