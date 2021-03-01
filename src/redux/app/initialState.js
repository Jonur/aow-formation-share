import { APP_VIEWS, APP_TABS, DEFAULT_LANGUAGE } from "../../utils/constants";

const initialState = {
  language: DEFAULT_LANGUAGE,
  userInteractions: {
    lastTroopAdded: {},
    selectedSquare: 0,
    troopSelectionFormStatus: false,
    barracksFormStatus: false,
    heroFormStatus: false,
    tab: APP_TABS.FORMATION,
    notificationMessage: "",
    view: localStorage.getItem("view") || APP_VIEWS.GAME,
  },
};

export default initialState;
