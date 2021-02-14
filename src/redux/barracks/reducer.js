import update from "immutability-helper";
import { barracksActions } from "./";

const initialState = new Map();

const barracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case barracksActions.UPDATE_TROOPS_IN_BARRACKS:
    case barracksActions.ADD_TROOP_TO_BARRACKS: {
      const { troop, level, count } = action.payload;
      const key = [troop, level].toString();

      return update(state, {
        $add: [[key, count]],
      });
    }
    case barracksActions.EMPTY_BARRACKS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default barracksReducer;
