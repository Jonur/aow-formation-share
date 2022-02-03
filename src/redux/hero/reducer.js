import update from "immutability-helper";
import { heroActions } from "./";

const initialState = {
  id: "",
  level: "",
  stars: "",
};

const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case heroActions.UPDATE_HERO: {
      return update(state, {
        id: { $set: action.payload.id },
        level: { $set: action.payload.level },
        stars: { $set: action.payload.stars },
      });
    }
    default: {
      return state;
    }
  }
};

export default heroReducer;
