export const ADD_TROOP_TO_BARRACKS = "ADD_TROOP_TO_BARRACKS";
export const UPDATE_TROOPS_IN_BARRACKS = "UPDATE_TROOPS_IN_BARRACKS";
export const EMPTY_BARRACKS = "EMPTY_BARRACKS";

export const addTroopsToBarracks = ({ troop, level, count }) => ({
  type: ADD_TROOP_TO_BARRACKS,
  payload: { troop, level, count },
});

export const updateTroopsInBarracks = ({ troop, level, count }) => ({
  type: UPDATE_TROOPS_IN_BARRACKS,
  payload: { troop, level, count },
});

export const emptyBarracks = () => ({
  type: EMPTY_BARRACKS,
});
