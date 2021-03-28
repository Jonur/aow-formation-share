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
    case formationActions.SWAP_TROOP_SQUARES: {
      const { squareDrag, squareDrop } = action.payload;

      return update(state, {
        [squareDrag]: { $set: state[squareDrop] },
        [squareDrop]: { $set: state[squareDrag] },
      });
    }
    case formationActions.MOVE_TROOP_TO_EMPTY_SQUARE: {
      const { squareDrag, squareDrop } = action.payload;

      return update(state, {
        [squareDrop]: { $set: state[squareDrag] },
        $unset: [squareDrag],
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
