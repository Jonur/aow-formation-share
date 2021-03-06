import update from "immutability-helper";
import { MAX_BARRACKS_ENTRIES } from "../../utils/constants";
import { barracksActions } from "./";

const initialState = new Map();

const barracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case barracksActions.UPDATE_TROOPS_IN_BARRACKS:
    case barracksActions.ADD_TROOP_TO_BARRACKS: {
      const { troop, level, count } = action.payload;
      const key = [troop, level].toString();

      const isBarracksMaxedOut = state.size >= MAX_BARRACKS_ENTRIES;
      const isNotUpdatingEntry = !state.has(key);
      if (isBarracksMaxedOut && isNotUpdatingEntry) {
        return state;
      }

      return update(state, {
        $add: [[key, count]],
      });
    }
    case barracksActions.EMPTY_BARRACKS: {
      return initialState;
    }
    case barracksActions.REMOVE_TROOPS_FROM_BARRACKS: {
      const { troop, level } = action.payload;
      const key = [troop, level].toString();

      return update(state, {
        $remove: [key],
      });
    }
    case barracksActions.SET_BARRACKS: {
      return action.payload.barracks;
    }
    default: {
      return state;
    }
  }
};

export default barracksReducer;
