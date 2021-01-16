export const APP_INIT = "APP_INIT";
export const SET_TROOP_SELECTION_FORM_STATUS =
  "SET_TROOP_SELECTION_FORM_STATUS";
export const SET_SELECTED_SQUARE = "SET_SELECTED_SQUARE";
export const CLEAR_SELECTED_SQUARE = "CLEAR_SELECTED_SQUARE";
export const SET_LAST_TROOP_ADDED = "SET_LAST_TROOP_ADDED";

export const appInitialisation = () => ({
  type: APP_INIT,
});

export const setTroopSelectionFormStatus = (status) => ({
  type: SET_TROOP_SELECTION_FORM_STATUS,
  payload: { status },
});

export const setSelectedSquare = (square) => ({
  type: SET_SELECTED_SQUARE,
  payload: { square },
});

export const clearSelectedSquare = () => ({
  type: CLEAR_SELECTED_SQUARE,
});

export const setLastTroopAdded = (troopData) => ({
  type: SET_LAST_TROOP_ADDED,
  payload: { troopData },
});
