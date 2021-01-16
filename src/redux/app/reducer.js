import update from "immutability-helper";
import initialState from "./initialState";
import { appActions } from "./";

const appReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};

export default appReducer;
