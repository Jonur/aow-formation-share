import update from "immutability-helper";
import initialState from "./initialState";
import { appActions } from "./";

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.SET_BARRACKS_FORM_STATUS: {
      return update(state, {
        userInteractions: {
          barracksFormStatus: { $set: action.payload.status },
        },
      });
    }
    case appActions.SET_TROOP_SELECTION_FORM_STATUS: {
      return update(state, {
        userInteractions: {
          troopSelectionFormStatus: { $set: action.payload.status },
        },
      });
    }
    case appActions.SET_LAST_TROOP_ADDED: {
      return update(state, {
        userInteractions: {
          lastTroopAdded: { $set: action.payload.troopData },
        },
      });
    }
    case appActions.SET_SELECTED_SQUARE: {
      return update(state, {
        userInteractions: { selectedSquare: { $set: action.payload.square } },
      });
    }
    case appActions.CLEAR_SELECTED_SQUARE: {
      return update(state, {
        userInteractions: {
          selectedSquare: {
            $set: initialState.userInteractions.selectedSquare,
          },
        },
      });
    }
    case appActions.APP_CHANGE_LANGUAGE: {
      return update(state, {
        language: { $set: action.payload.language },
      });
    }
    case appActions.SELECT_TAB: {
      return update(state, {
        userInteractions: {
          tab: { $set: action.payload.tab },
        },
      });
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
