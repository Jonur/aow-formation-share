import update from "immutability-helper";
import { formationActions } from "./";

const formationReducer = (state = {}, action) => {
  switch (action.type) {
    case formationActions.ADD_TROOP_TO_FORMATION: {
      return update(state, {
        $merge: { [action.payload.square]: action.payload.troopToAdd },
      });
    }
    case formationActions.REMOVE_TROOP_FROM_FORMATION: {
      return update(state, {
        $unset: [action.payload.square],
      });
    }
    case formationActions.SET_FORMATION: {
      return action.payload.formation;
    }
    case formationActions.EMPTY_FORMATION_BOARD: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default formationReducer;
