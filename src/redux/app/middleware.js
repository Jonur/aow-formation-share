import { appActions, appSelectors } from "./";
import { formationActions, formationSelectors } from "../../redux/formation";
import { gameDataSelectors } from "../../redux/gameData";
import { barracksActions } from "../../redux/barracks";
import { heroActions } from "../../redux/hero";
import getFormationFromURL from "../../utils/getFormationFromURL";
import getBarracksFromURL from "../../utils/getBarracksFromURL";
import getHeroFromURL from "../../utils/getHeroFromURL";
import getTinyURL from "../../utils/getTinyURL";

const appMiddleware = (store) => (next) => (action) => {
  if (action.type === appActions.APP_INIT) {
    const state = store.getState();
    const troopHashMap = gameDataSelectors.getTroopIdHashMap(state);
    const troopNames = gameDataSelectors.getTroopNames(state);
    const maxTroopLevel = gameDataSelectors.getMaxTroopLevel(state);
    const boardSquares = gameDataSelectors.getBoardSquares(state);
    const heroesIdHashMap = gameDataSelectors.getHeroesIdHashMap(state);
    const maxHeroLevel = gameDataSelectors.getMaxHeroLevel(state);

    const formationFromURL = getFormationFromURL(
      troopNames,
      troopHashMap,
      maxTroopLevel,
      boardSquares
    );
    const barracksFromURL = getBarracksFromURL(troopHashMap, maxTroopLevel);
    const heroFromURL = getHeroFromURL(heroesIdHashMap, maxHeroLevel);

    const formationExistsInURL = !!Object.keys(formationFromURL).length;
    if (formationExistsInURL) {
      store.dispatch(formationActions.setFormation(formationFromURL));
    }

    if (barracksFromURL.size) {
      store.dispatch(
        barracksActions.setBarracks({ barracks: barracksFromURL })
      );
    }

    if (heroFromURL) {
      store.dispatch(heroActions.updateHero(heroFromURL));
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

  if (action.type === appActions.CREATE_SHAREABLE_LINK) {
    const state = store.getState();

    const formationLink = formationSelectors.getFormationLink(state);
    const content = appSelectors.getLocalisedContent(state);

    // getTinyURL(formationLink);

    const newTextarea = document.createElement("textarea");
    newTextarea.id = "formation-link";
    newTextarea.value = formationLink;
    document.body.appendChild(newTextarea);
    newTextarea.select();
    document.execCommand("copy");
    newTextarea.remove();

    store.dispatch(
      appActions.setNotificationMessage({
        message: content["app.alert.formationCopied"],
      })
    );
    setTimeout(
      () => store.dispatch(appActions.setNotificationMessage({ message: "" })),
      4000
    );
  }

  next(action);
};

export default appMiddleware;
