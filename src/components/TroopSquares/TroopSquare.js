import React, { useCallback } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { appActions, appSelectors } from "../../redux/app";
import { formationActions, formationSelectors } from "../../redux/formation";
import { APP_VIEWS, ITEM_TYPES } from "../../utils/constants";
import s from "./TroopSquares.module.scss";

const TroopSquare = ({
  hasTroops,
  squareNum,
  troop,
  troopName,
  troopGradeClass,
}) => {
  const dispatch = useDispatch();

  const content = useSelector(appSelectors.getLocalisedContent);
  const formation = useSelector(formationSelectors.getFormation);
  const selectedView = useSelector(appSelectors.getSelectedView);

  const handleTroopSquareClick = useCallback(
    (squareNum) => {
      dispatch(appActions.setTroopSelectionFormStatus(true));
      dispatch(appActions.setSelectedSquare(`${squareNum}`));
    },
    [dispatch]
  );

  const getTroopImage = useCallback(
    (troop) => {
      if (selectedView === APP_VIEWS.CARD) {
        return troop.image;
      } else if (selectedView === APP_VIEWS.GAME) {
        return troop.boardImage;
      }

      return "";
    },
    [selectedView]
  );

  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPES.TROOP,
    item: {
      squareNum,
    },
    canDrag: hasTroops,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      canDrag: !!monitor.canDrag(),
    }),
  });

  const [{ isTroopOver }, dropBlueRef] = useDrop({
    accept: ITEM_TYPES.TROOP,
    collect: (monitor) => ({
      isTroopOver: !!monitor.isOver(),
    }),
    drop: (item) => {
      const shouldSwapSquares =
        !!formation[item.squareNum] && !!formation[squareNum];
      const shouldMoveTroopToEmptySquare =
        !!formation[item.squareNum] && !formation[squareNum];

      if (shouldSwapSquares) {
        dispatch(
          formationActions.swapTroopSquares({
            squareDrag: item.squareNum,
            squareDrop: squareNum,
          })
        );
      } else if (shouldMoveTroopToEmptySquare) {
        dispatch(
          formationActions.moveTroopToEmptySquare({
            squareDrag: item.squareNum,
            squareDrop: squareNum,
          })
        );
      }
    },
  });

  return (
    <div
      ref={dropBlueRef}
      className={classNames(s.troopSquareContainer, {
        [s.isDropping]: isTroopOver,
      })}
    >
      <button
        ref={dragRef}
        title={
          hasTroops
            ? `${troopName} ${content["game.level"]} ${
                formation[`${squareNum}`].level
              }`
            : `${content["game.square"]} ${squareNum}: ${content["button.label.clickToAddTroops"]}`
        }
        className={classNames(s.troopSquare, {
          [s[troopGradeClass]]: hasTroops,
          [s.isDragging]: isDragging,
        })}
        id={`square-${squareNum}`}
        onClick={() => handleTroopSquareClick(squareNum)}
      >
        <span
          className={classNames({
            [s.troopLevel]: hasTroops,
            [s.emptySquareNumber]: !hasTroops,
          })}
        >
          {hasTroops ? formation[`${squareNum}`].level : squareNum}
        </span>

        {hasTroops && (
          <img
            className={s.troopImage}
            src={getTroopImage(troop)}
            alt={troopName}
          />
        )}
      </button>
    </div>
  );
};

export default TroopSquare;
