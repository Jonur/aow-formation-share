import { combineReducers, createStore } from "redux";

import { gameDataReducer } from "./gameData";
import { formationReducer } from "./formation";

const rootReducer = combineReducers({
  formation: formationReducer,
  gameData: gameDataReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
