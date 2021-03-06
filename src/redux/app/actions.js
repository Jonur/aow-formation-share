export const APP_INIT = "APP_INIT";
export const APP_CHANGE_LANGUAGE = "APP_CHANGE_LANGUAGE";
export const SET_TROOP_SELECTION_FORM_STATUS =
  "SET_TROOP_SELECTION_FORM_STATUS";
export const SET_SELECTED_SQUARE = "SET_SELECTED_SQUARE";
export const CLEAR_SELECTED_SQUARE = "CLEAR_SELECTED_SQUARE";
export const SET_LAST_TROOP_ADDED = "SET_LAST_TROOP_ADDED";
export const SELECT_TAB = "SELECT_TAB";
export const SET_BARRACKS_FORM_STATUS = "SET_BARRACKS_FORM_STATUS";
export const SET_NOTIFICATION_MESSAGE = "SET_NOTIFICATION_MESSAGE";
export const CREATE_SHAREABLE_LINK = "CREATE_SHAREABLE_LINK";
export const SET_HERO_FORM_STATUS = "SET_HERO_FORM_STATUS";
export const SELECT_VIEW = "SELECT_VIEW";

export const appInitialisation = ({ languageInURL }) => ({
  type: APP_INIT,
  payload: { languageInURL },
});

export const appChangeLanguage = ({ language }) => ({
  type: APP_CHANGE_LANGUAGE,
  payload: { language },
});

export const setTroopSelectionFormStatus = (status) => ({
  type: SET_TROOP_SELECTION_FORM_STATUS,
  payload: { status },
});

export const setBarracksFormStatus = ({ status }) => ({
  type: SET_BARRACKS_FORM_STATUS,
  payload: { status },
});

export const setHeroFormStatus = ({ status }) => ({
  type: SET_HERO_FORM_STATUS,
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

export const selectTab = ({ tab }) => ({
  type: SELECT_TAB,
  payload: { tab },
});

export const selectView = ({ view }) => ({
  type: SELECT_VIEW,
  payload: { view },
});

export const setNotificationMessage = ({ message }) => ({
  type: SET_NOTIFICATION_MESSAGE,
  payload: { message },
});

export const createShareableLink = () => ({
  type: CREATE_SHAREABLE_LINK,
});
