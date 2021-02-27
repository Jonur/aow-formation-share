import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { barracksActions, barracksSelectors } from "../../redux/barracks";
import { appActions, appSelectors } from "../../redux/app";

import s from "./BarracksToolbar.module.scss";

const BarracksToolbar = () => {
  const dispatch = useDispatch();

  const content = useSelector(appSelectors.getLocalisedContent);
  const barracksTroops = useSelector(barracksSelectors.getBarracksTroops);
  const isBarracksMaxedOut = useSelector(
    barracksSelectors.getIsBarracksMaxedOut
  );

  return (
    <nav className={s.barracksToolbar}>
      <div className={s.primaryTools}>
        <button
          aria-label={content["button.label.addToBarracks"]}
          className={classNames(s.btn, s.addBtn)}
          disabled={isBarracksMaxedOut}
          onClick={() =>
            dispatch(appActions.setBarracksFormStatus({ status: true }))
          }
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className={s.secondaryTools}>
        <button
          aria-label={content["button.label.emptyBarracks"]}
          className={classNames(s.btn, s.clearBtn)}
          disabled={!barracksTroops.length}
          onClick={() => dispatch(barracksActions.emptyBarracks())}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </nav>
  );
};

export default BarracksToolbar;
