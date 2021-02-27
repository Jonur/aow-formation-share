import { appActions } from "./";
import { formationActions } from "../../redux/formation";
import { gameDataSelectors } from "../../redux/gameData";
import { barracksActions } from "../../redux/barracks";
import getFormationFromURL from "../../utils/getFormationFromURL";
import getBarracksFromURL from "../../utils/getBarracksFromURL";

export default (store) => (next) => (action) => {
  if (action.type === appActions.APP_INIT) {
    const state = store.getState();
    const troopHashMap = gameDataSelectors.getTroopIdHashMap(state);
    const troopNames = gameDataSelectors.getTroopNames(state);
    const maxTroopLevel = gameDataSelectors.getMaxTroopLevel(state);
    const boardSquares = gameDataSelectors.getBoardSquares(state);

    const formationFromURL = getFormationFromURL(
      troopNames,
      troopHashMap,
      maxTroopLevel,
      boardSquares
    );
    const barracksFromURL = getBarracksFromURL(troopHashMap, maxTroopLevel);

    const formationExistsInURL = !!Object.keys(formationFromURL).length;
    if (formationExistsInURL) {
      store.dispatch(formationActions.setFormation(formationFromURL));
    }

    if (barracksFromURL.size) {
      store.dispatch(
        barracksActions.setBarracks({ barracks: barracksFromURL })
      );
    }

    const { languageInURL } = action.payload;
    if (languageInURL) {
      store.dispatch(
        appActions.appChangeLanguage({
          language: languageInURL,
        })
      );
    }
  }

  next(action);
};
