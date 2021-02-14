import { appActions } from "./";
import { formationActions } from "../../redux/formation";
import { gameDataSelectors } from "../../redux/gameData";
import getFormationFromURL from "../../utils/getFormationFromURL";

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

    const formationExistsInURL = !!Object.keys(formationFromURL).length;
    if (formationExistsInURL) {
      store.dispatch(formationActions.setFormation(formationFromURL));
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
