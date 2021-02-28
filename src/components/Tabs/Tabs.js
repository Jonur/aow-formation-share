import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { appActions, appSelectors } from "../../redux/app";
import { APP_TABS } from "../../utils/constants";
import s from "./Tabs.module.scss";

const Tabs = () => {
  const dispatch = useDispatch();
  const content = useSelector(appSelectors.getLocalisedContent);
  const selectedTab = useSelector(appSelectors.getSelectedTab);

  return (
    <nav className={s.tabs}>
      <button
        className={classNames(s.tab, {
          [s.selected]: selectedTab === APP_TABS.FORMATION,
        })}
        onClick={() =>
          dispatch(appActions.selectTab({ tab: APP_TABS.FORMATION }))
        }
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
      >
        {content["app.tabs.barracks"]}
      </button>

      {/* <button
        aria-label={content["app.tabs.statistics"]}
        className={classNames(s.tab, s.icon, {
          [s.selected]: selectedTab === APP_TABS.STATS,
        })}
        onClick={() => dispatch(appActions.selectTab({ tab: APP_TABS.STATS }))}
      >
        <i className="fas fa-chart-line"></i>
      </button> */}

      <button
        aria-label={content["app.tabs.settings"]}
        className={classNames(s.tab, s.icon, {
          [s.selected]: selectedTab === APP_TABS.SETTINGS,
        })}
        onClick={() =>
          dispatch(appActions.selectTab({ tab: APP_TABS.SETTINGS }))
        }
      >
        <i className="fas fa-cog"></i>
      </button>
    </nav>
  );
};

export default Tabs;
