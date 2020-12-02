import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { gameDataReducer } from "./gameData";
import { formationReducer } from "./formation";
import { appMiddleware } from "./app";

const rootReducer = combineReducers({
  formation: formationReducer,
  gameData: gameDataReducer,
});

const middlewares = [appMiddleware];
const buildMiddleware = () => {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return composeWithDevTools({
      name: "AoW Legions Formations",
      maxAge: 20,
      latency: 1000,
      autoPause: true,
    })(applyMiddleware(...middlewares));
  } else {
    applyMiddleware(...middlewares);
  }
};

const store = createStore(rootReducer, buildMiddleware());

export default store;
