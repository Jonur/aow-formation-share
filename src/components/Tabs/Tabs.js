import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { appActions, appSelectors } from "../../redux/app";
import { formationSelectors } from "../../redux/formation";
import { APP_TABS } from "../../utils/constants";
import s from "./Tabs.module.scss";

const Tabs = () => {
  const dispatch = useDispatch();
  const content = useSelector(appSelectors.getLocalisedContent);
  const selectedTab = useSelector(appSelectors.getSelectedTab);
  const troopSelectionFormStatus = useSelector(
    appSelectors.getTroopSelectionFormStatus
  );
  const barracksFormStatus = useSelector(appSelectors.getBarracksFormStatus);
  const heroFormStatus = useSelector(appSelectors.getHeroFormStatus);
  const formationCount = useSelector(formationSelectors.getFormationCount);

  const shouldDisableTabs =
    troopSelectionFormStatus || barracksFormStatus || heroFormStatus;

  return (
    <nav className={s.tabs}>
      <button
        className={classNames(s.tab, {
          [s.selected]: selectedTab === APP_TABS.FORMATION,
        })}
        onClick={() =>
          dispatch(appActions.selectTab({ tab: APP_TABS.FORMATION }))
        }
        disabled={shouldDisableTabs}
      >
        {content["app.tabs.formation"]}
      </button>

      <button
        className={classNames(s.tab, {
          [s.selected]: selectedTab === APP_TABS.BARRACKS,
        })}
        onClick={() =>
          dispatch(appActions.selectTab({ tab: APP_TABS.BARRACKS }))
        }
        disabled={shouldDisableTabs}
      >
        {content["app.tabs.barracks"]}
      </button>

      <button
        aria-label={content["app.tabs.statistics"]}
        className={classNames(s.tab, s.icon, {
          [s.selected]: selectedTab === APP_TABS.STATS,
        })}
        onClick={() => dispatch(appActions.selectTab({ tab: APP_TABS.STATS }))}
        disabled={shouldDisableTabs || !formationCount}
      >
        <i className="fas fa-chart-bar"></i>
      </button>

      <button
        aria-label={content["app.tabs.settings"]}
        className={classNames(s.tab, s.icon, {
          [s.selected]: selectedTab === APP_TABS.SETTINGS,
        })}
        onClick={() =>
          dispatch(appActions.selectTab({ tab: APP_TABS.SETTINGS }))
        }
        disabled={shouldDisableTabs}
      >
        <i className="fas fa-cog"></i>
      </button>
    </nav>
  );
};

export default Tabs;
