import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { appActions, appSelectors } from "../../redux/app";
import { APP_VIEWS } from "../../utils/constants";
import s from "./ViewPicker.module.scss";

const ViewPicker = () => {
  const dispatch = useDispatch();

  const selectedView = useSelector(appSelectors.getSelectedView);
  const content = useSelector(appSelectors.getLocalisedContent);

  const changeView = useCallback(
    (view) => {
      localStorage.setItem("view", view);
      dispatch(appActions.selectView({ view }));
    },
    [dispatch]
  );

  return (
    <section className={s.viewPicker}>
      <h3 className={s.title}>{content["views.title"]}</h3>

      <ul className={s.views}>
        <li className={s.viewItem}>
          <button
            className={classNames(s.view, {
              [s.selected]: APP_VIEWS.GAME === selectedView,
            })}
            onClick={() => changeView(APP_VIEWS.GAME)}
          >
            {content["views.view.game"]}
          </button>
        </li>

        <li className={s.viewItem}>
          <button
            className={classNames(s.view, {
              [s.selected]: APP_VIEWS.CARD === selectedView,
            })}
            onClick={() => changeView(APP_VIEWS.CARD)}
          >
            {content["views.view.card"]}
          </button>
        </li>
      </ul>
    </section>
  );
};

export default ViewPicker;
