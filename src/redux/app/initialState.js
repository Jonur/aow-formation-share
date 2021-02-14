import { APP_TABS, DEFAULT_LANGUAGE } from "../../utils/constants";

const initialState = {
  language: DEFAULT_LANGUAGE,
  userInteractions: {
    lastTroopAdded: {},
    selectedSquare: 0,
    troopSelectionFormStatus: false,
    barracksFormStatus: false,
    tab: APP_TABS.FORMATION,
  },
};

export default initialState;
